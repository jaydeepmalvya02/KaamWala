import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("aToken");
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Worker</th>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2">{booking.user?.name || "N/A"}</td>
                  <td className="px-4 py-2">{booking.worker?.name || "N/A"}</td>
                  <td className="px-4 py-2">{booking.service || "N/A"}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 capitalize">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
