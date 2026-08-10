const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");


/* =========================================================
   ADD TO WISHLIST
========================================================= */

router.post("/add", async (req, res) => {
  try {
    const {
      user_id,
      product_id,
    } = req.body;

    /*
      Your Supabase wishlist table has:

      PRIMARY KEY (user_id, product_id)

      Therefore we use upsert so the same
      product cannot be added twice.
    */

    const {
      data,
      error,
    } = await supabase
      .from("wishlist")
      .upsert(
        {
          user_id: user_id,
          product_id: product_id,
        },
        {
          onConflict: "user_id,product_id",
        }
      )
      .select();

    if (error) {
      console.error(
        "Supabase add wishlist error:",
        error
      );

      return res.status(500).json({
        message: "Failed to add product to wishlist",
        error: error.message,
      });
    }

    res.json({
      message: "Product added to wishlist",
      data,
    });
  } catch (error) {
    console.error(
      "Add wishlist API error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


/* =========================================================
   GET USER WISHLIST
========================================================= */

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const {
      data,
      error,
    } = await supabase
      .from("wishlist")
      .select(`
        user_id,
        product_id,
        created_at,
        products (*)
      `)
      .eq("user_id", userId);

    if (error) {
      console.error(
        "Supabase get wishlist error:",
        error
      );

      return res.status(500).json({
        message: "Failed to fetch wishlist",
        error: error.message,
      });
    }

    /*
      Flatten Supabase relationship.

      React expects:

      {
        id,
        name,
        price,
        image,
        ...
      }
    */

    const wishlist = data.map((item) => ({
      id: item.product_id,
      user_id: item.user_id,
      product_id: item.product_id,
      created_at: item.created_at,

      name: item.products?.name,
      description: item.products?.description,
      price: item.products?.price,
      image: item.products?.image,
      category: item.products?.category,
      gender: item.products?.gender,
      stock: item.products?.stock,
    }));

    res.json(wishlist);
  } catch (error) {
    console.error(
      "Get wishlist API error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


/* =========================================================
   DELETE FROM WISHLIST
========================================================= */

router.delete("/:productId/:userId", async (req, res) => {
  try {
    const {
      productId,
      userId,
    } = req.params;

    const {
      data,
      error,
    } = await supabase
      .from("wishlist")
      .delete()
      .eq("product_id", productId)
      .eq("user_id", userId)
      .select();

    if (error) {
      console.error(
        "Supabase delete wishlist error:",
        error
      );

      return res.status(500).json({
        message: "Failed to remove product from wishlist",
        error: error.message,
      });
    }

    res.json({
      message: "Removed from wishlist",
      data,
    });
  } catch (error) {
    console.error(
      "Delete wishlist API error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


module.exports = router;