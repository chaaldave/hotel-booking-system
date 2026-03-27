import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import RoomCard from "../../components/RoomCard";
import { getRooms } from "../../services/roomService";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("Loading rooms...");

  useEffect(() => {
    async function fetchRooms() {
      const { data, error } = await getRooms();

      if (error) {
        setMessage("Failed to load rooms.");
      } else {
        setRooms(data);
        setMessage("");
      }
    }

    fetchRooms();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h1>Room Listing</h1>
        <p>Browse our available rooms and choose the one that fits your stay.</p>

        {message && <p>{message}</p>}

        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}