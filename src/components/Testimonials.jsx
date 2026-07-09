import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const reviews = [
  {
    quote: "AARA Media Mission captured the essence of our brand with cinematic quality that exceeded all expectations. Their eye for detail, composition, and post-production color grading is world-class.",
    author: "Rajesh Kannan",
    role: "Brand Director, Nike India"
  },
  {
    quote: "Working with Nishan and his crew on our independent feature in Pollachi was an absolute breeze. They handled complex multi-cam setups and night schedules with exceptional creative control.",
    author: "Sarah Jenkins",
    role: "Line Producer, Netflix Originals"
  },
  {
    quote: "The music video they directed and colored for our leading artist received massive praise for its aesthetic storytelling and visual poetry. They are artists first and foremost.",
    author: "Vikram Malhotra",
    role: "Head of A&R, Sony Music South"
  }
];

const logos = [
  { name: 'Netflix', text: 'NETFLIX' },
  { name: 'Nike', text: 'NIKE' },
  { name: 'Sony Music', text: 'SONY MUSIC' },
  { name: 'Vogue', text: 'VOGUE' },
  { name: 'Warner Bros', text: 'WARNER BROS' }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-cream-dark/30 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">Testimonials</span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal font-bold tracking-tight mt-2">
            Client Voices
          </h2>
        </div>

        {/* Carousel Slider */}
        <div className="relative w-full min-h-[250px] md:min-h-[200px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center max-w-3xl flex flex-col items-center gap-6"
            >
              {/* Quote Mark */}
              <span className="font-serif text-gold text-7xl leading-none">“</span>
              
              {/* Review Text */}
              <p className="font-serif text-lg md:text-2xl text-charcoal-light leading-relaxed font-medium">
                {reviews[activeIndex].quote}
              </p>

              {/* Review Author */}
              <div className="mt-4">
                <span className="font-sans text-sm font-bold text-charcoal">
                  {reviews[activeIndex].author}
                </span>
                <span className="block text-[10px] tracking-widest text-gold uppercase font-semibold mt-1">
                  {reviews[activeIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-gold transition-colors p-2 hidden md:block"
            aria-label="Previous review"
          >
            <HiChevronLeft size={32} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-gold transition-colors p-2 hidden md:block"
            aria-label="Next review"
          >
            <HiChevronRight size={32} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex gap-2.5 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'bg-gold w-6' : 'bg-charcoal/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Logo Banner Grid */}
        <div className="w-full mt-24 border-t border-charcoal/5 pt-16">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center justify-items-center opacity-40 hover:opacity-60 transition-opacity duration-300">
            {logos.map((logo, index) => (
              <span
                key={index}
                className="font-serif text-sm md:text-base font-semibold tracking-[0.3em] text-charcoal"
              >
                {logo.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
