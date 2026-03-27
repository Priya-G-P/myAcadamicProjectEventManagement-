import React, { useEffect, useState, useRef } from "react";   // ✅ added useRef
import { useNavigate } from "react-router-dom";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";

function Festival() {

  const navigate = useNavigate();
  const [Fes, setFes] = useState([]);

  // ✅ REF FOR SCROLL
  const servicesRef = useRef(null);

  // ✅ FETCH
  useEffect(() => {
    fetch("https://localhost:7276/api/servicesTable/all")
      .then(res => res.json())
      .then(data => {
        setFes(data.filter(s => s.servicesCategoryid === 3));
      });
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
        <Navbar />

      {/* HERO SECTION */}
      <section className="w-screen h-[650px] relative">
        <img src="festival1.png" alt="Festival" className="w-full h-[650px] object-cover"/>

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="px-10 text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Festivals of Joy and Culture
            </h1>

            <p className="mb-6 text-lg">
              Festivals are special occasions celebrated to express joy, devotion, culture, and unity among people.
            </p>

            <div className="flex gap-4">

              {/* ✅ ONLY CHANGE (SCROLL FUNCTION) */}
              <button
                onClick={() =>
                  servicesRef.current.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-purple-500 px-6 py-3 rounded-full"
              >
               Book now 
              </button>

              <button className="bg-green-500 px-6 py-3 rounded-full">
                Whatsapp Us
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="min-h-[600px] px-10 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    {/* Text */}
                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4">Creating magical festival </h2>

                        <p className="text-gray-600 mb-4">
                            At Enchanting Weddings, we turn your special moments into timeless memories.
                            Every wedding we create is thoughtfully planned, beautifully designed, and
                            perfectly executed to reflect your unique love story.
                        </p>

                        <p className="text-gray-600 mb-4">
                            From elegant décor and exquisite catering to seamless event coordination,
                            our experienced team ensures that every detail is handled with care and
                            precision.
                        </p>

                        <p className="text-gray-600 mb-4">
                            We listen to your ideas, understand your vision and budget, and transform
                            them into a personalized wedding experience you and your guests will cherish forever.
                        </p>

                        <p className="text-gray-600">
                            We listen to your ideas, understand your vision and budget, and transform
                            them into a personalized wedding experience you and your guests will cherish forever.
                        </p>
                    </div>

                    {/* Image */}
                    <img
                        src="/FestText.jpg"
                        alt="About"
                        className="order-1 md:order-2 w-full max-w-md mx-auto h-[500px] object-cover rounded-2xl"
                    />

                </div>
            </section>



      {/* SERVICES SECTION */}
      {/* ✅ ADD REF HERE */}
      <section ref={servicesRef} className="w-screen px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {Fes.map((item) => (
            <div
              key={item.servicesid}
              className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <img src={item.imageurl} className="w-full h-56 object-cover"/>

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

      <Footer/>
    </div>
  );
};

export default Festival;