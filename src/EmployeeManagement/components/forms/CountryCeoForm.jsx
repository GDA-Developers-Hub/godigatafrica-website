"use client"

import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import departmentRolesData from "../../utils/departmentRoles.json"
import ImageUploader from "../../../Utils/ImageUploader"


// import { BASE_URL } from "../../../Utils/BaseUrl"

export default function CountryCeoForm({ onSubmit, onCancel, employee = null }) {
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    image: employee?.image || "",
    department: "Executive",
    description: employee?.description || "",
    country: employee?.country || "",
    role: "CEO",
    linkedin: employee?.linkedin || "",
    twitter: employee?.twitter || "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Get the country label
      const selectedCountry = departmentRolesData.countries.find((country) => country.id === formData.country)

      // Format the data for the API
      const apiData = {
        name: formData.name,
        image: formData.image || null,
        department: "Executive",
        role: "CEO",
        description: formData.description || null,
        country: selectedCountry?.label || formData.country,
        linkedin: formData.linkedin || null,
        twitter: formData.twitter || null,
      }

      // If we're editing an existing employee
      if (employee?.id) {
        apiData.id = employee.id
      }
      
      // Call the onSubmit callback with the formatted data
      if (onSubmit) {
        await onSubmit(apiData)
      }
    } catch (err) {
      console.error("Error formatting Country CEO data:", err)
      setError("Failed to process Country CEO data")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, image: url }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[80vh]">
      {/* Form content area with overflow scroll */}
      <div className="flex-grow overflow-y-auto pr-2">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3 rounded-md bg-slate-700 border border-slate-600 p-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium text-white">
              Image
            </label>
            <div className="col-span-3">
              <ImageUploader onSaveUrl={handleImageUpload} existingUrl={formData.image} />
              
              {formData.image && (
                <div className="mt-3">
                  <p className="text-xs text-slate-400 mb-1">Preview:</p>
                  <img
                    src={formData.image}
                    alt="Employee Preview"
                    className="w-32 h-32 object-cover rounded-md border border-slate-700"
                  />
                  <p className="text-xs text-slate-400 mt-1 break-all">
                    <strong>Image URL:</strong> {formData.image}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="department" className="text-right text-sm font-medium text-white">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="col-span-3 rounded-md bg-slate-700 border border-slate-600 p-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-not-allowed opacity-50"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="role" className="text-right text-sm font-medium text-white">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="col-span-3 rounded-md bg-slate-700 border border-slate-600 p-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-not-allowed opacity-50"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="country" className="text-right text-sm font-medium text-white">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={(e) => handleSelectChange("country", e.target.value)}
              className="col-span-3 rounded-md bg-slate-700 border border-slate-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            >
              <option value="" className="bg-slate-800">Select country</option>
              {departmentRolesData.countries.map((country) => (
                <option key={country.id} value={country.id} className="bg-slate-800">
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="linkedin" className="text-right text-sm font-medium text-white">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="col-span-3 rounded-md bg-slate-700 border border-slate-600 p-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="twitter" className="text-right text-sm font-medium text-white">
              Twitter URL
            </label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="col-span-3 rounded-md bg-slate-700 border border-slate-600 p-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="https://twitter.com/username"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right text-sm font-medium text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3 rounded-md bg-slate-700 border border-slate-600 p-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              rows={3}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-800 text-white rounded-md">
          {error}
        </div>
      )}

      {/* Fixed footer with buttons */}
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-700 sticky bottom-0 bg-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-600 px-4 py-2 text-white hover:bg-slate-700"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (employee?.id ? "Updating..." : "Saving...") : (employee?.id ? "Update" : "Save")}
        </button>
      </div>
    </form>
  )
}