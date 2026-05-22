import React, { useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "WEDDING PLANNERS",
    desc: "Have you ever dreamed of planning the perfect dream event to be remembered forever?",
    image: "WeddingImage.jpg",
    colSpan: "lg:col-span-2"
  },
  {
    title: "CORPORATE IT EVENT",
    desc: "Make a statement at your next corporate event wrapped in pure elegance.",
    image: "gallery5.jpeg",
    colSpan: "lg:col-span-1"
  },
  {
    title: "Catering Services",
    desc: "Exquisite culinary journeys crafted perfectly to suit your sophisticated taste.",
    image: "gallery9.jpeg",
    colSpan: "lg:col-span-1"
  },
  {
    title: "BIRTHDAY EVENT",
    desc: "From elegant decor to seamless entertainment—everything to make the day special.",
    image: "brithdayimg.jpeg",
    colSpan: "lg:col-span-2"
  },
  {
    title: "FESTIVAL EVENT",
    desc: "Planning and celebrating cultural moments with stunning precision and flair.",
    image: "FestivaImage.jpg",
    colSpan: "lg:col-span-2"
  },
  {
    title: "HOUSE WARMING",
    desc: "Share the joy of your new beginning with an immaculately organized ceremony.",
    image: "HouseWarmingImage.jpg",
    colSpan: "lg:col-span-1"
  },
];

function Card() {
  const container = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.fromTo(".service-card", 
      { opacity: 0, y: 100, rotationX: 10 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1, 
        stagger: 0.1, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="w-full bg-slate-50 py-24 relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[100px]"></div>
      </div>

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Excellence Delivered</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500">Experiences</span>
            </h3>
          </div>
          <p className="text-lg text-slate-500 max-w-md font-light">
            Discover a curated collection of our premium services, tailored immaculately to elevate your celebrations.
          </p>
        </div>

        {/* Innovative Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
          {cards.map((card, idx) => (
            <div key={idx}
              onClick={() => navigate('/service-details', { state: { service: { name: card.title, description: card.desc, image: card.image, hasCatering: card.title.toLowerCase().includes('catering') } } })}
              className={`service-card group relative overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(29,78,216,0.15)] flex flex-col cursor-pointer ${card.colSpan}`}>
              
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" loading="lazy"
                  src={card.image} alt={card.title} />
              </div>

              {/* Advanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10" />
              
              {/* Frost Glass Panel Content */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col justify-end p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-200 line-clamp-2 font-light"> {card.desc} </p>
                <div className="mt-4 flex items-center text-blue-300 font-semibold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  Explore Service <span className="ml-2">→</span>
                </div>
              </div>

              {/* Default state title (visible when not hovered) */}
              <div className="absolute bottom-10 left-10 z-10 transition-all duration-500 group-hover:-translate-y-4 group-hover:opacity-0">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card;
