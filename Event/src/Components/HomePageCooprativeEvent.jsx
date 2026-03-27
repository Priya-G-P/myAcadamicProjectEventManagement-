import React from "react";
import { IoMdCall } from "react-icons/io";
import { MdWhatsapp } from "react-icons/md";
import Navbar from "./HomePageNav.jsx";
import Footer from "./footerPage.jsx";

const Tail = () => {

    return (
        <>
            <Navbar />

            {/* ================= HERO SECTION (UNCHANGED) ================= */}
            <section
                className="relative h-[650px] flex items-center px-[10%] text-white bg-center bg-cover"
                style={{ backgroundImage: "url('/gallery5.jpeg')" }}>

                <div className="absolute inset-0 bg-black/55"></div>

                <div className="relative z-10 max-w-[900px]">
                    <h1 className="text-[3rem] md:text-[3rem] max-md:text-[2.2rem] font-bold leading-[1.2] mb-5">
                        Corporate Event Management Companies in Karanataka
                    </h1>

                    <p className="text-base leading-[1.7] mb-8 text-[#eaeaea]">
                        Experience the magic of Karanataka's top corporate event management companies in Kochi.
                    </p>

                    <div className="flex gap-[15px] flex-wrap">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-[28px] py-[14px] rounded-full text-base font-semibold bg-[#9b6cff] text-white hover:bg-[#7f50e6]">
                            <IoMdCall />book now
                        </a>

                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-[28px] py-[14px] rounded-full text-base font-semibold bg-[#25d366] text-white hover:bg-[#1ebe5d]">
                            <MdWhatsapp />Whatsapp us
                        </a>
                    </div>
                </div>
            </section>

            {/* ================= IMPROVED CONTENT SECTION ================= */}
            <section className="py-20 px-6 bg-gray-50">

                <div className="max-w-6xl mx-auto">

                    {/* TEXT BLOCK */}
                    <div className="bg-white p-10 rounded-2xl shadow-md">

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                            The Leading Corporate Event Management Group in Karanataka
                        </h2>

                        <div className="space-y-6 text-gray-700 leading-7 text-lg">

                            <p>
                                Business meetings and corporate events are the best and most novel
                                ways to stimulate the team and get them thinking creatively and outside the box.
                            </p>

                            <p>
                                With Spark® Movement, corporate event management companies in Karanataka
                                goes beyond just planning a meeting. We plan and execute corporate hospitality,
                                exhibitions, incentive travel programs, and more.
                            </p>

                            <p>
                                We specialize in theming, décor, signage,
                                <span className="text-purple-600 font-semibold"> entertainment </span>
                                and venue sourcing — everything needed for a successful event.
                            </p>

                            <p>
                                Our experts collaborate closely with clients to turn ideas into reality
                                and deliver memorable corporate experiences.
                            </p>

                            <p>
                                We handle everything from concept to execution so you can focus on your business goals.
                            </p>

                        </div>
                    </div>

                    {/* IMAGE BLOCK */}
                    <div className="mt-12">
                        <div
                            className="w-full h-[500px] rounded-2xl shadow-lg bg-cover bg-center"
                            style={{
                                backgroundImage: "url('/corparative.jpeg')"
                            }}
                        ></div>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default Tail;