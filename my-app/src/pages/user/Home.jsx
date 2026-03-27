import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="home-page transylvania-home">
        <div className="home-hero">
          <p className="home-kicker">Since 1897</p>
          <h1>Welcome to Hotel Transylvania</h1>
          <p className="home-description">
            A lavish five-star monster resort built by Dracula himself.
            At Hotel Transylvania, creatures of all kinds can rest, feast,
            and be themselves without a pesky human in sight.
          </p>

          <div className="home-buttons">
            <Link to="/rooms" className="primary-btn">
              View Monster Rooms
            </Link>
            <Link to="/about" className="secondary-btn">
              View Facilities
            </Link>
          </div>
        </div>

        <div className="home-highlights">
          <div className="highlight-card">
            <h3>Signature Suites</h3>
            <p>
              Stay in The Dracula Suite, Wolf Pack Den, Mummy’s Tomb,
              and other legendary Hotel Transylvania rooms.
            </p>
          </div>

          <div className="highlight-card">
            <h3>Monster-Friendly Luxury</h3>
            <p>
              Enjoy blackout curtains, floating furniture, cold-mist generators,
              bite-proof bedding, and more creature-specific comforts.
            </p>
          </div>

          <div className="highlight-card">
            <h3>A Stay to Die For</h3>
            <p>
              From royal blood-chill drinks to spirit banquets and afterlife
              amenities, every reservation is a hauntingly premium experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}