import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [openGallery, setOpenGallery] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // ✅ NEW

  const toggleGallery = () => {
    setOpenGallery(!openGallery);
    setOpenServices(false);
  };

  const toggleServices = () => {
    setOpenServices(!openServices);
    setOpenGallery(false);
  };

  return (
    <>
      <nav className={`fixed left-0 right-0 mx-auto transition-all duration-500 z-[20000] flex items-center justify-between ${scrolled ? "top-4 w-[95%] max-w-7xl bg-white/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/50 px-6 py-3 rounded-full text-slate-800" : "top-0 w-full px-6 sm:px-12 bg-gradient-to-b from-slate-900/80 to-transparent py-6 text-white"}`}>

        {/* Logo */}
        <div className="flex items-center z-[10000] gap-3">
          <img src="/spark.jpg" className={`rounded-full ring-2 shadow-md transition-transform duration-300 ${scrolled ? "h-10 w-10 ring-slate-200" : "h-12 w-12 ring-white/60 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-110"}`} />
          <p className={`font-serif tracking-wide transition-all duration-300 font-bold ${scrolled ? "text-xl text-slate-900" : "text-2xl text-white"}`}>Spark Movement</p>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 md:gap-10 text-sm sm:text-base md:text-sm uppercase font-bold tracking-wider relative z-[10000]">

          <li><Link to="/home" className={`transition-colors duration-300 hover:text-purple-500 ${scrolled ? "text-slate-600" : "text-slate-200"}`}>Home</Link></li>
          <li><Link to="/about" className={`transition-colors duration-300 hover:text-purple-500 ${scrolled ? "text-slate-600" : "text-slate-200"}`}>About</Link></li>

          {/* SERVICES */}
          <li className="relative group">
            <button onClick={toggleServices} className={`transition-colors duration-300 hover:text-purple-500 flex items-center gap-1 ${scrolled ? "text-slate-600" : "text-slate-200"}`}>SERVICES</button>

            {openServices && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-[10001] animate-in fade-in zoom-in-95 duration-200 text-slate-800">
                <Link to="/weddingPlanning" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors border-b border-slate-100">Wedding Planning</Link>
                <Link to="/cateringservices" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors border-b border-slate-100">Catering Services</Link>
                <Link to="/corporateEvent" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors border-b border-slate-100">Corporate Event</Link>
                <Link to="/PrivateParties" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors border-b border-slate-100">Private Parties</Link>
                <Link to="/FestivalEvent" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors">Festival Events</Link>
              </div>
            )}
          </li>

          <li><Link to="/venue" className={`transition-colors duration-300 hover:text-purple-500 ${scrolled ? "text-slate-600" : "text-slate-200"}`}>VENUE</Link></li>
          <li>
            <Link to="/contact" className={`transition-colors duration-300 hover:text-purple-500 ${scrolled ? "text-slate-600" : "text-slate-200"}`}>CONTACT</Link>
          </li>

          {/* GALLERY */}
          <li className="relative group">
            <button onClick={toggleGallery} className={`transition-colors duration-300 hover:text-purple-500 flex items-center gap-1 ${scrolled ? "text-slate-600" : "text-slate-200"}`}>GALLERY</button>

            {openGallery && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-[10001] animate-in fade-in zoom-in-95 duration-200 text-slate-800">
                <Link to="/gallery/photos" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors border-b border-slate-100">Photo Gallery</Link>
                <Link to="/gallery/videos" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors border-b border-slate-100">Video Gallery</Link>
                <Link to="/gallery/shorts" className="block px-5 py-4 hover:bg-slate-50 hover:text-purple-600 transition-colors">Shorts Gallery</Link>
              </div>
            )}
          </li>

          {/* PROFILE */}
          <li className="relative ml-2">
            <div className={`p-1 rounded-full transition-all duration-300 ${scrolled ? "text-purple-500 hover:bg-purple-50" : "text-white hover:bg-white/20"}`}>
              <FaUserCircle
                size={26}
                className="cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => setShowProfile(true)}
              />
            </div>
          </li>

        </ul>

        {/* Mobile Navbar Icons (Hamburger + Profile) */}
        <div className="lg:hidden flex items-center gap-5 z-[20005]">
          <div className={`p-2 rounded-full backdrop-blur-md transition-all duration-500 border hover:scale-110 shadow-lg ${scrolled ? "bg-white/50 border-slate-200 text-purple-600" : "bg-white/10 border-white/20 text-white"}`}>
            <FaUserCircle
              size={24}
              className="cursor-pointer"
              onClick={() => setShowProfile(true)}
            />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-500 border hover:scale-110 shadow-lg ${scrolled || isMobileMenuOpen ? "bg-white/50 border-slate-200 text-slate-800" : "bg-white/10 border-white/20 text-white"}`}
          >
            {isMobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </nav>

      {/* Innovative Full-Screen Glassmorphic Mobile Menu */}
      <div className={`fixed inset-0 z-[19999] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto bg-slate-900/40 backdrop-blur-2xl" : "opacity-0 pointer-events-none bg-slate-900/0 backdrop-blur-none"}`}>
        
        {/* Dynamic Background Elements */}
        <div className={`absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/30 blur-[80px] rounded-full transition-transform duration-1000 ${isMobileMenuOpen ? "scale-100" : "scale-0"}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-500/30 blur-[100px] rounded-full transition-transform duration-1000 delay-100 ${isMobileMenuOpen ? "scale-100" : "scale-0"}`}></div>

        <div className="h-full flex flex-col justify-center px-10 relative z-10 w-full overflow-y-auto pb-20 pt-24 space-y-6">
          <div className={`flex flex-col gap-8 text-4xl font-black text-white uppercase tracking-widest transition-all duration-700 delay-100 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            
            <Link to="/home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-400 hover:translate-x-4 transition-all duration-300 origin-left">Home</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-400 hover:translate-x-4 transition-all duration-300 origin-left">About</Link>
            
            <div className="flex flex-col gap-5">
              <button onClick={toggleServices} className="flex justify-between items-center text-left hover:text-fuchsia-400 hover:translate-x-4 transition-all duration-300 group">
                SERVICES 
                <span className={`text-base border border-white/20 p-2 rounded-full transition-transform duration-300 ${openServices ? 'rotate-90 bg-white/10' : 'group-hover:bg-white/10'}`}>▶</span>
              </button>
              {openServices && (
                <div className="flex flex-col gap-4 pl-6 text-xl font-semibold text-slate-300 border-l-2 border-white/20 ml-2 animate-in slide-in-from-top-4 fade-in duration-300">
                  <Link to="/weddingPlanning" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Wedding Planning</Link>
                  <Link to="/cateringservices" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Catering Services</Link>
                  <Link to="/corporateEvent" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Corporate Event</Link>
                  <Link to="/PrivateParties" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Private Parties</Link>
                  <Link to="/FestivalEvent" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Festival Events</Link>
                </div>
              )}
            </div>

            <Link to="/venue" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-400 hover:translate-x-4 transition-all duration-300 origin-left">VENUE</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-400 hover:translate-x-4 transition-all duration-300 origin-left">CONTACT</Link>

            <div className="flex flex-col gap-5">
              <button onClick={toggleGallery} className="flex justify-between items-center text-left hover:text-fuchsia-400 hover:translate-x-4 transition-all duration-300 group">
                GALLERY 
                <span className={`text-base border border-white/20 p-2 rounded-full transition-transform duration-300 ${openGallery ? 'rotate-90 bg-white/10' : 'group-hover:bg-white/10'}`}>▶</span>
              </button>
              {openGallery && (
                <div className="flex flex-col gap-4 pl-6 text-xl font-semibold text-slate-300 border-l-2 border-white/20 ml-2 animate-in slide-in-from-top-4 fade-in duration-300">
                  <Link to="/gallery/photos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Photo Gallery</Link>
                  <Link to="/gallery/videos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Video Gallery</Link>
                  <Link to="/gallery/shorts" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-fuchsia-300 hover:translate-x-2 transition-all">Shorts Gallery</Link>
                </div>
              )}
            </div>

            {/* In-Menu Profile Button */}
            <div className="pt-8 border-t border-white/20 mt-4">
              <button onClick={() => { setIsMobileMenuOpen(false); setShowProfile(true); }} className="flex items-center gap-4 text-2xl font-bold bg-white/10 border border-white/20 px-8 py-4 rounded-full w-fit hover:bg-fuchsia-500 hover:border-fuchsia-400 transition-all duration-500">
                <FaUserCircle size={32} />
                Manage Profile
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ PROFILE OVERLAY */}
      {showProfile && (
        <div
          className="fixed inset-0 flex justify-end items-start pt-20 pr-6 z-[30000]"
          onClick={() => setShowProfile(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UserProfile onClose={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
