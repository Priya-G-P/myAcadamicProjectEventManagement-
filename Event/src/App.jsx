import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "./Components/Login.jsx";
import Signin from "./Components/Signin.jsx";

// User Pages
import Homepage from "./Components/Homepage.jsx";
import LandingPage from "./Components/Landingpage.jsx";
import About from "./Components/HomePageAbout.jsx";
import PhotoGallery from "./Components/HomeNavGalleryPhoto.jsx";
import VideoGallery from "./Components/HomePageGalleryvideo.jsx";
import ShortsGallery from "./Components/HomePageGalleryShorts.jsx";
import Venue from "./Components/HomePageVenue.jsx";
import Wedding from "./Components/HomeServicesWedding.jsx";
import Catering from "./Components/HomePageCateringServices.jsx";
import CorparativeEvent from "./Components/HomePageCooprativeEvent.jsx";
import FestivalEvent from "./Components/HomePageFestivalEvent.jsx";
import PrivateParties from "./Components/HomePagePrivateParties.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import ImageViewer from "./Components/bookingimageviwer.jsx";
import BookingPage from "./Components/bookingfrom.jsx";
import Contact from "./Components/HomePahgeContact.jsx"

// Admin Pages
import SideNavbarAdmin from "./Admin/AdminsideNavbar.jsx";
import AdminHome from "./Admin/AdminHomepage.jsx";
import AdminSerWed from "./Admin/Adminserwed.jsx";
import AdminFest from "./Admin/AdminFest.jsx";
import AdminBookingmanagement from "./Admin/AdminBookingmangement.jsx";
import AdminservicesimgManagement from "./Admin/AdminServicesImgManagement.jsx";
import AdminSerPrivateParties from "./Admin/AdminSerPrivateParties.jsx";
import Adminsercatering from "./Admin/AdminserCatering.jsx";

const App = () => {

  // 🔥 Sidebar State (GLOBAL)
  const [isOpen, setIsOpen] = useState(true);

  // 🔥 Common Admin Layout
  const AdminLayout = (Component) => (
    <div className="flex">
      <SideNavbarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"
          }`}
      >
        {Component}
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* 👤 USER ROUTES */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery/photos" element={<PhotoGallery />} />
        <Route path="/gallery/videos" element={<VideoGallery />} />
        <Route path="/gallery/shorts" element={<ShortsGallery />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/weddingPlanning" element={<Wedding />} />
        <Route path="/cateringservices" element={<Catering />} />
        <Route path="/corparativeEvent" element={<CorparativeEvent />} />
        <Route path="/FestivalEvent" element={<FestivalEvent />} />
        <Route path="/PrivateParties" element={<PrivateParties />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/imageviewer" element={<ImageViewer />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<Contact />} /> 

        {/* 🔥 ADMIN ROUTES (FIXED) */}
        <Route path="/admin" element={AdminLayout(<AdminHome />)} />
        <Route path="/admin/booking" element={AdminLayout(<AdminBookingmanagement />)} />
        <Route path="/admin/Servicesimg" element={AdminLayout(<AdminservicesimgManagement />)} />
        <Route path="/admin/services" element={AdminLayout(<AdminSerWed />)} />
        <Route path="/admin/festival" element={AdminLayout(<AdminFest />)} />
        <Route path="/admin/PrivateParties" element={AdminLayout(<AdminSerPrivateParties />)} />
        <Route path="/admin/catering" element={AdminLayout(<Adminsercatering />)} />
      </Routes>
    </Router>
  );
};

export default App;