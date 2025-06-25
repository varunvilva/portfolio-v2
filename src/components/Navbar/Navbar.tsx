import React, { useState } from 'react';

// Define all navigation items in one place
const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'publication', label: 'Publication' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="navbar-button"
              onClick={() => handleScroll(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="hamburger-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Dropdown Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className="mobile-menu-button"
              onClick={() => handleScroll(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <style jsx>{`
        .navbar-container {
          padding: 10px 20px;
          position: relative;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .navbar-desktop {
          display: flex;
          gap: 20px;
        }

        .navbar-button {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 1.3rem;
          color: inherit;
          padding: 8px 12px;
          border-radius: 4px;
          transition: color 0.3s ease;
          overflow: hidden;
        }

        .navbar-button::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0%;
          background-color: #747fe0;
          transition: width 0.3s ease;
        }

        .navbar-button:hover {
          color: #747fe0;
        }

        .navbar-button:hover::after {
          width: 100%;
        }

        /* Hamburger Button */
        .hamburger-button {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 30px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .hamburger-line {
          width: 100%;
          height: 3px;
          background-color: currentColor;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-line.open:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger-line.open:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 8px 0;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;

        }

        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .mobile-menu-button {
          display: block;
          width: 100%;
          background: none;
          border: none;
          padding: 12px 20px;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          font-size: 1.1rem;
          color: inherit;
          transition: background-color 0.2s ease;
        }

        .mobile-menu-button:hover {
          background-color: #f5f5f5;
          color: #747fe0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar-desktop {
            display: none;
          }

          .hamburger-button {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 8px 15px;
          }

          .mobile-menu {
            right: -10px;
            min-width: 180px;
          }

          .mobile-menu-button {
            font-size: 1rem;
            padding: 10px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;