import { Link } from "react-router-dom";
import { useState } from "react";

const FAQS = [
  { q: "How do I make a reservation?", a: "Navigate to 'Rooms' to browse available chambers, then click 'Reserve This Room'. You'll be taken to the booking form where you can select your dates. You must be logged in to complete a reservation." },
  { q: "What currency does the hotel accept?", a: "Hotel Transylvania accepts Gold Drachmas (₲) exclusively. We do not accept human currency, garlic credits, or silver coins." },
  { q: "Can I bring human guests?", a: "Hotel Transylvania is a human-free resort by policy. However, exceptions may be made for guests who can guarantee their human will not scream, faint, or attempt to stake anyone." },
  { q: "What is the check-in time?", a: "Check-in begins at dusk and closes at midnight. We do not accommodate daytime arrivals due to obvious logistical concerns for our vampire staff." },
  { q: "How do I view my booking history?", a: "Log in and visit 'My Bookings' in the navigation bar. All current and past reservations will be listed with dates, room details, and status." },
];

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  const closeModal = () => {
    setActiveModal(null);
    setOpenIndex(null);
    setSearch("");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">Hotel Transylvania</h3>
          <p className="footer-tagline">Rest in Peace since 1897.</p>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/rooms">Chambers</Link></li>
            <li><Link to="/about">Facilities</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <button onClick={() => setActiveModal('help')} className="footer-link-btn">
                Help Centre (FAQs)
              </button>
            </li>
            <li>
              <button onClick={() => setActiveModal('contact')} className="footer-link-btn">
                Contact Directory
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>The Castle</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            1 Castle Drive, Transylvania<br />
            Carpathian Mountains<br />
            Available dusk to midnight.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Hotel Transylvania. All rights reserved. | No Humans Allowed.</p>
      </div>

      {/* --- SHARED MODAL OVERLAY --- */}
      {activeModal && (
        <div className="faq-modal-overlay" onClick={closeModal}>
          <div className="faq-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>&times;</button>
            
            {activeModal === 'help' && (
              <>
                <h2>Crypt Knowledge Base</h2>
                <div className="help-search">
                  <input
                    type="text"
                    placeholder="Search the shadows..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="faq-scroll-area">
                  {filtered.map((faq, i) => (
                    <div key={i} className="faq-item">
                      <button
                        className={`faq-question ${openIndex === i ? "open" : ""}`}
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      >
                        {faq.q}
                      </button>
                      {openIndex === i && <div className="faq-answer">{faq.a}</div>}
                    </div>
                  ))}
                  {filtered.length === 0 && <p className="empty-state">No results found in the dark.</p>}
                </div>
              </>
            )}

            {activeModal === 'contact' && (
              <div className="contact-directory">
                <h2>Scream-Service Directory</h2>
                <p className="modal-subtitle">Summon our staff from across the moors.</p>
                
                <div className="directory-grid">
                  <div className="directory-item">
                    <span className="icon">📍</span>
                    <div>
                      <h4>The Castle Grounds</h4>
                      <p>1 Castle Drive, Transylvania<br />Deep Carpathian Mountains, Romania</p>
                    </div>
                  </div>

                  <div className="directory-item">
                    <span className="icon">☎️</span>
                    <div>
                      <h4>Haunted Telephone</h4>
                      <p>+44 666-DRAC-000</p>
                    </div>
                  </div>

                  <div className="directory-item">
                    <span className="icon">🦇</span>
                    <div>
                      <h4>Bat Courier (Email)</h4>
                      <p>concierge@hoteltransylvania.com</p>
                    </div>
                  </div>

                  <div className="directory-item">
                    <span className="icon">🌙</span>
                    <div>
                      <h4>Operating Hours</h4>
                      <p>Dusk until Dawn<br />(Staff dormant during daylight)</p>
                    </div>
                  </div>
                </div>
                
                <div className="directory-footer">
                  <p>For urgent matters, please use the magical "Scream-Service" tablet in your chamber.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}