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
  
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Language Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our diverse range of language tutors and start your
            learning adventure today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            /*  const Icon = category.icon; */
            return (
              <Link
                key={category.name}
                to={category.href}
                className="group relative overflow-hidden bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={category.img}
                        alt={`${category.name} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <FaArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
