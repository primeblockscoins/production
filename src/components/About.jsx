import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      id="about" 
      className="py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F0F7FA 0%, #FAF9F6 50%, #F0F6F2 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Narrative Column (Slides from Left) */}
          <motion.div
            ref={ref}
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

          {/* Visual Showcase (Clapperboard Slate - Slides from Right & Tilts on Hover) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Aspect Video container with tilt hover animation */}
            <motion.div 
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="aspect-video overflow-hidden rounded shadow-2xl relative group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1518134346374-184f9d21cb3d?auto=format&fit=crop&w=800&q=80"
                alt="Cinema Production Clapperboard Slate"
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/30 via-transparent to-white/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
