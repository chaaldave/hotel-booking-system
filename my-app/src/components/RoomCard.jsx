import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  const roomImage = `/${room.name}.png`;

  return (
    <div className="spooky-room-card">
      {/* 1. Visual Side */}
      <div 
        className="room-image-container" 
        style={{ backgroundImage: `url('${roomImage}')` }}
      >
        <div className="image-overlay"></div>
      </div>

      {/* 2. Content Side */}
      <div className="room-content-wrapper">
        <div className="room-header-area">
          <span className="room-category-label">
             {room.category}
          </span>
          <h2 className="room-title-large">{room.name}</h2>
        </div>

        <p className="room-description-text">{room.description}</p>

        <div className="room-spec-grid">
          <div className="spec-item">
            <span className="spec-label">Capacity</span>
            <span className="spec-value">{room.occupancy}</span>
          </div>
          
          <div className="spec-item">
            <span className="spec-label">Bedding</span>
            <span className="spec-value">{room.bed_type}</span>
          </div>
          
          <div className="spec-item">
            <span className="spec-label">Dimensions</span>
            <span className="spec-value">{room.size}</span>
          </div>
          
          <div className="spec-item">
            <span className="spec-label">Nightly Rate</span>
            <span className="spec-value">₲{room.price}</span>
          </div>
        </div>

        <Link to={`/booking?roomId=${room.id}`} className="room-cta">
          Reserve This Chamber
        </Link>
      </div>
    </div>
  );
}