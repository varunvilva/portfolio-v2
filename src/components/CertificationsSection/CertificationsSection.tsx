import React from 'react';
import dea_image from '../../assets/DEA.png';
import CertificationCard from '../../subcomponents/CertificationCard/CertificationCard';

const certList = [
  {
    title: "AWS Data Engineering Associate",
    year: "Jul 2025",
    description:"Secured a 100% score (1000/1000) in the AWS Data Engineering Associate certification exam, demonstrating proficiency in data engineering concepts and AWS services.",
    certLink: "https://www.credly.com/badges/b06d9f14-dfdb-4c33-a4d4-76f545ebba5d/public_url",
    image: dea_image
  },
];

const CertificationScetion: React.FC = () => {
  return (
    <section id="certifications" className="certification-section">
      <h2>Certifications</h2>
      {certList.map((item, index) => (
        <CertificationCard
          key={index}
          title={item.title}
          year={item.year}
          description={item.description}
          certLink={item.certLink}
          imageUrl={item.image}
        />
      ))}
    </section>
  );
};

export default CertificationScetion;