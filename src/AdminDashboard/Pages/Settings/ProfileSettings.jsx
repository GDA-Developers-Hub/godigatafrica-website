import React, { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { BASE_URL } from "../../../Utils/BaseUrl"
import { useNavigate } from "react-router-dom"

// Create a Swal Toast instance
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

// Utility function to decode a JWT
function parseJwt(token) {
  if (!token) return null
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error parsing JWT:", error)
    return null
  }
}

export default function UserProfilePage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    password: "",
    confirm_password: "",
  })

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken")

      if (!token) {
        Toast.fire({
          icon: "error",
          title: "You must be logged in to view this page",
        })
        navigate("/login")
        return
      }

      const decodedToken = parseJwt(token)
      const userId = decodedToken?.user_id

      if (userId) {
        fetchUserInfo(userId, token)
      }
    }
  }, [navigate])

  const fetchUserInfo = async (userId, token) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/admin/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setFormData({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
        password: "",
        confirm_password: "",
      })
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Failed to fetch user info",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Ensure passwords match
    if (formData.password !== formData.confirm_password) {
      Toast.fire({
        icon: "error",
        title: "Passwords do not match",
      })
      return
    }

    // Get token from storage
    const token = localStorage.getItem("adminToken")
    const decodedToken = parseJwt(token)
    const userId = decodedToken?.user_id

    if (!userId || !token) {
      Toast.fire({
        icon: "error",
        title: "Authentication error. Please log in again.",
      })
      navigate("/login")
      return
    }

    // Prepare payload (include confirm_password if a password is provided)
    const payload = {
      username: formData.username,
      email: formData.email,
    }

    if (formData.password) {
      payload.password = formData.password
      payload.confirm_password = formData.confirm_password
    }

    setIsSaving(true)
    try {
      await axios.put(`${BASE_URL}/admin/${userId}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      Toast.fire({
        icon: "success",
        title: "User information updated successfully",
      })

      // Clear password fields after update
      setFormData((prev) => ({ ...prev, password: "", confirm_password: "" }))
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Failed to update user info",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">User Profile</h2>
          <p className="text-gray-400 mt-1">
            View and update your account information
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {isLoading ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-300"
                  >
                    User ID
                  </label>
                  <input
                    id="id"
                    name="id"
                    value={formData.id}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    value={formData.role}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    pattern="^[\w.@+-]+$"
                    maxLength={150}
                    minLength={1}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={254}
                    minLength={1}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    minLength={1}
                    maxLength={128}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirm_password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    minLength={1}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-800 flex justify-end">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md font-medium text-white ${
                isLoading || isSaving
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
              disabled={isLoading || isSaving}
            >
              {isSaving ? "Saving Changes..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
