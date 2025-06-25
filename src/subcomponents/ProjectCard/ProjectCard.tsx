import React from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  location?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  imageAlt,
  technologies,
  liveUrl,
  sourceUrl
}) => {
  return (
    <div className="project-card">
      <div className="project-card-image-container">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="project-card-image"
        />
      </div>
      <div className="project-card-content">
        <div className="project-card-info">
          <h2 className="project-card-main-title">{title}</h2>
          <p className="project-card-description">{description}</p>
          <div className="project-card-technologies">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
          <div className="project-card-actions">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                Live Demo ↗
              </a>
            )}
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn secondary"
              >
                ⌘ View Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;