import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="admin-hero transylvania-hero">
          <h1>Hotel Transylvania Admin Dashboard</h1>
          <p>
            Manage monster accommodations, update themed room details,
            and monitor all haunting reservations from one place.
          </p>
        </div>

        <div className="admin-grid">
          <div className="admin-card spooky-card">
            <h2>Manage Monster Rooms</h2>
            <p>
              Add, edit, delete, and review all signature Hotel Transylvania
              rooms, from The Dracula Suite to the Phantom Ballroom.
            </p>
            <Link to="/manage-rooms" className="primary-btn">
              Open Room Management
            </Link>
          </div>

          <div className="admin-card spooky-card">
            <h2>Manage Reservations</h2>
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