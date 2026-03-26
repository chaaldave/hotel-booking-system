import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    room: "",
    checkIn: "",
    checkOut: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.room || !formData.checkIn || !formData.checkOut) {
      setMessage("Please complete all booking fields.");
      return;
    }

    if (formData.checkOut < formData.checkIn) {
      setMessage("Check-out date cannot be earlier than check-in date.");
      return;
    }

    setMessage("Booking submitted successfully!");
  }

  return (
    <div>
      <Navbar />

      <div className="form-page">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Booking Form</h2>

          <select name="room" value={formData.room} onChange={handleChange}>
            <option value="">Choose your room</option>
            <option value="Deluxe Room">Deluxe Room</option>
            <option value="Family Suite">Family Suite</option>
            <option value="Single Room">Single Room</option>
          </select>

          <label>Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
          />

          <label>Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
          />

          <button type="submit" className="primary-btn">
            Confirm Booking
          </button>

          {message && <p className="message-text">{message}</p>}
        </form>
      </div>
    </div>
  );
}