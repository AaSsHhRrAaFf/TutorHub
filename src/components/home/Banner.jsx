import React from "react";
import bannerImage from "../../assets/banner.png";

export default function Banner() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <img
        src={bannerImage}
        alt="Online tutoring background"
        width={1600}
        height={500}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 opacity-80">
          Learn Anything, Anytime, Anywhere
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl opacity-80">
          Connect with expert tutors in various subjects and languages. Start
          your learning journey today!
        </p>
        <button
          className="
    text-lg px-8 py-4 
    font-bold text-white
    bg-gradient-to-r from-purple-500 to-pink-500 
    hover:from-purple-600 hover:to-pink-600
    rounded-full 
    shadow-lg hover:shadow-xl 
    transform hover:-translate-y-0.5 
    transition duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
  "
        >
          Find a Tutor
        </button>
      </div>
    </div>
  );
}
