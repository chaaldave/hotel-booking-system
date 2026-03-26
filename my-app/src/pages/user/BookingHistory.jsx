import Navbar from "../../components/Navbar";

export default function BookingHistory() {
  const bookings = [
    {
      id: 1,
      room: "Deluxe Room",
      checkIn: "2026-04-10",
      checkOut: "2026-04-12",
      status: "Confirmed",
    },
    {
      id: 2,
      room: "Single Room",
      checkIn: "2026-05-01",
      checkOut: "2026-05-03",
      status: "Pending",
    },
    {
      id: 3,
      room: "Family Suite",
      checkIn: "2026-06-15",
      checkOut: "2026-06-18",
      status: "Completed",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h1>Booking History</h1>
        <p>View your current and past reservations.</p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}