import ExperienceCard from '../../subcomponents/ExperienceCard/ExperienceCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import content from '../../data/content';
import { resolveImage } from '../../data/assets';

const ExperienceSection = () => {
  return (
    <Container as="section" id="experience" className="mb-16">
      <SectionTitle>Experiences</SectionTitle>
      <div className="flex flex-col gap-8">
        {content.experiences.map((item) => (
          <ExperienceCard
            key={item.company}
            companyName={item.company}
            year={item.year}
            location={item.location}
            experience={item.experience}
            imageUrl={resolveImage(item.image)}
            imageAlt={item.imageAlt}
          />
        ))}
      </div>
    </Container>
  );
};

export default ExperienceSection;
