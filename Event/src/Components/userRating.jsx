import React from "react";
import { CiStar } from "react-icons/ci";
/* slick slider default styles */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export default function UserRating() {
  const userRating = [
    {
      name: "Peter K P",
      date: "2023-04-09",
      review:
        "Melodia Events is very good event management in Thrissur. My daughter's wedding was amazing with this company. We recommend to everyone this group.",
      rating: 5,
    },
    {
      name: "Pushpa P L",
      date: "2023-04-07",
      review:
        "Very good event management company. Good team management and coordination. Wedding event management services of this company was amazing in my relative wedding.",
      rating: 5,
    },
    {
      name: "Jancy Rappai",
      date: "2023-04-06",
      review:
        "In my experience it is the best event management company in Karnataka.",   
      rating: 5,
    },
    {
      name: "Arun S",
      date: "2023-04-05",
      review:
        "Excellent event planning and execution. Everything was well organized and on time.",
      rating: 5,
    },
    {
      name: "Divya K",
      date: "2023-04-04",
      review:
        "Professional and creative team. They made our function memorable.",
      rating: 5,
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // show 3 testimonials at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-center text-2xl font-bold text-purple-700">
        CLIENT TESTIMONIALS
      </h2>
      <p className="text-center text-gray-600 mb-8">
        See What our Clients has to Say
      </p>

      <div className="px-6 ">
        <Slider {...settings}>
          {userRating.map((t, index) => (
            <div key={index} className="p-3">
              <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-3 h-full">
                <div className="flex items-center">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <CiStar
                      key={i}
                      className="text-yellow-500 fill-yellow-500 w-5 h-5"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{t.review}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
