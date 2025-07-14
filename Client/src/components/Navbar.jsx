import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { token, bToken, setToken, setBToken,profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium";
  const activeClasses = "bg-blue-700";
  const baseClasses = "hover:bg-blue-700";

  // ✅ Determine user role:
  let role =profile.role ;
  

  // ✅ Generate nav links based on role:
  let links = [];

  if (!role) {
    // Not logged in → common pages
    links = [
      { name: "Home", path: "/" },
      { name: "Post Task", path: "/post-task" },
    ];
  } else if (role === "user") {
    links = [
      { name: "Home", path: "/" },
      { name: "Post Task", path: "/post-task" },
      { name: "Dashboard", path: "/my-tasks" },
    ];
  } else if (role === "buddy") {
    links = [
      { name: "Home", path: "/" },
      { name: "Buddy Dashboard", path: "/dashboard" },
    ];
  }

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken(false);
    }
    if (bToken) {
      localStorage.removeItem("bToken");
      setBToken(false);
    }
    navigate("/login");
  };

  return (
    <nav className="bg-[#000430] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold">
            <NavLink to="/">KaamWala</NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeClasses : baseClasses}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {role ? (
                <>
                  <NavLink
                    to="/profile"
                    className={`${linkClasses} ${baseClasses}`}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={`${linkClasses} ${baseClasses}`}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 18L18 6M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block ${linkClasses} ${
                  isActive ? activeClasses : baseClasses
                } text-base font-medium`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {role ? (
            <>
              <NavLink
                to="/profile"
                className={`block ${linkClasses} ${baseClasses} text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
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
              className={`block ${linkClasses} ${baseClasses} text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
