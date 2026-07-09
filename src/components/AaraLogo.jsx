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
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer select-none group"
    >
      <svg viewBox="0 0 32 32" className="w-full h-full">
        {/* Film Reels on top */}
        <g>
          {/* Left Reel */}
          <circle cx="9" cy="10" r="3.8" fill="none" stroke={goldColor} strokeWidth="1.5" />
          <line x1="9" y1="6.2" x2="9" y2="13.8" stroke={goldColor} strokeWidth="0.8" />
          <line x1="5.2" y1="10" x2="12.8" y2="10" stroke={goldColor} strokeWidth="0.8" />
        </g>

        <g>
          {/* Right Reel */}
          <circle cx="17" cy="10" r="3.8" fill="none" stroke={bodyColor} strokeWidth="1.5" />
          <line x1="17" y1="6.2" x2="17" y2="13.8" stroke={bodyColor} strokeWidth="0.8" />
          <line x1="13.2" y1="10" x2="20.8" y2="10" stroke={bodyColor} strokeWidth="0.8" />
        </g>

        {/* Simple Camera Body (Charcoal/White) */}
        <rect
          x="7"
          y="14.5"
          width="12"
          height="8.5"
          fill="none"
          stroke={bodyColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
          rx="0.5"
        />

        {/* Matte Box / Lens Hood on the right (Gold) */}
        <path
          d="M 19,16.5 L 24.5,14.5 V 21 L 19,19 Z"
          fill="none"
          stroke={goldColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Lens connector detail */}
        <line
          x1="19"
          y1="19.5"
          x2="19"
          y2="16"
          stroke={goldColor}
          strokeWidth="1.8"
        />
      </svg>

      {/* Laser Projection beam from the lens hood */}
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
  );
}
