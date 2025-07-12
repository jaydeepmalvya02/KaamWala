import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [kycFile, setKycFile] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const { backendUrl, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      return toast.error("Please fill all required fields.");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("role", role);

      if (role === "buddy") {
        formData.append("category", category);
        if (kycFile) {
          formData.append("kyc", kycFile);
        }
      }

      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        toast.success("OTP sent to your mobile/email");
        setShowOtpInput(true);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      return toast.error("Please enter OTP");
    }
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, {
        email,
        otp,
        type: "register",
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#000430] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#000430]">
          Register as {role === "user" ? "User" : "Buddy"}
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded ${
              role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole("buddy")}
            className={`px-4 py-2 rounded ${
              role === "buddy"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Buddy
          </button>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Mobile Number</label>
            <input
              type="text"
              placeholder="9876543210"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {role === "buddy" && (
            <>
              <div>
                <label className="block mb-1 text-gray-700">
                  Service Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delivery, Pickup, Household"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Upload KYC</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  onChange={(e) => setKycFile(e.target.files[0])}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send OTP
          </button>

          {showOtpInput && (
            <div>
              <label className="block mb-1 text-gray-700">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Verify & Register
              </button>
            </div>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
