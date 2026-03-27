import React from 'react'
import EventCard from './DashBoradForAaaEvents.jsx'
import Testimonials from './userRating.jsx'
//import Login from './login.jsx'
import HomePage1 from './Homepagetext.jsx'
import Signup from './Signin.jsx'
import HomepageCards from './HomepageCards.jsx'
import Navbar from './HomePageNav.jsx'
import HomePageMain from './HomepageMain.jsx'
import Video from './Video.jsx'
import Homepagetext2 from './Homepagetext2.jsx'
import Footer from './footerPage.jsx'
const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <HomePageMain/>
      <Video/> 
      <Homepagetext2/> 
      <HomepageCards/> 
      <HomePage1/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Homepage
