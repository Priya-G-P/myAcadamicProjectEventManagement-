import React from "react";
 
const UserProfile = () => {
 
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210"
  };
 
  return (
 
    <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden">
 
      {/* TOP */}
      <div className="bg-gray-200 flex flex-col items-center py-6">
 
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className="w-16 h-16 rounded-full mb-2"
        />
 
        <h2 className="text-lg font-semibold">{user.name}</h2>
 
        <p className="text-sm text-gray-600">
          {user.email}
        </p>
 
      </div>
 
      {/* BOTTOM */}
      <div className="p-4 space-y-3">
 
        <div className="bg-gray-100 p-2 rounded-lg text-sm">
          <strong>Phone:</strong> {user.phone}
        </div>
 
        <div className="bg-gray-100 p-2 rounded-lg text-sm">
          <strong>Email:</strong> {user.email}
        </div>
 
      </div>
 
    </div>
  );
};
 
export default UserProfile;