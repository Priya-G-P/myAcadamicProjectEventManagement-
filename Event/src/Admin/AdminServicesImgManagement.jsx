import React, { useEffect, useState } from "react";

const API = "https://localhost:7276/api/ServicesimgManagement";

const AdminservicesimgManagement = () => {

  const [servicesid, setServicesid] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [data, setData] = useState([]);

  // ✅ GET ALL
  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/all`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ FILE → BASE64
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setImageBase64(base64);
    };

    reader.readAsDataURL(file);
  };

  // ✅ ADD
  const handleAdd = async () => {
    if (!servicesid || !imageBase64) {
      alert("Fill all fields");
      return;
    }

    const payload = {
      servicesid: parseInt(servicesid),
      imageBase64: imageBase64
    };

    try {
      const res = await fetch(`${API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Image Added ✅");
        setServicesid("");
        setImageBase64("");
        fetchData();
      } else {
        alert("Failed ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE (FIXED)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      const res = await fetch(`${API}/delete/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setData(prev => prev.filter(item => item.imageid !== id));
      } else {
        alert("Delete failed");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Service Image Management
      </h1>

      {/* FORM */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Add New Image
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Service ID"
            value={servicesid}
            onChange={(e) => setServicesid(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="file"
            onChange={handleFile}
            className="border p-2 rounded"
          />

          <button
            onClick={handleAdd}
            className="col-span-2 bg-green-600 text-white py-2 rounded"
          >
            Add Image
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Image List
        </h2>

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Service ID</th>
              <th className="p-3">Image</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.imageid} className="border-b">

                <td className="p-3">{item.imageid}</td>
                <td className="p-3">{item.servicesid}</td>

                <td className="p-3">
                  <img
                    src={`data:image/jpeg;base64,${item.imageBase64}`}
                    className="w-20 h-20 rounded"
                  />
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(item.imageid)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdminservicesimgManagement;