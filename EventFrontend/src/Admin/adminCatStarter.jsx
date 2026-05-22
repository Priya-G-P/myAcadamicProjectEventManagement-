import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaTrash, FaPlus, FaUtensils, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

gsap.registerPlugin(useGSAP);

export function CommonCateringList({ title, apiEndpoint }) {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const container = useRef();

  const loadData = () => {
    fetch(`http://localhost:5238/api/Catering/${apiEndpoint}`)
      .then(res => res.json())
      .then(setItems);
  };

  useEffect(() => { loadData(); }, []);

  useGSAP(() => {
    gsap.fromTo(".cat-header", 
      { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".add-card",
      { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" }
    );
  }, { scope: container });

  useEffect(() => {
    if(items.length > 0 && container.current) {
        gsap.fromTo(container.current.querySelectorAll('.food-item'),
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }
  }, [items]);

  const getActionEndpoint = (endpoint) => {
    const mapping = {
      'starters': 'starter',
      'maincourse': 'maincourse',
      'desserts': 'dessert'
    };
    return mapping[endpoint] || endpoint;
  };

  const addItem = async () => {
    if (!item) return;
    const action = getActionEndpoint(apiEndpoint);
    const res = await fetch(`http://localhost:5238/api/Catering/add-${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ItemName: item })
    });
    
    if(res.ok) {
        toast.success(`New ${title} catalogued!`);
        setItem("");
        loadData();
    } else {
        toast.error("Database rejection. Please try again.");
    }
  };

  const deleteItem = async (id) => {
    if(!window.confirm("Execute deletion protocol?")) return;
    const res = await fetch(`http://localhost:5238/api/Catering/delete/${id}`, { method: "DELETE" });
    if(res.ok) {
        toast.info("Item purged from records.");
        loadData();
    }
  };

  const startEditing = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = async (id) => {
    if(!editValue) return;
    const res = await fetch(`http://localhost:5238/api/Catering/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ItemName: editValue })
    });
    
    if(res.ok) {
        toast.success("Catalog entry synchronized!");
        setEditingId(null);
        setEditValue("");
        loadData();
    } else {
        toast.error("Synchronization failed.");
    }
  };

  return (
    <>
      <div ref={container} className="w-full p-8 bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen relative text-slate-100 overflow-hidden">
        
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="cat-header mb-8 relative z-10 flex items-center gap-4">
           <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
               <FaUtensils className="text-3xl" />
           </div>
           <div>
             <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">{title} Catalog</h2>
             <p className="text-slate-400">Manage the active components of the {title} tier.</p>
           </div>
        </div>

        <div className="add-card flex flex-col md:flex-row gap-4 mb-10 relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl max-w-3xl">
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder={`Identify new ${title}...`}
            className="flex-1 bg-black/20 border border-white/10 text-slate-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button onClick={addItem} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-95 transition-all text-white font-bold whitespace-nowrap">
            <FaPlus /> Inject Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {items.map(mappedItem => (
            <div key={mappedItem.id} className="food-item group flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg hover:bg-white/10 transition-colors">
              {editingId === mappedItem.id ? (
                <div className="flex-1 flex gap-2 mr-3">
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 w-full bg-black/40 border border-blue-500/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <button onClick={() => saveEdit(mappedItem.id)} className="p-2 text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 rounded-lg transition-all">
                    <FaCheck />
                  </button>
                  <button onClick={cancelEdit} className="p-2 text-slate-400 bg-slate-500/10 hover:bg-slate-500/20 rounded-lg transition-all">
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-semibold tracking-wide text-slate-300 group-hover:text-blue-300 transition-colors">{mappedItem.itemName}</span>
                  <div className="flex gap-2">
                    <button onClick={() => startEditing(mappedItem.id, mappedItem.itemName)} className="p-2 text-slate-400 hover:text-blue-400 bg-black/20 hover:bg-blue-400/10 rounded-lg transition-all">
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteItem(mappedItem.id)} className="p-2 text-slate-500 hover:text-red-400 bg-black/20 hover:bg-red-400/10 rounded-lg transition-all">
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {items.length === 0 && <div className="col-span-full text-slate-500 p-8 border border-dashed border-white/10 rounded-2xl text-center">No recipes currently logged.</div>}
        </div>
      </div>
    </>
  );
}

export default function AdminStarter() { return <CommonCateringList title="Starter" apiEndpoint="starters" />; }
