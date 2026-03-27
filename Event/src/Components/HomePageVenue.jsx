import React, { useState } from "react";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";
const Venue = () => {
  const [venues, setVenues] = useState([
    {
      id: 1,
      name: "Coconest Farmhouse",
      location: "Muvattupuzha, Kochi",
      rating: 5,
      image: "Venue1.jpeg"
    },
    {
      id: 2,
      name: "Nadhiyoram River Retreat",
      location: "Elookkara, Muppathadam, Kochi",
      rating: 4.5,
      image: "Venue2.jpeg"
    },
    {
      id: 3,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 3.5,
      image: "Venue3.jpeg"
    },
    {
      id: 4,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 4.5,
      image:"Venue4.jpeg"
    },
    {
      id: 5,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 3,
      image:"Venue5.jpeg"
    },
    {
      id: 6,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 4,
      image:"Venue6.jpeg"
    },
    {
      id: 7,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 5,
      image:"Venue7.jpeg"
    },
    {
      id: 8,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 4.5,
      image:"Venue8.jpeg"
    },
    {
      id: 9,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 5,
      image: "Venue9.jpeg"
    },
    {
      id: 10,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 5,
      image: "Venue10.jpeg"
    },

    {
      id: 11,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 5,
      image: "Venue11.jpeg"
    },
    {
      id: 12,
      name: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: 5,
      image: "Venue12.jpeg"
    }
  ]);

  return (
    <div className="relative w-full">
        <Navbar/>
      {/* Hero Section */}
      <div className="relative w-full h-[650px] ">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/Venue6.jpeg')",}}></div>
        <div className="absolute inset-0 bg-black/40"></div>

       <div className="relative z-10 max-w-4xl px-8 lg:px-26 py-24 text-white pt-50">
          <h1 className="text-4xl lg:text-4xl font-bold leading-tight">
            Best Event & Wedding <br /> Venues in Karnataka
          </h1> 

          <p className="mt-4 text-lg lg:text-xl text-gray-100 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A tempora
            alias quidem excepturi consequuntur, aliquid culpa hic ex iste?
            Voluptatum at aliquid distinctio incidunt obcaecati adipisci magnam
            saepe hic ab.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg">
              Get Quote
            </button>
            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg">
              Whatsapp us
            </button>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-26">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img src={venue.image}  alt={venue.name} className="w-full h-48 object-cover"/>

            <div className="p-4">
              {/* Stars */}
              <div className="flex items-center text-yellow-400 text-sm mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.floor(venue.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">{venue.name}</h3>

              <p className="text-sm text-gray-500 my-1">{venue.location}</p>

              
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Venue;