import React from "react";
import { Link } from "react-router-dom";

import {
  FaFlagUsa,
  FaFlagCheckered,
  FaWineGlassAlt,
  FaBeer,
  FaPizzaSlice,
  FaYenSign,
  FaPagelines,
  FaYinYang,
  FaSun,
  FaArrowRight,
} from "react-icons/fa";
import English from "../../assets/icons8-english-48.png";
import Spanish from "../../assets/icons8-spain-48.png";
import France from "../../assets/icons8-france-48.png";
import Germany from "../../assets/icons8-germany-48.png";
import Italian from "../../assets/icons8-italy-48.png";
import China from "../../assets/icons8-china-48.png";
import Arabic from "../../assets/icons8-france-48.png";
import Japan from "../../assets/icons8-france-48.png";
import Portugal from "../../assets/icons8-portugal-48.png";
import { useTheme } from "../../contexts/ThemeProvider";

const categories = [
  {
    name: "English tutors",
    icon: FaFlagUsa,
    href: "/find-tutors/english",
    img: English,
  },
  {
    name: "Spanish tutors",
    icon: FaFlagCheckered,
    href: "/find-tutors/spanish",
    img: Spanish,
  },
  {
    name: "French tutors",
    icon: FaWineGlassAlt,
    href: "/find-tutors/french",
    img: France,
  },
  {
    name: "German tutors",
    icon: FaBeer,
    href: "/find-tutors/german",
    img: Germany,
  },
  {
    name: "Italian tutors",
    icon: FaPizzaSlice,
    href: "/find-tutors/italian",
    img: Italian,
  },
  {
    name: "Chinese tutors",
    icon: FaYinYang,
    href: "/find-tutors/chinese",
    img: China,
  },
  {
    name: "Arabic tutors",
    icon: FaPagelines,
    href: "/find-tutors/arabic",
    img: Arabic,
  },
  {
    name: "Japanese tutors",
    icon: FaYenSign,
    href: "/find-tutors/japanese",
    img: Japan,
  },
  {
    name: "Portuguese tutors",
    icon: FaSun,
    href: "/find-tutors/portuguese",
    img: Portugal,
  },
];

export default function LanguageCategories() {
  const { theme } = useTheme();

  return (
    <>
      <section
        className={`w-full  py-12 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        } transition-colors duration-200`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Choose Your Language Journey
            </h2>
            <p
              className={`max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Select from our diverse range of language tutors and start your
              learning adventure today
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-24">
            {categories.map((category) => {
              return (
                <Link
                  key={category.name}
                  to={category.href}
                  className={`
                  group relative overflow-hidden rounded-lg
                  p-4 sm:p-5 md:p-6
      
                  transition-all duration-300 
                  transform hover:-translate-y-1
                  ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:shadow-blue-500/20"
                      : "bg-white border-gray-200 hover:shadow-xl"
                  } 
                  border hover:border-blue-500
                `}
                >
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`
                        w-10 h-10 
                        sm:w-12 sm:h-12 
                        rounded-full overflow-hidden 
                        flex-shrink-0
                        ${theme === "dark" ? "ring-1 ring-gray-700" : ""}
                      `}
                      >
                        <img
                          src={category.img || "/placeholder.svg"}
                          alt={`${category.name} flag`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className={`
                          text-base sm:text-lg font-semibold
                          truncate
                          ${
                            theme === "dark"
                              ? "text-gray-100 group-hover:text-blue-400"
                              : "text-gray-900 group-hover:text-blue-600"
                          }
                        `}
                        >
                          {category.name}
                        </h3>
                      </div>
                    </div>
                    <FaArrowRight
                      className={`
                      w-4 h-4 
                      sm:w-5 sm:h-5 
                      flex-shrink-0
                      transition-all duration-300
                      transform group-hover:translate-x-1
                      ${
                        theme === "dark"
                          ? "text-gray-500 group-hover:text-blue-400"
                          : "text-gray-400 group-hover:text-blue-500"
                      }
                    `}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
