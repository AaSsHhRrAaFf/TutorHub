import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import bannerImage from "../../assets/banner02.png";
import { useTheme } from "../../contexts/ThemeProvider"; // Import useTheme

export default function Banner() {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme

  const handleFindTutor = () => {
    navigate("/find-tutors");
  };

  return (
    <div
      className={`container px-6 pt-28 md:px-12 lg:px-28 lg:pt-44 py-12 md:py-24 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Become fluent in any language
          </h1>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-red-500" />
              <span
                className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Take customizable 1-on-1 lessons trusted by millions of users
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-red-500" />
              <span
                className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Learn from certified teachers that fit your budget and schedule
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-red-500" />
              <span
                className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Connect with a global community of language learners
              </span>
            </li>
          </ul>
          <button
            onClick={handleFindTutor}
            className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 transition-transform group hover:scale-105"
          >
            <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="transition-transform group-hover:scale-105">
              Find a Tutor
            </span>
          </button>
        </div>

        {/* Right Column - Images */}
        <div>
          <img
            className="w-full h-full object-cover"
            src={bannerImage}
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
}
