import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/image.png";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = isRegister ? form.fullName.value.trim() : null;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (isRegister && !fullName) {
      setPasswordError("Full Name is required.");
      return;
    }
    if (!email) {
      setPasswordError("Email is required.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include 1 lowercase, 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    // Navigation to home
    setPasswordError("");
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen w-full">

      <div className="flex flex-[8] bg-[#3D6E9B] items-center justify-center">
        <p className="font-['Crimson_Pro'] text-white text-center text-[64px] font-bold leading-tight">
          Transformative Workforce <br /> Academy
        </p>
      </div>


      <div className="flex flex-[3] bg-[#003DA5] flex-col px-10 text-white pt-[8%]">

        <div className="self-center mb-25">
          <img src={Image} alt="SLU Logo" className="h-[80px] object-contain" />
        </div>

        <form
          className="flex flex-col w-full font-['Crimson_Pro']"
          onSubmit={handleSubmit}
        >
          {isRegister && (
            <>
              <label className="text-[16px] mb-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                className="mb-4 w-full h-[45px] px-4 rounded-[5px] border border-gray-300 bg-white text-black placeholder-black/60 font-['Crimson_Pro']"
              />
            </>
          )}

          <label className="text-[16px] mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            className="mb-4 w-full h-[45px] px-4 rounded-[5px] border border-gray-300 bg-white text-black placeholder-black/60 font-['Crimson_Pro']"
          />

          <label className="text-[16px] mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="mb-2 w-full h-[45px] px-4 rounded-[5px] border border-gray-300 bg-white text-black placeholder-black/60 font-['Crimson_Pro']"
          />

          {/* password error */}
          {passwordError && (
            <p className="text-red-500 text-[16px] mb-2 font-['Crimson_Pro']">
              {passwordError}
            </p>
          )}

          <div className="flex items-center justify-between mb-4 text-[16px]">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-[20px] h-[20px]" />
              <span className="font-['Crimson_Pro']">Remember me</span>
            </label>
            <button
              type="button"
              className="no-underline font-['Crimson_Pro'] text-left cursor-pointer bg-transparent border-none p-0"
              onClick={() => console.log("Forgot password clicked")}
            >
              Forgot password?
            </button>
          </div>


          <button
            type="submit"
            className="w-full h-[45px] rounded-[5px] bg-[#575756] text-white text-[16px] mb-4 font-['Crimson_Pro'] cursor-pointer"
          >
            {isRegister ? "Register" : "Sign In"}
          </button>


          <p
            className="text-[16px] mb-2 font-['Crimson_Pro'] cursor-pointer no-underline"
            onClick={toggleMode}
          >
            {isRegister ? "Already a User? Login" : "New User? Register Here"}
          </p>


          <p className="text-[16px] font-['Crimson_Pro']">
            Contact 314-977-4000 for help
          </p>
        </form>
          <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-white font-['Crimson_Pro']">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* <span className="text-center mb-4 font-['Crimson_Pro']">OR</span> */}
        <button
          type="submit"
          onClick={() => navigate("/home")}
         className="w-full h-[45px] rounded-[5px] bg-white text-black text-[16px] mb-4 font-['Crimson_Pro'] cursor-pointer shadow-md transform transition duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          Continue as a Guest
        </button>
      </div>
      <div className="flex flex-[1] bg-[#3D6E9B]" />
    </div>
  );
}