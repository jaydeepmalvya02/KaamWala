import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const BrowseTask = () => {
  const { token, backendUrl } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/task/`, {
        headers: { token },
      });
      if (data.success) {
        const pendingTasks = data.data.filter((t) => t.status === "pending");
        setTasks(pendingTasks);
      } else {
        toast.error(data.message || "Could not fetch tasks");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  const acceptTask = async (taskId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/task/accept`,
        { taskId }, // 👈 send taskId to backend
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Task accepted successfully!");
        fetchTasks(); // Refresh list to hide accepted one
      } else {
        toast.error(data.message || "Failed to accept task");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error accepting task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading available tasks...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-[#000430] text-center">
        Available Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-lg shadow-md border"
            >
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-gray-600 mb-1">
                <strong>Budget:</strong> ₹{task.budget}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {task.location}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Date:</strong>{" "}
                {new Date(task.date).toLocaleDateString()} &nbsp;
                <strong>Time:</strong> {task.time}
              </p>

              <button
                onClick={() => acceptTask(task._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Accept Task
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BrowseTask;
