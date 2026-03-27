import React from "react";
import sparkLogo from "../assets/spark.jpg";// ✅ adjust path correctly

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 px-4 md:px-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Social Icons */}
        <div className="flex justify-center items-center space-x-6 text-xl pb-4 border-b border-neutral-700">
          <a href="#" aria-label="Instagram" className="hover:text-white transition-colors duration-200">
            {/* Instagram Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" aria-label="YouTube" className="hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="2" width="12" height="20" rx="4" />
              <path d="M10 8l4 4-4 4" />
            </svg>
          </a>
          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>

        {/* Logo + About */}
        <div className="text-center">
          <h2 className="text-2xl md:text-6xl font-bold text-white mb-6">
            <div className="text-white">Spark Movement </div>
          </h2>
          <img src={sparkLogo} alt="Spark Logo" className="mx-auto w-40 mb-6 rounded-full " />
          <p className="text-sm leading-relaxed max-w-4xl mx-auto">
            Planning a full event has never been easier! Spark® Movement, an ISO 9001:2015
            Certified Event Management Company based in Karnataka, India, offers a wide
            range of services to make your events stress-free and memorable. From premium
            corporate events and destination weddings to small-scale birthday parties and
            private gatherings, we’ve got it all covered.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mt-10 ml-70 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-lg text-white mb-3">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-3">SERVICES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Wedding Events</a></li>
              <li><a href="#" className="hover:text-white">Birthday Parties</a></li>
              <li><a href="#" className="hover:text-white">Festival Events</a></li>
              <li><a href="#" className="hover:text-white">Corporate Events</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-3">OTHER LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
