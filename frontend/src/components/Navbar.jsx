import React, {
  useState,
  useEffect,
  useContext,
} from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "../styles/Navbar.css";

import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    cartCount,
    wishlistCount,
    setCartCount,
    setWishlistCount,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();

  const userId = 1;

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    navigate(`/shop?search=${value}`);
  };


  /* =====================================================
     FETCH COUNTS
  ===================================================== */

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const cartRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/cart/${userId}`
        );

        const cartData = await cartRes.json();

        const wishRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/wishlist/${userId}`
        );

        const wishData = await wishRes.json();

        setCartCount(cartData.length);
        setWishlistCount(wishData.length);

      } catch (error) {
        console.error(
          "Failed to fetch navbar counts:",
          error
        );
      }
    };

    fetchCounts();
  }, [setCartCount, setWishlistCount]);


  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =====================================================
     CURRENT PAGE
  ===================================================== */

  const isActive = (path) => {
    return location.pathname === path;
  };


  return (
    <header className="navbar">

      {/* =================================================
          LOGO
      ================================================= */}

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        <span className="logo-mark">
          N
        </span>

        <span className="logo-text">
          NEXORA
        </span>
      </Link>


      {/* =================================================
          DESKTOP NAVIGATION
      ================================================= */}

      <nav className="nav-links">

        <Link
          to="/"
          className={
            isActive("/")
              ? "active"
              : ""
          }
        >
          Home
        </Link>

        <Link
          to="/shop"
          className={
            isActive("/shop")
              ? "active"
              : ""
          }
        >
          Shop
        </Link>

        <Link
          to="/about"
          className={
            isActive("/about")
              ? "active"
              : ""
          }
        >
          About
        </Link>

      </nav>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="nav-right">

        {/* SEARCH */}

        <div className="search-bar">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={
              handleSearchChange
            }
          />

        </div>


        {/* WISHLIST */}

        <Link
          to="/wishlist"
          className="nav-icon"
          aria-label="Wishlist"
        >

          <FaHeart />

          {wishlistCount > 0 && (
            <span className="badge">
              {wishlistCount}
            </span>
          )}

        </Link>


        {/* CART */}

        <Link
          to="/cart"
          className="nav-icon"
          aria-label="Cart"
        >

          <FaShoppingBag />

          {cartCount > 0 && (
            <span className="badge">
              {cartCount}
            </span>
          )}

        </Link>


        {/* MOBILE MENU BUTTON */}

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

      </div>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <div
        className={`mobile-menu ${
          menuOpen
            ? "mobile-menu-open"
            : ""
        }`}
      >

        <Link
          to="/"
          className={
            isActive("/")
              ? "mobile-active"
              : ""
          }
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/shop"
          className={
            isActive("/shop")
              ? "mobile-active"
              : ""
          }
          onClick={closeMenu}
        >
          Shop
        </Link>

        <Link
          to="/about"
          className={
            isActive("/about")
              ? "mobile-active"
              : ""
          }
          onClick={closeMenu}
        >
          About
        </Link>

        <div className="mobile-divider" />

        <Link
          to="/wishlist"
          onClick={closeMenu}
        >
          <FaHeart />
          Wishlist

          {wishlistCount > 0 && (
            <span className="mobile-count">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          onClick={closeMenu}
        >
          <FaShoppingBag />
          Cart

          {cartCount > 0 && (
            <span className="mobile-count">
              {cartCount}
            </span>
          )}
        </Link>

      </div>

    </header>
  );
};

export default Navbar;