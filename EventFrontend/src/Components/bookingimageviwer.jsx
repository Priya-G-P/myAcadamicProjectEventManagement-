import React, { useEffect, useState, useRef } from "react";
import { FaCheckCircle, FaImages, FaArrowRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ImageCard() {

  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const container = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const { service, serviceId } = location.state || {};

  useEffect(() => {
    if (!serviceId) return;

    fetch("http://localhost:5238/api/ServicesimgManagement/all")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          (img) => Number(img.servicesid) === Number(serviceId)
        );
        setImages(filtered);
      });
  }, [serviceId]);

  useGSAP(() => {
    gsap.fromTo(".header-anim", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".card-anim",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
    );
  }, { scope: container });

  useEffect(() => {
    if (images.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.img-item-anim'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }
        );
    }
  }, [images]);

  return (
    <div ref={container} className="min-h-screen relative flex justify-center items-center py-20 px-4 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden font-sans">

      {/* GLOWING ORBS */}
      <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* CONTENT */}
      <div className="relative w-full flex justify-center z-10 max-w-6xl">

        <div className="w-full relative">
            <div className="header-anim flex flex-col items-center justify-center mb-10 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg mb-6 backdrop-blur-md">
                    <FaImages className="text-3xl text-indigo-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 mb-4 drop-shadow-sm">
                    {service?.title || "Choose Your Vibe"}
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto text-lg">Select the stage setup or decorative inspiration that aligns perfectly with your vision.</p>
            </div>

            {/* GLASS CARD AREA */}
            <div className="card-anim bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 md:p-12">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                {images.length > 0 ? (
                images.map((img, index) => (

                    <div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`img-item-anim relative h-[280px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group
                    ${selectedIndex === index ? "ring-4 ring-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] scale-105 z-10" : "hover:scale-[1.02] hover:ring-2 hover:ring-white/20"}`}
                    >

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 z-10 transition-colors duration-300 ${selectedIndex === index ? "bg-indigo-900/20" : "bg-black/20 group-hover:bg-black/10"}`}></div>

                    <img
                        src={
                        img.image?.startsWith("data:")
                            ? img.image
                            : `data:image/jpeg;base64,${img.imageBase64}`
                        }
                        alt="service view"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {selectedIndex === index && (
                        <div className="absolute top-4 right-4 z-20 bg-indigo-500 text-white p-2 rounded-full shadow-lg shadow-indigo-500/50">
                        <FaCheckCircle className="text-xl" />
                        </div>
                    )}

                    </div>

                ))
                ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center justify-center opacity-70">
                    <FaImages className="text-5xl text-slate-600 mb-4" />
                    <p className="text-xl text-slate-500 font-medium">
                        Visual preparations are underway. No images yet.
                    </p>
                </div>
                )}

            </div>

            <div className="flex justify-center border-t border-white/10 pt-8 mt-4">
                <button
                onClick={() => {
                    if (selectedIndex === null) {
                        // We could use toast here but keeping it identical conceptually
                        alert("Please select a concept image to proceed.");
                        return;
                    }
                    navigate("/booking", {
                        state: {
                        selectedImage: images[selectedIndex],
                        service // pass full original object
                        }
                    });
                }}
                className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 shadow-xl
                    ${selectedIndex !== null 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:-translate-y-1" 
                        : "bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed"}`}
                >
                Proceed to Booking <FaArrowRight />
                </button>
            </div>

            </div>
        </div>
      </div>
    </div>
  );
}
