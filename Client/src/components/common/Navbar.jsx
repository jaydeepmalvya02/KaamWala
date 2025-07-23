import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Home,
  LogOut,
  UserCircle,
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  Info,
  LogIn,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { token, setToken, profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const linkClasses =
    "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1";
  const activeClasses = "bg-blue-700";
  const baseClasses = "hover:bg-blue-700";

  const role = profile?.role;

  let links = [];

  if (!role) {
    links = [
      { name: "Home", path: "/", icon: <Home size={16} /> },
      { name: "About", path: "/about", icon: <Info size={16} /> },
      { name: "Contact", path: "/contact", icon: <MessageSquare size={16} /> },
    ];
  } else if (role === "user") {
    links = [
      { name: "Home", path: "/", icon: <Home size={16} /> },
      {
        name: "Post Task",
        path: "/post-task",
        icon: <ClipboardList size={16} />,
      },
      {
        name: "Dashboard",
        path: "/my-tasks",
        icon: <LayoutDashboard size={16} />,
      },
    ];
  } else if (role === "buddy") {
    links = [
      { name: "Home", path: "/", icon: <Home size={16} /> },
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={16} />,
      },
    ];
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="bg-[#000430] text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-bold">
            <NavLink to="/">KaamWala</NavLink>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeClasses : baseClasses}`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}

              {token ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 hover:text-blue-400"
                  >
                    <UserCircle size={24} />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg py-2">
                      {role === "user" && (
                        <NavLink
                          to="/my-tasks"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          My Tasks
                        </NavLink>
                      )}

                      {role === "buddy" && (
                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          Dashboard
                        </NavLink>
                      )}

                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <LogOut size={16} className="inline mr-1" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className={`${linkClasses} ${baseClasses}`}
                >
                  <LogIn size={16} />
                  Login
                </NavLink>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${linkClasses} ${isActive ? activeClasses : baseClasses}`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          {token ? (
            <>
              {role === "user" && (
                <NavLink
                  to="/my-tasks"
                  className={`block ${linkClasses} ${baseClasses}`}
                  onClick={() => setIsOpen(false)}
                >
                  My Tasks
                </NavLink>
              )}
              {role === "buddy" && (
                <NavLink
                  to="/dashboard"
                  className={`block ${linkClasses} ${baseClasses}`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={`block ${linkClasses} ${baseClasses}`}
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={16} />
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
