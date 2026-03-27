import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaTrash,
} from "react-icons/fa";

 function Home() {
  // ------------------ STATE ------------------
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState(560);

  // ------------------ INITIAL DATA ------------------
  useEffect(() => {
    const bookingData = [
      {
        id: 1,
        event: "Wedding Ceremony",
        client: "Priya Sharma",
        date: "20 Feb 2026",
        status: "Confirmed",
        price: 150000,
      },
      {
        id: 2,
        event: "Corporate Meetup",
        client: "Infosys Ltd",
        date: "25 Feb 2026",
        status: "Pending",
        price: 100000,
      },
      {
        id: 3,
        event: "Birthday Party",
        client: "Rahul Verma",
        date: "28 Feb 2026",
        status: "Cancelled",
        price: 50000,
      },
    ];

    setEvents(bookingData);
  }, []);

  // ------------------ CALCULATIONS ------------------
  const totalEvents = events.length;

  const totalRevenue = events
    .filter((e) => e.status === "Confirmed")
    .reduce((total, e) => total + e.price, 0);

  const totalBookings = events.length;

  // ------------------ FUNCTIONS ------------------

  const deleteBooking = (id) => {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
  };

  const changeStatus = (id) => {
    const updated = events.map((event) =>
      event.id === id
        ? {
            ...event,
            status:
              event.status === "Pending"
                ? "Confirmed"
                : event.status === "Confirmed"
                ? "Cancelled"
                : "Pending",
          }
        : event
    );

    setEvents(updated);
  };

  // ------------------ UI ------------------

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Event Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Total Events</p>
              <h2 className="text-2xl font-bold text-blue-600">
                {totalEvents}
              </h2>
            </div>
            <FaCalendarAlt className="text-blue-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h2 className="text-2xl font-bold text-green-600">
                {users}
              </h2>
            </div>
            <FaUsers className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h2 className="text-2xl font-bold text-purple-600">
                ₹{totalRevenue.toLocaleString()}
              </h2>
            </div>
            <FaMoneyBillWave className="text-purple-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Bookings</p>
              <h2 className="text-2xl font-bold text-orange-600">
                {totalBookings}
              </h2>
            </div>
            <FaClipboardList className="text-orange-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Bookings
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3">Event</th>
              <th className="p-3">Client</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{event.event}</td>
                <td className="p-3">{event.client}</td>
                <td className="p-3">{event.date}</td>

                <td
                  onClick={() => changeStatus(event.id)}
                  className={`p-3 font-medium cursor-pointer ${
                    event.status === "Confirmed"
                      ? "text-green-600"
                      : event.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {event.status}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteBooking(event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No bookings available.
          </p>
        )}
      </div>
    </div>
  );
}
export default Home;
