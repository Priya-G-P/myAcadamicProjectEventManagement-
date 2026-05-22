import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./HomePageNav.jsx";
function Festival() {
  const navigate = useNavigate();
  const [Fes, setFes] = useState([]);
  const servicesRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5238/api/servicesTable/all")
      .then(res => res.json())
      .then(data => {
        setFes(data.filter(s => s.servicesCategoryid === 3));
      });
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-slate-50 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-screen h-[85vh]">
        <img src="festival1.png" alt="Festival" className="w-full h-[70vh] object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/40 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-10 lg:px-24 w-full text-white">
            <h2 className="text-sm font-bold tracking-widest text-sky-400 uppercase mb-3">Cultural Vibrance</h2>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight line-clamp-3 drop-shadow-lg">
              Festivals of Joy <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">& Culture</span>
            </h1>

            <p className="mb-10 text-xl font-light text-slate-200 max-w-2xl leading-relaxed">
              Festivals are majestic occasions celebrated to express joy, deep devotion, and culture. We meticulously organize festivals that echo unity and spectacular brilliance.
            </p>

            <div className="flex gap-6 flex-wrap">
              <button
                onClick={() =>
                  servicesRef.current.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-sky-400 hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Festivals
              </button>

              <a
                href="https://wa.me/9986146509/?text=Hello%20Spark%20Movement%20Karnataka%2C%20I%20am%20interested%20in%20your%20Festival%20Event%20services.%20Please%20provide%20more%20details."
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5">
                  Whatsapp Enquiry
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 px-10 md:px-24 bg-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 rounded-bl-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Immersive Culture</h2>
            <h3 className="text-3xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">
              Magical <br /> <span className="text-sky-600">Carnivals</span>
            </h3>

            <p className="text-lg text-slate-600 font-light leading-relaxed mb-6">
              At Spark Movement, we turn epic societal gatherings into sprawling, breathtaking luxurious celebrations.
              Every major festival we manage is aggressively planned to honor tradition while utilizing ultra-modern organizational tactics.
            </p>

            <p className="text-lg text-slate-600 font-light leading-relaxed">
              From monumental stage décor and elite mass catering to seamless crowd coordination, our deeply experienced team ensures your festival is safe, massive, and entirely flawless.
            </p>
          </div>

          <div className="order-1 md:order-2 relative h-[600px] w-full max-w-lg mx-auto">
            <div className="absolute inset-0 bg-blue-100 rounded-[3rem] translate-x-6 translate-y-6 shadow-2xl"></div>
            <img
              src="/FestText.jpg"
              alt="Festival Gatherings"
              className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-xl z-10"
            />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section ref={servicesRef} className="w-screen px-10 md:px-24 py-24 bg-slate-50">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Our Offerings</h2>
          <h3 className="text-3xl font-extrabold text-slate-900">Custom Festival Coordination</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {Fes.map((item) => (
            <div
              key={item.servicesid}
              className="group bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_rgba(29,78,216,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="overflow-hidden w-full h-64 relative">
                <img src={item.imageurl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {item.servicesName}
                  </h3>
                  <p className="text-slate-500 font-light text-sm line-clamp-3 mb-6">Scale your grand festival logistics seamlessly with our advanced premium production services.</p>
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
                    href="https://wa.me/9986146509/?text=Hello%20Spark%20Movement%20Karnataka%2C%20I%20am%20interested%20in%20your%20Festival%20Event%20services.%20Please%20provide%20more%20details."
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
};

export default Festival;
