import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FACILITIES = [
  // Updated image paths to match your uploaded filenames

  { img: "/Hotel Pool.png", name: "The Bat Pool", desc: "Geothermal waters shaped like a colossal bat in flight." },
  { img: "/Hotel Garden.png", name: "Moonlit Gardens", desc: "Rare gloom-blooms and carnivorous snapdragons." },
  { img: "/Hotel Gym.png", name: "Crypt-Fit Gym", desc: "Heavy-duty iron weights in a repurposed stone crypt." },
  { img: "/Hotel Lobby.png", name: "Grand Lobby", desc: "Polished obsidian floors and flickering chandeliers." },
];

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <div className="about-hero">
        {/* Updated to your specific Hotel Front View asset */}
        <img src="/Hotel Front View.png" alt="Hotel Transylvania exterior" />
      </div>

      {/* Intro */}
      <div style={{ textAlign: "center", padding: "60px 40px 0", maxWidth: "700px", margin: "0 auto" }}>
        <span style={{
          fontFamily: "var(--font-accent)", fontStyle: "italic",
          color: "var(--text-gold)", letterSpacing: "0.2em",
          fontSize: "13px", textTransform: "uppercase", display: "block", marginBottom: "16px",
        }}>
          Est. 1897
        </span>
        <p style={{ fontSize: "18px", color: "var(--text-muted)", lineHeight: 1.8 }}>
          Welcome to Hotel Transylvania — a lavish five-star resort built by Dracula himself. 
          Where creatures can be themselves without a pesky human in sight.
        </p>
      </div>

      {/* Sections */}
      <div className="about-sections">
        {/* Exterior Section */}
        <div className="about-section">
          <img src="/Hotel Front View.png" alt="Hotel Front View" />
          <div className="about-text">
            <h2>The Castle That Welcomes All</h2>
            <p>
              The architecture is classic Transylvanian gothic—a masterpiece of jagged spires and 
              gargoyle-encrusted stone. Our exclusive carriage service awaits at the 
              wrought-iron gate with zombified drivers.
            </p>
          </div>
        </div>

        {/* Lobby Section */}
        <div className="about-section reverse">
          <img src="/Hotel Lobby.png" alt="Hotel lobby" />
          <div className="about-text">
            <h2>The Grand Lobby</h2>
            <p>
              Cross the massive oak threshold into a cavernous hall illuminated by flickering 
              chandeliers filled with fire-flies. The main floor is made of 
              polished obsidian, cool to the touch.
            </p>
          </div>
        </div>

        {/* Pool Section - Added for better coverage */}
        <div className="about-section">
          <img src="/Hotel Pool.png" alt="Bat Pool" />
          <div className="about-text">
            <h2>The Bat Pool</h2>
            <p>
              Custom-shaped to resemble a colossal bat in flight, the pool is filled with 
              naturally heated geothermal water. Private, coffin-shaped cabanas 
              line the deck for those who prefer the shade.
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="facilities-strip" style={{ paddingBottom: "100px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Hotel Facilities</h2>
        <div className="facilities-grid">
          {FACILITIES.map((f) => (
            <div key={f.name} className="facility-card">
              <img src={f.img} alt={f.name} />
              <div className="facility-card-body">
                <h4>{f.name}</h4>
                <p style={{ fontSize: "12px", color: "var(--text-ghost)", marginTop: "4px" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}