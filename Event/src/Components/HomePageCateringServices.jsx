import React, { useState } from "react";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage";
const CateringServices = () => {
    const [venues, setVenues] = useState([
        {
            id: 1,
            name: "Traditional karnathaka Sadhya",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus.",
            image: "catering3.png"
        },
        {
            id: 2,
            name: "Seafood Delicacies",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus.",
            image: "catering4.png"
        },
        {
            id: 3,
            name: "Karnatak-Style Biryani",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus.",
            image: "catering5.png"
        },
        {
            id: 4,
            name: "North Indian Cuisine",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus.",
            image: "catering6.png"
        },
        {
            id: 5,
            name: "Starters and Small Eats",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus.",
            image: "catering7.png"
        },
        {
            id: 6,
            name: "Desserts",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus.",
            image: "catering8.png"
        },

    ]);


    const [catering, setcatering] = useState([
        {
            id: 1,
            name: "Budget",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus."
        },
        {
            id: 2,
            name: "Guest Preferences",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus."
        },
        {
            id: 3,
            name: "Service System",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus."
        },
        {
            id: 4,
            name: "Drinks and Beverages",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus."
        },
        {
            id: 5,
            name: "Logistics, Supply, and Transportation",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus."
        },
        {
            id: 6,
            name: "Reputation",
            location: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, quaerat error reprehenderit, autem architecto adipisci omnis quae ipsa, magnam magni quia facilis non libero! Tempore nisi illo debitis possimus."
        }

    ]);

    const [booking, setBooking] = useState([
        {
            id: 1,
            name: "Starter",
            image: "catering7.png",
            dishes: ["Spring Rolls", "Paneer Tikka", "Potato Wedges", "Crispy Corn", "Garlic Bread"]
        },
        {
            id: 2,
            name: "Main Course",
            image: "catering3.png",
            dishes: ["Butter Chicken", "Veg Biryani", "Dal Makhani", "Paneer Butter Masala", "Jeera Rice"]
        },
        {
            id: 3,
            name: "Dessert",
            image: "catering8.png",
            dishes: ["Gulab Jamun", "Ice Cream", "Rasmalai", "Fruit Custard", "Jalebi"]
        }
    ]);

    // Track open closed 
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

    // Open dropdown for specific id
    const openMenuFor = (id) => {
        setOpenMenus((prev) => ({ ...prev, [id]: true }));
    };

    // Close dropdown for specific id
    const closeMenuFor = (id) => {
        setOpenMenus((prev) => ({ ...prev, [id]: false }));
    };


    return (
        <div className="relative w-full">
            <Navbar />
            {/* Hero Section */}
            <div className="relative w-full h-[650px] ">
                <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: "url('/cccc.jpeg')", }}></div>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-4xl px-8 lg:px-16 py-24 text-white ">
                    <h1 className="text-4xl lg:text-4xl font-bold leading-tight mt-90 ml-20">
                        Best Catering Services  in Karnataka
                    </h1>
                </div>
            </div>

            {/* Catering Grid */}
            <div className="max-w-full mx-auto px-6 py-25 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-pink-50">
                {venues.map((venue) => (
                    <div
                        key={venue.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover" />

                        <div className="p-4">

                            <h3 className="text-2xl font-bold text-black">{venue.name}</h3>

                            <p className="text-sm text-gray-500 my-1">{venue.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/*About Section */}
            <section className="min-h-[600px] px-10 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    {/* Text */}
                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4">Enchanting Weddings</h2>

                        <p className="text-gray-600 mb-4">
                            At Enchanting Weddings, we turn your special moments into timeless memories.
                            Every wedding we create is thoughtfully planned, beautifully designed, and
                            perfectly executed to reflect your unique love story.
                        </p>

                        <p className="text-gray-600 mb-4">
                            From elegant décor and exquisite catering to seamless event coordination,
                            our experienced team ensures that every detail is handled with care and
                            precision.
                        </p>

                        <p className="text-gray-600 mb-4">
                            We listen to your ideas, understand your vision and budget, and transform
                            them into a personalized wedding experience you and your guests will cherish forever.
                        </p>

                        <p className="text-gray-600">
                            We listen to your ideas, understand your vision and budget, and transform
                            them into a personalized wedding experience you and your guests will cherish forever.
                        </p>
                    </div>

                    {/* Image */}
                    <img
                        src="catering1.png"
                        alt="About"
                        className="order-1 md:order-2 w-full max-w-md mx-auto h-[500px] object-cover rounded-2xl"
                    />

                </div>
            </section>


           <div className="px-2 md:px-20 py-5 bg-pink-50">
            <h1 className="text-2xl lg:text-3xl font-bold leading-tight mt-25 ml-55  bg-pink-50">Factors to Consider When Choosing Catering Service in Karnataka</h1>
            <p className="font-light leading-tight mt 35 ml-65 bg-pink-50 ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, dolores esse omnis beatae in iusto. Magnam <br /> repudiandae enim nemo aperiam! Totam, non repellat. Aspernatur pariatur nisi accusamus, reiciendis laboriosam.</p>
            {/*Cards Grid */}
            <div className="max-w-full mx-auto px-6 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {catering.map((catering) => (
                    <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden "
                        key={catering.id}>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{catering.name}</h3>

                            <p className="text-sm text-gray-500 my-1">{catering.location}</p>
                        </div>
                    </div>
                ))}
                </div>
                </div>

                {/* Booking Section */}
            <div className="max-w-full mx-auto px-6 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {booking.map((book) => (
                    <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-visible">
                        <img src={book.image} alt={book.name} className="w-full h-52 object-cover"/>
                        <div className="p-4">

                            <h3 className="text-2xl font-bold text-black">{book.name}</h3>

                            {/* Create Menu Button */}
                            <button  onClick={() => openMenuFor(book.id)} className="mt-4 w-full bg-purple-500 text-white px-4 py-2 rounded-full font-medium"> view Menu </button>

                            {/* Dropdown  */}
                            {openMenus[book.id] && (
                                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg w-full p-4 relative">

                                    {/* Close */}
                                    <button onClick={() => closeMenuFor(book.id)} className="absolute top-2 right-2 text-red-600  text-xl">X</button>

                                    {book.dishes.map((dish, idx) => (
                                        <label key={idx} className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`menu-${book.id}`}
                                                value={dish}
                                                checked={selectedDish[book.id] === dish}
                                                onChange={() =>
                                                    setSelectedDish({ ...selectedDish, [book.id]: dish })
                                                }
                                                className="h-4 w-4 text-purple-600"/>
                                            <span className="text-gray-800">{dish}</span>
                                        </label>
                                    ))}

                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>

            {/* Book Button */}
            <div className="px-6 pb-12 justify-center flex">
               <button
                    onClick={() => navigate("/booking", { state: item })}
                    className="border border-purple-500 text-purple-500 px-4 py-2 rounded-full"
                  >
                    Book Now
                  </button>
            </div>

            <div className="py-5"></div>
            <Footer />
        </div>
    );
};

export default CateringServices;