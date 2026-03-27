import React from 'react'
import HomePage1 from './Components/Homepagetext.jsx'
import EventCard from './Components/DashBoradForAaaEvents.jsx'
import Testimonials from './Components/userRating.jsx'
import UserRouter from './Components/Router.jsx'
import Signup from './Components/Signin.jsx'
import HomepageCards from './Components/HomepageCards.jsx'
import HomePageMain from './Components/HomepageMain.jsx'
import AdminDashboard from './Components/AdminDashboard.jsx'
import SideNavbarAdmin from './Admin/AdminsideNavbar.jsx'
import AdminSerWed from './Admin/Adminserwed.jsx' 
import Home from './Admin/AdminHomepage.jsx'
import Adminserfest from './Admin/AdminFest.jsx'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
const App = () => {
  return (
 <Router>
      <div className="flex">   
        
        {/* Sidebar */}
        <SideNavbarAdmin />

        {/* Right Side Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/services" element={<AdminSerWed />} />
             <Route path="/admin/Festival" element={<Adminserfest />} />
          </Routes>
        </div>

      </div>
    </Router>
  )

}

export default App