import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AaraLogo({ darkBackground = false }) {
  const [hovered, setHovered] = useState(false);

  // Color tokens matching the website's gold and charcoal/white system
  const goldColor = '#BE5B3B'; // Brand gold/rust
  const bodyColor = darkBackground ? '#FFFFFF' : '#2A2A2A'; // White or Charcoal

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 cursor-pointer select-none group"
    >
      {/* Unique Rigged Digital Cinema Camera Icon */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-full h-full">
          {/* Base Rods (Charcoal/White) */}
          <line
            x1="4"
            y1="25.5"
            x2="25"
            y2="25.5"
            stroke={bodyColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="7" cy="25.5" r="1" fill={goldColor} />
          <circle cx="22" cy="25.5" r="1" fill={goldColor} />

          {/* Camera Body (Charcoal/White) */}
          <rect
            x="8"
            y="16"
            width="11"
            height="8"
            fill="none"
            stroke={bodyColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
            rx="0.5"
          />

          {/* Battery block on the left (Charcoal/White) */}
          <rect
            x="4"
            y="17.5"
            width="4"
            height="6.5"
            fill="none"
            stroke={bodyColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
            rx="0.5"
          />

          {/* Top Handle (Charcoal/White) */}
          <path
            d="M 9,16 V 13.5 H 16 V 16"
            fill="none"
            stroke={bodyColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Top Monitor Bracket & Screen (Glows Gold on Hover) */}
          <line
            x1="13.5"
            y1="13.5"
            x2="13.5"
            y2="11"
            stroke={bodyColor}
            strokeWidth="1.5"
          />
          <motion.rect
            x="11"
            y="7.5"
            width="5"
            height="3.5"
            fill={hovered ? goldColor : "none"}
            stroke={hovered ? goldColor : bodyColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
            rx="0.5"
            className="transition-colors duration-300"
          />

          {/* Matte Box / Lens Hood on the right (Gold) */}
          <path
            d="M 19,17 L 25.5,14 V 22.5 L 19,19.5 Z"
            fill="none"
            stroke={goldColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Lens connector detail */}
          <line
            x1="19"
            y1="20"
            x2="19"
            y2="17"
            stroke={goldColor}
            strokeWidth="1.8"
          />
        </svg>

        {/* Laser Projection beam from the matte box */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -5 }}
              animate={{ opacity: 0.15, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -5 }}
              className="absolute left-[90%] top-[56%] -translate-y-1/2 w-10 h-10 rounded-full bg-gold blur-md pointer-events-none z-10"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Brand Wordmark Text */}
      <div className="flex flex-col items-start leading-none font-sans">
        <span
          className={`font-serif text-xl md:text-2xl font-bold tracking-widest leading-none ${
            darkBackground ? 'text-white' : 'text-charcoal'
          }`}
        >
          AARA
        </span>
        <span
          style={{ color: goldColor }}
          className="text-[7.5px] md:text-[8.5px] font-bold tracking-[0.25em] uppercase leading-none mt-1"
        >
          MEDIA MISSION
        </span>
      </div>
    </div>
  );
}
