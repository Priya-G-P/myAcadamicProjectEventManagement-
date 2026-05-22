import React, { useEffect, useState, useRef } from "react";
import { FaTrash, FaImage, FaPlus } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AdminServicesImgManagement() {
  const [images, setImages] = useState([]);
  const [base64Image, setBase64Image] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const container = useRef();

  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:5238/api/ServicesimgManagement/all");
      if (res.ok) setImages(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5238/api/servicesTable/all");
      if (res.ok) setServicesList(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { 
    fetchImages(); 
    fetchServices();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".page-header", 
      { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".upload-card", 
      { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", delay: 0.2 }
    );
  }, { scope: container });

  useEffect(() => {
    if (images.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.img-card'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.2)" }
        );
    }
  }, [images]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setBase64Image(reader.result);
  };

  const handleUpload = async () => {
    if (!base64Image) { alert("Please select an image"); return; }
    if (!selectedServiceId) { alert("Please target a service from the dropdown"); return; }
    
    const payloadBase64 = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;

    try {
      const res = await fetch("http://localhost:5238/api/ServicesimgManagement/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Servicesid: selectedServiceId, ImageBase64: payloadBase64 }),
      });
      if (res.ok) { setBase64Image(""); fetchImages(); } 
      else alert("Upload failed");
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5238/api/ServicesimgManagement/delete/${id}`, { method: "DELETE" });
      fetchImages();
    } catch (err) { console.error(err); }
  };

  return (
    <div ref={container} className="flex-1 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen p-8 text-slate-100 overflow-hidden relative">
      
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="page-header mb-10 relative z-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400">
          Portfolio Archive
        </h1>
        <p className="text-slate-400 mt-2">Manage the global gallery displayed securely to consumers.</p>
      </div>

      {/* UPLOAD FORM */}
      <div className="upload-card bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl mb-12 relative z-10 max-w-3xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-300">
          <FaPlus /> Upload Raw Asset
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <select 
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="flex-1 w-full sm:max-w-[200px] bg-black/20 border border-pink-500/30 text-pink-100 px-4 py-3 rounded-xl focus:outline-none focus:border-pink-500 appearance-none outline-none"
          >
            <option value="" className="text-slate-800">Target Service...</option>
            {servicesList.map(s => (
              <option key={s.servicesid} value={s.servicesid} className="text-slate-800">
                {s.servicesName}
              </option>
            ))}
          </select>
          <label className="flex-[2] w-full cursor-pointer bg-black/20 border border-dashed border-pink-500/30 hover:border-pink-500/60 transition-colors px-4 py-3 rounded-xl flex items-center justify-center gap-3 text-slate-400 group">
             <FaImage className="text-pink-400 group-hover:scale-110 transition-transform" />
             <span className="truncate">{base64Image ? "Payload Acquired" : "Locate Local Image Source..."}</span>
             <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <button
            onClick={handleUpload}
            className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all active:scale-95 whitespace-nowrap"
          >
            Commit to Cloud
          </button>
        </div>
      </div>

      {/* CASCADING MASONRY GALLERY */}
      <div className="columns-2 md:columns-3 lg:columns-4 2xl:columns-5 gap-6 space-y-6 relative z-10 w-full pb-20">
        {images.map((img) => {
          const imgSrc = img.imageBase64?.startsWith("data:") 
            ? img.imageBase64 
            : `data:image/jpeg;base64,${img.imageBase64}`;

          return (
          <div key={img.imageid} className="img-card group relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] bg-slate-900 break-inside-avoid">
            
            <img 
              src={imgSrc} 
                className="w-full object-cover group-hover:scale-110 group-hover:blur-[1px] group-hover:opacity-90 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
              alt="Gallery Asset" 
              loading="lazy"
            />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-indigo-950/90 via-slate-900/40 to-transparent">
              
              {/* Asset Metadata Mock */}
              <div className="text-white/80 text-xs font-mono mb-4 tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                Asset ID: {img.imageid} <br/> Map ID: {img.servicesid}
              </div>

              <button 
                onClick={() => handleDelete(img.imageid)}
                className="w-full bg-red-500/20 text-red-300 border border-red-500/50 px-4 py-3 rounded-2xl text-sm font-bold shadow-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3 backdrop-blur-md translate-y-4 group-hover:translate-y-0 duration-500 ease-out"
              >
                <FaTrash size={16}/> Terminate
              </button>
            </div>

          </div>
        )})}
      </div>

    </div>
  );
}
