import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaUserFriends, FaTrash, FaEnvelope, FaPhone, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";

gsap.registerPlugin(useGSAP);

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5238/api/Signup/getAll");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to security database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // GSAP ANIMATIONS
  useGSAP(() => {
    gsap.fromTo(".dash-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(".table-container",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
  }, { scope: container });

  useEffect(() => {
    if (users.length > 0 && container.current && !loading) {
      gsap.fromTo(
        container.current.querySelectorAll(".table-row-animate"),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [users, loading]);

  // DELETE USER
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Terminate user account for "${name}"? This action is irreversible.`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5238/api/Signup/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Account Terminated Successfully");
        fetchUsers(); // refresh
      } else {
        toast.error("Database conflict: Unable to delete user.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server connection lost.");
    }
  };

  return (
    <div ref={container} className="flex-1 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen p-8 text-slate-100 overflow-hidden relative">
      
      {/* Background Decorative Orbs */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* HEADER */}
      <div className="dash-header mb-10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-500/20 rounded-2xl text-indigo-400 border border-indigo-500/30">
            <FaUserFriends className="text-3xl" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 leading-tight">
              User Core
            </h1>
            <p className="text-slate-400 mt-1 flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               Security Management & Account Oversight
            </p>
          </div>
        </div>
        
        <div className="hidden md:block bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-1">Total Identities</span>
            <span className="text-2xl font-black text-indigo-400">{users.length}</span>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="table-container bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-8 relative z-10 overflow-x-auto">
        <table className="w-full text-left min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-500 text-xs uppercase tracking-[0.2em]">
              <th className="p-4 font-bold">Identity</th>
              <th className="p-4 font-bold">Credentials</th>
              <th className="p-4 font-bold">Contact Node</th>
              <th className="p-4 font-bold text-center">Security Level</th>
              <th className="p-4 text-center font-bold">Auth Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && users.map((u) => (
              <tr key={u.uid} className="table-row-animate border-b border-white/5 hover:bg-white/5 transition-all duration-300 group">
                
                {/* IDENTITY */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-black text-white shadow-lg border-2 border-white/10">
                      {u.fullname?.charAt(0) || "U"}
                    </div>
                    <div>
                      <div className="font-bold text-slate-100 text-lg">{u.fullname}</div>
                      <div className="text-xs text-slate-500 font-mono">UID-{u.uid}</div>
                    </div>
                  </div>
                </td>

                {/* CREDENTIALS */}
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-indigo-300 transition-colors">
                      <FaEnvelope className="text-[10px]" />
                      <span className="text-sm font-medium">{u.email}</span>
                    </div>
                    <div className="text-xs text-slate-500 italic">@{u.username}</div>
                  </div>
                </td>

                {/* CONTACT NODE */}
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FaPhone className="text-[10px]" />
                    <span className="text-sm font-mono">{u.phoneNumber || "N/A"}</span>
                  </div>
                </td>

                {/* SECURITY LEVEL */}
                <td className="p-4 text-center">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all ${u.role === 1 ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' : 'text-slate-400'}`}>
                      <FaUserShield /> 
                      {u.role === 1 ? "System Admin" : "Standard User"}
                   </div>
                </td>

                {/* ACTIONS */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(u.uid, u.fullname)}
                    className="p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    title="Terminate Account"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* LOADING & EMPTY STATES */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-500 font-bold tracking-widest text-[10px] uppercase">Retrieving Access Protocols...</p>
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="text-center text-slate-500 py-20 font-bold uppercase tracking-widest text-sm flex flex-col items-center gap-4 border border-dashed border-white/10 rounded-[2rem] mt-4">
             <FaUserFriends className="text-4xl opacity-20" />
             No identities found in central registry.
          </div>
        )}
      </div>
    </div>
  );
}
