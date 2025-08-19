import React from 'react';
import PublicationCard from '../../subcomponents/PublicationCard/PublicationCard';
import pubImg2 from '../../assets/image.png';

const PublicationSection: React.FC = () => {
  // You can move this to a separate file if needed
const publications = [
  {
    title: "Visualizing Dynamics of Federated Medical Models via Conversational Memory Elements",
    imageUrl: pubImg2,
    imageAlt: "Visualizing Dynamics of Federated Medical Models via Conversational Memory Elements",
    liveUrl: "https://link.springer.com/chapter/10.1007/978-3-031-78198-8_9?"
  }
  // Add more projects here
];

  return (
    <section id="publication" className="publication-section" style={{marginBottom:"4rem"}}>
      <h2>Publications</h2>

      {publications.map((publication, index) => (
        <PublicationCard
          key={index}
          {...publication}
        />
      ))}
    </section>
  );
};

export default PublicationSection;