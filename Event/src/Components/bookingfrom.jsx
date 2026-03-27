import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingPage() {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ ALWAYS define hooks first
  const [formData, setFormData] = useState({
    UserName: "",
    PhoneNumber: "",
    Address: "",
    date: "",
    image: "",
    numberofGuset: "",
    numberofdays: "",
    functionType: ""
  });

  // ✅ GET DATA SAFELY
  const service = location.state?.service;
  const selectedImage = location.state?.selectedImage;

  // ✅ SAFE CHECK AFTER hooks
  if (!service || !selectedImage) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-red-500 text-xl">
          No booking data found ❌
        </h2>

        <button
          onClick={() => navigate("/")}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ✅ handleChange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ validate
  const validate = () => {
    return (
      formData.UserName &&
      formData.PhoneNumber &&
      formData.Address &&
      formData.date &&
      formData.numberofGuset &&
      formData.numberofdays &&
      formData.functionType
    );
  };

  // ✅ submit
  const handleSubmit = async () => {
    if (!validate()) {
      alert("Fill all fields ⚠");
      return;
    }

    const payload = {
  uid: 101,
  UserName: formData.UserName,
  PhoneNumber: formData.PhoneNumber,
  Address: formData.Address,
  date: formData.date,
  numberofGuset: Number(formData.numberofGuset),
  numberofdays: Number(formData.numberofdays),
  functionType: formData.functionType,

  image: selectedImage.imageBase64 || selectedImage.image,

  // ✅ FIX HERE
  serviceName: service?.servicesName || service?.title || "",

  status: "Pending"
};
    console.log("📤 PAYLOAD:", payload);

    try {
      const res = await fetch("https://localhost:7276/api/Booking/addBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const text = await res.text();

      if (res.ok) {
        alert("Booking Successful ✅");
        navigate("/home");
      } else {
        alert("ERROR: " + text);
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white w-[520px] p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-bold text-center">
          {service.title}
        </h2>

        {/* IMAGE */}
        <img
          src={selectedImage.imageBase64 ? `data:image/jpeg;base64,${selectedImage.imageBase64}` : selectedImage.image}
          className="w-64 h-40 object-cover mx-auto mt-3 rounded"
        />

        <div className="space-y-4 mt-4">

          <input name="UserName" placeholder="Name" onChange={handleChange} className="w-full border p-2" />
          <input name="PhoneNumber" placeholder="Phone" onChange={handleChange} className="w-full border p-2" />
          <input name="Address" placeholder="Address" onChange={handleChange} className="w-full border p-2" />
          <input type="date" name="date" onChange={handleChange} className="w-full border p-2" />
          <input type="number" name="numberofGuset" placeholder="Guests" onChange={handleChange} className="w-full border p-2" />
          <input type="number" name="numberofdays" placeholder="Days" onChange={handleChange} className="w-full border p-2" />

          <select name="functionType" onChange={handleChange} className="w-full border p-2">
            <option value="">Select Type</option>
            <option>Wedding</option>
            <option>Birthday</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Confirm Booking
          </button>

        </div>
      </div>
    </div>
  );
}