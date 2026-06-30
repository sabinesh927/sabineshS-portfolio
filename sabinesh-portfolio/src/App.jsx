import Navbar from './components/Navbar';
import AuroraBackground from './components/AuroraBackground';
import ParticleField from './components/ParticleField';
import MouseGlow from './components/MouseGlow';
import Chatbot from './components/Chatbot';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Internship from './sections/Internship';
import Resume from './sections/Resume';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      <AuroraBackground />
      <ParticleField />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Internship />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
