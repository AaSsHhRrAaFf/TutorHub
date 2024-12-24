import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaSearch } from "react-icons/fa";
import Loading from "../components/shared/Loading";

export default function FindTutors() {
  const { category } = useParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = category
          ? `http://localhost:5000/api/tutors/${category}`
          : "http://localhost:5000/api/tutors";
        const response = await axios.get(url);

        if (Array.isArray(response.data)) {
          setTutors(response.data);
          setFilteredTutors(response.data);
        } else {
          throw new Error("Data received is not in the expected format");
        }
      } catch (error) {
        setError("Failed to fetch tutors. Please try again later.");
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [category]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = tutors.filter((tutor) =>
      tutor.language.toLowerCase().includes(term)
    );
    setFilteredTutors(filtered);
  };

  if (loading) return <Loading />;

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tutors`
          : "All Tutors"}
      </h1>

      {/* Add Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by language..."
            value={searchTerm}
            onChange={handleSearch}
            className="
              w-full pl-10 pr-4 py-2
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition duration-300
              dark:bg-gray-700 dark:border-gray-600 dark:text-white
          dark:placeholder-gray-400
            "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="
              bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden
              transform hover:-translate-y-1 transition-all duration-300
              hover:shadow-xl dark:shadow-gray-900
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
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                {tutor.name}
              </h2>

              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2 dark:text-gray-300">
                  Language:
                </span>
                <span className="font-medium dark:text-white">
                  {tutor.language}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  <FaStar className="text-yellow-400 w-5 h-5" />
                  <span className="ml-1 dark:text-white">
                    {tutor.review || 0}
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  reviews
                </span>
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
                  dark:from-blue-600 dark:to-indigo-700
              dark:hover:from-blue-700 dark:hover:to-indigo-800
                "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {(!filteredTutors || filteredTutors.length === 0) && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          {searchTerm
            ? `No tutors found for "${searchTerm}"`
            : "No tutors found for this category."}
        </div>
      )}
    </div>
  );
}
