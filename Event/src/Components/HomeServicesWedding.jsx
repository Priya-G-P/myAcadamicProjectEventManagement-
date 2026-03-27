import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";

function Wedding() {

  const navigate = useNavigate();

  // ✅ STATE
  const [Wed, setWed] = useState([]);

  // ✅ REF FOR SCROLL
  const servicesRef = useRef(null);

  // ✅ FETCH FROM DB
  useEffect(() => {
    fetch("https://localhost:7276/api/servicesTable/all")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          s => s.servicesCategoryid === 1
        );
        setWed(filtered);
      });
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-screen h-[650px] relative">
        <img src="ServicesBG.jpg" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="px-10 text-white max-w-2xl">
            <h1 className="text-4xl md:text-4xl font-bold mb-4">
              Wedding Planners in Karnataka
            </h1>

            <p className="mb-6 text-lg">
              Planning a wedding can be exciting but overwhelming.
            </p>

            <div className="flex gap-4">

              {/* ✅ SCROLL BUTTON */}
              <button
                onClick={() =>
                  servicesRef.current.scrollIntoView({ behavior: "smooth" })
                }
                className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg"
              >
                Book Now
              </button>

              <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg">
                Whatsapp Enquiry
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="min-h-[600px] px-10 py-25 bg-pink-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Enchanting Weddings</h2>
            <p className="text-gray-600">
              We turn your special moments into timeless memories.
            </p>
          </div>

          <img
            src="ServicesImg.jpg"
            className="w-full max-w-md mx-auto h-[500px] object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section ref={servicesRef} className="w-screen px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {Wed.map((item) => (
            <div
              key={item.servicesid}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >

              <img
                src={item.imageurl}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {item.servicesName}
                </h3>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate("/imageviewer", {
                        state: {
                          service: item,
                          serviceId: item.servicesid
                        }
                      })
                    }
                    className="border border-purple-500 text-purple-500 px-4 py-2 rounded-full"
                  >
                    Book Now
                  </button>

                  <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                    Whatsapp Enquiry
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Wedding;