import React, { useEffect, useState, useRef } from "react";   // ✅ added useRef
import { useNavigate } from "react-router-dom";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";

export default function Wedding() {

  const navigate = useNavigate();
  const [Services, setServices] = useState([]);

  // ✅ REF FOR SCROLL
  const servicesRef = useRef(null);

  // ✅ FETCH FROM DB
  useEffect(() => {
    fetch("https://localhost:7276/api/servicesTable/all")
      .then(res => res.json())
      .then(data => {
        setServices(data.filter(s => s.servicesCategoryid === 2));
      });
  }, []);

  return (
   <div className="w-screen min-h-screen overflow-x-hidden">
        <Navbar />

      {/* HERO SECTION */}
      <section className="w-screen h-[650px] relative">
        <img
          src="PrivateParties1.jpeg"
          alt="Wedding"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="px-10 text-white max-w-2xl">
            <h1 className="text-4xl md:text-4xl font-bold mb-4">
              Private Parties Karnataka
            </h1>

            <p className="mb-6 text-lg">
              Spark Movement Event Management in Karnataka holds Private Parties...
            </p>

            <div className="flex gap-4">

              {/* ✅ SCROLL BUTTON (ONLY CHANGE) */}
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
      <section className="min-h-[600px] px-10 py-25 bg-pink-100">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    {/* Text */}
                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4">Enchanting Weddings</h2>

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
                        src="PrivatePartiesimg.jpeg"
                        alt="About"
                        className="order-1 md:order-2 w-full max-w-md mx-auto h-[500px] object-cover rounded-2xl"
                    />

                </div>
            </section>

      {/* SERVICES SECTION */}
      {/* ✅ ADD REF HERE */}
      <section ref={servicesRef} className="w-screen px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {Services.map((item) => (
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

      <Footer />
    </div>
  );
}