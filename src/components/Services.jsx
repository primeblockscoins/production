import { motion } from 'framer-motion';
import {
  HiVideoCamera,
  HiFilm,
  HiPencil,
  HiDesktopComputer,
  HiColorSwatch,
  HiVolumeUp
} from 'react-icons/hi';

const services = [
  {
    icon: HiVideoCamera,
    title: 'Cinematography',
    description: 'Bespoke camera work utilizing ARRI Alexa and RED digital cinema systems with premium anamorphic glass.'
  },
  {
    icon: HiFilm,
    title: 'Film Direction',
    description: 'Translating concepts into visual language, guiding narratives and performance with high artistic sensitivity.'
  },
  {
    icon: HiPencil,
    title: 'Script & Development',
    description: 'Writing, refining, and storyboarding concepts into production-ready shoot guides and shooting drafts.'
  },
  {
    icon: HiDesktopComputer,
    title: 'Post-Production & Editing',
    description: 'Stitching stories together with precise pacing, narrative focus, and multi-cam offline/online workflows.'
  },
  {
    icon: HiColorSwatch,
    title: 'Color Grading',
    description: 'Applying custom LUTs and expert grading inside DaVinci Resolve to establish atmospheric mood and visual identity.'
  },
  {
    icon: HiVolumeUp,
    title: 'Sound Design & Score',
    description: 'Creating atmospheric spatial audio design, dialogue cleanup, and licensing premium scores to elevate the image.'
  }
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-cream-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">Capabilities</span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal font-bold tracking-tight mt-2">
            Cinematic Expertise
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-charcoal-light/70 font-sans mt-4">
            From pre-production strategy to high-end post-production, we handle every detail of the cinematic pipeline with precision.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded shadow-sm border border-charcoal/5 hover:shadow-xl hover:border-gold/30 transition-all duration-300 group"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 bg-cream-dark flex items-center justify-center rounded text-gold mb-6 transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                  <Icon size={24} />
                </div>
                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-sm text-charcoal-light/80 font-sans leading-relaxed mt-3">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
