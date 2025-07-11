import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [role, setRole] = useState("user"); // 'user' or 'buddy'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { backendUrl, token, bToken, setToken, setBToken } =
    useContext(AuthContext);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem('token',data.token)
        navigate('/')
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

        {/* Role Switcher */}
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Upload KYC</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Account
          </button>
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
