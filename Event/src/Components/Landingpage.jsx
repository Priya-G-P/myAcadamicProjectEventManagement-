import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/landingPage.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/50 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
          Welcome to Our Website
        </h1>

        <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl">
          Create your account and explore amazing features.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">

          <button
            onClick={() => navigate("/signin")}
            className="px-8 py-3 rounded-full font-semibold 
            bg-white/10 backdrop-blur-md border border-white/30 
            hover:bg-purple-700 hover:text-White hover:scale-110
            transition duration-300"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-full font-semibold 
            bg-white/10 backdrop-blur-md border border-white/30 
            hover:bg-purple-700 hover:text-White hover:scale-110
            transition duration-300"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default LandingPage;