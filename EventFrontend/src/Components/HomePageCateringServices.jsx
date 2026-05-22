import React, { useState } from "react";
import Navbar from "./HomePageNav.jsx";
const CateringServices = () => {
    const [venues] = useState([
        {
            id: 1,
            name: "Traditional Karnataka Sadhya",
            location: "A completely authentic traditional culinary experience bringing authentic Karnataka flavors straight to your plate.",
            image: "catering3.png"
        },
        {
            id: 2,
            name: "Seafood Delicacies",
            location: "Luxurious, fresh coastal catches brilliantly crafted with exotic and deep aromatic marinades.",
            image: "catering4.png"
        },
        {
            id: 3,
            name: "Karnataka-Style Biryani",
            location: "Signature spicy and richly fragrant regional Biryani bringing the heat and heart of local spices.",
            image: "catering5.png"
        },
        {
            id: 4,
            name: "North Indian Cuisine",
            location: "Decadent North Indian curries, rich buttery breads, and perfectly charcoal-smoked authentic tandoori.",
            image: "catering6.png"
        },
        {
            id: 5,
            name: "Starters & Appetizers",
            location: "Gourmet bite-sized exquisite creations carefully crafted to perfectly start the sophisticated celebration.",
            image: "catering7.png"
        },
        {
            id: 6,
            name: "Artisan Desserts",
            location: "Beautifully plated master-crafted sweets blending deep traditional elegance with striking modern flair.",
            image: "catering8.png"
        },
    ]);

    const [starters, setStarters] = useState([]);
    const [mainCourses, setMainCourses] = useState([]);
    const [desserts, setDesserts] = useState([]);

    React.useEffect(() => {
        fetch("http://localhost:5238/api/Catering/starters").then(res => res.json()).then(setStarters);
        fetch("http://localhost:5238/api/Catering/maincourse").then(res => res.json()).then(setMainCourses);
        fetch("http://localhost:5238/api/Catering/desserts").then(res => res.json()).then(setDesserts);
    }, []);

    const [catering] = useState([
        {
            id: 1,
            name: "Budget Strategy",
            location: "We sit down to perfectly map out exquisite premium menus matching exactly what you are comfortable investing."
        },
        {
            id: 2,
            name: "Guest Preferences",
            location: "Immaculately understanding specific dietary needs, palates, and allergy demands for a flawlessly safe service."
        },
        {
            id: 3,
            name: "Service Architecture",
            location: "From grand opulent buffets to finely dedicated table services, our layout designs are purely focused on flow."
        },
        {
            id: 4,
            name: "Beverage Matching",
            location: "Curated wine pairings, stunning mocktails, and fresh juices carefully selected to complement the food perfectly."
        },
        {
            id: 5,
            name: "Logistics Excellence",
            location: "Flawless temperature-monitored fleet delivery bringing kitchen-fresh absolute perfection straight to your table."
        },
        {
            id: 6,
            name: "Our Reputation",
            location: "The undisputed highly renowned culinary partner representing uncompromised and pure gastronomic brilliance."
        }
    ]);

    return (
        <div className="relative w-full bg-slate-50 font-sans overflow-hidden text-slate-800">
            <Navbar />

            {/* Elegant Hero Section */}
            <div className="relative w-full h-[85vh] ">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/cccc.jpeg')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/20 flex flex-col justify-center"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-24 h-full flex flex-col justify-center text-white">
                    <h2 className="text-sm font-bold tracking-widest text-sky-400 uppercase mb-3">Impeccable Taste</h2>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight line-clamp-3 drop-shadow-lg">
                        Gourmet Catering <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Services</span>
                    </h1>
                    <p className="mb-10 text-xl font-light text-slate-200 max-w-2xl">
                        Elevate your events with breathtaking culinary artistry, absolute perfection in every bite, and a service aesthetic designed for royalty.
                    </p>
                    <div className="w-40 h-1 bg-sky-400 rounded-full"></div>
                </div>
            </div>

            {/* Innovative Catering Grid Box */}
            <div className="py-24 px-6 md:px-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Master Cuisine</h2>
                    <h3 className="text-3xl font-extrabold text-slate-900">Exquisite Menu Profiles</h3>
                </div>

                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {venues.map((venue) => (
                        <div
                            key={venue.id}
                            className="group bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                        >
                            <div className="overflow-hidden h-56 relative w-full">
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors duration-300">{venue.name}</h3>
                                <p className="text-sm text-slate-500 font-light leading-relaxed">{venue.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Elegant Bento About Section */}
            <section className="py-24 px-10 md:px-24 bg-white relative">
                {/* Decorative float */}
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100/50 rounded-[4rem] rotate-12 blur-sm pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                    {/* Text */}
                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">The Spark Culnary Standard</h2>
                        <h3 className="text-3xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">Mastering The <br /><span className="text-sky-600">Art of Taste</span></h3>

                        <p className="text-lg text-slate-600 mb-6 font-light leading-relaxed">
                            At Spark Movement, we passionately believe your menu should be just as spectacular and breathtaking as the event itself.
                            Our exclusive gourmet catering weaves bold flavors with breathtaking presentations.
                        </p>

                        <p className="text-lg text-slate-600 mb-6 font-light leading-relaxed">
                            From impeccably timed appetizers and intricate interactive food stations to majestic grand multi-course banquets,
                            our highly trained culinary professionals perfectly architect every single flavor profile.
                        </p>

                        <div className="mt-4 flex items-center text-sky-500 font-bold hover:text-sky-700 cursor-pointer group w-max transition-colors">
                            Discover our chefs <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                    </div>

                    {/* Innovative Image Layout */}
                    <div className="order-1 md:order-2 relative h-[600px] w-full max-w-md mx-auto">
                        <div className="absolute inset-0 bg-blue-100 rounded-[3rem] translate-x-6 translate-y-6 shadow-2xl"></div>
                        <img
                            src="catering1.png"
                            alt="About Catering"
                            className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-xl z-10"
                        />
                    </div>
                </div>
            </section>

            {/* Planning Strategy Section */}
            <div className="px-6 md:px-24 py-24 bg-slate-50">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Service Architecture</h2>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-6">Vital Catering Factors</h3>
                    <p className="text-lg font-light text-slate-500 leading-relaxed">
                        Selecting your ultimate catering service demands precise analysis. Here is how our premium framework ensures a perfectly orchestrated dining experience.
                    </p>
                </div>

                {/* Innovative Glass Factors Grid */}
                <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {catering.map((item) => (
                        <div className="group bg-white p-10 rounded-[2.5rem] shadow-[0_5px_20px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(29,78,216,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-default"
                            key={item.id}>
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors duration-300">{item.name}</h3>
                            <p className="text-slate-500 font-light leading-relaxed">{item.location}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* LIVE MENU SECTION */}
            <div className="px-6 md:px-24 py-24 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Live Selection</h2>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-6">Current Menu Offerings</h3>
                        <p className="text-lg font-light text-slate-500 leading-relaxed">
                            Discover our chef's current active culinary creations ready to be integrated into your next event.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Starters */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                            <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 mb-6">Starters</h4>
                            <ul className="space-y-4">
                                {starters.length === 0 && <li className="text-slate-400 font-light italic">No items available.</li>}
                                {starters.map((item) => (
                                    <li key={item.id} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                                        {item.itemName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Main Course */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                            <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 mb-6">Main Course</h4>
                            <ul className="space-y-4">
                                {mainCourses.length === 0 && <li className="text-slate-400 font-light italic">No items available.</li>}
                                {mainCourses.map((item) => (
                                    <li key={item.id} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        {item.itemName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Desserts */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                            <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-6">Desserts</h4>
                            <ul className="space-y-4">
                                {desserts.length === 0 && <li className="text-slate-400 font-light italic">No items available.</li>}
                                {desserts.map((item) => (
                                    <li key={item.id} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                        {item.itemName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CateringServices;
