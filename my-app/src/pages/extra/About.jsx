import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";


const FACILITIES = [

  { img: "/Hotel Pool.png", name: "The Vat Pool", desc: "Acid waters shaped like a coffin." },
  { img: "/Hotel Garden.png", name: "Moonlit Gardens", desc: "Rare gloom-blooms and carnivorous snapdragons." },
  { img: "/Hotel Gym.png", name: "Crypt-Fit Gym", desc: "Heavy-duty iron weights in a repurposed stone crypt." },
  { img: "/Hotel Lobby.png", name: "Grand Lobby", desc: "Polished obsidian floors and flickering chandeliers." },
];

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      <div className="about-hero">
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

        {/* Pool Section */}
        <div className="about-section">
          <img src="/Hotel Pool.png" alt="Vat Pool" />
          <div className="about-text">
            <h2>The Vat Pool</h2>
            <p>
              Custom-built to hold vats of acid, the pool is filled with 
              naturally heated acid water. Private, coffin-shaped cabanas 
              line the deck for those who prefer the shade.
            </p>
          </div>
        </div>
      </div>

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