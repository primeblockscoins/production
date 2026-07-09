import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiPencil, HiVideoCamera, HiDesktopComputer } from 'react-icons/hi';

const steps = [
  {
    phase: '01',
    title: 'Pre-Production',
    subtitle: 'Blueprint of Vision',
    icon: HiPencil,
    description: 'Every great project begins with a script. We work side-by-side with you to write, storyboard, cast talent, and scout premium locations in Chennai, Pollachi, or Bangalore.',
    bullets: ['Screenwriting & Script Doctoring', 'Visual Storyboarding', 'Location Scouting & Permits', 'Casting & Talent Auditions']
  },
  {
    phase: '02',
    title: 'Production',
    subtitle: 'Capturing the Light',
    icon: HiVideoCamera,
    description: 'This is where ideas take physical form. Our crew deploys with state-of-the-art ARRI and RED camera packages, custom anamorphic lens kits, and high-fidelity sound gear.',
    bullets: ['Director-led Shooting Crews', 'ARRI Alexa 35 & RED 8K Capture', 'Professional Gaffer & Grip Teams', 'Multi-channel Location Sound']
  },
  {
    phase: '03',
    title: 'Post-Production',
    subtitle: 'Crafting the Final Slate',
    icon: HiDesktopComputer,
    description: 'In the suite, the pieces assemble. We craft the pacing, sculpt the color environment inside DaVinci Resolve, build spatial soundscapes, and deliver master grades.',
    bullets: ['Offline & Online Editorial', 'Expert Color Grading (DaVinci Resolve)', 'Spatial Audio Design & Mixing', 'VFX & Master Render Deliveries']
  }
];

export default function Process() {
  const containerRef = useRef(null);
  
  // Track scroll inside timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to vertical line fill scale
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={containerRef}
      id="process" 
      className="py-14 md:py-20 bg-cream relative overflow-hidden"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(190,91,59,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(243,239,224,0.6)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">Workflow</span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal font-bold tracking-tight mt-2">
            The Cinematic Pipeline
          </h2>
          <p className="max-w-xl mx-auto text-sm text-charcoal-light/70 font-sans mt-4">
            A meticulous, structured process designed to transition concepts from script-pages to premium silver-screen deliverables.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto mt-12">
          
          {/* Vertical Base Line (Scrolled Behind) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-charcoal/10 -translate-x-1/2" />
          
          {/* Active Filled Line linked to scroll */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2.5px] bg-gradient-to-b from-gold via-gold-light to-gold shadow-[0_0_10px_#BE5B3B] -translate-x-1/2"
          />

          {/* Timeline steps */}
          <div className="flex flex-col gap-10 md:gap-14">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx}
                  className="flex flex-col md:flex-row relative items-start md:items-center"
                >
                  {/* Step Node dot in middle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-120px" }}
                      className="w-12 h-12 rounded-full bg-white border-2 border-gold flex items-center justify-center text-gold shadow-md"
                    >
                      <Icon size={20} />
                    </motion.div>
                  </div>

                  {/* Left Side spacer/content for larger screens */}
                  <div className="w-full md:w-1/2 md:pr-16 pl-16 md:pl-0 flex justify-end">
                    {isEven ? (
                      <TimelineCard step={step} alignment="right" />
                    ) : (
                      <div className="hidden md:block text-right pr-4">
                        <span className="font-mono text-7xl font-extrabold text-charcoal/5 leading-none">
                          {step.phase}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Side spacer/content for larger screens */}
                  <div className="w-full md:w-1/2 md:pl-16 pl-16 flex justify-start mt-4 md:mt-0">
                    {!isEven ? (
                      <TimelineCard step={step} alignment="left" />
                    ) : (
                      <div className="hidden md:block pl-4">
                        <span className="font-mono text-7xl font-extrabold text-charcoal/5 leading-none">
                          {step.phase}
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

/* Timeline Card Sub-component */
function TimelineCard({ step, alignment }) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: alignment === 'left' ? 40 : -40,
      y: 10 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="bg-white p-6 md:p-8 rounded shadow-sm border border-charcoal/5 max-w-md w-full relative hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4 border-b border-charcoal/5 pb-3">
        <div className="flex flex-col">
          <span className="text-[9px] tracking-widest font-mono text-gold uppercase font-bold">
            Phase {step.phase}
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-charcoal tracking-wide">
            {step.title}
          </h3>
        </div>
        <span className="text-[10px] tracking-wider uppercase font-semibold text-charcoal/40 font-mono">
          {step.subtitle}
        </span>
      </div>

      <p className="text-xs md:text-sm text-charcoal-light/80 leading-relaxed font-sans mb-6">
        {step.description}
      </p>

      {/* Bullet points */}
      <ul className="grid grid-cols-1 gap-2.5">
        {step.bullets.map((bullet, index) => (
          <li key={index} className="flex items-center gap-2 text-[11px] md:text-xs text-charcoal-light/75 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
