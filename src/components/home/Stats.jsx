import React from 'react';
import { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaStar, FaLanguage, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import Loading from '../shared/Loading';


const Stats = ({ theme = 'light' }) => { 
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats`);
        setStats(response.data);
      } catch (error) {
        setError('Failed to load statistics');
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const statItems = [
    {
      title: "Total Tutors",
      value: stats?.tutors || 0,
      gradient: "from-blue-400 to-cyan-300",
      description: "Experienced tutors",
      icon: <FaChalkboardTeacher className="w-6 h-6" />
    },
    {
      title: "Total Reviews",
      value: stats?.reviews || 0,
      gradient: "from-purple-400 to-pink-300",
      description: "Student reviews",
      showStar: true,
      icon: <FaStar className="w-6 h-6" />
    },
    {
      title: "Languages",
      value: stats?.languages || 0,
      gradient: "from-pink-400 to-rose-300",
      description: "Available languages",
      icon: <FaLanguage className="w-6 h-6" />
    },
    {
      title: "Active Users",
      value: stats?.users || 0,
      gradient: "from-amber-400 to-yellow-300",
      description: "Learning together",
      icon: <FaUsers className="w-6 h-6" />
    }
  ];

  return (
    <div className={`w-full py-16 ${
      theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Our Growing Community
          </h2>
          <p className={
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }>
            Join thousands of learners worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div 
              key={index} 
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <div className={`rounded-2xl p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } border shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <div className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  
                  {/* Value */}
                  <div className="flex items-center gap-2">
                    <span className={`text-4xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {typeof item.value === 'number' && item.value >= 1000 
                        ? `${(item.value / 1000).toFixed(0)}k+`
                        : item.value}
                    </span>
                    {item.showStar && (
                      <FaStar className="w-6 h-6 text-yellow-400" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-semibold mt-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className={`mt-2 text-sm text-center ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
