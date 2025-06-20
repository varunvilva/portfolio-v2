import React from 'react';
import './PublicationCard.css';

interface publicationCardProps {
  title: string;
  abstract:string;
  imageUrl: string;
  imageAlt:string;
  liveUrl?: string;
}

const publicationCard: React.FC<publicationCardProps> = ({
  title,
  abstract,
  imageUrl,
  imageAlt,
  liveUrl,
}) => {
  return (
    <div className="publication-card">
      <div className="publication-card-image-container">
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="publication-card-image"
        />
        
      </div>
      
      <div className="publication-card-content">
        
        
        <div className="publication-card-info">
          <h2 className="publication-card-main-title">{title}</h2>
          <p className="publication-card-description">{abstract}</p>
          
          <div className="publication-card-actions">
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                Visit Site ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default publicationCard;