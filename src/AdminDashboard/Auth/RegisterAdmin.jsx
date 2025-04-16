"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  ShieldCheck,
  Shield,
  ShieldX,
  X,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import zxcvbn from "zxcvbn";
import { BASE_URL } from "../../Utils/BaseUrl";

export default function RegisterAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    is_super_admin: false,
    is_admin: true,
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch admins from API
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BASE_URL}/admins/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
        Swal.fire("Error", "Failed to load admin users", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setCurrentAdmin((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (name === "password") {
      const result = zxcvbn(value);
      const messages = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
      const colors = ["#ff4d4f", "#ff7a45", "#ffa940", "#52c41a", "#13c2c2"];
      setPasswordStrength({
        score: result.score,
        message: messages[result.score],
        color: colors[result.score],
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentAdmin.username) {
      newErrors.username = "Username is required";
    } else if (!/^[\w.@+-]+$/.test(currentAdmin.username)) {
      newErrors.username = "Invalid characters in username";
    } else if (currentAdmin.username.length > 150) {
      newErrors.username = "Username must be 150 characters or fewer";
    }
    if (!currentAdmin.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(currentAdmin.email)) {
      newErrors.email = "Invalid email address";
    } else if (currentAdmin.email.length > 254) {
      newErrors.email = "Email must be 254 characters or fewer";
    }
    if (!isEditing || currentAdmin.password) {
      if (!currentAdmin.password) {
        newErrors.password = "Password is required";
      } else if (currentAdmin.password.length > 128) {
        newErrors.password = "Password must be 128 characters or fewer";
      }
      if (!currentAdmin.confirm_password) {
        newErrors.confirm_password = "Please confirm your password";
      } else if (currentAdmin.password !== currentAdmin.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openAddModal = () => {
    setCurrentAdmin({
      id: null,
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      is_super_admin: false,
      is_admin: true,
    });
    setPasswordStrength({ score: 0, message: "", color: "" });
    setIsEditing(false);
    setShowPassword(false);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (admin) => {
    setCurrentAdmin({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      password: "",
      confirm_password: "",
      is_super_admin: admin.is_super_admin,
      is_admin: admin.is_admin,
    });
    setPasswordStrength({ score: 0, message: "", color: "" });
    setIsEditing(true);
    setShowPassword(false);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Check if admin role is available
    const admin_role = localStorage.getItem("adminRole");
    if (!admin_role) {
      Swal.fire("Error", "You do not have permission to register new admins", "error");
      return;
    }
    
    setIsSubmitting(true);
    const token = localStorage.getItem("adminToken");
  
    try {
      if (isEditing) {
        // Update admin via API (using PUT with trailing slash)
        await axios.put(`${BASE_URL}/admin/${currentAdmin.id}/`, currentAdmin, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins((prev) =>
          prev.map((item) =>
            item.id === currentAdmin.id
              ? {
                  ...item,
                  username: currentAdmin.username,
                  email: currentAdmin.email,
                  is_super_admin: currentAdmin.is_super_admin,
                  is_admin: currentAdmin.is_admin,
                }
              : item
          )
        );
        Swal.fire("Success", "Admin updated successfully", "success");
      } else {
        // Create admin via API (using POST with trailing slash)
        const response = await axios.post(`${BASE_URL}/admin/`, currentAdmin, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newAdmin = response.data;
        setAdmins((prev) => [...prev, newAdmin]);
        Swal.fire("Success", "Admin created successfully", "success");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting admin:", error);
      Swal.fire("Error", "There was an error submitting the admin", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async (id) => {
    // Check if the current user has the correct role to delete admins
    const admin_role = localStorage.getItem("adminRole");
    if (!admin_role || admin_role !== "Super Admin") {
      Swal.fire("Error", "You do not have permission to delete admin users", "error");
      return;
    }
    
    // Prevent deleting the last super admin
    const isSuperAdmin = admins.find((admin) => admin.id === id)?.is_super_admin;
    const superAdminCount = admins.filter((a) => a.is_super_admin).length;
    if (isSuperAdmin && superAdminCount <= 1) {
      Swal.fire("Error", "Cannot delete the last super admin", "error");
      return;
    }
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("adminToken");
          await axios.delete(`${BASE_URL}/admin/delete/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAdmins((prev) => prev.filter((item) => item.id !== id));
          Swal.fire("Deleted!", "The admin has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting admin:", error);
          Swal.fire("Error", "Failed to delete admin", "error");
        }
      }
    });
  };

  const addAdmin = async () => {
    if (!validateForm()) return;
    const admin_role = localStorage.getItem("adminRole");
    if (!admin_role || admin_role !== "Super Admin") {
      Swal.fire("Error", "You do not have permission to delete admin users", "error");
      return;
    }
  
    const token = localStorage.getItem("adminToken");
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/create/`,
        currentAdmin,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setAdmins((prev) => [...prev, response.data]);
      Swal.fire("Success", response.data.message || "Admin created successfully", "success");
      setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating admin:", error);
        const errorData = error.response && error.response.data;
      
        const errorMessage = errorData
          ? Object.values(errorData).flat().join("\n") 
          : "There was an error creating the admin";
      
        Swal.fire("Error", errorMessage, "error");
      }
    
  };
  
  
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex bg-gray-900 h-[calc(100vh-4rem)] justify-center p-6 items-center">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 rounded-full w-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 text-white w-full min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Admin Management</h1>
        <p className="text-gray-400">Manage admin users and permissions</p>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col justify-between gap-4 items-center mb-6 sm:flex-row">
        <div className="w-full relative sm:w-auto">
          <input
            placeholder="Search admins..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-800 border border-gray-700 rounded-md text-white w-full pl-10 pr-4 py-2"
          />
          <div className="flex absolute inset-y-0 items-center left-3 pointer-events-none">
            <Search className="h-4 text-gray-400 w-4" />
          </div>
        </div>
        <button
          onClick={openAddModal}
          className="flex bg-cyan-500 rounded-md text-white gap-2 hover:bg-cyan-600 items-center px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Add Admin
        </button>
      </div>

      {/* Admins Table */}
      <div className="overflow-x-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Last Login</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr key={admin.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="p-3 text-white font-medium">{admin.username}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3">
                    <div className="flex gap-1 items-center">
                      {admin.is_super_admin ? (
                        <span className="bg-purple-100 rounded-full text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Super Admin
                        </span>
                      ) : admin.is_admin ? (
                        <span className="bg-blue-100 rounded-full text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </span>
                      ) : (
                        <span className="bg-gray-100 rounded-full text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5">
                          <ShieldX className="h-3 w-3 mr-1" />
                          Staff
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    {admin.date_joined ? format(new Date(admin.date_joined), "MMM d, yyyy") : "N/A"}
                  </td>
                  <td className="p-3">
                    {admin.last_login && !isNaN(new Date(admin.last_login)) 
                      ? format(new Date(admin.last_login), "MMM d, yyyy") 
                      : "No login history"}
                  </td>


                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(admin)}
                        className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
                        title="Edit admin"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="bg-gray-800 p-2 rounded-full text-white hover:bg-red-600"
                        title="Delete admin"
                        disabled={admin.is_super_admin && admins.filter((a) => a.is_super_admin).length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-8">
                  No admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
      <div className="flex bg-black bg-opacity-70 justify-center p-4 fixed inset-0 items-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg shadow-2xl text-white w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{isEditing ? "Edit Admin" : "Add Admin"}</h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isEditing) {
                handleSubmit(e);
              } else {
                addAdmin();
              }
            }}
            className="space-y-4"
          >
            {/* Username */}
            <div>
              <label className="text-gray-400 text-sm block font-medium mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={currentAdmin.username}
                onChange={handleInputChange}
                placeholder="Username"
                className={`w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              <p className="text-gray-500 text-xs mt-1">
                150 characters or fewer. Letters, digits and @/./+/-/_ only.
              </p>
            </div>
            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm block font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={currentAdmin.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className={`w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm block font-medium mb-1">
                Password {!isEditing && <span className="text-red-500">*</span>}
                {isEditing && (
                  <span className="text-gray-500 text-xs ml-1">(Leave blank to keep current)</span>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={currentAdmin.password}
                  onChange={handleInputChange}
                  placeholder={isEditing ? "••••••••" : "Enter password"}
                  className={`w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 -translate-y-1/2 absolute right-3 top-1/2 transform"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              {currentAdmin.password && (
                <div className="mt-2">
                  <div className="bg-gray-700 h-1.5 rounded-full w-full overflow-hidden">
                    <div
                      className="h-full rounded-full duration-300 transition-all"
                      style={{
                        width: `${(passwordStrength.score + 1) * 20}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1" style={{ color: passwordStrength.color }}>
                    {passwordStrength.message}
                  </p>
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <label className="text-gray-400 text-sm block font-medium mb-1">
                Confirm Password {!isEditing && <span className="text-red-500">*</span>}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                value={currentAdmin.confirm_password}
                onChange={handleInputChange}
                placeholder={isEditing ? "••••••••" : "Confirm password"}
                className={`w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white ${
                  errors.confirm_password ? "border-red-500" : ""
                }`}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
              )}
            </div>
            {/* Form Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-700 rounded-md text-white hover:bg-gray-800 px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex bg-cyan-500 rounded-md text-white gap-2 hover:bg-cyan-600 items-center px-4 py-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  isEditing ? "Update" : "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    </div>
  );
}
