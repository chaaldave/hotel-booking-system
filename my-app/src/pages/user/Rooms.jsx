import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import RoomCard from "../../components/RoomCard";
import { getRooms } from "../../services/roomService";


export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    setLoading(true);
    const { data, error } = await getRooms();
    if (error) {
      setMessage("Failed to load rooms.");
    } else {
      setRooms(data || []);
      setMessage("");
    }
    setLoading(false);
  }

  return (
    <div className="rooms-page-wrapper">
      <Navbar />

      <div className="rooms-page">
        {/* Wrap header in a container to ensure centering */}
        <div className="rooms-hero">
          <p className="home-kicker">Exquisite Accommodations</p>
          <h1 className="pro-title">Monster Room Collection</h1>
          <p className="home-description">
            Browse Hotel Transylvania’s signature rooms, luxury suites, cozy
            tombs, and spirit event spaces.
          </p>
        </div>

        {message && <p className="message-text">{message}</p>}

        {loading ? (
          <div className="loading-state"><p>Unlocking the chambers...</p></div>
        ) : rooms.length === 0 ? (
          <div className="loading-state"><p>No rooms available right now.</p></div>
        ) : (
          <div className="rooms-list-stack">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}