// src/components/dashboard/UpdateModal.jsx
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateModal = ({ tutorial, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
      image: tutorial.image,
      language: tutorial.language,
      price: tutorial.price,
      description: tutorial.description
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(
          `http://localhost:5000/api/tutorials/${tutorial._id}`,
          formData
        );
        onUpdate(response.data);
        toast.success('Tutorial updated successfully');
        onClose();
      } catch (error) {
        toast.error('Failed to update tutorial');
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h3 className="text-lg font-bold mb-4">Update Tutorial</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Non-editable fields */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={tutorial.name}
                disabled
                className="input input-bordered w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={tutorial.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>
  
            {/* Editable fields */}
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="input input-bordered w-full"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium">Language</label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                className="input input-bordered w-full"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="input input-bordered w-full"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="textarea textarea-bordered w-full"
              />
            </div>
  
            {/* Non-editable review */}
            <div>
              <label className="block text-sm font-medium">Reviews</label>
              <input
                type="number"
                value={tutorial.review}
                disabled
                className="input input-bordered w-full"
              />
            </div>
  
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
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
    );
  };
  
  

export default UpdateModal;
