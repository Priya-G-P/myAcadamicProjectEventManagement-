import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loginimg1 from "../assets/Loginimg1.jpeg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from 'react-toastify';

gsap.registerPlugin(useGSAP);

const Login = () => {
  const navigate = useNavigate();
  const container = useRef();
  const [showPassword, setShowPassword] = useState(false);

  useGSAP(() => {
    gsap.fromTo(".auth-card",
      { opacity: 0, y: 30, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(".auth-image",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.1 }
    );
  }, { scope: container });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5238/api/Signup/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: data.email.trim(),
            password: data.password.trim()
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result || "Login failed");
      }

      const userData = {
        userId: result.userId || result.uid || result.id || 0,
        name: result.fullname || result.username || result.name || "",
        email: result.email || result.Email || "",
        phone: result.phoneNumber || result.phone || result.PhoneNumber || ""
      };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login successful! Welcome back.", { icon: "👋" });

      if (result.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div ref={container} className="flex flex-col lg:flex-row min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden items-center">

      {/* Form Side */}
      <div className="auth-card flex flex-col justify-center items-center w-full lg:w-1/2 px-8 lg:px-20 order-2 lg:order-1 relative z-10 py-12">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative z-20">

          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold mb-3 tracking-tight text-slate-900">Welcome Back</h2>
            <p className="text-slate-500">
              Sign in to orchestrate your next perfect event.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                placeholder="hello@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl mb-1 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm block"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl mb-1 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm block pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl mt-4 hover:bg-blue-800 shadow-lg shadow-blue-700/30 hover:shadow-blue-700/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don’t have an account?{" "}
            <Link to="/signin" className="text-blue-700 font-bold hover:text-blue-800 hover:underline transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="auth-image w-full lg:w-1/2 h-64 lg:h-[90vh] order-1 lg:order-2 m-4 lg:m-6 lg:mr-8 relative">
        <img
          src={Loginimg1}
          alt="Event management elegant display"
          className="h-full w-full object-cover rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl brightness-[0.95]"
        />
      </div>
    </div>
  );
};

export default Login;
