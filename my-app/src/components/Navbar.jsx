import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Hotel Booking</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/history">History</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}