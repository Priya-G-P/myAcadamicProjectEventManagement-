import React from "react";
import { IoMdCall } from "react-icons/io";
import { MdWhatsapp } from "react-icons/md";
import Navbar from "./HomePageNav.jsx";
import { Link } from "react-router-dom";

const Tail = () => {
    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-slate-50 font-sans">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative w-screen h-[85vh] ">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/corparative.jpeg')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/40 flex flex-col justify-center"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-10 lg:px-24 h-full flex flex-col justify-center text-white">
                    <h2 className="text-sm font-bold tracking-widest text-sky-400 uppercase mb-3">Enterprise Excellence</h2>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight line-clamp-3 drop-shadow-lg">
                        Corporate Event <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Management</span>
                    </h1>

                    <p className="mb-10 text-xl font-light text-slate-200 max-w-2xl leading-relaxed">
                        Stimulate your team and foster creative, out-of-the-box thinking through impeccably executed corporate hospitality and elite business events.
                    </p>

                    <div className="flex gap-6 flex-wrap">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <IoMdCall className="text-xl" /> Contact Us
                        </Link>

                        <a
                            href="https://wa.me/9986146509/?text=Hello%20Spark%20Movement%20Karnataka%2C%20I%20am%20interested%20in%20your%20Corporate%20Event%20services.%20Please%20provide%20more%20details."
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5">
                                <MdWhatsapp className="text-xl" /> Whatsapp Enquiry
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* IMPROVED CONTENT SECTION */}
            <section className="py-24 px-6 md:px-24 bg-white relative">
                {/* Decorative background piece */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/50 rounded-bl-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

                    {/* TEXT BLOCK */}
                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-3">Unmatched Precision</h2>
                        <h3 className="text-3xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">
                            The Leading Corporate Event <br /><span className="text-sky-600">Group in Karnataka</span>
                        </h3>

                        <div className="space-y-6 text-slate-600 font-light leading-relaxed text-lg">
                            <p>
                                Business meetings and corporate events are the absolute best, most novel ways to stimulate the team and get them thinking creatively.
                            </p>
                            <p>
                                With Spark Movement, corporate event management goes infinitely beyond planning a meeting. We meticulously plan and execute full-scale corporate hospitality, exhibitions, incentive travel programs, and massive retreats.
                            </p>
                            <p>
                                We deeply specialize in high-end theming, modern décor, advanced digital signage,
                                <span className="text-sky-500 font-bold ml-1 mr-1">premium entertainment</span>
                                and meticulous venue sourcing.
                            </p>
                            <p>
                                We handle absolutely everything from conceptual architecture to on-ground execution, freeing you to focus entirely on your ultimate business goals.
                            </p>
                        </div>
                    </div>

                    {/* IMAGE BLOCK */}
                    <div className="order-1 md:order-2 relative h-[600px] w-full max-w-lg mx-auto">
                        <div className="absolute inset-0 bg-blue-100 rounded-[3rem] translate-x-6 translate-y-6 shadow-2xl"></div>
                        <img
                            src="/gallery5.jpeg"
                            alt="Corporate Excellence"
                            className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-xl z-10"
                        />
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Tail;
