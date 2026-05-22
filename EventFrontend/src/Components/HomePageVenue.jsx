import React, { useState } from "react";
import Navbar from "./HomePageNav.jsx";
const Venue = () => {
  const [venues] = useState([
    {
      id: 1,
      name: "Coconut Grove Retreat",
      location: "Aluva, Kochi",
      rating: 5,
      image: "Venue1.jpeg"
    },
    {
      id: 2,
      name: "River Breeze Resort",
      location: "Perumbavoor, Kochi",
      rating: 4.5,
      image: "Venue2.jpeg"
    },
    {
      id: 3,
      name: "Green Valley Heritage",
      location: "Feroke, Kozhikode",
      rating: 3.5,
      image: "Venue3.jpeg"
    },
    {
      id: 4,
      name: "Royal Palm Gardens",
      location: "Kunnamangalam, Kozhikode",
      rating: 4.5,
      image: "Venue4.jpeg"
    },
    {
      id: 5,
      name: "Sunset Hill Farmhouse",
      location: "Balussery, Kozhikode",
      rating: 3,
      image: "Venue5.jpeg"
    },
    {
      id: 6,
      name: "Lakeview Paradise",
      location: "Vypin Island, Kochi",
      rating: 4,
      image: "Venue6.jpeg"
    },
    {
      id: 7,
      name: "Golden Leaf Resort",
      location: "Kakkanad, Kochi",
      rating: 5,
      image: "Venue7.jpeg"
    },
    {
      id: 8,
      name: "Hilltop Celebration Point",
      location: "Wayanad Border, Kozhikode",
      rating: 4.5,
      image: "Venue8.jpeg"
    },
    {
      id: 9,
      name: "Emerald Garden Hall",
      location: "Thrissur Road, Kochi",
      rating: 5,
      image: "Venue9.jpeg"
    },
    {
      id: 10,
      name: "Ocean Pearl Venue",
      location: "Cherai Beach, Kochi",
      rating: 5,
      image: "Venue10.jpeg"
    },
    {
      id: 11,
      name: "Silver Sand Banquet",
      location: "Calicut Beach, Kozhikode",
      rating: 5,
      image: "Venue11.jpeg"
    },
    {
      id: 12,
      name: "Grand Palace Events",
      location: "Edappally, Kochi",
      rating: 5,
      image: "Venue12.jpeg"
    }
  ]);

  return (
    <div className="relative w-full bg-slate-50 font-sans overflow-hidden text-slate-800">
      <Navbar />

      {/* Elegant Hero Section */}
      <div className="relative w-full h-[85vh] ">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/Venue6.jpeg')", }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/20 flex flex-col justify-center"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-24 h-full flex flex-col justify-center text-white">
          <h2 className="text-sm font-bold tracking-widest text-sky-400 uppercase mb-3">Premium Locations</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight line-clamp-3 drop-shadow-lg">
            Best Event & Wedding <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Venues in Karnataka</span>
          </h1>

          <p className="mb-10 text-xl font-light text-slate-200 max-w-2xl">
            Discover breathtaking, exclusive, and grand locations crafted for the most unforgettable memories and opulent celebrations.
          </p>

          <div className="mt-4 flex gap-6">
            <button className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold tracking-wider uppercase rounded-full shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all transform hover:-translate-y-1">
              Contact Us
            </button>
            <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wider uppercase rounded-full shadow-lg transition-all transform hover:-translate-y-1">
              Whatsapp Us
            </button>
          </div>
          <div className="w-40 h-1 bg-sky-400 rounded-full mt-12"></div>
        </div>
      </div>

      {/* Innovative Venue Grid Box */}
      <div className="py-24 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Exclusive Spaces</h2>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Discover Breathtaking Venues</h3>
        </div>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="group bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <div className="overflow-hidden h-64 relative w-full">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              </div>

              <div className="p-8">
                {/* Stars */}
                <div className="flex items-center text-amber-400 text-sm mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="mr-1 drop-shadow-sm">
                      {i < Math.floor(venue.rating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="ml-2 text-xs text-slate-400 font-bold tracking-wider">{venue.rating}.0</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors duration-300">{venue.name}</h3>

                <p className="text-sm text-slate-500 font-light leading-relaxed flex items-center gap-2">
                  <span className="text-sky-400 text-xs">📍</span> {venue.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Venue;
