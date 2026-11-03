import { useState } from "react";

import "../styles/Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  paymentMethod: "card",
  cardHolder: "",
  cardNumber: "",
  cvv: "",
  expiry: "",
  upiId: "",
  paypalEmail: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  pincode: "",
};

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "pincode",
];
const paymentMethods = [
  ["card", "Card"],
  ["gpay", "Google Pay / UPI"],
  ["paypal", "PayPal"],
  ["clearpay", "Clearpay"],
  ["klarna", "Klarna"],
  ["cod", "Cash on Delivery"],
];
const paymentMap = {
  card: "Card",
  gpay: "UPI",
  paypal: "PayPal",
  cod: "COD",
};

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cartItems = state?.items || [];
  

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  

const subtotal = cartItems.reduce(
  (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
  0
);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    requiredFields.forEach((fieldName) => {
      if (!form[fieldName].trim()) {
        newErrors[fieldName] = "This field is required.";
      }
    });

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must contain 6 digits.";
    }

    if (form.paymentMethod === "card") {
      if (!form.cardHolder.trim()) {
        newErrors.cardHolder = "Enter the cardholder name.";
      }

      const cardNumber = form.cardNumber.replace(/\s/g, "");

      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = "Enter a valid 16-digit card number.";
      }

      if (!/^\d{3,4}$/.test(form.cvv)) {
        newErrors.cvv = "Enter a valid 3 or 4-digit CVV.";
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
        newErrors.expiry = "Use MM/YY format.";
      }
    }

    if (form.paymentMethod === "gpay") {
      if (!form.upiId.trim()) {
        newErrors.upiId = "Enter your UPI ID.";
      } else if (!/^[\w.-]+@[\w.-]+$/.test(form.upiId.trim())) {
        newErrors.upiId = "Enter a valid UPI ID.";
      }
    }

    if (form.paymentMethod === "paypal") {
      if (!form.paypalEmail.trim()) {
        newErrors.paypalEmail = "Enter your PayPal email.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.paypalEmail)
      ) {
        newErrors.paypalEmail = "Enter a valid email address.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  const token = localStorage.getItem("stepup_access_token");

  if (!token) {
    alert("Please log in before placing your order.");
    navigate("/login");
    return;
  }

  const payload = {
    customer_name: `${form.firstName} ${form.lastName}`.trim(),
    email: form.email,
    phone: form.phone,
    address: [form.address, form.city, form.state, form.pincode, form.landmark]
      .filter(Boolean)
      .join(", "),
    items: cartItems.map((item) => ({
      product: item.product_id ?? item.id,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    })),
    total_amount: subtotal,
    payment_method: paymentMap[form.paymentMethod] || "COD",
    cart_item_ids: cartItems.map((item) => item.cart_item_id).filter(Boolean),
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/orders/",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/order-confirmation", {
      state: {
        orderId: response.data.order_id,
        form,
        items: cartItems,
      },
    });
  } catch (error) {
    console.error("Order creation failed:", error.response?.data || error);
    alert("Order failed. Please check your details and try again.");
  }
};

 const field = (
  label,
  name,
  placeholder,
  type = "text",
  required = false
) => (
  <label className="checkout-field">
    <span>{label}</span>
    <input
      type={type}
      name={name}
      value={form[name]}
      placeholder={placeholder}
      onChange={updateField}
      required={required}
    />
    {errors[name] && (
      <small className="field-error">{errors[name]}</small>
    )}
  </label>
);

  return (
    <main className="checkout-page">
      <button
        type="button"
        className="checkout-back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="checkout-title">Checkout</h1>

      <ProgressBar currentStep={0} />

      <form
        className="checkout-layout"
        onSubmit={handleSubmit}
        noValidate
      >
        <aside className="order-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item, index) => (
  <div className="summary-product" key={item.id || index}>
    {item.image ? (
      <img
        className="summary-product-image"
        src={item.image}
        alt={item.name || item.title || "Product"}
      />
    ) : (
      <div className="summary-image-placeholder">👟</div>
    )}

    <div>
      <h3>{item.name || item.title || "Product"}</h3>
      <p>Size: {item.size ?? "—"}</p>
      <p>Quantity: {item.quantity || 1}</p>
      <p>Price: ₹{Number(item.price || 0).toLocaleString("en-IN")}</p>
    </div>
  </div>
))}

<div className="summary-line">
  <span>Amount</span>
  <span>₹{subtotal.toLocaleString("en-IN")}</span>
</div>

<div className="summary-line">
  <span>Delivery Fees</span>
  <span>Free</span>
</div>

<div className="summary-total">
  <span>Total</span>
  <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
</div>
        </aside>

        <section className="checkout-form-panel">
          <h2>Complete Your Order</h2>

          <h3>Personal Details</h3>

          <div className="checkout-fields">
            {field("First Name", "firstName", "Enter your first name")}
            {field("Last Name", "lastName", "Enter your last name")}
            {field("Email Id", "email", "Enter your email", "email")}
            {field("Phone Number", "phone", "Enter your phone number", "tel")}
          </div>

          <h3>Payment Details</h3>

          <div className="payment-options">
            {paymentMethods.map(([value, label]) => (
              <label className="payment-option" key={value}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={form.paymentMethod === value}
                  onChange={updateField}
                />

                <span className={`payment-method-logo ${value}`}>
                  {label}
                </span>
              </label>
            ))}
          </div>

          {form.paymentMethod === "card" && (
            <div className="checkout-fields">
              {field(
                "Card Holder Name",
                "cardHolder",
                "Enter name as on card"
              )}

              {field(
                "Card Number",
                "cardNumber",
                "Enter 16-digit card number"
              )}

              {field("CVV", "cvv", "Enter 3 or 4-digit CVV", "password")}
              {field("Expiration Date", "expiry", "MM/YY")}
            </div>
          )}

          {form.paymentMethod === "gpay" && (
            <div className="checkout-fields">
              {field("UPI ID", "upiId", "example@okaxis")}
              <p className="payment-note">
                Google Pay payment will be completed securely after placing the order.
              </p>
            </div>
          )}

          {form.paymentMethod === "paypal" && (
            <div className="checkout-fields">
              {field(
                "PayPal Email",
                "paypalEmail",
                "Enter your PayPal email",
                "email"
              )}
              <p className="payment-note">
                You will continue to PayPal after placing the order.
              </p>
            </div>
          )}

          {form.paymentMethod === "clearpay" && (
            <p className="payment-note">
              Clearpay payment will be available through the payment provider.
            </p>
          )}

          {form.paymentMethod === "klarna" && (
            <p className="payment-note">
              Klarna payment will be available through the payment provider.
            </p>
          )}

          {form.paymentMethod === "cod" && (
            <p className="payment-note">
              Pay in cash when your order is delivered.
            </p>
          )}

          <h3>Shipping Address</h3>

          <div className="checkout-fields">
            {field(
              "Address Line 1",
              "address",
              "Enter your address",
              "text",
              true
            )}

            {field("City", "city", "Enter city")}
            {field("State", "state", "Enter state")}

            {field(
              "Landmark",
              "landmark",
              "Any landmark (optional)",
              "text",
              false,
              false
            )}

            {field("Pincode", "pincode", "Enter 6-digit pincode")}
          </div>

          {submitted && (
            <p className="checkout-success">
              Details validated successfully.
            </p>
          )}

          <div className="checkout-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button type="submit" className="order-button">
              Order Now
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}

export default Checkout;