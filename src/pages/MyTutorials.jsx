import React from "react";import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from "../components/shared/Loading";
import axiosSecure from '../utils/axios'; 

export default function MyTutorials() {
  const { user } = useAuth();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    image: '',
    language: '',
    price: '',
    description: ''
  });

  // Fetch tutorials
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`http://localhost:5000/api/tutorials/my-tutorials/${user.email}`);
        setTutorials(response.data);
      } catch (error) {
        toast.error('Failed to fetch tutorials');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, [user.email]);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`http://localhost:5000/api/tutorials/${id}`);
      setTutorials(tutorials.filter(tutorial => tutorial._id !== id));
      toast.success('Tutorial deleted successfully');
    } catch (error) {
      toast.error('Failed to delete tutorial');
    }
  };

  // Handle update modal
  const openUpdateModal = (tutorial) => {
    setSelectedTutorial(tutorial);
    setUpdateForm({
      image: tutorial.image,
      language: tutorial.language,
      price: tutorial.price,
      description: tutorial.description
    });
    setIsModalOpen(true);
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.put(
        `http://localhost:5000/api/tutorials/${selectedTutorial._id}`,
        updateForm
      );
      
      setTutorials(tutorials.map(tutorial => 
        tutorial._id === selectedTutorial._id ? response.data : tutorial
      ));
      
      setIsModalOpen(false);
      toast.success('Tutorial updated successfully');
    } catch (error) {
      toast.error('Failed to update tutorial');
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Tutorials</h2>
      
      {/* Tutorials Table */}
      <div className="overflow-x-auto">
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
                    src={tutorial.image} 
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
                    className="btn btn-sm btn-primary"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Update Tutorial</h3>
            <form onSubmit={handleUpdate}>
              {/* Non-editable fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={selectedTutorial.name}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={selectedTutorial.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                />
              </div>

              {/* Editable fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={updateForm.image}
                  onChange={(e) => setUpdateForm({...updateForm, image: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <input
                  type="text"
                  value={updateForm.language}
                  onChange={(e) => setUpdateForm({...updateForm, language: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={updateForm.price}
                  onChange={(e) => setUpdateForm({...updateForm, price: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={updateForm.description}
                  onChange={(e) => setUpdateForm({...updateForm, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  rows="3"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
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
