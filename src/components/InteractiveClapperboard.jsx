import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function InteractiveClapperboard({ isTickerPaused }) {
  const [take, setTake] = useState(1);
  const [isClapping, setIsClapping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [flash, setFlash] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const cardRef = useRef(null);
  const timecodeRef = useRef(null);

  const controls = useAnimation();

  // Live running 24fps timecode logic (ref-based for performance)
  useEffect(() => {
    if (isTickerPaused) return;

    let frame = 0;
    let sec = 34;
    let min = 21;
    let hour = 16;

    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hour++;
            if (hour >= 24) {
              hour = 0;
            }
          }
        }
      }

      const pad = (num) => String(num).padStart(2, '0');
      if (timecodeRef.current) {
        timecodeRef.current.textContent = `${pad(hour)}:${pad(min)}:${pad(sec)}:${pad(frame)}`;
      }
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [isTickerPaused]);

  // Format date like on a film set (e.g., 09 JUL 2026)
  useEffect(() => {
    const d = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    setCurrentDate(`${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`);
  }, []);

  // Sync stick hover position when not active in a click sequence
  useEffect(() => {
    if (!isClapping) {
      controls.start({
        rotate: isHovered ? -12 : 0,
        transition: { type: 'spring', stiffness: 260, damping: 20 }
      });
    }
  }, [isHovered, isClapping, controls]);

  // Synthesize a wood block/slate clack sound using Web Audio API
  const playClapSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Low-mid wooden thud
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08);

      oscGain.gain.setValueAtTime(0.4, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      // High sharp noise click
      const bufferSize = ctx.sampleRate * 0.03; // ~30ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(2.0, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
      noise.start();
      noise.stop(ctx.currentTime + 0.03);
    } catch (e) {
      console.warn('Web Audio Context not supported or blocked by user gesture:', e);
    }
  };

  // Perform clapper clap animation
  const handleClap = async (e) => {
    e.stopPropagation();
    if (isClapping) return;
    setIsClapping(true);
    setFlash(true);

    // 1. Pivot open fast
    await controls.start({
      rotate: -32,
      transition: { duration: 0.1, ease: 'easeOut' }
    });

    // 2. Play clack sound
    playClapSound();

    // 3. Slam shut with bouncy spring
    await controls.start({
      rotate: 0,
      transition: { type: 'spring', stiffness: 700, damping: 15 }
    });

    // Increment take counter and turn off flash
    setTake((prev) => (prev >= 99 ? 1 : prev + 1));
    setFlash(false);
    setIsClapping(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const clapperStripes = {
    background: 'repeating-linear-gradient(-45deg, #121212, #121212 18px, #FAF9F6 18px, #FAF9F6 36px)'
  };

  return (
    <div className="relative w-full aspect-[16/10] max-w-xl mx-auto z-10 flex items-center justify-center p-2 select-none">
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClap}
        className="w-full h-full bg-[#151515] border border-neutral-800 rounded shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden cursor-pointer relative group transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(199,152,79,0.15)]"
      >
        {/* Shutter Camera Flash Overlay */}
        <motion.div
          animate={{ opacity: flash ? 0.35 : 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-white pointer-events-none z-30"
        />

        {/* Hinge Joint Circle Detail */}
        <div className="absolute left-[3%] top-[9%] w-3 h-3 rounded-full bg-neutral-600 border border-neutral-400 z-30 shadow" />

        {/* Top Clapper Bar Section */}
        <div className="w-full flex flex-col">
          {/* Upper Moving Stick */}
          <div className="relative h-9 md:h-11 w-full bg-neutral-900 border-b border-neutral-950 overflow-hidden">
            <motion.div
              animate={controls}
              style={{
                ...clapperStripes,
                transformOrigin: '5% 95%',
              }}
              className="absolute inset-0 w-full h-full border-b border-neutral-900"
            />
          </div>

          {/* Lower Static Stick */}
          <div
            style={clapperStripes}
            className="h-9 md:h-11 w-full border-b border-neutral-950 relative"
          >
            {/* Ambient Shadow cast by the stick */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/40 blur-[1px]" />
          </div>
        </div>

        {/* Slate Chalkboard Face */}
        <div className="flex-grow p-4 md:p-6 flex flex-col justify-between relative text-neutral-200">

          {/* Production Title Header */}
          <div className="flex justify-between items-center border-b border-neutral-800/80 pb-2">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-[0.2em] uppercase text-neutral-500 font-bold">Production</span>
              <span className="text-[11px] md:text-xs tracking-[0.25em] font-bold text-cream">AARA MEDIA MISSION</span>
            </div>
            {/* Glowing active REC indicator */}
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-neutral-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c7984f] animate-pulse" />
              <span className="text-[8px] tracking-widest font-semibold text-neutral-400">ROLLING</span>
            </div>
          </div>

          {/* Roll, Scene, Take Grid */}
          <div className="grid grid-cols-3 border-b border-neutral-800/80 text-center py-2 md:py-3 divide-x divide-neutral-800/80">
            <div className="flex flex-col justify-center">
              <span className="text-[8px] tracking-widest uppercase text-neutral-500 font-bold mb-1">Roll</span>
              <span className="font-mono text-base md:text-lg text-cream/90 font-bold rotate-[-1deg]">A01</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[8px] tracking-widest uppercase text-neutral-500 font-bold mb-1">Scene</span>
              <span className="font-mono text-base md:text-lg text-cream/90 font-bold rotate-[1deg]">04</span>
            </div>
            <div className="flex flex-col justify-center relative group/take">
              <span className="text-[8px] tracking-widest uppercase text-[#c7984f] font-bold mb-1">Take</span>
              <motion.span
                key={take}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="font-mono text-lg md:text-xl text-cream font-bold relative inline-block text-glow"
              >
                {String(take).padStart(2, '0')}
              </motion.span>
              {/* Tap to clap visual hint */}
              <span className="absolute -bottom-1 left-0 right-0 text-[7px] tracking-wider text-neutral-600 font-medium scale-0 group-hover/take:scale-100 transition-transform duration-200">
                TAP CLAPPER
              </span>
            </div>
          </div>

          {/* Timecode Digital LED Display */}
          <div className="py-2.5 md:py-3.5 flex flex-col items-center justify-center border-b border-neutral-800/80 bg-black/35 rounded-sm shadow-inner relative overflow-hidden">
            <span className="absolute left-2.5 top-1.5 text-[7px] tracking-widest uppercase text-neutral-600 font-bold">LTC Timecode</span>

            {/* LED Glowing text */}
            <span
              ref={timecodeRef}
              style={{
                textShadow: '0 0 8px rgba(199,152,79,0.5), 0 0 20px rgba(199,152,79,0.3)',
              }}
              className="font-mono text-2xl md:text-3xl font-semibold tracking-wider text-[#c7984f]"
            >
              16:21:34:00
            </span>
          </div>

          {/* Bottom Info Section: Director, Camera, Date, FPS */}
          <div className="grid grid-cols-2 pt-2 md:pt-3 text-[9px] md:text-xs">
            <div className="flex flex-col gap-1.5 pr-2 border-r border-neutral-800/80">
              <div className="flex flex-col">
                <span className="text-[7px] tracking-widest uppercase text-neutral-500 font-bold">Director</span>
                <span className="font-semibold text-cream/80 truncate">JAKOB & RYAN</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] tracking-widest uppercase text-neutral-500 font-bold">Camera</span>
                <span className="font-semibold text-cream/80 truncate">ARRI ALEXA 35</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pl-3">
              <div className="flex flex-col">
                <span className="text-[7px] tracking-widest uppercase text-neutral-500 font-bold">Date</span>
                <span className="font-semibold text-cream/80">{currentDate || '09 JUL 2026'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] tracking-widest uppercase text-neutral-500 font-bold">FPS</span>
                <span className="font-semibold text-[#c7984f]">24.00 fps</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hover / Hint Border highlight */}
        <div className="absolute inset-0 border border-[#c7984f]/0 group-hover:border-[#c7984f]/15 transition-colors duration-300 rounded pointer-events-none" />
      </motion.div>
    </div>
  );
}
