import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setMessage("Login successful!");
    navigate("/rooms");
  }

  return (
    <div>
      <Navbar />

      <div className="form-page">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Login</h2>

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

          <button type="submit" className="primary-btn">
            Login
          </button>

          {message && <p className="message-text">{message}</p>}

          <p>
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}