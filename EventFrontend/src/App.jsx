import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./Components/ScrollToTop.jsx";

// Loading Fallback Component
const Loader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-gray-950">
    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Auth
const Login = lazy(() => import("./Components/login.jsx"));
const Signin = lazy(() => import("./Components/Signin.jsx"));

// User Pages
import Homepage from "./Components/Homepage.jsx";
import LandingPage from "./Components/Landingpage.jsx";
const About = lazy(() => import("./Components/HomePageAbout.jsx"));
const PhotoGallery = lazy(() => import("./Components/HomeNavGalleryPhoto.jsx"));
const VideoGallery = lazy(() => import("./Components/HomePageGalleryvideo.jsx"));
const ShortsGallery = lazy(() => import("./Components/HomePageGalleryShorts.jsx"));
const Venue = lazy(() => import("./Components/HomePageVenue.jsx"));
const Wedding = lazy(() => import("./Components/HomeServicesWedding.jsx"));
const Catering = lazy(() => import("./Components/HomePageCateringServices.jsx"));
const CorparativeEvent = lazy(() => import("./Components/HomePageCooprativeEvent.jsx"));
const FestivalEvent = lazy(() => import("./Components/HomePageFestivalEvent.jsx"));
const PrivateParties = lazy(() => import("./Components/HomePagePrivateParties.jsx"));
const UserProfile = lazy(() => import("./Components/UserProfile.jsx"));
const ImageViewer = lazy(() => import("./Components/bookingimageviwer.jsx"));
const BookingPage = lazy(() => import("./Components/bookingfrom.jsx"));
const Contact = lazy(() => import("./Components/HomePahgeContact.jsx"));
const FooterPage = lazy(() => import("./Components/FooterPage.jsx"));
const ServiceDetails = lazy(() => import("./Components/ServiceDetails.jsx"));
const UserBookingHistory = lazy(() => import("./Components/UserBookingHistory.jsx"));
import Footer from "./Components/Footer.jsx";

// Admin Pages
import SideNavbarAdmin from "./Admin/AdminsideNavbar.jsx";
const AdminHome = lazy(() => import("./Admin/AdminHomepage.jsx"));
const AdminSerWed = lazy(() => import("./Admin/Adminserwed.jsx"));
const AdminFest = lazy(() => import("./Admin/AdminFest.jsx"));
const AdminBookingmanagement = lazy(() => import("./Admin/AdminBookingmangement.jsx"));
const AdminservicesimgManagement = lazy(() => import("./Admin/AdminServicesImgManagement.jsx"));
const AdminSerPrivateParties = lazy(() => import("./Admin/AdminSerPrivateParties.jsx"));
const Adminsercatering = lazy(() => import("./Admin/AdminserCatering.jsx"));
const AdminStarter = lazy(() => import("./Admin/adminCatStarter.jsx"));
const AdminMainCourse = lazy(() => import("./Admin/AdmincatMainCures.jsx"));
const AdminDessert = lazy(() => import("./Admin/AdmincatDessrtes.jsx"));
const AdminContacts = lazy(() => import("./Admin/AdminContactRequests.jsx"));    
const AdminReviews = lazy(() => import("./Admin/AdminReviews.jsx"));
const AdminUsers = lazy(() => import("./Admin/AdminUsers.jsx"));

const AnimatedRoutes = ({ AdminLayout }) => {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="animate-smooth-landing w-full min-h-screen">
      <Routes location={location}>

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
        <Route path="/corporateEvent" element={<CorparativeEvent />} />
        <Route path="/FestivalEvent" element={<FestivalEvent />} />
        <Route path="/PrivateParties" element={<PrivateParties />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/imageviewer" element={<ImageViewer />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/footer" element={<FooterPage />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/booking-history" element={<UserBookingHistory />} />

        {/* ADMIN ROUTES (FIXED) */}
        <Route path="/admin" element={AdminLayout(<AdminHome />)} />
        <Route path="/admin/booking" element={AdminLayout(<AdminBookingmanagement />)} />
        <Route path="/admin/Servicesimg" element={AdminLayout(<AdminservicesimgManagement />)} />
        <Route path="/admin/services" element={AdminLayout(<AdminSerWed />)} />
        <Route path="/admin/festival" element={AdminLayout(<AdminFest />)} />
        <Route path="/admin/PrivateParties" element={AdminLayout(<AdminSerPrivateParties />)} />
        <Route path="/admin/catering" element={AdminLayout(<Adminsercatering />)} />
        <Route path="/admin-starter" element={AdminLayout(<AdminStarter />)} />
        <Route path="/admin-maincourse" element={AdminLayout(<AdminMainCourse />)} />
        <Route path="/admin-dessert" element={AdminLayout(<AdminDessert />)} />
        <Route path="/admin/contacts" element={AdminLayout(<AdminContacts />)} />
        <Route path="/admin/reviews" element={AdminLayout(<AdminReviews />)} />
        <Route path="/admin/users" element={AdminLayout(<AdminUsers />)} />
        
        {/* CATCH-ALL UNKNOWN PATHS & REDIRECT DIRECTLY TO HOME */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      
      {/* GLOBAL FOOTER (Condition: Not on Admin or Auth routes) */}
      {!location.pathname.startsWith('/admin') && 
       !['/login', '/signin', '/', '/footer'].includes(location.pathname) && (
        <Footer />
      )}
    </div>
  );
};

const App = () => {

 
  const [isOpen, setIsOpen] = useState(true);

  
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
      <ScrollToTop />
      <ToastContainer 
        position="bottom-right" 
        autoClose={4000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        pauseOnHover 
        theme="dark" 
        style={{ zIndex: 999999 }}
        toastClassName="backdrop-blur-md bg-white/10 text-white border border-white/20 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-[#0f172a]"
      />
      <Suspense fallback={<Loader />}>
        <AnimatedRoutes AdminLayout={AdminLayout} />
      </Suspense>
    </Router>
  );
};

export default App;
