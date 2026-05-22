import React, { useEffect } from "react";
import Navbar from "./HomePageNav.jsx";
import Footer from "./Footer.jsx";

const FooterPage = () => {
  // Scroll to top when this page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero-like content to make the footer feel like a page */}
      <div className="flex-1 flex flex-col pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-semibold mb-6 animate-pulse">
            ✦ Site Directory ✦
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Spark Movement</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            From planning grand celebrations to managing corporate events, find everything you need to know about our services, gallery, and contact information below.
          </p>
        </div>

        {/* This page IS the footer, just with some extra context at the top */}
      </div>

      <Footer />
    </div>
  );
};

export default FooterPage;
