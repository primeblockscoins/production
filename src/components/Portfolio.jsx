import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiX, HiVolumeUp, HiVolumeOff, HiChevronRight } from 'react-icons/hi';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

const categories = ['All', 'Features', 'Commercials', 'Documentaries', 'Music Videos'];

const portfolioItems = [
  {
    id: 1,
    title: 'The Whispering Shadows',
    category: 'Features',
    year: '2025',
    role: 'Cinematography & Directing',
    image: '/portfolio_feature.png',
    duration: '02:15',
    client: 'Neon Horizon Films',
    subtitles: [
      { time: 0, text: '[Soft wind blowing, camera pans slowly]' },
      { time: 3, text: 'Old Man: "Some secrets are meant to stay buried in these woods."' },
      { time: 7, text: '[Low suspenseful cello notes rise]' },
      { time: 11, text: 'Boy: "But she told me to search here... under the old oak."' },
      { time: 16, text: '[Violins crescendo, cut to black]' }
    ]
  },
  {
    id: 2,
    title: 'Precision Evolution',
    category: 'Commercials',
    year: '2026',
    role: 'Full Production / Commercial',
    image: '/portfolio_commercial.png',
    duration: '00:30',
    client: 'Chronos Automotive',
    subtitles: [
      { time: 0, text: '[Sleek electric hum of the engine accelerating]' },
      { time: 3, text: 'Voiceover: "Crafted with passion, engineered for perfection."' },
      { time: 7, text: '[Epic brass fanfare, camera swoops over chassis]' },
      { time: 11, text: 'Voiceover: "The new Chronos EV. Drive the future today."' }
    ]
  },
  {
    id: 3,
    title: 'Echoes of Pollachi',
    category: 'Documentaries',
    year: '2025',
    role: 'Cinematography & Grading',
    image: '/portfolio_doc.png',
    duration: '03:00',
    client: 'Vanya Green Initiative',
    subtitles: [
      { time: 0, text: '[Warm sunrise, ambient birds chirping in the hills]' },
      { time: 4, text: 'Farmer: "These fields have been our life for four generations."' },
      { time: 9, text: 'Farmer: "The earth speaks to those who listen carefully."' },
      { time: 14, text: '[Inspiring acoustic guitar melody enters]' }
    ]
  },
  {
    id: 4,
    title: 'Midnight Revelations',
    category: 'Music Videos',
    year: '2026',
    role: 'Direction & Post-Production',
    image: '/portfolio_music.png',
    duration: '03:20',
    client: 'Astral Wave Records',
    subtitles: [
      { time: 0, text: '[Vibrant retro synth-wave beat starts]' },
      { time: 4, text: '[Singer: "Dancing in the neon rain, forgetting yesterday..."]' },
      { time: 10, text: '[Heavy bass drop, camera swirls through reflections]' },
      { time: 15, text: '[Neon lights flash rapidly in sync with the beat]' }
    ]
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter items
  const filteredItems = portfolioItems.filter(item =>
    activeFilter === 'All' ? true : item.category === activeFilter
  );

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-cream-dark/20 text-charcoal relative overflow-hidden border-t border-charcoal/5">
      {/* Soft Light leak gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none animate-float-1" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-light/5 blur-[120px] pointer-events-none animate-float-2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">Selected Work</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mt-2 text-charcoal">
              Featured Frames
            </h2>
            <p className="max-w-md text-sm text-charcoal-light/75 font-sans mt-4">
              Explore our slate of award-winning narratives, commercial spots, and visual projects.
            </p>
          </div>

          {/* Categories Tab list */}
          <div className="flex flex-wrap gap-2 md:gap-3 bg-cream p-1.5 rounded-lg border border-charcoal/5 backdrop-blur shadow-sm">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-4 py-2 text-[10px] md:text-xs font-semibold uppercase tracking-widest rounded-md cursor-pointer transition-colors duration-300 ${activeFilter === category ? 'text-white font-bold' : 'text-charcoal-light/65 hover:text-charcoal'
                  }`}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilterBgLight"
                    className="absolute inset-0 bg-gold rounded-md -z-10 shadow-[0_4px_12px_rgba(190,91,59,0.25)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col bg-white rounded overflow-hidden cursor-pointer border border-charcoal/5 hover:border-gold/20 hover:shadow-xl transition-all duration-500 shadow-sm"
                onClick={() => setSelectedProject(item)}
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark border-b border-charcoal/5">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Gentle hover overlay */}
                  <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors duration-500" />

                  {/* Subtle Grid borders */}
                  <div className="absolute inset-3 border border-white/10 pointer-events-none transition-all duration-500 group-hover:border-gold/10" />

                  {/* Play Button Overlay (Fades in on Hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-gold shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <HiPlay size={24} className="ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 text-[8px] font-mono tracking-widest text-white/50 uppercase drop-shadow-sm">
                    CAM_A // R_0{item.id}
                  </div>
                </div>

                {/* Info Section below image */}
                <div className="p-6 flex flex-col gap-1 bg-white flex-grow">
                  <div className="flex justify-between items-center text-[9px] tracking-widest uppercase font-semibold text-gold">
                    <span>{item.category}</span>
                    <span className="text-charcoal-light/40 font-mono">{item.year}</span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300 mt-1">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center text-xs text-charcoal-light/70 font-sans mt-1.5">
                    <span>{item.role}</span>
                    <span className="text-[9px] font-mono tracking-widest text-charcoal-light/35 uppercase group-hover:text-gold transition-colors duration-300 flex items-center gap-1">
                      Play Frame <HiChevronRight size={10} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Fullscreen Player Modal (Light Mode) */}
      <AnimatePresence>
        {selectedProject && (
          <CinemaPlayerModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* Sub-component: Light Mode Cinematic Video Player Modal */
function CinemaPlayerModal({ project, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimecode, setCurrentTimecode] = useState('00:00:00:00');
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const modalRef = useRef(null);
  const intervalRef = useRef(null);

  // Simulated buffering stage
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Time calculations and updates
  const parseTimecode = (seconds) => {
    const totalFrames = seconds * 24;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor(totalFrames % 24);

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
  };

  const getSecondsFromFormatted = (formattedString) => {
    const [m, s] = formattedString.split(':').map(Number);
    return m * 60 + s;
  };

  const durationSec = getSecondsFromFormatted(project.duration);

  // Running playback simulation
  useEffect(() => {
    if (isPlaying && !isLoading) {
      const startTime = Date.now() - (progress / 100) * durationSec * 1000;

      intervalRef.current = setInterval(() => {
        const elapsedMs = Date.now() - startTime;
        const elapsedSec = elapsedMs / 1000;

        if (elapsedSec >= durationSec) {
          // Loop playback
          setProgress(0);
          setCurrentTimecode('00:00:00:00');
          setIsPlaying(true);
          return;
        }

        const pct = (elapsedSec / durationSec) * 100;
        setProgress(pct);
        setCurrentTimecode(parseTimecode(elapsedSec));

        // Subtitles calculation
        const matchSub = project.subtitles.reduce((prev, sub) => {
          if (elapsedSec >= sub.time) return sub;
          return prev;
        }, null);
        setCurrentSubtitle(matchSub ? matchSub.text : '');
      }, 1000 / 24); // 24 FPS redraw rate
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isLoading, progress, durationSec, project.subtitles]);

  // Keyboard shortcut to close or pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, onClose]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Click on scrub bar
  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (clickX / width) * 100;
    setProgress(percentage);
    setCurrentTimecode(parseTimecode((percentage / 100) * durationSec));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-cream/90 backdrop-blur-md"
    >
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-2xl scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Close button outside frame */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-charcoal-light/60 hover:text-charcoal transition-colors duration-300 p-2 cursor-pointer z-50 bg-white/60 backdrop-blur-sm rounded-full border border-charcoal/10 shadow-sm"
      >
        <HiX size={22} />
      </button>

      {/* Main Video Frame (Light Theme slate player) */}
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl aspect-video bg-cream-dark rounded-lg overflow-hidden border border-charcoal/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10 flex flex-col justify-between"
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-4">
            <span className="relative flex h-8 w-8">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-8 w-8 bg-gold-dark"></span>
            </span>
            <span className="text-[10px] tracking-[0.3em] font-mono text-charcoal-light/75 uppercase">
              Loading 4K Stream...
            </span>
          </div>
        )}

        {/* Video Canvas Still (Simulated Screen) */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className={`w-full h-full bg-cover bg-center transition-transform duration-[6s] ease-out ${isPlaying && !isLoading ? 'scale-[1.04] translate-y-1' : 'scale-100'
              }`}
            style={{ backgroundImage: `url(${project.image})` }}
          />

          {/* Shutter Grain Overlay */}
          <div className="absolute inset-0 bg-neutral-950/20 mix-blend-overlay pointer-events-none opacity-[0.12] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black pointer-events-none" />

          {/* Subtitles Track (Light premium style box) */}
          <AnimatePresence>
            {isPlaying && currentSubtitle && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded text-center text-xs md:text-sm tracking-wide text-charcoal border border-charcoal/15 font-sans shadow-md z-30"
              >
                {currentSubtitle}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Info Bar */}
        <div className="relative z-20 flex justify-between items-center p-4 bg-gradient-to-b from-white/90 to-transparent text-[10px] font-mono tracking-widest text-charcoal-light font-medium">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-600 animate-pulse' : 'bg-neutral-400'}`} />
            <span>{isPlaying ? 'PLAYING' : 'PAUSED'} // {project.title.toUpperCase()}</span>
          </div>
          <div>CLIENT: {project.client.toUpperCase()}</div>
        </div>

        {/* Big Play/Pause Toggle in Center on Click */}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
        >
          {!isPlaying && !isLoading && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 bg-white/80 backdrop-blur rounded-full flex items-center justify-center border border-charcoal/10 text-gold shadow-2xl"
            >
              <HiPlay size={36} className="ml-1.5" />
            </motion.div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="relative z-20 p-4 bg-gradient-to-t from-white/95 to-transparent flex flex-col gap-3">

          {/* Timeline / Progress Bar */}
          <div
            onClick={handleScrub}
            className="group/timeline relative h-1.5 bg-charcoal/15 rounded cursor-pointer flex items-center transition-all duration-300 hover:h-2"
          >
            {/* Loaded buffered mock segment */}
            <div className="absolute inset-y-0 left-0 bg-charcoal/5 rounded" style={{ width: '85%' }} />

            {/* Active Track */}
            <div
              className="h-full bg-gold rounded relative flex items-center"
              style={{ width: `${progress}%` }}
            >
              {/* Scrub Handle */}
              <div className="absolute -right-1.5 w-3 h-3 bg-white border-2 border-gold rounded-full scale-0 group-hover/timeline:scale-100 transition-transform duration-200 shadow" />
            </div>
          </div>

          {/* Control items */}
          <div className="flex justify-between items-center text-charcoal-light">
            <div className="flex items-center gap-4">
              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-charcoal hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                {isPlaying ? (
                  <span className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider bg-charcoal/5 border border-charcoal/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" /> Pause
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider bg-charcoal/5 border border-charcoal/10 px-2 py-1 rounded">
                    Play
                  </span>
                )}
              </button>

              {/* Volume Mute / Unmute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-charcoal-light hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                {isMuted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
              </button>

              {/* Running Timecodes */}
              <div className="font-mono text-xs tracking-wider flex items-center gap-1.5 text-charcoal-light/60">
                <span className="text-charcoal font-semibold">{currentTimecode}</span>
                <span>/</span>
                <span>00:{project.duration}:00</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Aspect Ratio note */}
              <span className="text-[9px] font-mono tracking-widest text-charcoal-light/65 bg-white/40 border border-charcoal/10 px-2 py-0.5 rounded font-medium">
                2.39:1 Anamorphic
              </span>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-charcoal-light hover:text-charcoal transition-colors duration-200 cursor-pointer"
              >
                {isFullscreen ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
              </button>
            </div>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}
