import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight, HiCamera } from 'react-icons/hi';

const categories = ['All', 'Production Stills', 'Behind the Scenes', 'Cinematography', 'Concept Art'];

const galleryItems = [
  {
    id: 1,
    title: 'ARAA Cinematic Key Frame',
    category: 'Production Stills',
    image: '/gallery1.png',
    description: 'A dramatic key frame captured during principal photography. Focuses on cinematic depth, dynamic range, and rich color science.',
    meta: { camera: 'ARRI Alexa Mini LF', lens: 'Signature Prime 45mm', aperture: 'T1.8', iso: '800' }
  },
  {
    id: 2,
    title: 'High-Impact Action Sequence',
    category: 'Cinematography',
    image: '/gallery2.png',
    description: 'Dynamic motion capture shot from our recent high-budget action feature production.',
    meta: { camera: 'RED V-Raptor 8K', lens: 'Cooke Anamorphic 35mm', aperture: 'T2.3', iso: '1280' }
  },
  {
    id: 3,
    title: 'Behind the Scenes & On-Set Rigging',
    category: 'Behind the Scenes',
    image: '/gallery3.png',
    description: 'Behind-the-scenes glance showing camera rigging, lighting setups, and real-time directorial blocking on set.',
    meta: { camera: 'Sony Venice 2', lens: 'Kowa Anamorphic 50mm', aperture: 'T2.0', iso: '1600' }
  },
  {
    id: 4,
    title: 'Visual Atmosphere & Mood Composition',
    category: 'Concept Art',
    image: '/gallery4.png',
    description: 'Concept artwork and mood grading panel designed for pre-visualization and director reference.',
    meta: { camera: 'ARRI Alexa Mini LF', lens: 'Signature Prime 75mm', aperture: 'T2.8', iso: '400' }
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-cream py-12 px-6 md:px-12 max-w-7xl mx-auto select-none relative z-10">
      {/* Page Header */}
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-[0.3em] text-gold uppercase font-bold"
        >
          Visual Portfolio
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl font-bold text-charcoal mt-3 mb-4 tracking-tight"
        >
          Cinematography & Production Gallery
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[2px] bg-gold mx-auto mb-6"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-charcoal-light/75 text-sm md:text-base max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Explore a selection of high-fidelity film stills, concept art, and behind-the-scenes glimpses from ARAA's recent cinematic productions.
        </motion.p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer border ${
              activeCategory === cat
                ? 'text-white border-gold bg-gold font-bold shadow-md shadow-gold/20'
                : 'text-charcoal/70 border-charcoal/10 hover:border-gold hover:text-gold bg-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group cursor-pointer bg-white border border-charcoal/5 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative"
            >
              {/* Photo Containment & Viewfinder Overlays */}
              <div className="relative aspect-[3/2] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                
                {/* Camera Viewfinder Corners Hover Effect */}
                <div className="absolute inset-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-gold" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-gold" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-gold" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-gold" />
                  
                  {/* Subtle Rec dot overlay */}
                  <span className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded-[2px] text-[8px] font-mono font-bold tracking-wider text-red-500 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    REC
                  </span>
                </div>

                {/* Hover Camera Icon Mask */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <HiCamera size={20} />
                  </span>
                </div>
              </div>

              {/* Text Card details */}
              <div className="p-5 flex-grow flex flex-col justify-between border-t border-charcoal/5">
                <div>
                  <span className="text-[9px] font-mono tracking-wider text-gold font-bold uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-charcoal mt-1 group-hover:text-gold transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-charcoal-light/75 line-clamp-2 mt-2 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Metadata Badge */}
                {item.meta.camera && (
                  <div className="mt-4 pt-3 border-t border-charcoal/5 flex justify-between items-center text-[9px] font-mono text-charcoal-light/60">
                    <span>{item.meta.camera}</span>
                    <span>{item.meta.lens}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold hover:border-gold hover:text-white transition-all cursor-pointer z-50"
            >
              <HiX size={22} />
            </button>

            {/* Left/Right Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold hover:text-white transition-all cursor-pointer z-50"
            >
              <HiChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold hover:text-white transition-all cursor-pointer z-50"
            >
              <HiChevronRight size={24} />
            </button>

            {/* Lightbox Center Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col md:flex-row bg-charcoal border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
            >
              {/* Media viewport */}
              <div className="flex-grow bg-black flex items-center justify-center max-h-[50vh] md:max-h-[70vh] aspect-[3/2] relative">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain"
                />
                
                {/* Vintage camera framelines overlay */}
                <div className="absolute inset-4 pointer-events-none border border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border border-white/20 rounded-full" />
                  </div>
                  {/* Aspect ratio frame corners */}
                  <span className="absolute top-1 left-2 text-[8px] font-mono text-white/40 tracking-wider">RAW 8K</span>
                  <span className="absolute bottom-1 right-2 text-[8px] font-mono text-white/40 tracking-wider">2.39:1</span>
                  <span className="absolute top-1 right-2 text-[8px] font-mono text-white/40 tracking-wider">24fps</span>
                </div>
              </div>

              {/* Media Sidebar */}
              <div className="w-full md:w-80 p-6 md:p-8 bg-charcoal text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">
                    {activeLightboxItem.category}
                  </span>
                  <h2 className="font-serif text-xl font-bold mt-2 mb-4 text-white leading-tight">
                    {activeLightboxItem.title}
                  </h2>
                  <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    {activeLightboxItem.description}
                  </p>
                </div>

                {/* Specs / Metadata */}
                <div className="mt-8 pt-6 border-t border-white/15">
                  <h4 className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
                    <HiCamera size={12} /> Camera Metadata
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[10px] font-mono text-white/60">
                    {Object.entries(activeLightboxItem.meta).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-white/35 uppercase text-[8px] tracking-wider mb-0.5">{key}</span>
                        <span className="text-white/95">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
