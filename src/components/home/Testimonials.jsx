import { useState } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import React from 'react'
import { useTheme } from '../../contexts/ThemeProvider';
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    language: "Spanish",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "The personalized approach to learning Spanish has been incredible. My tutor understood exactly what I needed and helped me achieve fluency faster than I expected.",
    progress: "Beginner to Advanced in 6 months"
  },
  {
    id: 2,
    name: "Michael Chen",
    language: "English",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "Thanks to the flexible scheduling and expert tutors, I was able to improve my English while maintaining my busy work schedule. The results have been amazing!",
    progress: "Intermediate to Business Fluent"
  },
  {
    id: 3,
    name: "Emma Schmidt",
    language: "French",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "The cultural insights and conversation practice with my native French tutor have been invaluable. I now feel confident speaking French in any situation.",
    progress: "Basic to Conversational"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();
  return (
    <section className={`w-full py-16 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Student Success Stories
          </h2>
          <p className={
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }>
            Read about the transformative experiences of our students
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                    index === activeIndex 
                      ? theme === 'dark'
                        ? 'bg-gray-800 shadow-xl scale-105'
                        : 'bg-white shadow-xl scale-105'
                      : theme === 'dark'
                        ? 'bg-gray-800/50'
                        : 'bg-gray-100'
                  }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="mb-4 relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <FaQuoteLeft className={`absolute top-0 left-0 opacity-20 text-4xl ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                </div>

                <div className="text-center">
                  <h3 className={`font-semibold text-lg mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {testimonial.name}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {testimonial.language} Student
                  </p>
                  
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                    ))}
                  </div>

                  <p className={`mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {testimonial.text}
                  </p>

                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Progress: {testimonial.progress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
