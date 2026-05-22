import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./HomePageNav.jsx";

function Wedding() {

  const navigate = useNavigate();
  const [Wed, setWed] = useState([]);
  const servicesRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5238/api/servicesTable/all")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          s => s.servicesCategoryid === 1
        );
        setWed(filtered);
      });
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-slate-50 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-screen h-[85vh] relative">
        <img src="ServicesBG.jpg" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/20 flex flex-col justify-center">
          <div className="px-10 lg:px-24 text-white max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight line-clamp-3 drop-shadow-lg">
              Wedding Designing <br /> & Planning
            </h1>

            <p className="mb-10 text-xl font-light text-slate-200">
              Meticulously orchestrating your special moments with timeless elegance and perfection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={() =>
                  servicesRef.current.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto bg-sky-400 hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Services
              </button>

              <a
                href="https://wa.me/9986146509/?text=Hello%20Spark%20Movement%20Karnataka%2C%20I%20am%20interested%20in%20your%20wedding%20planning%20services.%20Please%20provide%20more%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto block"
              >
                <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5">
                  Contact via WhatsApp
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 px-10 md:px-24 bg-white relative">
        {/* Subtle decorative background piece */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/50 rounded-bl-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Our Philosophy</h2>
            <h3 className="text-3xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">Enchanting <br /> <span className="text-sky-600">Weddings</span></h3>
            <p className="text-lg text-slate-600 font-light mb-6 leading-relaxed">
              We turn your special moments into timeless memories. Every wedding we create is thoughtfully planned, beautifully designed, and perfectly executed to reflect your unique love story within elegance.
            </p>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              From elegant décor and exquisite catering to seamless event coordination, our experienced team ensures that every detail is handled with profound care and pristine precision.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] translate-x-4 translate-y-4 shadow-xl"></div>
            <img
              src="ServicesImg.jpg"
              className="relative w-full max-w-lg mx-auto h-[600px] object-cover rounded-[2.5rem] shadow-2xl z-10"
            />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section ref={servicesRef} className="w-screen px-10 md:px-24 py-24 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Premium Options</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">Select Your Experience</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {Wed.map((item) => (
            <div
              key={item.servicesid}
              className="group bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_rgba(29,78,216,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="overflow-hidden w-full h-64 relative">
                <img
                  src={item.imageurl}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {item.servicesName}
                  </h3>
                  <p className="text-slate-500 font-light text-sm line-clamp-3 mb-6">Experience unparalleled luxury and perfection designed to make this specific service absolutely breathtaking.</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      navigate("/imageviewer", {
                        state: {
                          service: item,
                          serviceId: item.servicesid
                        }
                      })
                    }
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-3 rounded-xl transition-colors duration-300"
                  >
                    View Details
                  </button>

                  <a
                    href="https://wa.me/9986146509/?text=Hello%20Spark%20Movement%20Karnataka%2C%20I%20am%20interested%20in%20your%20wedding%20planning%20services.%20Please%20provide%20more%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <button className="w-full bg-sky-400 hover:bg-sky-500 text-white font-semibold px-4 py-3 rounded-xl shadow-md transition-colors duration-300">
                      Inquire
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

export default Wedding;
