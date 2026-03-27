import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../services/authService";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    checkUser();
    
    // Listen for auth changes to update Navbar instantly
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  async function checkUser() {
    const { data } = await getCurrentUser();
    if (data?.user) {
      setUser(data.user);
      fetchRole(data.user.id);
    }
  }

  async function fetchRole(userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    if (profile) setRole(profile.role);
  }

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <nav className="navbar transylvania-navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">Hotel Transylvania</Link>
        <p className="brand-tagline">A stay to die for</p>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>

        {user && role === "user" && (
          <>
            <Link to="/booking">Book Now</Link>
            <Link to="/history">My History</Link>
          </>
        )}

        {user && role === "admin" && (
          <>
            <Link to="/admin" className="admin-link">Dashboard</Link>
            <Link to="/manage-rooms">Rooms</Link>
            <Link to="/manage-bookings">Bookings</Link>
          </>
        )}

        {user ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
}