import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Or use your context

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/forgot-password`,
        {
          email,
        }
      );

      if (data.success) {
        toast.success(data.message || "OTP sent successfully!");
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-forgot-password`,
        {
          email,
          otp,
          newPassword,
        }
      );

      if (data.success) {
        toast.success(data.message || "Password reset successful!");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error resetting password");
    }
  };

  return (
    <section className="flex min-h-screen px-4 items-center justify-center bg-gradient-to-r from-[#000430] to-[#000226]">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-2xl space-y-6">
        <h2 className="text-gray-800 font-serif font-bold text-2xl text-center">
          Forgot Password
        </h2>

        <form
          onSubmit={otpSent ? handleResetPassword : handleSendOtp}
          className="space-y-5"
        >
          <div>
            <label className="block mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
            />
          </div>

          {otpSent && (
            <>
              <div>
                <label className="block mb-1 text-gray-700">New Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Enter OTP</label>
                <input
                  type="text"
                  placeholder="OTP"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {otpSent ? "Reset Password" : "Send OTP"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
