import AchievementCard from '../../subcomponents/AchievementCard/AchievementCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';
import content from '../../data/content';

const AchievementSection = () => {
  return (
    <Container as="section" id="achievements" className="mb-16">
      <SectionTitle>Achievements</SectionTitle>
      <div
        className="
          grid grid-cols-1 gap-6
          md:grid-cols-3
          md:[grid-template-rows:auto_auto_auto_1fr]
        "
      >
        {content.achievements.map((item) => (
          <AchievementCard key={item.title} {...item} />
        ))}
      </div>
    </Container>
  );
};

export default AchievementSection;
