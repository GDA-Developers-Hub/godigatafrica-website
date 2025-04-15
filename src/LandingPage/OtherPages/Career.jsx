"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Briefcase, MapPin, Calendar, X, ChevronRight, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BASE_URL } from "../../Utils/BaseUrl"

const CareerSection = () => {
  const [careers, setCareers] = useState([])
  const [currentCareer, setCurrentCareer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [applicationForm, setApplicationForm] = useState({
    applicant_name: "",
    applicant_email: "",
    cover_letter: "",
    resume: null,
    career: 0,
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch all careers
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch all careers
        const response = await axios.get(`${BASE_URL}/careers/`)
        if (Array.isArray(response.data)) {
          const activeCareers = response.data.filter((career) => career.active_listing)
          setCareers(activeCareers)
        } else {
          console.error("Unexpected response format:", response.data)
          setCareers([])
        }
      } catch (error) {
        console.error("Error fetching career data:", error)
        setCareers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fetch a specific career
  const fetchCareerDetails = async (id) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/careers/${id}/`)
      setCurrentCareer(response.data)
      setIsViewModalOpen(true)
    } catch (error) {
      console.error("Error fetching career details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const viewCareerDetails = (id) => {
    fetchCareerDetails(id)
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
    setTimeout(() => {
      setCurrentCareer(null)
    }, 300)
  }

  const openApplyModal = (career) => {
    setApplicationForm({
      applicant_name: "",
      applicant_email: "",
      cover_letter: "",
      resume: null,
      career: career.id,
    })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplicationForm((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          resume: "File size exceeds 5MB limit",
        }))
        return
      }

      // Check file type (PDF, DOC, DOCX)
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(file.type)) {
        setFormErrors((prev) => ({
          ...prev,
          resume: "Only PDF, DOC, or DOCX files are accepted",
        }))
        return
      }

      setApplicationForm((prev) => ({ ...prev, resume: file }))
      // Clear error for this field if it exists
      if (formErrors.resume) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.resume
          return newErrors
        })
      }
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!applicationForm.applicant_name.trim()) errors.applicant_name = "Name is required"
    if (!applicationForm.applicant_email.trim()) {
      errors.applicant_email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(applicationForm.applicant_email)) {
      errors.applicant_email = "Email is invalid"
    }
    if (!applicationForm.cover_letter.trim()) errors.cover_letter = "Cover letter is required"
    if (!applicationForm.resume) errors.resume = "Resume is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append("career", applicationForm.career.toString())
      formData.append("applicant_name", applicationForm.applicant_name)
      formData.append("applicant_email", applicationForm.applicant_email)
      formData.append("cover_letter", applicationForm.cover_letter)
      if (applicationForm.resume) {
        formData.append("resume", applicationForm.resume)
      }

      // Submit application to the new endpoint
      await axios.post(`${BASE_URL}/apply/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      Swal.fire({
        title: "Application Submitted!",
        text: "Thank you for your application. We will review it and get back to you soon.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      })

      closeModal()
    } catch (error) {
      console.error("Error submitting application:", error)

      Swal.fire({
        title: "Submission Error",
        text: "There was an error submitting your application. Please try again later.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatRequirements = (requirements) => {
    return requirements.split("\n").map((req, index) => (
      <li key={index} className="mb-2 flex items-start">
        <span className="mr-2">{req.includes("✅") ? "✅" : "•"}</span>
        <span>{req.replace("✅", "").trim()}</span>
      </li>
    ))
  }

  if (isLoading && !currentCareer && careers.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 w-12 rounded-full animate-spin"></div>
      </div>
    )
  }

  // Render the careers list
  return (
    <section className="relative bg-[var(--card-background)] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mt-20">
      <span className="text-[var(--text-primary)] mb-3 tracking-wider text-sm uppercase block font-bold">
            CAREERS
          </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffffff] mb-6">
          Join Our Team
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-primary)] font-bold  max-w-3xl mx-auto">
          Discover exciting career opportunities and be part of a dynamic team shaping the future of digital solutions
          in Africa.
        </p>
      </div>

      {careers.length === 0 ? (
        <div className="text-center py-16 max-w-6xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">No Open Positions</h3>
            <p className="text-gray-300">
              We don't have any open positions at the moment. Please check back later or send your resume to{" "}
              <a href="mailto:careers@godigitalafrica.com" className="text-cyan-400 hover:underline">
                careers@godigitalafrica.com
              </a>{" "}
              for future opportunities.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 max-w-6xl mx-auto px-4">
          {careers.map((career) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: career.id * 0.1 }}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-cyan-300">
                {career.title}
              </h3>
              <p className="text-gray-100 text-sm sm:text-base mb-4 line-clamp-3">{career.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center gap-1 bg-green-700/80 rounded-full text-gray-200 text-xs px-3 py-1">
                  <MapPin size={12} />
                  {career.location}
                </span>
                <span className="flex items-center gap-1 bg-amber-700/80 rounded-full text-gray-200 text-xs px-3 py-1">
                  <Briefcase size={12} />
                  {career.job_type.charAt(0).toUpperCase() + career.job_type.slice(1)}
                </span>
              </div>
              {career.application_deadline && (
                <p className="mt-2 text-red-500 text-xs flex items-center gap-1 font-bold">
                  <Calendar size={20} />
                  Deadline: {new Date(career.application_deadline).toLocaleDateString()}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={() => viewCareerDetails(career.id)}
                  className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  View Details <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => openApplyModal(career)}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  Apply Now <Send size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Career Details Modal */}
      <AnimatePresence>
        {isViewModalOpen && currentCareer && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-gray-700 bg-gray-900">
                <h2 className="text-xl font-bold text-white">{currentCareer.title}</h2>
                <button
                  onClick={closeViewModal}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                    <MapPin className="h-6 w-6 text-cyan-400 mb-2" />
                    <h3 className="text-sm font-medium text-gray-300">Location</h3>
                    <p className="text-white font-semibold">{currentCareer.location}</p>
                  </div>

                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                    <Briefcase className="h-6 w-6 text-cyan-400 mb-2" />
                    <h3 className="text-sm font-medium text-gray-300">Job Type</h3>
                    <p className="text-white font-semibold capitalize">{currentCareer.job_type}</p>
                  </div>

                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
                    <Calendar className="h-6 w-6 text-cyan-400 mb-2" />
                    <h3 className="text-sm font-medium text-gray-300">Application Deadline</h3>
                    <p className="text-white font-semibold">
                      {new Date(currentCareer.application_deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Job Description</h3>
                  <p className="text-gray-300 leading-relaxed">{currentCareer.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Requirements</h3>
                  <ul className="text-gray-300 pl-2">{formatRequirements(currentCareer.requirements)}</ul>
                </div>

                <div className="flex justify-center mt-10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      closeViewModal()
                      setTimeout(() => openApplyModal(currentCareer), 300)
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-md flex items-center gap-2 transition-all duration-300 text-lg font-medium shadow-lg"
                  >
                    <Send size={18} /> Apply for this Position
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  Apply for: {careers.find((c) => c.id === applicationForm.career)?.title || "Position"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto p-6 flex-grow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <label htmlFor="applicant_name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="applicant_name"
                      name="applicant_name"
                      value={applicationForm.applicant_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      placeholder="Your full name"
                    />
                    {formErrors.applicant_name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.applicant_name}</p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <label htmlFor="applicant_email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="applicant_email"
                      name="applicant_email"
                      value={applicationForm.applicant_email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      placeholder="your.email@example.com"
                    />
                    {formErrors.applicant_email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.applicant_email}</p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-300 mb-1">
                      Cover Letter*
                    </label>
                    <textarea
                      id="cover_letter"
                      name="cover_letter"
                      value={applicationForm.cover_letter}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white resize-none"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    ></textarea>
                    {formErrors.cover_letter && <p className="text-red-500 text-sm mt-1">{formErrors.cover_letter}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-1">
                      Resume/CV* (PDF, DOC, DOCX, max 5MB)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="resume"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PDF, DOC, or DOCX (MAX. 5MB)</p>
                        </div>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {applicationForm.resume && (
                      <p className="text-sm text-green-400 mt-2">File selected: {applicationForm.resume.name}</p>
                    )}
                    {formErrors.resume && <p className="text-red-500 text-sm mt-1">{formErrors.resume}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex justify-end"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-md flex items-center gap-2 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Submit Application
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CareerSection

