"use client"

import { useState, useEffect, useRef } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import DashboardPage from "./pages/dashboard-page"
import EmployeeDirectory from "./components/EmployeeDirectory"
import Swal from "sweetalert2"

import { fetchTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from "./services/api"

export default function EmployeeManagement() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [teamData, setTeamData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [formType, setFormType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [editEmployee, setEditEmployee] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  
  // Store cached data
  const cachedDataRef = useRef(null);
  const cacheTimestampRef = useRef(null);
  const CACHE_LIFETIME = 120000; // 2 minutes

  useEffect(() => {
    loadTeamData()
  }, [])

  const loadTeamData = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      
      // Check if we have valid cached data
      const now = Date.now();
      if (cachedDataRef.current && cacheTimestampRef.current && 
          (now - cacheTimestampRef.current < CACHE_LIFETIME)) {
        console.log("Using locally cached team data");
        setTeamData(cachedDataRef.current);
        setIsLoading(false);
        return;
      }
      
      // Use the api service which handles throttling and caching
      console.log("Fetching team data from API service");
      const data = await fetchTeamMembers();
      
      if (data && data.length > 0) {
        // Update local cache
        cachedDataRef.current = data;
        cacheTimestampRef.current = Date.now();
        setTeamData(data);
      } else if (cachedDataRef.current) {
        // If API returned empty but we have cached data, use that
        console.log("API returned empty data, using cached data");
        setTeamData(cachedDataRef.current);
      } else {
        // Nothing available
        setTeamData([]);
      }
    } catch (error) {
      console.error("Failed to load team data:", error);
      setHasError(true);
      
      // Use cached data if available
      if (cachedDataRef.current) {
        setTeamData(cachedDataRef.current);
        
        Swal.fire({
          icon: 'warning',
          title: 'Connection Issue',
          text: 'Cannot connect to server. Using last available data.',
          timer: 3000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Connection Error',
          text: 'Could not connect to the server. Please try again later.',
        });
        setTeamData([]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddEmployee = (type) => {
    setFormType(type)
    setOpenDialog(true)
  }

  const handleFormSubmit = async (employeeData) => {
    try {
      await createTeamMember(employeeData);
      
      // Refresh team data after creation
      await loadTeamData();
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to add team member:", error);
      // Error already handled in createTeamMember
    }
  }

  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setIsUpdateModalOpen(true);
  }

  const handleUpdateSubmit = async (employeeData) => {
    try {
      if (!editEmployee || !editEmployee.id) {
        throw new Error("No employee selected for update");
      }
      
      await updateTeamMember(editEmployee.id, employeeData);
      
      // Refresh team data after update
      await loadTeamData();
      setIsUpdateModalOpen(false);
      setEditEmployee(null);
    } catch (error) {
      console.error("Failed to update team member:", error);
      // Error already handled in updateTeamMember
    }
  }

  const handleDeleteEmployee = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        await deleteTeamMember(id);
        await loadTeamData();
      }
    } catch (error) {
      console.error("Failed to delete team member:", error);
      // Error already handled in deleteTeamMember
    }
  }

  // Filter employees based on search query
  const filteredTeamData = teamData
    .map((department) => {
      return {
        ...department,
        members: department.members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
            department.department.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }
    })
    .filter((department) => department.members.length > 0)

  return (
    <div className="flex h-[calc(100vh-70px)]  bg-slate-900 text-white overflow-hidden">
      {/* Sticky sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          handleAddEmployee={handleAddEmployee} 
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-slate-800 shadow-md">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleAddEmployee={handleAddEmployee}
          />
        </div>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "dashboard" && <DashboardPage />}

          {activeTab === "employees" && (
            <EmployeeDirectory
              teamData={filteredTeamData}
              handleDeleteEmployee={handleDeleteEmployee}
              handleEditEmployee={handleEditEmployee}
              editEmployee={editEmployee}
              isUpdateModalOpen={isUpdateModalOpen}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              handleUpdateSubmit={handleUpdateSubmit}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              formType={formType}
              handleFormSubmit={handleFormSubmit}
            />
          )}
        </main>
      </div>
    </div>
  )
}