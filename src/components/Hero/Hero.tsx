import React from 'react';
import Typewriter from 'typewriter-effect';
import './Hero.css';

const Hero: React.FC = () => {
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container">
      {/* Terminal-style prompt line */}
      <div className="hero-prompt">
        <span className="hero-prompt-symbol">{'>'}</span>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Varun Vilvadrinath').start();
          }}
          options={{
            cursor: '█',
            delay: 75,
            deleteSpeed: 50,
          }}
        />
      </div>
      
      {/* Description text */}
      <p className="hero-description">
        I am a dev at <a href="https://www.kickdrum.com/" style={{color: '#747fe0'}} target="_blank" rel="noopener noreferrer">Kickdrum</a>. My passion is building simple, beautiful solutions (be it any domain)<br/>
        Want to see what I've built? {'\u00A0'} <span className="scroll-link" onClick={() => handleScroll('projects')}>View Projects</span>
      </p>
    </div>
  );
};

export default Hero;