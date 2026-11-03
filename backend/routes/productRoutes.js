const { redisClient } = require("../config/redis");
const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");


/* =========================================================
   TTL JITTER
========================================================= */

function getJitteredTTL(baseTTL, maxJitter) {
  const jitter = Math.floor(Math.random() * (maxJitter + 1));

  return baseTTL + jitter;
}


/* =========================================================
   SINGLE-FLIGHT REQUEST DEDUPLICATION
========================================================= */

// Stores database requests currently in progress
const inFlightProductRequests = new Map();

function getOrLoadProduct(cacheKey, loadFunction) {
  // Is another request already loading this product?
  const existingRequest = inFlightProductRequests.get(cacheKey);

  if (existingRequest) {
    console.log("REQUEST COALESCED:", cacheKey);

    return {
      promise: existingRequest,
      coalesced: true,
    };
  }

  console.log("STARTING DATABASE REQUEST:", cacheKey);

  // Start the database operation
  const requestPromise = (async () => {
    try {
      return await loadFunction();
    } finally {
      // Always clean up, including when the query fails
      inFlightProductRequests.delete(cacheKey);
    }
  })();

  // Register the ongoing request
  inFlightProductRequests.set(cacheKey, requestPromise);

  return {
    promise: requestPromise,
    coalesced: false,
  };
}



/* =========================================================
   REDIS CACHE INVALIDATION
========================================================= */

async function invalidateProductCache(productId) {
  if (!redisClient.isReady) {
    throw new Error("Redis is not available");
  }

  // Individual product cache
  const keysToDelete = [`product:${productId}`];

  // Find all product listing caches without blocking Redis
  for await (const keys of redisClient.scanIterator({
    MATCH: "products:all:*",
    COUNT: 100,
  })) {
    keysToDelete.push(...keys);
  }

  // Delete all matching cache entries
  if (keysToDelete.length > 0) {
    await redisClient.del(keysToDelete);
  }

  console.log("CACHE INVALIDATED:", keysToDelete);
}


/* =========================================================
   GET ALL PRODUCTS
========================================================= */

/* =========================================================
   GET ALL PRODUCTS - REDIS CACHING
========================================================= */

router.get("/", async (req, res) => {
  try {
    // 1. Generate a unique cache key for this query
    const queryParams = Object.entries(req.query)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

    const queryString = new URLSearchParams(
      queryParams.map(([key, value]) => [
        key,
        String(value),
      ])
    ).toString();

    const cacheKey = `products:all:${queryString || "default"}`;

    // 2. Check Redis before querying Supabase
    if (redisClient.isReady) {
      const cachedProducts = await redisClient.get(cacheKey);

      if (cachedProducts) {
        console.log("REDIS CACHE HIT:", cacheKey);

        res.set("X-Cache", "HIT");
        return res.json(JSON.parse(cachedProducts));
      }
    }

    console.log("REDIS CACHE MISS:", cacheKey);

    // 3. If cache misses, query Supabase
    const {
      gender,
      stock,
      minPrice,
      maxPrice,
      categories,
      sort,
      search,
    } = req.query;

    let query = supabase
      .from("products")
      .select("*");

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (gender) {
      query = query.eq("gender", gender);
    }

    if (stock === "in") {
      query = query.gt("stock", 0);
    }

    if (stock === "out") {
      query = query.eq("stock", 0);
    }

    if (minPrice && maxPrice) {
      query = query
        .gte("price", Number(minPrice))
        .lte("price", Number(maxPrice));
    }

    if (categories) {
      const cats = categories.split(",");
      query = query.in("category", cats);
    }

    if (sort === "low-high") {
      query = query.order("price", {
        ascending: true,
      });
    }

    if (sort === "high-low") {
      query = query.order("price", {
        ascending: false,
      });
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase products error:", error);

      return res.status(500).json({
        message: "Failed to fetch products",
        error: error.message,
      });
    }

    // 4. Store successful response in Redis for 60 seconds
    if (redisClient.isReady) {
      try {
        const ttl = getJitteredTTL(60, 15);

await redisClient.setEx(
  cacheKey,
  ttl,
  JSON.stringify(data)
);

console.log(`PRODUCT LIST CACHE TTL: ${ttl}s`);

        console.log("PRODUCTS STORED IN REDIS:", cacheKey);
      } catch (redisError) {
        console.error("Redis caching failed:", redisError.message);
      }
    }

    // 5. Return database response
    res.set("X-Cache", "MISS");
    return res.json(data);

  } catch (error) {
    console.error("Products API error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});




/* =========================================================
   GET SINGLE PRODUCT - REDIS + SINGLE FLIGHT
========================================================= */

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cacheKey = `product:${id}`;

    // 1. Check Redis first
    if (redisClient.isReady) {
      try {
        const cachedProduct = await redisClient.get(cacheKey);

if (cachedProduct === "__NOT_FOUND__") {
  console.log("NEGATIVE CACHE HIT:", cacheKey);

  res.set("X-Cache", "NEGATIVE-HIT");

  return res.status(404).json({
    message: "Product not found",
  });
}

if (cachedProduct) {
          console.log("PRODUCT CACHE HIT:", cacheKey);

          res.set("X-Cache", "HIT");
          return res.json(JSON.parse(cachedProduct));
        }
      } catch (redisError) {
        console.error("Redis read failed:", redisError.message);
      }
    }

    console.log("PRODUCT CACHE MISS:", cacheKey);

    // 2. Reuse an existing database request if available
    const { promise, coalesced } = getOrLoadProduct(
      cacheKey,
      async () => {
        // Only the first request executes this function
        console.log("DATABASE QUERY EXECUTING:", cacheKey);

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!data) {
  if (redisClient.isReady) {
    try {
      const ttl = getJitteredTTL(30, 10);

await redisClient.setEx(
  cacheKey,
  ttl,
  "__NOT_FOUND__"
);

console.log(`NEGATIVE CACHE TTL: ${ttl}s`);

      console.log("NEGATIVE CACHE STORED:", cacheKey);
    } catch (redisError) {
      console.error(
        "Negative cache write failed:",
        redisError.message
      );
    }
  }

  return null;
}

        // 3. Store fresh data in Redis
        if (redisClient.isReady) {
          try {
            const ttl = getJitteredTTL(300, 60);

await redisClient.setEx(
  cacheKey,
  ttl,
  JSON.stringify(data)
);

console.log(`PRODUCT CACHED: ${cacheKey}, TTL: ${ttl}s`);

            console.log("PRODUCT STORED IN REDIS:", cacheKey);
          } catch (redisError) {
            console.error("Redis write failed:", redisError.message);
          }
        }

        return data;
      }
    );

    // 4. All concurrent requests await the same Promise
    const product = await promise;

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // 5. Identify how this request was served
    res.set(
      "X-Cache",
      coalesced ? "COALESCED" : "MISS"
    );

    return res.json(product);

  } catch (error) {
    console.error("Single product API error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});



/* =========================================================
   RESERVE PRODUCT STOCK - ATOMIC DATABASE OPERATION
========================================================= */

router.post("/:id/reserve", async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const { quantity } = req.body;

    // 1. Validate product ID
    if (!Number.isSafeInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // 2. Validate quantity
    if (
      !Number.isSafeInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    // 3. Call PostgreSQL function through Supabase RPC
    const { data, error } = await supabase.rpc(
      "reserve_product_stock",
      {
        p_product_id: productId,
        p_quantity: quantity,
      }
    );

    if (error) {
      console.error("Stock reservation RPC failed:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to reserve stock",
      });
    }

    // 4. Handle unsuccessful reservation
    if (!data.success) {
      const statusCode =
        data.message === "Product not found" ? 404 : 409;

      return res.status(statusCode).json(data);
    }

    // 5. Invalidate Redis after successful reservation
    try {
      await invalidateProductCache(productId);
    } catch (cacheError) {
      // Database reservation already succeeded.
      // Do not tell the customer that the reservation failed.
      console.error(
        "Stock reserved, but cache invalidation failed:",
        cacheError.message
      );
    }

    // 6. Return successful reservation
    return res.status(200).json({
      success: true,
      message: "Stock reserved successfully",
      productId,
      quantity,
      remainingStock: data.remaining_stock,
    });

  } catch (error) {
    console.error("Stock reservation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});




/* =========================================================
   DEVELOPMENT ONLY - UPDATE PRODUCT PRICE
========================================================= */

router.patch("/:id/price", async (req, res) => {
  try {
    // 1. Ensure this endpoint is explicitly enabled
    if (process.env.ENABLE_DEV_PRODUCT_UPDATES !== "true") {
      return res.status(404).json({
        message: "Route not found",
      });
    }

    const id = Number(req.params.id);
    const { price } = req.body;

    // 2. Validate input
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    if (
      price === undefined ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        message: "Please provide a valid non-negative price",
      });
    }

    // 3. Ensure Redis is available for this experiment
    if (!redisClient.isReady) {
      return res.status(503).json({
        message: "Redis is unavailable. Product was not updated.",
      });
    }

    // 4. Update the actual database first
    const { data, error } = await supabase
      .from("products")
      .update({ price })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Product update failed:", error);

      return res.status(500).json({
        message: "Database update failed",
      });
    }

    // 5. Invalidate Redis only after successful DB update
    try {
      await invalidateProductCache(id);
    } catch (cacheError) {
      console.error(
        "Cache invalidation failed:",
        cacheError.message
      );

      return res.status(500).json({
        message: "Product updated, but cache invalidation failed",
        product: data,
        warning: "Cached data may be stale. Check Redis.",
      });
    }

    // 6. Return updated product
    return res.json({
      message: "Product updated and cache invalidated successfully",
      product: data,
    });

  } catch (error) {
    console.error("Product update error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});



module.exports = router;