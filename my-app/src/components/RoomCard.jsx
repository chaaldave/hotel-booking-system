import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <div className="room-card">
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <p><strong>Price:</strong> ₱{room.price}</p>
      <p><strong>Capacity:</strong> {room.capacity} guest(s)</p>
      <p>
        <strong>Status:</strong> {room.available ? "Available" : "Not Available"}
      </p>

      <Link to="/booking" className="primary-btn">
        Book Now
      </Link>
    </div>
  );
}