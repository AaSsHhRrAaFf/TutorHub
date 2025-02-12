"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";
import useAxiosSecure from "../utils/axiosSecure";
import { Pencil, Trash2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeProvider";

export default function MyTutorials() {
  const { user } = useAuth();
  const [tutorials, setTutorials] = useState([]);
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    image: "",
    language: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(
          `/api/tutorials/my-tutorials/${user.email}`
        );
        setTutorials(response.data);
      } catch (error) {
        toast.error("Failed to fetch tutorials");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, [user.email, axiosSecure]);

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/tutorials/${id}`
      );
      setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));
      toast.success("Tutorial deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tutorial");
    }
  };

  const openUpdateModal = (tutorial) => {
    setSelectedTutorial(tutorial);
    setUpdateForm({
      image: tutorial.image,
      language: tutorial.language,
      price: tutorial.price,
      description: tutorial.description,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tutorials/${
          selectedTutorial._id
        }`,
        updateForm
      );
      setTutorials(
        tutorials.map((tutorial) =>
          tutorial._id === selectedTutorial._id ? response.data : tutorial
        )
      );
      setIsModalOpen(false);
      toast.success("Tutorial updated successfully");
    } catch (error) {
      toast.error("Failed to update tutorial");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-bold mb-6">My Tutorials</h2>

      {/* Mobile and Tablet View */}
      <div className="md:hidden space-y-6">
        {tutorials.map((tutorial) => (
          <article
            key={tutorial._id}
            className={`rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={tutorial.image || "/placeholder.svg"}
                  alt={tutorial.name}
                  className="w-20 h-20 object-cover rounded-md shadow"
                />
                <div>
                  <h3 className="font-semibold text-xl">{tutorial.name}</h3>
                  <p
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    {tutorial.language}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Price
                  </span>
                  <span className="font-semibold text-lg">
                    ${tutorial.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Reviews
                  </span>
                  <span className="font-semibold">{tutorial.review}</span>
                </div>
              </div>

              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {tutorial.description}
              </p>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => openUpdateModal(tutorial)}
                  className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${
                    theme === "dark"
                      ? "border-indigo-400 text-indigo-400 bg-gray-700 hover:bg-gray-600"
                      : "border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(tutorial._id)}
                  className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${
                    theme === "dark"
                      ? "border-red-400 text-white bg-red-500 hover:bg-red-600"
                      : "border-red-600 text-white bg-red-600 hover:bg-red-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Language</th>
              <th>Price</th>
              <th>Description</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutorials.map((tutorial) => (
              <tr key={tutorial._id}>
                <td>
                  <img
                    src={tutorial.image || "/placeholder.svg"}
                    alt={tutorial.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{tutorial.name}</td>
                <td>{tutorial.language}</td>
                <td>${tutorial.price}</td>
                <td className="max-w-xs truncate">{tutorial.description}</td>
                <td>{tutorial.review}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => openUpdateModal(tutorial)}
                    className="btn btn-sm border border-red-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(tutorial._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && selectedTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-lg font-bold mb-4">Update Tutorial</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Non-editable fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedTutorial.name}
                  disabled
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedTutorial.email}
                  disabled
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                />
              </div>

              {/* Editable fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  value={updateForm.image}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, image: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <input
                  type="text"
                  value={updateForm.language}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, language: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={updateForm.price}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, price: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={updateForm.description}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      description: e.target.value,
                    })
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  rows="3"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`btn ${
                    theme === "dark" ? "btn-outline" : "btn-ghost"
                  }`}
                >
                  Cancel
                </button>
                <button type="submit" className="btn border border-red-500">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
