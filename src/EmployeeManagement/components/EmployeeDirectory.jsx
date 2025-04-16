"use client"

import React, { useState, useEffect } from "react"
import { Edit, Trash2 } from "lucide-react"
import Swal from "sweetalert2"
import FounderForm from "./forms/FounderForm"
import CofounderForm from "./forms/CofounderForm"
import CountryCeoForm from "./forms/CountryCeoForm"
import EmployeeForm from "./forms/EmployeeForm"
import { COUNTRY_CHOICES, DEPARTMENT_CHOICES } from "../config/api"
import { fetchTeamMembers } from "../services/api"

export default function EmployeeDirectory({
  teamData: externalTeamData,
  handleDeleteEmployee,
  handleEditEmployee,
  editEmployee,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  handleUpdateSubmit,
  openDialog,
  setOpenDialog,
  formType,
  handleFormSubmit,
}) {
  const [viewMode, setViewMode] = useState("table")
  const [localTeamData, setLocalTeamData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState({
    department: "",
    country: "",
    search: "",
  })

  // Use data from parent component if provided
  useEffect(() => {
    if (externalTeamData && externalTeamData.length > 0) {
      setLocalTeamData(externalTeamData)
      setFilteredData(externalTeamData)
    } else {
      // Fallback to local data loading if needed
      loadTeamMembers()
    }
  }, [externalTeamData])

  useEffect(() => {
    applyFilters()
  }, [filters, localTeamData])

  const loadTeamMembers = async () => {
    try {
      const data = await fetchTeamMembers()
      setLocalTeamData(data)
      setFilteredData(data)
    } catch (error) {
      console.error("Failed to load team members:", error)
    }
  }

  const applyFilters = () => {
    let filtered = [...localTeamData]

    if (filters.department) {
      filtered = filtered.filter(dept => dept.department === filters.department)
    }

    if (filters.country) {
      filtered = filtered.map(dept => ({
        ...dept,
        members: dept.members.filter(member => member.country === filters.country)
      })).filter(dept => dept.members.length > 0)
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.map(dept => ({
        ...dept,
        members: dept.members.filter(member => 
          member.name.toLowerCase().includes(searchTerm) ||
          member.role.toLowerCase().includes(searchTerm) ||
          member.description?.toLowerCase().includes(searchTerm)
        )
      })).filter(dept => dept.members.length > 0)
    }

    setFilteredData(filtered)
  }

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Employee Directory</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={`rounded-md px-3 py-2 text-sm ${
                viewMode === "table"
                  ? "bg-slate-700 text-white"
                  : "border border-slate-700 text-white hover:bg-slate-700"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`rounded-md px-3 py-2 text-sm ${
                viewMode === "cards"
                  ? "bg-slate-700 text-white"
                  : "border border-slate-700 text-white hover:bg-slate-700"
              }`}
            >
              Card View
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-400"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white"
              value={filters.department}
              onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
            >
              <option value="">All Departments</option>
              {DEPARTMENT_CHOICES.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white"
              value={filters.country}
              onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
            >
              <option value="">All Countries</option>
              {COUNTRY_CHOICES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <TableView 
          teamData={filteredData} 
          handleDeleteEmployee={handleDeleteEmployee}
          handleEditEmployee={handleEditEmployee}
        />
      ) : (
        <CardView 
          teamData={filteredData} 
          handleDeleteEmployee={handleDeleteEmployee}
          handleEditEmployee={handleEditEmployee}
        />
      )}

      {/* Employee Form Dialog */}
      {openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg border border-slate-700 bg-slate-800 p-6 text-white">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                {formType === "founder" && "Add Founder"}
                {formType === "cofounder" && "Add Co-founder"}
                {formType === "countryCeo" && "Add Country CEO"}
                {formType === "employee" && "Add Employee"}
              </h2>
              <p className="mt-1 text-slate-300">Fill in the details to add a new employee to the system.</p>
            </div>

            {formType === "founder" && <FounderForm onSubmit={handleFormSubmit} onCancel={() => setOpenDialog(false)} />}

            {formType === "cofounder" && (
              <CofounderForm onSubmit={handleFormSubmit} onCancel={() => setOpenDialog(false)} />
            )}

            {formType === "countryCeo" && (
              <CountryCeoForm onSubmit={handleFormSubmit} onCancel={() => setOpenDialog(false)} />
            )}

            {formType === "employee" && (
              <EmployeeForm onSubmit={handleFormSubmit} onCancel={() => setOpenDialog(false)} />
            )}
          </div>
        </div>
      )}
      
      {/* Update Employee Dialog */}
      {isUpdateModalOpen && editEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg border border-slate-700 bg-slate-800 p-6 text-white">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Update Employee</h2>
              <p className="mt-1 text-slate-300">Edit employee details.</p>
            </div>

            {editEmployee.role === "Founder" && (
              <FounderForm 
                employee={editEmployee} 
                onSubmit={handleUpdateSubmit} 
                onCancel={() => setIsUpdateModalOpen(false)} 
              />
            )}

            {editEmployee.role === "Co-Founder" && (
              <CofounderForm 
                employee={editEmployee} 
                onSubmit={handleUpdateSubmit} 
                onCancel={() => setIsUpdateModalOpen(false)} 
              />
            )}

            {editEmployee.role === "Country CEO" && (
              <CountryCeoForm 
                employee={editEmployee} 
                onSubmit={handleUpdateSubmit} 
                onCancel={() => setIsUpdateModalOpen(false)} 
              />
            )}

            {editEmployee.role !== "Founder" && 
              editEmployee.role !== "Co-Founder" && 
              editEmployee.role !== "Country CEO" && (
              <EmployeeForm 
                employee={editEmployee} 
                onSubmit={handleUpdateSubmit} 
                onCancel={() => setIsUpdateModalOpen(false)} 
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

function TableView({ teamData, handleDeleteEmployee, handleEditEmployee }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-white">
        <thead className="bg-slate-800">
          <tr className="border-b border-slate-700">
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Department</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Role</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Country</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamData.flatMap((dept) =>
            dept.members.map((member) => (
              <tr key={member.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-4 py-3 text-sm">{member.name}</td>
                <td className="px-4 py-3 text-sm">{dept.department}</td>
                <td className="px-4 py-3 text-sm">{member.role}</td>
                <td className="px-4 py-3 text-sm">{member.country}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditEmployee({ ...member, department: dept.department })}
                      className="rounded-full p-1 text-slate-300 hover:bg-slate-600 hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(member.id)}
                      className="rounded-full p-1 text-slate-300 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function CardView({ teamData, handleDeleteEmployee, handleEditEmployee }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {teamData.flatMap((dept) =>
        dept.members.map((member) => (
          <div
            key={member.id}
            className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800 transition-all hover:border-slate-600 hover:shadow-lg"
          >
            <div className="relative aspect-square w-full bg-slate-700">
              <img
                src={member.image || `/placeholder.svg?height=300&width=300`}
                alt={member.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm text-slate-300">{member.role}</p>
              </div>
              
              <div className="absolute right-2 top-2 flex space-x-1">
                <button
                  onClick={() => handleEditEmployee({ ...member, department: dept.department })}
                  className="rounded-full bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteEmployee(member.id)}
                  className="rounded-full bg-slate-800/80 p-2 text-slate-300 hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-white">{dept.department}</span>
                <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-white">{member.country}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                {member.description || "No description available."}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

