import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP);

function AdminSerCatering() {
  const [starters, setStarters] = useState([]);
  const [mainCourses, setMainCourses] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5238/api/Catering/starters").then(res => res.json()).then(setStarters);
    fetch("http://localhost:5238/api/Catering/maincourse").then(res => res.json()).then(setMainCourses);
    fetch("http://localhost:5238/api/Catering/desserts").then(res => res.json()).then(setDesserts);
  }, []);

  const menuCategories = [
    {
      id: "starter",
      name: "Starters",
      image: "CateringCard5.jpg",
      dishes: starters,
      editRoute: "/admin-starter"
    },
    {
      id: "main",
      name: "Main Course",
      image: "CateringCard1.jpg",
      dishes: mainCourses,
      editRoute: "/admin-maincourse"
    },
    {
      id: "dessert",
      name: "Desserts",
      image: "CateringCard6.jpg",
      dishes: desserts,
      editRoute: "/admin-dessert"
    }
  ];

  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});
  const container = useRef();

  const openMenuFor = (id) => setOpenMenus((prev) => ({ ...prev, [id]: true }));
  const closeMenuFor = (id) => setOpenMenus((prev) => ({ ...prev, [id]: false }));

  useGSAP(() => {
    gsap.fromTo(".page-header", 
      { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".catering-card",
      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)", delay: 0.2 }
    );
  }, { scope: container });

  return (
    <div ref={container} className="flex-1 min-h-screen bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-slate-100 overflow-hidden relative">

      <div className="absolute top-[-10%] right-[30%] w-[40%] h-[40%] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="page-header mb-10 relative z-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
          Catering Deployments
        </h1>
        <p className="text-slate-400 mt-2">Manage menu selection matrices and deploy food packages.</p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {menuCategories.map((cat) => (
          <div key={cat.id} className="catering-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-visible transition-colors hover:bg-white/10 flex flex-col">
            <div className="relative w-full h-52 overflow-hidden rounded-t-3xl">
              <img src={`/${cat.image}`} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-bold tracking-widest uppercase mb-6 text-slate-300">{cat.name}</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => openMenuFor(cat.id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-bold px-4 py-3 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all active:scale-95"
                  >
                    View Items
                  </button>
                  <button
                    onClick={() => navigate(cat.editRoute)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold px-4 py-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all active:scale-95"
                  >
                    Manage DB
                  </button>
              </div>

              {openMenus[cat.id] && (
                <div className="mt-2 bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-2xl p-4 relative z-50 animate-fade-in-up">
                  <button onClick={() => closeMenuFor(cat.id)} className="absolute top-3 right-4 text-slate-400 hover:text-red-400 font-bold">X</button>
                  <h4 className="font-bold text-sm text-indigo-300 mb-3 uppercase tracking-wider">{cat.name} Items in DB</h4>
                  <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {cat.dishes.length === 0 ? <p className="text-slate-500 text-sm">No items found</p> : null}
                    {cat.dishes.map((dish, idx) => (
                        <div key={idx} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors group text-sm text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                        <span className="group-hover:text-pink-300 transition-colors">{dish.itemName}</span>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminSerCatering;
