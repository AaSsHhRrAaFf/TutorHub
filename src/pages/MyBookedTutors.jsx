import React from 'react'

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

export default function MyBookedTutors() {
  const [bookedTutors, setBookedTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookedTutors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/${user.email}`
        );
        setBookedTutors(response.data);
      } catch (error) {
        toast.error('Failed to fetch booked tutors');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTutors();
  }, [user.email]);

  // Handle review submission
  const handleReview = async (tutorId) => {
    try {
      // Update review count in the database
      await axios.put(`http://localhost:5000/api/tutors/review/${tutorId}`);
      
      // Update the local state to reflect the change
      setBookedTutors(bookedTutors.map(tutor => {
        if (tutor.tutorId === tutorId) {
          return { ...tutor, review: (tutor.review || 0) + 1 };
        }
        return tutor;
      }));
      
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Booked Tutors</h1>

      {bookedTutors.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven't booked any tutors yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                
                <div className="flex items-center mb-3">
                  <span className="text-gray-600 mr-2">Language:</span>
                  <span className="font-medium">{tutor.language}</span>
                </div>

                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-400 w-5 h-5 mr-1" />
                  <span>{tutor.review || 0} reviews</span>
                </div>

                <button
                  onClick={() => handleReview(tutor.tutorId)}
                  className="
                    w-full px-4 py-2 
                    bg-gradient-to-r from-purple-500 to-pink-500
                    hover:from-purple-600 hover:to-pink-600
                    text-white font-semibold rounded-lg
                    transform hover:-translate-y-0.5
                    transition duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                  "
                >
                  Submit Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

