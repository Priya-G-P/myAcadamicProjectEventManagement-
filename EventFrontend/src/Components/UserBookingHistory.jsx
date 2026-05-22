import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaTimesCircle, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "./HomePageNav.jsx";

gsap.registerPlugin(useGSAP);

export default function UserBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const fetchUserBookings = async () => {
    if (!userId) {
      toast.error("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5238/api/Booking/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      toast.error("Error loading booking history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [userId]);

  useGSAP(() => {
    gsap.fromTo(".dash-header", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".bookings-grid",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
  }, { scope: container });

  useEffect(() => {
    if (bookings.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.booking-card'),
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
    }
  }, [bookings]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <FaCheckCircle className="text-emerald-400" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-400" />;
      default:
        return <FaClock className="text-amber-400 animate-pulse" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div ref={container} className="flex-1 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen text-slate-100 relative overflow-hidden">
      <Navbar />
      
      {/* DECORATIVE ORBS */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 p-6 md:p-12 mt-20">
        
        {/* HEADER */}
        <div className="dash-header mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400 ring-1 ring-indigo-500/30">
                <FaCalendarAlt size={20} />
              </div>
              <span className="text-indigo-400 font-semibold tracking-widest text-xs uppercase">Booking Archive</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Event History</span>
            </h1>
            <p className="text-slate-400 mt-3 text-lg max-w-xl">
              Track your upcoming celebrations and revisit your past memorable events.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
             <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Total Events</p>
                <p className="text-2xl font-black text-white">{bookings.length}</p>
             </div>
             <div className="h-8 w-[1px] bg-white/10"></div>
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
               {user?.name?.charAt(0).toUpperCase()}
             </div>
          </div>
        </div>

        {/* BOOKINGS CONTENT */}
        {bookings.length === 0 ? (
          <div className="bookings-grid flex flex-col items-center justify-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <div className="p-6 bg-slate-900 rounded-full mb-6">
              <FaCalendarAlt size={48} className="text-slate-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-300">No Bookings Yet</h3>
            <p className="text-slate-500 mt-2 max-w-xs text-center">
              Your calendar is looking a bit empty. Start planning your next grand event today!
            </p>
            <button className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
              Browse Services
            </button>
          </div>
        ) : (
          <div className="bookings-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div 
                key={booking.bookingid} 
                className="booking-card group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={booking.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"} 
                    alt="Event" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-2 ${getStatusStyle(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status || "Pending"}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{booking.functionType}</h3>
                      <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mt-1">{booking.serviceName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Event date</p>
                      <p className="text-white font-mono text-sm">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4 flex-1">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <FaMapMarkerAlt size={14} className="text-indigo-500" />
                      <span className="truncate">{booking.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <FaUsers size={14} className="text-indigo-500" />
                      <span>{booking.numberofGuset} Guests • {booking.numberofdays} Days</span>
                    </div>
                  </div>

                  {booking.cateringItems && (
                    <div className="mt-6 pt-4 border-t border-white/5 font-medium">
                       <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Planned Catering</p>
                       <p className="text-xs text-indigo-200/70 italic line-clamp-2">
                         "{booking.cateringItems}"
                       </p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    {booking.status?.toLowerCase() === 'pending' && (
                       <button className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all">
                         Cancel Booking
                       </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
