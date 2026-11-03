import axios from "axios";
import "../styles/Contact.css";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
   await axios.get("http://localhost:8000/api/contact/csrf/", {
  withCredentials: true,
});

const csrfToken = getCookie("csrftoken");

await axios.post("http://localhost:8000/api/contact/", data, {
  withCredentials: true,
  headers: { "X-CSRFToken": csrfToken },
});

      alert("Thank you! Your enquiry has been submitted.");
      form.reset();
    } catch (error) {
      console.error(
        "Contact form submit failed:",
        error.response?.data || error
      );
      alert("Could not submit your enquiry. Please try again.");
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-details">
          <h1>Contact Us</h1>
          <h3>For Online Orders</h3>
          <p>Inquiry/Complaint</p>
          <p>9998762350</p>
          <h3>Any other queries</h3>
          <p>9998762350</p>
          <p>10 AM–7:00 PM</p>
          <p>
            Email:{" "}
            <a href="mailto:customerservice@gmail.com">
              customerservice@gmail.com
            </a>
          </p>
        </div>

        <img
          className="contact-image"
          src="/images/contact-shoes.jpg"
          alt="Colorful shoes"
        />
      </section>

      <section className="enquiry-section">
        <h2>Enquiry Form</h2>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" required />

          <div className="contact-form-row">
            <div>
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" required />
            </div>
            <div>
              <label htmlFor="contact-phone">Phone</label>
              <input id="contact-phone" name="phone" type="tel" required />
            </div>
          </div>

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            required
          />

          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}

export default Contact;