"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X, RefreshCw } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAward, setCurrentAward] = useState({
    id: null,
    title: "",
    description: "",
    awarded_date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch awards from the API endpoint
  useEffect(() => {
    const fetchAwards = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BASE_URL}/awards/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAwards(response.data);
      } catch (error) {
        console.error("Error fetching awards:", error);
        Swal.fire("Error", "Failed to load awards", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAwards();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAward((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setCurrentAward({
      id: null,
      title: "",
      description: "",
      awarded_date: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (award) => {
    setCurrentAward({
      id: award.id,
      title: award.title,
      description: award.description,
      awarded_date: award.awarded_date || "",
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
        // Update award via API
        await axios.put(`${BASE_URL}/awards/${currentAward.id}/`, currentAward, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAwards((prev) =>
          prev.map((item) => (item.id === currentAward.id ? currentAward : item))
        );
        Swal.fire({
          title: "Success!",
          text: "Award updated successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Create award via API
        const response = await axios.post(`${BASE_URL}/awards/`, currentAward, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newAward = response.data;
        setAwards((prev) => [...prev, newAward]);
        Swal.fire({
          title: "Success!",
          text: "Award added successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting award:", error);
      Swal.fire("Error", "Failed to save award", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAward = async (id) => {
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
          await axios.delete(`${BASE_URL}/awards/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAwards(awards.filter((award) => award.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Award has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting award:", error);
          Swal.fire("Error", "Failed to delete award", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex bg-gray-900 h-[calc(100vh-4rem)] justify-center p-6 items-center">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 rounded-full w-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] p-6 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl text-white font-bold mb-1">Awards Management</h1>
        <p className="text-gray-400">Manage company achievements and awards</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-white text-xl font-semibold">All Awards</h2>
          <p className="text-gray-400 text-sm">Total: {awards.length} awards</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex bg-cyan-500 rounded-lg text-white gap-2 hover:bg-cyan-600 items-center px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          Add Award
        </button>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
        {awards.map((award) => (
          <div
            key={award.id}
            className="bg-gray-800 border border-gray-700 p-6 rounded-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg text-white font-semibold">{award.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(award)}
                  className="text-gray-400 hover:text-cyan-400"
                  title="Edit award"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteAward(award.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Delete award"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-300">{award.description}</p>
            <p className="text-gray-400 text-sm mt-2">
              Awarded Date: {new Date(award.awarded_date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Award Form Modal */}
      {isModalOpen && (
        <div className="flex bg-black bg-opacity-70 justify-center p-4 fixed inset-0 items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-2xl text-white w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {isEditing ? "Edit Award" : "Add Award"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Award title"
                  value={currentAward.title}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Award description"
                  value={currentAward.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                ></textarea>
              </div>
              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">
                  Awarded Date
                </label>
                <input
                  type="date"
                  name="awarded_date"
                  value={currentAward.awarded_date}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                />
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
