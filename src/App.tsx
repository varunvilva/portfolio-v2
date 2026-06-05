import type { ComponentType } from 'react';
import './App.css';
import AchievementSection from './components/AchievementSection/AchievementSection';
import ContactSection from './components/ContactSection/ContactSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import PublicationSection from './components/PublicationSection/PublicationSection';
import Terminal from './components/Terminal/Terminal';
import CertificationsSection from './components/CertificationsSection/CertificationsSection';
import { ThemeProvider } from './context/ThemeContext';
import content from './data/content';

const sectionRegistry: Record<string, ComponentType> = {
  projects: ProjectsSection,
  publication: PublicationSection,
  experience: ExperienceSection,
  achievements: AchievementSection,
  certifications: CertificationsSection,
  contact: ContactSection,
};

function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Terminal />
          {content.sections.map(({ id }) => {
            const Section = sectionRegistry[id];
            if (!Section) {
              throw new Error(
                `No component registered for section id "${id}". Add it to sectionRegistry in App.tsx.`,
              );
            }
            return <Section key={id} />;
          })}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
