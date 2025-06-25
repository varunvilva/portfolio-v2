import React from 'react';
import ExperienceCard from '../../subcomponents/ExperienceCard/ExperienceCard'; // Adjust path if needed
import kickdrum from '../../assets/kickdrum2.png';
import jio from '../../assets/jio.webp'; // Uncomment and import Jio image

const experienceList = [
  {
    company: "Kickdrum",
    location: "Banglore, India",
    year: "Jan 2025- Present",
    experience: "Gained hands-on experience across the full stack — including React with TypeScript for frontend development, Java for backend services, and various AWS services for deployment and scalability. Also explored the data engineering domain through practical exposure. As a key project, developed a full-featured hotel management system comprising both client and admin portals, with fault tolerance and scalability at the core of the system’s design. Emphasized clean architecture, modular components, and robust API integration to support real-world operational needs.",
    image: kickdrum,
    imageAlt: "Kickdrum company logo"
  },
  {
    company: "Jio Platforms Pvt Ltd",
    location: "Mumbai, India",
    year: "May 2024 - Aug 2024",
    experience: "Designed and implemented a robust notification microservice from the ground up using FastAPI and Azure EventHub, enabling seamless communication across multiple internal applications. The system supports scalable, event-driven architecture and ensures high reliability through custom failure-handling mechanisms and retry logic. Successfully integrated third-party messaging providers such as Twilio and Gupshup to enable multi-channel notifications including SMS and WhatsApp. The service was built with scalability, modularity, and real-time delivery in mind.",
    image: jio, // Placeholder until you add Jio image
    imageAlt: "Jio Platforms company logo"
  }
];

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <h2>Experiences</h2>
      {experienceList.map((item, index) => (
        <ExperienceCard
          key={index}
          companyName={item.company}
          year={item.year}
          location={item.location}
          experience={item.experience}
          imageUrl={item.image}
          imageAlt={item.imageAlt}
        />
      ))}
    </section>
  );
};

export default ExperienceSection;