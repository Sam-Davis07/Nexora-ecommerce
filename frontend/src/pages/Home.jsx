import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-background">
          <img
            src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Polos_Home_Page_Banner.jpg?w=1500&dpr=2"
            alt="Fashion collection"
          />
        </div>

        <div className="hero-gradient" />

        <div className="hero-content">

          <div className="collection-badge">
            <span>✦</span>
            NEW COLLECTION
          </div>

          <p className="hero-eyebrow">
            WELCOME TO OUR STORE
          </p>

          <h1>
            Elevate Your
            <br />
            Everyday <span>Style</span>
          </h1>

          <p className="hero-description">
            Discover the latest trends in fashion, sneakers and
            lifestyle essentials. Curated for comfort. Made for you.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/shop")}
            >
              Shop Now
              <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/about")}
            >
              Explore Collection
            </button>

          </div>

          {/* HERO BENEFITS */}

          <div className="hero-benefits">

            <div className="hero-benefit">
              <div className="benefit-icon">🚚</div>
              <div>
                <strong>Free Shipping</strong>
                <span>On orders over $50</span>
              </div>
            </div>

            <div className="hero-benefit">
              <div className="benefit-icon">🛡</div>
              <div>
                <strong>Secure Payment</strong>
                <span>100% secure checkout</span>
              </div>
            </div>

            <div className="hero-benefit">
              <div className="benefit-icon">↻</div>
              <div>
                <strong>Easy Returns</strong>
                <span>30-day return policy</span>
              </div>
            </div>

          </div>

        </div>

        {/* PROMOTION CARD */}

        <div className="promotion-card">

          <img
            src="https://m.media-amazon.com/images/I/61F5n9hnifL._SX679_.jpg"
            alt="Sneakers"
          />

          <div className="promotion-content">
            <span>Sneakers</span>
            <strong>Collection</strong>
            <small>Up to 30% Off</small>
          </div>

          <button onClick={() => navigate("/shop")}>
            →
          </button>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="categories">

        <div className="section-heading">
          <span>EXPLORE OUR COLLECTION</span>

          <h2>
            Shop By <strong>Category</strong>
          </h2>

          <div className="heading-line" />
        </div>


        <div className="category-grid">

          {/* MEN */}

          <div
            className="category-card"
            onClick={() => navigate("/shop")}
          >

            <img
              src="https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg"
              alt="Phone"
            />

            <div className="category-overlay">
              <div>
                <h3>Phone</h3>
                <span>Explore Now →</span>
              </div>
            </div>

          </div>


          {/* WOMEN */}

          <div
            className="category-card"
            onClick={() => navigate("/shop")}
          >

            <img
              src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1770918710_4029494.jpg?w=480&dpr=2"
              alt="Sneakers"
            />

            <div className="category-overlay">
              <div>
                <h3>Sneakers</h3>
                <span>Explore Now →</span>
              </div>
            </div>

          </div>


          {/* SNEAKERS */}

          <div
            className="category-card"
            onClick={() => navigate("/shop")}
          >

            <img
              src="https://m.media-amazon.com/images/I/61F5n9hnifL._SX679_.jpg"
              alt="Laptops"
            />

            <div className="category-overlay">
              <div>
                <h3>Laptops</h3>
                <span>Explore Now →</span>
              </div>
            </div>

          </div>


          {/* ACCESSORIES */}

          <div
            className="category-card"
            onClick={() => navigate("/shop")}
          >

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
              alt="Accessories"
            />

            <div className="category-overlay">
              <div>
                <h3>Accessories</h3>
                <span>Explore Now →</span>
              </div>
            </div>

          </div>


          {/* BAGS */}

          <div
            className="category-card"
            onClick={() => navigate("/shop")}
          >

            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
              alt="Bags"
            />

            <div className="category-overlay">
              <div>
                <h3>Bags</h3>
                <span>Explore Now →</span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= EXPERIENCE ================= */}

      <section className="experience">

        <div className="experience-content">

          <span>WHY CHOOSE US</span>

          <h2>
            Designed For
            <br />
            <strong>Your Lifestyle.</strong>
          </h2>

          <p>
            We carefully curate products that combine modern
            design, everyday comfort and exceptional quality.
            Everything you need to express your personal style.
          </p>

          <button
            className="dark-btn"
            onClick={() => navigate("/shop")}
          >
            Discover More
            <span>→</span>
          </button>

        </div>


        <div className="experience-images">

          <div className="experience-image large">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000"
              alt="Fashion"
            />
          </div>

          <div className="experience-image small">
            <img
              src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800"
              alt="Lifestyle"
            />
          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="final-cta">

        <div>
          <span>READY TO UPGRADE YOUR STYLE?</span>

          <h2>
            Find Something
            <br />
            You'll Love.
          </h2>
        </div>

        <button
          className="cta-btn"
          onClick={() => navigate("/shop")}
        >
          Shop Collection →
        </button>

      </section>
      <Footer />

    </div>
  );
}