import { Link, useNavigate } from "react-router-dom";
import "../styles/MyOrders.css";

function MyOrders() {
  const navigate = useNavigate();

const loggedInUser = JSON.parse(
  localStorage.getItem("stepup_logged_in") || "null"
);

const allOrders = JSON.parse(
  localStorage.getItem("stepup_orders") || "[]"
);

const orders = allOrders.filter(
  (order) =>
    order.email?.toLowerCase() === loggedInUser?.email?.toLowerCase()
);

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  return (
    <section className="my-orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <>
          <p>No orders found yet.</p>
          <Link to="/womens">Continue Shopping</Link>
        </>
      ) : (
        orders.map((order) => {
          const total = (order.items || []).reduce(
            (sum, item) =>
              sum + Number(item.price || 0) * Number(item.quantity || 1),
            0
          );

          return (
            <article className="my-order-card" key={order.orderId}>
              <h2>Order ID: {order.orderId}</h2>
              <p>Order Date: {order.date}</p>
              <p>Status: {order.status}</p>

              {(order.items || []).map((item, index) => (
                <p key={`${item.id || item.name || "item"}-${index}`}>
                  {item.name || item.title || "Product"} — Qty:{" "}
                  {item.quantity || 1} —{" "}
                  {formatPrice(
                    Number(item.price || 0) * Number(item.quantity || 1)
                  )}
                </p>
              ))}

              <p>
                <strong>Total: {formatPrice(total)}</strong>
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/track-order", {
                    state: {
                      orderId: order.orderId,
                      form: order.form,
                      items: order.items || [],
                    },
                  })
                }
              >
                Track Order
              </button>
            </article>
          );
        })
      )}
    </section>
  );
}

export default MyOrders;