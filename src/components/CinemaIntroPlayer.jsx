import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

export default function CinemaIntroPlayer({ onClose }) {
  const [phase, setPhase] = useState('init'); // init -> projector -> countdown -> assembly -> reveal -> loop
  const [countdown, setCountdown] = useState(8);
  const [muted, setMuted] = useState(false);

  // Audio nodes refs
  const audioCtxRef = useRef(null);
  const humNodeRef = useRef(null);
  const fanNodeRef = useRef(null);
  const clickIntervalRef = useRef(null);
  const droneGainRef = useRef(null);
  const droneOscsRef = useRef([]);

  // Canvas ref
  const canvasRef = useRef(null);

  // Initialize Web Audio synthesizers
  const startAudioEngine = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Synthesize low projector hum (Oscillator)
      const humOsc = ctx.createOscillator();
      humOsc.type = 'sawtooth';
      humOsc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz Low A note

      const humFilter = ctx.createBiquadFilter();
      humFilter.type = 'lowpass';
      humFilter.frequency.setValueAtTime(90, ctx.currentTime);

      const humGain = ctx.createGain();
      humGain.gain.setValueAtTime(0.05, ctx.currentTime);

      humOsc.connect(humFilter);
      humFilter.connect(humGain);
      humGain.connect(ctx.destination);
      humOsc.start();
      humNodeRef.current = { osc: humOsc, gain: humGain };

      // 2. Synthesize projector fan noise (White Noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const fanFilter = ctx.createBiquadFilter();
      fanFilter.type = 'bandpass';
      fanFilter.frequency.setValueAtTime(320, ctx.currentTime);
      fanFilter.Q.setValueAtTime(0.6, ctx.currentTime);

      const fanGain = ctx.createGain();
      fanGain.gain.setValueAtTime(0.015, ctx.currentTime);

      noiseSource.connect(fanFilter);
      fanFilter.connect(fanGain);
      fanGain.connect(ctx.destination);
      noiseSource.start();
      fanNodeRef.current = { source: noiseSource, gain: fanGain };

      // 3. Projector frame click ticking
      const playTickClick = () => {
        if (!ctx || ctx.state === 'suspended' || muted) return;
        const osc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        clickGain.gain.setValueAtTime(0.04, ctx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(clickGain);
        clickGain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      };
      clickIntervalRef.current = setInterval(playTickClick, 420);
    } catch (err) {
      console.warn("Web Audio API not supported or blocked: ", err);
    }
  };

  // Play short oscillator countdown beep
  const playBeep = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state === 'suspended' || muted) return;
    const osc = ctx.createOscillator();
    const beepGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime); // 1000Hz tone
    beepGain.gain.setValueAtTime(0.08, ctx.currentTime);
    beepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(beepGain);
    beepGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  };

  // Synthesize Cinematic THX-style Riser / Deep Note
  const playTheatricalRiser = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state === 'suspended') return;

    const numOscs = 6;
    const baseFreq = 48; // Low C note
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(muted ? 0 : 0.15, ctx.currentTime + 2.5); // fade in drone
    gainNode.connect(ctx.destination);
    droneGainRef.current = gainNode;

    const oscs = [];
    for (let i = 0; i < numOscs; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';

      // Start detuned from 180Hz to 380Hz
      const startFreq = 180 + Math.random() * 200;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);

      // Sweep down to target harmonics of low C
      const targetFreq = baseFreq * (i + 1);
      osc.frequency.exponentialRampToValueAtTime(targetFreq, ctx.currentTime + 3.2);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gainNode);
      osc.start();
      oscs.push(osc);
    }
    droneOscsRef.current = oscs;
  };

  // Handle Muting Toggle
  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (humNodeRef.current) humNodeRef.current.gain.gain.setValueAtTime(nextMuted ? 0 : 0.05, audioCtxRef.current.currentTime);
    if (fanNodeRef.current) fanNodeRef.current.gain.gain.setValueAtTime(nextMuted ? 0 : 0.015, audioCtxRef.current.currentTime);
    if (droneGainRef.current) droneGainRef.current.gain.setValueAtTime(nextMuted ? 0 : 0.15, audioCtxRef.current.currentTime);
  };

  // Start the cinematic pipeline
  const enterTheater = () => {
    setPhase('projector');
    startAudioEngine();

    // After 2.5s, start countdown
    setTimeout(() => {
      setPhase('countdown');
    }, 2500);
  };

  // Countdown timer loop
  useEffect(() => {
    if (phase !== 'countdown') return;

    playBeep();
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 2) {
          clearInterval(interval);
          setPhase('assembly');
          return 2;
        }
        playBeep();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Handle logo assembly -> theatrical reveal
  useEffect(() => {
    if (phase !== 'assembly') return;

    // Line assembly lasts 3.5s
    const timer = setTimeout(() => {
      setPhase('reveal');
      playTheatricalRiser();
    }, 3800);

    return () => clearTimeout(timer);
  }, [phase]);

  // Handle reveal -> looping loop phase
  useEffect(() => {
    if (phase !== 'reveal') return;

    const timer = setTimeout(() => {
      setPhase('loop');
    }, 5000);

    return () => clearTimeout(timer);
  }, [phase]);

  // Volumetric light beam and dust particles canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dust particles array
    const particles = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.2 - 0.15, // float upwards slightly
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw volumetric projection cone from bottom center or top center
      // Let's project from the center top
      const originX = canvas.width / 2;
      const originY = canvas.height * 0.12;

      // Draw glowing light beam source
      ctx.save();
      const flareGrad = ctx.createRadialGradient(originX, originY, 2, originX, originY, 40);
      flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      flareGrad.addColorStop(0.2, 'rgba(190, 91, 59, 0.5)'); // Gold halo
      flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(originX, originY, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Only draw the light cone in assembly, reveal, or loop phase
      if (phase === 'assembly' || phase === 'reveal' || phase === 'loop') {
        ctx.save();
        const beamGrad = ctx.createRadialGradient(
          originX, originY, 10,
          originX, canvas.height * 0.7, canvas.width * 0.6
        );
        beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
        beamGrad.addColorStop(0.3, 'rgba(190, 91, 59, 0.06)'); // gold tint
        beamGrad.addColorStop(0.7, 'rgba(190, 91, 59, 0.015)');
        beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(originX - 10, originY);
        ctx.lineTo(originX + 10, originY);
        // Spread down-left and down-right
        ctx.lineTo(originX + canvas.width * 0.45, canvas.height);
        ctx.lineTo(originX - canvas.width * 0.45, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Draw dust particles floating
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Reset if floats off screen
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;

        // Check if inside light cone to illuminate particle
        const isInsideCone = p.y > originY && Math.abs(p.x - originX) < (p.y - originY) * 0.45;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (isInsideCone && (phase === 'assembly' || phase === 'reveal' || phase === 'loop')) {
          // Glow gold inside projector beam
          ctx.fillStyle = `rgba(190, 91, 59, ${p.alpha * 2})`;
          ctx.shadowColor = '#BE5B3B';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        }
        ctx.fill();
        ctx.restore();
      });

      // Vintage film flicker lines (Only in projector & countdown phase)
      if (phase === 'projector' || phase === 'countdown') {
        if (Math.random() < 0.15) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = Math.random() * 1.5;
          const fxX = Math.random() * canvas.width;
          ctx.beginPath();
          ctx.moveTo(fxX, 0);
          ctx.lineTo(fxX, canvas.height);
          ctx.stroke();
        }
        if (Math.random() < 0.08) {
          // Spot flickers
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  // Cleanup synthesizer audio nodes on unmount
  useEffect(() => {
    return () => {
      if (clickIntervalRef.current) clearInterval(clickIntervalRef.current);
      
      try {
        if (humNodeRef.current) humNodeRef.current.osc.stop();
        if (fanNodeRef.current) fanNodeRef.current.source.stop();
        if (droneOscsRef.current) {
          droneOscsRef.current.forEach(osc => osc.stop());
        }
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch (e) {
        // Ignore audio nodes already stopped
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-neutral-950 z-[100] overflow-hidden flex flex-col items-center justify-center select-none font-sans">
      {/* Background visualizer canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating Header Controls */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[110]">
        <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BE5B3B] animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase">THEATER MODE</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Mute/Unmute */}
          {phase !== 'init' && (
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300 backdrop-blur-md"
              aria-label="Mute sound"
            >
              {muted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
            </button>
          )}

          {/* Close / Skip */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/15 hover:border-[#BE5B3B]/40 transition-all duration-300 backdrop-blur-md"
          >
            <span>Skip Intro</span>
            <HiX size={14} />
          </button>
        </div>
      </div>

      {/* Presentation Switchboard */}
      <div className="z-[105] text-center max-w-lg px-6 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Phase 0: Init Screen (Interaction Required) */}
          {phase === 'init' && (
            <motion.div
              key="init"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-wide mb-3">
                AARA Theater Screen
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm mb-8">
                Welcome to the cinema projection room. Enter the theater to play the logo creation reveal sequence.
              </p>
              <button
                onClick={enterTheater}
                className="px-8 py-3 rounded bg-[#BE5B3B] hover:bg-[#BE5B3B]/90 text-white text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#BE5B3B]/20"
              >
                Enter Theater
              </button>
            </motion.div>
          )}

          {/* Phase 1: Projector warming up */}
          {phase === 'projector' && (
            <motion.div
              key="projector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-xs tracking-[0.4em] text-[#BE5B3B] uppercase font-semibold animate-pulse">
                Warming up Projector...
              </p>
            </motion.div>
          )}

          {/* Phase 2: Circle Countdown */}
          {phase === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="relative w-36 h-36 border-2 border-white/20 rounded-full flex items-center justify-center"
            >
              {/* Reticle lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-white/10" />
                <div className="absolute w-[1px] h-full bg-white/10" />
              </div>
              
              {/* Inner ring */}
              <div className="absolute w-28 h-28 border border-white/15 rounded-full" />

              {/* Number */}
              <motion.span
                key={countdown}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-6xl text-white/80 font-bold relative z-10"
              >
                {countdown}
              </motion.span>
            </motion.div>
          )}

          {/* Phase 3: Logo Drawing Assembly */}
          {phase === 'assembly' && (
            <motion.div
              key="assembly"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Drawing Camera Outline (SVG Draw Animation) */}
              <div className="w-24 h-24 mb-6">
                <svg viewBox="0 0 32 32" className="w-full h-full text-white">
                  {/* Left reel */}
                  <motion.circle
                    cx="9"
                    cy="10"
                    r="3.8"
                    fill="none"
                    stroke="#BE5B3B"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  />
                  {/* Right reel */}
                  <motion.circle
                    cx="17"
                    cy="10"
                    r="3.8"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  {/* Body */}
                  <motion.rect
                    x="7"
                    y="14.5"
                    width="12"
                    height="8.5"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    rx="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  {/* Lens hood */}
                  <motion.path
                    d="M 19,16.5 L 24.5,14.5 V 21 L 19,19 Z"
                    fill="none"
                    stroke="#BE5B3B"
                    strokeWidth="1.8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, delay: 1.2 }}
                  />
                </svg>
              </div>
              <p className="text-[9px] tracking-[0.5em] text-white/40 uppercase font-mono mt-2">
                Assembling optics...
              </p>
            </motion.div>
          )}

          {/* Phase 4 & 5: Cinematic Reveal & Ambient Loop */}
          {(phase === 'reveal' || phase === 'loop') && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center select-none"
            >
              {/* Volumetric glow camera icon */}
              <motion.div
                initial={{ scale: 0.85, filter: 'blur(10px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-20 relative flex items-center justify-center mb-8"
              >
                {/* Projected Glow behind */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#BE5B3B] to-amber-500 rounded-full blur-2xl opacity-20 scale-125 animate-pulse" />
                
                <svg viewBox="0 0 32 32" className="w-full h-full relative z-10 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
                  {/* Reels */}
                  <circle cx="9" cy="10" r="3.8" fill="none" stroke="#BE5B3B" strokeWidth="1.5" />
                  <line x1="9" y1="6.2" x2="9" y2="13.8" stroke="#BE5B3B" strokeWidth="0.8" />
                  <line x1="5.2" y1="10" x2="12.8" y2="10" stroke="#BE5B3B" strokeWidth="0.8" />

                  <circle cx="17" cy="10" r="3.8" fill="none" stroke="white" strokeWidth="1.5" />
                  <line x1="17" y1="6.2" x2="17" y2="13.8" stroke="white" strokeWidth="0.8" />
                  <line x1="13.2" y1="10" x2="20.8" y2="10" stroke="white" strokeWidth="0.8" />

                  {/* Body */}
                  <rect x="7" y="14.5" width="12" height="8.5" fill="none" stroke="white" strokeWidth="1.8" rx="0.5" />

                  {/* Lens */}
                  <path d="M 19,16.5 L 24.5,14.5 V 21 L 19,19 Z" fill="none" stroke="#BE5B3B" strokeWidth="1.8" />
                  <line x1="19" y1="19.5" x2="19" y2="16" stroke="#BE5B3B" strokeWidth="1.8" />
                </svg>
              </motion.div>

              {/* Title typography with light sweep */}
              <div className="flex flex-col items-center">
                <motion.h1
                  initial={{ letterSpacing: '0.1em', opacity: 0 }}
                  animate={{ letterSpacing: '0.35em', opacity: 1 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl md:text-6xl text-white font-bold leading-none select-none tracking-[0.35em] pl-[0.35em]"
                >
                  AARA
                </motion.h1>

                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="text-xs md:text-sm font-semibold tracking-[0.45em] text-[#BE5B3B] uppercase mt-4 select-none pl-[0.45em]"
                >
                  MEDIA MISSION
                </motion.span>
              </div>

              {/* Loop screen subtext */}
              {phase === 'loop' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-12"
                >
                  Projecting loop mode • Playback running
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Screen Aspect Ratio Mask lines */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-black/40 border-b border-white/5 backdrop-blur-sm pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/40 border-t border-white/5 backdrop-blur-sm pointer-events-none" />
    </div>
  );
}
