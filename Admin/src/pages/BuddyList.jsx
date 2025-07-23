import React, { useEffect, useState } from "react";
import axios from "axios";

const BuddyList = () => {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const token = localStorage.getItem("aToken");
        const res = await axios.get(`${backendUrl}/api/buddies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBuddies(res.data.buddies || []);
      } catch (error) {
        console.error("Error fetching buddies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuddies();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">All Workers</h2>

      {loading ? (
        <p className="text-gray-600">Loading buddies...</p>
      ) : buddies.length === 0 ? (
        <p className="text-gray-500">No workers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Service</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {buddies.map((buddy) => (
                <tr key={buddy._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border">{buddy.name}</td>
                  <td className="p-3 border">{buddy.email}</td>
                  <td className="p-3 border">{buddy.phone}</td>
                  <td className="p-3 border capitalize">{buddy.serviceType}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        buddy.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {buddy.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuddyList;
