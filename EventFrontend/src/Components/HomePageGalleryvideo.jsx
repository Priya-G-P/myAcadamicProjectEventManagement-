import React from "react";
import Navbar from "./HomePageNav.jsx";

const GalleryVideo = () => {
  const videos = [
    "https://www.youtube.com/embed/qHxxmWySb6c?si=7SijRPaJsBj7Jsxz",
    "https://www.youtube.com/embed/tyBJioe8gOs?si=w71pe7qswbmXjkeN",
    "https://www.youtube.com/embed/1Fd0buIXPxM?si=-dZCK1c4cXui5vPp",
    "https://www.youtube.com/embed/KJwDhHFMicc?si=vXXf-XaljE2v9GoN",
    "https://www.youtube.com/embed/tV6PrYyfU7A?si=nLapOWg2iX7AEc8S",
    "https://www.youtube.com/embed/qcTG5NXzuR0?si=sQMDX_803sphDR68",
    "https://www.youtube.com/embed/9bsYn3hgz4w?si=TM0fGILUMiKBc1pJ",
    "https://www.youtube.com/embed/3RDdoHoDIs0?si=I6UJ-G3qyljtxt-p",
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">

        {/* Ambient Video Background */}
        <video
          src="/eventsvideosgallery.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-50"></div>

        <Navbar />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6 animate-pulse uppercase tracking-widest backdrop-blur-md">
            Cinematic Experience
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 tracking-tight leading-tight">
            Video <span className="text-cyan-500">Gallery</span>
          </h1>
          <p className="mt-4 text-slate-200 max-w-2xl text-lg font-light shadow-black drop-shadow-md">
            Watch the magic unfold. Emotional, powerful, and flawlessly captured wedding moments.
          </p>
        </div>
      </div>

      {/* ================= INNOVATIVE VIDEO GRID ================= */}
      <div className="relative py-24 px-6 md:px-16 lg:px-24 max-w-[1600px] mx-auto overflow-hidden">

        {/* Neon Light Effects */}
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 group">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] 
                bg-white backdrop-blur-xl border border-slate-200 p-2 sm:p-4 
                transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]
                hover:border-cyan-400 group-hover:opacity-90 hover:!opacity-100"
            >
              {/* Animated Glow Border behind iframe */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl opacity-0 hover:opacity-20 transition-opacity duration-700"></div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">

                {/* Fallback loader style */}
                <div className="absolute animate-pulse flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-cyan-500 text-xs tracking-widest uppercase">Loading Buffer</span>
                </div>

                <iframe
                  src={video}
                  title={`video-${index}`}
                  className="relative z-10 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default GalleryVideo;
