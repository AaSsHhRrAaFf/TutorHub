import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaSearch } from "react-icons/fa";
import Loading from "../components/shared/Loading";
import { useTheme } from "../contexts/ThemeProvider";
import Pagination from "./pagination";
import { motion, AnimatePresence } from "framer-motion";

export default function FindTutors() {
  const { theme } = useTheme();
  const { category } = useParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorsPerPage] = useState(6);
  const MotionLink = motion.create(Link);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = category
          ? `${import.meta.env.VITE_API_BASE_URL}/api/tutors/${category}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/tutors`;
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

  // Get current tutors
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredTutors.slice(
    indexOfFirstTutor,
    indexOfLastTutor
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) return <Loading />;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  const searchBarVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (error) {
    return (
      <div
        className={`text-center p-4 ${
          theme === "dark" ? "text-red-400" : "text-red-500"
        }`}
      >
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-bold mb-8 text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tutors`
            : "All Tutors"}
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          variants={searchBarVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search by language..."
              value={searchTerm}
              onChange={handleSearch}
              className={`
                w-full pl-10 pr-4 py-2 rounded-lg
                border transition duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }
              `}
            />
          </div>
        </motion.div>

        {/* Tutors Grid */}
        
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto lg:mx-40"
          >
            {currentTutors.map((tutor) => (
              <motion.div
                key={tutor._id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className={`max-w-xs rounded-md shadow-md ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                {/* Image Section */}
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="object-cover object-center w-full rounded-t-md h-72"
                />

                {/* Content Section */}
                <div className="flex flex-col justify-between p-6 space-y-8">
                  <div className="space-y-2">
                    {/* Tutor Name */}
                    <h2 className="text-3xl font-semibold tracking-wide">
                      {tutor.name}
                    </h2>

                    {/* Language and Review */}
                    <div className="flex justify-between items-center">
                      <p
                        className={
                          theme === "dark" ? "text-gray-100" : "text-gray-800"
                        }
                      >
                        {tutor.language}
                      </p>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 w-5 h-5 mr-1" />
                        <span>{tutor.review || 0}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <p
                      className={`font-bold ${
                        theme === "dark" ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      ${tutor.price}/hr
                    </p>
                  </div>

                  {/* View Details Button */}
                  <MotionLink
                    to={`/tutor/${tutor._id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-full p-3 
              font-semibold tracking-wide rounded-md
              ${
                theme === "dark"
                  ? "bg-violet-600 text-gray-50"
                  : "bg-violet-400 text-gray-900"
              }`}
                  >
                    View Details
                  </MotionLink>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {(!filteredTutors || filteredTutors.length === 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-center py-8 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {searchTerm
                ? `No tutors found for "${searchTerm}"`
                : "No tutors found for this category."}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pagination */}
        {filteredTutors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Pagination
              totalItems={filteredTutors.length}
              itemsPerPage={tutorsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
