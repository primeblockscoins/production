import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPlay, HiPause, HiLightningBolt, HiCheck, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

export default function ServiceDetailsModal({ serviceId, onClose }) {
  const [activeTab, setActiveTab] = useState('script'); // script, camera, direction, editing, color, sound

  useEffect(() => {
    if (serviceId) {
      setActiveTab(serviceId);
    }
  }, [serviceId]);

  const departments = [
    { id: 'script', name: 'Script & Storyboard' },
    { id: 'camera', name: 'Camera & Lighting' },
    { id: 'direction', name: 'Directing & Blocking' },
    { id: 'editing', name: 'Timeline Editorial' },
    { id: 'color', name: 'Color Workbench' },
    { id: 'sound', name: 'Sound & Foley Mixer' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-cream/90 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="bg-white border border-charcoal/10 w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden flex flex-col my-8 h-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-cream-dark/30 px-6 py-4 border-b border-charcoal/5">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-charcoal-light uppercase font-bold">
              Cinema Production Drafts // Blueprint Interface
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-charcoal-light/60 hover:text-charcoal transition-colors p-1 bg-white border border-charcoal/10 rounded-full cursor-pointer shadow-sm"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-charcoal/5 bg-cream-dark/10 p-2 gap-1 overflow-x-auto">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveTab(dept.id)}
              className={`px-4 py-2 text-[10px] md:text-xs font-semibold uppercase tracking-widest rounded-md cursor-pointer transition-all duration-300 ${
                activeTab === dept.id
                  ? 'bg-gold text-white shadow-md'
                  : 'text-charcoal-light/70 hover:text-charcoal hover:bg-cream-dark/20'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="flex-grow p-6 overflow-y-auto min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'script' && <ScriptPanel />}
              {activeTab === 'camera' && <CameraPanel />}
              {activeTab === 'direction' && <DirectionPanel />}
              {activeTab === 'editing' && <EditingPanel />}
              {activeTab === 'color' && <ColorPanel />}
              {activeTab === 'sound' && <SoundPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ==========================================================================
   1. SCRIPT & STORYBOARD PANEL
   ========================================================================== */
function ScriptPanel() {
  const [scriptText, setScriptText] = useState(
    `EXT. POLLACHI HILLS - SUNRISE\n\nRolling green tea estates emerge from a blanket of morning fog. The air is still, almost holy.\n\nJAKOB (V.O.)\nSome say the earth speaks in whispers.\n\nHe stands near a narrow track, adjusting a camera.\n\nJAKOB (CONT'D)\nBut out here, it screams in silence.\n\nSuddenly, A RUSTLE in the tea leaves. He turns sharply.`
  );
  const [boardIndex, setBoardIndex] = useState(0);

  const storyboards = [
    {
      shot: '01',
      framing: 'EXTREME WIDE SHOT (EWS)',
      lens: '35mm Anamorphic',
      lighting: 'Natural Sunrise Golden Hour',
      description: 'Establish the vast green hills of Pollachi. Fog drifting low between valley corridors. Model is a tiny silhouette on the ridge.',
      visualNotes: 'Keep contrast soft. Allow lens flare to sweep horizontally from the right frame edge.'
    },
    {
      shot: '02',
      framing: 'MEDIUM CLOSE UP (MCU)',
      lens: '85mm Prime T1.5',
      lighting: 'Golden key, gold reflector side fill',
      description: 'Tight face profile of the model as they look toward the horizon. Eye caught in focus, back ground tea fields blurred to butter bokeh.',
      visualNotes: 'Aperture set to T1.8. Eye autofocus active. Soft fill catching the left jawline.'
    },
    {
      shot: '03',
      framing: 'DYNAMIC TRACKING PAN',
      lens: '50mm Anamorphic',
      lighting: 'Rim backlight, ambient fog scatter',
      description: 'Camera moves horizontally tracking the model walking past old moss-covered trees. Backlight wraps around clothing edges.',
      visualNotes: 'Gimbal mount active. Walk pace matched to track rate. Verify shadow highlights do not clip.'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Script Screenplay drafting */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="font-serif text-lg font-bold text-charcoal">screenplay treatment editor</h4>
          <span className="text-[9px] font-mono tracking-widest text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">FORMAT: Standard Screenplay</span>
        </div>
        <textarea
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          className="w-full h-80 font-mono text-xs md:text-sm p-6 bg-cream border border-charcoal/10 rounded focus:outline-none focus:border-gold resize-none leading-relaxed shadow-inner"
        />
        <p className="text-[10px] text-charcoal-light/60 font-sans italic">
          * This is an active screenplay draft. You can edit the text blocks above to adjust formatting spacing in real-time.
        </p>
      </div>

      {/* Storyboard Deck */}
      <div className="lg:col-span-5 flex flex-col gap-4 border-l border-charcoal/5 pl-0 lg:pl-8">
        <h4 className="font-serif text-lg font-bold text-charcoal">Visual Storyboard Treatment</h4>
        
        {/* Storyboard Card */}
        <div className="bg-cream-dark/15 p-5 rounded border border-charcoal/5 flex flex-col justify-between flex-grow min-h-[300px]">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-charcoal/10 pb-2">
              <span className="text-[9px] font-mono tracking-widest text-gold uppercase font-bold">Shot #{storyboards[boardIndex].shot}</span>
              <span className="text-[10px] font-mono text-charcoal-light/60">{storyboards[boardIndex].lens}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Framing</span>
              <span className="text-sm font-serif font-bold text-charcoal">{storyboards[boardIndex].framing}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Description</span>
              <p className="text-xs text-charcoal-light/80 leading-relaxed font-sans">{storyboards[boardIndex].description}</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Composition Notes</span>
              <p className="text-xs text-charcoal-light/80 leading-relaxed font-sans italic border-l border-gold/45 pl-3">{storyboards[boardIndex].visualNotes}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-3 border-t border-charcoal/15">
            <span className="text-[10px] text-charcoal-light/50 font-mono">LIGHTING: {storyboards[boardIndex].lighting}</span>
            <div className="flex gap-1.5">
              {storyboards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setBoardIndex(idx)}
                  className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold border transition-colors cursor-pointer ${
                    boardIndex === idx ? 'bg-gold border-gold text-white' : 'bg-white border-charcoal/10 text-charcoal-light hover:bg-neutral-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. CAMERA & LIGHTING PANEL
   ========================================================================== */
function CameraPanel() {
  const [lights, setLights] = useState({
    keyLight: true,
    fillLight: true,
    backLight: true,
    rimLight: false
  });

  const toggleLight = (light) => {
    setLights((prev) => ({ ...prev, [light]: !prev[light] }));
  };

  const cameraLog = [
    { roll: 'A001', scene: '14', take: '01', lens: '35mm Anamorphic', f: 'T2.0', filter: 'ND 0.6', iso: '800', notes: 'Fog thick. Flare checked.' },
    { roll: 'A001', scene: '14', take: '02', lens: '35mm Anamorphic', f: 'T1.8', filter: 'ND 0.6', iso: '800', notes: 'Excellent rim glow. Model paced well.' },
    { roll: 'A002', scene: '15', take: '01', lens: '85mm Prime T1.5', f: 'T1.5', filter: 'None', iso: '400', notes: 'Focus pull spot on eye track.' },
    { roll: 'A002', scene: '15', take: '02', lens: '85mm Prime T1.5', f: 'T1.8', filter: 'ND 0.3', iso: '400', notes: 'Secondary setup. Backlight adjusted.' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left side: Interactive Lighting schematic grid */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <h4 className="font-serif text-lg font-bold text-charcoal">Lighting Schematic Blueprint</h4>
        
        {/* Set Floor grid Map */}
        <div className="relative w-full aspect-square max-w-[320px] mx-auto bg-neutral-900 border border-neutral-800 rounded p-4 flex flex-col justify-between overflow-hidden shadow-lg select-none">
          {/* Grid background lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.05] pointer-events-none divide-x divide-white divide-y" />

          {/* Key Light Beam */}
          {lights.keyLight && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              className="absolute w-40 h-40 bg-gold rounded-full blur-2xl top-[10%] left-[-10%]"
            />
          )}

          {/* Fill Light Beam */}
          {lights.fillLight && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              className="absolute w-40 h-40 bg-neutral-200 rounded-full blur-2xl top-[20%] right-[-15%]"
            />
          )}

          {/* Rim/Back Light Beam */}
          {lights.backLight && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              className="absolute w-24 h-40 bg-gold-light rounded-full blur-2xl top-[-20%] left-1/3 rotate-[45deg]"
            />
          )}

          {/* Stage items nodes */}
          <div className="w-full flex justify-between items-center">
            {/* Top Back light */}
            <div className="w-full flex justify-center mt-2">
              <button 
                onClick={() => toggleLight('backLight')}
                className={`flex flex-col items-center gap-0.5 p-1 rounded border transition-all cursor-pointer ${
                  lights.backLight ? 'bg-gold text-white border-gold' : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                }`}
              >
                <HiLightningBolt size={10} />
                <span className="text-[6px] tracking-widest font-mono uppercase font-bold">Back</span>
              </button>
            </div>
          </div>

          <div className="w-full flex justify-between items-center px-4">
            {/* Key Light Left */}
            <button 
              onClick={() => toggleLight('keyLight')}
              className={`flex flex-col items-center gap-0.5 p-1 rounded border transition-all cursor-pointer ${
                lights.keyLight ? 'bg-gold text-white border-gold' : 'bg-neutral-800 border-neutral-700 text-neutral-400'
              }`}
            >
              <HiLightningBolt size={10} />
              <span className="text-[6px] tracking-widest font-mono uppercase font-bold">Key L</span>
            </button>

            {/* Subject Node in Center */}
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-black/40 text-cream relative z-10">
              <span className="text-[8px] font-mono font-bold tracking-wider text-gold-light">SUBJ</span>
              {/* Highlight glows based on lights */}
              <div className={`absolute inset-0.5 border border-dashed rounded-full animate-spin ${
                lights.keyLight ? 'border-gold' : 'border-neutral-700'
              }`} />
            </div>

            {/* Fill Light Right */}
            <button 
              onClick={() => toggleLight('fillLight')}
              className={`flex flex-col items-center gap-0.5 p-1 rounded border transition-all cursor-pointer ${
                lights.fillLight ? 'bg-gold text-white border-gold' : 'bg-neutral-800 border-neutral-700 text-neutral-400'
              }`}
            >
              <HiLightningBolt size={10} />
              <span className="text-[6px] tracking-widest font-mono uppercase font-bold">Fill L</span>
            </button>
          </div>

          <div className="w-full flex flex-col items-center gap-3">
            {/* Camera Node Bottom */}
            <div className="w-10 h-10 rounded border border-neutral-700 bg-neutral-950 flex flex-col justify-center items-center text-[7px] font-mono font-bold tracking-wider text-neutral-400">
              <span>CAM_A</span>
              <span className="text-[6px] text-gold font-normal">T2.0</span>
            </div>
            
            <p className="text-[8px] text-center text-neutral-500 font-mono tracking-widest">
              TAP STRIKE NODES TO ACTIVATE OR DEACTIVATE LIGHTS
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Camera Logs table */}
      <div className="lg:col-span-7 flex flex-col gap-4 border-l border-charcoal/5 pl-0 lg:pl-8">
        <h4 className="font-serif text-lg font-bold text-charcoal">Director Camera log sheet</h4>
        
        <div className="overflow-x-auto w-full border border-charcoal/10 rounded-sm">
          <table className="min-w-full divide-y divide-charcoal/10 font-mono text-[10px] md:text-xs text-charcoal">
            <thead className="bg-cream-dark/20 text-neutral-500 font-bold uppercase tracking-wider text-left">
              <tr>
                <th className="px-3 py-2">Roll</th>
                <th className="px-3 py-2">Sc</th>
                <th className="px-3 py-2">Tk</th>
                <th className="px-3 py-2">Lens</th>
                <th className="px-3 py-2">Aperture</th>
                <th className="px-3 py-2">ISO</th>
                <th className="px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5 bg-white font-medium">
              {cameraLog.map((log, idx) => (
                <tr key={idx} className="hover:bg-cream-dark/10 transition-colors">
                  <td className="px-3 py-2 font-bold text-gold">{log.roll}</td>
                  <td className="px-3 py-2">{log.scene}</td>
                  <td className="px-3 py-2">{log.take}</td>
                  <td className="px-3 py-2 text-charcoal/70">{log.lens}</td>
                  <td className="px-3 py-2">{log.f}</td>
                  <td className="px-3 py-2 text-neutral-400">{log.iso}</td>
                  <td className="px-3 py-2 text-charcoal-light/80 italic font-sans text-[11px]">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-[10px] text-charcoal-light/60 font-sans mt-2">
          * Standard log records sent directly from the camera assistant monitor to the DIT (Digital Imaging Technician) desk for grading overlays.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. DIRECTING & BLOCKING PANEL
   ========================================================================== */
function DirectionPanel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [actorX, setActorX] = useState(15);
  const [actorY, setActorY] = useState(25);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActorX((prev) => {
          if (prev >= 65) {
            setIsPlaying(false);
            return 65;
          }
          return prev + 1.5;
        });
        setActorY((prev) => {
          if (prev >= 65) return 65;
          return prev + 1.2;
        });
      }, 50);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setActorX(15);
    setActorY(25);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left side: Blocking Visual Simulator */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="font-serif text-lg font-bold text-charcoal">Actor Blocking Map</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[9px] font-mono tracking-widest font-semibold uppercase bg-gold text-white px-2 py-1 rounded shadow-sm cursor-pointer hover:bg-gold-dark"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={handleReset}
              className="text-[9px] font-mono tracking-widest font-semibold uppercase bg-neutral-200 text-charcoal-light px-2 py-1 rounded shadow-sm cursor-pointer hover:bg-neutral-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Blocking grid space */}
        <div className="relative w-full aspect-square max-w-[320px] mx-auto bg-neutral-900 border border-neutral-800 rounded p-4 flex flex-col justify-between overflow-hidden shadow-lg select-none">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.05] pointer-events-none divide-x divide-white divide-y" />

          {/* Actor Start Node marker */}
          <div className="absolute left-[15%] top-[25%] w-3 h-3 rounded-full bg-neutral-600 border border-dashed border-white/50 -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute left-[17%] top-[20%] text-[8px] font-mono text-neutral-500">START</span>

          {/* Actor Target Path line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-gold/25 stroke-dasharray-[4]">
            <line x1="15%" y1="25%" x2="65%" y2="65%" strokeWidth="1.5" strokeDasharray="4" />
          </svg>

          {/* Actor Target Node marker */}
          <div className="absolute left-[65%] top-[65%] w-3 h-3 rounded-full bg-gold/30 border border-gold/80 -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute left-[68%] top-[62%] text-[8px] font-mono text-gold-light">TARGET</span>

          {/* Animated Actor Dot */}
          <div
            style={{ left: `${actorX}%`, top: `${actorY}%` }}
            className="absolute w-5 h-5 rounded-full bg-gold border border-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-lg z-10"
          >
            <span className="text-[7px] font-mono font-bold text-white">ACT_1</span>
          </div>

          {/* Camera path line */}
          <div className="absolute bottom-4 left-1/4 right-1/4 border-t border-dashed border-emerald-500/30 flex justify-center">
            <span className="text-[6px] font-mono text-emerald-500 uppercase tracking-widest mt-1">CAMERA TRACK PANNING</span>
          </div>
        </div>
      </div>

      {/* Right side: Director Blocking notes */}
      <div className="lg:col-span-7 flex flex-col gap-4 border-l border-charcoal/5 pl-0 lg:pl-8">
        <h4 className="font-serif text-lg font-bold text-charcoal">Director Blocking & Scene Blocks</h4>
        
        <div className="flex flex-col gap-4 text-xs md:text-sm text-charcoal-light leading-relaxed font-sans">
          <div className="border-l-2 border-gold pl-4 py-1">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal">Movement Log // Scene 14</h5>
            <p className="text-xs text-charcoal-light/80 mt-1">
              "Actor 1 stands near the hill track. As the dialog (V.O.) triggers, they walk diagonally toward the camera path. Speed is slow, deliberate. Allow fog to swallow their silhouette near the target node."
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 pl-4 py-1">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal">Subtext Notes</h5>
            <p className="text-xs text-charcoal-light/80 mt-1">
              "The movement represents isolation. The camera pans away at a steady rate. Maintain focus on the background leaves after Actor 1 walks out of frame."
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 pl-4 py-1">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal">Focus Directives</h5>
            <p className="text-xs text-charcoal-light/80 mt-1">
              "Focus starts locked on the actor, then shifts smoothly (rack focus) to the drifting leaf corridor on the right. Pull rate must be 2 seconds."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. TIMELINE EDITORIAL PANEL
   ========================================================================== */
function EditingPanel() {
  const [selectedClip, setSelectedClip] = useState(null);
  const [playhead, setPlayhead] = useState(40); // playhead percentage

  const tracks = {
    video: [
      { id: 'v1', name: 'A001_C002_HILL_WS', type: 'video', start: 5, width: 45, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40', duration: '03:12', codec: 'ProRes 4444 XQ', frames: '24fps' },
      { id: 'v2', name: 'A002_C014_ACT_MCU', type: 'video', start: 50, width: 45, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40', duration: '02:08', codec: 'ProRes 4444 XQ', frames: '24fps' }
    ],
    audio: [
      { id: 'a1', name: 'DIALOGUE_ACT1_MIX', type: 'audio', start: 5, width: 90, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', duration: '05:20', rate: '48kHz 24-bit', format: 'WAV' },
      { id: 'a2', name: 'FOLEY_DRY_WIND', type: 'audio', start: 5, width: 45, color: 'bg-teal-500/20 text-teal-400 border-teal-500/40', duration: '03:12', rate: '48kHz 24-bit', format: 'WAV' },
      { id: 'a3', name: 'MUSIC_CELLO_THEME', type: 'audio', start: 40, width: 55, color: 'bg-amber-500/20 text-amber-400 border-amber-500/40', duration: '04:10', rate: '48kHz 24-bit', format: 'WAV' }
    ]
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    setPlayhead((clickX / width) * 100);
  };

  const getTimecode = (pct) => {
    const totalFrames = (pct / 100) * 1800; // 75 seconds * 24fps = 1800 frames
    const minutes = Math.floor(totalFrames / 1440);
    const seconds = Math.floor((totalFrames % 1440) / 24);
    const frames = Math.floor(totalFrames % 24);

    const pad = (num) => String(num).padStart(2, '0');
    return `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left side: Timeline tracks */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h4 className="font-serif text-lg font-bold text-charcoal">Simulated Editing Workspace</h4>
          <span className="font-mono text-sm font-semibold text-gold tracking-widest">{getTimecode(playhead)}</span>
        </div>

        {/* Timeline area */}
        <div 
          onClick={handleTimelineClick}
          className="relative w-full bg-neutral-950 rounded border border-neutral-800 p-4 h-64 flex flex-col justify-between cursor-pointer select-none group/timeline"
        >
          {/* Vertical Playhead line */}
          <div 
            style={{ left: `calc(${playhead}% + 16px)` }}
            className="absolute top-2 bottom-2 w-[1px] bg-red-500 pointer-events-none z-30"
          >
            <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 bg-red-500 rotate-[45deg]" />
          </div>

          <div className="flex flex-col gap-3.5 relative z-10">
            {/* Video Tracks group */}
            <div className="flex flex-col gap-2">
              <div className="text-[7px] font-mono tracking-widest text-neutral-600 font-bold uppercase">VIDEO TRACK V1</div>
              <div className="relative h-10 w-full bg-neutral-900 border border-neutral-800/50 rounded-sm">
                {tracks.video.map((clip) => (
                  <div
                    key={clip.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClip(clip);
                    }}
                    style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
                    className={`absolute inset-y-1 rounded border text-[9px] font-mono px-3 flex items-center justify-between cursor-pointer transition-all ${clip.color} ${
                      selectedClip?.id === clip.id ? 'ring-2 ring-gold/60 border-gold shadow' : ''
                    }`}
                  >
                    <span className="truncate pr-2">{clip.name}</span>
                    <span className="text-[7px] text-white/50">{clip.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Tracks group */}
            <div className="flex flex-col gap-2">
              <div className="text-[7px] font-mono tracking-widest text-neutral-600 font-bold uppercase">AUDIO TRACKS A1-A3</div>
              <div className="flex flex-col gap-2">
                {tracks.audio.map((clip) => (
                  <div 
                    key={clip.id} 
                    className="relative h-8 w-full bg-neutral-900 border border-neutral-800/50 rounded-sm"
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClip(clip);
                      }}
                      style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
                      className={`absolute inset-y-1 rounded border text-[8px] font-mono px-2.5 flex items-center justify-between cursor-pointer transition-all ${clip.color} ${
                        selectedClip?.id === clip.id ? 'ring-2 ring-gold/60 border-gold shadow' : ''
                      }`}
                    >
                      <span className="truncate pr-2">{clip.name}</span>
                      <span className="text-[7px] text-white/40">{clip.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[7px] font-mono tracking-widest text-neutral-600 flex justify-between border-t border-neutral-900 pt-2 pointer-events-none mt-2">
            <span>00:00:00:00</span>
            <span>00:00:20:00</span>
            <span>00:00:40:00</span>
            <span>00:01:00:00</span>
          </div>
        </div>
      </div>

      {/* Right side: Selected Clip Metadata details */}
      <div className="lg:col-span-4 flex flex-col gap-4 border-l border-charcoal/5 pl-0 lg:pl-8">
        <h4 className="font-serif text-lg font-bold text-charcoal">Inspector Metadata Panel</h4>
        
        {selectedClip ? (
          <div className="bg-cream-dark/15 p-5 rounded border border-charcoal/5 flex flex-col gap-4 flex-grow">
            <div className="flex flex-col gap-1 border-b border-charcoal/10 pb-2">
              <span className="text-[9px] font-mono tracking-widest text-gold uppercase font-bold">Name</span>
              <span className="text-xs font-mono font-bold text-charcoal truncate">{selectedClip.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider">Duration</span>
                <span className="text-xs font-mono font-semibold text-charcoal">{selectedClip.duration}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider">Type</span>
                <span className="text-xs font-mono font-semibold text-charcoal uppercase">{selectedClip.type}</span>
              </div>
            </div>

            {selectedClip.type === 'video' ? (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider">Codec Format</span>
                  <span className="text-xs font-mono text-charcoal-light">{selectedClip.codec}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider">Framerate</span>
                  <span className="text-xs font-mono text-charcoal-light">{selectedClip.frames}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider">Sample Rate</span>
                  <span className="text-xs font-mono text-charcoal-light">{selectedClip.rate}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider">Format</span>
                  <span className="text-xs font-mono text-charcoal-light">{selectedClip.format}</span>
                </div>
              </>
            )}

            <p className="text-[9px] text-charcoal-light/50 font-sans italic border-t border-charcoal/5 pt-3 mt-auto">
              * Click timeline blocks to inspect their codec, frame ranges, and audio specifications in detail.
            </p>
          </div>
        ) : (
          <div className="bg-cream-dark/15 p-8 rounded border border-dashed border-charcoal/20 flex flex-col justify-center items-center text-center gap-2 flex-grow">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">Inspector Idle</span>
            <p className="text-xs text-charcoal-light/60 font-sans">
              Tap any clip block on the timeline layout to activate the metadata details dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   5. COLOR WORKBENCH PANEL
   ========================================================================== */
function ColorPanel() {
  const [selectedLUT, setSelectedLUT] = useState('Pollachi Sunset');
  const [wheels, setWheels] = useState({
    lift: { x: 0, y: 0 },
    gamma: { x: 0, y: 0 },
    gain: { x: 0, y: 0 }
  });

  const lutPresets = {
    'Pollachi Sunset': { lift: { x: 5, y: -2 }, gamma: { x: 2, y: 2 }, gain: { x: -4, y: 6 }, thumbColor: 'sepia-[0.35] hue-rotate-[15deg] contrast-[1.08]' },
    'Cinema Teal & Orange': { lift: { x: -6, y: -4 }, gamma: { x: 0, y: 1 }, gain: { x: 8, y: 4 }, thumbColor: 'saturate-[1.12] contrast-[1.12] hue-rotate-[-8deg] brightness-[0.98]' },
    'Noir / Low Contrast': { lift: { x: 0, y: 0 }, gamma: { x: 0, y: -2 }, gain: { x: 0, y: -10 }, thumbColor: 'grayscale contrast-[1.15] brightness-[0.92]' },
    'Natural Grade': { lift: { x: 0, y: 0 }, gamma: { x: 0, y: 0 }, gain: { x: 0, y: 0 }, thumbColor: '' }
  };

  const handlePresetSelect = (lut) => {
    setSelectedLUT(lut);
    setWheels({
      lift: lutPresets[lut].lift,
      gamma: lutPresets[lut].gamma,
      gain: lutPresets[lut].gain
    });
  };

  const handleWheelClick = (e, wheelName) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2;
    
    // Scale coordinate offsets (max range 12px)
    const factor = rect.width / 2;
    const x = Math.min(Math.max((clickX / factor) * 12, -12), 12);
    const y = Math.min(Math.max((clickY / factor) * 12, -12), 12);

    setWheels((prev) => ({
      ...prev,
      [wheelName]: { x: Math.round(x), y: Math.round(y) }
    }));
    setSelectedLUT('Custom Setup');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left side: color wheels & scopes */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <h4 className="font-serif text-lg font-bold text-charcoal">Resolve Grading Wheels</h4>
        
        {/* Color Wheels group */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {['lift', 'gamma', 'gain'].map((wheel) => (
            <div key={wheel} className="flex flex-col items-center gap-3">
              <span className="text-[10px] tracking-widest font-mono uppercase text-charcoal font-bold">{wheel}</span>
              
              {/* Color Ring circle */}
              <div
                onClick={(e) => handleWheelClick(e, wheel)}
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-neutral-300 shadow-inner flex items-center justify-center cursor-pointer select-none bg-[radial-gradient(circle,_transparent_30%,_#faf9f6_85%),_conic-gradient(from_0deg,_#ff5733,_#ffc300,_#daf7a6,_#33ff57,_#33ffda,_#3357ff,_#c70039,_#ff5733)]"
              >
                {/* Center crosshair */}
                <div className="absolute w-[2px] h-[10px] bg-charcoal/20 pointer-events-none" />
                <div className="absolute h-[2px] w-[10px] bg-charcoal/20 pointer-events-none" />

                {/* Draggable indicator pin */}
                <div 
                  style={{
                    transform: `translate(${wheels[wheel].x * 3.5}px, ${wheels[wheel].y * 3.5}px)`
                  }}
                  className="absolute w-3.5 h-3.5 rounded-full bg-white border border-gold shadow flex items-center justify-center pointer-events-none transition-transform duration-200"
                >
                  <div className="w-1 h-1 bg-gold rounded-full" />
                </div>
              </div>

              {/* Offset coordinates */}
              <span className="text-[8px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                X: {wheels[wheel].x} // Y: {wheels[wheel].y}
              </span>
            </div>
          ))}
        </div>

        {/* Preset LUT tables list */}
        <div className="flex flex-col gap-2">
          <span className="text-[9px] tracking-widest font-mono uppercase text-neutral-500">LUT Preset Selection</span>
          <div className="flex flex-wrap gap-2">
            {Object.keys(lutPresets).map((lut) => (
              <button
                key={lut}
                onClick={() => handlePresetSelect(lut)}
                className={`px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider rounded border cursor-pointer transition-colors duration-200 ${
                  selectedLUT === lut
                    ? 'bg-gold border-gold text-white shadow-sm'
                    : 'bg-white border-charcoal/10 text-charcoal-light hover:bg-neutral-100'
                }`}
              >
                {lut}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Grading preview frame */}
      <div className="lg:col-span-4 flex flex-col gap-4 border-l border-charcoal/5 pl-0 lg:pl-8">
        <h4 className="font-serif text-lg font-bold text-charcoal">Monitor Preview Render</h4>
        
        {/* Mock Monitor Still */}
        <div className="w-full aspect-video bg-neutral-900 border border-charcoal/10 rounded overflow-hidden shadow-md relative">
          <div 
            className={`w-full h-full bg-cover bg-center transition-all duration-300 ${
              selectedLUT === 'Custom Setup' ? 'saturate-[1.05] contrast-[1.05]' : lutPresets[selectedLUT === 'Custom Setup' ? 'Natural Grade' : selectedLUT]?.thumbColor
            }`}
            style={{ backgroundImage: `url('/portfolio_feature.png')` }}
          />

          <span className="absolute bottom-2 left-2 text-[7px] font-mono tracking-widest uppercase bg-black/50 text-white border border-white/10 px-1.5 py-0.5 rounded">
            LUT: {selectedLUT.toUpperCase()}
          </span>
        </div>

        <p className="text-[10px] text-charcoal-light/60 font-sans mt-2">
          * Interactive color wheels modify coordinates. Tap inside wheels to simulate pixel tint operations, or select LUT tables.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. SOUND MIXER PANEL
   ========================================================================== */
function SoundPanel() {
  const [faders, setFaders] = useState({
    dialog: 80,
    foley: 60,
    ambience: 75,
    music: 50,
    master: 85
  });
  const [muted, setMuted] = useState({
    dialog: false,
    foley: false,
    ambience: false,
    music: false,
    master: false
  });
  const [isPlaying, setIsPlaying] = useState(true);
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Soundwave canvas visualizer simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    let offset = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Calculate overall volume level
      const effectiveVol = isPlaying && !muted.master
        ? (faders.master / 100) * 45 // max height scaling
        : 0;

      ctx.strokeStyle = '#BE5B3B'; // gold color
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();

      // Draw horizontal wave
      for (let x = 0; x < width; x++) {
        // Compose multiple sine frequencies
        const rawY = Math.sin(x * 0.02 + offset) * 0.45 + 
                     Math.sin(x * 0.05 - offset * 1.5) * 0.25 + 
                     Math.sin(x * 0.01 + offset * 0.5) * 0.3;
                     
        const y = height / 2 + rawY * effectiveVol;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      offset += 0.08;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, faders.master, muted.master]);

  const handleFaderChange = (e, name) => {
    setFaders((prev) => ({ ...prev, [name]: parseInt(e.target.value) }));
  };

  const toggleMute = (name) => {
    setMuted((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left side: Soundwave canvas visualizer */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="font-serif text-lg font-bold text-charcoal">Soundwave Visualizer</h4>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[9px] font-mono tracking-widest font-semibold uppercase bg-gold text-white px-2 py-1 rounded cursor-pointer hover:bg-gold-dark shadow-sm"
          >
            {isPlaying ? 'Pause Wave' : 'Resume Wave'}
          </button>
        </div>

        {/* Pulse Visualizer Canvas box */}
        <div className="w-full bg-neutral-950 border border-neutral-900 rounded p-4 h-48 flex items-center justify-center shadow-lg relative overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <span className="absolute bottom-2 left-2 text-[7px] font-mono tracking-widest text-neutral-600 uppercase font-bold">Foley Channel Peak Scope</span>
        </div>

        {/* Audio preset cues */}
        <div className="flex flex-col gap-2">
          <span className="text-[9px] tracking-widest font-mono uppercase text-neutral-500">Audio Licensing slate</span>
          <div className="bg-cream-dark/15 p-3.5 rounded border border-charcoal/5 flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between">
              <span className="font-semibold text-charcoal">Main Track:</span>
              <span className="font-mono text-gold font-bold">CELLO_ECHOES_AARA.wav</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Copyright status:</span>
              <span className="text-emerald-600 uppercase font-mono font-bold text-[10px]">Licensed / Cleared</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Audio faders console */}
      <div className="lg:col-span-7 flex flex-col gap-4 border-l border-charcoal/5 pl-0 lg:pl-8">
        <h4 className="font-serif text-lg font-bold text-charcoal">Channel Mixing Console</h4>
        
        {/* Mixing board sliders list */}
        <div className="flex flex-col gap-4">
          {['dialog', 'foley', 'ambience', 'music', 'master'].map((fader) => {
            const val = faders[fader];
            const isMuted = muted[fader];

            return (
              <div key={fader} className="flex items-center justify-between gap-4">
                {/* Channel Label */}
                <div className="w-20 font-mono text-[10px] md:text-xs uppercase text-charcoal font-bold flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${fader === 'master' ? 'bg-gold' : 'bg-neutral-400'}`} />
                  {fader}
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : val}
                  disabled={isMuted}
                  onChange={(e) => handleFaderChange(e, fader)}
                  className="flex-grow accent-gold h-1 bg-neutral-200 rounded-lg cursor-pointer"
                />

                {/* Value index */}
                <span className="w-8 font-mono text-[9px] text-neutral-400 bg-neutral-100 text-center py-0.5 rounded">
                  {isMuted ? 'MUTE' : `${val}%`}
                </span>

                {/* Mute Button */}
                <button
                  onClick={() => toggleMute(fader)}
                  className={`w-6 h-6 rounded flex items-center justify-center border transition-colors cursor-pointer ${
                    isMuted ? 'bg-red-500 border-red-500 text-white' : 'bg-white border-charcoal/10 text-charcoal-light hover:bg-neutral-100'
                  }`}
                >
                  <HiVolumeOff size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
