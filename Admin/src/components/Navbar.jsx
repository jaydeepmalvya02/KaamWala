import React, { useState } from "react";
import {
  LogOut,
  UserCog,
  LayoutDashboard,
  Menu,
  Users,
  Briefcase,
  CalendarCheck,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("aToken");
    navigate("/login");
  };

  const NavItem = ({ icon: Icon, label, to }) => (
    <button
      onClick={() => {
        setIsDrawerOpen(false); // close drawer on mobile
        navigate(to);
      }}
      className="flex items-center gap-2 hover:text-yellow-300 py-2"
    >
      <Icon size={20} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo + Nav Links */}
          <div className="flex items-center gap-4">
            {/* Hamburger for small screens */}
            <button
              className="md:hidden"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <Menu size={24} />
            </button>

            <span className="text-2xl font-bold text-yellow-400">
              KaamWala Admin
            </span>

            <div className="hidden md:flex space-x-6 ml-6">
              <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                to="/dashboard"
              />
              <NavItem icon={Users} label="Users" to="/users-list" />
              <NavItem icon={Briefcase} label="Workers" to="/buddies-list" />
              <NavItem icon={CalendarCheck} label="Bookings" to="/bookings" />
            </div>
          </div>

          {/* Profile & Logout */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="hover:text-yellow-300"
            >
              <UserCog size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Side Drawer for xs screens */}
      {isDrawerOpen && (
        <div className="md:hidden fixed top-0 left-0 h-full w-3/4 bg-gray-900 text-white z-50 shadow-lg p-4 transition-transform">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-yellow-400">Menu</h2>
            <button onClick={() => setIsDrawerOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
            <NavItem icon={Users} label="Users" to="/users-list" />
            <NavItem icon={Briefcase} label="Workers" to="/buddies-list" />
            <NavItem icon={CalendarCheck} label="Bookings" to="/bookings" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
