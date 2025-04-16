import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X, RefreshCw } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";
import ImageUploader from "../../Utils/ImageUploader";
import RichTextEditor from "../../Utils/RichTextEditor"; 

// Allowed categories (example enum)
const categories = ["Business", "Politics", "Sports", "Entertainment", "Technology", "Other"];

export default function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    title: "",
    content: "",
    image: "",
    category: categories[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/news/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
        Swal.fire("Error", "Failed to load news", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNews((prev) => ({ ...prev, [name]: value }));
  };

  // Update content via the rich text editor
  const handleContentChange = (newContent) => {
    setCurrentNews((prev) => ({ ...prev, content: newContent }));
  };

  const openAddModal = () => {
    setCurrentNews({
      title: "",
      content: "",
      image: "",
      category: categories[0],
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setCurrentNews(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!currentNews.image) {
        Swal.fire("Error", "Please upload an image.", "error");
        setIsSubmitting(false);
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      if (isEditing) {
        await axios.put(`${BASE_URL}/news/${currentNews.id}/`, currentNews, { headers });
        setNews((prev) =>
          prev.map((item) => (item.id === currentNews.id ? currentNews : item))
        );
        Swal.fire("Success!", "News updated successfully", "success");
      } else {
        const response = await axios.post(`${BASE_URL}/news/`, currentNews, { headers });
        setNews((prev) => [...prev, response.data]);
        Swal.fire("Success!", "News added successfully", "success");
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting news:", error);
      Swal.fire("Error", "Failed to save news", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNews = async (id) => {
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
          await axios.delete(`${BASE_URL}/news/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNews(news.filter((item) => item.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "News has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting news:", error);
          Swal.fire("Error", "Failed to delete news", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

    const getPreview = (content) => {
      const words = content.split(" ");
      return words.length > 30 ? words.slice(0, 30).join(" ") + "..." : content;
    };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">News Management</h1>
        <p className="text-gray-400">Manage your news items</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">All News</h2>
          <p className="text-sm text-gray-400">Total: {news.length} items</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="h-4 w-4" />
          Add News
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="text-gray-400 hover:text-cyan-400"
                  title="Edit news"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteNews(item.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Delete news"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p
                  className="text-gray-400 text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: getPreview(item.content) }}
                ></p>
            <div className="text-sm text-gray-400">
              <img src={item.image} alt="news image" className="h-50 w-full object-cover rounded-lg" />
              <p>
                <strong>Category:</strong> {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* News Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-auto">
          <div className="bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-3xl lg:w-[900px] lg:h-[700px] p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {isEditing ? "Edit News" : "Add News"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="News title"
                  value={currentNews.title}
                  onChange={handleInputChange}
                  required
                  maxLength={255}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Content</label>
                <RichTextEditor content={currentNews.content} onChange={handleContentChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Image</label>
                <ImageUploader
                  onSaveUrl={(url) => {
                    console.log("Uploaded Image URL:", url);
                    setCurrentNews((prev) => ({ ...prev, image: url }));
                  }}
                />
                {currentNews.image && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Preview:</p>
                    <img 
                      src={currentNews.image} 
                      alt="Uploaded Preview" 
                      className="w-full h-40 object-cover rounded-md border border-gray-700"
                    />
                    <p className="text-xs text-gray-400 mt-1 break-all">
                      <strong>Image URL:</strong> {currentNews.image}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <select
                  name="category"
                  value={currentNews.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-gray-700 text-white hover:bg-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
