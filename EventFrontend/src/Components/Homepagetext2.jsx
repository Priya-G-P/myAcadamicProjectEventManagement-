import React from 'react'

const Homepagetext2 = () => {
  return (
    <div className="bg-[#fdf7f0] min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center">

          <img
            src='src/assets/spark.png'
            className="w-60 mb-7 rounded-full object-cover"
          />
          <p className="text-lg text-yellow-600 font-bold mb-3">
            ISO 9001:2015 CERTIFIED
          </p>
          
        </div>
        
        <h1 className="text-4xl font-bold">
          EVENT MANAGEMENT COMPANY IN KARANATAKA
        </h1>
        <p className="text-1xl font-semibold mt-4 max-w-4xl mx-auto">
          Have you ever dreamed of planning the perfect event that will be remembered forever? 
          Look no further than <span className="font-semibold text-yellow-600">spark Movement</span>, the 
          top-notch event management company in Karanataka, India, that has everything you need to 
          make your occasion an unforgettable experience. We make everything from corporate 
          event planning and personal celebrations to even small customized event packages 
          absolutely memorable! Contact us today to learn more about our services and how we 
          can help you organize the top event management in Karanataka.
        </p>
        <div className="mt-6 flex items-center space-x-4">
          <div className="w-20 md:w-52 h-1 bg-yellow-600"></div>
          <span className="text-yellow-600">◆</span>
          <div className="w-20 md:w-52 h-1 bg-yellow-600"></div>
        </div>
      </div>
  )
}

export default Homepagetext2
