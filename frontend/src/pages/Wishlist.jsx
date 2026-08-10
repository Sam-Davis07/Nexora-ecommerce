import { useEffect, useState, useContext } from "react";
import "../styles/Wishlist.css";

import {
  FaHeart,
  FaTrash,
  FaShoppingBag,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { StoreContext } from "../context/StoreContext";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);

  const {
    setWishlistCount,
    setCartCount,
  } = useContext(StoreContext);

  const userId = 1;

  /* =====================================================
     FETCH WISHLIST
  ===================================================== */

  const fetchWishlist = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/wishlist/${userId}`
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch wishlist"
        );
      }

      const data = await res.json();

      setWishlist(data);

      // Keep navbar counter synchronized
      setWishlistCount(data.length);

    } catch (error) {
      console.error(
        "Failed to fetch wishlist:",
        error
      );

      toast.error(
        "Failed to load wishlist"
      );
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);


  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */

  const removeItem = async (productId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/wishlist/${productId}/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to remove item"
        );
      }

      /*
        Remove from UI immediately
      */

      setWishlist((prevWishlist) =>
        prevWishlist.filter(
          (item) =>
            item.id !== productId
        )
      );

      /*
        Update navbar counter
      */

      setWishlistCount((prev) =>
        Math.max(prev - 1, 0)
      );

      toast.info(
        "Removed from Wishlist ❤️"
      );

    } catch (error) {
      console.error(
        "Failed to remove item:",
        error
      );

      toast.error(
        "Failed to remove item"
      );
    }
  };


  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCart = async (productId) => {

    /*
      Prevent multiple clicks while
      request is running
    */

    if (addingToCart === productId) {
      return;
    }

    try {
      setAddingToCart(productId);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/cart/add`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            user_id: userId,
            product_id: productId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to add to cart"
        );
      }

      /*
        Update navbar cart counter
      */

      setCartCount((prev) => prev + 1);

      toast.success(
        "Added to Cart 🛒"
      );

    } catch (error) {
      console.error(
        "Failed to add to cart:",
        error
      );

      toast.error(
        "Failed to add product to cart"
      );

    } finally {
      setAddingToCart(null);
    }
  };


  return (
    <div className="wishlist-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="wishlist-header">

        <div>

          <span className="wishlist-eyebrow">
            YOUR FAVORITES
          </span>

          <h1>
            Your
            <span> Wishlist.</span>
          </h1>

          <p>
            Keep the products you love
            close and come back to them
            whenever you're ready.
          </p>

        </div>


        <div className="wishlist-count">

          <div className="wishlist-count-icon">
            <FaHeart />
          </div>

          <div>

            <strong>
              {wishlist.length}
            </strong>

            <span>
              {wishlist.length === 1
                ? " Saved Item"
                : " Saved Items"}
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          EMPTY WISHLIST
      ===================================================== */}

      {wishlist.length === 0 ? (

        <section className="empty-wishlist">

          <div className="empty-heart">
            <FaHeart />
          </div>

          <h2>
            Your wishlist is empty
          </h2>

          <p>
            You haven't saved any products
            yet. When you find something
            you love, tap the heart to save it.
          </p>

        </section>

      ) : (

        <section className="wishlist-content">

          {/* =================================================
              SECTION TITLE
          ================================================= */}

          <div className="wishlist-section-title">

            <div>

              <span>
                SAVED FOR LATER
              </span>

              <h2>
                Your Favorites
              </h2>

            </div>

            <p>
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "product"
                : "products"}
            </p>

          </div>


          {/* =================================================
              WISHLIST GRID
          ================================================= */}

          <div className="wishlist-grid">

            {wishlist.map((item) => (

              <article
                className="wishlist-card"
                key={item.id}
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="wishlist-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />


                  {/* =================================================
                      CLICKABLE HEART
                  ================================================= */}

                  <button
                    className="wishlist-heart"
                    onClick={() =>
                      removeItem(item.id)
                    }
                    aria-label="Remove from wishlist"
                    title="Remove from wishlist"
                  >
                    <FaHeart />
                  </button>


                  {/* =================================================
                      DELETE BUTTON
                  ================================================= */}

                  <button
                    className="remove-wishlist"
                    onClick={() =>
                      removeItem(item.id)
                    }
                    aria-label="Remove from wishlist"
                    title="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>

                </div>


                {/* =================================================
                    PRODUCT INFO
                ================================================= */}

                <div className="wishlist-info">

                  <span className="wishlist-category">
                    FAVORITE
                  </span>

                  <h3>
                    {item.name}
                  </h3>


                  {/* =================================================
                      PRICE + CART
                  ================================================= */}

                  <div className="wishlist-bottom">

                    <p className="wishlist-price">
                      ₹ {item.price}
                    </p>


                    <button
                      className="wishlist-cart-btn"
                      type="button"
                      onClick={() =>
                        addToCart(item.id)
                      }
                      disabled={
                        addingToCart ===
                        item.id
                      }
                    >

                      <FaShoppingBag />

                      <span>
                        {addingToCart ===
                        item.id
                          ? "Adding..."
                          : "Add"}
                      </span>

                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

      )}

    </div>
  );
}