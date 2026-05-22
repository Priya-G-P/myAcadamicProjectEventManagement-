import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiClock, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModal.jsx";

const UserProfile = ({ onClose }) => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  let user = null;
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      if(parsed.name || parsed.fullname || parsed.username || parsed.email) {
          const rawName = parsed.name || parsed.fullname || parsed.username || "";
          user = {
            userId: parsed.userId || parsed.uid || parsed.id,
            name: rawName,
            email: parsed.email || parsed.Email || "",
            phone: parsed.phone || parsed.phoneNumber || "",
            initial: rawName ? rawName[0].toUpperCase() : (parsed.email ? parsed.email[0].toUpperCase() : "U")
          };
      }
    } catch {
      console.log("Invalid user data");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    if(onClose) onClose();
    toast.info("Logged out safely! See you next time.", { icon: "👋" });
    navigate("/login");
  };

  const handleBookingHistory = () => {
    if(onClose) onClose();
    navigate("/booking-history");
  };

  return (
    <div className="absolute top-20 right-6 md:right-12 w-80 bg-blue-50/95 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      {/* HEADER OVERLAY */}
      <div className="relative h-24 bg-blue-100 flex justify-center items-end pb-4 border-b border-blue-200/50">
           {/* Decorative elements omitted for simplicity */}
      </div>

      <div className="relative px-6 pb-6 -mt-10 flex flex-col items-center">
        {/* AVATAR */}
        <div className="w-20 h-20 rounded-full border-4 border-blue-50 bg-white shadow-md flex items-center justify-center text-3xl font-extrabold text-blue-400 mb-3">
            {user ? user.initial : "U"}
        </div>

        {/* INFO */}
        <div className="text-center w-full mb-6">
            <h2 className="text-xl font-bold text-slate-800 truncate">
               {user && user.name ? user.name : "Welcome User!"}
            </h2>
            <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
               {user && user.email ? user.email : ""}
            </p>
        </div>

        {/* BUTTONS */}
        <div className="w-full space-y-2.5">
            <button 
                onClick={handleBookingHistory}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-blue-100 border border-blue-100 hover:border-blue-200 rounded-xl transition-all group"
            >
                <div className="flex items-center gap-3 text-slate-600 group-hover:text-blue-600 font-semibold text-sm transition-colors">
                    <FiClock className="text-lg" />
                    Booking History
                </div>
            </button>

            <button 
                onClick={() => setIsReviewOpen(true)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-yellow-50 border border-blue-100 hover:border-yellow-200 rounded-xl transition-all group"
            >
                <div className="flex items-center gap-3 text-slate-600 group-hover:text-yellow-500 font-semibold text-sm transition-colors">
                    <FiStar className="text-lg" />
                    Leave a Review
                </div>
            </button>

            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-red-50 border border-blue-100 hover:border-red-200 rounded-xl transition-all group"
            >
                <div className="flex items-center gap-3 text-slate-600 group-hover:text-red-500 font-semibold text-sm transition-colors">
                    <FiLogOut className="text-lg" />
                    Sign Out
                </div>
            </button>
        </div>

      </div>
      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} userId={user ? user.userId : 0} />
    </div>
  );
};

export default UserProfile;
