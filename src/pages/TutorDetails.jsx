import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";
import useAxiosSecure from '../utils/axiosSecure';
import { useTheme } from "../contexts/ThemeProvider";

export default function TutorDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        setLoading(true);
      /*   const response = await axiosSecure.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/tutors/details/${id}`
        ); */
        const response = await axiosSecure.get(`/api/tutors/details/${id}`);


        setTutor(response.data);
      } catch (err) {
        setError("Failed to fetch tutor details");
        toast.error("Error loading tutor details");
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
        email: user.email,
      };

      await axiosSecure.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings`,
        bookingData
      );
      toast.success("Booking successful!");
      navigate("/my-booked-tutors");
    } catch (error) {
      toast.error("Failed to book tutor");
      console.error("Booking error:", error);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <>
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          {tutor && (
            <div
              className={`max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-full w-full p-2 rounded-2xl object-cover md:w-48"
                    src={tutor.image}
                    alt={tutor.name}
                  />
                </div>
                <div className="p-8">
                  <div
                    className={`uppercase tracking-wide text-sm font-semibold ${
                      theme === "dark" ? "text-blue-400" : "text-indigo-500"
                    }`}
                  >
                    {tutor.language}
                  </div>
                  <h2
                    className={`block mt-1 text-lg leading-tight font-medium ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {tutor.name}
                  </h2>
                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {tutor.description}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`font-bold ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Price:{" "}
                    </span>
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      ${tutor.price}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`font-bold ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Reviews:{" "}
                    </span>
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {tutor.review}
                    </span>
                  </div>
                  <button
                    onClick={handleBooking}
                    className={`mt-6 px-4 py-2 rounded transition-colors ${
                      theme === "dark"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
