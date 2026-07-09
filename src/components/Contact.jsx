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
    <section id="contact" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold">Collaboration</span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal font-bold tracking-tight mt-2">
            Start a Production
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-charcoal-light/70 font-sans mt-4">
            Have a story waiting to be told? Reach out to schedule a pre-production consult or book our studio team.
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
                    +91 98765 43210
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
          <div className="lg:col-span-7 w-full bg-white p-8 md:p-10 rounded shadow-sm border border-charcoal/5">
            <h3 className="font-serif text-2xl font-semibold text-charcoal tracking-tight mb-8">
              Project Consultation
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[10px] tracking-widest uppercase font-semibold text-charcoal-light/60">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full py-3 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-colors duration-300 text-sm font-sans"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[10px] tracking-widest uppercase font-semibold text-charcoal-light/60">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@domain.com"
                  className="w-full py-3 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-colors duration-300 text-sm font-sans"
                />
              </div>

              {/* Project Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="projectType" className="text-[10px] tracking-widest uppercase font-semibold text-charcoal-light/60">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-colors duration-300 text-sm font-sans"
                >
                  <option value="Feature Film">Feature Film</option>
                  <option value="Commercial">Commercial / Ad</option>
                  <option value="Documentary">Documentary Short</option>
                  <option value="Music Video">Music Video</option>
                  <option value="Post-Production Only">Post-Production / Grading</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] tracking-widest uppercase font-semibold text-charcoal-light/60">
                  Brief / Description
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the script, timing, target locations, or timeline..."
                  className="w-full py-3 px-4 bg-cream border border-charcoal/10 rounded focus:border-gold focus:outline-none transition-colors duration-300 text-sm font-sans resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted}
                className="btn-gold w-full mt-2 font-semibold tracking-[0.2em]"
              >
                {submitted ? 'Inquiry Transmitted' : 'Initiate Inquiry'}
              </button>
            </form>

            {/* Form Success Overlay */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-gold/10 border border-gold/30 rounded text-center text-xs text-gold-dark font-sans font-semibold tracking-wide"
                >
                  Message received! A production coordinator will respond within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
