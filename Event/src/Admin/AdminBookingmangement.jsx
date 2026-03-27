import React, { useEffect, useState } from "react";

export default function AdminBookingManagement() {

  const [bookings, setBookings] = useState([]);

  // 🔥 FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await fetch("https://localhost:7276/api/Booking/getAllBooking");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    await fetch(`https://localhost:7276/api/Booking/delete/${id}`, {
      method: "DELETE",
    });

    fetchBookings();
  };

  // 🔥 UPDATE STATUS
  const handleStatusChange = async (id, status) => {
    await fetch(`https://localhost:7276/api/Booking/updateStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    });

    fetchBookings();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <table className="w-full border text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Event</th>
              <th className="p-3">Date</th>
              <th className="p-3">Guests</th>
              <th className="p-3">Days</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">image</th>
              <th className="p-3">Services</th>
              <th className="p-3">action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.bookingid} className="border-b">

                <td className="p-3">{b.bookingid}</td>
                <td className="p-3">{b.userName}</td>
                <td className="p-3">{b.phoneNumber}</td>
                <td className="p-3">{b.functionType}</td>
                <td className="p-3">{b.date?.split("T")[0]}</td>
                <td className="p-3">{b.numberofGuset}</td>
                <td className="p-3">{b.numberofdays}</td>

                {/* STATUS */}
                <td className="p-3">
                  <select
                    value={b.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(b.bookingid, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={b.image}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>

                {/* SERVICE */}
                <td className="p-3">{b.serviceName}</td>

                {/* DELETE */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(b.bookingid)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}