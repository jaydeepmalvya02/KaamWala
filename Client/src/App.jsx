import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import Profile from "./pages/common/Profile";
import Navbar from "./components/common/Navbar";
import PostTask from "./pages/user/PostTask";
import BuddyDashboard from "./pages/buddy/BuddyDashboard";
import Footer from "./components/common/Footer";
import { ToastContainer } from "react-toastify";
import BrowseTask from "./pages/buddy/BrowseTask";
import MyTask from "./components/user/MyTask";
import ForgotPassword from "./pages/common/ForgotPassword";

function App() {
  return (
    <div>
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-task" element={<PostTask />} />
        <Route path="/dashboard" element={<BuddyDashboard />} />
        <Route path="/browse-tasks" element={<BrowseTask />} />
        <Route path="/my-tasks" element={<MyTask />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
