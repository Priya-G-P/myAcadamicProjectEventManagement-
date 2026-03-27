import React, { useState } from 'react';
import Loginimg1 from "../assets/Loginimg1.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    Email: '',
    password: '',
    phoneNumber: ''
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:7276/api/Signup/signup",
        formData
      );

      if (res.status === 200) {
        alert("Signup successful ✅");
        navigate("/login");
      }

    } catch (err) {
      console.error(err);
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">

        {/* LEFT */}
        <div className="w-full md:w-1/2 p-8 space-y-4">
          <h1 className="text-3xl font-bold text-center">Get Started Now</h1>

          {/* ✅ IMPORTANT: onSubmit */}
          <form className="space-y-4" onSubmit={handleSignUp}>

            <input
              type="text"
              placeholder="Full name"
              className="w-full border rounded px-4 py-2"
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full border rounded px-4 py-2"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-4 py-2"
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded px-4 py-2"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded px-4 py-2"
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />

            {/* ✅ SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded"
            >
              Sign Up
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 p-4">
          <img src={Loginimg1} alt="signin" className="rounded-2xl h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default Signin;