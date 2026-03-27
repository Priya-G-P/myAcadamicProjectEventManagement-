import React, { useEffect, useState } from "react";
import Navbar from "./HomePageNav.jsx";

const Home = () => {
  const images = [
    "Home1.jpg",
    "Home2.jpg",
    "Home5.jpg",
    "Home6.webp",
    "Home4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[650px] w-full overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/50"></div>
      
      <Navbar />

      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <h1 className="text-4xl sm:text-4xl md:text-4xl font-bold text-white">
          It's time to <span className="text-blue-400">celebrate</span>
          <br />
          with the best <span className="text-pink-400">event organizers</span>
        </h1>
      </div>
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (<button key={index} onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-white scale-125" : "bg-gray-400"}`} ></button>))}
      </div>
    </div>


  );
};

export default Home;
