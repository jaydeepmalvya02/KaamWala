import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const MyTask = () => {
  const { token, backendUrl } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTasks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/task/my-task`, {
        headers: { token },
      });

      if (data.success) {
        setTasks(data.data);
      } else {
        toast.error(data.message || "Failed to load tasks");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  const initPay = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "KaamWala",
      description: "Task Payment",
      order_id: data.id,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(
            `${backendUrl}/api/task/payment/verify-task-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: { token } }
          );

          if (verifyRes.data.success) {
            toast.success("Payment successful!");
            fetchMyTasks();
          } else {
            toast.error("Payment verification failed!");
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification error");
        }
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#528FF0",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const handlePayOnline = async (taskId, amount) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/task/payment/create-task-order`,
        { taskId, amount },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message || "Failed to create payment order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment error");
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading your tasks...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-[#000430] text-center">
        My Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">You have no tasks yet.</p>
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
                <strong>Status:</strong> {task.status}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Budget:</strong> ₹{task.budget}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Payment:</strong> {task.paymentStatus}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Date:</strong>{" "}
                {new Date(task.date).toLocaleDateString()} &nbsp;
                <strong>Time:</strong> {task.time}
              </p>

              {task.paymentStatus === "unpaid" && (
                <button
                  onClick={() => handlePayOnline(task._id, task.budget)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Pay Online
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyTask;
