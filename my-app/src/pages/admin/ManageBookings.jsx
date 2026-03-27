import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      user: "Maria Santos",
      room: "Deluxe Room",
      checkIn: "2026-04-10",
      checkOut: "2026-04-12",
      status: "Confirmed",
    },
    {
      id: 2,
      user: "Juan Dela Cruz",
      room: "Single Room",
      checkIn: "2026-05-01",
      checkOut: "2026-05-03",
      status: "Pending",
    },
    {
      id: 3,
      user: "Angela Reyes",
      room: "Family Suite",
      checkIn: "2026-06-15",
      checkOut: "2026-06-18",
      status: "Completed",
    },
  ]);

  function handleStatusChange(id, newStatus) {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );

    setBookings(updatedBookings);
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h1>Bookings Management</h1>
        <p>View and manage all reservations made by users.</p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.user}</td>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}