import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DeliverySuccess.css";
import { useEffect } from "react";


function DeliverySuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId = state?.orderId || "Your order ID";
  const product = state?.items?.[0];
  useEffect(() => {
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart.filter(
    (item) =>
      !(
        item.id === product.id &&
        item.size === product.size
      )
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
}, [product]);

  return (
    <main className="delivery-success-page">
      <section className="delivery-success-card">
        <button
          className="delivery-success-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="delivery-success-check">✓</div>
        <h1>Delivered Successfully!</h1>

        <p className="delivery-success-message">
          Your order has been delivered. Thank you for shopping with StepUp.in!
        </p>

        <p className="delivery-success-order-id">
          Order ID: <strong>{orderId}</strong>
        </p>

        {product && (
          <div className="delivery-success-product">
            {product.image && (
              <img
                src={product.image}
                alt={product.name || product.title || "Ordered product"}
                className="delivery-success-product-image"
              />
            )}

            <div className="delivery-success-product-info">
              <h2>{product.name || product.title || "Your product"}</h2>
              <p>Size: {product.size ?? "—"}</p>
              <p>Quantity: {product.quantity ?? 1}</p>
            </div>
          </div>
        )}

        <div className="delivery-success-actions">
          <button
            className="delivery-success-shop-button"
            onClick={() => navigate("/womens")}
          >
            Continue Shopping
          </button>

          <button
  className="delivery-success-details-button"
  onClick={() =>
    navigate("/order-confirmation", {
      state: {
        orderId,
        form: state?.form,
        items: product ? [product] : [],
      },
    })
  }
>
  View Order Details
</button>
        </div>
      </section>
    </main>
  );
}

export default DeliverySuccess;