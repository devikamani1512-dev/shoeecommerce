const steps = [
  "Checkout",
  "Payment Details",
  "Order Confirmation",
  "Bill Download",
  "Order Tracking",
];

function ProgressBar({ currentStep }) {
  return (
    <div className="checkout-progress">
      {steps.map((step, index) => (
        <div
          className={`progress-step ${
            index < currentStep
              ? "completed"
              : index === currentStep
              ? "active"
              : ""
          }`}
          key={step}
        >
          <div className="progress-circle">{index + 1}</div>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;