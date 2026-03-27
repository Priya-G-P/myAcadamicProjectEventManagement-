import React from "react";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";
const About = () => {
  return (
    <div className="w-full bg-white text-gray-800">
        <Navbar />  
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center">
        <img
          src="/about.jpeg"   
          alt="About Spark Movement"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">
            About <span className="text-purple-500">Spark Movement</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Creating unforgettable memories with passion, creativity, and elegance.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center bg-pink-100">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Our <span className="text-purple-500">Story</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Spark Movement was founded with a vision to transform ordinary events
            into extraordinary experiences. From intimate weddings to grand celebrations,
            we believe every event deserves a unique touch.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our team combines creativity, precision, and passion to design events
            that reflect your personality and style. We don’t just plan events —
            we create memories that last a lifetime.
          </p>
        </div>

        <div>
          <img
                        src="/gallery8.jpeg"
                        alt="About"
                        className="order-1 md:order-2 w-full max-w-md mx-auto h-[500px] object-cover rounded-2xl"
                    />
        </div>
      </section>
      {/* Vision & Mission Section */}
<section className="py-20 px-6 md:px-20 bg-gray-50">
  <div className="grid md:grid-cols-2 gap-12 items-center">

    {/* Vision */}
    <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition">
      <h2 className="text-3xl font-bold mb-6">
        Our <span className="text-purple-500">Vision</span>
      </h2>
      <p className="text-gray-600 leading-relaxed">
        To become the most trusted and innovative event management company,
        known for transforming celebrations into unforgettable lifetime memories.
        We aim to bring elegance, creativity, and perfection into every event we design.
      </p>
    </div>

    {/* Mission */}
    <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition">
      <h2 className="text-3xl font-bold mb-6">
        Our <span className="text-purple-500">Mission</span>
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Our mission is to deliver exceptional event experiences through
        personalized planning, attention to detail, and seamless execution.
        We focus on understanding our clients’ dreams and turning them into reality.
      </p>
    </div>

  </div>
</section>


      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            Why <span className="text-purple-500">Choose Us</span>
          </h2>
          <p className="text-gray-500 mt-4">
            We turn your dreams into beautifully organized celebrations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              Creative Design
            </h3>
            <p className="text-gray-600">
              Unique themes and personalized decor tailored to your vision.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              Perfect Planning
            </h3>
            <p className="text-gray-600">
              Detailed coordination ensuring everything runs smoothly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              Trusted Team
            </h3>
            <p className="text-gray-600">
              Professional experts dedicated to making your event flawless.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className=" mb-20 py-20 px-6 md:px-20 text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Let’s Plan Your Special Day Together
        </h2>
        <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition">
          Contact Us
        </button>
      </section>
    
        <Footer />
    </div>
  );
};

export default About;
