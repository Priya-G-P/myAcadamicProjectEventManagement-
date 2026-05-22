import React from "react";
import Navbar from "./HomePageNav.jsx";

const About = () => {
  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center">
        <img
          src="/about.jpeg"
          alt="About Spark Movement"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

        <div className="relative text-center px-6 z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-200">Spark Movement</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            Creating unforgettable memories mapped with passion, pristine creativity, and sheer elegance.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 md:px-20 grid md:grid-cols-2 gap-16 items-center bg-white relative">
        <div className="relative z-10">
          <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Welcome to our world</h2>
          <h3 className="text-3xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">
            Our <span className="text-sky-600">Story</span>
          </h3>
          <p className="text-lg text-slate-600 font-light leading-relaxed mb-6">
            Spark Movement was explicitly founded with a grand vision to transform ordinary events into extraordinary, unforgettable experiences. From intimate elopements to remarkably grand celebrations, we believe every event demands a uniquely luxurious touch.
          </p>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Our team marries pure creativity with pinpoint precision and passion to design events that perfectly reflect your personality and style. We do not simply plan events — we painstakingly orchestrate memories engineered to last a lifetime.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-[3rem] -translate-x-6 translate-y-6"></div>
          <img
            src="/gallery8.jpeg"
            alt="About"
            className="relative z-10 w-full max-w-md mx-auto h-[500px] object-cover rounded-[3rem] shadow-2xl"
          />
        </div>
      </section>

      {/* Vision & Mission Section Container */}
      <section className="py-24 px-6 md:px-20 bg-slate-50 relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-300/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto relative z-10">
          {/* Vision */}
          <div className="bg-white p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_25px_50px_rgba(29,78,216,0.08)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
              Our <span className="text-sky-500">Vision</span>
            </h2>
            <p className="text-slate-600 font-light leading-relaxed text-lg">
              To ultimately become the undisputed most trusted and universally renowned event management company, known specifically for transforming celebrations into sophisticated lifetime memories. We aim to inject elegance and perfection into every fiber of the events we design.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_25px_50px_rgba(29,78,216,0.08)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
              Our <span className="text-sky-500">Mission</span>
            </h2>
            <p className="text-slate-600 font-light leading-relaxed text-lg">
              Our unyielding mission is to deliver deeply satisfying event experiences through highly personalized planning, microscopic attention to detail, and seamless, fluid execution. We focus immensely on understanding our clients’ grandest dreams and expertly manifesting them into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-24 px-6 md:px-20">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">The Spark Difference</h2>
          <h3 className="text-3xl md:text-3xl font-extrabold text-slate-900 mb-6">
            Why <span className="text-sky-600">Choose Us</span>
          </h3>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            We turn your grandest dreams into beautifully organized, breathtaking celebrations. Here's what sets our premium services apart.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-center max-w-7xl mx-auto">
          <div className="group bg-slate-50 p-10 rounded-[2rem] hover:bg-sky-400 transition-colors duration-500 cursor-default">
            <h3 className="text-2xl font-bold mb-4 text-sky-800 group-hover:text-white transition-colors duration-500">
              Creative Design
            </h3>
            <p className="text-slate-600 font-light leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
              Unique, bespoke themes alongside highly personalized decor tailored precisely to your exact vision and aesthetics.
            </p>
          </div>

          <div className="group bg-slate-50 p-10 rounded-[2rem] hover:bg-sky-400 transition-colors duration-500 cursor-default">
            <h3 className="text-2xl font-bold mb-4 text-sky-800 group-hover:text-white transition-colors duration-500">
              Perfect Planning
            </h3>
            <p className="text-slate-600 font-light leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
              Highly detailed, rigorous coordination ensuring absolutely everything runs entirely smoothly, from start to glamorous finish.
            </p>
          </div>

          <div className="group bg-slate-50 p-10 rounded-[2rem] hover:bg-sky-400 transition-colors duration-500 cursor-default">
            <h3 className="text-2xl font-bold mb-4 text-sky-800 group-hover:text-white transition-colors duration-500">
              Trusted Team
            </h3>
            <p className="text-slate-600 font-light leading-relaxed group-hover:text-blue-100 transition-colors duration-500">
              A robust collection of professional experts strictly dedicated to making your event breathtakingly flawless.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="mb-24 mt-8 py-24 px-6 md:px-20 text-center bg-sky-500 text-white rounded-[3rem] max-w-7xl mx-auto relative overflow-hidden shadow-[0_20px_50px_rgba(29,78,216,0.3)]">
        <div className="absolute inset-0 bg-[url('/about.jpeg')] opacity-10 mix-blend-overlay object-cover"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 drop-shadow-md">
            Let’s Plan Your Special Day Together
          </h2>
          <p className="text-xl font-light text-blue-100 mb-10 max-w-2xl mx-auto">Take the very first step toward curating the most spectacular event of your lifetime. Reach out today.</p>
          <button className="bg-white text-sky-700 font-bold px-10 py-5 rounded-full shadow-2xl hover:scale-105 hover:bg-blue-50 transition-all duration-300">
            Contact Our Planners Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
