import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

// Define all navigation items in one place
const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'publication', label: 'Publications' },
  { id: 'experience', label: 'Experiences' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <>
      {/* Fixed Theme Toggle Button */}
      <button
        className="theme-toggle-fixed"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </button>

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

          <div className="navbar-actions">
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
          </div>

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
    </>
  );
};

export default Navbar;