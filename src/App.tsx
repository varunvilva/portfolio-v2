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

function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Terminal />
          <ProjectsSection />
          <PublicationSection />
          <ExperienceSection />
          <AchievementSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
