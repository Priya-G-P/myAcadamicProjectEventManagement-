import React, { useEffect, useState } from "react";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";

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
    <div className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[650px] w-full overflow-hidden">

        {/* Background Video */}
        <video
            src="/eventsvideosgallery.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            />


        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
          <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold text-white">
            Video <span className="text-pink-400">Gallery</span>
            <br />
            Our Beautiful Wedding Moments
          </h1>
        </div>
      </div>

      {/* ================= VIDEO GRID ================= */}
      <div className="px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-xl aspect-video"
            >
              <iframe
                src={video}
                title={`video-${index}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GalleryVideo;
