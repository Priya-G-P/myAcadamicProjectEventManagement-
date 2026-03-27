// AdminServicesCommon.jsx
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

function AdminServicesCommon({ title, categoryId }) {

  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  // ✅ LOAD DATA
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch("https://localhost:7276/api/servicesTable/all")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          s => s.servicesCategoryid === categoryId
        );
        setServices(filtered);
      });
  };

  // ✅ IMAGE → BASE64
  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageBase64(reader.result);
    };
  };

  // ✅ ADD SERVICE
  const addService = () => {
    if (!name || !imageBase64) {
      alert("Enter all fields");
      return;
    }

    fetch("https://localhost:7276/api/servicesTable/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ServicesCategoryid: categoryId,
        ServicesName: name,
        imageurl: imageBase64
      })
    })
      .then(() => {
        setName("");
        setImageBase64("");
        loadData();
      });
  };

  // ✅ DELETE SERVICE
  const deleteService = (id) => {
    fetch(`https://localhost:7276/api/servicesTable/delete/${id}`, {
      method: "DELETE"
    })
      .then(() => loadData());
  };

  return (
    <div className="min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {/* ✅ ADD FORM */}
      <div className="mb-8 flex gap-3 flex-wrap">
        <input
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input type="file" onChange={handleImage} />

        <button
          onClick={addService}
          className="bg-amber-600 px-6 py-2 rounded"
        >
          Add Service
        </button>
      </div>

      {/* ✅ SERVICES GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {services.map((item) => (
          <div
            key={item.servicesid}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={item.imageurl}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {item.servicesName}
              </h3>

              <button
                onClick={() => deleteService(item.servicesid)}
                className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminServicesCommon;