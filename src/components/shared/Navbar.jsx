import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeProvider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-gray-800"
            : "bg-indigo-100"
          : "bg-transparent"
      }`}
    >
      <div className="navbar container mx-auto px-6 md:px-12 lg:px-28 py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-base-100 text-gray-900"
              } rounded-box z-[1] mt-3 w-52 p-2 shadow`}
            >
              <li>
                <Link
                  to="/"
                  className={`${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/find-tutors"
                  className={`${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Find tutors
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link
                      to="/add-tutorials"
                      className={`${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Add Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-tutorials"
                      className={`${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      My Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-booked-tutors"
                      className={`${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      My booked tutors
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className={`${
              theme === "dark" ? "text-white" : "text-gray-900"
            } font-bold text-3xl`}
          >
            Tutor Hub
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="font-normal text-lg">
              <Link
                to="/"
                className={`${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="font-normal text-lg">
              <Link
                to="/find-tutors"
                className={`${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Find tutors
              </Link>
            </li>
            {user && (
              <>
                <li className="font-normal text-lg">
                  <Link
                    to="/add-tutorials"
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Add Tutorials
                  </Link>
                </li>
                <li className="font-normal text-lg">
                  <Link
                    to="/my-tutorials"
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    My Tutorials
                  </Link>
                </li>
                <li className="font-normal text-lg">
                  <Link
                    to="/my-booked-tutors"
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    My booked tutors
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`btn btn-ghost btn-circle mr-3 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <FaMoon className="h-5 w-5" />
            ) : (
              <FaSun className="h-5 w-5" />
            )}
          </button>

          {!user ? (
            <Link
              to="/login"
              className="bg-[#FE4D01] text-white px-3 py-1 rounded-2xl text-xl"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.displayName}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.displayName}
                    src={user.photoURL || "https://i.ibb.co/BKQY4mt/user.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-base-100 text-gray-900"
                } rounded-box z-[1] mt-3 w-52 p-2 shadow`}
              >
                <li className="text-gray-500 px-4 py-2 text-sm">
                  {user.displayName}
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="
                      text-white font-semibold
                      px-4 py-2
                      bg-gradient-to-r from-red-500 to-red-600
                      hover:from-red-600 hover:to-red-700
                      rounded-lg
                      shadow-md hover:shadow-lg
                      transform hover:-translate-y-0.5
                      transition duration-300 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                    "
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
