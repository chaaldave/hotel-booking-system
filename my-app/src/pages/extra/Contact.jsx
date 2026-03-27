import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // In a real app, send to an API
    setSent(true);
  }

  return (
    <div style={{ background: "var(--bg-void)", minHeight: "100vh" }}>
      <Navbar />

      <div className="contact-page">
        <div className="contact-layout">
          {/* Info */}
          <div className="contact-info">
            <h1>Get in Touch</h1>
            <p>
              Have a question about your reservation, need special accommodations,
              or just want to know if garlic is banned on premises? We're here to help.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-detail-icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>1 Castle Drive, Transylvania<br />Deep Carpathian Mountains, Romania</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="contact-detail-icon">🌙</span>
                <div>
                  <h4>Check-in Hours</h4>
                  <p>Dusk to midnight only<br />(No daylight arrivals)</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="contact-detail-icon">📜</span>
                <div>
                  <h4>Scream-Service</h4>
                  <p>Available 24 hours via in-room tablet<br />or haunted telephone</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="contact-detail-icon">🦇</span>
                <div>
                  <h4>Concierge</h4>
                  <p>Mavis — available nightly in the lobby<br />for tours, dining & cloak fittings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🦇</div>
                <h2 style={{ marginBottom: "12px", color: "var(--purple-200)" }}>Message Sent!</h2>
                <p style={{ color: "var(--text-muted)" }}>
                  Our bat courier is on the way. We'll respond before sunrise.
                </p>
              </div>
            ) : (
              <>
                <h2>Send a Message</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@crypt.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your message…"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="primary-btn" style={{ width: "100%" }}>
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}