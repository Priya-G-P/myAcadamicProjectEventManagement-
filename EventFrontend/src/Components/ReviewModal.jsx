import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaStar, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ReviewModal = ({ isOpen, onClose, userId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.warning("Please provide a rating before submitting.", { icon: "⭐️" });
      return;
    }
    
    if (userId === null || userId === undefined || userId === 0 || userId === "") {
       toast.error("User ID missing. Please log out and back in!");
       return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5238/api/Review/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: parseInt(userId, 10),
          Rating: rating,
          ReviewText: reviewText
        }),
      });

      if (response.ok) {
        toast.success("Review submitted! Thank you for the feedback.", { icon: "🎉" });
        onClose();
        setRating(0);
        setReviewText("");
      } else {
        const errorData = await response.json();
        toast.error("Submission failed: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting review. Check your connection!");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 z-10 hover:text-red-500 transition-colors p-2 bg-slate-100 rounded-full">
          <FaTimes size={16} />
        </button>

        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-center text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-xl transform translate-x-10 -translate-y-10"></div>
          <h2 className="text-3xl font-extrabold relative z-10">Share Feedback</h2>
          <p className="text-blue-100 text-sm mt-2 relative z-10">Rate your experience with Spark Movement!</p>
        </div>

        {/* Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Star Rating */}
            <div className="flex flex-col items-center">
              <div className="flex gap-2">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={`text-4xl transition-all duration-300 ${index <= (hover || rating) ? "text-yellow-400 scale-110 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "text-slate-200 scale-100"}`}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <FaStar />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Area */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm tracking-wide">Your Review</label>
              <textarea 
                rows="4" 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-800 placeholder-slate-400 resize-none transition-all shadow-inner text-sm"
                placeholder="Share details of your experience..."
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed uppercase tracking-wider text-sm mt-2"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default ReviewModal;
