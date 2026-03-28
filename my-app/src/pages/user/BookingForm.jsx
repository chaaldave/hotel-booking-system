import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom"; // Added Link for the modal
import Navbar from "../../components/Navbar";
import { getRooms } from "../../services/roomService";
import { createBooking } from "../../services/bookingService";
import { getCurrentUser } from "../../services/authService";

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const selectedRoomId = searchParams.get("roomId") || "";

  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // New state for popup

  const [formData, setFormData] = useState({
    room_id: selectedRoomId,
    check_in_date: "",
    check_out_date: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      setFormData((prev) => ({
        ...prev,
        room_id: selectedRoomId,
      }));
    }
  }, [selectedRoomId]);

  async function fetchRooms() {
    setLoadingRooms(true);
    const { data, error } = await getRooms();
    if (error) {
      setMessage("Failed to load available rooms.");
    } else {
      setRooms(data || []);
      setMessage("");
    }
    setLoadingRooms(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.room_id || !formData.check_in_date || !formData.check_out_date) {
      setMessage("Please complete all booking fields.");
      return;
    }

    if (formData.check_out_date < formData.check_in_date) {
      setMessage("Check-out date cannot be earlier than check-in date.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const { data: userData, error: userError } = await getCurrentUser();

    // POPUP LOGIC: Trigger modal if user is not logged in
    if (userError || !userData?.user) {
      setShowLoginModal(true);
      setSubmitting(false);
      return;
    }

    const { error } = await createBooking({
      user_id: userData.user.id,
      room_id: Number(formData.room_id),
      check_in_date: formData.check_in_date,
      check_out_date: formData.check_out_date,
      status: "Pending",
    });

    if (error) {
      setMessage(error.message || "Failed to submit booking.");
      setSubmitting(false);
      return;
    }

    setMessage("Your reservation has been submitted successfully.");
    setSubmitting(false);

    setFormData({
      room_id: selectedRoomId || "",
      check_in_date: "",
      check_out_date: "",
    });
  }

  return (
    <div>
      <Navbar />

      <div className="form-page booking-page">
        <form className="form-card spooky-form-card" onSubmit={handleSubmit}>
          <h2>Book Your Stay</h2>
          <p className="form-subtext">
            Reserve your hauntingly comfortable room at Hotel Transylvania.
          </p>

          <label>Select Room</label>
          <select
            name="room_id"
            value={formData.room_id}
            onChange={handleChange}
            disabled={loadingRooms}
          >
            <option value="">Choose a room</option>
            {rooms
              .filter((room) => room.available)
              .map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} — ₲{room.price}
                </option>
              ))}
          </select>

          <label>Check-in Date</label>
          <input
            type="date"
            name="check_in_date"
            value={formData.check_in_date}
            onChange={handleChange}
          />

          <label>Check-out Date</label>
          <input
            type="date"
            name="check_out_date"
            value={formData.check_out_date}
            onChange={handleChange}
          />

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Confirm Reservation"}
          </button>

          {message && <p className="message-text">{message}</p>}
        </form>
      </div>

      {/* LOGIN REQUIRED MODAL */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Membership Required</h3>
            <p>To reserve a chamber at Hotel Transylvania, you must first verify your identity.</p>
            
            <div className="modal-actions">
              <Link to="/login" className="primary-btn">Log In Now</Link>
              <button className="secondary-btn" onClick={() => setShowLoginModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}