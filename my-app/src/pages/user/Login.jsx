import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { loginUser } from "../../services/authService";
import { supabase } from "../../supabaseClient"; // Ensure you import your supabase client

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await loginUser(formData.email, formData.password);

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    try {
      // Fetch user role from your profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/rooms");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      navigate("/rooms"); // Fallback for standard users
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page-wrapper">
      <Navbar />
      <div className="form-page transylvania-auth-page">
        <form className="spooky-form-card" onSubmit={handleSubmit}>
          <div className="form-header">
            <span className="form-kicker">Welcome Back</span>
            <h2>Login</h2>
            <p className="form-subtext">
              Enter your account to continue your stay at Hotel Transylvania.
            </p>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-btn login-btn" disabled={loading}>
            {loading ? "Verifying..." : "Login"}
          </button>

          {message && <p className="error-message">{message}</p>}

          <p className="switch-text">
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}