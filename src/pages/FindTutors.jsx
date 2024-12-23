import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import React from 'react'
export default function FindTutors() {
  const { category } = useParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const url = category 
        ? `http://localhost:5000/api/tutors/${category}`  // Add your backend URL
        : 'http://localhost:5000/api/tutors'; 
        const response = await axios.get(url);
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setTutors(response.data);
        } else {
          throw new Error('Data received is not in the expected format');
        }
      } catch (error) {
        setError('Failed to fetch tutors. Please try again later.');
        console.error('Error fetching tutors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {category 
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tutors`
          : 'All Tutors'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div 
            key={tutor._id} 
            className="
              bg-white rounded-xl shadow-lg overflow-hidden
              transform hover:-translate-y-1 transition-all duration-300
              hover:shadow-xl
            "
          >
            <div className="relative h-48">
              <img 
                src={tutor.image} 
                alt={tutor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
                ${tutor.price}/hr
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{tutor.name}</h2>
              
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Language:</span>
                <span className="font-medium">{tutor.language}</span>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  <FaStar className="text-yellow-400 w-5 h-5" />
                  <span className="ml-1">{tutor.review || 0}</span>
                </div>
                <span className="text-gray-500">reviews</span>
              </div>

              <Link
               to={`/tutor/${tutor._id}`}
                className="
                  block w-full text-center
                  bg-gradient-to-r from-blue-500 to-indigo-600
                  text-white font-semibold
                  py-2 px-4 rounded-lg
                  hover:from-blue-600 hover:to-indigo-700
                  transition duration-300 ease-in-out
                "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {(!tutors || tutors.length === 0) && (
        <div className="text-center text-gray-500 py-8">
          No tutors found for this category.
        </div>
      )}
    </div>
  );
}
