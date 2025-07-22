import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import BrowseTask from "./BrowseTask";

const BuddyDashboard = () => {
  const { token, backendUrl } = useContext(AuthContext);

  const [buddyData, setBuddyData] = useState({
    activeTasks: [],
    completedTasks: [],
    totalEarnings: 0,
    name: "",
  });

  useEffect(() => {
    const fetchBuddyData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/buddy/dashboard`, {
          headers: { token: token },
        });

        if (data.success) {
          setBuddyData(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBuddyData();
  }, [backendUrl, token]);

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Welcome */}
        <h2 className="text-3xl font-bold mb-4 text-[#000430]">
          Welcome, {buddyData.name || "Buddy"}!
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-semibold mb-2">Active Tasks</h4>
            <p className="text-3xl">{buddyData.activeTasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-semibold mb-2">Completed Tasks</h4>
            <p className="text-3xl">{buddyData.completedTasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-semibold mb-2">Total Earnings</h4>
            <p className="text-3xl">₹ {buddyData.totalEarnings}</p>
          </div>
        </div>

        {/* Active Tasks Table */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h4 className="text-xl font-semibold mb-4">Active Tasks</h4>
          {buddyData.activeTasks.length === 0 ? (
            <p>No active tasks assigned.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {buddyData.activeTasks.map((task) => (
                    <tr key={task._id} className="border-b">
                      <td className="px-4 py-2">{task.title}</td>
                      <td className="px-4 py-2">
                        {new Date(task.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{task.status}</td>
                      <td className="px-4 py-2">₹ {task.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <BrowseTask/>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/browse-tasks"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Browse Available Tasks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BuddyDashboard;
