
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { useState } from "react";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/unga-page-name",
  instagram: "https://www.instagram.com/unga_username",
  x: "https://x.com/unga_username",
  meta: "https://www.meta.com/",
};


function Footer() {
  const [email, setEmail] = useState("");

const handleSubscribe = (e) => {
  e.preventDefault();
  alert("Subscribed successfully! Thank you for joining us.");
  setEmail("");
};
  return (
    <footer className="site-footer">
      <div className="footer-column">
        <h3>Contact Us</h3>
        <p>We’d love to hear from you!</p>
        <p>Landline: XXXXXXXXXX</p>
        <p>WhatsApp: +91 XXXXXXXXXX</p>
        <p>Email: stepup@gmail.com</p>
        <p>Address: Tenkasi, Tamil Nadu, India</p>
      </div>

      <div className="footer-column">
        <h3>Shop</h3>
        <Link to="/products">New In</Link>
        <Link to="/products?category=Womens">Women</Link>
        <Link to="/products?category=Mens">Men</Link>
        <Link to="/products?category=Kids">Kids</Link>
        <Link to="/products">Heels & Accessories</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="footer-column">
        <h3>Info</h3>
        <Link to="/products">Search</Link>
        <Link to="/contact">Return & Exchange Policy</Link>
        <Link to="/contact">Privacy Policy</Link>
        <Link to="/contact">Terms of Service</Link>
        <Link to="/contact">Shipping Policy</Link>
      </div>

 
{/* Social Media */}
<div className="footer-column footer-social">
  <h3>Social Media</h3>

  <div className="social-links">
    {/* Facebook */}
    <a
  href={SOCIAL_LINKS.facebook}
  target="_blank"
  rel="noreferrer"
  aria-label="Facebook"
>
      <svg viewBox="0 0 24 24" width="18" height="18"
           fill="#1877F2">
        <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.8-4.67 4.54-4.67 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12"/>
      </svg>
    </a>

    {/* Instagram */}
    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
      <svg viewBox="0 0 24 24" width="18" height="18"
           fill="none" stroke="#E4405F" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#E4405F"/>
      </svg>
    </a>

    {/* X / Twitter */}
   <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" aria-label="X Twitter">
      <svg viewBox="0 0 24 24" width="18" height="18"
           fill="currentColor">
        <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.55L5.45 22H2.3l7.25-8.3L1.8 2h6.4l4.43 6.96L18.9 2zm-1.1 18h1.73L7.26 3.9H5.4L17.8 20z"/>
      </svg>
    </a>

    {/* Meta */}
    <a href={SOCIAL_LINKS.meta} target="_blank" rel="noreferrer" aria-label="Meta">
      <svg viewBox="0 0 24 24" width="22" height="18"
           fill="none" stroke="#0866FF" strokeWidth="3">
        <path d="M2 16c2-7 5-12 8-12 4 0 7 16 11 16 2 0 2-3 1-6-2-7-5-10-8-10-4 0-7 16-11 16-2 0-2-2-1-4"/>
      </svg>
    </a>
  </div>
</div>
      <div className="footer-column footer-newsletter">
        <h3>Let's stay in touch!</h3>
        <p>Sign up for exclusive offers, original stories, events and more.</p>

        <form onSubmit={handleSubscribe}>
  <label htmlFor="newsletter-email">Email id</label>
  <input
    id="newsletter-email"
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <button type="submit">Subscribe</button>
</form>
      </div>
    </footer>
  );
}

export default Footer;
