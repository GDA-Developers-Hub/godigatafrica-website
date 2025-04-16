"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Loader2, Eye } from "lucide-react";
import { BASE_URL } from "../../Utils/BaseUrl";
import Swal from "sweetalert2";
import Modal from "react-modal";

// Group messages by date
const groupMessagesByDate = (messages) => {
  const grouped = {};
  messages.forEach((message) => {
    const messageDate = new Date(message.created_at);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let formattedDate;
    if (messageDate.toDateString() === today.toDateString()) {
      formattedDate = "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      formattedDate = "Yesterday";
    } else {
      formattedDate = messageDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }
    grouped[formattedDate].push(message);
  });

  return grouped;
};

export default function MessagesTable() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/messages/`);
      setMessages(response.data); // Assuming response.data is an array of messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      setDeleting(id);
      try {
        await axios.delete(`${BASE_URL}/messages/${id}/`);
        setMessages(messages.filter((message) => message.id !== id));
        Swal.fire("Deleted!", "The message has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting message:", error);
        Swal.fire("Error!", "Failed to delete message.", "error");
      } finally {
        setDeleting(null);
      }
    }
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="bg-gray-900 text-white p-6 h-screen overflow-auto shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No messages available.</p>
      ) : (
        <div className="overflow-x-auto">
          {Object.keys(groupedMessages).map((date, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">{date}</h3>
              <table className="w-full border-collapse border border-gray-700">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-700">Full Name</th>
                    <th className="p-3 border border-gray-700">Email</th>
                    <th className="p-3 border border-gray-700">Phone</th>
                    <th className="p-3 border border-gray-700">Submitted At</th>
                    <th className="p-3 border border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedMessages[date].map((message) => (
                    <tr key={message.id} className="hover:bg-gray-800">
                      <td className="p-3 border border-gray-700">{message.full_name}</td>
                      <td className="p-3 border border-gray-700">{message.email}</td>
                      <td className="p-3 border border-gray-700">{message.phone}</td>
                      <td className="p-3 border border-gray-700">
                        {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="p-3 border border-gray-700 flex justify-center gap-4">
                        <button
                          onClick={() => setSelectedMessage(message)}
                          className="text-cyan-400 hover:text-cyan-600"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="text-red-500 hover:text-red-700"
                          disabled={deleting === message.id}
                        >
                          {deleting === message.id ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Viewing Message */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onRequestClose={() => setSelectedMessage(null)}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-[400px] mx-auto mt-20 text-white border border-gray-700"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          ariaHideApp={false}
        >
          <h2 className="text-xl font-semibold mb-4">Message Details</h2>
          <p><strong>Name:</strong> {selectedMessage.full_name}</p>
          <p><strong>Email:</strong> {selectedMessage.email}</p>
          <p><strong>Phone:</strong> {selectedMessage.phone}</p>
          <p><strong>Received At:</strong> {new Date(selectedMessage.created_at).toLocaleString()}</p>
          <hr className="my-4 border-gray-700" />
          <p className="text-gray-300"><strong>Message:</strong></p>
          <p className="bg-gray-900 p-3 rounded-md border border-gray-700">{selectedMessage.message}</p>
          <button onClick={() => setSelectedMessage(null)} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full">
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
