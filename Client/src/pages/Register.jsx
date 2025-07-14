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
  const [kycFileUrl, setKycFileUrl] = useState("");
  const [kycPreview, setKycPreview] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const { backendUrl, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const maskPhone = (num) =>
    num.length === 10
      ? `${num.slice(0, 2)}******${num.slice(-2)}`
      : "**********";

  const handleKycSelect = (e) => {
    const file = e.target.files[0];
    setKycFile(file);
    setKycPreview(URL.createObjectURL(file));
  };

  const handleKycUpload = async () => {
    if (!kycFile) return toast.error("Please select a file first");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("raw", kycFile);

      const { data } = await axios.post(`${backendUrl}/api/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setKycFileUrl(data.url);
        toast.success("KYC uploaded successfully!");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading KYC");
    }

    setLoading(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      return toast.error("Please fill all required fields.");
    }

    if (role === "buddy" && !kycFileUrl) {
      return toast.error("Please upload your KYC first.");
    }

    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phone,
        password,
        role,
      };

      if (role === "buddy") {
        payload.category = category;
        payload.kyc = kycFileUrl;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        toast.success("OTP sent to your phone/email");
        setShowOtpInput(true);
      } else {
        toast.error(data.message || "Something went wrong");
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
    setLoading(false);
  };

  const handleResendOtp = async () => {
    if (!name || !email || !password || !phone) {
      return toast.error("Please fill details first.");
    }

    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phone,
        password,
        role,
        category,
        kyc: kycFileUrl,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        toast.success("OTP resent!");
      } else {
        toast.error(data.message || "Could not resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const step = showOtpInput ? 3 : role === "buddy" && !kycFileUrl ? 2 : 1;

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#000430] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#000430]">
          Register as {role === "user" ? "User" : "Buddy"}
        </h2>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-6">
          {["Fill Info", "Upload KYC", "Verify OTP"].map((s, idx) => (
            <div
              key={idx}
              className={`flex-1 text-center text-sm ${
                step >= idx + 1 ? "text-blue-600 font-bold" : "text-gray-400"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

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

        {!showOtpInput && (
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
                    onChange={handleKycSelect}
                  />
                  {kycPreview && (
                    <img
                      src={kycPreview}
                      alt="KYC Preview"
                      className="w-full mt-2 rounded border"
                    />
                  )}
                  <button
                    type="button"
                    onClick={handleKycUpload}
                    disabled={loading}
                    className={`w-full mt-2 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition ${
                      loading && "opacity-50"
                    }`}
                  >
                    {loading ? "Uploading..." : "Upload KYC"}
                  </button>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
                loading && "opacity-50"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {showOtpInput && (
          <div>
            <p className="mb-2 text-sm text-gray-600">
              OTP sent to: <strong>{maskPhone(phone)}</strong>
            </p>
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
              disabled={loading}
              className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
                loading && "opacity-50"
              }`}
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full text-blue-600 text-sm mt-2 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        )}

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
