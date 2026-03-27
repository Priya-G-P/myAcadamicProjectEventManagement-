import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signin from "./Signin.jsx";
import Homepage from "./Homepage.jsx";
import PhotoGallery from "./HomeNavGalleryPhoto.jsx";   
import VideoGallery from "./HomePageGalleryvideo.jsx";
import ShortsGallery from "./HomePageGalleryShorts.jsx";
import LandingPage from "./Landingpage.jsx";
import Venue from "./HomePageVenue.jsx";
import Wedding from "./HomeServicesWedding.jsx";
import Catering from "./HomePageCateringServices.jsx";
import CorparativeEvent from "./HomePageCooprativeEvent.jsx";
import HomePageFestivalEvent from "./HomePageFestivalEvent.jsx";
import HomePagePrivateParties from "./HomePagePrivateParties.jsx";
import About from "./HomePageAbout.jsx";
const App = () => {
  
  return (
   <Router>
      <Routes>
        {/* Landing Page First */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* After Login */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery/photos" element={<PhotoGallery />} />  
        <Route path="/gallery/videos" element={<VideoGallery />} />
        <Route path="/gallery/shorts" element={<ShortsGallery />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/weddingPlanning" element={<Wedding />} />
        <Route path="/cateringservices" element={<Catering />} />
        <Route path="/corparativeEvent" element={<CorparativeEvent />} />
        <Route path="/FestivalEvent" element={<HomePageFestivalEvent />} />
        <Route path="/PrivateParties" element={<HomePagePrivateParties />} />
      </Routes>
    </Router>
  );
};

export default App;
