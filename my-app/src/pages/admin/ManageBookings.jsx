import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAllBookings, updateBookingStatus } from "../../services/bookingService";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // NEW: Search state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    const { data, error } = await getAllBookings();
    if (error) {
      setMessage("Failed to load bookings.");
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  }

  async function handleStatusChange(id, newStatus) {
    const { error } = await updateBookingStatus(id, newStatus);
    if (error) {
      setMessage("Failed to update status.");
      return;
    }
    setMessage("Status updated successfully.");
    fetchBookings();
  }

  // NEW: Filtering logic (Search by Name, Room, or Date)
  const filteredBookings = bookings.filter((booking) => {
    const search = searchTerm.toLowerCase();
    return (
      booking.profiles?.full_name?.toLowerCase().includes(search) ||
      booking.rooms?.name?.toLowerCase().includes(search) ||
      booking.check_in_date?.includes(search) ||
      booking.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="admin-page-wrapper">
      <Navbar />

      <div className="rooms-page">
        <div className="rooms-hero">
          <p className="home-kicker">Admin Control</p>
          <h1 className="pro-title">Manage Reservations</h1>
          
          {/* NEW: Search Box UI */}
          <div className="search-container">
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search by Guest, Room, Date, or Status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {message && <p className="message-text centered">{message}</p>}

        <div className="history-table-container">
          <table className="spooky-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="loading-text">Summoning records...</td></tr>
              ) : filteredBookings.length === 0 ? (
                <tr><td colSpan="6" className="loading-text">No matches found in the crypt.</td></tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="gold-text">{booking.profiles?.full_name || "Unknown Guest"}</td>
                    <td>{booking.rooms?.name || "Unknown Room"}</td>
                    <td>{booking.check_in_date}</td>
                    <td>{booking.check_out_date}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="admin-status-select"
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}