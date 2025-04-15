"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "../../Utils/BaseUrl";

const serviceOptions = [
  { value: "web_development", label: "Web Development" },
  { value: "mobile_app", label: "Mobile App Development" },
  { value: "digital_marketing", label: "Digital Marketing" },
  { value: "graphic_design", label: "Graphic Design" },
  { value: "seo", label: "SEO & Analytics" },
];

export default function ProposalRequest() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service_interest: serviceOptions[0].value,
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");
  
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("service_interest", formData.service_interest);
      fd.append("details", formData.details);
  
      const response = await axios.post(`${BASE_URL}/proposals/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201 || response.status === 200) {
        setStatusMessage("Your proposal request has been submitted successfully!");
        setFormData({
          name: "",
          email: "",
          service_interest: serviceOptions[0].value,
          details: "",
        });
      }
    } catch (error) {
      console.error("Error submitting proposal request:", error);
      setStatusMessage("Failed to submit proposal request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 max-w-xl mt-24">
        <h2 className="text-3xl font-bold mb-6 text-center">Request a Proposal</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="service_interest" className="block text-sm font-medium mb-1">
              Service Interest
            </label>
            <select
              id="service_interest"
              value={formData.service_interest}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500"
            >
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium mb-1">
              Details
            </label>
            <textarea
              id="details"
              placeholder="Describe your requirements..."
              value={formData.details}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded flex justify-center items-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            {loading ? "Submitting..." : "Submit Request"}
          </button>
          {statusMessage && (
          <div className="mb-4 p-3 bg-green-500 text-white rounded">
            {statusMessage}
          </div>
        )}
        </form>
      </div>
    </section>
  );
}
