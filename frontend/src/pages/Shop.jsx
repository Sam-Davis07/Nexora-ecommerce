import { useEffect, useState, useContext } from "react";
import "../styles/Shop.css";

import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { StoreContext } from "../context/StoreContext";

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [gender, setGender] = useState("");
  const [stock, setStock] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const [wishlist, setWishlist] = useState([]);

  const [mobileFilters, setMobileFilters] = useState(false);

  const { setCartCount, setWishlistCount } =
    useContext(StoreContext);

  const userId = 1;

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams(
          location.search
        );

        const search = params.get("search");

        let url =
          `${process.env.REACT_APP_API_URL}/api/products?`;

        if (search) {
          url += `search=${search}&`;
        }

        if (gender) {
          url += `gender=${gender}&`;
        }

        if (stock) {
          url += `stock=${stock}&`;
        }

        if (priceRange) {
          const [min, max] =
            priceRange.split("-");

          url += `minPrice=${min}&maxPrice=${max}&`;
        }

        if (categories.length > 0) {
          url += `categories=${categories.join(",")}&`;
        }

        if (sortOption) {
          url += `sort=${sortOption}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );

        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, [
    gender,
    stock,
    priceRange,
    categories,
    sortOption,
    location.search,
  ]);

  /* ================= CATEGORY CHECKBOX ================= */

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (categories.includes(value)) {
      setCategories(
        categories.filter(
          (c) => c !== value
        )
      );
    } else {
      setCategories([
        ...categories,
        value,
      ]);
    }
  };

  /* ================= FETCH WISHLIST ================= */

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/wishlist/${userId}`
        );

        const data = await res.json();

        setWishlist(
          data.map((item) => item.id)
        );
      } catch (error) {
        console.error(
          "Failed to fetch wishlist:",
          error
        );
      }
    };

    fetchWishlist();
  }, []);

  /* ================= TOGGLE WISHLIST ================= */

  const toggleWishlist = async (
    e,
    productId
  ) => {
    e.stopPropagation();

    const isWishlisted =
      wishlist.includes(productId);

    try {
      if (isWishlisted) {
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/wishlist/${productId}/${userId}`,
          {
            method: "DELETE",
          }
        );

        setWishlist(
          wishlist.filter(
            (id) => id !== productId
          )
        );

        setWishlistCount(
          (prev) =>
            Math.max(prev - 1, 0)
        );

        toast.info(
          "Removed from Wishlist"
        );
      } else {
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/wishlist/add`,
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

        setWishlist([
          ...wishlist,
          productId,
        ]);

        setWishlistCount(
          (prev) => prev + 1
        );

        toast.success(
          "Added to Wishlist ❤️"
        );
      }
    } catch (error) {
      console.error(
        "Wishlist error:",
        error
      );

      toast.error(
        "Something went wrong"
      );
    }
  };

  /* ================= ADD TO CART ================= */

  const addToCart = async (
    e,
    productId
  ) => {
    e.stopPropagation();

    try {
      await fetch(
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

      setCartCount(
        (prev) => prev + 1
      );

      toast.success(
        "Added to Cart 🛒"
      );
    } catch (error) {
      console.error(
        "Cart error:",
        error
      );

      toast.error(
        "Failed to add to cart"
      );
    }
  };

  /* ================= CLEAR FILTERS ================= */

  const clearFilters = () => {
    setGender("");
    setStock("");
    setPriceRange("");
    setCategories([]);
    setSortOption("");

    navigate("/shop");
  };

  /* ================= ACTIVE FILTER COUNT ================= */

  const activeFilters =
    (gender ? 1 : 0) +
    (stock ? 1 : 0) +
    (priceRange ? 1 : 0) +
    categories.length;

  return (
    <div className="shop-page">

      {/* =====================================================
          SHOP HEADER
      ===================================================== */}

      <section className="shop-hero">

        <div className="shop-hero-content">

          <span className="shop-eyebrow">
            EXPLORE OUR COLLECTION
          </span>

          <h1>
            Find Your
            <span> Style.</span>
          </h1>

          <p>
            Discover carefully curated fashion,
            sneakers and lifestyle essentials
            designed for everyday living.
          </p>

        </div>

      </section>


      {/* =====================================================
          SHOP CONTENT
      ===================================================== */}

      <div className="shop-container">


        {/* ===================================================
            MOBILE FILTER BUTTON
        =================================================== */}

        <button
          className="mobile-filter-btn"
          onClick={() =>
            setMobileFilters(true)
          }
        >
          <FaSlidersH />

          Filters

          {activeFilters > 0 && (
            <span>
              {activeFilters}
            </span>
          )}
        </button>


        {/* ===================================================
            FILTER OVERLAY
        =================================================== */}

        {mobileFilters && (
          <div
            className="filter-overlay"
            onClick={() =>
              setMobileFilters(false)
            }
          />
        )}


        {/* ===================================================
            FILTER SIDEBAR
        =================================================== */}

        <aside
          className={`filters ${
            mobileFilters
              ? "filters-mobile-open"
              : ""
          }`}
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <div className="filter-header">

            <div>
              <span>
                REFINE
              </span>

              <h2>
                Filters
              </h2>
            </div>

            <button
              className="filter-close"
              onClick={() =>
                setMobileFilters(false)
              }
            >
              <FaTimes />
            </button>

          </div>


          {/* CLEAR */}

          <button
            className="clear-btn"
            onClick={clearFilters}
          >
            Clear All
          </button>


          {/* GENDER */}

          <div className="filter-group">

            <h3>
              Gender
            </h3>

            <label>
              <input
                type="radio"
                name="gender"
                value="Men"
                checked={
                  gender === "Men"
                }
                onChange={(e) =>
                  setGender(
                    e.target.value
                  )
                }
              />

              <span>
                Men
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Women"
                checked={
                  gender === "Women"
                }
                onChange={(e) =>
                  setGender(
                    e.target.value
                  )
                }
              />

              <span>
                Women
              </span>
            </label>

          </div>


          {/* PRODUCTS */}

          <div className="filter-group">

            <h3>
              Products
            </h3>

            <label>
              <input
                type="checkbox"
                value="Low Top Sneakers"
                checked={categories.includes(
                  "Low Top Sneakers"
                )}
                onChange={
                  handleCategoryChange
                }
              />

              <span>
                Low Top Sneakers
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                value="Mid Top Sneakers"
                checked={categories.includes(
                  "Mid Top Sneakers"
                )}
                onChange={
                  handleCategoryChange
                }
              />

              <span>
                Mid Top Sneakers
              </span>
            </label>

          </div>


          {/* STOCK */}

          <div className="filter-group">

            <h3>
              Availability
            </h3>

            <label>
              <input
                type="radio"
                name="stock"
                value="in"
                checked={
                  stock === "in"
                }
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
              />

              <span>
                In Stock
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="stock"
                value="out"
                checked={
                  stock === "out"
                }
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
              />

              <span>
                Out Of Stock
              </span>
            </label>

          </div>


          {/* PRICE */}

          <div className="filter-group">

            <h3>
              Price Range
            </h3>

            {[
              ["0-1600", "₹0 - ₹1600"],
              ["1600-2100", "₹1600 - ₹2100"],
              ["2100-2600", "₹2100 - ₹2600"],
              ["2600-3000", "₹2600 - ₹3000"],
              ["3000-999999", "₹3000 - Above"],
            ].map(
              ([value, label]) => (
                <label key={value}>

                  <input
                    type="radio"
                    name="price"
                    value={value}
                    checked={
                      priceRange ===
                      value
                    }
                    onChange={(e) =>
                      setPriceRange(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    {label}
                  </span>

                </label>
              )
            )}

          </div>

        </aside>


        {/* ===================================================
            PRODUCTS
        =================================================== */}

        <main className="products-section">


          {/* SHOP HEADER */}

          <div className="shop-header">

            <div>

              <span className="results-label">
                COLLECTION
              </span>

              <h2>
                Products
                <span>
                  {" "}({products.length})
                </span>
              </h2>

            </div>


            <div className="sort-wrapper">

              <span>
                Sort by
              </span>

              <select
                className="sort-dropdown"
                value={sortOption}
                onChange={(e) =>
                  setSortOption(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Recommended
                </option>

                <option value="low-high">
                  Price: Low → High
                </option>

                <option value="high-low">
                  Price: High → Low
                </option>

              </select>

            </div>

          </div>


          {/* ACTIVE FILTERS */}

          {activeFilters > 0 && (
            <div className="active-filters">

              <span>
                {activeFilters} active
                {activeFilters === 1
                  ? " filter"
                  : " filters"}
              </span>

              <button
                onClick={clearFilters}
              >
                Clear
              </button>

            </div>
          )}


          {/* PRODUCT GRID */}

          {products.length === 0 ? (

            <div className="no-products">

              <div className="no-products-icon">
                ✦
              </div>

              <h3>
                No products found
              </h3>

              <p>
                Try adjusting your filters
                or exploring another
                collection.
              </p>

              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="product-grid">

              {products.map(
                (product) => (

                  <article
                    className="product-card"
                    key={product.id}
                    onClick={() =>
                      navigate(
                        `/product/${product.id}`
                      )
                    }
                  >

                    {/* IMAGE */}

                    <div className="image-container">

                      <img
                        src={product.image}
                        alt={product.name}
                      />


                      {/* WISHLIST */}

                      <button
                        className={`wishlist-icon ${
                          wishlist.includes(
                            product.id
                          )
                            ? "wishlisted"
                            : ""
                        }`}
                        onClick={(e) =>
                          toggleWishlist(
                            e,
                            product.id
                          )
                        }
                        aria-label="Toggle wishlist"
                      >

                        {wishlist.includes(
                          product.id
                        ) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}

                      </button>


                      {/* CATEGORY BADGE */}

                      <span className="product-badge">
                        {product.category}
                      </span>

                    </div>


                    {/* PRODUCT INFO */}

                    <div className="product-info">

                      <p className="product-category">
                        {product.category}
                      </p>

                      <h3>
                        {product.name}
                      </h3>

                      <div className="product-bottom">

                        <p className="price">
                          ₹{" "}
                          {product.price}
                        </p>

                        <button
                          className="cart-btn"
                          onClick={(e) =>
                            addToCart(
                              e,
                              product.id
                            )
                          }
                        >
                          <FaShoppingBag />

                          <span>
                            Add
                          </span>
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </main>

      </div>

    </div>
  );
}