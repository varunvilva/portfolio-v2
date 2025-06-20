import React from 'react';
import PublicationCard from '../../subcomponents/PublicationCard/PublicationCard';
import publicationImage from '../../assets/publication.webp';

const PublicationSection: React.FC = () => {
  // You can move this to a separate file if needed
const publications = [
  {
    title: "Visualizing Dynamics of Federated Medical Models via Conversational Memory Elements",
    imageUrl: publicationImage,
    abstract: "The recent shift towards distributed learning in medical AI has prompted investigations into crucial operational dynamics. This includes determination of the point when a federated model attains training saturation and examination of the influence of model(s) within a federated set-up. To this end, recently coined conversational memory elements (CMEs)-based cognitive analysis is explored in a federated environment. The key fact is to establish conversation with federated models by associating the learning with changes in weights, which are archived in CMEs. The CMEs for a federated learning setup are defined as Jacobian matrix structures derived from contiguous changes among weights over training epochs. Covariance map and auto-correlation function (ACF) are then derived from this extracted CMEs for each federated client. Such analysis yield interesting qualitative insights for visualizing operational dynamics of federated medical models. For experiments, three prototype federated clients with different datasets are used. The federated server is based on ResNet50, while clients use ResNet50, DenseNet121, and AlexNet with skip connections. Training is done on the Brain Tumor Classification dataset across four practically observed scenarios. Two significant outcomes are obtained: First, the integration of CMEs helps indicating training saturation points by analyzing evolving patterns in estimated covariance maps and thus offering valuable pointers for resource optimization. Second, ACF plots effectively distinguish dominant and weaker clients to facilitate informed decisions for targeted strategies.",
    imageAlt: "Visualizing Dynamics of Federated Medical Models via Conversational Memory Elements",
    liveUrl: "https://link.springer.com/chapter/10.1007/978-3-031-78198-8_9?"
  }
  // Add more projects here
];

  return (
    <section id="publication" className="publication-section" style={{marginBottom:"4rem"}}>
      <h2>Publication</h2>

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