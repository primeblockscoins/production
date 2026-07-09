import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import InteractiveClapperboard from './InteractiveClapperboard';

export default function About() {
  const containerRef = useRef(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Staggered fade and slide-in from left for narrative
  const leftColumnVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 md:py-32 overflow-hidden bg-cream relative"
    >
      {/* Subtle Cinematic Static Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          style={{
            backgroundImage: `url('/cinema_action_sequence.png')`,
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-[0.28] contrast-[1.15]"
        />
        {/* Soft edge fade overlays to blend with the cream background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream opacity-80" />
        {/* Strong fade on the left side to keep the narrative text highly legible */}
        <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-cream via-cream/90 to-transparent opacity-100" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-cream to-transparent opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Narrative Column (Slides from Left) */}
          <motion.div
            ref={inViewRef}
            variants={leftColumnVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            {/* Title block with animated drawing underline */}
            <motion.div variants={itemVariants} className="mb-2">
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">The Studio</span>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal font-bold tracking-tight mt-2 leading-tight">
                Crafting Vision Into Light
              </h2>
              {/* Decorative underline that draws in */}
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '80px' } : { width: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] bg-gold mt-4"
              />
            </motion.div>

            {/* Blockquote with solid left border accent */}
            <motion.blockquote
              variants={itemVariants}
              className="pl-6 border-l-2 border-gold text-lg md:text-xl font-serif text-charcoal-light italic font-medium leading-relaxed mt-2"
            >
              "Cinema is not a reflection of reality, but a reality of that reflection."
            </motion.blockquote>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-charcoal-light/80 leading-relaxed font-sans mt-2"
            >
              Founded with the singular purpose of elevating storytelling, AARA Media Mission is a boutique cinema production company. We specialize in producing immersive experiences—from independent feature films to premium commercial spots and artistic music videos.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-charcoal-light/80 leading-relaxed font-sans"
            >
              Our operations span from the scenic landscapes of Pollachi and Chennai to the bustling creative hubs of Bangalore. We blend technical mastery (using state-of-the-art camera systems like ARRI, RED, and Cine lenses) with cinematic sensitivity to evoke real emotion.
            </motion.p>
          </motion.div>

          {/* Visual Showcase (Interactive Clapperboard - Slides from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <InteractiveClapperboard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
