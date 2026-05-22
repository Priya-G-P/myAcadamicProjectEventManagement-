import React, { useEffect, useState, useRef } from "react";
import Navbar from "./HomePageNav.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const images = [
    "Home1.jpg",
    "Home2.jpg",
    "Home5.jpg",
    "Home6.webp",
  ];

  const [current, setCurrent] = useState(0);
  const container = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.fromTo(".hero-main-text", 
      { y: 40, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, { scope: container });

  return (
    <div ref={container} className="relative min-h-[85vh] w-full overflow-hidden bg-slate-900">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Elegant dark overlay */}
      <div className="absolute inset-0 bg-slate-900/40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/80 z-0"></div>
      
      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <h1 className="hero-main-text text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl max-w-4xl leading-tight">
          It's time to <span className="text-blue-400">celebrate</span>
          <br />
          with the best <span className="text-white border-b-4 border-blue-400 pb-1">event organizers</span>
        </h1>
      </div>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrent(index)} 
            className={`transition-all duration-500 rounded-full ${index === current ? "w-8 h-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "w-3 h-3 bg-white/50 hover:bg-white/80"}`} 
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Home;
