import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";

const Profile = () => {
  const { token, backendUrl, profile, setProfile, getUserProfile } =
    useContext(AuthContext);

   const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${backendUrl}/api/user/`, profile, {
        headers: { token },
      });

      if (data.success) {
        toast.success("Profile updated successfully!");
        setProfile(data.data);
        setLoading(false);
        getUserProfile();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (loading &&!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-xl p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-[#000430] text-center">
          My Profile
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* About */}
          <div>
            <label className="block mb-1 text-gray-700">About</label>
            <textarea
              name="about"
              rows="4"
              value={profile.about}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
