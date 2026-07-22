import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AaraLogo({ size = 'nav', className = '', darkBackground = false }) {
  const [hovered, setHovered] = useState(false);

  // Set sizing classes based on the size prop
  let sizeClasses = 'h-8'; // fallback
  if (size === 'nav') {
    sizeClasses = 'h-8 md:h-9';
  } else if (size === 'footer') {
    sizeClasses = 'h-10 md:h-12';
  } else if (size === 'policy') {
    sizeClasses = 'h-8 md:h-9';
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
    >
      <img
        src="/finallogo.png"
        alt="ARAA Media Mission"
        className={`${sizeClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-102`}
      />

      {/* Laser Projection beam from the logo */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -5 }}
            animate={{ opacity: 0.15, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -5 }}
            className="absolute left-[90%] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold blur-md pointer-events-none z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}