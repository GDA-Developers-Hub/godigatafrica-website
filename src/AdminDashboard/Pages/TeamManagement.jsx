"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Eye, Plus, X, Search, Save, RefreshCw } from "lucide-react"
import axios from "axios"
import ImageUploader from "../../Utils/ImageUploader"
import { motion } from "framer-motion"
import { BASE_URL } from "../../Utils/BaseUrl"

function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("view") // view, add, edit
  const [currentMember, setCurrentMember] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "",
    twitter: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch team members
  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    const token = localStorage.getItem("adminToken")
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/team/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Ensure response.data is an array
      const members = Array.isArray(response.data) ? response.data : []
      setTeamMembers(members)
      setError(null)
    } catch (err) {
      setError("Failed to fetch team members. Please try again later.")
      console.error("Error fetching team members:", err)
      setTeamMembers([]) // Ensure teamMembers is always an array
    } finally {
      setLoading(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Create new team member
  const handleAddMember = async () => {
    const token = localStorage.getItem("adminToken")
    try {
      const response = await axios.post(`${BASE_URL}/team/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTeamMembers([...teamMembers, response.data])
      closeModal()
    } catch (err) {
      setError("Failed to add team member. Please try again.")
      console.error("Error adding team member:", err)
    }
  }

  // Update team member
  const handleUpdateMember = async () => {
    const token = localStorage.getItem("adminToken")
    try {
      const response = await axios.put(`${BASE_URL}/team/${currentMember.id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTeamMembers(teamMembers.map((member) => (member.id === currentMember.id ? response.data : member)))
      closeModal()
    } catch (err) {
      setError("Failed to update team member. Please try again.")
      console.error("Error updating team member:", err)
    }
  }

  // Delete team member
  const handleDeleteMember = async (id) => {
    const token = localStorage.getItem("adminToken")
    setIsDeleting(true)
    try {
      await axios.delete(`${BASE_URL}/team/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTeamMembers(teamMembers.filter((member) => member.id !== id))
      closeModal()
    } catch (err) {
      setError("Failed to delete team member. Please try again.")
      console.error("Error deleting team member:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  // Open modal functions
  const openViewModal = (member) => {
    setCurrentMember(member)
    setModalMode("view")
    setShowModal(true)
  }

  const openAddModal = () => {
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "",
      twitter: "",
    })
    setModalMode("add")
    setShowModal(true)
  }

  const openEditModal = (member) => {
    setCurrentMember(member)
    setFormData({
      name: member.name,
      role: member.role || "",
      bio: member.bio || "",
      image: member.image,
      linkedin: member.linkedin || "",
      twitter: member.twitter || "",
    })
    setModalMode("edit")
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setCurrentMember(null)
    setError(null)
  }

  // Handle image upload
  const handleImageUpload = (url) => {
    setFormData({
      ...formData,
      image: url,
    })
  }

  // Filter team members based on search term
  // Ensure teamMembers is treated as an array before filtering
  const filteredMembers = Array.isArray(teamMembers)
    ? teamMembers.filter(
        (member) =>
          member?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member?.role?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  return (
    <div className="bg-slate-900 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Team Management</h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-lg text-white font-medium transition-all"
          >
            <Plus className="h-5 w-5" />
            Add Team Member
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-8 w-8 text-cyan-500 animate-spin" />
          </div>
        ) : error && !showModal ? (
          <div className="bg-red-900/30 border border-red-500 text-white p-4 rounded-lg mb-6">
            {error}
            <button onClick={fetchTeamMembers} className="ml-2 underline text-cyan-400 hover:text-cyan-300">
              Try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/30 transition-all shadow-lg group"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden border border-slate-600">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                          <p className="text-cyan-400">{member.role}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{member.bio}</p>

                    <div className="flex gap-2 justify-end mt-4">
                      <button
                        onClick={() => openViewModal(member)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(member)}
                        className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentMember(member)
                          setIsDeleting(true)
                        }}
                        className="p-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-400">
                No team members found. Try a different search or add a new team member.
              </div>
            )}
          </div>
        )}
      </div>

      {/* View/Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {modalMode === "view"
                  ? "Team Member Details"
                  : modalMode === "add"
                    ? "Add New Team Member"
                    : "Edit Team Member"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            {error && <div className="bg-red-900/30 border border-red-500 text-white p-4 rounded-lg mb-6">{error}</div>}

            {modalMode === "view" && currentMember && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="rounded-xl overflow-hidden border border-slate-700 mb-4">
                    <motion.img
                      src={currentMember.image}
                      alt={currentMember.name}
                      className="w-full h-auto object-cover"
                      layoutId={`image-${currentMember.id}`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="flex justify-center space-x-4 my-4">
                    {currentMember.linkedin && (
                      <a
                        href={currentMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-linkedin"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                    {currentMember.twitter && (
                      <a
                        href={currentMember.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-twitter"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {currentMember.created_at && (
                    <p className="text-center text-slate-400 text-sm">
                      Member since: {new Date(currentMember.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-1">{currentMember.name}</h3>
                  <p className="text-cyan-400 text-lg mb-4">{currentMember.role}</p>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Bio</h4>
                    <p className="text-slate-300 whitespace-pre-line">{currentMember.bio || "No bio available."}</p>
                  </div>

                  <div className="flex justify-end mt-8 gap-4">
                    <button
                      onClick={() => openEditModal(currentMember)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => setIsDeleting(true)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(modalMode === "add" || modalMode === "edit") && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  modalMode === "add" ? handleAddMember() : handleUpdateMember()
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        maxLength={255}
                        minLength={1}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">
                        Role *
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        maxLength={255}
                        minLength={1}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Profile Image *</label>
                       <div>
                                      <ImageUploader
                                         onSaveUrl={handleImageUpload}
                                         currentImage={formData.image} 
                                      />
                                      {formData.image && (
                                        <div className="mt-2">
                                          <p className="text-xs text-gray-400 mb-1">Preview:</p>
                                          <img 
                                            src={formData.image} 
                                            alt="Uploaded Preview" 
                                            className="w-full h-40 object-cover rounded-md border border-gray-700"
                                          />
                                          <p className="text-xs text-gray-400 mt-1 break-all">
                                            <strong>Image URL:</strong> {formData.image}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                      <p className="text-xs text-slate-400 mt-1">Image URL must be less than 200 characters</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-slate-300 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        maxLength={200}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-slate-300 mb-1">
                        Twitter URL
                      </label>
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        maxLength={200}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end mt-8 gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-medium flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {modalMode === "add" ? "Add Team Member" : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && currentMember && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl max-w-md w-full p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete <span className="font-semibold text-white">{currentMember.name}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMember(currentMember.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium flex items-center gap-2"
                disabled={loading}
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamManagement

