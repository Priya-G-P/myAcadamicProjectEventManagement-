import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaStar, FaClock, FaCheck, FaTrash } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const container = useRef();

  // FETCH REVIEWS
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5238/api/Review/all");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // GSAP ANIMATIONS
  useGSAP(() => {
    gsap.fromTo(".dash-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 }
    );

    gsap.fromTo(".table-container",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
  }, { scope: container });

  useEffect(() => {
    if (reviews.length > 0 && container.current) {
      gsap.fromTo(
        container.current.querySelectorAll(".table-row-animate"),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05 }
      );
    }
  }, [reviews]);

  // UPDATE STATUS
  const handleStatusChange = async (id, status) => {
    await fetch(`http://localhost:5238/api/Review/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status),
    });

    fetchReviews();
  };

  // DELETE REVIEW
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5238/api/Review/delete/${id}`, {
        method: "DELETE",
      });

      fetchReviews(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div ref={container} className="flex-1 bg-slate-950 min-h-screen p-8 text-slate-100">

      {/* HEADER */}
      <div className="dash-header mb-10 flex items-center gap-4">
        <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-400">
          <FaStar className="text-3xl" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-pink-400">
            Platform Reviews
          </h1>
          <p className="text-slate-400 mt-1">
            Manage user reviews (approve / delete)
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container bg-white/5 border rounded-3xl p-6 overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">

          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-xs uppercase">
              <th className="p-4">Date</th>
              <th className="p-4">User</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((r) => (
              <tr key={r.reviewId} className="table-row-animate border-b border-white/5">

                {/* DATE */}
                <td className="p-4 text-xs">
                  {new Date(r.reviewDate).toLocaleDateString()}
                </td>

                {/* USER */}
                <td className="p-4 font-bold">
                  {r.userName || "Unknown"}
                </td>

                {/* RATING */}
                <td className="p-4 text-yellow-400 flex items-center gap-1">
                  {r.rating} <FaStar size={10} />
                </td>

                {/* REVIEW */}
                <td className="p-4 text-sm">
                  "{r.reviewText}"
                </td>

                {/* STATUS */}
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleStatusChange(r.reviewId, "Pending")}
                      className={`group relative px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-500 flex items-center gap-2 overflow-hidden ${
                        r.status === "Pending"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                          : "bg-white/5 text-slate-500 border border-white/5 hover:border-amber-500/30 hover:text-amber-300"
                      }`}
                    >
                      <FaClock className={`${r.status === "Pending" ? "animate-spin-slow" : "opacity-50 group-hover:opacity-100"}`} />
                      <span>PENDING</span>
                      {r.status === "Pending" && (
                         <span className="absolute inset-0 bg-amber-400/5 animate-pulse"></span>
                      )}
                    </button>

                    <button
                      onClick={() => handleStatusChange(r.reviewId, "Approved")}
                      className={`group relative px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-500 flex items-center gap-2 overflow-hidden ${
                        r.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                          : "bg-white/5 text-slate-500 border border-white/5 hover:border-emerald-500/30 hover:text-emerald-300"
                      }`}
                    >
                      <FaCheck className={`${r.status === "Approved" ? "scale-110" : "opacity-50 group-hover:opacity-100"}`} />
                      <span>APPROVED</span>
                      {r.status === "Approved" && (
                         <span className="absolute inset-0 bg-emerald-400/5 animate-pulse"></span>
                      )}
                    </button>
                  </div>
                </td>

                {/* DELETE BUTTON */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(r.reviewId)}
                    className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 group"
                    title="Delete Review"
                  >
                    <FaTrash className="text-sm group-hover:scale-110 transition-transform" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {reviews.length === 0 && (
          <div className="text-center text-slate-500 mt-8">
            No reviews found.
          </div>
        )}
      </div>
    </div>
  );
}
