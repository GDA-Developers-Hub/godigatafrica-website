"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Eye, Search, Calendar } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";

export default function Consultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BASE_URL}/consultations/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConsultations(response.data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
        Swal.fire("Error", "Failed to load consultations", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter consultations based on search query
  const filteredConsultations = consultations.filter((consultation) =>
    consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle viewing consultation details (fetch by id)
  const handleView = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/consultations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedConsultation(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching consultation details:", error);
      Swal.fire("Error", "Failed to load consultation details", "error");
    }
  };

  // Handle deleting a consultation request
  const handleDelete = async (id) => {
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
          await axios.delete(`${BASE_URL}/consultations/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setConsultations((prev) => prev.filter((item) => item.id !== id));
          Swal.fire("Deleted!", "The consultation has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting consultation:", error);
          Swal.fire("Error", "Failed to delete consultation", "error");
        }
      }
    });
  };

  return (
    <div className="bg-gray-900 p-6 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Consultation Requests</h1>
        <p className="text-gray-400">Manage incoming consultation requests</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col bg-gray-800 justify-between p-4 rounded-lg items-center mb-6 sm:flex-row">
        <div className="flex-1 relative">
          <Search className="h-4 text-gray-400 w-4 -translate-y-1/2 absolute left-3 top-1/2 transform" />
          <input
            type="text"
            placeholder="Search consultations by keyword... eg. Marketing"
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-700 border border-gray-600 rounded-md w-full focus:border-blue-500 focus:outline-none pl-10 pr-4 py-2"
          />
        </div>
        <div className="flex text-gray-400 gap-2 items-center mt-2 sm:mt-0">
          <Calendar className="h-5 w-5" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Consultation Table */}
      {loading ? (
        <div className="flex h-64 justify-center items-center">
          <div className="border-b-2 border-blue-500 border-t-2 h-12 rounded-full w-12 animate-spin"></div>
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <table className="border-collapse w-full">
            <thead>
              <tr className="bg-gray-700 text-gray-400">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Requested</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="p-3">{consultation.name}</td>
                    <td className="p-3">{consultation.email}</td>
                    <td className="p-3">{consultation.phone}</td>
                    <td className="p-3">
                      {new Date(consultation.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {new Date(consultation.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleView(consultation.id)}
                        className="text-blue-400 hover:text-blue-300 mr-3"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(consultation.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-8">
                    No consultations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View Consultation Modal */}
      {isViewModalOpen && selectedConsultation && (
        <div className="flex bg-black bg-opacity-70 h-screen justify-center p-4 fixed inset-0 items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Consultation Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            <p>
              <strong>Name:</strong> {selectedConsultation.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedConsultation.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedConsultation.phone}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedConsultation.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Description:</strong> {selectedConsultation.description}
            </p>
            <button
              className="bg-blue-600 rounded mt-4 px-4 py-2"
              onClick={() => setIsViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
