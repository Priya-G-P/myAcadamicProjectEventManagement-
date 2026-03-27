import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import UserProfile from "./UserProfile"; // ✅ IMPORT

const Navbar = () => {

  const [openGallery, setOpenGallery] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const [showProfile, setShowProfile] = useState(false); // ✅ NEW

  const navigate = useNavigate();

  const toggleGallery = () => {
    setOpenGallery(!openGallery);
    setOpenServices(false);
    setOpenProfile(false);
  };

  const toggleServices = () => {
    setOpenServices(!openServices);
    setOpenGallery(false);
    setOpenProfile(false);
  };

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
    setOpenGallery(false);
    setOpenServices(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 py-4 text-white z-[9999]">

        {/* Logo */}
        <div className="flex items-center mb-4 sm:mb-0 z-[10000] gap-2">
          <img src="/spark.jpg" className="h-12 w-12 rounded-full ring-2 ring-white/80 shadow-lg hover:scale-125 transition"/>
          <p className="text-2xl italic font-bold">Spark Movement</p>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-4 md:gap-10 text-sm sm:text-lg uppercase relative z-[10000]">

          <li><Link to="/home" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-400">About</Link></li>

          {/* SERVICES */}
          <li className="relative">
            <button onClick={toggleServices} className="hover:text-pink-400">SERVICES</button>

            {openServices && (
              <div className="absolute top-8 left-0 w-56 bg-black/40 backdrop-blur-md rounded-md shadow-lg z-[10001]">
                <Link to="/weddingPlanning" className="block px-4 py-3 hover:bg-white/10">Wedding planning</Link>
                <Link to="/cateringservices" className="block px-4 py-3 hover:bg-white/10">Catering services</Link>
                <Link to="/corparativeEvent" className="block px-4 py-3 hover:bg-white/10">Corporate Event</Link>
                <Link to="/PrivateParties" className="block px-4 py-3 hover:bg-white/10">Private parties</Link>
                <Link to="/FestivalEvent" className="block px-4 py-3 hover:bg-white/10">Festival Events</Link>
              </div>
            )}
          </li>

          <li><Link to="/venue" className="hover:text-blue-400">VENUE</Link></li>
          <li>
            <Link to="/contact" className="hover:text-blue-400">CONTACT</Link>
          </li>

          {/* GALLERY */}
          <li className="relative">
            <button onClick={toggleGallery} className="hover:text-pink-400">GALLERY</button>

            {openGallery && (
              <div className="absolute top-8 left-0 w-56 bg-black/40 backdrop-blur-md rounded-md shadow-lg z-[10001]">
                <Link to="/gallery/photos" className="block px-4 py-3 hover:bg-white/10">Photo Gallery</Link>
                <Link to="/gallery/videos" className="block px-4 py-3 hover:bg-white/10">Video Gallery</Link>
                <Link to="/gallery/shorts" className="block px-4 py-3 hover:bg-white/10">Shorts Gallery</Link>
              </div>
            )}
          </li>

          {/* PROFILE */}
          <li className="relative">
            <FaUserCircle
              size={28}
              className="cursor-pointer hover:text-yellow-400"
              onClick={() => setShowProfile(true)} // ✅ OPEN MODAL
            />
          </li>

        </ul>
      </nav>

       


      {/* ✅ PROFILE OVERLAY */}
      {showProfile && (
        <div
          className="fixed inset-0 bg-black/30 flex justify-end items-start pt-20 pr-6 z-[10000]"
          onClick={() => setShowProfile(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UserProfile />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;