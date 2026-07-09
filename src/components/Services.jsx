import { motion } from 'framer-motion';
import {
  HiVideoCamera,
  HiFilm,
  HiPencil,
  HiDesktopComputer,
  HiColorSwatch,
  HiVolumeUp,
  HiChevronRight
} from 'react-icons/hi';

const services = [
  {
    id: 'camera',
    icon: HiVideoCamera,
    title: 'Cinematography',
    description: 'Bespoke camera work utilizing ARRI Alexa and RED digital cinema systems with premium anamorphic glass.'
  },
  {
    id: 'direction',
    icon: HiFilm,
    title: 'Film Direction',
    description: 'Translating concepts into visual language, guiding narratives and performance with high artistic sensitivity.'
  },
  {
    id: 'script',
    icon: HiPencil,
    title: 'Script & Development',
    description: 'Writing, refining, and storyboarding concepts into production-ready shoot guides and shooting drafts.'
  },
  {
    id: 'editing',
    icon: HiDesktopComputer,
    title: 'Post-Production & Editing',
    description: 'Stitching stories together with precise pacing, narrative focus, and multi-cam offline/online workflows.'
  },
  {
    id: 'color',
    icon: HiColorSwatch,
    title: 'Color Grading',
    description: 'Applying custom LUTs and expert grading inside DaVinci Resolve to establish atmospheric mood and visual identity.'
  },
  {
    id: 'sound',
    icon: HiVolumeUp,
    title: 'Sound Design & Score',
    description: 'Creating atmospheric spatial audio design, dialogue cleanup, and licensing premium scores to elevate the image.'
  }
];

export default function Services({ onServiceSelect }) {
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

  // Mouse move handler to update local CSS variables for spotlight effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" className="py-14 md:py-20 bg-cream-dark/20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
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
                onMouseMove={handleMouseMove}
                onClick={() => onServiceSelect && onServiceSelect(service.id)}
                className="bg-white p-8 rounded shadow-sm border border-charcoal/5 hover:shadow-xl hover:border-gold/30 transition-all duration-300 group spotlight-card cursor-pointer overflow-hidden relative"
              >
                {/* Icon Container (relative and z-10 to stay above spotlight gradient) */}
                <div className="relative z-10 w-12 h-12 bg-cream-dark flex items-center justify-center rounded text-gold mb-6 transition-all duration-500 group-hover:bg-gold group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(190,91,59,0.2)]">
                  <Icon size={24} className="transition-transform duration-500 group-hover:rotate-12" />
                </div>
                {/* Title */}
                <h3 className="relative z-10 font-serif text-xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="relative z-10 text-sm text-charcoal-light/80 font-sans leading-relaxed mt-3">
                  {service.description}
                </p>

                {/* View Draft link detail */}
                <div className="relative z-10 text-[9px] font-mono tracking-widest text-neutral-400 group-hover:text-gold transition-colors duration-300 mt-5 uppercase flex items-center gap-1">
                  View Production Draft <HiChevronRight size={10} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

