"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import Dashboard from "../components/Dashboard"
import { fetchTeamMembers } from "../services/api"

export default function DashboardPage() {
  const [teamData, setTeamData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Stats
  const [stats, setStats] = useState({
    totalEmployees: 0,
    departmentsCount: 0,
    countriesCount: 0,
    leadershipCount: 0,
    employeesByDepartment: {},
    employeesByCountry: {},
    roleDistribution: {},
  })

  useEffect(() => {
    loadTeamData()
  }, [])

  useEffect(() => {
    if (teamData.length > 0) {
      calculateStats(teamData)
    }
  }, [teamData])

  const loadTeamData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const data = await fetchTeamMembers()
      if (data && data.length > 0) {
        setTeamData(data)
      } else {
        console.warn("Empty team data received");
        setTeamData([])
      }
    } catch (error) {
      console.error("Failed to load team data:", error)
      setError("Unable to connect to the server. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (data) => {
    // Total employees
    const totalEmployees = data.reduce((total, dept) => total + dept.members.length, 0)
    
    // Department count
    const departmentsCount = data.length
    
    // Unique countries count
    const countriesSet = new Set(data.flatMap((dept) => dept.members.map((member) => member.country)))
    const countriesCount = countriesSet.size
    
    // Leadership team count
    const leadershipCount = data.find((dept) => dept.department === "Leadership")?.members.length || 0
    
    // Employees by department breakdown
    const employeesByDepartment = data.reduce((acc, dept) => {
      acc[dept.department] = dept.members.length
      return acc
    }, {})
    
    // Employees by country breakdown
    const employeesByCountry = {}
    data.forEach((dept) => {
      dept.members.forEach((member) => {
        employeesByCountry[member.country] = (employeesByCountry[member.country] || 0) + 1
      })
    })
    
    // Role distribution
    const roleDistribution = {}
    data.forEach((dept) => {
      dept.members.forEach((member) => {
        roleDistribution[member.role] = (roleDistribution[member.role] || 0) + 1
      })
    })
    
    // Update stats
    setStats({
      totalEmployees,
      departmentsCount,
      countriesCount,
      leadershipCount,
      employeesByDepartment,
      employeesByCountry,
      roleDistribution,
    })
  }

  if (isLoading) {
    return (
      <div className=" bg-slate-900 p-6">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4 text-4xl">Loading Dashboard</div>
            <p className="text-slate-400">Please wait while we fetch the team data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4 text-4xl">Error</div>
            <p className="text-red-400">{error}</p>
            <button 
              onClick={loadTeamData}
              className="mt-4 rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative  h-[calc(100vh-80px)]  overflow-auto pb-20">
      <header className="mb-8 sticky top-0 bg-slate-900 z-10 py-2">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Team Dashboard</h1>
        <p className="mt-2 text-slate-400">Overview and statistics of your team structure</p>
      </header>

      <div className="space-y-8">
        {/* Main stats */}
        <Dashboard teamData={teamData} />
        
        {/* Additional stats */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Country distribution */}
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white h-[400px] overflow-y-auto">
            <h3 className="mb-4 text-lg font-medium sticky top-0 bg-slate-800 py-2">Employees by Country</h3>
            <div className="space-y-2">
              {Object.entries(stats.employeesByCountry)
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between">
                    <span>{country}</span>
                    <div className="flex items-center">
                      <div className="mr-2 h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                      <span>{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Role distribution */}
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white h-[400px] overflow-y-auto">
            <h3 className="mb-4 text-lg font-medium sticky top-0 bg-slate-800 py-2">Role Distribution</h3>
            <div className="space-y-2">
              {Object.entries(stats.roleDistribution)
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between">
                    <span>{role}</span>
                    <div className="flex items-center">
                      <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                      <span>{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Department details */}
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white max-h-[500px] overflow-y-auto">
          <h3 className="mb-4 text-lg font-medium sticky top-0 bg-slate-800 py-2">Department Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="sticky top-12 bg-slate-800">
                <tr className="border-b border-slate-700">
                  <th className="py-2 text-left">Department</th>
                  <th className="py-2 text-left">Employees</th>
                  <th className="py-2 text-left">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.employeesByDepartment)
                  .sort(([, countA], [, countB]) => countB - countA)
                  .map(([department, count]) => (
                    <tr key={department} className="border-b border-slate-700">
                      <td className="py-2">{department}</td>
                      <td className="py-2">{count}</td>
                      <td className="py-2">
                        {((count / stats.totalEmployees) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 