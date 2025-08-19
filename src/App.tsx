import './App.css'
import AchievementSection from './components/AchievementSection/AchievementSection'
import ContactSection from './components/ContactSection/ContactSection'
import ExperienceSection from './components/ExperienceSection/ExperienceSection'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import ProjectsSection from './components/ProjectsSection/ProjectsSection'
import PublicationSection from './components/PublicationSection/PublicationSection'
import Terminal from './components/Terminal/Terminal'
import Certifications from './components/CertificationsSection/CertificationsSection'

function App() {
  return (
    <>
    <Navbar />
    <Hero />
    <Terminal />
    <ProjectsSection />
    <PublicationSection/>
    <ExperienceSection/>
    <AchievementSection/>
    <Certifications/>
    <ContactSection/>
    <Footer/>
    </>
  )
}

export default App
