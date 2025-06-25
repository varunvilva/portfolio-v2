import { useState } from 'react';
import './Navbar.css';
// Define all navigation items in one place
const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'publication', label: 'Publications' },
  { id: 'experience', label: 'Experiences' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (sectionId: string) => {
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
    </div>
  );
};

export default Navbar;