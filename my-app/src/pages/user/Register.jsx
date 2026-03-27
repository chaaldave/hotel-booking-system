import { useState } from "react";
import { Link } from "react-router-dom"; // Removed useNavigate as we want them to stay put
import Navbar from "../../components/Navbar";
import { registerUser } from "../../services/authService";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track if registration worked

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await registerUser(
      formData.email,
      formData.password,
      formData.fullName
    );

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // Success flow
    setLoading(false);
    setIsSuccess(true); 
  }

  return (
    <div>
      <Navbar />

      <div className="form-page transylvania-auth-page">
        <div className="form-card spooky-form-card">
          {/* Conditional Rendering: Show message if success, otherwise show form */}
          {isSuccess ? (
            <div className="success-confirmation" style={{ textAlign: 'center' }}>
              <h2 style={{ color: 'var(--accent-gold)' }}>Welcome to the Shadows</h2>
              <p className="form-subtext" style={{ fontSize: '16px', color: '#f4f4f4', marginTop: '20px' }}>
                A confirmation link has been sent to <strong>{formData.email}</strong>.
              </p>
              <p style={{ color: 'var(--text-muted)', margin: '20px 0', lineHeight: '1.6' }}>
                Please click the link in your email to verify your monster identity. 
                You cannot log in until your account is confirmed.
              </p>
              <Link to="/login" className="primary-btn" style={{ display: 'inline-block', marginTop: '20px' }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>Create Monster Guest Account</h2>
              <p className="form-subtext">
                Register to book a room at Hotel Transylvania.
              </p>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>

              {message && <p className="message-text">{message}</p>}

              <p className="switch-text">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}