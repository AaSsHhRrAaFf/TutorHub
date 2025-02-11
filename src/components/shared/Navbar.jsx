import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

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
          ? "bg-indigo-100 bg-opacity-90 backdrop-blur-md"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/find-tutors">Find tutors</Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link to="/add-tutorials">Add Tutorials</Link>
                  </li>
                  <li>
                    <Link to="/my-tutorials">My Tutorials</Link>
                  </li>
                  <li>
                    <Link to="/my-booked-tutors">My booked tutors</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="text-gray-800 font-bold text-3xl">
            Tutor Hub
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className=" font-normal text-lg">
              <Link to="/">Home</Link>
            </li>
            <li className=" font-normal text-lg">
              <Link to="/find-tutors">Find tutors</Link>
            </li>
            {user && (
              <>
                <li className=" font-normal text-lg">
                  <Link to="/add-tutorials">Add Tutorials</Link>
                </li>
                <li className=" font-normal text-lg">
                  <Link to="/my-tutorials">My Tutorials</Link>
                </li>
                <li className=" font-normal text-lg">
                  <Link to="/my-booked-tutors">My booked tutors</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle mr-3"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <FaMoon className="h-5 w-5 text-indigo-950" />
            ) : (
              <FaSun className="h-5 w-5 text-indigo-950" />
            )}
          </button>
          {!user ? (
            <Link
              to="/login"
              className=" text-white px-3 py-1 rounded-2xl text-xl"
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li className="text-gray-500 px-4 py-2 text-sm">
                  {user.displayName}
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="
                      text-white font-semibold px-4 py-2 rounded-lg"
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
