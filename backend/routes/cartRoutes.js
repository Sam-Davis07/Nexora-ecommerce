const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");


/* =========================================================
   ADD TO CART
========================================================= */

router.post("/add", async (req, res) => {
  try {
    const {
      user_id,
      product_id,
    } = req.body;

    const { data, error } = await supabase
      .from("cart")
      .insert([
        {
          user_id: user_id,
          product_id: product_id,
          quantity: 1,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase add cart error:", error);

      return res.status(500).json({
        message: "Failed to add product to cart",
        error: error.message,
      });
    }

    res.json({
      message: "Product added to cart",
      data,
    });
  } catch (error) {
    console.error("Add cart API error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


/* =========================================================
   GET USER CART
========================================================= */

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const {
      data,
      error,
    } = await supabase
      .from("cart")
      .select(`
        id,
        user_id,
        product_id,
        quantity,
        created_at,
        products (*)
      `)
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase get cart error:", error);

      return res.status(500).json({
        message: "Failed to fetch cart",
        error: error.message,
      });
    }

    /*
      Supabase returns:

      {
        id,
        quantity,
        products: {
          id,
          name,
          price,
          image,
          ...
        }
      }

      Your React app currently expects:

      {
        id,
        name,
        price,
        image,
        quantity
      }

      So we flatten the response.
    */

    const cart = data.map((item) => ({
      id: item.product_id,
      cart_id: item.id,
      user_id: item.user_id,
      product_id: item.product_id,
      quantity: item.quantity,
      created_at: item.created_at,

      name: item.products?.name,
      description: item.products?.description,
      price: item.products?.price,
      image: item.products?.image,
      category: item.products?.category,
      gender: item.products?.gender,
      stock: item.products?.stock,
    }));

    res.json(cart);
  } catch (error) {
    console.error("Get cart API error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


/* =========================================================
   UPDATE QUANTITY
========================================================= */

router.put("/update", async (req, res) => {
  try {
    const {
      user_id,
      product_id,
      quantity,
    } = req.body;

    const {
      data,
      error,
    } = await supabase
      .from("cart")
      .update({
        quantity: Number(quantity),
      })
      .eq("user_id", user_id)
      .eq("product_id", product_id)
      .select();

    if (error) {
      console.error("Supabase update cart error:", error);

      return res.status(500).json({
        message: "Failed to update cart",
        error: error.message,
      });
    }

    res.json({
      message: "Cart updated",
      data,
    });
  } catch (error) {
    console.error("Update cart API error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


/* =========================================================
   DELETE FROM CART
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
      .from("cart")
      .delete()
      .eq("product_id", productId)
      .eq("user_id", userId)
      .select();

    if (error) {
      console.error("Supabase delete cart error:", error);

      return res.status(500).json({
        message: "Failed to remove product from cart",
        error: error.message,
      });
    }

    res.json({
      message: "Removed from cart",
      data,
    });
  } catch (error) {
    console.error("Delete cart API error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


module.exports = router;