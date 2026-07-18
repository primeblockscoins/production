import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLockClosed, HiSearch, HiIdentification, HiEye, HiTrash, HiExternalLink, HiMail, HiPhone, HiCalendar, HiUser, HiSparkles } from 'react-icons/hi';
import { supabase } from '../supabaseClient';

const SEED_DATA = [
  {
    id: 'AARA-REG-948123',
    name: 'Vikram Sethupathi',
    category: 'Director',
    dob: '1992-05-14',
    age: 34,
    number: '+91 94452 38102',
    email: 'vikram.sethu@cinema.com',
    fbId: 'facebook.com/vikramsethudir',
    instaId: '@vikram_sethu_dir',
    experience: '8',
    previousProject: 'Directed two award-winning Tamil short films: "Kanal" and "Nizhal". Assisted prominent directors in three major production drafts. Specialized in high-concept thriller screenplays and visual blocking layouts.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'AARA-REG-372910',
    name: 'Priya Ramachandran',
    category: 'Cinematographer',
    dob: '1995-11-23',
    age: 30,
    number: '+91 98840 92341',
    email: 'priya.cam@production.in',
    fbId: '',
    instaId: '@priya_frames',
    experience: '5',
    previousProject: 'Cinematographer for independent feature film "Sandhiya". Worked as 2nd unit camera assistant for ARRI Alexa mini LF setups. Fluent in lighting styles, moody visual schemes, and steady-cam operations.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'AARA-REG-483019',
    name: 'Karthik Raja',
    category: 'Editor',
    dob: '1997-03-08',
    age: 29,
    number: '+91 73581 04293',
    email: 'karthik.edit@cutstudio.net',
    fbId: 'facebook.com/karthikedits',
    instaId: '@karthik_raja_editor',
    experience: '6',
    previousProject: 'Chief editor for numerous corporate commercials and web-series tracks. Expertise in Davinci Resolve, Adobe Premiere Pro, and complex multi-track workflow pacing.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [profileToDelete, setProfileToDelete] = useState(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Load and seed database from Supabase (with localStorage fallback)
  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error("Failed to load profiles from Supabase, loading LocalStorage:", error);
        loadLocalStorageProfiles();
      } else if (data && data.length > 0) {
        const mappedData = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          dob: item.dob,
          age: item.age,
          number: item.number,
          email: item.email,
          fbId: item.fb_id || '',
          instaId: item.insta_id || '',
          experience: item.experience,
          previousProject: item.previous_project,
          photo: item.photo,
          timestamp: item.timestamp
        }));
        setRegistrations(mappedData);
      } else {
        loadLocalStorageProfiles();
      }
    } catch (err) {
      console.error("Failed to fetch from Supabase:", err);
      loadLocalStorageProfiles();
    }
  };

  const loadLocalStorageProfiles = () => {
    const dataStr = localStorage.getItem('aara_registrations');
    if (dataStr) {
      setRegistrations(JSON.parse(dataStr));
    } else {
      localStorage.setItem('aara_registrations', JSON.stringify(SEED_DATA));
      setRegistrations(SEED_DATA);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Fetch specific profile by ID from Supabase
  const handleQueryById = async (idToQuery) => {
    const cleanId = idToQuery.trim();
    if (!cleanId) return;

    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', cleanId)
        .single();

      if (error) {
        console.error("Supabase ID query error:", error);
        alert(`No profile found in Supabase for ID: ${cleanId}`);
      } else if (data) {
        const mapped = {
          id: data.id,
          name: data.name,
          category: data.category,
          dob: data.dob,
          age: data.age,
          number: data.number,
          email: data.email,
          fbId: data.fb_id || '',
          instaId: data.insta_id || '',
          experience: data.experience,
          previousProject: data.previous_project,
          photo: data.photo,
          timestamp: data.timestamp
        };

        // Add to state list if not already present
        setRegistrations(prev => {
          if (!prev.some(r => r.id === mapped.id)) {
            return [mapped, ...prev];
          }
          return prev;
        });

        // Set as selected to view dossier
        setSelectedProfile(mapped);
      }
    } catch (err) {
      console.error("Failed to query profile by ID:", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'aaramediamission') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Password.');
    }
  };

  const handleDelete = (reg, e) => {
    if (e) e.stopPropagation();
    setProfileToDelete(reg);
  };

  const confirmDelete = async () => {
    if (!profileToDelete) return;
    const { id } = profileToDelete;

    // Delete from Supabase cloud
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);
      if (error) {
        console.error("Failed to delete from Supabase:", error);
      }
    } catch (err) {
      console.error("Error connecting to Supabase delete API:", err);
    }

    // Delete from LocalStorage fallback
    const updated = registrations.filter(reg => reg.id !== id);
    localStorage.setItem('aara_registrations', JSON.stringify(updated));
    setRegistrations(updated);
    
    if (selectedProfile && selectedProfile.id === id) {
      setSelectedProfile(null);
    }

    setProfileToDelete(null);
  };

  const handleSearchReset = () => {
    setSearchQuery('');
    setFilterCategory('All');
  };

  const filteredList = registrations.filter(reg => {
    const matchesSearch = 
      reg.id.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      reg.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      reg.number.includes(searchQuery.trim());
      
    const matchesCategory = filterCategory === 'All' || reg.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(SEED_DATA.map(r => r.category)), ...new Set(registrations.map(r => r.category))];

  return (
    <div className="min-h-screen bg-cream py-12 px-6 md:px-12 relative z-10">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* Login Screen */
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto mt-16 bg-white border border-charcoal/5 rounded-xl shadow-2xl p-8 relative overflow-hidden"
          >
            <span className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold" />
            <span className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold" />
            <span className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold" />
            <span className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold" />

            <div className="text-center mb-8">
              <div className="p-3 bg-gold/10 text-gold rounded-full w-fit mx-auto mb-3">
                <HiLockClosed size={24} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">Admin Portal</h2>
              <p className="text-[10px] text-charcoal-light/60 mt-1 uppercase tracking-widest font-mono">
                AARA Media Vault Screening
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-2">
                  Enter Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-charcoal/15 bg-cream/15 text-sm font-sans focus:border-gold/80 focus:bg-white outline-none"
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-[10px] font-medium text-center bg-red-50 border border-red-200/50 p-2 rounded">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="btn-gold w-full py-2.5 font-bold tracking-widest text-[10px] uppercase cursor-pointer"
              >
                Access Talents Database
              </button>
            </form>
          </motion.div>
        ) : (
          /* Dashboard Layout */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto flex flex-col gap-8"
          >
            {/* Header Dashboard Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-charcoal border border-white/10 rounded-xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-2xl pointer-events-none" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold flex items-center gap-1.5">
                  <HiSparkles /> Internal Talent Directory
                </span>
                <h1 className="font-serif text-2xl md:text-3xl font-bold mt-1">AARA Production Registry</h1>
                <p className="text-xs text-white/50 font-sans mt-2">
                  Review casting files, portfolio links, experience logs, and dynamic contact sheets.
                </p>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="mt-4 md:mt-0 px-4 py-2 border border-white/20 hover:border-gold hover:text-gold text-xs rounded transition-colors cursor-pointer font-mono"
              >
                Lock Database
              </button>
            </div>

            {/* Main Content Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Search & List (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Search / Filter Bar */}
                <div className="bg-white border border-charcoal/5 rounded-xl shadow-sm p-5 grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6 relative">
                    <span className="absolute left-3 top-3 text-charcoal/40">
                      <HiSearch size={16} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search ID, name, email or number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-charcoal/15 rounded-lg text-xs font-sans outline-none focus:border-gold/80"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      onClick={() => handleQueryById(searchQuery)}
                      disabled={!searchQuery.trim()}
                      className="w-full py-2 bg-gold hover:bg-gold-light text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer uppercase font-mono tracking-wider"
                    >
                      Fetch ID
                    </button>
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-charcoal/15 rounded-lg text-xs font-sans bg-cream/10 outline-none focus:border-gold/80"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* List Table Container */}
                <div className="bg-white border border-charcoal/5 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-charcoal/5 flex justify-between items-center bg-cream/20">
                    <h3 className="font-serif text-sm font-bold text-charcoal">
                      Casting Submissions ({filteredList.length})
                    </h3>
                    {(searchQuery || filterCategory !== 'All') && (
                      <button
                        onClick={handleSearchReset}
                        className="text-[10px] font-mono text-gold hover:underline cursor-pointer"
                      >
                        Reset Search
                      </button>
                    )}
                  </div>

                  {filteredList.length === 0 ? (
                    <div className="p-12 text-center text-charcoal-light/50 text-xs font-sans">
                      No matching records found. Verify ID or filter parameters.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans border-collapse">
                        <thead>
                          <tr className="bg-cream/10 text-charcoal/40 uppercase font-mono tracking-wider text-[9px] border-b border-charcoal/5">
                            <th className="px-6 py-3">ID / Photo</th>
                            <th className="px-6 py-3">Talent Details</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredList.map((reg) => (
                            <tr
                              key={reg.id}
                              onClick={() => setSelectedProfile(reg)}
                              className={`border-b border-charcoal/5 last:border-b-0 hover:bg-cream/10 cursor-pointer transition-colors ${
                                selectedProfile?.id === reg.id ? 'bg-cream/25' : ''
                              }`}
                            >
                              {/* Photo + ID */}
                              <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md overflow-hidden bg-charcoal/10 border border-charcoal/5 flex-shrink-0">
                                  {reg.photo ? (
                                    <img src={reg.photo} alt={reg.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full bg-gold/10 flex items-center justify-center text-gold">
                                      <HiUser size={18} />
                                    </div>
                                  )}
                                </div>
                                <span className="font-mono font-bold text-charcoal/80 text-[10px]">
                                  {reg.id}
                                </span>
                              </td>

                              {/* Details */}
                              <td className="px-6 py-4">
                                <div className="font-bold text-charcoal">{reg.name}</div>
                                <div className="text-[10px] text-gold font-medium mt-0.5">{reg.category}</div>
                                <div className="text-[10px] text-charcoal-light/60 mt-1">Exp: {reg.experience} Years • Age: {reg.age}</div>
                              </td>

                              {/* Actions */}
                              <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setSelectedProfile(reg)}
                                    className="p-1.5 rounded hover:bg-cream-dark/15 text-charcoal-light hover:text-gold transition-colors cursor-pointer"
                                    title="View Profile File"
                                  >
                                    <HiEye size={16} />
                                  </button>
                                  <button
                                    onClick={(e) => handleDelete(reg, e)}
                                    className="p-1.5 rounded hover:bg-red-50 text-charcoal-light hover:text-red-500 transition-colors cursor-pointer"
                                    title="Delete File"
                                  >
                                    <HiTrash size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Detailed Profile Dossier (5 cols) */}
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  {selectedProfile ? (
                    <motion.div
                      key={selectedProfile.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white border border-charcoal/10 rounded-xl shadow-lg overflow-hidden relative flex flex-col"
                    >
                      {/* Dossier Bracket Layout */}
                      <span className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
                      <span className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-gold/40 pointer-events-none" />

                      <div className="p-6 md:p-8 flex flex-col gap-6">
                        
                        {/* Profile Image & Identification Code */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                          <div className="w-24 h-24 rounded-lg overflow-hidden border border-charcoal/10 shadow bg-charcoal/10 flex-shrink-0">
                            {selectedProfile.photo ? (
                              <img src={selectedProfile.photo} alt={selectedProfile.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gold/10 flex items-center justify-center text-gold">
                                <HiUser size={36} />
                              </div>
                            )}
                          </div>
                          <div className="text-center sm:text-left flex-grow">
                            <span className="text-[8px] font-mono tracking-widest text-gold font-bold uppercase border border-gold/25 px-1.5 py-0.5 rounded">
                              {selectedProfile.id}
                            </span>
                            <h2 className="font-serif text-lg font-bold text-charcoal mt-2.5">
                              {selectedProfile.name}
                            </h2>
                            <p className="text-xs text-gold font-semibold uppercase tracking-wider mt-0.5">
                              {selectedProfile.category}
                            </p>
                          </div>
                        </div>

                        {/* Stats Cards Row */}
                        <div className="grid grid-cols-2 gap-4 border-y border-charcoal/5 py-4">
                          <div className="text-center bg-cream/15 p-2 rounded">
                            <div className="text-[10px] text-charcoal-light/50 uppercase font-mono tracking-wider">Experience</div>
                            <div className="text-sm font-bold text-charcoal mt-0.5">{selectedProfile.experience} Years</div>
                          </div>
                          <div className="text-center bg-cream/15 p-2 rounded">
                            <div className="text-[10px] text-charcoal-light/50 uppercase font-mono tracking-wider">Age</div>
                            <div className="text-sm font-bold text-charcoal mt-0.5">{selectedProfile.age} Years</div>
                          </div>
                        </div>

                        {/* Basic Details List */}
                        <div className="space-y-3.5 text-xs text-charcoal-light font-sans">
                          {/* DOB */}
                          <div className="flex items-center gap-3">
                            <HiCalendar className="text-gold flex-shrink-0" size={16} />
                            <div>
                              <span className="text-[10px] text-charcoal-light/40 block leading-none">Date of Birth</span>
                              <span className="text-charcoal font-medium mt-0.5 inline-block">{selectedProfile.dob}</span>
                            </div>
                          </div>
                          
                          {/* Number */}
                          <div className="flex items-center gap-3">
                            <HiPhone className="text-gold flex-shrink-0" size={16} />
                            <div>
                              <span className="text-[10px] text-charcoal-light/40 block leading-none">Contact Number</span>
                              <a href={`tel:${selectedProfile.number}`} className="text-charcoal font-medium hover:text-gold hover:underline mt-0.5 inline-block">{selectedProfile.number}</a>
                            </div>
                          </div>

                          {/* Email */}
                          <div className="flex items-center gap-3">
                            <HiMail className="text-gold flex-shrink-0" size={16} />
                            <div>
                              <span className="text-[10px] text-charcoal-light/40 block leading-none">Email Address</span>
                              <a href={`mailto:${selectedProfile.email}`} className="text-charcoal font-medium hover:text-gold hover:underline mt-0.5 inline-block">{selectedProfile.email}</a>
                            </div>
                          </div>

                          {/* Social handles */}
                          {(selectedProfile.fbId || selectedProfile.instaId) && (
                            <div className="pt-2 border-t border-charcoal/5 flex flex-col gap-2">
                              <span className="text-[10px] text-charcoal-light/40 uppercase font-mono tracking-wider">Talent Social Links</span>
                              <div className="flex flex-wrap gap-2">
                                {selectedProfile.fbId && (
                                  <a
                                    href={`https://${selectedProfile.fbId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2.5 py-1 bg-cream-dark/10 hover:bg-gold/15 border border-charcoal/10 hover:border-gold/30 rounded text-[10px] text-charcoal hover:text-gold flex items-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    Facebook <HiExternalLink size={10} />
                                  </a>
                                )}
                                {selectedProfile.instaId && (
                                  <a
                                    href={`https://instagram.com/${selectedProfile.instaId.replace('@', '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2.5 py-1 bg-cream-dark/10 hover:bg-gold/15 border border-charcoal/10 hover:border-gold/30 rounded text-[10px] text-charcoal hover:text-gold flex items-center gap-1.5 transition-colors cursor-pointer"
                                  >
                                    Instagram <HiExternalLink size={10} />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Projects Description */}
                        <div className="bg-cream/20 border border-charcoal/5 rounded-lg p-4">
                          <h4 className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
                            <HiIdentification size={12} /> Filmography / Previous Project Work
                          </h4>
                          <p className="text-[11px] leading-relaxed text-charcoal-light/85 whitespace-pre-line font-light italic">
                            "{selectedProfile.previousProject}"
                          </p>
                        </div>

                        {/* Close Detail View Button */}
                        <button
                          onClick={() => setSelectedProfile(null)}
                          className="text-center py-2.5 border border-charcoal/15 hover:border-gold hover:text-gold rounded text-[10px] font-mono uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Close Profile File
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/40 border border-dashed border-charcoal/15 rounded-xl p-8 text-center text-charcoal-light/50 text-xs font-sans py-24"
                    >
                      Select a casting record from the submission list to preview full file dossiers and print contacts.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Delete Confirmation Modal */}
      <AnimatePresence>
        {profileToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProfileToDelete(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white border border-charcoal/10 rounded-xl shadow-2xl p-6 relative overflow-hidden text-center select-none"
            >
              {/* Corner Decorative Red Markers */}
              <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-red-500/25 pointer-events-none" />
              <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-red-500/25 pointer-events-none" />

              <div className="p-3 bg-red-50 text-red-500 rounded-full w-fit mx-auto mb-4 border border-red-100">
                <HiTrash size={28} />
              </div>

              <h3 className="font-serif text-lg font-bold text-charcoal">Delete Talent Profile?</h3>
              <p className="text-xs text-charcoal-light/75 mt-2 leading-relaxed">
                Are you sure you want to delete the casting file for <strong className="text-charcoal">{profileToDelete.name}</strong> ({profileToDelete.id})? This will permanently erase the profile from Supabase and the local cache.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setProfileToDelete(null)}
                  className="px-4 py-2 border border-charcoal/15 hover:bg-cream-dark/10 text-[10px] font-mono uppercase tracking-wider rounded cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono uppercase tracking-wider rounded cursor-pointer shadow-md transition-colors"
                >
                  Delete File
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
