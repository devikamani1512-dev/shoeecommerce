import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/TrackOrder.css";
import ProgressBar from "../components/ProgressBar";

function TrackOrder() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId = state?.orderId || "Your order ID";
  const items = state?.items || [];
  const [orderStatus, setOrderStatus] = useState("Loading...");
const [trackError, setTrackError] = useState("");

useEffect(() => {
  const token = localStorage.getItem("stepup_access_token");

  if (!state?.orderId || !token) {
    setTrackError("Order details or login token not found.");
    return;
  }

  setTrackError("");

  axios
    .get(`http://127.0.0.1:8000/api/orders/${state.orderId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const status = response.data.status;
      setOrderStatus(status);

      if (status === "Delivered") {
        navigate("/delivery-success", {
          state: { orderId, items, form: state?.form },
        });
      }
    })
    .catch((error) => {
      console.error("Track order error:", error.response?.data || error);
      setTrackError("Could not load order status.");
    });
}, [state?.orderId, navigate]);
  const statusOrder = ["Pending", "Confirmed", "Shipped", "Delivered"];
const currentStage = statusOrder.indexOf(orderStatus);
const isDelivered = orderStatus === "Delivered";

const stages = [
  {
    title: "Order Placed",
    description: "We have received your order.",
    icon: "🛒",
    done: currentStage >= 0,
  },
  {
    title: "Order Confirmed",
    description: "Your order is confirmed.",
    icon: "📦",
    done: currentStage >= 1,
  },
  {
    title: "Order Dispatched",
    description: "Your order has been dispatched.",
    icon: "🚚",
    done: currentStage >= 2,
  },
  {
    title: "Delivered",
    description: isDelivered
      ? "Your order has been delivered."
      : "Your order will be delivered to your address.",
    icon: "✓",
    done: isDelivered,
  },
];

 

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  return (
    <main className="track-order-page">
      <section className="track-order-card">
        <button
          className="track-order-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <ProgressBar currentStep={4} />

        <h1>Track Your Order</h1>

        <p className="track-order-id">
          Order ID: <strong>{orderId}</strong>
        </p>
        {trackError && <p role="alert">{trackError}</p>}
{!trackError && <p>Current status: {orderStatus}</p>}

        {items.length > 0 && (
          <section className="track-order-items">
            <h2>Your Order</h2>

            {items.map((item, index) => {
              const quantity = Number(item.quantity || 1);
              const itemTotal = Number(item.price || 0) * quantity;

              return (
                <div
                  className="track-order-product"
                  key={`${item.id || item.name || index}-${item.size || ""}-${index}`}
                >
                  <img
                    className="track-order-product-image"
                    src={item.image}
                    alt={item.name || item.title || "Ordered product"}
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />

                  <div className="track-order-product-details">
                    <h3>{item.name || item.title || "Your product"}</h3>
                    <p>Size: {item.size ?? "—"}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Price: {formatPrice(itemTotal)}</p>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        <div className="track-order-timeline">
          {stages.map((stage, index) => (
            <div className="track-order-stage" key={stage.title}>
              <div
                className={`track-order-stage-icon ${
                  stage.done ? "is-done" : ""
                }`}
              >
                {stage.icon}
              </div>

              <div className="track-order-stage-text">
               <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>

              {index < stages.length - 1 && (
                <div className="track-order-stage-line" />
              )}
            </div>
          ))}
        </div>

        <button
          className="track-order-shop-button"
          onClick={() => navigate("/womens")}
        >
          Continue Shopping
        </button>
      </section>
    </main>
  );
}

export default TrackOrder;