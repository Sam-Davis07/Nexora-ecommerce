const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

router.get("/", async (req, res) => {
  try {
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

    /* SEARCH */

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    /* GENDER */

    if (gender) {
      query = query.eq("gender", gender);
    }

    /* STOCK */

    if (stock === "in") {
      query = query.gt("stock", 0);
    }

    if (stock === "out") {
      query = query.eq("stock", 0);
    }

    /* PRICE */

    if (minPrice && maxPrice) {
      query = query
        .gte("price", Number(minPrice))
        .lte("price", Number(maxPrice));
    }

    /* CATEGORIES */

    if (categories) {
      const cats = categories.split(",");

      query = query.in("category", cats);
    }

    /* SORT */

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

    res.json(data);
  } catch (error) {
    console.error("Products API error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


/* =========================================================
   GET SINGLE PRODUCT
========================================================= */

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase product error:", error);

      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Single product API error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


module.exports = router;