import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaChevronDown, FaChevronUp, FaServicestack,
  FaBars, FaTimes, FaHeart, FaGlassCheers,
  FaUtensils, FaUserFriends, FaCalendarCheck, FaImages, FaInbox, FaStar
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function SideNavbar({ isOpen, setIsOpen }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [cateringOpen, setCateringOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef();

  useGSAP(() => {
    // Elegant entrance slide-in for the sidebar
    gsap.fromTo(sidebarRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "bg-indigo-600 border border-indigo-500/50 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]"
      : "hover:bg-white/5 text-slate-400 hover:text-slate-100 border border-transparent";
  };

  return (
    <div className="flex">

      {/* Sleek Dark Glass Sidebar - Docked to left edge to match App.jsx layout */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-screen bg-slate-900/95 backdrop-blur-3xl border-r border-white/10 shadow-2xl ${isOpen ? "w-64" : "w-20"
          } transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col font-sans overflow-hidden`}
      >
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-full h-32 bg-indigo-600/10 blur-[40px] pointer-events-none"></div>

        {/* Header */}
        <div className={`flex items-center ${isOpen ? "justify-between" : "justify-center"} p-6 border-b border-white/5 relative z-10`}>
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
            <h2 className="text-xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Admin</h2>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        {/* Scrollable Nav Area */}
        <ul className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10 scrollbar-hide">

          <Link to="/admin" className="block">
            <li className={`flex items-center ${isOpen ? 'gap-4 justify-start' : 'justify-center'} p-3.5 rounded-2xl transition-all duration-300 font-medium ${getActiveClass("/admin")}`}>
              <FaHome size={20} className={location.pathname === "/admin" ? "text-cyan-300" : ""} />
              {isOpen && <span className="whitespace-nowrap uppercase tracking-wider text-xs">Home</span>}
            </li>
          </Link>

          <Link to="/admin/booking" className="block">
            <li className={`flex items-center ${isOpen ? 'gap-4 justify-start' : 'justify-center'} p-3.5 rounded-2xl transition-all duration-300 font-medium ${getActiveClass("/admin/booking")}`}>
              <FaCalendarCheck size={20} className={location.pathname === "/admin/booking" ? "text-cyan-300" : ""} />
              {isOpen && <span className="whitespace-nowrap uppercase tracking-wider text-xs">Bookings</span>}
            </li>
          </Link>

          <Link to="/admin/Servicesimg" className="block">
            <li className={`flex items-center ${isOpen ? 'gap-4 justify-start' : 'justify-center'} p-3.5 rounded-2xl transition-all duration-300 font-medium ${getActiveClass("/admin/Servicesimg")}`}>
              <FaImages size={20} className={location.pathname === "/admin/Servicesimg" ? "text-cyan-300" : ""} />
              {isOpen && <span className="whitespace-nowrap uppercase tracking-wider text-xs">Images</span>}
            </li>
          </Link>

          <Link to="/admin/contacts" className="block">
            <li className={`flex items-center ${isOpen ? 'gap-4 justify-start' : 'justify-center'} p-3.5 rounded-2xl transition-all duration-300 font-medium ${getActiveClass("/admin/contacts")}`}>
              <FaInbox size={20} className={location.pathname === "/admin/contacts" ? "text-cyan-300" : ""} />
              {isOpen && <span className="whitespace-nowrap uppercase tracking-wider text-xs">Contacts</span>}
            </li>
          </Link>

          <Link to="/admin/users" className="block">
            <li className={`flex items-center ${isOpen ? 'gap-4 justify-start' : 'justify-center'} p-3.5 rounded-2xl transition-all duration-300 font-medium ${getActiveClass("/admin/users")}`}>
              <FaUserFriends size={20} className={location.pathname === "/admin/users" ? "text-indigo-300" : ""} />
              {isOpen && <span className="whitespace-nowrap uppercase tracking-wider text-xs">Users</span>}
            </li>
          </Link>

          <Link to="/admin/reviews" className="block">
            <li className={`flex items-center ${isOpen ? 'gap-4 justify-start' : 'justify-center'} p-3.5 rounded-2xl transition-all duration-300 font-medium ${getActiveClass("/admin/reviews")}`}>
              <FaStar size={20} className={location.pathname === "/admin/reviews" ? "text-pink-300" : ""} />
              {isOpen && <span className="whitespace-nowrap uppercase tracking-wider text-xs">Reviews</span>}
            </li>
          </Link>

          {/* NESTED SERVICES */}
          <li>
            <div
              onClick={() => {
                if (!isOpen) setIsOpen(true);
                setServicesOpen(!servicesOpen);
              }}
              className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} p-3.5 rounded-2xl transition-all duration-300 font-medium cursor-pointer hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-100 ${servicesOpen ? "bg-white/5 border-white/10 text-white" : ""}`}
            >
              <div className={`flex items-center ${isOpen ? 'gap-4' : ''}`}>
                <FaServicestack size={20} className={servicesOpen ? "text-indigo-400" : ""} />
                {isOpen && <span className="whitespace-nowrap uppercase tracking-wider text-xs">Services</span>}
              </div>
              {isOpen && (
                <div className={`transition-transform duration-300 ${servicesOpen ? "rotate-180 text-indigo-400" : "rotate-0"}`}>
                  <FaChevronDown size={12} />
                </div>
              )}
            </div>

            {/* Collapsible Children */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${servicesOpen && isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
              <ul className="pl-6 space-y-2 relative before:absolute before:left-3.5 before:top-0 before:bottom-4 before:w-[2px] before:bg-white/5 disabled-text-slate-400">

                <Link to="/admin/services" className="block relative">
                  <div className="absolute left-[-22px] top-1/2 w-4 h-[2px] bg-white/10"></div>
                  <li className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-xs font-medium uppercase tracking-wider ${getActiveClass("/admin/services")}`}>
                    <FaHeart size={14} className={location.pathname === "/admin/services" ? "text-pink-400" : ""} /> Wedding
                  </li>
                </Link>

                <Link to="/admin/Festival" className="block relative">
                  <div className="absolute left-[-22px] top-1/2 w-4 h-[2px] bg-white/10"></div>
                  <li className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-xs font-medium uppercase tracking-wider ${getActiveClass("/admin/Festival")}`}>
                    <FaGlassCheers size={14} className={location.pathname === "/admin/Festival" ? "text-amber-400" : ""} /> Festival
                  </li>
                </Link>

                {/* NESTED CATERING */}
                <li className="relative">
                  <div className="absolute left-[-22px] top-5 w-4 h-[2px] bg-white/10"></div>
                  <div
                    onClick={() => setCateringOpen(!cateringOpen)}
                    className="flex justify-between items-center cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-colors text-slate-400 hover:text-white"
                  >
                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                      <FaUtensils size={14} className={cateringOpen ? "text-orange-400" : ""} /> Catering
                    </div>
                    {cateringOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${cateringOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                    <ul className="pl-8 pt-2 space-y-1">
                      <Link to="/admin-starter" className="block"><li className={`p-2 rounded-lg text-[10px] tracking-widest uppercase transition-all ${getActiveClass("/admin-starter")}`}>Starters</li></Link>
                      <Link to="/admin-maincourse" className="block"><li className={`p-2 rounded-lg text-[10px] tracking-widest uppercase transition-all ${getActiveClass("/admin-maincourse")}`}>Main Course</li></Link>
                      <Link to="/admin-dessert" className="block"><li className={`p-2 rounded-lg text-[10px] tracking-widest uppercase transition-all ${getActiveClass("/admin-dessert")}`}>Desserts</li></Link>
                    </ul>
                  </div>
                </li>

                <Link to="/admin/PrivateParties" className="block relative mb-2">
                  <div className="absolute left-[-22px] top-1/2 w-4 h-[2px] bg-white/10"></div>
                  <li className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-xs font-medium uppercase tracking-wider ${getActiveClass("/admin/PrivateParties")}`}>
                    <FaUserFriends size={14} className={location.pathname === "/admin/PrivateParties" ? "text-blue-400" : ""} /> Private
                  </li>
                </Link>

              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
