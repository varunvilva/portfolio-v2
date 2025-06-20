import React from 'react';
import ProjectCard from '../../subcomponents/ProjectCard/ProjectCard';
import shipImage from '../../assets/ship3.jpg';
import kafka from '../../assets/kafka2.png'

const ProjectsSection: React.FC = () => {
  // You can move this to a separate file if needed
const projects = [
  {
    title: "ISRO Safe Ship Navigation",
    description: "Collaborated with VNIT Nagpur to build the backend for the Safe Ship Navigation (SSN) project using Python and Flask. I was responsible for architecting and implementing core backend functionalities from the ground up, including task queuing with Celery, advanced routing logic using the A* algorithm, efficient caching strategies for performance optimization, comprehensive error handling, and monitoring tools for system reliability. The system was designed for scalability, robustness, and real-time maritime navigation assistance.",
    imageUrl: shipImage,
    imageAlt: "ISRO SSN project",
    technologies: ['Flask', 'Fast-API', 'Celery', 'Redis'],
    liveUrl: "",
    sourceUrl: ""
  },

  {
    title: "Notification Microservice (Go + Kafka)",
    description: "Designed and developed a scalable notification microservice in Go, leveraging Apache Kafka for asynchronous event streaming. The service supports multi-channel notifications including email, SMS, and push, with built-in support for retries, monitoring, and message acknowledgment. Integrated Kafka consumer-producer patterns and built the core logic from scratch to ensure high throughput and fault tolerance.",
    imageUrl: kafka,
    imageAlt: "Go Kafka Notification Microservice",
    technologies: ["Go", "Kafka", "PostgreSQL", "Docker", "Goroutines"],
    liveUrl: "",
    sourceUrl: "https://github.com/varunvilva/NotificationGoKafka"
  }

  
  // Add more projects here
];

  return (
    <section id="projects" className="projects-section" style={{marginBottom:"4rem"}}>
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
        />
      ))}
    </section>
  );
};

export default ProjectsSection;