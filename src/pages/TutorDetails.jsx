import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../components/shared/Loading';

export default function TutorDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/tutors/details/${id}`);
      
        setTutor(response.data);
      } catch (err) {
        setError('Failed to fetch tutor details');
        toast.error('Error loading tutor details');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDetails();
  }, [id]);

  const handleBooking = async () => {
    try {
      const bookingData = {
        tutorId: tutor._id,
        image: tutor.image,
        language: tutor.language,
        price: tutor.price,
        tutorEmail: tutor.email,
        email: user.email 
      };

      await axios.post('http://localhost:5000/api/bookings', bookingData);
      toast.success('Booking successful!');
      navigate('/my-booked-tutors');
    } catch (error) {
      toast.error('Failed to book tutor');
      console.error('Booking error:', error);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {tutor && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={tutor.image}
                alt={tutor.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {tutor.language}
              </div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                {tutor.name}
              </h2>
              <p className="mt-2 text-gray-500">{tutor.description}</p>
              <div className="mt-4">
                <span className="text-gray-700 font-bold">Price: </span>
                <span className="text-gray-600">${tutor.price}</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-700 font-bold">Reviews: </span>
                <span className="text-gray-600">{tutor.review}</span>
              </div>
              <button
                onClick={handleBooking}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
