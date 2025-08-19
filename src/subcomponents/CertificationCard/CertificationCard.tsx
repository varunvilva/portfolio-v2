import React from 'react';
import './CertificationCard.css';

interface CertificationCardProps {
  title: string;
  year: string;
  description: string;
  certLink?: string;
  imageUrl: string;
}
const CertificationCard: React.FC<CertificationCardProps> =({
    title,
    year,
    description,
    certLink,
    imageUrl
}) => {
  return (
    <div className="certification-card">
      <div className="certification-image">
        <img src={imageUrl} alt={`${title} certification`} />
      </div>
      <div className="certification-content">
        <div className="certification-header">
          <h3 className="certification-title">{title}</h3>
          <span className="certification-year">{year}</span>
        </div>
        <p className="certification-description">{description}</p>
        {certLink && (
          <a 
            href={certLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="certification-link"
          >
            View Certification
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;