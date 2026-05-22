import React from "react";
import Navbar from "./HomePageNav.jsx";

const GalleryShorts = () => {
  const videos = [
    "https://www.youtube.com/embed/UJyhH9ZLHJ8",
    "https://www.youtube.com/embed/y3ZG2IKGaCU",
    "https://www.youtube.com/embed/a_l6TYtMrG0",
    "https://www.youtube.com/embed/ASp89c_tTQA",
    "https://www.youtube.com/embed/OOyv8rTev9E",
    "https://www.youtube.com/embed/xUGwwWySWIU",
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">

        {/* Ambient Video Background */}
        <video
          src="/Shortvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 saturate-[1.2] blur-[2px]"
        />

        {/* Dynamic Vivid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-50"></div>

        <Navbar />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-amber-500 blur-xl opacity-40 rounded-full"></div>
            <span className="relative px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold tracking-widest uppercase">
              Bite-Sized Moments
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 tracking-tight leading-tight">
            Shorts <span className="text-white">Gallery</span>
          </h1>
          <p className="mt-4 text-slate-200 max-w-xl text-lg font-light leading-relaxed drop-shadow-md">
            Fast, dynamic, and emotionally packed clips highlighting the purest joy of our events.
          </p>
        </div>
      </div>

      {/* ================= INNOVATIVE SHORTS GRID ================= */}
      <div className="relative py-24 px-6 md:px-12 lg:px-20 max-w-[1500px] mx-auto">

        {/* Glow Effects */}
        <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-orange-600 rounded-full mix-blend-screen filter blur-[200px] opacity-20"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-yellow-500 rounded-full mix-blend-screen filter blur-[150px] opacity-15"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 group">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative group/card transform transition-all duration-700 hover:scale-105 hover:-translate-y-5"
            >
              {/* Outer Decorative Glow Container */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 to-orange-600/20 rounded-[2.5rem] blur-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

              {/* Display Phone Frame Illusion */}
              <div className="relative bg-white border border-slate-200 rounded-[2.5rem] p-3 shadow-xl backdrop-blur-xl group-hover:opacity-80 hover:!opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-200 rounded-full z-20 pointer-events-none"></div> {/* Dynamic Island Notch */}

                <div className="relative rounded-[2rem] overflow-hidden aspect-[9/16] bg-black">

                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Loading...</span>
                  </div>

                  <iframe
                    src={video}
                    title={`video-${index}`}
                    className="relative z-10 w-full h-full scale-[1.01]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default GalleryShorts;
