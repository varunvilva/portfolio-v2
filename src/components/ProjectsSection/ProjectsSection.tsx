import ProjectCard from '../../subcomponents/ProjectCard/ProjectCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import content from '../../data/content';
import { resolveImage } from '../../data/assets';

const ProjectsSection = () => {
  return (
    <Container as="section" id="projects" className="mb-16">
      <SectionTitle>Projects</SectionTitle>
      <div className="flex flex-col gap-8">
        {content.projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            imageUrl={resolveImage(project.image)}
            imageAlt={project.imageAlt}
            technologies={project.technologies}
            liveUrl={project.liveUrl}
            sourceUrl={project.sourceUrl}
          />
        ))}
      </div>
    </Container>
  );
};

export default ProjectsSection;
