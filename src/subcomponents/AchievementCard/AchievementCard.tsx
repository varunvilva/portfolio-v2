import React from 'react';
import './AchievementCard.css';

interface AchievementCardProps {
  title: string;
  year: string;
  topic: string;
  achievement: string;
  imageUrl?: string;
  imageAlt?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  year,
  topic,
  achievement,
  imageUrl,
  imageAlt
}) => {
  return (
    <div className="achievement-card">
      {imageUrl && (
        <div className="achievement-card-image-container">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="achievement-card-image"
          />
        </div>
      )}
      <div className="achievement-card-content">
        <div className="achievement-card-header">
          <h3 className="achievement-card-title">{title}</h3>
          <span className="achievement-card-year">{year}</span>
        </div>
        <h4 className="achievement-card-topic">{topic}</h4>
        <p className="achievement-card-description">{achievement}</p>
      </div>
    </div>
  );
};

export default AchievementCard;