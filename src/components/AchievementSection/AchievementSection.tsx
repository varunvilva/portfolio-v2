import AchievementCard from '../../subcomponents/AchievementCard/AchievementCard';
import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';

const achievementsList = [
  {
    title: 'Google: Build For Bharat',
    year: 'May 2024',
    topic: 'Shelfie: Catalogue Digization',
    achievement: 'Runner Up',
  },
  {
    title: 'Samsung Solve for Tomorrow Hackathon',
    year: 'Jul 2024',
    topic: 'Sustainable Startup Ideas',
    achievement: 'Top 10 in North Indian Zone',
  },
  {
    title: 'Google GenAI Exchange Hackathon',
    year: 'Oct 2024',
    topic: 'Arthik Setu',
    achievement: 'First Place',
  },
] as const;

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
        {achievementsList.map((item) => (
          <AchievementCard key={item.title} {...item} />
        ))}
      </div>
    </Container>
  );
};

export default AchievementSection;
