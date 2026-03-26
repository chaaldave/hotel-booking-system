import Navbar from "../../components/Navbar";
import RoomCard from "../../components/RoomCard";

export default function Rooms() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      description: "A cozy room with a queen-sized bed and city view.",
      price: 3500,
      capacity: 2,
      available: true,
    },
    {
      id: 2,
      name: "Family Suite",
      description: "Spacious suite perfect for families and group stays.",
      price: 5500,
      capacity: 4,
      available: true,
    },
    {
      id: 3,
      name: "Single Room",
      description: "A simple and affordable room for solo travelers.",
      price: 2200,
      capacity: 1,
      available: false,
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h1>Room Listing</h1>
        <p>Browse our available rooms and choose the one that fits your stay.</p>

        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}