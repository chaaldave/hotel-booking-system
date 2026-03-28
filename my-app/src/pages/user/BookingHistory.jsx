import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer"; // Added Footer for consistency
import { getCurrentUser } from "../../services/authService";
import { getUserBookings } from "../../services/bookingService";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  async function fetchBookingHistory() {
    setLoading(true);
    const { data: userData, error: userError } = await getCurrentUser();

    if (userError || !userData?.user) {
      setMessage("Please log in to view your booking history.");
      setLoading(false);
      return;
    }

    const { data, error } = await getUserBookings(userData.user.id);

    if (error) {
      setMessage("Failed to load booking history.");
    } else {
      setBookings(data || []);
      setMessage("");
    }
    setLoading(false);
  }

  return (
    <div className="history-page-wrapper">
      <Navbar />

      <div className="rooms-page">
        <div className="rooms-hero">
          <p className="home-kicker">Your Legacy</p>
          <h1>Reservation History</h1>
          <p className="home-description">
            View your current and past Hotel Transylvania bookings,
            including room, stay dates, and reservation status.
          </p>
        </div>

        {message && <p className="message-text centered">{message}</p>}

        <div className="history-table-container">
          {loading ? (
            <div className="loading-state"><p>Summoning records...</p></div>
          ) : bookings.length === 0 ? (
            <div className="loading-state"><p>No previous haunts found.</p></div>
          ) : (
            <table className="spooky-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Category</th>
                  <th>Rate</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="gold-text">{booking.rooms?.name || "Unknown Chamber"}</td>
                    <td>{booking.rooms?.category || "—"}</td>
                    <td>₲{booking.rooms?.price || "—"}</td>
                    <td>{booking.check_in_date}</td>
                    <td>{booking.check_out_date}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}