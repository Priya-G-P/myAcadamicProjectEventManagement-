import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function UserRating() {
  const [userRating, setUserRating] = useState([]);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const res = await fetch("http://localhost:5238/api/Review/approved");
        const data = await res.json();
        const formatted = data.map(r => ({
          name: r.userName || "Happy Client",
          date: new Date(r.reviewDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }),
          review: r.reviewText,
          rating: r.rating
        }));
        setUserRating(formatted);
      } catch (e) {
        console.error(e);
      }
    };
    fetchApprovedReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full max-w-7xl overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-purple-600 uppercase mb-3">Client Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Loved by thousands <br/> across <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">Karnataka</span>
          </h3>
        </div>

        {userRating.length === 0 ? (
          <div className="text-center text-slate-400 py-12 italic">Currently collecting recent client testimonials... check back soon!</div>
        ) : (
          <Slider {...settings} className="px-4 pb-12 cursor-grab active:cursor-grabbing">
            {userRating.map((t, index) => (
              <div key={index} className="px-4 h-full py-4">
                <div className="relative bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-8 h-[320px] flex flex-col justify-between group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] overflow-hidden">
                  
                  {/* Glowing Corner Accent */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-full blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out"></div>
                  
                  <FaQuoteRight className="absolute top-8 right-8 text-5xl text-purple-100 group-hover:text-purple-200 transition-colors duration-500 transform -rotate-12" />

                  <div>
                      <div className="flex items-center gap-1 mb-6 relative z-10">
                      {Array.from({ length: t.rating }, (_, i) => (
                          <FaStar key={i} className="text-amber-400 w-4 h-4 drop-shadow-sm" />
                      ))}
                      </div>
                      
                      <p className="text-slate-600 font-medium leading-relaxed object-cover relative z-10 line-clamp-4">
                         "{t.review}"
                      </p>
                  </div>

                  <div className="flex items-center gap-4 mt-8 relative z-10 pt-6 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">{t.name}</p>
                      <p className="text-xs text-purple-500 font-bold uppercase tracking-wider mt-0.5">{t.date}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      
      {/* Required for Slick Slider Overrides */}
      <style>{`
        .slick-dots li button:before {
            font-size: 14px;
            color: #cbd5e1;
            transition: all 0.3s ease;
        }
        .slick-dots li.slick-active button:before {
            color: #a855f7;
            transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}
