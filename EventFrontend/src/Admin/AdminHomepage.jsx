import React, { useState, useEffect, useRef } from "react";
import {
  FaCalendarAlt, FaUsers, FaMoneyBillWave, FaClipboardList, FaTrash, FaCheckCircle
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Home() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    categories: 0
  });
  const container = useRef(null);

  const fetchDashboardData = async () => {
    try {
      // Fetch Bookings (for table and count)
      const resBookings = await fetch("http://localhost:5238/api/Booking/getAllBooking");
      const bookingsData = await resBookings.json();
      setEvents(bookingsData);

      // Fetch User Count
      const resUsers = await fetch("http://localhost:5238/api/Signup/count");
      const userCount = await resUsers.json();

      // Fetch Category Count
      const resCategories = await fetch("http://localhost:5238/api/servicescategory/count");
      const categoryCount = await resCategories.json();

      setStats({
        users: userCount,
        bookings: bookingsData.length,
        categories: categoryCount
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const deleteBooking = async (id) => {
    if(!window.confirm("Delete this booking?")) return;
    try {
      await fetch(`http://localhost:5238/api/Booking/delete/${id}`, { method: "DELETE" });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const changeStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Pending" ? "Confirmed" : currentStatus === "Confirmed" ? "Cancelled" : "Pending";
    try {
      await fetch(`http://localhost:5238/api/Booking/updateStatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextStatus),
      });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  useGSAP(() => {
    
    // Header Intro
    gsap.fromTo(".dash-header", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Staggered Stat Cards
    gsap.fromTo(".stat-card",
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)", delay: 0.2 }
    );

    // Table Fade-in
    gsap.fromTo(".table-container",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
    );
  }, { scope: container });

  // Sub-animation whenever events state completely updates (simulating row entrance)
  useEffect(() => {
    if (events.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.table-row-animate'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }
  }, [events]);

  return (
    <div ref={container} className="flex-1 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen p-8 text-slate-100 overflow-hidden relative">
      
      {/* GLOWING ORBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* HEADER */}
      <div className="dash-header mb-10 relative z-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
          Command Center
        </h1>
        <p className="text-slate-400 mt-2">Manage events, track performance, and wow your clients.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 relative z-10 w-full">
        
        {/* Card 1: Users */}
        <div className="stat-card bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-emerald-500/50 hover:bg-white/10 transition-colors h-full flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Users</p>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">{stats.users}</h2>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
               <FaUsers className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Card 2: Events (Categories) */}
        <div className="stat-card bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-blue-500/50 hover:bg-white/10 transition-colors h-full flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Event Categories</p>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{stats.categories}</h2>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl text-cyan-400">
               <FaCalendarAlt className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Card 3: Bookings */}
        <div className="stat-card bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-orange-500/50 hover:bg-white/10 transition-colors h-full flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Live Bookings</p>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">{stats.bookings}</h2>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400">
               <FaClipboardList className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 relative z-10 overflow-x-auto w-full">
        <h2 className="text-xl font-bold mb-6 text-slate-100 flex items-center gap-3">
          <FaCheckCircle className="text-indigo-400"/>
          Recent Network Activity
        </h2>

        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-sm uppercase tracking-widest bg-white/5 rounded-t-xl overflow-hidden">
              <th className="p-4 font-semibold first:rounded-tl-xl text-xs">Event Type</th>
              <th className="p-4 font-semibold text-xs">Client Identity</th>
              <th className="p-4 font-semibold text-xs">Scheduled Date</th>
              <th className="p-4 font-semibold text-xs">Lifecycle Status</th>
              <th className="p-4 font-semibold last:rounded-tr-xl text-xs text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.bookingid} className="table-row-animate border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                <td className="p-4 font-medium text-slate-200">
                   {event.functionType}
                   <div className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">{event.serviceName}</div>
                </td>
                <td className="p-4 text-slate-300">
                   <div className="font-bold">{event.userName}</div>
                   <div className="text-xs text-slate-500">{event.phoneNumber}</div>
                </td>
                <td className="p-4 text-slate-400 whitespace-nowrap text-xs font-mono">
                   {event.date?.split("T")[0]}
                </td>
                
                <td className="p-4">
                  <span 
                    onClick={() => changeStatus(event.bookingid, event.status)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border backdrop-blur-sm transition-all hover:scale-105 active:scale-95 ${
                    event.status === "Confirmed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                      : event.status === "Pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                  }`}>
                    {event.status || "Pending"}
                  </span>
                </td>
                
                <td className="p-4 text-center">
                  <button
                    onClick={() => deleteBooking(event.bookingid)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="text-center text-slate-400 mt-10 py-10 border border-dashed border-slate-700/50 rounded-2xl">
            <FaClipboardList className="mx-auto text-4xl mb-3 text-slate-600" />
            <p>Scanning sectors... No active bookings detected.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;
