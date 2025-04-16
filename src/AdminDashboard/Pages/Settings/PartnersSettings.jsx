import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../../Utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUploader from "../../../Utils/ImageUploader";
import { Briefcase, Edit, Trash, Plus, X, Image } from 'lucide-react';

// Create a Swal Toast instance
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

// Axios interceptor to capture adminToken from any response and store it
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.adminToken) {
      localStorage.setItem('adminToken', response.data.adminToken);
    }
    return response;
  },
  error => Promise.reject(error)
);

// Helper function to get the stored admin token
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function to handle errors (including throttling)
const handleError = (error, defaultMsg) => {
  const detail = error.response?.data?.detail;
  if (detail && detail.includes("Request was throttled")) {
    Toast.fire({
      icon: 'error',
      title: detail
    });
  } else {
    Toast.fire({
      icon: 'error',
      title: error.response?.data?.message || defaultMsg
    });
  }
};

const PartnersSettings = () => {
  // State variables
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch partners on component mount
  useEffect(() => {
    fetchPartners();
  }, []);

  // Fetch partners data with auth header
  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/partners/`, {
        headers: getAuthHeaders()
      });
      setPartners(response.data);
      if (process.env.NODE_ENV === 'development') {
        console.log("Fetched partners:", response.data);
      }
    } catch (error) {
      handleError(error, 'Failed to fetch partners');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle image upload result
  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, logo: imageUrl }));
    if (formErrors.logo) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.logo;
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name || formData.name.trim().length < 1) {
      errors.name = "Partner name is required";
    } else if (formData.name.length > 100) {
      errors.name = "Partner name must be less than 100 characters";
    }
    if (!formData.logo) {
      errors.logo = "Partner logo is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Open add modal
  const handleAddNew = () => {
    setFormData({
      name: "",
      logo: ""
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Open edit modal with partner data
  const handleEdit = (partner) => {
    console.log("Editing partner:", partner);
    setSelectedPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Open delete confirmation modal
  const handleDeletePrompt = (partner) => {
    setSelectedPartner(partner);
    setShowDeleteModal(true);
  };

  // Submit new partner
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        logo: formData.logo
      };
      console.log("Adding partner. Payload:", payload);
      await axios.post(`${BASE_URL}/partners/`, payload, {
        headers: getAuthHeaders()
      });
      Toast.fire({
        icon: 'success',
        title: 'Partner added successfully'
      });
      setShowAddModal(false);
      fetchPartners();
    } catch (error) {
      handleError(error, 'Failed to add partner');
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing partner
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        logo: formData.logo,
      };
      console.log("Updating partner with ID:", selectedPartner.id);
      console.log("Payload being sent:", payload);
      await axios.put(`${BASE_URL}/partners/${selectedPartner.id}/`, payload, {
        headers: getAuthHeaders()
      });
      Toast.fire({
        icon: 'success',
        title: 'Partner updated successfully'
      });
      setShowEditModal(false);
      fetchPartners();
    } catch (error) {
      console.error("Error updating partner:", error);
      handleError(error, 'Failed to update partner');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete partner
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/partners/${selectedPartner.id}/`, {
        headers: getAuthHeaders()
      });
      Toast.fire({
        icon: 'success',
        title: 'Partner deleted successfully'
      });
      setShowDeleteModal(false);
      fetchPartners();
    } catch (error) {
      handleError(error, 'Failed to delete partner');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Partners Management</h1>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add New Partner
        </button>
      </div>

      {isLoading && <div className="text-center py-4 text-white">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => {
          if (process.env.NODE_ENV === 'development') {
            console.log("Rendering partner:", partner);
          }
          return (
            <div key={partner.id} className="bg-black rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-800 p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold flex items-center text-white">
                  <Briefcase className="mr-2 text-white" size={20} />
                  {partner.name}
                </h2>
              </div>
              <div className="p-4">
                {partner.logo && (
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="w-full h-40 object-contain rounded"
                  />
                )}
              </div>
              <div className="bg-gray-800 p-4 flex justify-end space-x-2">
                <button 
                  onClick={() => handleEdit(partner)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded flex items-center"
                >
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePrompt(partner)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded flex items-center"
                >
                  <Trash size={14} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Partner</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Partner Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  maxLength={100}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Logo
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <Image className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm text-cyan-500">
                    Upload a high-quality logo for your partner
                  </span>
                </div>
                <ImageUploader
                  onSaveUrl={(url) => {
                    setFormData(prev => ({ ...prev, logo: url }));
                    if (formErrors.logo) {
                      setFormErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.logo;
                        return newErrors;
                      });
                    }
                  }}
                />
                {formData.logo && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-1">Preview:</p>
                    <img
                      src={formData.logo}
                      alt="Logo Preview"
                      className="w-full h-40 object-contain rounded-md border border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1 break-all">
                      <strong>Image URL:</strong> {formData.logo}
                    </p>
                  </div>
                )}
                {formErrors.logo && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.logo}</p>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Partner</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Partner Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  maxLength={100}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Logo
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <Image className="h-5 w-5 text-cyan-500" />
                  <span className="text-sm text-cyan-500">
                    Upload a new logo or keep the existing one
                  </span>
                </div>
                <ImageUploader
                  onSaveUrl={(url) => {
                    setFormData(prev => ({ ...prev, logo: url }));
                    if (formErrors.logo) {
                      setFormErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.logo;
                        return newErrors;
                      });
                    }
                  }}
                />
                {formData.logo && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-1">Current Logo:</p>
                    <img
                      src={formData.logo}
                      alt="Logo Preview"
                      className="w-full h-40 object-contain rounded-md border border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1 break-all">
                      <strong>Image URL:</strong> {formData.logo}
                    </p>
                  </div>
                )}
                {formErrors.logo && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.logo}</p>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Confirm Deletion</h2>
            </div>
            <p className="mb-6">Are you sure you want to delete <strong>{selectedPartner?.name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersSettings;
