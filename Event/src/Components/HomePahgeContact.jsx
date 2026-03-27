import React from 'react'
import Navbar from './HomePageNav.jsx';
import Footer from './footerPage.jsx';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { SiFacebook } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";


function HomeContact() {
    return (
        <div className="w-screen min-h-screen overflow-x-hidden">
      <Navbar />
            {/* HERO SECTION */}
            <section className="w-screen h-[650px] relative">
                <img src="ContactImage.jpeg" alt="Event" className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-black/50 flex items-center">
                    <div className="px-10 text-white max-w-2xl pt-50">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="mb-6 text-lg">
                            Need help planning your next event? Look no further than Spark Movement Karnataka!
                            We can provide everything you need to ensure your event is a success.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="w-full py-20 flex flex-col items-center bg-white text-center">

                <h1 className="font-bold text-2xl md:text-3xl mb-10">
                    WANT TO WORK WITH US?
                </h1>

                <div className="space-y-10">

                    {/* Phone */}
                    <div className="flex items-center gap-6 justify-center">
                        <FaPhoneAlt className="text-purple-600 text-4xl" />
                        <div className="text-left">
                            <p className="text-gray-600 uppercase tracking-wide">
                                Talk to our client support team
                            </p>
                            <p className="font-bold text-lg">
                                +91-859-001-0011
                            </p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-6 justify-center">
                        <MdEmail className="text-purple-600 text-4xl" />
                        <div className="text-left">
                            <p className="text-gray-600 uppercase tracking-wide">
                                Write to us about your needs
                            </p>
                            <p className="font-bold text-lg">
                                sparkeventmanagement@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-evenly gap-8 mt-10 text-3xl '>
                    <div>
                        <GrInstagram className='cursor-pointer'/>
                    </div>
                    <div>
                        <SiFacebook className='cursor-pointer'/>
                    </div>
                    <div>
                        <IoLogoYoutube className='cursor-pointer'/>
                    </div>   
                    <div>
                        <IoLogoTwitter className='cursor-pointer'/>
                    </div>
                </div>

            </section>
            <Footer />

        </div>
    )
};
export default HomeContact