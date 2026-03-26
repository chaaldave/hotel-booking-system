import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="home-container">
        <h1>Welcome to Sanrio Hotel!</h1>
        <p>
          Find the perfect room for your stay. Book easily, manage your
          reservations, and enjoy a seamless experience.
        </p>

        <div className="home-buttons">
          <Link to="/rooms" className="primary-btn">
            Browse Rooms
          </Link>

          <Link to="/login" className="secondary-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}