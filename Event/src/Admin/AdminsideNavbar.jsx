import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaImages } from "react-icons/fa";
import {
    FaHome,
    FaChevronDown,
    FaChevronUp,
    FaServicestack,
    FaStar,
    FaBars,
    FaTimes,
    FaHeart,
    FaBuilding,
    FaGlassCheers,
    FaUtensils,
    FaUserFriends,
} from "react-icons/fa";



export default function SideNavbar() {
    const [isOpen, setIsOpen] = useState(true);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [active, setActive] = useState("Home");

    const menuItemClass = (name) =>
        `flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${active === name
            ? "bg-blue-100 text-blue-600 font-semibold"
            : "hover:bg-gray-100 text-gray-700"
        }`;

    return (
        <div className="flex">
            {/* Sidebar */}

            <div
                className={`fixed top-0 left-0 bg-white shadow-xl h-screen transition-all duration-300 z-50 ${isOpen ? "w-64" : "w-20"
                    }`}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {isOpen && (
                        <h2 className="text-xl font-bold text-gray-800">My Sidebar</h2>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                </div>

                <ul className="p-3 space-y-2">
                    {/* Home */}
                    <Link to="/admin" className="block">
                        <li className={menuItemClass("Home")}>
                            <FaHome />
                            {isOpen && <span>Home</span>}
                        </li>
                    </Link>

                    <Link to="/admin/booking" className="block">
                        <li className={menuItemClass("BookingManagement")}>
                            <FaCalendarCheck />
                            {isOpen && <span>Booking Management</span>}
                        </li>
                    </Link>

                    <Link to="/admin/Servicesimg" className="block">
                        <li className={menuItemClass("ServicesImgManagement")}>
                            <FaImages />
                            {isOpen && <span>Service Image Management</span>}
                        </li>
                    </Link>
                    {/* Services */}
                    <li>
                        <div
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <FaServicestack />
                                {isOpen && <span>Services</span>}
                            </div>
                            {isOpen &&
                                (servicesOpen ? (
                                    <FaChevronUp size={14} />
                                ) : (
                                    <FaChevronDown size={14} />
                                ))}
                        </div>

                        {/* Dropdown */}
                        {servicesOpen && isOpen && (
                            <ul className="ml-8 mt-2 space-y-2 text-sm">
                                <Link to="/admin/services" className="block">
                                    <li
                                        onClick={() => setActive("Wedding")}
                                        className={menuItemClass("Wedding")}
                                    >
                                        <FaHeart size={14} /> Wedding
                                    </li>
                                </Link>
                                <Link to="/admin/Festival" className="block">
                                    <li
                                        onClick={() => setActive("Festival")}
                                        className={menuItemClass("Festival")}
                                    >
                                        <FaGlassCheers size={14} /> Festival
                                    </li>
                                </Link>
                                            <Link to="/admin/catering" className="block">
                                            <li
                                    onClick={() => setActive("Catering")}
                                    className={menuItemClass("Catering")}
                                >
                                    <FaUtensils size={14} /> Catering
                                </li>
                                </Link>
                                <Link to="/admin/PrivateParties" className="block">
                                    <li
                                        onClick={() => setActive("Private")}
                                        className={menuItemClass("Private")}
                                    >
                                        <FaUserFriends size={14} /> Private Parties
                                    </li>
                                </Link>
                            </ul>
                        )}
                    </li>

                    {/* Review */}
                    <li
                        onClick={() => setActive("Review")}
                        className={menuItemClass("Review")}
                    >
                        <FaStar />
                        {isOpen && <span>Review</span>}
                    </li>
                </ul>
            </div>
        </div>
    );
}
