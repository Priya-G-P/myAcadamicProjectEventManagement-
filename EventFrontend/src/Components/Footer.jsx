import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaFacebookF, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const quickLinks = [
  { label: "Home", to: "/home" },
  { label: "About", to: "/about" },
  { label: "Venue", to: "/venue" },
  { label: "Contact", to: "/contact" },
];

const services = [
  { label: "Wedding Planning", to: "/weddingPlanning" },
  { label: "Catering Services", to: "/cateringservices" },
  { label: "Corporate", to: "/corporateEvent" },
  { label: "Festivals", to: "/FestivalEvent" },
  { label: "Parties", to: "/PrivateParties" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#050510] text-slate-300 pb-6 pt-12">
      
      {/* --- BACKGROUND BLOBS / GLOWS --- */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* --- MAIN CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
        
        {/* --- HERO / CTA SECTION --- */}
        <div className="flex flex-col items-center text-center gap-4 border-b border-white/10 pb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-300 tracking-tight">
            Let's craft the unforgettable.
          </h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Bringing your wildest event dreams to life with precision, elegance, and unparalleled creativity.
          </p>
        </div>

        {/* --- LINKS SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4 items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-3">
              <img src="/spark.jpg" alt="Logo" className="w-10 h-10 rounded-xl border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)] object-cover" />
              <div className="text-left">
                <h3 className="text-xl font-bold text-white tracking-wide">Spark</h3>
                <p className="text-fuchsia-400 text-[10px] font-black tracking-[0.2em] uppercase">Movement</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[250px]">
              The premier event management agency for luxury weddings, corporate galas, and bespoke parties.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs border-b-2 sm:border-b-0 sm:border-l-2 border-purple-500 pb-1 sm:pb-0 sm:pl-3">Explore</h4>
            <ul className="flex flex-col gap-2 items-center sm:items-start">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-xs font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs border-b-2 sm:border-b-0 sm:border-l-2 border-fuchsia-500 pb-1 sm:pb-0 sm:pl-3">Services</h4>
            <ul className="flex flex-col gap-2 items-center sm:items-start">
              {services.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-xs font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs border-b-2 sm:border-b-0 sm:border-l-2 border-purple-400 pb-1 sm:pb-0 sm:pl-3">Connect</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400 font-medium">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-fuchsia-400 transition-colors cursor-pointer"><FaPhoneAlt /> +91 98765 43210</a>
              <a href="mailto:hello@sparkmovement.in" className="flex items-center gap-2 hover:text-fuchsia-400 transition-colors cursor-pointer"><FaEnvelope /> hello@sparkmovement.in</a>
              <p className="flex items-center gap-2"><FaMapMarkerAlt /> Bengaluru, Karnataka</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-1">
              {[FaInstagram, FaYoutube, FaFacebookF, FaTwitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-gradient-to-br hover:from-purple-500 hover:to-fuchsia-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* --- COPYRIGHT --- */}
        <div className="mt-2 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Spark Movement. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-purple-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-purple-400 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
