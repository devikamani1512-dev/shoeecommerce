import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import axios from "axios";

const parseInfo = (desc = "") => {
  const r = desc.match(/Rating:\s*(\d)/);
  return {
    rating: r ? Number(r[1]) : 0,
    colors: desc.match(/#[0-9a-fA-F]{6}/g) || [],
  };
};

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleProceedToCheckout = (item) => {
    navigate("/login", {
      state: { items: item ? [item] : cart },
    });
  };

  const loadCart = async () => {
    const token = localStorage.getItem("stepup_access_token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Cart API response:", response.data);
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Cart load failed:", error.response?.data || error);
      setCart([]);
    }
  };

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const updateQuantity = async (index, newQuantity) => {
    const item = cart[index];
    const token = localStorage.getItem("stepup_access_token");

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/${item.cart_item_id}/`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Quantity update failed:",
        error.response?.data || error
      );
      alert("Could not update quantity.");
    }
  };

  const updateSize = async (index, newSize) => {
    const item = cart[index];
    const token = localStorage.getItem("stepup_access_token");

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/${item.cart_item_id}/`,
         { size: newSize },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadCart();
    } catch (error) {
      console.error("Size update failed:", error.response?.data || error);
      alert("Could not update size.");
    }
  };

  const removeItem = async (item) => {
    const token = localStorage.getItem("stepup_access_token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/${item.cart_item_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Remove item failed:",
        error.response?.status,
        error.response?.data
      );
      alert("Could not remove item.");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const delivery = 0;
  const total = subtotal + delivery;
  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  return (
    <main className="cart-page">
      <button className="cart-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="cart-title">My Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your shopping cart is empty.</p>
          <button onClick={() => navigate("/kids")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <p className="cart-delivery-message">
            Free &amp; Fast arriving by Monday ordr within 23 hours,53
            minutes,50seconds
          </p>

          <section className="cart-table" aria-label="Shopping cart">
            <div className="cart-table-header">
              <span>Product</span>
              <span>Size</span>
              <span>Quantity</span>
              <span>Unit Price</span>
              <span>Total Price</span>
              <span>Checkout</span>
            </div>

            {cart.map((item, index) => {
              const quantity = Number(item.quantity || 1);
              const price = Number(item.price || 0);
              const itemTotal = price * quantity;

              return (
                <article
                  className="cart-table-row"
                  key={item.cart_item_id}
                >
                  <div className="cart-product-cell">
                    {item.image ? (
                      <img
                        className="cart-item-image"
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `${import.meta.env.VITE_API_URL}${item.image}`
                        }
                        alt={item.name || "Product"}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="cart-item-image cart-image-placeholder">
                        Image unavailable
                      </div>
                    )}

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                     <p>{item.category}</p>
{(() => {
  const { rating, colors } = parseInfo(item.description);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: "#f5a623" }}>
        {"★".repeat(rating)}
        <span style={{ color: "#ccc" }}>{"★".repeat(5 - rating)}</span>
      </span>
      {colors.map((c) => (
        <span
          key={c}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: c,
            border: "1px solid #999",
            display: "inline-block",
          }}
        />
      ))}
    </div>
  );
})()}
                      <span className="cart-stock">● In Stock</span>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeItem(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-size-cell">
                    {item.size ? (
                      <select
                        className="cart-size-select"
                        value={item.size}
                        onChange={(event) =>
                          updateSize(index, Number(event.target.value))
                        }
                        aria-label={`Select size for ${item.name}`}
                      >
                        {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>—</span>
                    )}
                  </div>

                  <div className="cart-quantity-cell">
                    <div className="cart-quantity-stepper">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                        onClick={() => updateQuantity(index, quantity - 1)}
                      >
                        −
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={quantity >= 10}
                        onClick={() => updateQuantity(index, quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-price-cell">{formatPrice(price)}</div>

                  <div className="cart-price-cell cart-item-total">
                    {formatPrice(itemTotal)}
                  </div>

                  <div className="cart-row-checkout">
                    <button
                      className="cart-checkout-btn"
                      onClick={() => handleProceedToCheckout(item)}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <div className="cart-bottom">
            <button
              className="cart-continue-btn"
              onClick={() => navigate("/womens")}
            >
              ← Continue Shopping
            </button>

            <section className="cart-summary">
              <h2>Summary</h2>

              <p>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </p>

              <div className="cart-delivery-row">
                <span>Delivery</span>
                <strong>Free</strong>
                <a
                  className="delivery-info"
                  href="/delivery-information"
                >
                  Delivery &amp; return information <span aria-hidden="true">🚚</span>
                </a>
              </div>

              <hr />

              <p className="cart-total">
                <strong>Total</strong>
                <strong>{formatPrice(total)}</strong>
              </p>

              <button
                className="cart-checkout-btn"
                onClick={() => handleProceedToCheckout()}
              >
                🔒 Checkout Securely
              </button>
            </section>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;