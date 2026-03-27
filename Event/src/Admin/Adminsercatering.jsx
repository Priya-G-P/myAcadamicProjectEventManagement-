import React, { useState } from "react";

function AdminSerFest() {

  // ---------------- MENU DATA ----------------
  const [booking] = useState([
    {
      id: 1,
      name: "Starter",
      image: "CateringCard5.jpg",
      dishes: ["Spring Rolls", "Paneer Tikka", "Potato Wedges", "Crispy Corn", "Garlic Bread"]
    },
    {
      id: 2,
      name: "Main Course",
      image: "CateringCard1.jpg",
      dishes: ["Butter Chicken", "Veg Biryani", "Dal Makhani", "Paneer Butter Masala", "Jeera Rice"]
    },
    {
      id: 3,
      name: "Dessert",
      image: "CateringCard6.jpg",
      dishes: ["Gulab Jamun", "Ice Cream", "Rasmalai", "Fruit Custard", "Jalebi"]
    }
  ]);

  const [openMenus, setOpenMenus] = useState({});
  const [selectedDish, setSelectedDish] = useState({});

  const handleBooking = () => {
    const allSelected = booking.every((item) => selectedDish[item.id]);
    if (!allSelected) {
      alert("Create full menu");
    } else {
      alert("Booking Successful!");
    }
  };

  const openMenuFor = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: true }));
  };

  const closeMenuFor = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="flex-1 min-h-screen bg-white-100 p-6 overflow-y-auto">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">Festival Menu</h1>

      {/* CARDS */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {booking.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-visible">

            <img
              src={book.image}
              alt={book.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-bold">{book.name}</h3>

              <button
                onClick={() => openMenuFor(book.id)}
                className="mt-4 w-full bg-purple-500 text-white px-4 py-2 rounded-full"
              >
                Create Menu
              </button>

              {/* DROPDOWN */}
              {openMenus[book.id] && (
                <div className="mt-4 bg-white border rounded-lg shadow p-4 relative">

                  <button
                    onClick={() => closeMenuFor(book.id)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    X
                  </button>

                  {book.dishes.map((dish, idx) => (
                    <label key={idx} className="flex items-center gap-3 py-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`menu-${book.id}`}
                        value={dish}
                        checked={selectedDish[book.id] === dish}
                        onChange={() =>
                          setSelectedDish({ ...selectedDish, [book.id]: dish })
                        }
                      />
                      {dish}
                    </label>
                  ))}

                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* BOOK BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleBooking}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold"
        >
          Book
        </button>
      </div>

    </div>
  );
}

export default AdminSerFest;