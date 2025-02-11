import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"
import bannerImage from "../../assets/banner02.png";

export default function Banner() {
  const navigate = useNavigate();

  const handleFindTutor = () => {
    navigate("/find-tutors");
  };

  return (
    <div className="container px-6  md:px-12 lg:px-28 lg:mt-16 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
            Become fluent in any language
          </h1>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-red-500" />
              <span className="text-lg text-gray-800 ">
                Take customizable 1-on-1 lessons trusted by millions of users
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-red-500" />
              <span className="text-lg text-gray-800">
                Learn from certified teachers that fit your budget and schedule
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 mt-2 rounded-full bg-red-500" />
              <span className="text-lg text-gray-800">
                Connect with a global community of language learners
              </span>
            </li>
          </ul>
          <button
            onClick={handleFindTutor}
            className="group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-6 
        bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400
        text-lg font-semibold text-white transition-all duration-300
        rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
        active:shadow-md active:translate-y-0 
        before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 
        hover:before:opacity-100 before:transition overflow-hidden"
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
