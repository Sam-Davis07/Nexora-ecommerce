import "../styles/About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-overlay" />

        <div className="about-hero-content">

          <span>OUR STORY</span>

          <h1>
            More Than
            <br />
            <strong>Just Shopping.</strong>
          </h1>

          <p>
            We believe great products should make
            everyday life a little better.
          </p>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="about-features">

        <div className="about-section-heading">

          <span>THE DIFFERENCE</span>

          <h2>
            Why Shop
            <strong> With Us?</strong>
          </h2>

          <p>
            Everything we do is designed around
            making your shopping experience
            simple, secure and enjoyable.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🚚
            </div>

            <div>
              <h3>
                Free Shipping
              </h3>

              <p>
                Fast and reliable delivery
                on all qualifying orders.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              💬
            </div>

            <div>
              <h3>
                24/7 Support
              </h3>

              <p>
                Our support team is always
                ready to help you.
              </p>
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <div>
              <h3>
                Secure Payments
              </h3>

              <p>
                Safe and secure checkout
                for every customer.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="about-stats">

        <div className="stat-item">

          <h2>
            10<span>+</span>
          </h2>

          <p>
            Years Experience
          </p>

        </div>


        <div className="stat-item">

          <h2>
            200<span>+</span>
          </h2>

          <p>
            Products
          </p>

        </div>


        <div className="stat-item">

          <h2>
            500<span>+</span>
          </h2>

          <p>
            Happy Customers
          </p>

        </div>


        <div className="stat-item">

          <h2>
            50<span>+</span>
          </h2>

          <p>
            Brands
          </p>

        </div>

      </section>


      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="about-story">

        <div className="story-image">

          <img
            src="/images/about-product.jpg"
            alt="Our collection"
          />

          <div className="story-image-badge">

            <span>✦</span>

            <div>
              <strong>
                Curated With Care
              </strong>

              <small>
                Quality first, always.
              </small>
            </div>

          </div>

        </div>


        <div className="story-text">

          <span className="story-eyebrow">
            OUR MISSION
          </span>

          <h2>
            The New Fresh
            <br />
            <strong>Shopping Experience.</strong>
          </h2>

          <p>
            Our e-commerce platform provides
            high-quality products with a seamless
            shopping experience.
          </p>

          <p>
            From fashion and sneakers to modern
            lifestyle products, we carefully curate
            our collection to bring together style,
            comfort and quality.
          </p>

          <button className="learn-btn">
            Discover Our Story
            <span>→</span>
          </button>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="about-benefits">

        <div className="about-section-heading">

          <span>SHOP WITH CONFIDENCE</span>

          <h2>
            Perks &
            <strong> Benefits.</strong>
          </h2>

        </div>


        <div className="benefit-grid">

          <div className="benefit-card">

            <div className="benefit-icon">
              💳
            </div>

            <h4>
              Quick Payment
            </h4>

            <p>
              Multiple payment options
              for a convenient checkout.
            </p>

          </div>


          <div className="benefit-card">

            <div className="benefit-icon">
              💰
            </div>

            <h4>
              Affordable Prices
            </h4>

            <p>
              Great products at competitive
              everyday prices.
            </p>

          </div>


          <div className="benefit-card">

            <div className="benefit-icon">
              🏷️
            </div>

            <h4>
              Big Deals
            </h4>

            <p>
              Discover exclusive discounts
              on popular products.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROMOTIONS
      ===================================================== */}

      <section className="about-promos">

        <div className="promo-card promo-sale">

          <div>

            <span>
              LIMITED TIME
            </span>

            <h3>
              Summer Sale
            </h3>

            <p>
              Up to 30% Off
            </p>

          </div>

          <div className="promo-arrow">
            →
          </div>

        </div>


        <div className="promo-card promo-new">

          <div>

            <span>
              JUST DROPPED
            </span>

            <h3>
              New Arrivals
            </h3>

            <p>
              Explore Latest Products
            </p>

          </div>

          <div className="promo-arrow">
            →
          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL MESSAGE
      ===================================================== */}

      <section className="about-final">

        <span>
          MADE FOR EVERYDAY LIFE
        </span>

        <h2>
          Style should feel
          <br />
          <strong>effortless.</strong>
        </h2>

        <p>
          Discover products you'll love,
          designed to fit naturally into
          your everyday lifestyle.
        </p>

      </section>

    </div>
  );
}