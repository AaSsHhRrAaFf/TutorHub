import {
  FaChalkboardTeacher,
  FaClock,
  FaGlobe,
  FaUserGraduate,
  FaLaptop,
  FaHandshake,
} from "react-icons/fa";
import React from "react";
import { useTheme } from "../../contexts/ThemeProvider";
const features = [
  {
    icon: FaChalkboardTeacher,
    title: "Native Speakers",
    description:
      "Learn from certified native speakers for authentic language experience",
  },
  {
    icon: FaClock,
    title: "Flexible Schedule",
    description: "Book lessons 24/7 according to your availability",
  },
  {
    icon: FaGlobe,
    title: "All Levels Welcome",
    description:
      "From beginners to advanced, find the perfect tutor for your level",
  },
  {
    icon: FaUserGraduate,
    title: "Personalized Learning",
    description: "Get customized lesson plans tailored to your goals",
  },
  {
    icon: FaLaptop,
    title: "Interactive Platform",
    description: "Learn comfortably with our easy-to-use online platform",
  },
  {
    icon: FaHandshake,
    title: "Affordable Pricing",
    description: "Quality language education at competitive rates",
  },
];

const WhyChooseUs = () => {
  const { theme } = useTheme();
  return (
    <section
      className={`w-full py-16 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Why Choose Us?
          </h2>
          <p className={
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }>
            Discover why thousands of students choose our platform for their
            language learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 hover:shadow-blue-500/20' 
                  : 'bg-white border-gray-200 hover:shadow-xl'
              }`}
            >
              <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <feature.icon className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}/>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
