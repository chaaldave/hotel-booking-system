import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h1>Admin Dashboard</h1>
        <p>Manage rooms and monitor all hotel bookings.</p>

        <div className="admin-grid">
          <div className="admin-card">
            <h3>Room Management</h3>
            <p>Add, edit, delete, and view all room listings.</p>
            <Link to="/manage-rooms" className="primary-btn">
              Manage Rooms
            </Link>
          </div>

          <div className="admin-card">
            <h3>Bookings Management</h3>
            <p>View all reservations made by hotel guests.</p>
            <Link to="/manage-bookings" className="primary-btn">
              Manage Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}