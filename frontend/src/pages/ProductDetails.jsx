import { useEffect, useState } from "react";

import "../styles/ProductDetails.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const products = [
  { id: 1, name: "Lamar Tan Women’s Lace Sandal", price: 2799, rating: 5, colors: ["#c49a76", "#111111"] },
  { id: 2, name: "Lilley White Diamante Slip-On Shoe", price: 2799, rating: 4, colors: ["#ffffff", "#d8c8b8"] },
  { id: 3, name: "Softlines Navy Sandal", price: 2999, rating: 3, colors: ["#203d5b", "#111111"] },
  { id: 4, name: "Shoezone Floral Beach Mule", price: 2799, rating: 3, colors: ["#426c9b", "#e9b5c7"] },
  { id: 5, name: "Ophelia Women’s Silver Heel", price: 5999, rating: 5, colors: ["#c0c0c0", "#d8b6c0"] },
  { id: 6, name: "Lilley Women’s Patent Shoe", price: 3999, rating: 4, colors: ["#222222", "#704b45"] },
  { id: 7, name: "Noelle Mesh Bow Ballerinas", price: 3999, rating: 3, colors: ["#33201a", "#b99b7d"] },
  { id: 8, name: "Stella Flat Embellished Slides", price: 1999, rating: 5, colors: ["#c8a16b", "#ffffff"] },
  { id: 9, name: "Olivia Pencil Heels", price: 3999, rating: 4, colors: ["#111111", "#b8a28b"] },
  { id: 10, name: "Amelia Kitten Heels", price: 2999, rating: 2, colors: ["#e6d1a8", "#111111"] },
  { id: 11, name: "Beckett Sandals", price: 2999, rating: 5, colors: ["#b9a18a", "#ffffff"] },
  { id: 12, name: "Glamo Flat Black Sandals", price: 1799, rating: 3, colors: ["#111111", "#c49a76"] },
];
const menProducts = [
  { id: 1, name: "Comfy Steps White Strap Sandal", price: 1999, rating: 5, colors: ["#ffffff", "#111111"] },
  { id: 2, name: "Hush Puppies Tan Boat Shoe", price: 2799, rating: 4, colors: ["#c49a76", "#111111"] },
  { id: 3, name: "XL Wear Men’s Lace-Up Trainer", price: 2799, rating: 4, colors: ["#ffffff", "#111111"] },
  { id: 4, name: "Doubal Strap Sandals", price: 1999, rating: 4, colors: ["#c49a76", "#111111"] },
  { id: 5, name: "Osaga Blue Lace-Up Trainer", price: 2799, rating: 4, colors: ["#203d5b", "#ffffff"] },
  { id: 6, name: "Urban Territory Brown Boots", price: 3999, rating: 5, colors: ["#704b45", "#111111"] },
  { id: 7, name: "Men’s Black Leather Loafers", price: 2999, rating: 4, colors: ["#111111", "#704b45"] },
  { id: 8, name: "Urban Territory Black Boots", price: 3999, rating: 5, colors: ["#111111", "#704b45"] },
  { id: 9, name: "Mateo Brown Casual Sneakers", price: 2999, rating: 4, colors: ["#704b45", "#ffffff"] },
  { id: 10, name: "Lamore Tan Leather Loafers", price: 3999, rating: 4, colors: ["#c49a76", "#111111"] },
  { id: 11, name: "Leather Rhythmic Sandals", price: 2999, rating: 4, colors: ["#c49a76", "#111111"] },
  { id: 12, name: "Herfa Hand-Painted Leather Sandals", price: 4999, rating: 5, colors: ["#c49a76", "#ffffff"] },
];
const kidsProducts = [
  { id: 1, name: "Whitney Girls White Multi Marble EVA Clog", price: 2799, rating: 4, colors: ["#e8b8f0", "#ffffff"] },
  { id: 2, name: "Walkright Claudia Girls Blue Fasten Canvas", price: 3199, rating: 4, colors: ["#6b9cc4", "#ffffff"] },
  { id: 3, name: "Walkright Girls Pink Polka Dot Canvas", price: 3499, rating: 5, colors: ["#f48fb1", "#ffffff"] },
  { id: 4, name: "Walkright Girls Multi-T Bar Sandal", price: 4799, rating: 4, colors: ["#e8c9f4", "#ffffff"] },
  { id: 5, name: "The Slipper Company Cherish Girls Pink Bootie", price: 2699, rating: 4, colors: ["#f5c4e0", "#ffffff"] },
  { id: 6, name: "LOL Surprise Kids Fasten Slipper", price: 2799, rating: 5, colors: ["#ec238c", "#ffffff"] },
  { id: 7, name: "Bluey Kids Blue Easy Fasten Slipper", price: 4999, rating: 4, colors: ["#73b7ed", "#ffffff"] },
  { id: 8, name: "Spider-Man Kids Red Light Up Trainer", price: 5799, rating: 5, colors: ["#18365d", "#e53935"] },
  { id: 9, name: "Disney Stitch Pink Round Kids EVA Clog", price: 3999, rating: 4, colors: ["#c6a9e8", "#f5b9d5"] },
  { id: 10, name: "Disney Frozen Purple Strap Sandal", price: 5999, rating: 5, colors: ["#9b7be0", "#ffffff"] },
  { id: 11, name: "Shoeszone Short Kids Black Welly Size 1 to 6", price: 3999, rating: 4, colors: ["#222222", "#555555"] },
  { id: 12, name: "Shoeszone Kids Unicorn Welly", price: 3999, rating: 5, colors: ["#6d4c9b", "#ec8cc4"] },
];

function ProductDetails() {
  const { id } = useParams();
const navigate = useNavigate();
const location = useLocation();

const isMenProduct = location.pathname.startsWith("/men/product/");
const isKidsProduct = location.pathname.startsWith("/kids/product/");
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  axios
    .get("http://127.0.0.1:8000/api/products/")
    .then((res) => {
     const found = res.data.find((item) => item.id === Number(id));

if (found) {
  const desc = found.description || "";
  const ratingMatch = desc.match(/Rating:\s*(\d)/);
  const colorMatch = desc.match(/#[0-9a-fA-F]{6}/g);

  setProduct({
    ...found,
    rating: ratingMatch ? Number(ratingMatch[1]) : 4,
    colors: colorMatch || ["#17294D", "#111111"],
  });
} else {
  setProduct(null);
}
})

    .catch((error) => {
      console.error("Product fetch error:", error);
      setProduct(null);
    })
    .finally(() => setLoading(false));
}, [id]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  if (loading) {
  return <main className="product-details-page">Loading product...</main>;
}
  if (!product) {
    return (
      <main className="product-details-page">
        <h2>Product not found</h2>
        <button
  onClick={() =>
    navigate(isKidsProduct ? "/kids" : isMenProduct ? "/mens" : "/womens")
  }
>
  Back to {isKidsProduct ? "Kids" : isMenProduct ? "Mens" : "Womens"}
</button>
      </main>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
     cart.push({
  ...product,
  image: product.image,
  size: selectedSize,
  quantity,
});
 }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.name} added to cart!`);
  };


const handleAddToCart = async () => {
  if (!selectedSize) {
    alert("Please select a shoe size.");
    return;
  }

  const token = localStorage.getItem("stepup_access_token");

  if (!token) {
    alert("Please login to add items to your cart.");
    navigate("/login");
    return;
  }

  try {
    await axios.post(
      "http://127.0.0.1:8000/api/cart/add/",
      {
        product_id: product.id,
        size: String(selectedSize),
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (item) => item.id === product.id && String(item.size) === String(selectedSize)
    );

    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
      cart.push({ ...product, size: selectedSize, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  } catch (error) {
    console.error(
      "Add to cart failed:",
      error.response?.status,
      error.response?.data
    );
    alert(error.response?.data?.detail || "Could not add product to cart.");
  }
};

  const handleBuyNow = () => {
  if (!selectedSize) {
    alert("Please select a shoe size.");
    return;
  }

  const checkoutItem = {
    ...product,
    image: isKidsProduct
      ? `/images/kids${product.id}.png`
      : isMenProduct
      ? `/images/men${product.id}.png`
      : `/images/women${product.id}.jpg`,
    size: selectedSize,
    quantity,
  };

  navigate("/login", {
    state: {
      items: [checkoutItem],
    },
  });
};

  return (
    <main className="product-details-page">
      <button className="details-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-details-layout">
        <div className="product-details-gallery">
          <div className="details-image-box">
           <img

  src={
  !product.image
    ? ""
    : product.image.startsWith("http")
    ? product.image
    : `http://127.0.0.1:8000/media/${product.image.replace(/^\/?media\//, "")}`
}
  alt={product.name}
/>
          </div>
        </div>

        <section className="product-details-info">
          <h1>{product.name}</h1>

          <p className="details-rating">
            {"★".repeat(product.rating)}
            <span>{"★".repeat(5 - product.rating)}</span>
            <small>({product.rating}/5 reviews)</small>
          </p>

          <h2>MRP: ₹{Number(product.price).toLocaleString("en-IN")}</h2>

          <div className="details-color-row">
            <span>Color:</span>
            {(product.colors || []).map((color) => (
  <span
    key={color}
    className="details-color"
    style={{ backgroundColor: color }}
  />
))}
          </div>

          <hr />

          <p className="details-size-title">Shoe Size</p>
          <div className="details-sizes">
            {[4, 5, 6, 7, 8, 9].map((size) => (
              <button
                key={size}
                type="button"
                className={selectedSize === size ? "selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <hr />

          <p className="details-quantity">Quantity</p>
          <div className="details-quantity-control">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((current) => current + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <hr />

          <div className="details-actions">
            <button className="details-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="details-buy-btn" onClick={handleBuyNow}>
  Buy Now
  <span className="buy-now-logos">
    <img src="/images/paypal.png" alt="PayPal" />
  </span>
</button>
          </div>

          <div className="details-payment">
            <p>Secure Checkout With</p>
            <div className="details-payment-logos">
               <img src="/images/upi.png" alt="UPI" />
              <img src="/images/mastercard.png" alt="Mastercard" />
              <img src="/images/rupay.png" alt="RuPay" />
              <img src="/images/visa.png" alt="Visa" />
              <img src="/images/paypal.png" alt="PayPal" />
            </div>
          </div>
          <div className="details-size-connect">
  <span>Unsure about your size? Let’s connect</span>
  <img src="/images/whatsapp.png" alt="WhatsApp" />
</div>

          <div className="details-delivery-box">
            <p>COD Available</p>
            <p>24 Hour Dispatch</p>
            <p>7 Days easy return &amp; exchange</p>
          </div>

          <h3>Product Details</h3>
          <p className="details-description">
            The Harlan men's boat shoes from Comfy Steps are perfect for your casual
  summer outings. Featuring a tan upper with navy blue accents and intricate
  white stitching, these shoes offer a trendy look. The twin elasticated
  gussets and lace-up fastening ensure a quick and secure fit, while the
  gripped outsole provides stability and security.
          </p>
        </section>
      </div>
<section className="details-reviews">
  <h2>Reviews:</h2>

  {[1, 2].map((review) => (
    <article className="details-review-card" key={review}>
      <div className="review-left">
        <div className="review-user">
          <img
            className="review-avatar"
            src={`/images/avatar${review}.png`}
            alt="Reviewer avatar"
          />
          <div>
            <strong>Reviewed by Beverley</strong>
            <p>From: Weymouth</p>
          </div>
        </div>

        {["Fit", "Comfort", "Value for Money", "Quality"].map((item) => (
          <p className="review-rating" key={item}>
            <span>{item}</span>
            <span className="review-stars">★★★★★</span>
          </p>
        ))}
      </div>

      <div className="review-right">
        <strong>Super Looking</strong>
        <p>Overall rating <span className="review-stars">★★★★★</span></p>
        <p>
          Very pleased with the super fast delivery and packaging.
          Shoes are very good quality and superb. See more...
        </p>
        <small>Beverley would recommend this product <span>✔</span></small>
      </div>
    </article>
  ))}
</section>
    </main>
    );
}

export default ProductDetails;