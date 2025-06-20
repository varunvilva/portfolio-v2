import React from 'react';
import './Navbar.css';

// Define all navigation items in one place
const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'publication', label: 'Publication' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="navbar-button"
            onClick={() => handleScroll(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
