import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import AaraLogo from './AaraLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-white/10">
          {/* Logo / Story Column - 5 cols */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <a href="#home" className="flex items-center w-fit" aria-label="AARA Media Mission home">
              <AaraLogo size="footer" className="ring-1 ring-white/10" />
            </a>
            <p className="text-xs text-white/60 max-w-sm leading-relaxed font-sans">
              A boutique cinema studio carving high-end visual stories, commercial spots, and narrative feature films. Serving clients globally from Chennai, Pollachi, and Bangalore.
            </p>
          </div>

          {/* Quick Links Column - 3 cols */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#home" className="text-xs text-white/70 hover:text-gold transition-colors duration-300 font-sans">Home</a>
              <a href="#about" className="text-xs text-white/70 hover:text-gold transition-colors duration-300 font-sans">About</a>
              <a href="#services" className="text-xs text-white/70 hover:text-gold transition-colors duration-300 font-sans">Services</a>
              <a href="#contact" className="text-xs text-white/70 hover:text-gold transition-colors duration-300 font-sans">Contact</a>
            </div>
          </div>

          {/* Newsletter Column - 4 cols */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold">Newsletter</h4>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Subscribe to receive updates on showreels, new project releases, and gear acquisitions.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-2.5 pl-4 pr-12 text-xs font-sans rounded focus:border-gold focus:outline-none transition-colors duration-300 text-white"
              />
              <button
                type="submit"
                className="absolute right-1 text-white hover:text-gold transition-colors duration-300 p-2"
                aria-label="Subscribe"
              >
                <FiArrowRight size={16} />
              </button>
            </form>

            {subscribed && (
              <span className="text-[10px] text-gold font-sans font-semibold mt-1">
                Subscribed successfully! Welcome to AARA Dispatch.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-[10px] text-white/40 tracking-wider font-sans uppercase">
          <p>© {new Date().getFullYear()} AARA Media Mission. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#/privacy" className="hover:text-gold transition-colors duration-300 font-sans">Privacy Policy</a>
            <a href="#/terms" className="hover:text-gold transition-colors duration-300 font-sans">Terms & Conditions</a>
            <a href="#/cookie-policy" className="hover:text-gold transition-colors duration-300 font-sans">Cookie & Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
