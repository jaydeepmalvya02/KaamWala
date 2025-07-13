import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(AuthContext);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success("OTP sent to your email");
        setShowOtpInput(true);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Please enter OTP");
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, {
        email,
        otp,
        type:"login"
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("OTP verification failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#000430] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#000430]">
          Login to KaamWala
        </h2>
        <form className="space-y-5" onSubmit={handleSendOtp}>
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send OTP
          </button>

          {showOtpInput && (
            <div className="mt-4">
              <label className="block mb-1 text-gray-700">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Verify & Login
              </button>
            </div>
          )}
        </form>
        <div className="flex flex-row mt-3 gap-1 items-center justify-between">
          <label className="flex items-center gap-1">
            <input type="checkbox" name="rememberMe" id="rememberMe" />
            <span>Remember Me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
