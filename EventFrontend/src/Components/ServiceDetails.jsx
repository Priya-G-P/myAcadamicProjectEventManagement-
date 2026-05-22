import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCheckCircle, FaStar, FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import Navbar from "./HomePageNav.jsx";

gsap.registerPlugin(useGSAP);

export default function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;
  const container = useRef();

  useGSAP(() => {
    if(!service) return;
    
    gsap.fromTo(".detail-header", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".detail-hero",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "slow" }
    );
    gsap.fromTo(".detail-feature",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.5 }
    );
  }, { scope: container, dependencies: [service] });

  // Fallback if accessed without state
  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Service Not Found</h2>
        <button onClick={() => navigate("/home")} className="text-blue-600 underline">Return Home</button>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate("/booking", {
      state: { selectedService: service.name, cateringRecommended: service.hasCatering }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden font-sans">
      <Navbar />

      <main ref={container} className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 group font-medium">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Services
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            
            {/* HERO IMAGE SECTION */}
            <div className="detail-hero relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-400 rounded-[3rem] blur-2xl opacity-20 -z-10 translate-y-4"></div>
              <div className="relative h-[400px] lg:h-[550px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img src={`/${service.image}`} alt={service.name} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-indigo-600 shadow-lg flex items-center gap-2">
                   <FaStar className="text-yellow-400" /> Premium Tier
                </div>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="detail-header space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                   {service.name}
                </h1>
                <p className="text-xl text-slate-500 font-light leading-relaxed">
                   {service.description || "Experience the pinnacle of event precision with our beautifully curated tier. Tailored perfectly for your majestic aspirations."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 {[
                   "Dedicated Manager", 
                   "Venue Decoration",
                   "Photography Setup",
                   "Custom Invitations"
                 ].map((feature, i) => (
                   <div key={i} className="detail-feature flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-100">
                      <FaCheckCircle className="text-emerald-500" />
                      <span className="text-slate-700 font-medium text-sm">{feature}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
                 <button onClick={handleBookNow} className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <FaCalendarAlt /> Book This Service Now
                 </button>
                 <p className="text-slate-400 text-sm font-medium">No hidden fees. Free cancellation.</p>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
