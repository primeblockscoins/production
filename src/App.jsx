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
import Gallery from './components/Gallery';
import Register from './components/Register';
import Admin from './components/Admin';

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
      } else if (hash === '#/gallery') {
        setCurrentPage('gallery');
      } else if (hash === '#/register') {
        setCurrentPage('register');
      } else if (hash === '#/admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('main');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial render

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isTickerPaused = showIntro || selectedService !== null;

  return (
    <div className="bg-cream min-h-screen text-charcoal flex flex-col w-full relative overflow-x-hidden font-sans">
      {/* Decorative ambient light leaks drifting across the whole page */}
      <div className="absolute top-1/4 right-0 w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(199,152,79,0.08)_0%,transparent_70%)] pointer-events-none animate-float-1 z-0" />
      <div className="absolute top-2/3 left-0 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(226,202,164,0.08)_0%,transparent_70%)] pointer-events-none animate-float-2 z-0" />

      {currentPage === 'main' ? (
        <>
          <Navbar onServiceSelect={setSelectedService} />
          <main className="flex-grow w-full relative z-10">
            <Hero onPlayIntro={() => setShowIntro(true)} isTickerPaused={isTickerPaused} />
            <About isTickerPaused={isTickerPaused} />
            <Services onServiceSelect={setSelectedService} />
            <Process />
            <Contact />
          </main>
          <Footer />
        </>
      ) : currentPage === 'gallery' ? (
        <>
          <Navbar onServiceSelect={setSelectedService} />
          <main className="flex-grow w-full relative z-10 pt-20">
            <Gallery />
          </main>
          <Footer />
        </>
      ) : currentPage === 'register' ? (
        <>
          <Navbar onServiceSelect={setSelectedService} />
          <main className="flex-grow w-full relative z-10 pt-20">
            <Register />
          </main>
          <Footer />
        </>
      ) : currentPage === 'admin' ? (
        <>
          <Navbar onServiceSelect={setSelectedService} />
          <main className="flex-grow w-full relative z-10 pt-20">
            <Admin />
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
