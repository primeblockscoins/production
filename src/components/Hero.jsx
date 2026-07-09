import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax bindings
  const bgY = useTransform(scrollY, [0, 600], ['0%', '12%']);
  const bgScale = useTransform(scrollY, [0, 600], [1.05, 1.15]);
  const viewfinderScale = useTransform(scrollY, [0, 400], [1, 1.04]);
  const viewfinderOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
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

  const aaraVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
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
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cinema_hero_bg.png')`,
          y: bgY,
          scale: bgScale
        }}
      />

      {/* Soft cinematic vignette overlay blending background into the cream page */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-cream/60 to-cream" />

      {/* Floating Light Particles (Cinematic Dust Specs) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.4)] blur-[3px]"
            style={{
              width: Math.random() * 12 + 8, // 8px to 20px
              height: Math.random() * 12 + 8,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              x: [0, Math.random() * 120 - 60, 0],
              y: [0, Math.random() * 120 - 60, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: Math.random() * 25 + 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cinematic Viewfinder Overlay with Scroll-linked Zoom-Out */}
      <motion.div 
        style={{ scale: viewfinderScale, opacity: viewfinderOpacity }}
        className="absolute inset-4 md:inset-8 border border-gold/15 pointer-events-none z-20 flex flex-col justify-between p-4 text-[9px] font-sans tracking-[0.2em] uppercase text-gold/60"
      >
        {/* Top Viewfinder Bar */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-semibold text-charcoal/70">REC</span>
          </div>
          <div className="font-medium text-charcoal/60">TC 00:14:52:18</div>
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          {/* Subheading tag */}
          <motion.span
            variants={itemFade}
            className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-gold uppercase"
          >
            A Cinematic Production Studio
          </motion.span>
          
          {/* AARA slide-up masking reveal */}
          <div className="overflow-hidden py-1">
            <motion.h2
              variants={aaraVariants}
              className="font-serif text-5xl md:text-7xl text-charcoal font-bold tracking-tight leading-none"
            >
              AARA
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
            className="flex items-center gap-4 mt-10"
          >
            <a href="#portfolio" className="btn-gold">
              View Our Work
            </a>
            <a href="#contact" className="btn-outline">
              Start a Project
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
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
