import PublicationCard from '../../subcomponents/PublicationCard/PublicationCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import content from '../../data/content';
import { resolveImage } from '../../data/assets';

const PublicationSection = () => {
  return (
    <Container as="section" id="publication" className="mb-16">
      <SectionTitle>Publications</SectionTitle>
      <div className="flex flex-col gap-8">
        {content.publications.map((p) => (
          <PublicationCard
            key={p.title}
            title={p.title}
            imageUrl={resolveImage(p.image)}
            imageAlt={p.imageAlt}
            liveUrl={p.liveUrl}
          />
        ))}
      </div>
    </Container>
  );
};

export default PublicationSection;
