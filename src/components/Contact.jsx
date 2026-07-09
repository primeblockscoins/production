import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaVimeoV } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Feature Film',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit logic
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', projectType: 'Feature Film', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">Collaboration</span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal font-bold tracking-tight mt-2">
            Start a Production
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-charcoal-light/70 font-sans mt-4">
            Have a story waiting to be told? Reach out to schedule a pre-production consult or book our production team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Studio Details - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Info Items */}
            <div className="flex flex-col gap-6">
              <h3 className="font-serif text-2xl font-semibold text-charcoal tracking-tight">Studio Offices</h3>

              <div className="flex items-start gap-4">
                <div className="text-gold p-1 mt-0.5"><FiMapPin size={18} /></div>
                <div>
                  <h4 className="text-xs tracking-wider uppercase font-semibold text-charcoal">Locations</h4>
                  <p className="text-sm text-charcoal-light/80 mt-1 font-sans">
                    Chennai • Pollachi • Bangalore
                  </p>
                  <p className="text-[11px] text-charcoal-light/60 mt-0.5 font-sans">
                    Primary: 42 Cinema Lane, Anna Nagar, Chennai - 600040
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-gold p-1 mt-0.5"><FiMail size={18} /></div>
                <div>
                  <h4 className="text-xs tracking-wider uppercase font-semibold text-charcoal">Inquiries</h4>
                  <a href="mailto:info@aaramediamission.com" className="text-sm text-charcoal-light/80 hover:text-gold transition-colors font-sans mt-1 block">
                    info@aaramediamission.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-gold p-1 mt-0.5"><FiPhone size={18} /></div>
                <div>
                  <h4 className="text-xs tracking-wider uppercase font-semibold text-charcoal">Call Us</h4>
                  <a href="tel:+919876543210" className="text-sm text-charcoal-light/80 hover:text-gold transition-colors font-sans mt-1 block">
                    +91 97877 78984
                  </a>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-charcoal tracking-tight mb-4">Follow Showreel</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-charcoal/10 text-charcoal/60 flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                  aria-label="Vimeo channel"
                >
                  <FaVimeoV size={16} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-charcoal/10 text-charcoal/60 flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                  aria-label="Instagram channel"
                >
                  <FiInstagram size={16} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-charcoal/10 text-charcoal/60 flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                  aria-label="Youtube channel"
                >
                  <FiYoutube size={16} />
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full aspect-[16/9] bg-cream-dark/50 rounded overflow-hidden shadow-md relative border border-charcoal/5">
              <iframe
                title="AARA Studio Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.922119047248!2d80.2078652431698!3d13.068694084227092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526615e4ef84a7%3A0xe54fb712d7c0cd36!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-none grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Form - 7 cols */}
          <div className="lg:col-span-7 w-full bg-white p-8 md:p-10 rounded shadow-sm border border-charcoal/5 relative min-h-[500px] flex flex-col justify-center overflow-hidden">

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col"
                >
                  <h3 className="font-serif text-2xl font-semibold text-charcoal tracking-tight mb-8">
                    Project Consultation
                  </h3>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full pt-5 pb-1 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-all duration-300 text-sm font-sans"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-4 top-3 text-[10px] tracking-widest uppercase font-semibold text-charcoal-light/50 transition-all duration-300 pointer-events-none peer-focus:text-gold peer-focus:text-[8px] peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:top-1.5"
                      >
                        Full Name
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full pt-5 pb-1 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-all duration-300 text-sm font-sans"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-3 text-[10px] tracking-widest uppercase font-semibold text-charcoal-light/50 transition-all duration-300 pointer-events-none peer-focus:text-gold peer-focus:text-[8px] peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:top-1.5"
                      >
                        Email Address
                      </label>
                    </div>

                    {/* Project Type */}
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="peer w-full pt-5 pb-1 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-all duration-300 text-sm font-sans appearance-none cursor-pointer"
                      >
                        <option value="Feature Film">Feature Film</option>
                        <option value="Commercial">Commercial / Ad</option>
                        <option value="Documentary">Documentary Short</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Post-Production Only">Post-Production / Grading</option>
                      </select>
                      <label
                        htmlFor="projectType"
                        className="absolute left-4 text-[8px] tracking-widest uppercase font-semibold text-gold top-1.5 pointer-events-none"
                      >
                        Project Type
                      </label>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-light/40 text-xs">
                        ▼
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full pt-5 pb-1 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-all duration-300 text-sm font-sans resize-none"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-4 top-3 text-[10px] tracking-widest uppercase font-semibold text-charcoal-light/50 transition-all duration-300 pointer-events-none peer-focus:text-gold peer-focus:text-[8px] peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:top-1.5"
                      >
                        Brief / Description
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-gold w-full mt-2 font-semibold tracking-[0.2em] shadow-sm hover:shadow-[0_4px_12px_rgba(190,91,59,0.2)] cursor-pointer"
                    >
                      Initiate Inquiry
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center justify-center text-center gap-6 py-12"
                >
                  {/* Drawing SVG Checkmark */}
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-inner">
                    <svg className="w-10 h-10 text-gold stroke-current" viewBox="0 0 52 52">
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="23"
                        fill="none"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <motion.path
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        d="M16 27l7 7 14-14"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                      />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-2xl font-bold text-charcoal tracking-wide">
                      Inquiry Transmitted
                    </h3>
                    <p className="max-w-md text-xs text-charcoal-light/70 font-sans leading-relaxed">
                      Your production request has been logged. A studio coordinator will contact you via email inside 24 hours to schedule your pre-production consultation.
                    </p>
                  </div>

                  {/* Tiny animated resetting bar */}
                  <div className="w-32 h-[3px] bg-charcoal/5 rounded overflow-hidden mt-4">
                    <motion.div
                      className="h-full bg-gold"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
