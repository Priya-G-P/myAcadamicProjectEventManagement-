import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Loginimg1 from "../assets/Loginimg1.jpeg";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ CONNECT TO API
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://localhost:7276/api/Signup/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: data.email.trim(),   // ✅ FIX
            password: data.password.trim()
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result || "Login failed");
      }

      console.log("Login Success:", result);

      // ✅ Save user data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(result));

      alert("Login successful ✅");

      // ✅ Redirect based on role
      if (result.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 lg:px-20 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Welcome Back....!</h2>
          <p className="text-gray-600 mb-8">
            Login to start managing your projects.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* EMAIL */}
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-4 py-3 border rounded-lg mb-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-3">
                {errors.email.message}
              </p>
            )}

            {/* PASSWORD */}
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-3 border rounded-lg mb-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-3">
                {errors.password.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-700 transition mt-4"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="w-full lg:w-1/2 h-64 lg:h-[690px] order-1 lg:order-2 m-4">
        <img
          src={Loginimg1}
          alt="Login background"
          className="h-full w-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Login;