import React, { useEffect, useState, useRef } from "react";
import { FaTrash, FaPlus, FaImage } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function AdminServicesCommon({ title, categoryId }) {

  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const container = useRef();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch("http://localhost:5238/api/servicesTable/all")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(s => s.servicesCategoryid === categoryId);
        setServices(filtered);
      });
  };

  useGSAP(() => {
    gsap.fromTo(".page-header", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".upload-card", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", delay: 0.2 }
    );
  }, { scope: container });

  useEffect(() => {
    if (services.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.service-card'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }
        );
    }
  }, [services]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageBase64(reader.result);
  };

  const addService = () => {
    if (!name || !imageBase64) {
      alert("Enter all fields");
      return;
    }

    fetch("http://localhost:5238/api/servicesTable/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ServicesCategoryid: categoryId,
        ServicesName: name,
        imageurl: imageBase64
      })
    }).then(() => {
        setName("");
        setImageBase64("");
        loadData();
      });
  };

  const deleteService = (id) => {
    fetch(`http://localhost:5238/api/servicesTable/delete/${id}`, { method: "DELETE" })
      .then(() => loadData());
  };

  return (
    <div ref={container} className="flex-1 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen p-8 text-slate-100 overflow-hidden relative">
      
      {/* ORBS */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="page-header mb-10 relative z-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
          {title} Engine
        </h1>
        <p className="text-slate-400 mt-2">Create, modify, and delete the portfolios shown to clients.</p>
      </div>

      {/* UPLOAD FORM */}
      <div className="upload-card bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl mb-12 relative z-10 max-w-4xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-300">
          <FaPlus /> Deploy New Asset
        </h3>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            placeholder="Asset Designation (e.g. Royal Wedding)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 w-full bg-black/20 border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-200 placeholder-slate-500 transition-all font-mono"
          />

          <label className="flex-1 w-full cursor-pointer bg-black/20 border border-dashed border-indigo-500/30 hover:border-indigo-500/60 transition-colors px-4 py-3 rounded-xl flex items-center justify-center gap-3 text-slate-400 group">
             <FaImage className="text-indigo-400 group-hover:scale-110 transition-transform" />
             <span className="truncate">{imageBase64 ? "Image Loaded Successfully" : "Select Identity Image..."}</span>
             <input type="file" onChange={handleImage} className="hidden" />
          </label>

          <button
            onClick={addService}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all active:scale-95"
          >
            Deploy
          </button>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {services.map((item) => (
          <div
            key={item.servicesid}
            className="service-card group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-indigo-500/50 transition-colors flex flex-col"
          >
            <div className="relative w-full h-56 overflow-hidden">
               <img src={item.imageurl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="Service" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-6 drop-shadow-sm">
                {item.servicesName}
              </h3>

              <button
                onClick={() => deleteService(item.servicesid)}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all hover:text-red-300"
              >
                <FaTrash /> Purge Asset
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-16 border border-dashed border-slate-700/50 rounded-3xl bg-white/5">
             No assets deployed in this sector currently.
          </div>
        )}
      </div>

    </div>
  );
}

export default AdminServicesCommon;
