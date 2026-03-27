import React from "react";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";

const GalleryVideo = () => {
  const videos = [
  "https://www.youtube.com/embed/UJyhH9ZLHJ8",
  "https://www.youtube.com/embed/y3ZG2IKGaCU",
  "https://www.youtube.com/embed/a_l6TYtMrG0",
  "https://www.youtube.com/embed/ASp89c_tTQA",
  "https://www.youtube.com/embed/OOyv8rTev9E",
  "https://www.youtube.com/embed/xUGwwWySWIU",
];

return (
  
    <div className="bg-white">
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[650px] w-full overflow-hidden">

        <video
          src="/Shortvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <Navbar />

        <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Shorts Video <span className="text-pink-400">Gallery</span>
            <br />
            Wedding Moments
          </h1>
        </div>
      </div>

      {/* ================= VIDEO GRID ================= */}
      <div className="px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg aspect-[9/16] bg-black" >
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
