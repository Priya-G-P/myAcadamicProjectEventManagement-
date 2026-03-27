import React, { useState } from "react";

const App = () => {
  const video = { id: "ya7qAtCoGNI", title: "" }; // single event
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-[#fdf7f0] min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-4xl md:text-4xl font-bold mb-8 text-neutral-800 text-center">
        Our Event
      </h1>

      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-semibold mb-6 text-neutral-700 text-center">
          {video.title}
        </h3>

        {/* Show thumbnail until clicked */}
        {!playing ? (
          <div
            className="relative cursor-pointer rounded-xl overflow-hidden shadow-2xl"
            onClick={() => setPlaying(true)}
          >
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-auto object-cover"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          // Show YouTube video
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              title={video.title}
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
