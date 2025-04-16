"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Mail, Search, AlertCircle } from "lucide-react";
import { BASE_URL } from "../../Utils/BaseUrl";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterData, setNewsletterData] = useState({ subject: "", content: "" });
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`${BASE_URL}/list/subscribers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSubscribers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subscribers:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteSubscriber = (id) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      const token = localStorage.getItem("adminToken");
      axios
        .delete(`${BASE_URL}/subscribers/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id));
          alert("Subscriber deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting subscriber:", error);
          alert("Failed to delete subscriber!");
        });
    }
  };
  
  const handleNewsletterInputChange = (e) => {
    setNewsletterData({ ...newsletterData, [e.target.name]: e.target.value });
  };

  const handleSendNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterData.subject || !newsletterData.content) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      alert("Newsletter sent successfully!");
      setIsNewsletterModalOpen(false);
      setIsSending(false);
      setNewsletterData({ subject: "", content: "" });
    }, 2000);
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex bg-gray-900 h-[calc(100vh-4rem)] justify-center p-6 items-center">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 rounded-full w-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 text-white w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Subscribers Management</h1>

      {/* Search & Actions */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="relative">
          <Search className="h-5 text-gray-500 w-5 absolute left-3 top-2.5" />
          <input
            type="search"
            placeholder="Search subscribers..."
            className="bg-gray-800 border border-gray-700 rounded-lg text-white pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <button
          className="flex bg-cyan-500 rounded-lg text-white gap-2 hover:bg-cyan-600 items-center px-4 py-2"
          onClick={() => setIsNewsletterModalOpen(true)}
        >
          <Mail className="h-4 w-4" />
          Send Newsletter
        </button> */}
      </div>

      {/* Subscribers Table */}
      <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <table className="text-left w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">Email</th>
              <th className="p-2">Date Subscribed</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-gray-700">
                  <td className="p-2">{subscriber.email}</td>
                  <td className="p-2">
                    {new Date(subscriber.subscribed_at).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        subscriber.is_active
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {subscriber.is_active ? "active" : "inactive"}
                    </span>
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => handleDeleteSubscriber(subscriber.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  <AlertCircle className="h-8 w-8 mb-2 mx-auto" />
                  No subscribers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Newsletter Modal */}
      {isNewsletterModalOpen && (
        <div className="flex bg-black bg-opacity-70 justify-center p-4 fixed inset-0 items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-2xl text-white w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Send Newsletter</h3>
              <button
                onClick={() => setIsNewsletterModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSendNewsletter} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Newsletter subject"
                  value={newsletterData.subject}
                  onChange={handleNewsletterInputChange}
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block font-medium mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  placeholder="Newsletter content"
                  value={newsletterData.content}
                  onChange={handleNewsletterInputChange}
                  rows="6"
                  required
                  className="bg-gray-800 border border-gray-700 p-2 rounded-lg text-white w-full"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsNewsletterModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-cyan-500 rounded-lg px-4 py-2">
                  {isSending ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
