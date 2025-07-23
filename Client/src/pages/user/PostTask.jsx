import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const PostTask = () => {
  const { token, backendUrl } = useContext(AuthContext);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    address: "",
    latitude: "",
    longitude: "",
    date: "",
    time: "",
    budget: "",
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: name === "budget" ? Number(value) : value,
    });
  };
  

  // ✅ Auto-fetch geolocation
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setTaskData((prev) => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
        }));
        setLocationLoading(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to fetch your location.");
        setLocationLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const{ data}=await axios.post(`${backendUrl}/api/task/`,taskData,{headers:{token}})
      console.log(data);
      
        
      

      if (data.success) {
        toast.success(data.message);
        setTaskData({
          title: "",
          description: "",
          category: "",
          location: "",
          address: "",
          latitude: "",
          longitude: "",
          date: "",
          time: "",
          budget: "",
        });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
     toast.error(error.message)
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-[#000430] text-center">
          Post a New Task
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-700">Task Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="e.g. Grocery Pickup"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Describe the task in detail..."
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={taskData.category}
              onChange={handleChange}
              placeholder="e.g. Household, Delivery"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={taskData.location}
              onChange={handleChange}
              placeholder="e.g. Andheri West, Mumbai"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={taskData.address}
              onChange={handleChange}
              placeholder="Flat no, Street name, etc."
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Location Fetch Button */}
          <div>
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {locationLoading ? "Getting Location..." : "Get Current Location"}
            </button>
          </div>

          {/* Lat & Long display */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={taskData.latitude}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Longitude</label>
              <input
                type="number"
                name="longitude"
                value={taskData.longitude}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={taskData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={taskData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block mb-1 text-gray-700">Budget (₹)</label>
            <input
              type="number"
              name="budget"
              value={taskData.budget}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Post Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostTask;
