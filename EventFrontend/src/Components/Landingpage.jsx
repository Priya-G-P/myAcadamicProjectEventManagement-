import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LandingPage = () => {
  const navigate = useNavigate();
  const container = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".bg-video", 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(".hero-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.7"
    )
    .fromTo(".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-button",
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.5)" },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <div ref={container} className="relative h-screen w-full overflow-hidden bg-slate-900 font-sans">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="bg-video absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/landingPage.mp4" type="video/mp4" />
      </video>

      {/* Elegant Dark Overlay for Video readability */}
      <div className="absolute inset-0 bg-slate-950/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-white">
          Elevate Your Events
        </h1>

        <p className="hero-subtitle text-lg md:text-2xl mb-12 text-slate-200 max-w-3xl drop-shadow-md leading-relaxed font-light">
          The ultimate elegant platform to design, manage, and experience unforgettable events. Start your journey with us today.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/signin")}
            className="hero-button px-10 py-4 pt-4 pb-4 rounded-full font-bold text-lg tracking-wide
            bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 
            hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-white"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="hero-button px-10 py-4 pt-4 pb-4 rounded-full font-bold text-lg tracking-wide
            bg-white/10 backdrop-blur-md border border-white/30 
            hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5
            hover:shadow-xl transition-all duration-300 text-white"
          >
            Log In Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
