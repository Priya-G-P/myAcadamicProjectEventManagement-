import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCalendarCheck, FaUtensils, FaStar, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const InputWrapper = ({ children, className = "" }) => (
  <div className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:bg-white/10 transition-all duration-300 shadow-inner ${className}`}>
      {children}
  </div>
);

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const container = useRef();

  const service = location.state?.service;
  const selectedImage = location.state?.selectedImage;
  const cateringRecommended = location.state?.cateringRecommended; // from ServiceDetails

  const [formData, setFormData] = useState({
    UserName: "",
    PhoneNumber: "",
    Address: "",
    date: "",
    numberofGuset: "",
    numberofdays: "",
    functionType: ""
  });

  const [isCatering, setIsCatering] = useState(cateringRecommended || false);

  const [starters, setStarters] = useState([]);
  const [mainCourse, setMainCourse] = useState([]);
  const [desserts, setDesserts] = useState([]);

  const [selectedFood, setSelectedFood] = useState({
    starter: "",
    main: "",
    dessert: ""
  });

  useEffect(() => {
    fetch("http://localhost:5238/api/Catering/starters")
      .then(res => res.json()).then(setStarters);

    fetch("http://localhost:5238/api/Catering/maincourse")
      .then(res => res.json()).then(setMainCourse);

    fetch("http://localhost:5238/api/Catering/desserts")
      .then(res => res.json()).then(setDesserts);
  }, []);

  useGSAP(() => {
    gsap.fromTo(".booking-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".booking-card",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
    gsap.fromTo(".anim-item",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.5 }
    );
  }, { scope: container });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFoodSelect = (type, value) => {
    setSelectedFood({ ...selectedFood, [type]: value });
  };

  const handleSubmit = async () => {
    if (!formData.UserName || !formData.PhoneNumber) {
      toast.warning("Full Name and Phone Number are required.");
      return;
    }

    if (isCatering) {
      if (!selectedFood.starter || !selectedFood.main || !selectedFood.dessert) {
        toast.warning("Please select a Starter, Main Course, and Dessert.");
        return;
      }
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const payload = {
      uid: user.userId || 0,
      UserName: formData.UserName,
      PhoneNumber: formData.PhoneNumber,
      Address: formData.Address,
      date: new Date(formData.date).toISOString(),
      numberofGuset: Number(formData.numberofGuset),
      numberofdays: Number(formData.numberofdays),
      functionType: formData.functionType,
      image: selectedImage?.imageBase64
        ? `data:image/jpeg;base64,${selectedImage.imageBase64}`
        : selectedImage?.image,
      serviceName: service?.servicesName || service?.Title || location.state?.selectedService || "",
      status: "Pending",
      cateringItems: isCatering
        ? `Starter: ${selectedFood.starter}, Main: ${selectedFood.main}, Dessert: ${selectedFood.dessert}`
        : ""
    };

    try {
      const res = await fetch("http://localhost:5238/api/Booking/addBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const text = await res.text();

      if (res.ok) {
        toast.success("Event Booked Spectacularly! 🎉 We will be in touch shortly.");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error("Oops! Something went wrong: " + text);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server connection lost. Please try again.");
    }
  };

  const payloadServiceName = () => {
    return service?.servicesName || service?.Title || location.state?.selectedService || "Premium Booking";
  };

  return (
    <div ref={container} className="min-h-screen relative flex items-center justify-center p-4 md:p-8 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 font-sans overflow-x-hidden">

      <ToastContainer theme="dark" position="top-center" />

      {/* GLOWING ORBS */}
      <div className="absolute top-[5%] left-[20%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[0%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-6xl z-10 pt-20 pb-10">

        <div className="booking-header text-center mb-10">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 rounded-2xl shadow-lg mb-6 backdrop-blur-md">
              <FaCalendarCheck className="text-3xl text-indigo-400" />
           </div>
           <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 tracking-tight">
              Finalize Your Event
           </h2>
           <p className="text-slate-400 mt-4 text-lg">Secure your dates and configure your premium service requirements.</p>
        </div>

        {/* GLASS CARD */}
        <div className="booking-card bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-8 md:p-12">

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">

            {/* LEFT SIDE: SUMMARY */}
            <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
              
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mb-8">
                 <h3 className="text-slate-300 font-medium text-sm tracking-widest uppercase mb-1 drop-shadow-sm">Selected Tier</h3>
                 <h2 className="text-3xl font-extrabold text-white">
                    {payloadServiceName()}
                 </h2>
                 <div className="flex items-center gap-2 mt-4 text-xs font-bold text-amber-400 bg-amber-400/10 w-max px-3 py-1 rounded-full border border-amber-400/20">
                     <FaStar /> EXCLUSIVE PACKAGE
                 </div>
              </div>

              {selectedImage && (
                <div className="rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80 z-10"></div>
                    <img
                        src={
                        selectedImage?.imageBase64
                            ? `data:image/jpeg;base64,${selectedImage.imageBase64}`
                            : selectedImage?.image
                        }
                        className="w-full h-[350px] object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt="Selected Concept"
                    />
                    <div className="absolute bottom-4 left-4 z-20 text-white font-medium text-sm px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg">
                        Selected Inspiration
                    </div>
                </div>
              )}
              
              {!selectedImage && (
                  <div className="bg-white/5 border border-white/5 rounded-3xl h-[350px] flex items-center justify-center text-slate-500 flex-col gap-4 text-center p-6">
                      <FaCalendarCheck className="text-4xl opacity-50" />
                      Standard platform booking.<br/>No specific visual inspiration attached.
                  </div>
              )}
            </div>

            {/* RIGHT SIDE: RESERVATION FORM */}
            <div className="flex flex-col gap-5">
              
              <h3 className="text-xl font-bold text-white mb-2 anim-item">Client Details</h3>

              <InputWrapper className="anim-item">
                  <input name="UserName" placeholder="Full Name"
                    value={formData.UserName}
                    onChange={handleChange}
                    className="w-full p-4 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:ring-0 outline-none" />
              </InputWrapper>

              <InputWrapper className="anim-item">
                  <input name="PhoneNumber" placeholder="Contact Number"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    className="w-full p-4 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:ring-0 outline-none" />
              </InputWrapper>

              <InputWrapper className="anim-item">
                  <input name="Address" placeholder="Location / Address"
                    value={formData.Address}
                    onChange={handleChange}
                    className="w-full p-4 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:ring-0 outline-none" />
              </InputWrapper>

              <div className="grid grid-cols-2 gap-5 anim-item pt-2 border-t border-white/5">
                <div>
                   <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Date of Event</label>
                   <InputWrapper>
                       <input type="date" name="date"
                         value={formData.date}
                         onChange={handleChange}
                         className="w-full p-3.5 bg-transparent border-none text-slate-100 outline-none block appearance-none color-scheme-dark" />
                   </InputWrapper>
                </div>

                <div>
                   <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Total Guests</label>
                   <InputWrapper>
                       <input type="number" name="numberofGuset"
                         value={formData.numberofGuset}
                         placeholder="e.g. 200"
                         onChange={handleChange}
                         className="w-full p-3.5 bg-transparent border-none text-slate-100 placeholder-slate-500 outline-none" />
                   </InputWrapper>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 anim-item">
                <div>
                   <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Duration</label>
                   <InputWrapper>
                       <input type="number" name="numberofdays"
                         value={formData.numberofdays}
                         placeholder="Days"
                         onChange={handleChange}
                         className="w-full p-3.5 bg-transparent border-none text-slate-100 placeholder-slate-500 outline-none" />
                   </InputWrapper>
                </div>

                <div>
                   <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Event Type</label>
                   <InputWrapper>
                       <select name="functionType"
                         onChange={handleChange}
                         className="w-full p-3.5 bg-transparent border-none text-slate-100 focus:ring-0 outline-none appearance-none cursor-pointer">
                         <option className="bg-slate-900 text-slate-100" value="">Select Topic...</option>
                         <option className="bg-slate-900 text-slate-100" value="Wedding Planning">Wedding</option>
                         <option className="bg-slate-900 text-slate-100" value="Private parties">Private Party</option>
                         <option className="bg-slate-900 text-slate-100" value="Festival Event">Festival</option>
                         <option className="bg-slate-900 text-slate-100" value="Corporate Event">Corporate</option>
                       </select>
                   </InputWrapper>
                </div>
              </div>

              {/* Catering Required Premium Toggle */}
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 mt-4 anim-item relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                   <FaUtensils className="text-6xl text-white" />
                </div>
                
                <h4 className="font-bold text-white mb-1">Catering Integration</h4>
                <p className="text-slate-400 text-sm mb-5">Would you like us to manage the culinary experience?</p>
                
                <div className="flex gap-4 relative z-10 w-full sm:w-2/3">
                  <button 
                     type="button" 
                     onClick={() => setIsCatering(true)} 
                     className={`py-3 flex-1 rounded-xl font-bold transition-all duration-300 text-sm ${isCatering ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400/50 translate-x-1' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/10'}`}
                  >
                     Yes, Include Catering
                  </button>
                  <button 
                     type="button" 
                     onClick={() => setIsCatering(false)} 
                     className={`py-3 flex-1 rounded-xl font-bold transition-all duration-300 text-sm ${!isCatering ? 'bg-white/10 text-slate-200 border border-white/20 shadow-inner' : 'bg-transparent text-slate-500 hover:text-slate-300 border border-transparent'}`}
                  >
                     No Thanks
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* CATERING MENU EXPANDABLE SECTION */}
          <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCatering ? "max-h-[800px] mt-10 opacity-100" : "max-h-0 mt-0 opacity-0"}`}>
            <div className="border-t border-white/10 pt-8 pb-4">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <FaUtensils className="text-emerald-400" /> Executive Menu Selection
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                
                    {/* Starter */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h4 className="font-bold text-emerald-400 uppercase tracking-widest text-xs mb-4">Start</h4>
                        <div className="space-y-3">
                            {starters.map(i => (
                            <label key={i.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedFood.starter === i.itemName ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-100" : "border-white/5 text-slate-300 hover:border-white/20"}`}>
                                <input type="radio" className="hidden" name="starter-group" checked={selectedFood.starter === i.itemName} onChange={() => handleFoodSelect("starter", i.itemName)} />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedFood.starter === i.itemName ? "border-emerald-400" : "border-slate-500"}`}>
                                    {selectedFood.starter === i.itemName && <div className="w-2 h-2 rounded-full bg-emerald-400"></div>}
                                </div>
                                <span className="font-medium text-sm">{i.itemName}</span>
                            </label>
                            ))}
                        </div>
                    </div>

                    {/* Main Course */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h4 className="font-bold text-amber-400 uppercase tracking-widest text-xs mb-4">Main</h4>
                        <div className="space-y-3">
                            {mainCourse.map(i => (
                            <label key={i.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedFood.main === i.itemName ? "border-amber-500/50 bg-amber-500/10 text-amber-100" : "border-white/5 text-slate-300 hover:border-white/20"}`}>
                                <input type="radio" className="hidden" name="main-group" checked={selectedFood.main === i.itemName} onChange={() => handleFoodSelect("main", i.itemName)} />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedFood.main === i.itemName ? "border-amber-400" : "border-slate-500"}`}>
                                    {selectedFood.main === i.itemName && <div className="w-2 h-2 rounded-full bg-amber-400"></div>}
                                </div>
                                <span className="font-medium text-sm">{i.itemName}</span>
                            </label>
                            ))}
                        </div>
                    </div>

                    {/* Dessert */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h4 className="font-bold text-pink-400 uppercase tracking-widest text-xs mb-4">Finish</h4>
                        <div className="space-y-3">
                            {desserts.map(i => (
                            <label key={i.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedFood.dessert === i.itemName ? "border-pink-500/50 bg-pink-500/10 text-pink-100" : "border-white/5 text-slate-300 hover:border-white/20"}`}>
                                <input type="radio" className="hidden" name="dessert-group" checked={selectedFood.dessert === i.itemName} onChange={() => handleFoodSelect("dessert", i.itemName)} />
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedFood.dessert === i.itemName ? "border-pink-400" : "border-slate-500"}`}>
                                    {selectedFood.dessert === i.itemName && <div className="w-2 h-2 rounded-full bg-pink-400"></div>}
                                </div>
                                <span className="font-medium text-sm">{i.itemName}</span>
                            </label>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
          </div>

          {/* FINAL CTA COMPONENT */}
          <div className="mt-12 flex justify-end">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.5)] hover:-translate-y-1 active:scale-95"
            >
              Submit Reservation <FaArrowRight />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
