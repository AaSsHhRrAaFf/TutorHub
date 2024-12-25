import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import Loading from "../components/shared/Loading";
import axiosSecure from "../utils/axios";
import { useTheme } from "../contexts/ThemeProvider";

export default function MyBookedTutors() {
  const [bookedTutors, setBookedTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { theme } = useTheme();
  useEffect(() => {
    const fetchBookedTutors = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/bookings/${user.email}`
        );
        console.log(response.data);
        setBookedTutors(response.data);
      } catch (error) {
        toast.error("Failed to fetch booked tutors");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTutors();
  }, [user.email]);

  // Handle review submission
  const handleReview = async (tutorId) => {
    try {
      setLoading(true);
      await axiosSecure.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tutors/review/${tutorId}`
      );
     

      // Update the local state to reflect the change
      setBookedTutors(
        bookedTutors.map((tutor) => {
          if (tutor.tutorId === tutorId) {
            return { ...tutor, review: (tutor.review || 0) + 1 };
          }
          return tutor;
        })
      );

      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <h1
            className={`text-3xl font-bold mb-8 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            My Booked Tutors
          </h1>

          {bookedTutors.length === 0 ? (
            <div
              className={`text-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              You haven't booked any tutors yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto lg:mx-40">
              {bookedTutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className={`max-w-xs rounded-md shadow-md ${
                    theme === "dark"
                      ? "bg-gray-900 text-gray-100"
                      : "bg-gray-50 text-gray-800"
                  }`}
                >
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
                  />
                  <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold tracking-wide">
                        {tutor.name}
                      </h2>

                      {/* Language and Price */}
                      <div className="flex justify-between items-center">
                        <p
                          className={
                            theme === "dark" ? "text-gray-100" : "text-gray-800"
                          }
                        >
                          {tutor.language}
                        </p>
                        <span className="text-blue-500 font-semibold">
                          ${tutor.price}/hr
                        </span>
                      </div>

                      {/* Reviews */}
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 w-5 h-5 mr-1" />
                        <span>{tutor.review || 0} reviews</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleReview(tutor.tutorId)}
                      type="button"
                      className={`flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md ${
                        theme === "dark"
                          ? "bg-violet-600 text-gray-50"
                          : "bg-violet-400 text-gray-900"
                      }`}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
