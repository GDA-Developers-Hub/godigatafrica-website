"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  X,
  Image,
  UserCircle
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";
import ImageUploader from "../../Utils/ImageUploader";
import RichTextEditor from "../../Utils/RichTextEditor";

export default function AddBlog() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / postsPerPage);
    const [isLoading, setIsLoading] = useState(true);

  // Default images to prevent validation errors
  const DEFAULT_BLOG_IMAGE = "/default-blog-image.jpg";
  const DEFAULT_AVATAR = "/default-avatar.jpg";

  // Flat state structure for the current blog
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: "",
    excerpt: "",
    image: DEFAULT_BLOG_IMAGE,
    date: new Date().toISOString().split("T")[0],
    author_name: "",
    author_avatar: DEFAULT_AVATAR,
    author_role: "",
    likes: 0,
  });

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/blogs/`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        Swal.fire("Error", "Failed to load blog posts", "error");
      }finally{ 
        setIsLoading(false);
        }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Update excerpt using RichTextEditor (stores HTML)
  const handleExcerptChange = (newContent) => {
    setCurrentBlog((prev) => ({ ...prev, excerpt: newContent }));
    if (formErrors.excerpt) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.excerpt;
        return newErrors;
      });
    }
  };

  // Open modal for adding a new blog
  const openAddModal = () => {
    setCurrentBlog({
      id: null,
      title: "",
      excerpt: "",
      image: DEFAULT_BLOG_IMAGE,
      date: new Date().toISOString().split("T")[0],
      author_name: "",
      author_avatar: DEFAULT_AVATAR,
      author_role: "",
      likes: 0,
    });
    setFormErrors({});
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing blog
  const openEditModal = (blog) => {
    setCurrentBlog({
      id: blog.id,
      title: blog.title,
      // Use blog.content if available; otherwise, fallback to blog.excerpt
      excerpt: blog.excerpt,
      image: blog.image || DEFAULT_BLOG_IMAGE,
      date: blog.date,
      author_name: blog.author_name,
      author_avatar: blog.author_avatar || DEFAULT_AVATAR,
      author_role: blog.author_role,
      likes: blog.likes || 0,
    });
    setFormErrors({});
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!currentBlog.title.trim()) {
      errors.title = "Title is required";
    }
    if (!currentBlog.excerpt.trim()) {
      errors.excerpt = "Excerpt is required";
    }
    if (!currentBlog.image || currentBlog.image === "") {
      errors.image = "Blog image is required";
    }
    if (!currentBlog.author_name.trim()) {
      errors.author_name = "Author name is required";
    }
    if (!currentBlog.author_role.trim()) {
      errors.author_role = "Author role is required";
    }
    if (!currentBlog.author_avatar || currentBlog.author_avatar === "") {
      errors.author_avatar = "Author avatar is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire("Validation Error", "Please fill in all required fields", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        Swal.fire("Authentication Error", "You must be logged in to perform this action", "error");
        setIsSubmitting(false);
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      const payload = {
        title: currentBlog.title,
        excerpt: currentBlog.excerpt,
        image: currentBlog.image,
        date: currentBlog.date,
        author_name: currentBlog.author_name,
        author_avatar: currentBlog.author_avatar,
        author_role: currentBlog.author_role,
        likes: currentBlog.likes || 0,
      };

      if (isEditing) {
        await axios.put(`${BASE_URL}/blogs/${currentBlog.id}/`, payload, { headers });
        setBlogs((prev) =>
          prev.map((item) => (item.id === currentBlog.id ? { ...payload, id: currentBlog.id } : item))
        );
        Swal.fire("Success", "Blog post updated successfully", "success");
      } else {
        const response = await axios.post(`${BASE_URL}/blogs/`, payload, { headers });
        setBlogs((prev) => [response.data, ...prev]);
        Swal.fire("Success", "Blog post created successfully", "success");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting blog:", error);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        const formattedErrors = {};
        Object.keys(serverErrors).forEach((key) => {
          formattedErrors[key] = serverErrors[key].join(" ");
        });
        setFormErrors(formattedErrors);
        Swal.fire("Validation Error", "Please correct the highlighted fields", "error");
      } else if (error.response && error.response.status === 401) {
        Swal.fire("Authentication Error", "Your session has expired. Please log in again.", "error");
      } else {
        Swal.fire("Error", "There was an error submitting the blog post", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          Swal.fire("Authentication Error", "You must be logged in to perform this action", "error");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        axios.delete(`${BASE_URL}/blogs/${id}/`, { headers })
          .then(() => {
            setBlogs((prev) => prev.filter((item) => item.id !== id));
            Swal.fire("Deleted!", "The blog post has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting blog:", error);
            if (error.response && error.response.status === 401) {
              Swal.fire("Authentication Error", "Your session has expired. Please log in again.", "error");
            } else {
              Swal.fire("Error", "Failed to delete blog post", "error");
            }
          });
      }
    });
  };

  const displayedBlogs = blogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const getPreview = (content) => {
    const words = content.split(" ");
    return words.length > 30 ? words.slice(0, 30).join(" ") + "..." : content;
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Blog Management</h1>
        <p className="text-gray-400">Create and manage blog posts</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">All Posts</h2>
          <p className="text-sm text-gray-400">Total: {blogs.length} posts</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="h-4 w-4" />
          Add Post
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedBlogs.length > 0 ? (
          displayedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={blog.image || DEFAULT_BLOG_IMAGE}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="p-1 bg-gray-700 rounded-full text-white hover:bg-gray-600"
                    title="Edit Post"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-1 bg-gray-700 rounded-full text-white hover:bg-red-600"
                    title="Delete Post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <time dateTime={blog.date}>
                    {format(new Date(blog.date), "MMM d, yyyy")}
                  </time>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: getPreview(blog.excerpt) }} />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={blog.author_avatar || DEFAULT_AVATAR}
                      alt={blog.author_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="text-white">{blog.author_name}</p>
                    <p className="text-gray-400">{blog.author_role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-400">No blog posts found. Create your first blog post!</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {blogs.length > 0 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="text-lg font-semibold">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Modal for Adding/Editing Blog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-y-auto min-h-screen">
          <div className="bg-gray-800 rounded-lg p-6 max-w-[900px] w-full mt-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? "Edit Blog Post" : "Add Blog Post"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="text-red-500" />
              </button>
            </div>

            {/* Blog Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter blog title"
                value={currentBlog.title}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded bg-gray-700 text-white ${
                  formErrors.title ? "border-red-500" : "border-gray-600"
                }`}
              />
              {formErrors.title && (
                <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
              )}
            </div>

            {/* Excerpt Editor */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Blog Excerpt
              </label>
              <RichTextEditor
               value={currentBlog.excerpt}
               onChange={handleExcerptChange}
              />
            
            </div>

            {/* Blog Image Uploader */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Blog Cover Image
              </label>
              <div className="flex items-center gap-2 mb-2">
                <Image className="h-5 w-5 text-cyan-500" />
                <span className="text-sm text-cyan-500">
                  Upload a high-quality image for your blog post
                </span>
              </div>
              <ImageUploader
                onSaveUrl={(url) => {
                  setCurrentBlog((prev) => ({ ...prev, image: url }));
                  if (formErrors.image) {
                    setFormErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.image;
                      return newErrors;
                    });
                  }
                }}
              />
              {currentBlog.image && (
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Preview:</p>
                  <img
                    src={currentBlog.image}
                    alt="Blog Cover Preview"
                    className="w-full h-40 object-cover rounded-md border border-gray-700"
                  />
                  <p className="text-xs text-gray-400 mt-1 break-all">
                    <strong>Image URL:</strong> {currentBlog.image}
                  </p>
                </div>
              )}
              {formErrors.image && (
                <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
              )}
            </div>

            {/* Author Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author_name"
                  placeholder="Enter author name"
                  value={currentBlog.author_name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded bg-gray-700 text-white ${
                    formErrors.author_name ? "border-red-500" : "border-gray-600"
                  }`}
                />
                {formErrors.author_name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.author_name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Author Role
                </label>
                <input
                  type="text"
                  name="author_role"
                  placeholder="Enter author role"
                  value={currentBlog.author_role}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded bg-gray-700 text-white ${
                    formErrors.author_role ? "border-red-500" : "border-gray-600"
                  }`}
                />
                {formErrors.author_role && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.author_role}</p>
                )}
              </div>
            </div>

            {/* Author Avatar Uploader */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Author Avatar
              </label>
              <div className="flex items-center gap-2 mb-2">
                <UserCircle className="h-5 w-5 text-cyan-500" />
                <span className="text-sm text-cyan-500">
                  Upload a profile image for the author
                </span>
              </div>
              <ImageUploader
                onSaveUrl={(url) => {
                  setCurrentBlog((prev) => ({ ...prev, author_avatar: url }));
                  if (formErrors.author_avatar) {
                    setFormErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.author_avatar;
                      return newErrors;
                    });
                  }
                }}
              />
              {currentBlog.author_avatar && (
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1">Preview:</p>
                  <img
                    src={currentBlog.author_avatar}
                    alt="Author Avatar Preview"
                    className="w-32 h-32 object-cover rounded-full border border-gray-700"
                  />
                  <p className="text-xs text-gray-400 mt-1 break-all">
                    <strong>Avatar URL:</strong> {currentBlog.author_avatar}
                  </p>
                </div>
              )}
              {formErrors.author_avatar && (
                <p className="text-red-500 text-xs mt-1">{formErrors.author_avatar}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 p-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                isEditing ? "Update Blog" : "Add Blog"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
