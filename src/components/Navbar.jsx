import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronRight } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Process', href: '#process', id: 'process' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const megaServices = [
  { id: 'script', title: 'Script & Development', tagline: 'Screenplays, storyboards, and scripts' },
  { id: 'camera', title: 'Cinematography', tagline: 'Camera packages, reports, and light maps' },
  { id: 'direction', title: 'Film Direction', tagline: 'Director logs, scene blocks, and camera tracks' },
  { id: 'editing', title: 'Post-Production', tagline: 'Timeline editors, tracks, and frame cuts' },
  { id: 'color', title: 'Color Grading', tagline: 'Grading wheels, wave scopes, and LUT tables' },
  { id: 'sound', title: 'Sound Design', tagline: 'Mix consoles, faders, and sound waves' }
];

export default function Navbar({ onServiceSelect }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  // Track scroll position for header visual state & scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Header backdrop change
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer to detect which section is currently centered on screen
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'process', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 select-none ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-charcoal/5 shadow-sm py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
        {/* Logo */}
        <a href="#home" className="flex items-center group">
          <div className="relative w-10 h-10 flex items-center justify-center border border-gold rounded-full transition-transform duration-500 group-hover:rotate-180">
            <span className="font-serif text-lg font-semibold text-charcoal tracking-tighter">A</span>
            <div className="absolute inset-0.5 border border-dashed border-gold/40 rounded-full animate-[spin_20s_linear_infinite]" />
          </div>

          {/* Collapsing Wordmark (collapses on scroll) */}
          <motion.div
            initial={{ width: 'auto', opacity: 1, marginLeft: 12 }}
            animate={{ 
              width: scrolled ? 0 : 'auto', 
              opacity: scrolled ? 0 : 1,
              marginLeft: scrolled ? 0 : 12
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col overflow-hidden whitespace-nowrap"
          >
            <span className="font-serif text-xl font-bold tracking-widest text-charcoal">AARA</span>
            <span className="text-[8px] tracking-[0.3em] text-gold uppercase font-medium">MEDIA MISSION</span>
          </motion.div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isServices = link.id === 'services';
            return (
              <div
                key={link.name}
                className="relative py-1"
                onMouseEnter={isServices ? handleMouseEnter : undefined}
                onMouseLeave={isServices ? handleMouseLeave : undefined}
              >
                <a
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 relative group flex items-center gap-1 ${
                    isActive ? 'text-gold font-bold' : 'text-charcoal/80 hover:text-gold'
                  }`}
                >
                  {link.name}
                  {isServices && (
                    <span className={`transform transition-transform duration-300 ${megaMenuOpen ? 'rotate-90 text-gold' : 'text-charcoal/60'}`}>
                      <HiChevronRight size={10} />
                    </span>
                  )}
                  {/* Underline indicators */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              </div>
            );
          })}
          <a href="#contact" className="btn-gold !py-2 !px-4 text-[10px] shadow-sm hover:shadow-[0_4px_12px_rgba(190,91,59,0.2)]">
            Book Consult
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-charcoal hover:text-gold transition-colors p-1"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute top-full right-0 mt-3 w-[780px] max-w-[calc(100vw-48px)] bg-white border border-charcoal/10 rounded-lg shadow-2xl p-6 z-50 grid grid-cols-12 gap-8 text-left"
            >
              {/* Left Column: Intro */}
              <div className="col-span-4 border-r border-charcoal/5 pr-6 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-mono tracking-widest text-gold font-bold uppercase">AARA Cinema Pipeline</span>
                  <h4 className="font-serif text-base font-bold text-charcoal mt-1.5 leading-snug">Production Drafts & Pre-Production Workspaces</h4>
                  <p className="text-[11px] text-charcoal-light/70 font-sans leading-relaxed mt-2">
                    Deep dive into screenplay formatting, interactive lighting grids, blocking node tracks, multi-track editors, color scopes, and mixing consoles.
                  </p>
                </div>
                <a 
                  href="#services"
                  onClick={() => setMegaMenuOpen(false)}
                  className="text-[9px] font-mono tracking-widest text-gold hover:underline uppercase flex items-center gap-1 mt-6"
                >
                  Explore All Services <HiChevronRight size={10} />
                </a>
              </div>

              {/* Right Columns: Services Grid */}
              <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-4">
                {megaServices.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setMegaMenuOpen(false);
                      onServiceSelect && onServiceSelect(srv.id);
                    }}
                    className="flex flex-col gap-1 p-2 rounded hover:bg-cream-dark/15 text-left transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="text-xs font-serif font-bold text-charcoal group-hover:text-gold transition-colors flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                      {srv.title}
                    </span>
                    <span className="text-[10px] text-charcoal-light/60 font-sans leading-normal pl-3">
                      {srv.tagline}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-charcoal/5 overflow-hidden"
          >
            <div className="px-8 py-6 flex flex-col gap-4">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                const isServices = link.id === 'services';

                if (isServices) {
                  return (
                    <div key={link.name} className="flex flex-col w-full border-b border-charcoal/5 py-2">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex justify-between items-center text-sm font-semibold uppercase tracking-widest text-charcoal-light/80 hover:text-gold transition-colors py-2 cursor-pointer"
                      >
                        <span>{link.name}</span>
                        <span className={`transform transition-transform duration-300 ${mobileServicesOpen ? 'rotate-90 text-gold' : 'text-charcoal/50'}`}>
                          <HiChevronRight size={14} />
                        </span>
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-3 pl-4 mt-2 mb-1"
                          >
                            {megaServices.map((srv) => (
                              <button
                                key={srv.id}
                                onClick={() => {
                                  setMobileOpen(false);
                                  onServiceSelect && onServiceSelect(srv.id);
                                }}
                                className="text-[11px] text-left uppercase font-mono tracking-widest text-charcoal-light/70 hover:text-gold cursor-pointer animate-pulse-once"
                              >
                                {srv.title}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`text-sm font-semibold uppercase tracking-widest py-2 border-b border-charcoal/5 transition-colors duration-300 ${
                      isActive ? 'text-gold font-bold' : 'text-charcoal/80 hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-gold w-full text-center mt-2 shadow-sm"
              >
                Book Consult
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrolling Indicator Progress Bar at the bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-charcoal/5">
        <motion.div
          className="h-full bg-gold shadow-[0_0_8px_rgba(190,91,59,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </motion.nav>
  );
}
