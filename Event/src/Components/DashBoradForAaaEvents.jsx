import React, { useState } from "react";

const EventCard = () => {
  const [events, setEvents] = useState(["Birthday", "Cooperative", "Independence"]);

  const handleDelete = (eventName) => {
    setEvents(events.filter((e) => e !== eventName));
  };

  const handleAdd = () => {
    const newEvent = prompt("Enter event name:");
    if (newEvent) setEvents([...events, newEvent]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl  p-6 lg:p-10 w-[350px] lg:w-[500px] text-gray-800">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="font-bold text-2xl text-indigo-600">Events</h2>
          <button
            onClick={handleAdd}
            className="bg-indigo-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-indigo-600 transition transform hover:scale-110"
          >
            +
          </button>
        </div>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-indigo-50 px-3 py-2 lg:px-4 lg:py-3 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="font-medium text-lg">{event}</span>
                <button
                  onClick={() => handleDelete(event)}
                  className="text-red-500 font-bold text-lg hover:text-red-700 transition"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 italic text-lg">No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
