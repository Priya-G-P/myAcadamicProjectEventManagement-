import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaTrash, FaCheckCircle } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

export default function AdminBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const container = useRef();

  const filteredBookings = filterCategory === "All" 
    ? bookings 
    : bookings.filter(b => b.functionType === filterCategory || b.serviceName === filterCategory);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5238/api/Booking/getAllBooking");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".dash-header", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".table-container",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
  }, { scope: container });

  useEffect(() => {
    if (bookings.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.table-row-animate'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }
  }, [bookings]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    await fetch(`http://localhost:5238/api/Booking/delete/${id}`, { method: "DELETE" });
    fetchBookings();
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`http://localhost:5238/api/Booking/updateStatus/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status),
    });
    fetchBookings();
  };

  return (
    <div ref={container} className="flex-1 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen p-8 text-slate-100 overflow-hidden relative">
      
      {/* GLOWING ORBS */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* HEADER */}
      <div className="dash-header mb-10 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl text-cyan-400">
             <FaCheckCircle className="text-3xl" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Booking Management
            </h1>
            <p className="text-slate-400 mt-1">Review, approve, and organize client booking requests.</p>
          </div>
        </div>

        {/* NEW FILTER DROPDOWN */}
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
          <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Filter:</span>
          <select 
             value={filterCategory} 
             onChange={(e) => setFilterCategory(e.target.value)}
             className="bg-transparent text-white outline-none border-none font-medium cursor-pointer"
          >
             <option value="All" className="bg-slate-900">All Services</option>
             <option value="Wedding" className="bg-slate-900">Wedding</option>
             <option value="Private parties" className="bg-slate-900">Private Parties</option>
             <option value="Festival events" className="bg-slate-900">Festival Events</option>
             <option value="Corporate events" className="bg-slate-900">Corporate Events</option>
          </select>
        </div>
      </div>

      <div className="table-container bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 relative z-10 overflow-x-auto w-[calc(100vw-340px)]">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-widest bg-white/5 rounded-t-xl">
              <th className="p-4 font-semibold first:rounded-tl-xl whitespace-nowrap">Event Visual</th>
              <th className="p-4 font-semibold">Client Name</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Service</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Schedule</th>
              <th className="p-4 font-semibold">Details</th>
              <th className="p-4 font-semibold">Catering</th>
              <th className="p-4 font-semibold text-center">Lifecycle</th>
              <th className="p-4 font-semibold text-center last:rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.bookingid} className="table-row-animate border-b border-white/5 hover:bg-white/5 transition-colors group">
                
                {/* Image */}
                <td className="p-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <img src={b.image} className="w-full h-full object-cover" alt="Event" />
                  </div>
                </td>

                {/* Identity */}
                <td className="p-4">
                  <div className="font-bold text-slate-200">{b.userName}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">ID: {b.bookingid}</div>
                </td>
                
                {/* Protocol */}
                <td className="p-4 text-slate-300 font-medium whitespace-nowrap">{b.phoneNumber}</td>
                
                {/* Domain */}
                <td className="p-4">
                   <span className="text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded-md text-xs border border-cyan-700/50">{b.serviceName || "N/A"}</span>
                </td>

                <td className="p-4 text-slate-300">{b.functionType}</td>
                
                {/* Schedule */}
                <td className="p-4 text-slate-300 whitespace-nowrap font-mono text-sm">{b.date?.split("T")[0]}</td>
                
                {/* Details */}
                <td className="p-4 text-slate-400 text-sm whitespace-nowrap">
                   {b.numberofGuset} <span className="text-slate-600">Guests</span><br/>
                   {b.numberofdays} <span className="text-slate-600">Days</span>
                </td>

                {/* Catering */}
                <td className="p-4">
                  {b.cateringItems ? (
                    <div className="text-xs leading-tight text-orange-300/80 max-w-[120px] bg-orange-900/20 p-2 rounded-lg border border-orange-500/20">
                      {b.cateringItems}
                    </div>
                  ) : (
                    <span className="text-slate-600 italic text-xs">Opted Out</span>
                  )}
                </td>

                {/* Status Update */}
                <td className="p-4 text-center">
                  <select
                    value={b.status || "Pending"}
                    onChange={(e) => handleStatusChange(b.bookingid, e.target.value)}
                    className={`bg-white/5 border rounded-full text-xs font-bold uppercase tracking-wider px-3 py-1.5 focus:outline-none transition-colors cursor-pointer text-center appearance-none ${
                        b.status === "Confirmed" ? "border-emerald-500/50 text-emerald-400 group-hover:bg-emerald-500/10" 
                      : b.status === "Pending" ? "border-amber-500/50 text-amber-400 group-hover:bg-amber-500/10" 
                      : "border-red-500/50 text-red-400 group-hover:bg-red-500/10"
                    }`}
                  >
                    <option className="bg-slate-800 text-amber-400" value="Pending">Pending</option>
                    <option className="bg-slate-800 text-emerald-400" value="Confirmed">Confirmed</option>
                    <option className="bg-slate-800 text-red-400" value="Cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Action */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(b.bookingid)}
                    className="p-2 text-slate-500 hover:text-white hover:bg-red-500/80 rounded-xl transition-all shadow-sm active:scale-95 mx-auto"
                    title="Terminate Record"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="text-center text-slate-500 mt-8 py-12 border border-dashed border-slate-700/50 rounded-2xl bg-white/5">
             No bookings found for the selected category.
          </div>
        )}

      </div>
    </div>
  );
}
