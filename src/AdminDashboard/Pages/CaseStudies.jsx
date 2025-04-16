"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, X, Eye, Save, ArrowLeft, Image } from "lucide-react"
import Swal from "sweetalert2"
import axios from "axios"
import { BASE_URL } from "../../Utils/BaseUrl"
import ImageUploader from "../../Utils/ImageUploader"
import RichTextEditor from "../../Utils/RichTextEditor"

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryIn, setRetryIn] = useState(0)
  const DEFAULT_IMAGE = "example http://image.png"

  const [currentCaseStudy, setCurrentCaseStudy] = useState({
    id: null,
    title: "",
    industry: "",
    description: "",
    challenges: "",
    solutions: "",
    results: "",
    image: DEFAULT_IMAGE,
    client: "",
    date: "",
    technologies: [],
  })

  // Industry choices
  const INDUSTRY_CHOICES = [
    { value: "tech", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "ecommerce", label: "E-commerce" },
  ]

  // Fetch case studies from API
  const fetchCaseStudies = async (retryAttempt = 0) => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("adminToken")
      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      const response = await axios.get(`${BASE_URL}/case-studies/`, { headers })

      if (Array.isArray(response.data)) {
        setCaseStudies(response.data)
      } else if (response.data && Array.isArray(response.data.results)) {
        setCaseStudies(response.data.results)
      } else {
        console.error("Unexpected response format:", response.data)
        setCaseStudies([])
      }
    } catch (error) {
      console.error("Error fetching case studies:", error)

      // Handle throttling error
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers["retry-after"] || 30
        const waitTime = Number.parseInt(retryAfter, 10)

        setRetryIn(waitTime)

        // Start countdown timer
        const countdownInterval = setInterval(() => {
          setRetryIn((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(countdownInterval)
              // Auto-retry after countdown if this is the first attempt
              if (retryAttempt < 2) {
                fetchCaseStudies(retryAttempt + 1)
              }
              return 0
            }
            return prevTime - 1
          })
        }, 1000)

        setError(`API rate limit exceeded. Please try again in ${waitTime} seconds.`)
      } else {
        setError("Failed to load case studies")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseStudies()

    // Cleanup function to clear any intervals when component unmounts
    return () => {
      const highestId = window.setTimeout(() => {}, 0)
      for (let i = 0; i < highestId; i++) {
        clearTimeout(i)
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentCaseStudy((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (field, content) => {
    setCurrentCaseStudy((prev) => ({ ...prev, [field]: content }))
  }

  const handleTechnologiesChange = (e) => {
    // Fix for comma handling in technologies input
    let technologies = []
    if (e.target.value) {
      technologies = e.target.value
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech)
    }
    setCurrentCaseStudy((prev) => ({ ...prev, technologies }))
  }

  const handleTechnologyKeyDown = (e) => {
    // Allow adding technologies with comma key
    if (e.key === "," && e.target.value.trim()) {
      e.preventDefault()
      const tech = e.target.value.trim()
      if (tech) {
        const technologies = [...currentCaseStudy.technologies, tech]
        setCurrentCaseStudy((prev) => ({ ...prev, technologies }))
        e.target.value = ""
      }
    }
  }

  const removeTechnology = (index) => {
    const technologies = [...currentCaseStudy.technologies]
    technologies.splice(index, 1)
    setCurrentCaseStudy((prev) => ({ ...prev, technologies }))
  }

  const openAddModal = () => {
    setCurrentCaseStudy({
      id: null,
      title: "",
      industry: "",
      description: "",
      challenges: "",
      solutions: "",
      results: "",
      image: DEFAULT_IMAGE,
      client: "",
      date: new Date().toISOString().split("T")[0],
      technologies: [],
    })
    setFormErrors({})
    setIsEditing(false)
    setIsPreviewMode(false)
    setIsModalOpen(true)
  }

  const openEditModal = (caseStudy) => {
    // Ensure technologies is an array
    const technologies = Array.isArray(caseStudy.technologies)
      ? caseStudy.technologies
      : caseStudy.technologies
        ? caseStudy.technologies.split(",").map((t) => t.trim())
        : []

    setCurrentCaseStudy({
      ...caseStudy,
      technologies,
    })
    setFormErrors({})
    setIsEditing(true)
    setIsPreviewMode(false)
    setIsModalOpen(true)
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  const validateForm = () => {
    const errors = {}
    if (!currentCaseStudy.title || !currentCaseStudy.title.trim()) errors.title = "Title is required"
    if (!currentCaseStudy.industry || !currentCaseStudy.industry.trim()) errors.industry = "Industry is required"
    if (!currentCaseStudy.description || !currentCaseStudy.description.trim())
      errors.description = "Description is required"
    if (!currentCaseStudy.challenges || !currentCaseStudy.challenges.trim())
      errors.challenges = "Challenges are required"
    if (!currentCaseStudy.solutions || !currentCaseStudy.solutions.trim()) errors.solutions = "Solutions are required"
    if (!currentCaseStudy.results || !currentCaseStudy.results.trim()) errors.results = "Results are required"
    if (!currentCaseStudy.image || currentCaseStudy.image === DEFAULT_IMAGE) errors.image = "Image is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      Swal.fire("Validation Error", "Please fill in all required fields", "error")
      return
    }

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem("adminToken")
      if (!token) {
        Swal.fire("Authentication Error", "You must be logged in", "error")
        setIsSubmitting(false)
        return
      }

      const headers = { Authorization: `Bearer ${token}` }
      const payload = { ...currentCaseStudy }

      // Convert technologies array to string for API
      if (Array.isArray(payload.technologies)) {
        payload.technologies = payload.technologies.join(", ")
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/case-studies/${currentCaseStudy.id}/`, payload, { headers })
        setCaseStudies((prev) => prev.map((item) => (item.id === currentCaseStudy.id ? { ...item, ...payload } : item)))
        Swal.fire("Success", "Case study updated successfully", "success")
      } else {
        const response = await axios.post(`${BASE_URL}/case-studies/`, payload, { headers })
        setCaseStudies((prev) => [response.data, ...prev])
        Swal.fire("Success", "Case study added successfully", "success")
      }

      setIsModalOpen(false)
    } catch (error) {
      console.error("Error submitting case study:", error)

      if (error.response && error.response.status === 429) {
        Swal.fire("Rate Limited", "Too many requests. Please try again later.", "error")
      } else if (error.response && error.response.data) {
        // Show validation errors from the API
        const errorMessages = Object.entries(error.response.data)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
        Swal.fire("Error", errorMessages || "Failed to save case study", "error")
      } else {
        Swal.fire("Error", "Failed to save case study", "error")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      Swal.fire("Authentication Error", "You must be logged in", "error")
      return
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/case-studies/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          setCaseStudies((prev) => prev.filter((item) => item.id !== id))
          Swal.fire("Deleted!", "Case study has been deleted.", "success")
        } catch (error) {
          console.error("Error deleting case study:", error)

          if (error.response && error.response.status === 429) {
            Swal.fire("Rate Limited", "Too many requests. Please try again later.", "error")
          } else {
            Swal.fire("Error", "Failed to delete case study", "error")
          }
        }
      }
    })
  }

  const handleRetry = () => {
    if (retryIn > 0) return
    fetchCaseStudies()
  }

  // Preview component for case study
  const CaseStudyPreview = () => {
    const {
      title = "Untitled Case Study",
      industry = "",
      description = "",
      challenges = "",
      solutions = "",
      results = "",
      image = DEFAULT_IMAGE,
      client = "",
      date = "",
      technologies = [],
    } = currentCaseStudy

    const industryLabel = INDUSTRY_CHOICES.find((i) => i.value === industry)?.label || industry

    return (
      <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-64 overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block bg-cyan-500/20 backdrop-blur-sm text-cyan-400 px-3 py-1 rounded-full text-sm font-medium mb-2">
              {industryLabel}
            </span>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {client && <p className="text-sm text-gray-300 mt-1">Client: {client}</p>}
            {date && <p className="text-sm text-gray-300">Date: {date}</p>}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-cyan-400">Challenges</h3>
              <div className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: challenges }}></div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-cyan-400">Solutions</h3>
              <div className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: solutions }}></div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-cyan-400">Results</h3>
              <div className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: results }}></div>
            </div>
          </div>

          {technologies && technologies.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Case Studies</h2>
        <button
          onClick={openAddModal}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Case Study
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading case studies...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-red-500/30 mb-16">
          <h3 className="text-2xl font-bold text-white mb-4">Error</h3>
          <p className="text-gray-300 mb-6">{error}</p>

          {retryIn > 0 ? (
            <div className="mb-6">
              <p className="text-amber-400 mb-2">Retrying in {retryIn} seconds...</p>
              <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-1000"
                  style={{ width: `${(retryIn / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleRetry}
              className="border border-cyan-500 text-white hover:bg-cyan-500/10 px-6 py-2 rounded-full flex items-center justify-center mx-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Retry
            </button>
          )}
        </div>
      ) : caseStudies.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
          <p className="text-xl mb-4">No case studies found</p>
          <button
            onClick={openAddModal}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="h-4 w-4" /> Add Your First Case Study
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((item) => (
            <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="relative">
                <img src={item.image || DEFAULT_IMAGE} alt={item.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-black/50 hover:bg-cyan-500 p-2 rounded-full text-white transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-black/50 hover:bg-red-500 p-2 rounded-full text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-cyan-400">
                      {INDUSTRY_CHOICES.find((i) => i.value === item.industry)?.label || item.industry}
                    </p>
                  </div>
                  {item.client && <span className="text-xs text-gray-400">Client: {item.client}</span>}
                </div>
                <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                  {item.description?.replace(/<[^>]*>/g, "") || "No description available"}
                </p>
                {item.technologies && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(Array.isArray(item.technologies)
                      ? item.technologies
                      : item.technologies.split(",").map((t) => t.trim())
                    )
                      .slice(0, 3)
                      .map((tech, index) => (
                        <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    {(Array.isArray(item.technologies)
                      ? item.technologies.length
                      : item.technologies.split(",").length) > 3 && (
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                        +
                        {(Array.isArray(item.technologies)
                          ? item.technologies.length
                          : item.technologies.split(",").length) - 3}{" "}
                        more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 text-white rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold">
                {isPreviewMode ? "Preview Case Study" : isEditing ? "Edit Case Study" : "Add Case Study"}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={togglePreviewMode}
                  className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-lg flex items-center gap-1"
                >
                  {isPreviewMode ? (
                    <>
                      <ArrowLeft className="w-4 h-4" /> Back to Edit
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" /> Preview
                    </>
                  )}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isPreviewMode ? (
                <div className="p-4">
                  <CaseStudyPreview />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Title*</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Case Study Title"
                        value={currentCaseStudy.title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      />
                      {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                    </div>

                    {/* Industry Dropdown */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Industry*</label>
                      <select
                        name="industry"
                        value={currentCaseStudy.industry || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="">Select Industry</option>
                        {INDUSTRY_CHOICES.map((choice) => (
                          <option key={choice.value} value={choice.value}>
                            {choice.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.industry && <p className="text-red-500 text-sm mt-1">{formErrors.industry}</p>}
                    </div>

                    {/* Client */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Client</label>
                      <input
                        type="text"
                        name="client"
                        placeholder="Client Name"
                        value={currentCaseStudy.client || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={currentCaseStudy.date || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {/* Technologies - Updated for better UX */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Technologies</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {currentCaseStudy.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(index)}
                              className="ml-1 text-gray-400 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Add technology (press comma to add)"
                          onKeyDown={handleTechnologyKeyDown}
                          className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Description*</label>
                    <RichTextEditor
                      content={currentCaseStudy.description || ""}
                      onChange={(content) => handleContentChange("description", content)}
                    />
                    {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                  </div>

                  {/* Challenges */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Challenges*</label>
                    <RichTextEditor
                      content={currentCaseStudy.challenges || ""}
                      onChange={(content) => handleContentChange("challenges", content)}
                    />
                    {formErrors.challenges && <p className="text-red-500 text-sm mt-1">{formErrors.challenges}</p>}
                  </div>

                  {/* Solutions */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Solutions*</label>
                    <RichTextEditor
                      content={currentCaseStudy.solutions || ""}
                      onChange={(content) => handleContentChange("solutions", content)}
                    />
                    {formErrors.solutions && <p className="text-red-500 text-sm mt-1">{formErrors.solutions}</p>}
                  </div>

                  {/* Results */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Results*</label>
                    <RichTextEditor
                      content={currentCaseStudy.results || ""}
                      onChange={(content) => handleContentChange("results", content)}
                    />
                    {formErrors.results && <p className="text-red-500 text-sm mt-1">{formErrors.results}</p>}
                  </div>

                  
                              {/* Case study Image Uploader */}
                              <div className="mb-6">
                              <label className="text-sm font-medium">Featured Image*</label>
                                <div className="flex items-center gap-2 mb-2">
                                  <Image className="h-5 w-5 text-cyan-500" />
                                  <span className="text-sm text-cyan-500">
                                    Upload a high-quality image for your case study post
                                  </span>
                                </div>
                                <ImageUploader
                                  onSaveUrl={(url) => {
                                    setCurrentCaseStudy((prev) => ({ ...prev, image: url }));
                                    if (formErrors.image) {
                                      setFormErrors((prev) => {
                                        const newErrors = { ...prev };
                                        delete newErrors.image;
                                        return newErrors;
                                      });
                                    }
                                  }}
                                />
                                {currentCaseStudy.image && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-400 mb-1">Preview:</p>
                                    <img
                                      src={currentCaseStudy.image}
                                      alt="Case study Cover Preview"
                                      className="w-full h-40 object-cover rounded-md border border-gray-700"
                                    />
                                    <p className="text-xs text-gray-400 mt-1 break-all">
                                      <strong>Image URL:</strong> {currentCaseStudy.image}
                                    </p>
                                  </div>
                                )}
                                {formErrors.image && (
                                  <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
                                )}
                              </div>
                </form>
              )}
            </div>
            {!isPreviewMode && (
              <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {isEditing ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {isEditing ? "Update" : "Save"}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

