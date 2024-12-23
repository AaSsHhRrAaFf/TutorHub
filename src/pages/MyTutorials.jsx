import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateModal from "../components/dashboard/UpdateModal";

export default function MyTutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  // Fetch tutorials for the logged-in user
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/tutorials/my-tutorials?email=${user.email}`
        );
        setTutorials(response.data);
      } catch (error) {
        toast.error("Failed to fetch tutorials");
      }
    };

    if (user?.email) {
      fetchTutorials();
    }
  }, [user]);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tutorials/${id}`);
      // Update UI by removing the deleted tutorial
      setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));
      toast.success("Tutorial deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tutorial");
    }
  };

  // Function to handle update button click
  const handleUpdateClick = (tutorial) => {
    setSelectedTutorial(tutorial);
    setIsModalOpen(true);
  };
  // Function to handle successful update
  const handleUpdate = (updatedTutorial) => {
    setTutorials(
      tutorials.map((tutorial) =>
        tutorial._id === updatedTutorial._id ? updatedTutorial : tutorial
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Tutorials</h2>

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
                    onClick={() => handleUpdateClick(tutorial)}
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
        <UpdateModal
          tutorial={selectedTutorial}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTutorial(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
