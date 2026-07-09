import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-cream-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="text-center md:text-left mb-16 md:mb-24">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">The Studio</span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal font-bold tracking-tight mt-2">
            Crafting Vision Into Light
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Narrative */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl font-serif text-charcoal-light italic font-medium leading-relaxed"
            >
              "Cinema is not a reflection of reality, but a reality of that reflection."
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-charcoal-light/80 leading-relaxed font-sans"
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

          {/* Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
                alt="Cinematographer behind the lens"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent mix-blend-multiply" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 rounded shadow-xl border border-charcoal/5 hidden sm:block max-w-[180px] text-center"
            >
              <span className="font-serif text-3xl font-bold text-gold">100%</span>
              <p className="text-[10px] tracking-widest text-charcoal uppercase font-semibold mt-1">Cinematic Standard</p>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
