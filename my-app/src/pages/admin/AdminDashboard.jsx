import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="admin-page-wrapper">
      <Navbar />

      {/* Main container for admin content */}
      <div className="admin-page">
        <div className="admin-hero">
          <p className="home-kicker">Management Portal</p>
          <h1 className="pro-title">Admin Dashboard</h1>
          <p className="home-description">
            Manage monster accommodations, update themed room details,
            and monitor all haunting reservations from one place.
          </p>
        </div>

        {/* This grid needs clear spacing to stop overlapping */}
        <div className="admin-grid">
          <div className="admin-card spooky-card">
            <h3>Manage Monster Rooms</h3>
            <p>
              Add, edit, delete, and review all signature Hotel Transylvania
              rooms, from The Dracula Suite to the Phantom Ballroom.
            </p>
            <Link to="/manage-rooms" className="primary-btn">
              Open Room Management
            </Link>
          </div>

          <div className="admin-card spooky-card">
            <h3>Manage Reservations</h3>
            <p>
              View all guest bookings, inspect room assignments, and update
              booking status for every creature staying in the hotel.
            </p>
            <Link to="/manage-bookings" className="primary-btn">
              Open Booking Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}