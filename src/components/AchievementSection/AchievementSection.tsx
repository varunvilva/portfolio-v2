import React from 'react';
import AchievementCard from '../../subcomponents/AchievementCard/AchievementCard';

const achievementsList = [
  {
    title: "Google: Build For Bharat",
    year: "May 2024",
    topic: "Shelfie: Catalogue Digization",
    achievement: "Runner Up"
  },
  {
    title: "Samsung Solve for Tomorrow Hackathon",
    year: "Jul 2024",
    topic: "Sustainable Startup Ideas",
    achievement: "Top 10 in North Indian Zone"
},
  {
    title: "Google GenAI Exchange Hackathon",
    year: "Oct 2024",
    topic: "Arthik Setu",
    achievement: "First Place"
  }
];

const AchievementSection: React.FC = () => {
  return (
    <section id="achievements" className="achievement-section">
      <h2>Achievements</h2>
      <div className="achievement-cards-container">
        {achievementsList.map((item, index) => (
          <AchievementCard
            key={index}
            title={item.title}
            year={item.year}
            topic={item.topic}
            achievement={item.achievement}
          />
        ))}
      </div>
    </section>
  );
};

export default AchievementSection;