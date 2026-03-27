import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function ImageCard() {

  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); // ✅ FIX

  const navigate = useNavigate();
  const location = useLocation();

  const { service, serviceId } = location.state || {};

 useEffect(() => {

  if (!serviceId) return;

  fetch("https://localhost:7276/api/ServicesimgManagement/all")
    .then(res => res.json())
    .then(data => {

      const filtered = data.filter(
        (img) => Number(img.servicesid) === Number(serviceId)
      );

      setImages(filtered);
    });

}, [serviceId]);

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100 min-h-screen">

      <div className="bg-white w-[85%] max-w-5xl rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4 text-center">
          {service?.title || "Select Image"}
        </h2>

        <div className="flex space-x-4 overflow-x-auto pb-4">

          {images.length > 0 ? (
            images.map((img, index) => (

              <div
                key={index}   // ✅ FIX
                onClick={() => setSelectedIndex(index)}   // ✅ FIX
                className={`relative min-w-[250px] h-[300px] rounded-lg overflow-hidden cursor-pointer
                ${selectedIndex === index ? "ring-4 ring-blue-500" : ""}`}
              >

                <img
                  src={
                    img.image?.startsWith("data:")
                      ? img.image
                      : `data:image/jpeg;base64,${img.imageBase64}`
                  }
                  alt="service"
                  className="w-full h-[300px] object-cover"
                />

                {selectedIndex === index && (   // ✅ FIX
                  <div className="absolute top-3 right-3 text-green-500 text-3xl">
                    <FaCheckCircle />
                  </div>
                )}

              </div>

            ))
          ) : (
            <p className="text-center w-full text-gray-500">
              🚫 No images found for this service
            </p>
          )}

        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {

              if (selectedIndex === null) {
                alert("Please select image");
                return;
              }

              navigate("/booking", {
                state: {
                  selectedImage: images[selectedIndex], // ✅ IMPORTANT FIX
                  service
                }
              });

            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Continue Booking
          </button>
        </div>

      </div>
    </div>
  );
}