import React, { useState } from 'react';
import Navbar from './HomePageNav.jsx';
import { toast } from "react-toastify";
import { FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { SiFacebook } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";

function HomeContact() {
    const [formData, setFormData] = useState({ Name: "", Email: "", EventType: "", Message: "" });
    return (
        <div className="w-screen min-h-screen bg-slate-50 overflow-x-hidden font-sans text-slate-800">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative w-screen h-[85vh] md:h-[50vh]">
                <img src="ContactImage.jpeg" alt="Contact Us" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-blue-900/60 flex items-center">
                    <div className="max-w-7xl mx-auto px-10 w-full text-white text-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md">Say <span className="text-blue-300">Hello.</span></h1>
                        <p className="mb-6 text-xl font-light text-slate-200 max-w-2xl mx-auto">
                            Need help planning your next legendary event? Reach out to Spark Movement.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION WITH INNOVATIVE REQUIREMENT CARD */}
            <section className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 relative">

                {/* Information Side */}
                <div className="flex flex-col justify-center space-y-12">
                    <div>
                        <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-2">Connect With Us</h2>
                        <h1 className="font-extrabold text-3xl md:text-4xl text-slate-900 leading-tight">
                            Ready to craft your <br /><span className="text-sky-600">dream event?</span>
                        </h1>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-sky-500 text-2xl group-hover:bg-sky-400 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <p className="text-slate-500 font-light text-sm uppercase tracking-widest mb-1">Direct Line</p>
                                <p className="font-bold text-xl text-slate-800">+91-859-001-0011</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-sky-500 text-3xl group-hover:bg-sky-400 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                                <MdEmail />
                            </div>
                            <div>
                                <p className="text-slate-500 font-light text-sm uppercase tracking-widest mb-1">Email Us</p>
                                <p className="font-bold text-lg text-slate-800">sparkeventmanagement@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-sky-500 text-3xl group-hover:bg-sky-400 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                                <MdLocationOn />
                            </div>
                            <div>
                                <p className="text-slate-500 font-light text-sm uppercase tracking-widest mb-1">Headquarters</p>
                                <p className="font-bold text-lg text-slate-800">Bangalore, Karnataka, India</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className='flex gap-6 mt-4'>
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-400 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-sm">
                            <GrInstagram className="text-xl" />
                        </div>
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-400 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-sm">
                            <SiFacebook className="text-xl" />
                        </div>
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-400 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-sm">
                            <IoLogoYoutube className="text-xl" />
                        </div>
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-400 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-sm">
                            <IoLogoTwitter className="text-xl" />
                        </div>
                    </div>
                </div>

                {/* Innovative Requirement Input Card Side */}
                <div className="relative">
                    {/* Decorative backdrop glow */}
                    <div className="absolute inset-0 bg-blue-400/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>

                    <div className="bg-white/80 backdrop-blur-2xl border border-white/40 p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(29,78,216,0.1)] relative">
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Event Requirements</h3>
                        <p className="text-slate-500 font-light mb-8">Send us your thoughts and we will sculpt the perfect proposal.</p>

                        <form className="space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            if(!formData.Name || !formData.Email || !formData.Message) {
                               toast.warning("Please fill all required fields!");
                               return;
                            }
                            fetch("http://localhost:5238/api/Contact/add", {
                                method: "POST",
                                headers: { "Content-Type" : "application/json" },
                                body: JSON.stringify(formData)
                            }).then(res => {
                                if(res.ok) {
                                   toast.success("Request sent successfully! Our team will contact you shortly.");
                                   setFormData({ Name: "", Email: "", EventType: "", Message: "" });
                                } else {
                                   toast.error("Failed to send request.");
                                }
                            });
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name *</label>
                                    <input 
                                       value={formData.Name} onChange={e => setFormData({...formData, Name: e.target.value})}
                                       type="text" placeholder="John Doe" 
                                       className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address *</label>
                                    <input 
                                       value={formData.Email} onChange={e => setFormData({...formData, Email: e.target.value})}
                                       type="email" placeholder="john@example.com" 
                                       className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Event Type</label>
                                <select 
                                   value={formData.EventType} onChange={e => setFormData({...formData, EventType: e.target.value})}
                                   className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700">
                                    <option value="">Select an event category...</option>
                                    <option value="Wedding Planning">Wedding Planning</option>
                                    <option value="Corporate Retreat">Corporate Retreat</option>
                                    <option value="Private Party">Private Party</option>
                                    <option value="Festival">Festival / Carnival</option>
                                    <option value="Other">Other / Custom</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Vision & Requirements *</label>
                                <textarea 
                                   value={formData.Message} onChange={e => setFormData({...formData, Message: e.target.value})}
                                   rows="4" placeholder="Tell us about your estimated guest count, theme, and specific wishes..." 
                                   className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-3">
                                Submit Request <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>

            </section>
        </div>
    )
};
export default HomeContact;
