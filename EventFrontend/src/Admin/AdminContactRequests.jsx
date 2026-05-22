import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCheckCircle, FaInbox } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

export default function AdminContactRequests() {
  const [contacts, setContacts] = useState([]);
  const container = useRef();

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5238/api/Contact/all");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
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
    if (contacts.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.table-row-animate'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }
  }, [contacts]);

  const handleStatusChange = async (id, status) => {
    await fetch(`http://localhost:5238/api/Contact/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status),
    });
    fetchContacts();
  };

  return (
    <div ref={container} className="flex-1 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen p-8 text-slate-100 overflow-hidden relative">
      
      {/* GLOWING ORBS */}
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* HEADER */}
      <div className="dash-header mb-10 relative z-10 flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-2xl text-cyan-400">
           <FaInbox className="text-3xl" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
            Contact Requests
          </h1>
          <p className="text-slate-400 mt-1">Review and manage incoming project inquiries and messages.</p>
        </div>
      </div>

      <div className="table-container bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 relative z-10 overflow-x-auto w-[calc(100vw-340px)]">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-widest bg-white/5 rounded-t-xl">
              <th className="p-4 font-semibold first:rounded-tl-xl whitespace-nowrap">Date</th>
              <th className="p-4 font-semibold">Client Identity</th>
              <th className="p-4 font-semibold">Event Type</th>
              <th className="p-4 font-semibold w-1/3">Message Context</th>
              <th className="p-4 font-semibold text-center last:rounded-tr-xl">Status Track</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="table-row-animate border-b border-white/5 hover:bg-white/5 transition-colors group">
                
                {/* Date */}
                <td className="p-4 text-slate-400 font-mono text-xs whitespace-nowrap">
                   {c.createdAt}
                </td>

                {/* Identity */}
                <td className="p-4">
                  <div className="font-bold text-slate-200">{c.name}</div>
                  <div className="text-[12px] text-cyan-400/80">{c.email}</div>
                </td>
                
                {/* Protocol */}
                <td className="p-4">
                   <span className="text-indigo-300 bg-indigo-900/30 px-3 py-1 rounded-md text-xs border border-indigo-700/50">{c.eventType || "General"}</span>
                </td>

                <td className="p-4 text-slate-300 text-sm opacity-90 max-w-[300px]">
                   {c.message}
                </td>
                
                {/* Status Update */}
                <td className="p-4 text-center">
                  <select
                    value={c.status || "New"}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className={`bg-white/5 border rounded-full text-xs font-bold uppercase tracking-wider px-3 py-1.5 focus:outline-none transition-colors cursor-pointer text-center appearance-none ${
                        c.status === "Responded" ? "border-emerald-500/50 text-emerald-400 group-hover:bg-emerald-500/10" 
                      : "border-amber-500/50 text-amber-500 group-hover:bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    }`}
                  >
                    <option className="bg-slate-800 text-amber-500" value="New">NEW REQUEST</option>
                    <option className="bg-slate-800 text-emerald-400" value="Responded">RESPONDED</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {contacts.length === 0 && (
          <div className="text-center text-slate-500 mt-8 py-12 border border-dashed border-slate-700/50 rounded-2xl bg-white/5">
             No contact requests found in the database.
          </div>
        )}

      </div>
    </div>
  );
}
