import React, { useState } from "react";
import bgImg from "../assets/images/bg.jpg";
import { loginUser } from "../api/user.api";
import { useSelector } from "react-redux";
import { login } from "../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

export default function LoginForm({ state }) {
  const [email, setEmail] = useState("rg@gmail.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);

  const handleSubmit = async () => {  
    setLoading(true);                         
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }   
    setError("");


    try { 
      const data = await loginUser(email, password);
      dispatch(login(data.user));
      
      // Use router.navigate for TanStack Router v5+
      await navigate({ to: '/dashboard' });
      
      setLoading(false);
      console.log("Sign in successful");
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials.");
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
        <h2 className="text-3xl font-bold mb-2">Shorten Smarter</h2>
        <p className="text-lg text-white/90 max-w-sm text-center">
          Manage, track, and simplify your links in one place. Make sharing
          effortless.
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex items-center justify-center px-4 sm:px-8 lg:px-16 py-10">
        <div className="bg-white shadow-xl rounded-3xl px-8 py-10 w-full max-w-md relative">
          <div>
            <div className="text-3xl font-bold text-indigo-500 mb-8 text-center">
              Welcome Back 👋
            </div>

            <div>
              {/* Email Input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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

              {/* Login Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                Login
              </button>

              <div className="flex justify-between mt-4 text-sm text-indigo-400">
                <span>Forgot Password?</span>
                <span
                  onClick={() => state(false)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-zinc-500 font-semibold">
                    Don't have an account?
                  </span>{" "}
                  <span className="text-indigo-500 font-semibold underline">
                    Register
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
