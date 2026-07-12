import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown, HiPlay } from 'react-icons/hi';

export default function Hero({ onPlayIntro, isTickerPaused }) {
  const { scrollY } = useScroll();

  // Live 24fps timecode ticker (ref-based for performance)
  const timecodeRef = useRef(null);

  // Parallax bindings
  const bgY = useTransform(scrollY, [0, 600], ['0%', '12%']);
  const bgScale = useTransform(scrollY, [0, 600], [1.05, 1.15]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);
  const viewfinderScale = useTransform(scrollY, [0, 400], [1, 1.04]);
  const viewfinderOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Scroll-linked content animations
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const indicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  // Run live running timecode ticker at 24fps
  useEffect(() => {
    if (isTickerPaused) return;

    let frames = 0;
    const interval = setInterval(() => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      const f = String(frames).padStart(2, '0');
      if (timecodeRef.current) {
        timecodeRef.current.textContent = `${h}:${m}:${s}:${f}`;
      }
      frames = (frames + 1) % 24;
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [isTickerPaused]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
      }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Defocus blur and slide reveal
  const letterVariants = {
    hidden: { y: '60%', opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Subtitle letter spacing expansion
  const subtitleVariants = {
    hidden: { opacity: 0, letterSpacing: '0.2em', y: -8 },
    visible: {
      opacity: 1,
      letterSpacing: '0.4em',
      y: 0,
      transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const mediaMissionVariants = {
    hidden: { opacity: 0, letterSpacing: '0.05em', filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      letterSpacing: '0.2em',
      filter: 'blur(0px)',
      transition: { duration: 2.2, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Parallax Cinematic Background Image */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/cinema_hero_bg.png')`,
          y: bgY,
          scale: bgScale,
          opacity: bgOpacity,
          willChange: 'transform, opacity'
        }}
      />

      {/* Soft cinematic vignette overlay blending background into the cream page */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-cream/60 to-cream pointer-events-none" />

      {/* Cinematic Anamorphic Lens Flare Drift */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Horizontal flare line */}
        <motion.div
          initial={{ opacity: 0, x: '-35%', y: '42%', rotate: -2, scaleY: 0.8 }}
          animate={{ 
            opacity: [0, 0.45, 0.45, 0],
            x: ['-35%', '35%'],
            y: ['42%', '39%'],
            scaleY: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 13, 
            repeat: Infinity, 
            repeatDelay: 4, 
            ease: [0.25, 0.1, 0.25, 1.0] 
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute w-[200%] h-[1.5px] bg-gradient-to-r from-transparent via-[#BE5B3B]/40 via-white/70 via-[#BE5B3B]/40 to-transparent blur-[0.5px]"
        />
        
        {/* Glowing lens center spot */}
        <motion.div
          initial={{ opacity: 0, x: '-20%', y: '42%', scale: 0.9 }}
          animate={{ 
            opacity: [0, 0.75, 0.75, 0],
            x: ['-20%', '50%'],
            y: ['41.5%', '38.5%'],
            scale: [0.9, 1.15, 0.9]
          }}
          transition={{ 
            duration: 13, 
            repeat: Infinity, 
            repeatDelay: 4, 
            ease: [0.25, 0.1, 0.25, 1.0] 
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,transparent_70%)] blur-sm"
        />
      </div>

      {/* Cinematic Viewfinder Overlay with Scroll-linked Zoom-Out */}
      <motion.div
        style={{ scale: viewfinderScale, opacity: viewfinderOpacity, willChange: 'transform, opacity' }}
        className="absolute inset-4 md:inset-8 border border-gold/15 pointer-events-none z-20 flex flex-col justify-between p-4 text-[9px] font-sans tracking-[0.2em] uppercase text-gold/60"
      >
        {/* Top Viewfinder Bar */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-semibold text-charcoal/70">REC</span>
            
            {/* Audio db monitor animation next to REC */}
            <div className="flex items-center gap-0.5 h-3 pl-1">
              {[...Array(5)].map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: [3, Math.floor(Math.random() * 7) + 2, 3] }}
                  transition={{ duration: 0.5 + idx * 0.12, repeat: Infinity }}
                  className="w-0.5 bg-red-500 rounded-t-sm"
                />
              ))}
            </div>
          </div>
          <div ref={timecodeRef} className="font-mono font-medium text-charcoal/70 tabular-nums tracking-wider">00:00:00:00</div>
        </div>

        {/* Center Crosshair (Subtle) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-6 h-[1px] bg-gold" />
          <div className="h-6 w-[1px] bg-gold absolute" />
        </div>

        {/* Bottom Viewfinder Bar */}
        <div className="flex justify-between items-center w-full">
          <div className="font-medium text-charcoal/60">4K RAW 10-BIT</div>
          <div className="font-medium text-charcoal/60">24 FPS</div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          {/* Subheading tag with letter spacing expand reveal */}
          <motion.span
            variants={subtitleVariants}
            className="text-[10px] md:text-xs font-semibold text-gold uppercase block"
          >
            A Cinematic Production Studio
          </motion.span>

          {/* AARA staggered letter reveal with defocus blur */}
          <div className="overflow-hidden py-1">
            <motion.h2
              className="font-serif text-5xl md:text-7xl text-charcoal font-bold tracking-tight leading-none flex gap-2.5 justify-center"
            >
              {["A", "A", "R", "A"].map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block cursor-default select-none hover:text-gold hover:-translate-y-1 transition-transform duration-300"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* Media Mission fade, letter spacing expand, and shimmer metallic gradient */}
          <div className="py-1">
            <motion.span
              variants={mediaMissionVariants}
              className="block shimmer-text font-bold text-3xl md:text-6xl uppercase"
            >
              Media Mission
            </motion.span>
          </div>

          {/* Description Paragraph */}
          <motion.p
            variants={itemFade}
            className="max-w-2xl text-sm md:text-base text-charcoal-light/80 font-normal leading-relaxed tracking-wide mt-6 font-sans"
          >
            Crafting premium visual stories, feature cinema, commercial films, and unforgettable showreels with meticulous craft and elegance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemFade}
            className="flex items-center gap-4 mt-10 relative z-30"
          >
            {/* Primary Filled with diagonal sweep on hover */}
            <a href="#services" className="btn-gold relative overflow-hidden group">
              <span className="relative z-10">Explore Services</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </a>
            
            <button 
              onClick={onPlayIntro} 
              className="btn-outline flex items-center gap-1.5 py-3 px-6 relative overflow-hidden group cursor-pointer"
            >
              <HiPlay size={16} className="text-gold relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10">Play Intro</span>
              <span className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <a href="#contact" className="btn-outline relative overflow-hidden group">
              <span className="relative z-10">Start a Project</span>
              <span className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-charcoal/60 group-hover:text-gold transition-colors duration-300 font-semibold">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-gold"
        >
          <HiArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
