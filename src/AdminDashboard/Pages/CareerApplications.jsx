"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";
import {
  Download,
  Eye,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Mail,
  Calendar,
  FileText,
  User,
  Briefcase,
  ArrowUpDown,
  Check,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const CareerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("applied_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterCareer, setFilterCareer] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        setIsAuthenticated(true);
        setAuthChecking(false);
        return;
      }
    };
  
    checkAuth();
  }, []);

useEffect(() => {
    if (!isAuthenticated && !authChecking) return;
  
    const fetchData = async () => {
      setIsLoading(true);
      const adminToken = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` },
      };
  
      try {
        // Fetch careers for filtering and display
        const careersResponse = await axios.get(`${BASE_URL}/careers/`, config);
        if (Array.isArray(careersResponse.data)) {
          setCareers(careersResponse.data);
        }
  
        // Fetch applications
        const applicationsResponse = await axios.get(`${BASE_URL}/apply/`, config);
        if (Array.isArray(applicationsResponse.data)) {
          const appsWithTitles = applicationsResponse.data.map((app) => {
            const career = careersResponse.data.find((c) => c.id === app.career);
            return {
              ...app,
              careerTitle: career ? career.title : "Unknown Position",
              status: app.status || "pending",
            };
          });
          setApplications(appsWithTitles);
        } else {
          console.error("Unexpected response format:", applicationsResponse.data);
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load applications data",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
        setApplications([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, authChecking]);
  

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterCareer = (e) => {
    setFilterCareer(e.target.value === "all" ? "all" : Number.parseInt(e.target.value));
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  const openApplicationDetails = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
    
    // Auto update status to 'reviewed' when opening a pending application
    if (application.status === "pending") {
      updateApplicationStatus(application.id, "reviewed");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

// Download resume using token in the header
const downloadResume = async (application) => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    
    // Make sure we have a valid resume URL
    if (!application.resume) {
      throw new Error("No resume file available");
    }
    
    // Make the request to the API
    const response = await axios.get(application.resume, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    // Extract filename from URL or generate a fallback name
    const filename =
      application.resume.split("/").pop() ||
      `resume_${application.applicant_name.replace(/\s+/g, "_")}.pdf`;
    
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    Swal.fire({
      title: "Success",
      text: "Resume downloaded successfully",
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.error("Error downloading resume:", error);
    Swal.fire({
      title: "Error",
      text: error.message || "Failed to download resume",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  }
};

// Update application status using the Bearer token
const updateApplicationStatus = async (id, newStatus) => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    await axios.patch(
      `${BASE_URL}/apply/${id}/`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    setApplications((prevApps) =>
      prevApps.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );

    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }

    Swal.fire({
      title: "Status Updated",
      text: `Application status changed to ${newStatus}`,
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to update application status",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  }
};

// Dedicated functions for specific status changes using backend endpoints
const shortlistApplication = async (id) => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    await axios.post(
      `${BASE_URL}/apply/${id}/shortlist/`,
      {},
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    // Update local state
    setApplications((prevApps) =>
      prevApps.map((app) => (app.id === id ? { ...app, status: "shortlisted" } : app))
    );

    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: "shortlisted" });
    }

    Swal.fire({
      title: "Applicant Shortlisted",
      text: "Applicant shortlisted and interview email sent",
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.error("Error shortlisting applicant:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to shortlist applicant",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  }
};

const rejectApplication = async (id) => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    await axios.post(
      `${BASE_URL}/apply/${id}/reject/`,
      {},
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    // Update local state
    setApplications((prevApps) =>
      prevApps.map((app) => (app.id === id ? { ...app, status: "rejected" } : app))
    );

    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: "rejected" });
    }

    Swal.fire({
      title: "Applicant Rejected",
      text: "Applicant rejected and notification email sent",
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.error("Error rejecting applicant:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to reject applicant",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  }
};

const hireApplication = async (id) => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    await axios.post(
      `${BASE_URL}/apply/${id}/hire/`,
      {},
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    // Update local state
    setApplications((prevApps) =>
      prevApps.map((app) => (app.id === id ? { ...app, status: "hired" } : app))
    );

    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: "hired" });
    }

    Swal.fire({
      title: "Applicant Hired",
      text: "Applicant hired and welcome email sent",
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.error("Error hiring applicant:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to hire applicant",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  }
};

  // Filter and sort applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.careerTitle && app.careerTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCareer = filterCareer === "all" || app.career === filterCareer;
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;

    return matchesSearch && matchesCareer && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortField === "applied_at") {
      const dateA = new Date(a[sortField]).getTime();
      const dateB = new Date(b[sortField]).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }

    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  if (authChecking) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 w-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)] bg-gradient-to-b from-[var(--background)] to-gray-900 text-white">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-md text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-300 mb-6">
            You need to be logged in as an administrator to access this page.
          </p>
          <a
            href="/admin/login"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-md inline-block transition-colors duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 w-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-[var(--background)] to-gray-900 text-white py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Career Applications</h1>
          <p className="text-gray-300">Manage and review job applications</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              />
            </div>

            <div>
              <select
                value={filterCareer === "all" ? "all" : filterCareer.toString()}
                onChange={handleFilterCareer}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              >
                <option value="all">All Positions</option>
                {careers.map((career) => (
                  <option key={career.id} value={career.id.toString()}>
                    {career.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filterStatus}
                onChange={handleFilterStatus}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>

            <div className="text-right text-gray-300">
              {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("applicant_name")}
                  >
                    <div className="flex items-center">
                      Applicant
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">Position</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("applied_at")}
                  >
                    <div className="flex items-center">
                      Applied Date
                      {sortField === "applied_at" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedApplications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      No applications found matching your criteria
                    </td>
                  </tr>
                ) : (
                  sortedApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {application.applicant_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{application.applicant_name}</div>
                            <div className="text-sm text-gray-400">{application.applicant_email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{application.careerTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {format(new Date(application.applied_at), "MMM d, yyyy")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {format(new Date(application.applied_at), "h:mm a")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            application.status === "pending"
                              ? "bg-yellow-800 text-yellow-100"
                              : application.status === "reviewed"
                              ? "bg-blue-800 text-blue-100"
                              : application.status === "shortlisted"
                              ? "bg-green-800 text-green-100"
                              : application.status === "rejected"
                              ? "bg-red-800 text-red-100"
                              : application.status === "hired"
                              ? "bg-purple-800 text-purple-100"
                              : "bg-gray-800 text-gray-100"
                          }`}
                        >
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openApplicationDetails(application)}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors p-1"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          {application.resume && (
                            <a
                              href={application.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-400 hover:text-green-300 transition-colors p-1"
                              title="Download Resume"
                            >
                              <Download className="h-5 w-5" />
                            </a>
                          )}
                          {application.status !== "shortlisted" && (
                            <button
                              onClick={() => shortlistApplication(application.id)}
                              className="text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                              title="Shortlist Candidate"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                          )}
                          {application.status !== "rejected" && (
                            <button
                              onClick={() => rejectApplication(application.id)}
                              className="text-red-400 hover:text-red-300 transition-colors p-1"
                              title="Reject Application"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                          {application.status !== "hired" && (
                            <button
                              onClick={() => hireApplication(application.id)}
                              className="text-purple-400 hover:text-purple-300 transition-colors p-1"
                              title="Hire Candidate"
                            >
                              <Briefcase className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApplication && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Application Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto p-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <User className="h-5 w-5 text-cyan-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Applicant</h3>
                    </div>
                    <p className="text-white font-medium mb-1">{selectedApplication.applicant_name}</p>
                    <p className="text-gray-300 flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <a
                        href={`mailto:${selectedApplication.applicant_email}`}
                        className="text-cyan-400 hover:underline"
                      >
                        {selectedApplication.applicant_email}
                      </a>
                    </p>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <Briefcase className="h-5 w-5 text-cyan-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Position</h3>
                    </div>
                    <p className="text-white font-medium">{selectedApplication.careerTitle}</p>
                  </div>

                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-cyan-400 mr-2" />
                      <h3 className="text-lg font-semibold text-white">Application Date</h3>
                    </div>
                    <p className="text-white font-medium">
                      {format(new Date(selectedApplication.applied_at), "MMMM d, yyyy")}
                    </p>
                    <p className="text-gray-300">
                      {format(new Date(selectedApplication.applied_at), "h:mm a")}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-cyan-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Cover Letter</h3>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-300 whitespace-pre-line">
                      {selectedApplication.cover_letter}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Download className="h-5 w-5 text-cyan-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Resume</h3>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 mb-1">Applicant's resume</p>
                      <p className="text-xs text-gray-400">
                        {selectedApplication.resume.split("/").pop() || "resume.pdf"}
                      </p>
                    </div>
                    {selectedApplication.resume && (
                      <a
                        href={selectedApplication.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-md flex items-center gap-2 transition-colors duration-300"
                      >
                        <Download size={16} /> View Resume
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Check className="h-5 w-5 text-cyan-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Application Status</h3>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-gray-300 mb-2">Current status:</p>
                        <span
                          className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                            selectedApplication.status === "pending"
                              ? "bg-yellow-800 text-yellow-100"
                              : selectedApplication.status === "reviewed"
                              ? "bg-blue-800 text-blue-100"
                              : selectedApplication.status === "shortlisted"
                              ? "bg-green-800 text-green-100"
                              : selectedApplication.status === "rejected"
                              ? "bg-red-800 text-red-100"
                              : selectedApplication.status === "hired"
                              ? "bg-purple-800 text-purple-100"
                              : "bg-gray-800 text-gray-100"
                          }`}
                        >
                          {selectedApplication.status.charAt(0).toUpperCase() +
                            selectedApplication.status.slice(1)}
                        </span>
                      </div>

                      <div>
                        <p className="text-gray-300 mb-3">Change status:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <button
                            onClick={() => shortlistApplication(selectedApplication.id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-300"
                            disabled={selectedApplication.status === "shortlisted"}
                          >
                            <Check size={16} /> Shortlist Candidate
                          </button>
                          
                          <button
                            onClick={() => rejectApplication(selectedApplication.id)}
                            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-300"
                            disabled={selectedApplication.status === "rejected"}
                          >
                            <X size={16} /> Reject Application
                          </button>
                          
                          <button
                            onClick={() => hireApplication(selectedApplication.id)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-300"
                            disabled={selectedApplication.status === "hired"}
                          >
                            <Briefcase size={16} /> Hire Candidate
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-gray-300 mb-3 text-sm">Manual status update:.....feature un available right now</p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              updateApplicationStatus(selectedApplication.id, "pending")
                            }
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                              selectedApplication.status === "pending"
                                ? "bg-yellow-800 text-yellow-100"
                                : "bg-gray-700 text-gray-300 hover:bg-yellow-800 hover:text-yellow-100"
                            } transition-colors`}
                          >
                            Pending
                          </button>
                          <button
                            onClick={() =>
                              updateApplicationStatus(selectedApplication.id, "reviewed")
                            }
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                              selectedApplication.status === "reviewed"
                                ? "bg-blue-800 text-blue-100"
                                : "bg-gray-700 text-gray-300 hover:bg-blue-800 hover:text-blue-100"
                            } transition-colors`}
                          >
                            Reviewed
                          </button>
                          <button
                            onClick={() =>
                              updateApplicationStatus(selectedApplication.id, "shortlisted")
                            }
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                              selectedApplication.status === "shortlisted"
                                ? "bg-green-800 text-green-100"
                                : "bg-gray-700 text-gray-300 hover:bg-green-800 hover:text-green-100"
                            } transition-colors`}
                          >
                            Shortlisted
                          </button>
                          <button
                            onClick={() =>
                              updateApplicationStatus(selectedApplication.id, "rejected")
                            }
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                              selectedApplication.status === "rejected"
                                ? "bg-red-800 text-red-100"
                                : "bg-gray-700 text-gray-300 hover:bg-red-800 hover:text-red-100"
                            } transition-colors`}
                          >
                            Rejected
                          </button>
                          <button
                            onClick={() =>
                              updateApplicationStatus(selectedApplication.id, "hired")
                            }
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                              selectedApplication.status === "hired"
                                ? "bg-purple-800 text-purple-100"
                                : "bg-gray-700 text-gray-300 hover:bg-purple-800 hover:text-purple-100"
                            } transition-colors`}
                          >
                            Hired
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CareerApplications;
