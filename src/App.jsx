import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetailsModal from './components/ServiceDetailsModal';
import PolicyPage from './components/PolicyPage';
import CinemaIntroPlayer from './components/CinemaIntroPlayer';

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState('main');
  const [showIntro, setShowIntro] = useState(false);

  // Disable body scroll when modal or intro overlay is open
  useEffect(() => {
    if (selectedService || showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService, showIntro]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/privacy') {
        setCurrentPage('privacy');
      } else if (hash === '#/terms') {
        setCurrentPage('terms');
      } else if (hash === '#/cookie-policy') {
        setCurrentPage('cookies');
      } else {
        setCurrentPage('main');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial render

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="bg-cream min-h-screen text-charcoal flex flex-col w-full relative overflow-x-hidden font-sans">
      {/* Decorative ambient light leaks drifting across the whole page */}
      <div className="absolute top-1/4 right-0 w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-[160px] pointer-events-none animate-float-1 z-0" />
      <div className="absolute top-2/3 left-0 w-[40vw] h-[40vw] rounded-full bg-gold-light/5 blur-[160px] pointer-events-none animate-float-2 z-0" />

      {currentPage === 'main' ? (
        <>
          <Navbar onServiceSelect={setSelectedService} />
          <main className="flex-grow w-full relative z-10">
            <Hero onPlayIntro={() => setShowIntro(true)} />
            <About />
            <Services onServiceSelect={setSelectedService} />
            <Process />
            <Contact />
          </main>
          <Footer />
        </>
      ) : (
        <PolicyPage type={currentPage} />
      )}

      <AnimatePresence>
        {selectedService && (
          <ServiceDetailsModal
            serviceId={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
        {showIntro && (
          <CinemaIntroPlayer
            onClose={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
