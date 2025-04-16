import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../../Utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUploader from "../../../Utils/ImageUploader";
import { Briefcase, Edit, Trash, Plus, X, Image, MapPin, Phone, Building } from 'lucide-react';

// Create a Swal Toast instance
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

// Axios interceptor to capture adminToken from any response and store it
axios.interceptors.response.use(response => {
  if (response.data && response.data.adminToken) {
    localStorage.setItem('adminToken', response.data.adminToken);
  }
  return response;
}, error => {
  return Promise.reject(error);
});

// Helper function to get the stored admin token
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const CompanyLocationSettings = () => {
  // Enum options for city and office location
  const [cityOptions] = useState([
    "Nairobi", "Mogadishu", "Dubai", "Dodoma", 
    "Accra", "Addis Ababa", "Dakar", "Kigali"
  ]);
  const [officeLocationOptions] = useState([
    "Nairobi, Kenya", "Mogadishu, Somalia", "Dubai, UAE", "Dodoma, Tanzania", 
    "Accra, Ghana", "Ethiopia, Addis Ababa", "Dakar, Senegal", "Kigali, Rwanda"
  ]);
  
  // State variables
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data now includes additional fields per backend JSON
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    phone_number: "",
    email: "",
    office_location: "",
    google_map_link: "",
    company: ""
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch locations and company info on component mount
  useEffect(() => {
    fetchLocations();
    fetchCompanyInfo();
  }, []);

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

  // Fetch locations data with authentication header
  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/company-info/`, {
        headers: getAuthHeaders()
      });
      setLocations(response.data);
      if (process.env.NODE_ENV === 'development') {
        console.log("Fetched locations:", response.data);
      }
    } catch (error) {
      handleError(error, 'Failed to fetch locations');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch company info (now including auth headers)
  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/company-info/`, {
        headers: getAuthHeaders()
      });
      if (response.data && response.data.length > 0) {
        setFormData(prev => ({ ...prev, company: response.data[0].id }));
      }
    } catch (error) {
      console.error("Failed to fetch company info:", error);
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

  // Basic form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.city) {
      errors.city = "City is required";
    }
    if (!formData.address || formData.address.trim().length < 1 || formData.address.length > 50) {
      errors.address = "Address is required and must be between 1 and 50 characters";
    }
    if (!formData.phone_number || formData.phone_number.trim().length < 1 || formData.phone_number.length > 20) {
      errors.phone_number = "Phone number is required and must be between 1 and 20 characters";
    }
    if (!formData.email || formData.email.trim().length < 1 || formData.email.length > 254) {
      errors.email = "Email is required and must be between 1 and 254 characters";
    }
    if (!formData.office_location) {
      errors.office_location = "Office location is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Open add modal: set defaults for city and office location
  const handleAddNew = () => {
    setFormData({
      city: cityOptions[0],
      address: "",
      phone_number: "",
      email: "",
      office_location: officeLocationOptions[0],
      google_map_link: "",
      company: formData.company
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Open edit modal with location data
  const handleEdit = (location) => {
    console.log("Editing location:", location);
    setSelectedLocation(location);
    setFormData({
      city: location.city,
      address: location.address,
      phone_number: location.phone_number,
      email: location.email,
      office_location: location.office_location,
      google_map_link: location.google_map_link,
      company: location.company
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Open delete confirmation modal
  const handleDeletePrompt = (location) => {
    setSelectedLocation(location);
    setShowDeleteModal(true);
  };

  // Submit new location with auth header
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const payload = new FormData();
    payload.append('city', formData.city);
    payload.append('address', formData.address);
    payload.append('phone_number', formData.phone_number);
    payload.append('email', formData.email);
    payload.append('office_location', formData.office_location);
    payload.append('google_map_link', formData.google_map_link);
    payload.append('company', formData.company);
    
    console.log("Adding location. Payload:", Object.fromEntries(payload.entries()));
    
    try {
      await axios.post(`${BASE_URL}/company-info/`, payload, {
        headers: getAuthHeaders()
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Location added successfully'
      });
      setShowAddModal(false);
      fetchLocations();
    } catch (error) {
      handleError(error, 'Failed to add location');
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing location with auth header
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const payload = new FormData();
    payload.append('city', formData.city);
    payload.append('address', formData.address);
    payload.append('phone_number', formData.phone_number);
    payload.append('email', formData.email);
    payload.append('office_location', formData.office_location);
    payload.append('google_map_link', formData.google_map_link);
    payload.append('company', formData.company);
    
    console.log("Updating location with ID:", selectedLocation.id);
    console.log("Payload being sent:", Object.fromEntries(payload.entries()));
    
    try {
      await axios.put(`${BASE_URL}/company-info/${selectedLocation.id}/`, payload, {
        headers: getAuthHeaders()
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Location updated successfully'
      });
      setShowEditModal(false);
      fetchLocations();
    } catch (error) {
      console.error("Error updating location:", error);
      handleError(error, 'Failed to update location');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete location with auth header
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/company-info/${selectedLocation.id}/`, {
        headers: getAuthHeaders()
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Location deleted successfully'
      });
      setShowDeleteModal(false);
      fetchLocations();
    } catch (error) {
      handleError(error, 'Failed to delete location');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Company Locations</h1>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add New Location
        </button>
      </div>

      {isLoading && <div className="text-center py-4 text-white">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-black rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-800 p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">{location.city}</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start mb-3">
                <MapPin className="mr-2 text-white mt-1" size={18} />
                <p className="text-white">{location.address}</p>
              </div>
              <div className="flex items-center mb-3">
                <Phone className="mr-2 text-white" size={18} />
                <p className="text-white">{location.phone_number}</p>
              </div>
              <div className="flex items-center mb-3">
                <Building className="mr-2 text-white" size={18} />
                <p className="text-white">{location.email}</p>
              </div>
              <div className="flex items-center">
                <Building className="mr-2 text-white" size={18} />
                <p className="text-white">{location.office_location}</p>
              </div>
            </div>
            <div className="bg-gray-800 p-4 flex justify-end space-x-2">
              <button 
                onClick={() => handleEdit(location)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded flex items-center"
              >
                <Edit size={14} className="mr-1" />
                Edit
              </button>
              <button 
                onClick={() => handleDeletePrompt(location)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded flex items-center"
              >
                <Trash size={14} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Location</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                  maxLength={50}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                  maxLength={20}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                  maxLength={254}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Office Location</label>
                <select
                  name="office_location"
                  value={formData.office_location}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                >
                  {officeLocationOptions.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Google Map Link</label>
                <input
                  type="text"
                  name="google_map_link"
                  value={formData.google_map_link}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  maxLength={200}
                />
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
              <h2 className="text-xl font-bold">Edit Location</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                >
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                  maxLength={50}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                  maxLength={20}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                  maxLength={254}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Office Location</label>
                <select
                  name="office_location"
                  value={formData.office_location}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  required
                >
                  {officeLocationOptions.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Google Map Link</label>
                <input
                  type="text"
                  name="google_map_link"
                  value={formData.google_map_link}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  maxLength={200}
                />
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
            <p className="mb-6">Are you sure you want to delete the {selectedLocation?.city} location? This action cannot be undone.</p>
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

export default CompanyLocationSettings;
