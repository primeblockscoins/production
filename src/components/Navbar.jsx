import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Process', href: '#process', id: 'process' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

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
      rootMargin: '-40% 0px -40% 0px', // Triggers when section occupies the middle portion of the screen
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
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
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 relative py-1 group ${isActive ? 'text-gold font-bold' : 'text-charcoal/80 hover:text-gold'
                  }`}
              >
                {link.name}
                {/* Underline indicators */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
              </a>
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
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`text-sm font-semibold uppercase tracking-widest py-2 border-b border-charcoal/5 transition-colors duration-300 ${isActive ? 'text-gold font-bold' : 'text-charcoal/80 hover:text-gold'
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
