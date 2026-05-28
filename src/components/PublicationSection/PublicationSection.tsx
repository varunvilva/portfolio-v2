import PublicationCard from '../../subcomponents/PublicationCard/PublicationCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import pubImg2 from '../../assets/image.png';

const publications = [
  {
    title: 'Visualizing Dynamics of Federated Medical Models via Conversational Memory Elements',
    imageUrl: pubImg2,
    imageAlt: 'Visualizing Dynamics of Federated Medical Models via Conversational Memory Elements',
    liveUrl: 'https://link.springer.com/chapter/10.1007/978-3-031-78198-8_9',
  },
] as const;

const PublicationSection = () => {
  return (
    <Container as="section" id="publication" className="mb-16">
      <SectionTitle>Publications</SectionTitle>
      <div className="flex flex-col gap-8">
        {publications.map((p) => (
          <PublicationCard key={p.title} {...p} />
        ))}
      </div>
    </Container>
  );
};

export default PublicationSection;
