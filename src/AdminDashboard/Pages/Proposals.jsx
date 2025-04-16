"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Download, Loader2, Upload } from "lucide-react";
import { BASE_URL } from "../../Utils/BaseUrl";
import Modal from "react-modal";

// Service Interest Options
const serviceOptions = [
  { value: "web_development", label: "Web Development" },
  { value: "seo", label: "SEO" },
  { value: "mobile_app", label: "Mobile App Development" },
  { value: "digital_marketing", label: "Digital Marketing" },
  { value: "graphic_design", label: "Graphic Design" },
];

// Group proposals by date and sort from latest to oldest
const groupProposalsByDate = (proposals) => {
  const groups = [];
  proposals.forEach((proposal) => {
    const proposalDate = new Date(proposal.created_at);
    // Get start of the day timestamp
    const groupDate = new Date(proposalDate.getFullYear(), proposalDate.getMonth(), proposalDate.getDate());
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let label;
    if (groupDate.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (groupDate.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    } else {
      label = groupDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    let group = groups.find((g) => g.label === label);
    if (!group) {
      group = { label, dateValue: groupDate.getTime(), proposals: [] };
      groups.push(group);
    }
    group.proposals.push(proposal);
  });
  // Sort groups descending (latest date first)
  groups.sort((a, b) => b.dateValue - a.dateValue);
  return groups;
};

export default function Proposal() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposalFile, setProposalFile] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [adminResponseFile, setAdminResponseFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/proposals/`);
      setProposals(response.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsReviewed = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Please login to mark proposal as reviewed.");
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/proposals/${id}/mark_reviewed/`,
        { status: "Reviewed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProposals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "Reviewed" } : p))
      );
      alert("Message Reviewed");
    } catch (error) {
      console.error("Error marking proposal as reviewed:", error);
    }
  };
  

  // Handle file selection for proposal document
  const handleProposalFileChange = (event) => {
    setProposalFile(event.target.files[0]);
  };

  // Handle file selection for admin response document
  const handleAdminResponseFileChange = (event) => {
    setAdminResponseFile(event.target.files[0]);
  };

  const sendProposal = async () => {
    if (!proposalFile || !selectedProposal) {
      alert("Please select a proposal document.");
      return;
    }
  
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Please login to send the proposal.");
      return;
    }
  
    setUploading(true);
    const formData = new FormData();
    formData.append("proposal_document", proposalFile);
    formData.append("admin_response", adminResponse);
    if (adminResponseFile) {
      formData.append("admin_response_document", adminResponseFile);
    }
    formData.append("status", "Sent");
  
    try {
      const response = await axios.post(
        `${BASE_URL}/proposals/${selectedProposal.id}/send_proposal/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Proposal sent successfully!");
        setProposals((prevProposals) =>
          prevProposals.map((p) =>
            p.id === selectedProposal.id ? { ...p, status: "Sent" } : p
          )
        );
        // Reset modal fields and close modal
        setSelectedProposal(null);
        setProposalFile(null);
        setAdminResponse("");
        setAdminResponseFile(null);
      }
    } catch (error) {
      console.error("Error sending proposal:", error);
      alert("Failed to send proposal.");
    } finally {
      setUploading(false);
    }
  };
  
  const groupedProposals = groupProposalsByDate(proposals);

  return (
    <div className="bg-gray-900 text-white p-6 h-screen overflow-auto shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Proposals</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
        </div>
      ) : proposals.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No proposals available.</p>
      ) : (
        <div className="overflow-x-auto">
          {groupedProposals.map((group, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">{group.label}</h3>
              <table className="w-full border-collapse border border-gray-700">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-700">Name</th>
                    <th className="p-3 border border-gray-700">Email</th>
                    <th className="p-3 border border-gray-700">Service Interest</th>
                    <th className="p-3 border border-gray-700">Status</th>
                    <th className="p-3 border border-gray-700">Created At</th>
                    <th className="p-3 border border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {group.proposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-gray-800">
                      <td className="p-3 border border-gray-700">{proposal.name}</td>
                      <td className="p-3 border border-gray-700">{proposal.email || "N/A"}</td>
                      <td className="p-3 border border-gray-700">
                        {serviceOptions.find((opt) => opt.value === proposal.service_interest)?.label ||
                          proposal.service_interest}
                      </td>
                      <td className="p-3 border border-gray-700">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            proposal.status === "Sent"
                              ? "bg-green-500/20 text-green-400"
                              : proposal.status === "Reviewed"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {proposal.status}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-700">
                        {new Date(proposal.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-3 border border-gray-700 flex justify-center gap-4">
                        <button
                          onClick={() => {
                            markAsReviewed(proposal.id);
                            setSelectedProposal(proposal);
                          }}
                          className="text-cyan-400 hover:text-cyan-600"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {proposal.proposal_document && (
                          <a
                            href={proposal.proposal_document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-600"
                          >
                            <Download className="w-5 h-5" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Viewing, Responding & Sending Proposal */}
      {selectedProposal && (
        <Modal
          isOpen={!!selectedProposal}
          onRequestClose={() => setSelectedProposal(null)}
          className="bg-gray-800 p-6 rounded-lg shadow-xl w-[500px] lg:w-[600px] max-h-[80vh] overflow-y-auto mx-auto text-white border border-gray-700 relative z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          ariaHideApp={false}
        >
          <h2 className="text-2xl font-semibold mb-4">Proposal Details</h2>
          <p>
            <strong>Name:</strong> {selectedProposal.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedProposal.email}
          </p>
          <p>
            <strong>Details:</strong> {selectedProposal.details}
          </p>

          <div className="mt-4">
            <label className="block mb-1">Upload Proposal Document:</label>
            <input type="file" onChange={handleProposalFileChange} className="mt-2 bg-gray-700 p-2 rounded" />
          </div>

          <div className="mt-4">
            <label className="block mb-1">Admin Response:</label>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
              placeholder="Enter your response here..."
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block mb-1">Upload Admin Response Document (Optional):</label>
            <input type="file" onChange={handleAdminResponseFileChange} className="mt-2 bg-gray-700 p-2 rounded" />
          </div>

          <button
            onClick={sendProposal}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full flex items-center justify-center"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Upload className="w-5 h-5 mr-2" />}
            {uploading ? "Sending..." : "Send Proposal"}
          </button>

          <button
            onClick={() => setSelectedProposal(null)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
