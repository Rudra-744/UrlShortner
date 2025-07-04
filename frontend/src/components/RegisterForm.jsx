import React, { useState } from "react";
import bgImg from "../assets/images/bg.jpg";
import { registerUser } from "../api/user.api";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

export default function RegisterForm({state}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setSuccess(""); 
      return;
    }
    if(password.length<6){
      setError("Password must be at least 6 characters long.");
      return;
  }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await registerUser(name, email, password);
      setLoading(false);
      dispatch(login(data.user));
      navigate({to:"/dashboard"})

    } catch (error) {
      console.error("Register error:", error); 
      setError(error.message || 'Failed To Register. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2 bg-white font-poppins">
      {/* Left Panel */}
      <div className="relative flex flex-col items-center justify-center bg-indigo-500 text-white p-10">
        <img
          src={bgImg}
          alt="Shortener Graphic"
          className="w-80 mb-8 drop-shadow-2xl rounded-xl"
        />
        <h2 className="text-3xl font-bold mb-2">Join the Shortening Revolution</h2>
        <p className="text-lg text-white/90 max-w-sm text-center">
          Create your account to manage, track, and simplify your links in one place.
        </p>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex items-center justify-center px-4 sm:px-8 lg:px-16 py-10">
        <div
          className="bg-white shadow-xl rounded-3xl px-8 py-10 w-full max-w-md relative"
        >
          <div className="text-3xl font-bold text-indigo-500 mb-8 text-center">
            Create Account
          </div>

          {/* Name Input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              👤
            </span>
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              📧
            </span>
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              🔒
            </span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400"
              tabIndex={-1}  
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg hover:scale-105 transition-all duration-200"
            onClick={handleSubmit}
            disabled={loading}

          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          <div className="flex justify-center mt-4 text-sm text-indigo-400">
            <span>
              <span className="text-zinc-500 font-semibold">Already have an account? </span> 
              <span onClick={() => state(true)} style={{cursor: "pointer"}} className="text-indigo-500 font-semibold underline">Sign In</span>
            </span>
          </div>
        </div>
      </div>
    </div>  
  );
}
