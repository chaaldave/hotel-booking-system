import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAllBookings,
  updateBookingStatus,
} from "../../services/bookingService";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
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
      setMessage("");
    }

    setLoading(false);
  }

  async function handleStatusChange(id, newStatus) {
    const { error } = await updateBookingStatus(id, newStatus);

    if (error) {
      setMessage("Failed to update booking status.");
      return;
    }

    setMessage("Booking status updated successfully.");
    fetchBookings();
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="admin-hero transylvania-hero">
          <h1>Manage Monster Reservations</h1>
          <p>
            Review every creature’s reservation, assigned room,
            and booking status across Hotel Transylvania.
          </p>
        </div>

        {message && <p className="message-text">{message}</p>}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Category</th>
                <th>Occupancy</th>
                <th>Rate</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9">Loading bookings...</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="9">No bookings found.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.profiles?.full_name || "Unknown Guest"}</td>
                    <td>{booking.rooms?.name || "Unknown Room"}</td>
                    <td>{booking.rooms?.category || "—"}</td>
                    <td>{booking.rooms?.occupancy || "—"}</td>
                    <td>{booking.rooms?.price ? `₲${booking.rooms.price}` : "—"}</td>
                    <td>{booking.check_in_date}</td>
                    <td>{booking.check_out_date}</td>
                    <td>{booking.status}</td>
                    <td>
                      <select
                        value={booking.status}
                        onChange={(event) =>
                          handleStatusChange(booking.id, event.target.value)
                        }
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
    </div>
  );
}