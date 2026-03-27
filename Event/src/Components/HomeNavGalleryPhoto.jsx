import React, { useEffect, useState, useRef } from "react";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";

const Gallery = () => {

  const images = ["/pppp.jpeg"];
  const [current, setCurrent] = useState(0);

  // ✅ REF FOR ALL IMAGES
  const imageRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  // ✅ SCROLL ANIMATION
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-show");
          }
        });
      },
      { threshold: 0.2 }
    );

    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">

      {/* ================= HERO (UNCHANGED) ================= */}
      <div className="relative h-[650px] w-full overflow-hidden">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/50"></div>
        <Navbar />

        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <h1 className="text-4xl md:text-4xl font-bold text-white">
            Explore our <span className="text-pink-400">Gallery</span>
            <br />
            Beautiful event moments
          </h1>
        </div>
      </div>

      {/* ================= GALLERY ================= */}
      <div className="bg-white py-20 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Our <span className="text-pink-500">Events</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4">

          {[
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
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              className={`${item.cls} opacity-0 transform translate-y-10 transition duration-700 ease-out`}
            >
              <img
                src={item.src}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}

        </div>
      </div>

      <Footer />

      {/* ✅ ANIMATION STYLE */}
      <style>
        {`
          .animate-show {
            opacity: 1 !important;
            transform: translateY(0px) !important;
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;