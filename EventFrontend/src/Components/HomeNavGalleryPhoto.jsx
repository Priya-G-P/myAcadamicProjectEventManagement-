import React, { useState, useEffect, useRef } from "react";
import Navbar from "./HomePageNav.jsx";

const Gallery = () => {
  const heroImages = ["/pppp.jpeg", "/Home1.jpg", "/Home2.jpg"];
  const [current, setCurrent] = useState(0);

  const imageRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // ✅ SCROLL ANIMATION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-show-gallery");
          }
        });
      },
      { threshold: 0.15 }
    );

    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const galleryItems = [
    { src: "/Home1.jpg", cls: "col-span-2 row-span-2" },
    { src: "/Home2.jpg", cls: "row-span-2" },
    { src: "/gallery3.jpeg", cls: "row-span-2" },
    { src: "/gallery4.jpeg", cls: "col-span-2" },
    { src: "/gallery6.jpeg", cls: "row-span-2" },
    { src: "/WeddingImage.jpg", cls: "" },
    { src: "/gallery2.jpeg", cls: "col-span-2 row-span-2" },
    { src: "/HouseWarmingImage.jpg", cls: "" },
    { src: "/gallery5.jpeg", cls: "col-span-2 row-span-2" },
    { src: "/gallery8.jpeg", cls: "row-span-2" },
    { src: "/gallery9.jpeg", cls: "" },
    { src: "/gallery7.jpeg", cls: "col-span-2" },
    { src: "/gallery12.jpeg", cls: "" },
    { src: "/gallery10.jpeg", cls: "col-span-2 row-span-2" },
    { src: "/gallery11.jpeg", cls: "col-span-2 row-span-2" },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt="Hero" />
          </div>
        ))}

        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-50"></div>
        
        <Navbar />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
          <span className="px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-sm font-semibold mb-6 animate-pulse uppercase tracking-widest">
            Visual Harmony
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-fuchsia-400 tracking-tight leading-tight">
            Photo <span className="text-fuchsia-500">Gallery</span>
          </h1>
          <p className="mt-4 text-slate-200 max-w-2xl text-lg font-light drop-shadow-md">
            Immerse yourself in breathtaking moments. Every frame captures the soul of unforgettable celebrations.
          </p>
        </div>
      </div>

      {/* ================= GALLERY GRID ================= */}
      <div className="relative py-24 px-6 md:px-16 lg:px-24 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="relative z-10 flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Captured <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Memories</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full mt-4"></div>
        </div>

        {/* Dynamic Masonry-like Grid with Group Hover */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4 md:gap-6 group">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              style={{ transitionDelay: `${(i % 5) * 100}ms` }}
              className={`${item.cls} relative overflow-hidden rounded-2xl opacity-0 transform translate-y-16 transition-all duration-[800ms] ease-out 
                hover:!opacity-100 hover:scale-[1.03] hover:z-20 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]
                cursor-crosshair border border-slate-200 bg-white shadow-xl
                group-hover:opacity-90 filter group-hover:brightness-90 hover:!brightness-110`}
            >
              <img
                src={item.src}
                className="w-full h-full object-cover transition-transform duration-[1000ms] hover:scale-110"
                alt="Event Memory"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-semibold tracking-wide translate-y-4 hover:translate-y-0 transition-transform duration-500">Spark Moment</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .animate-show-gallery {
            opacity: 1 !important;
            transform: translateY(0px) !important;
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;
