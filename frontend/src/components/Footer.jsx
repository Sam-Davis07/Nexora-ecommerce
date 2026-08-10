import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";

import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      {/* ================= TOP FOOTER ================= */}

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <div className="footer-logo">
            <span className="footer-logo-mark">
              N
            </span>

            <span>
              NEXORA
            </span>
          </div>

          <p>
            Modern products. Timeless style.
            Discover a better way to shop for
            fashion, sneakers and lifestyle
            essentials.
          </p>

          <div className="footer-socials">

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>

          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>
            Explore
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/shop">
            Shop
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/cart">
            Cart
          </Link>

        </div>


        {/* CUSTOMER */}

        <div className="footer-column">

          <h3>
            Customer Care
          </h3>

          <a href="#">
            Contact Us
          </a>

          <a href="#">
            Shipping & Delivery
          </a>

          <a href="#">
            Returns & Refunds
          </a>

          <a href="#">
            FAQs
          </a>

          <a href="#">
            Privacy Policy
          </a>

        </div>


        {/* NEWSLETTER */}

        <div className="footer-newsletter">

          <h3>
            Stay in the loop.
          </h3>

          <p>
            Subscribe to get updates about
            new arrivals, exclusive offers
            and more.
          </p>

          <div className="newsletter-form">

            <input
              type="email"
              placeholder="Your email address"
            />

            <button>
              Join
            </button>

          </div>

        </div>

      </div>


      {/* ================= BOTTOM ================= */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} NEXORA.
          All rights reserved.
        </p>

        <div>

          <span>
            Built with
          </span>

          <strong>
            React
          </strong>

        </div>

      </div>

    </footer>
  );
}