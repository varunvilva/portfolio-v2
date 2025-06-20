import React from 'react';
import './ExperienceCard.css';

interface ExperienceCardProps {
  companyName: string;
  year: string;
  experience: string;
  imageUrl: string;
  imageAlt: string;
  location: string;
  position?: string;
  duration?: string;
  technologies?: string[];
  companyUrl?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  companyName,
  year,
  experience,
  imageUrl,
  imageAlt,
  location,
  position,
  duration,
  technologies,
  companyUrl
}) => {
  return (
    <div className="experience-card">
      <div className="experience-card-image-container">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="experience-card-image"
        />
        <div className="experience-card-overlay">
          <h3 className="experience-card-location">{location}</h3>
        </div>
      </div>
      <div className="experience-card-content">
        <div className="experience-card-info">
          <h2 className="experience-card-main-title">{companyName}</h2>
          {position && (
            <h3 className="experience-card-position">{position}</h3>
          )}
          {duration && (
            <p className="experience-card-duration">{duration}</p>
          )}
          <p className="experience-card-description">{experience}</p>
          <div className="experience-card-year">{year}</div>
          {technologies && technologies.length > 0 && (
            <div className="experience-card-technologies">
              {technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          )}
          <div className="experience-card-actions">
            {companyUrl && (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                Visit Company ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;