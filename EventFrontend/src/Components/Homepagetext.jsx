
import React from 'react';
import { Link } from "react-router-dom";
const photos = [
  'HomePage1Photo1.jpg',
  'HomePage1Photo2.jpg',
  'HomePage1Photo3.jpg',
  'HomePage1Photo4.jpg',
];

const HomePage1 = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Photo Grid */}
        <div className="grid grid-cols-2 gap-4">
          {photos.map((src, idx) => (
            <div key={idx} className="w-full h-44 md:h-56 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={src}
                alt={`Promo ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Right: Text and Buttons */}
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            UNLOCK YOUR DREAM DESTINATION WEDDING
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae tempora laborum quos veniam corrupti tempore quae totam non. Cumque facilis iure fuga deleniti dolore vitae delectus ipsam reiciendis excepturi corrupti.
            Voluptatem architecto non nostrum minima doloremque eaque, illum sapiente laudantium magnam nihil veritatis, nulla itaque enim dolor quasi impedit et. Molestias harum quaerat quidem eveniet dicta dolorum officia obcaecati? Laborum?
            Recusandae, consequuntur voluptatum. Quidem labore rem at, tempore repellendus ex laborum aut animi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition inline-block text-center"
            >
              Contact us
            </Link>
            <a
              href="https://wa.me/9986146509/?text=Hello%20Spark%20Movement%20Karnataka%2C%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition">
                Whatsapp us
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage1;
