import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(AuthContext);

  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    if (user.length <= 2) return "*@" + domain;
    return (
      user[0] +
      "*".repeat(user.length - 2) +
      user[user.length - 1] +
      "@" +
      domain
    );
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success("OTP sent to your email");
        setMaskedEmail(maskEmail(email));
        setShowOtpInput(true);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Please enter OTP");
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, {
        email,
        otp,
        type: "login",
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
    setLoading(false);
  };

  const handleResendOtp = async () => {
    if (!email || !password) return toast.error("Fill credentials first");
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success("OTP resent to your email");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setLoading(false);
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
              disabled={showOtpInput}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={showOtpInput}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!showOtpInput && (
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {showOtpInput && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-600">
                OTP sent to: <strong>{maskedEmail}</strong>
              </p>
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
                disabled={loading}
                onClick={handleVerifyOtp}
                className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleResendOtp}
                className="w-full text-blue-600 text-sm mt-2 hover:underline"
              >
                Resend OTP
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
