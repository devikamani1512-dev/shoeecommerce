
import HeroCarousel from "../components/HeroCarousel";
import "../styles/Home.css";
import { Gift } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <HeroCarousel />

      <section className="home-overview">
        <h2>Overview</h2>
        <p>
          Explore our curated selection of high-quality shoes for every occasion.
          From durable athletic shoes designed for peak performance to stylish
          casual sneakers and elegant dress shoes, we offer a diverse range of
          footwear to suit your needs. Our user-friendly interface makes it easy
          to browse our collection and find the perfect fit.
        </p>
      </section>

      <section className="home-categories">
        <h2>What are you looking for?</h2>

        <div className="category-grid">
          <div className="category-card">
  <Link to="/mens">
    <img src="/images/mens-category.jpg" alt="Men's footwear collection" />
    <h3>Mens</h3>
  </Link>
</div>

<div className="category-card">
  <Link to="/womens">
    <img src="/images/womens-category.jpg" alt="Women's footwear collection" />
    <h3>Womens</h3>
  </Link>
</div>

<div className="category-card">
  <Link to="/kids">
    <img src="/images/kids-category.jpg" alt="Kids' footwear collection" />
    <h3>Kids</h3>
  </Link>
</div>

             </div>
      </section>
      
<section className="trending-section">
  <h2>New &amp; Trending</h2>

  <div className="trending-grid">
    <div className="trending-card">
      <img src="/images/trending1.jpg" alt="Ophelia Women's Silver Heel" />
      <h3>Ophelia Womens Silver Diamante Heel</h3>
      <p>MRP: ₹2,299</p>
    </div>

    <div className="trending-card">
      <img src="/images/trending2.jpg" alt="Billie Womens Silver Heel" />
      <h3>Billie Womens Silver Diamante Heel</h3>
      <p>MRP: ₹3,000</p>
    </div>

    <div className="trending-card">
      <img src="/images/trending3.jpg" alt="Drew Womens Blush Shoe" />
      <h3>Drew Womens Blush Diamante Slip On Shoe</h3>
      <p>MRP: ₹2,599</p>
    </div>

    <div className="trending-card">
      <img src="/images/trending4.jpg" alt="Drew Womens Navy Shoe" />
      <h3>Drew Womens Navy Diamante Slip On Shoe</h3>
      <p>MRP: ₹1,999</p>
    </div>

    <div className="trending-card">
      <img src="/images/trending5.jpg" alt="Weaver Mens Navy Trainer" />
      <h3>Weaver Mens Navy Lace Up Trainer</h3>
      <p>MRP: ₹799</p>
    </div>

    <div className="trending-card">
      <img src="/images/trending6.jpg" alt="Weaver Mens White Trainer" />
      <h3>Weaver Mens White Lace Up Trainer</h3>
      <p>MRP: ₹2,250</p>
    </div>

    <div className="trending-card">
      <img src="/images/trending7.jpg" alt="Calista Girls Pink Sandal" />
      <h3>Calista Girls Pink Daisy Print Sandal</h3>
      <p>MRP: ₹1,899</p>
    </div>

    <div className="trending-card">
      <img src="/images/trending8.jpg" alt="Colby Boys Blue Canvas" />
      <h3>Colby Boys Blue Dinosaur Canvas</h3>
      <p>MRP: ₹899</p>
    </div>
  </div>

 <Link to="/products" className="trending-view-btn">
  View all
</Link>
</section>

{/* Animated Gift Offer Banner */}
<section className="gift-offer-banner">
  <span className="gift-icon">
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Gift box - Violet */}
    <rect x="6" y="17" width="28" height="19" rx="3" fill="#8B2BE2" />
    <rect x="4" y="13" width="32" height="7" rx="2" fill="#8B2BE2" />

    {/* Yellow ribbon */}
    <rect x="17" y="13" width="6" height="23" fill="#FFD700" />

    {/* Orange bow */}
    <path
      d="M20 13 C7 13 7 3 14 5 C18 6 20 13 20 13Z"
      fill="#FF9800"
    />
    <path
      d="M20 13 C33 13 33 3 26 5 C22 6 20 13 20 13Z"
      fill="#FF9800"
    />
  </svg>
</span>

  <h2>Get your first order with free gift</h2>

  <span className="gift-icon">
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Gift box - Violet */}
    <rect x="6" y="17" width="28" height="19" rx="3" fill="#8B2BE2" />
    <rect x="4" y="13" width="32" height="7" rx="2" fill="#8B2BE2" />

    {/* Yellow ribbon */}
    <rect x="17" y="13" width="6" height="23" fill="#FFD700" />

    {/* Orange bow */}
    <path
      d="M20 13 C7 13 7 3 14 5 C18 6 20 13 20 13Z"
      fill="#FF9800"
    />
    <path
      d="M20 13 C33 13 33 3 26 5 C22 6 20 13 20 13Z"
      fill="#FF9800"
    />
  </svg>
</span>

  <h2>&amp; 50 % offer</h2>

  <span className="offer-icon">🌟</span>
</section>
    </div>
  );
}

export default Home;
