import CertificationCard from '../../subcomponents/CertificationCard/CertificationCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import content from '../../data/content';
import { resolveImage } from '../../data/assets';

const CertificationsSection = () => {
  return (
    <Container as="section" id="certifications" className="mb-16">
      <SectionTitle>Certifications</SectionTitle>
      <div className="flex flex-col gap-6">
        {content.certifications.map((item) => (
          <CertificationCard
            key={item.title}
            title={item.title}
            year={item.year}
            description={item.description}
            certLink={item.certLink}
            imageUrl={resolveImage(item.image)}
          />
        ))}
      </div>
    </Container>
  );
};

export default CertificationsSection;
