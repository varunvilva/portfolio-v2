import dea_image from '../../assets/DEA.png';
import CertificationCard from '../../subcomponents/CertificationCard/CertificationCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';

const certList = [
  {
    title: 'AWS Data Engineering Associate',
    year: 'Jul 2025',
    description:
      'Secured a 100% score (1000/1000) in the AWS Data Engineering Associate certification exam, demonstrating proficiency in data engineering concepts and AWS services.',
    certLink: 'https://www.credly.com/badges/b06d9f14-dfdb-4c33-a4d4-76f545ebba5d/public_url',
    image: dea_image,
  },
] as const;

const CertificationsSection = () => {
  return (
    <Container as="section" id="certifications" className="mb-16">
      <SectionTitle>Certifications</SectionTitle>
      <div className="flex flex-col gap-6">
        {certList.map((item) => (
          <CertificationCard
            key={item.title}
            title={item.title}
            year={item.year}
            description={item.description}
            certLink={item.certLink}
            imageUrl={item.image}
          />
        ))}
      </div>
    </Container>
  );
};

export default CertificationsSection;
