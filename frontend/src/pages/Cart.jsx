import { useEffect, useState, useContext } from "react";
import "../styles/Cart.css";

import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const { setCartCount } = useContext(StoreContext);

  const userId = 1;

  const fetchCart = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/cart/${userId}`
      );

      const data = await res.json();

      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/cart/${productId}/${userId}`,
        {
          method: "DELETE",
        }
      );

      /* Update cart UI */

      setCart(
        cart.filter((item) => item.id !== productId)
      );

      /* Update navbar counter */

      setCartCount((prev) => Math.max(prev - 1, 0));

      toast.info("Removed from Cart 🛒");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (productId, qty) => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/cart/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            product_id: productId,
            quantity: qty,
          }),
        }
      );

      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      {/* ================= HEADER ================= */}

      <section className="cart-header">

        <div>
          <span className="cart-eyebrow">
            YOUR SHOPPING BAG
          </span>

          <h1>
            Shopping <span>Cart</span>
          </h1>

          <p>
            Review your selected products before
            continuing with your purchase.
          </p>
        </div>

        <div className="cart-count-badge">
          <span>{cart.length}</span>
          {cart.length === 1 ? " Item" : " Items"}
        </div>

      </section>


      {/* ================= EMPTY CART ================= */}

      {cart.length === 0 ? (

        <section className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

        </section>

      ) : (

        <div className="cart-layout">

          {/* ================= CART ITEMS ================= */}

          <section className="cart-items-section">

            <div className="cart-section-title">
              <h2>Your Items</h2>

              <span>
                {cart.length}{" "}
                {cart.length === 1 ? "product" : "products"}
              </span>
            </div>


            <div className="cart-items">

              {cart.map((item) => (

                <article
                  className="cart-item"
                  key={item.id}
                >

                  {/* PRODUCT IMAGE */}

                  <div className="cart-image-wrapper">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>


                  {/* PRODUCT INFORMATION */}

                  <div className="cart-info">

                    <span className="cart-product-label">
                      PRODUCT
                    </span>

                    <h3>
                      {item.name}
                    </h3>

                    <p className="cart-price">
                      ₹ {item.price}
                    </p>


                    {/* QUANTITY */}

                    <div className="quantity-section">

                      <span>
                        Quantity
                      </span>

                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(
                                1,
                                Number(item.quantity) - 1
                              )
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Number(item.quantity) + 1
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Keep the original selector functionality */}

                    <select
                      className="quantity-select"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          e.target.value
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>

                  </div>


                  {/* ITEM TOTAL */}

                  <div className="cart-item-right">

                    <strong className="item-total">
                      ₹{" "}
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      <span>×</span>
                      Remove
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </section>


          {/* ================= ORDER SUMMARY ================= */}

          <aside className="order-summary">

            <div className="summary-header">

              <span>ORDER SUMMARY</span>

              <h2>
                Your Order
              </h2>

            </div>


            <div className="summary-items">

              <div className="summary-row">

                <span>
                  Products
                </span>

                <strong>
                  {cart.length}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹ {total.toFixed(2)}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Shipping
                </span>

                <strong className="free">
                  FREE
                </strong>

              </div>

            </div>


            <div className="summary-divider" />


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹ {total.toFixed(2)}
              </strong>

            </div>


            {/* INFORMATION */}

            <div className="cart-security">

              <div>
                <span>✓</span>
                Secure checkout
              </div>

              <div>
                <span>✓</span>
                Easy returns
              </div>

              <div>
                <span>✓</span>
                Quality guaranteed
              </div>

            </div>

          </aside>

        </div>

      )}

    </div>
  );
}