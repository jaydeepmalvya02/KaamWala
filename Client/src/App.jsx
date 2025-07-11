
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PostTask from "./pages/PostTask";
import BuddyDashboard from "./pages/BuddyDashboard";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import BrowseTask from "./pages/BrowseTask";

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
        <Route path="/browse-tasks" element={<BrowseTask/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
