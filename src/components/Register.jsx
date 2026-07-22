import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCamera, HiTrash, HiCheckCircle, HiExclamationCircle, HiChevronRight, HiCalendar, HiUser, HiPhone, HiMail } from 'react-icons/hi';
import { supabase } from '../supabaseClient';

const categories = [
  'Director',
  'Assistant Director',
  'Cinematographer',
  'Assistant Cinematographer',
  'Editor',
  'Assistant Editor',
  'Writer / Screenplayer',
  'Actor / Actress',
  'Sound Designer',
  'Music Director',
  'Production Designer',
  'VFX Artist'
];

export default function Register() {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    dob: '',
    age: '',
    number: '',
    email: '',
    fbId: '',
    instaId: '',
    experience: '',
    previousProject: '',
    photo: ''
  });

  const [errors, setErrors] = useState({});
  const [successData, setSuccessData] = useState(null); // stores { id, name }
  const [countdown, setCountdown] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Handle DOB change and calculate age automatically
  const handleDobChange = (e) => {
    const dobVal = e.target.value;
    let computedAge = '';
    if (dobVal) {
      const today = new Date();
      const birthDate = new Date(dobVal);
      computedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        computedAge--;
      }
      computedAge = computedAge >= 0 ? computedAge : '';
    }

    setFormData(prev => ({
      ...prev,
      dob: dobVal,
      age: computedAge
    }));

    if (errors.dob || errors.age) {
      setErrors(prev => ({ ...prev, dob: null, age: null }));
    }
  };

  // Compress photo via HTML5 Canvas and convert to Base64
  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, photo: 'Please upload an image file (JPEG/PNG).' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Keep image small to conserve localStorage quota
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compress to JPEG with 75% quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);

        setFormData(prev => ({ ...prev, photo: compressedBase64 }));
        setErrors(prev => ({ ...prev, photo: null }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: '' }));
  };

  // Basic validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Select a department / category';
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (formData.age === '' || Number(formData.age) < 0) newErrors.age = 'Invalid age calculated from DOB';
    if (!formData.number.trim()) {
      newErrors.number = 'Contact number is required';
    } else if (!/^[+]?[0-9\s-]{8,20}$/.test(formData.number.trim())) {
      newErrors.number = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.experience === '' || Number(formData.experience) < 0) {
      newErrors.experience = 'Experience (Years) is required';
    }
    if (!formData.previousProject.trim()) newErrors.previousProject = 'Please enter previous project experience description';
    if (!formData.photo) newErrors.photo = 'Profile photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementsByName(firstErrorKey)[0];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Generate unique ID
    const uniqueId = `ARAA-REG-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTalent = {
      id: uniqueId,
      name: formData.name,
      category: formData.category,
      dob: formData.dob,
      age: Number(formData.age),
      number: formData.number,
      email: formData.email,
      fb_id: formData.fbId || null,
      insta_id: formData.instaId || null,
      experience: String(formData.experience),
      previous_project: formData.previousProject,
      photo: formData.photo,
      timestamp: new Date().toISOString()
    };

    // Save fallback to LocalStorage
    const saveToLocalStorage = () => {
      const existingStr = localStorage.getItem('aara_registrations');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.push({
        id: uniqueId,
        name: formData.name,
        category: formData.category,
        dob: formData.dob,
        age: Number(formData.age),
        number: formData.number,
        email: formData.email,
        fbId: formData.fbId,
        instaId: formData.instaId,
        experience: String(formData.experience),
        previousProject: formData.previousProject,
        photo: formData.photo,
        timestamp: newTalent.timestamp
      });
      localStorage.setItem('aara_registrations', JSON.stringify(existing));
    };

    // Try saving to Supabase first
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([newTalent]);
      
      if (error) {
        console.error("Supabase write failed, falling back to LocalStorage:", error);
        saveToLocalStorage();
      } else {
        console.log("Profile successfully saved to Supabase!");
      }
    } catch (err) {
      console.error("Failed to connect to Supabase, falling back to LocalStorage:", err);
      saveToLocalStorage();
    }

    // Show success view and trigger countdown
    setSuccessData({ id: uniqueId, name: formData.name });
    setCountdown(30);

    // Clear form
    setFormData({
      category: '',
      name: '',
      dob: '',
      age: '',
      number: '',
      email: '',
      fbId: '',
      instaId: '',
      experience: '',
      previousProject: '',
      photo: ''
    });
  };

  // Manage the 30 seconds countdown
  useEffect(() => {
    if (successData) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [successData]);

  const handleFinishSuccess = () => {
    // Reset successData and redirect back to gallery or home
    setSuccessData(null);
    window.location.hash = '#/gallery';
  };

  // Circumference of 30-sec progress loader
  const radius = 40;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (countdown / 30) * circumference;

  return (
    <div className="min-h-screen bg-cream py-12 px-6 md:px-12 relative z-10 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!successData ? (
          /* Form View */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl bg-white border border-charcoal/5 rounded-xl shadow-xl p-8 md:p-12 relative"
          >
            {/* Corner Decorative Camera Markers */}
            <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/40" />
            <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/40" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/40" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/40" />

            <div className="text-center mb-8">
              <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold">Talent Acquisition</span>
              <h2 className="font-serif text-3xl font-bold text-charcoal mt-2">Crew Registry & Profile Form</h2>
              <p className="text-xs text-charcoal-light/75 mt-2 max-w-md mx-auto">
                Submit your professional file to join the ARAA production network. Registered portfolios are cataloged for upcoming projects.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                  Profile Photo <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !formData.photo && fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 relative ${
                    formData.photo ? '' : 'cursor-pointer hover:border-gold/60'
                  } ${
                    isDragging ? 'border-gold bg-cream-dark/10' : 'border-charcoal/15 bg-cream/10'
                  }`}
                >
                  {formData.photo ? (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden group border border-charcoal/10" onClick={(e) => e.stopPropagation()}>
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white cursor-pointer"
                      >
                        <HiTrash size={24} className="text-red-400 hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <HiCamera size={36} className="text-charcoal-light/40 group-hover:text-gold/60 transition-colors mb-2 pointer-events-none" />
                      <p className="text-xs text-charcoal-light/75 text-center pointer-events-none">
                        <span className="text-gold font-semibold">
                          Upload a file
                        </span>{' '}
                        or drag and drop
                      </p>
                      <p className="text-[10px] text-charcoal-light/50 mt-1 pointer-events-none">PNG, JPG, JPEG up to 5MB (auto-compressed)</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    name="photo"
                  />
                </div>
                {errors.photo && (
                  <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1.5 font-medium">
                    <HiExclamationCircle /> {errors.photo}
                  </p>
                )}
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Selection Dropdown */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Department / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, category: e.target.value }));
                      if (errors.category) setErrors(prev => ({ ...prev, category: null }));
                    }}
                    className={`px-4 py-3 rounded-lg border text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white ${
                      errors.category ? 'border-red-400' : 'border-charcoal/15'
                    }`}
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                      <HiExclamationCircle /> {errors.category}
                    </p>
                  )}
                </div>

                {/* Talent Name */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-charcoal/40">
                      <HiUser size={16} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                      }}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white ${
                        errors.name ? 'border-red-400' : 'border-charcoal/15'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                      <HiExclamationCircle /> {errors.name}
                    </p>
                  )}
                </div>

                {/* DOB Datepicker */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-charcoal/40">
                      <HiCalendar size={16} />
                    </span>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleDobChange}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white ${
                        errors.dob ? 'border-red-400' : 'border-charcoal/15'
                      }`}
                    />
                  </div>
                  {errors.dob && (
                    <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                      <HiExclamationCircle /> {errors.dob}
                    </p>
                  )}
                </div>

                {/* Computed Age (Auto-calculated, read-only) */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Age <span className="text-charcoal/40 font-normal">(Auto-calculated)</span>
                  </label>
                  <input
                    type="text"
                    name="age"
                    readOnly
                    placeholder="Provide DOB to compute"
                    value={formData.age}
                    className="w-full px-4 py-2.5 rounded-lg border border-charcoal/10 text-sm font-sans bg-charcoal/5 text-charcoal-light/60 outline-none select-none"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                      <HiExclamationCircle /> {errors.age}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-charcoal/40">
                      <HiPhone size={16} />
                    </span>
                    <input
                      type="tel"
                      name="number"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.number}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, number: e.target.value }));
                        if (errors.number) setErrors(prev => ({ ...prev, number: null }));
                      }}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white ${
                        errors.number ? 'border-red-400' : 'border-charcoal/15'
                      }`}
                    />
                  </div>
                  {errors.number && (
                    <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                      <HiExclamationCircle /> {errors.number}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-charcoal/40">
                      <HiMail size={16} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. name@email.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                      }}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white ${
                        errors.email ? 'border-red-400' : 'border-charcoal/15'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                      <HiExclamationCircle /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Facebook Profile Link (Optional) */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Facebook ID / Link <span className="text-[9px] text-charcoal-light/50 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="fbId"
                    placeholder="e.g. facebook.com/username"
                    value={formData.fbId}
                    onChange={(e) => setFormData(prev => ({ ...prev, fbId: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-charcoal/15 text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white"
                  />
                </div>

                {/* Instagram Handle (Optional) */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Instagram ID / Handle <span className="text-[9px] text-charcoal-light/50 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="instaId"
                    placeholder="e.g. @username"
                    value={formData.instaId}
                    onChange={(e) => setFormData(prev => ({ ...prev, instaId: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-charcoal/15 text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white"
                  />
                </div>

                {/* Experience in Years */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                    Professional Experience <span className="text-charcoal/45 font-normal">(Years)</span> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="experience"
                    placeholder="e.g. 5"
                    min="0"
                    value={formData.experience}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, experience: e.target.value }));
                      if (errors.experience) setErrors(prev => ({ ...prev, experience: null }));
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white ${
                      errors.experience ? 'border-red-400' : 'border-charcoal/15'
                    }`}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                      <HiExclamationCircle /> {errors.experience}
                    </p>
                  )}
                </div>
              </div>

              {/* Previous Projects Description */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
                  Previous Project Work & Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="previousProject"
                  placeholder="Summarize your role and contributions in previous films, commercials, or short projects. Be specific about your technical/artistic inputs..."
                  rows={4}
                  value={formData.previousProject}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, previousProject: e.target.value }));
                    if (errors.previousProject) setErrors(prev => ({ ...prev, previousProject: null }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg border text-sm font-sans bg-cream/10 transition-all outline-none focus:border-gold/80 focus:bg-white resize-y ${
                    errors.previousProject ? 'border-red-400' : 'border-charcoal/15'
                  }`}
                />
                {errors.previousProject && (
                  <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                    <HiExclamationCircle /> {errors.previousProject}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 font-bold tracking-widest text-xs uppercase"
                >
                  Register Portfolio File <HiChevronRight size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Success Screen with 30-Second Countdown */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white border border-charcoal/5 rounded-xl shadow-2xl p-8 relative overflow-hidden text-center"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gold/10 blur-xl pointer-events-none" />

            <div className="mb-6 flex flex-col items-center">
              <HiCheckCircle className="text-emerald-500 w-16 h-16 animate-bounce" />
              <h2 className="font-serif text-2xl font-bold text-charcoal mt-4">Registration Successful!</h2>
              <p className="text-xs text-charcoal-light/75 mt-1.5">
                Thank you, <strong className="text-charcoal">{successData.name}</strong>. Your talent file has been created.
              </p>
            </div>

            {/* Countdown Display Card */}
            <div className="bg-cream-dark/15 border border-charcoal/5 rounded-lg p-6 mb-6 flex flex-col items-center relative">
              <span className="text-[8px] font-mono tracking-[0.2em] text-charcoal-light/50 uppercase font-bold mb-2">
                Secure Registration File ID
              </span>

              {countdown > 0 ? (
                <>
                  <div className="text-xl font-mono font-bold tracking-wider text-gold select-all bg-white border border-gold/25 px-4 py-2.5 rounded shadow-inner mb-4 flex items-center gap-2">
                    <code>{successData.id}</code>
                  </div>

                  {/* Circular SVG Timer */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Grey Circle */}
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="#e5e5e5"
                        strokeWidth={stroke}
                        fill="transparent"
                      />
                      {/* Gold Indicator Circle */}
                      <motion.circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="#C7984F"
                        strokeWidth={stroke}
                        fill="transparent"
                        strokeDasharray={circumference}
                        animate={{ strokeDashoffset }}
                        transition={{ ease: 'linear' }}
                      />
                    </svg>
                    <span className="absolute font-mono text-xl font-bold text-charcoal">
                      {countdown}s
                    </span>
                  </div>

                  <p className="text-[10px] text-charcoal-light/70 max-w-[240px] mt-4 leading-relaxed">
                    For privacy, this registration ID will be hidden in <strong>{countdown} seconds</strong>. Copy or save it immediately for references.
                  </p>
                </>
              ) : (
                <>
                  {/* Countdown Expired View */}
                  <div className="text-lg font-mono font-bold tracking-wider text-charcoal/30 select-none bg-charcoal/5 border border-charcoal/10 px-4 py-2.5 rounded mb-4">
                    <code>••••-••••-••••</code>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded flex items-center gap-2 text-left mb-2">
                    <HiExclamationCircle size={28} className="text-amber-600 flex-shrink-0" />
                    <span className="text-[9px] text-amber-800 leading-normal">
                      Security timeout reached. The registration ID has been hidden. If you did not copy it, please check with the Admin or register again.
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleFinishSuccess}
              className="btn-gold w-full py-2.5 font-bold tracking-widest text-[10px] uppercase cursor-pointer"
            >
              Continue to Portfolio Gallery
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
