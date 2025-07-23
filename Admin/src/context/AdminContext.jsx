import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

// ✅ Admin Context
// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Get all workers (buddies)
  const getAllWorkers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-workers`, {
        headers: { aToken },
      });

      if (data.success) {
        setWorkers(data.workers);
        console.log(data.workers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch workers.");
    }
  };

  // ✅ Toggle worker availability
  const changeWorkerAvailability = async (workerId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/toggle-availability`,
        { workerId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllWorkers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
    
      toast.error("Failed to update availability.",error.message);
    }
  };

  // ✅ Fetch all bookings (task assignments)
  const getAllBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/bookings`, {
        headers: { aToken },
      });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings.",error);
    }
  };

  // ✅ Cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-booking`,
        { bookingId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to cancel booking.",error.message);
    }
  };

  // ✅ Delete booking
  const deleteBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/delete-booking`,
        { bookingId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete booking.",error);
    }
  };

  // ✅ Delete worker
  const deleteWorker = async (workerId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-worker/${workerId}`,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllWorkers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete worker.",error);
    }
  };

  // ✅ Get dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data.",error);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    workers,
    getAllWorkers,
    changeWorkerAvailability,
    bookings,
    setBookings,
    getAllBookings,
    cancelBooking,
    deleteBooking,
    deleteWorker,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
