"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X, RefreshCw, ToggleLeft, ToggleRight } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCareer, setCurrentCareer] = useState({
    id: null,
    title: "",
    description: "",
    location: "",         
    job_type: "",        
    requirements: "",
    application_deadline: "", 
    active_listing: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch careers from API
  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BASE_URL}/careers/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCareers(response.data);
      } catch (error) {
        console.error("Error fetching careers:", error);
        Swal.fire("Error", "Failed to load career listings", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentCareer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setCurrentCareer({
      id: null,
      title: "",
      description: "",
      location: "",
      job_type: "",
      requirements: "",
      application_deadline: "",
      active_listing: true,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (career) => {
    setCurrentCareer({
      id: career.id,
      title: career.title,
      description: career.description,
      location: career.location,
      job_type: career.job_type,
      requirements: career.requirements,
      application_deadline: career.application_deadline,
      active_listing: career.active_listing,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("adminToken");

    try {
      if (isEditing) {
        // Update career listing via API
        await axios.put(`${BASE_URL}/careers/${currentCareer.id}/`, currentCareer, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCareers((prev) =>
          prev.map((item) =>
            item.id === currentCareer.id ? currentCareer : item
          )
        );
        Swal.fire({
          title: "Success!",
          text: "Job listing updated successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Create new career listing via API
        const response = await axios.post(`${BASE_URL}/careers/`, currentCareer, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newCareer = response.data;
        setCareers((prev) => [...prev, newCareer]);
        Swal.fire({
          title: "Success!",
          text: "Job listing added successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting career:", error);
      Swal.fire("Error", "Failed to save job listing", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCareer = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("adminToken");
          await axios.delete(`${BASE_URL}/careers/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCareers(careers.filter((career) => career.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Job listing has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting career:", error);
          Swal.fire("Error", "Failed to delete job listing", "error");
        }
      }
    });
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      // Toggle active listing via API (using PATCH)
      await axios.patch(`${BASE_URL}/careers/${id}/`, { active_listing: !currentStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCareers(
        careers.map((career) =>
          career.id === id ? { ...career, active_listing: !currentStatus } : career
        )
      );
      Swal.fire({
        title: "Success",
        text: `Job listing ${!currentStatus ? "activated" : "deactivated"} successfully`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error toggling job status:", error);
      Swal.fire("Error", "Failed to update job status", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex bg-gray-900 h-[calc(100vh-4rem)] justify-center p-6 items-center">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 rounded-full w-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Careers Management</h1>
        <p className="text-gray-400">Manage job listings and career opportunities</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">All Job Listings</h2>
          <p className="text-gray-400 text-sm">Total: {careers.length} positions</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex bg-cyan-500 rounded-lg text-white gap-2 hover:bg-cyan-600 items-center px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Add Job Listing
        </button>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
        {careers.map((career) => (
          <div
            key={career.id}
            className={`bg-gray-800 border border-gray-700 rounded-lg p-6 ${
              !career.active_listing ? "opacity-60" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg text-white font-semibold">{career.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleActive(career.id, career.active_listing)}
                  className="h-2 text-gray-400 hover:text-cyan-400"
                  title={career.active_listing ? "Deactivate listing" : "Activate listing"}
                >
                  {career.active_listing ? (
                    <ToggleRight className="h-7 text-green-500 w-6" />
                  ) : (
                    <ToggleLeft className="h-7 w-6" />
                  )}
                </button>
                <button
                  onClick={() => openEditModal(career)}
                  className="text-gray-400 hover:text-cyan-400"
                  title="Edit listing"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCareer(career.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Delete listing"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{career.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-amber-400 rounded-full text-black text-xs px-2 py-1">
                {career.location}
              </span>
              <span className="bg-green-400 rounded-full text-black text-xs px-2 py-1">
                {career.job_type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Career Form Modal */}
      {isModalOpen && (
        <div className="flex bg-black bg-opacity-70 justify-center p-4 fixed inset-0 items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-2xl text-white w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {isEditing ? "Edit Job Listing" : "Add Job Listing"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Job title"
                  value={currentCareer.title}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Job description"
                  value={currentCareer.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                ></textarea>
              </div>

              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">Requirements</label>
                <textarea
                  name="requirements"
                  placeholder="Job requirements"
                  value={currentCareer.requirements}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-gray-400 text-sm block font-medium mb-1">Location</label>
                  <select
                    name="location"
                    value={currentCareer.location}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                  >
                    <option value="">Select location</option>
                    <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                    <option value="Mogadishu, Somalia">Mogadishu, Somalia</option>
                    <option value="Dubai, UAE">Dubai, UAE</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block font-medium mb-1">Job Type</label>
                  <select
                    name="job_type"
                    value={currentCareer.job_type}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-gray-400 text-sm block font-medium mb-1">Application Deadline</label>
                  <input
                    type="date"
                    name="application_deadline"
                    value={currentCareer.application_deadline}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="active_listing"
                    checked={currentCareer.active_listing}
                    onChange={handleInputChange}
                    className="h-5 w-5"
                    id="activeSwitch"
                  />
                  <label htmlFor="activeSwitch" className="text-gray-400 text-sm">
                    Active Listing
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-gray-700 rounded-lg text-white hover:bg-gray-800 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex bg-cyan-500 rounded-lg text-white gap-2 hover:bg-cyan-600 items-center px-4 py-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    isEditing ? "Update" : "Save"
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
