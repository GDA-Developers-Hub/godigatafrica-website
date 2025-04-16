"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"

import { BASE_URL } from "../../../Utils/BaseUrl"

export default function OrganizationalChartV3() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [departments, setDepartments] = useState([])
  const [countryCEOs, setCountryCEOs] = useState([])
  const [leadership, setLeadership] = useState([])
  const [employeesByCountryAndDept, setEmployeesByCountryAndDept] = useState({})
  const [activeDepartmentByCountry, setActiveDepartmentByCountry] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Department list - could be fetched from API in the future
  const departmentList = [
    "Executive",
    "Sales",
    "Human Resources",
    "Engineering",
    "Marketing",
    "Finance",
    "Operations",
    "Customer Support",
    "Software Development",
    "Data Science",
    "Blockchain",
    "Cybersecurity",
    "UI/UX Design",
    "DevOps",
    "Graphic Design",
    "SEO & Marketing",
  ]

  useEffect(() => {
    fetchTeamData()
  }, [])

  const fetchTeamData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await axios.get(`${BASE_URL}/team/`)
      const teamData = response.data.team
      
      processTeamData(teamData)
    } catch (err) {
      console.error("Failed to fetch team data:", err)
      setError("Failed to load organization data. Please try again.")
      
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Error',
      //   text: 'Failed to load organization chart data',
      // })
    } finally {
      setIsLoading(false)
    }
  }

  const processTeamData = (teamData) => {
    // Handle case where departments don't have leadership
    let leadershipTeam = []
    let leadershipDept = teamData.find((dept) => dept.department === "Leadership")
    
    // If no Leadership department exists, create a virtual one by filtering from other departments
    if (!leadershipDept) {
      // Find any leadership roles across all departments
      const leadershipRoles = ['Founder', 'Co-Founder', 'CEO', 'Country CEO']
      
      leadershipTeam = teamData.flatMap(dept => 
        dept.members.filter(member => 
          leadershipRoles.includes(member.role)
        ).map(member => ({
          ...member,
          department: member.department || dept.department
        }))
      )
    } else {
      leadershipTeam = leadershipDept.members || []
    }

    // Sort leadership by role importance
    const sortedLeadership = [...leadershipTeam]
      .filter((leader) => leader.role === "Founder" || leader.role === "Co-Founder" || leader.role === "CEO")
      .sort((a, b) => {
        // Custom sorting order for leadership roles
        const roleOrder = {
          "Founder": 1,
          "Co-Founder": 2,
          "CEO": 3
        }
        return (roleOrder[a.role] || 999) - (roleOrder[b.role] || 999)
      })

    setLeadership(sortedLeadership)

    // Get country CEOs from any department
    const ceos = teamData
      .flatMap((dept) => dept.members)
      .filter((member) => member.role === "Country CEO")
      .map((ceo) => ({ 
        ...ceo, 
        department: ceo.department || "Leadership" 
      }))
      .sort((a, b) => a.country?.localeCompare(b.country || ""))

    setCountryCEOs(ceos)

    // Extract actual departments from the data, including Unassigned
    const actualDepartments = teamData
      .map(dept => dept.department)
      .filter(dept => dept !== "Leadership" && dept !== null)
    
    // Use actual departments if available, otherwise fall back to the predefined list
    const deptList = actualDepartments.length > 0 ? actualDepartments : departmentList
    
    setDepartments(deptList)

    // Group employees by country and department
    const employeeMap = {}

    // Get unique countries from all members
    const countries = [...new Set(
      teamData.flatMap(dept => 
        dept.members.map(member => member.country)
      ).filter(Boolean)
    )]

    // Initialize the structure for all countries and departments
    countries.forEach((country) => {
      if (country) {
        employeeMap[country] = {}
        deptList.forEach((dept) => {
          employeeMap[country][dept] = []
        })
      }
    })

    // Add "Global" for employees not tied to a specific country
    employeeMap["Global"] = {}
    deptList.forEach((dept) => {
      employeeMap["Global"][dept] = []
    })

    // Populate with employees from all departments
    teamData.forEach((department) => {
      if (department.department !== "Leadership") {
        department.members.forEach((member) => {
          if (
            member.role !== "Founder" &&
            member.role !== "Co-Founder" &&
            member.role !== "CEO" &&
            member.role !== "Country CEO"
          ) {
            // Use member country or default to Global
            const country = member.country || "Global"
            // Use member department or department.department
            const memberDept = member.department || department.department
            
            // Ensure the country exists in our map
            if (!employeeMap[country]) {
              employeeMap[country] = {}
              deptList.forEach((dept) => {
                employeeMap[country][dept] = []
              })
            }
            
            // Ensure the department exists for this country
            if (!employeeMap[country][memberDept]) {
              employeeMap[country][memberDept] = []
            }
            
            if (employeeMap[country] && employeeMap[country][memberDept]) {
              employeeMap[country][memberDept].push({
                ...member,
                department: memberDept,
              })
            } else if (employeeMap["Global"] && employeeMap["Global"][memberDept]) {
              // Fallback to Global if country not found
              employeeMap["Global"][memberDept].push({
                ...member,
                department: memberDept,
              })
            }
          }
        })
      }
    })

    // Handle members with null department (Unassigned)
    const unassignedDept = teamData.find(dept => dept.department === "Unassigned")
    if (unassignedDept && unassignedDept.members) {
      unassignedDept.members.forEach(member => {
        if (
          member.role !== "Founder" &&
          member.role !== "Co-Founder" &&
          member.role !== "CEO" &&
          member.role !== "Country CEO"
        ) {
          const country = member.country || "Global"
          
          // Ensure country exists
          if (!employeeMap[country]) {
            employeeMap[country] = {}
            deptList.forEach((dept) => {
              employeeMap[country][dept] = []
            })
          }
          
          // Assign to Operations department for display purposes
          const targetDept = deptList.includes("Operations") ? "Operations" : deptList[0]
          
          if (employeeMap[country] && employeeMap[country][targetDept]) {
            employeeMap[country][targetDept].push({
              ...member,
              department: targetDept,
            })
          }
        }
      })
    }

    // Sort employees in each department by role name alphabetically
    Object.keys(employeeMap).forEach((country) => {
      Object.keys(employeeMap[country]).forEach((dept) => {
        employeeMap[country][dept].sort((a, b) => a.role?.localeCompare(b.role || ""))
      })
    })

    setEmployeesByCountryAndDept(employeeMap)

    // Set default active department for each country
    const defaultDepts = {}
    countries.forEach((country) => {
      // Find the first department that has employees for this country
      const firstDeptWithEmployees = deptList.find(
        (dept) =>
          employeeMap[country] && employeeMap[country][dept] && employeeMap[country][dept].length > 0,
      )

      defaultDepts[country] = firstDeptWithEmployees || deptList[0]
    })

    setActiveDepartmentByCountry(defaultDepts)
  }

  const openEmployeeModal = (employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
  }

  const setCountryDepartment = (country, department) => {
    setActiveDepartmentByCountry((prev) => ({
      ...prev,
      [country]: department,
    }))
  }

  const getCountryDepartments = (country) => {
    // Get departments that have employees for this country
    if (employeesByCountryAndDept[country]) {
      return departments.filter(dept => 
        employeesByCountryAndDept[country][dept] && 
        employeesByCountryAndDept[country][dept].length > 0
      )
    }
    return departments
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4 text-4xl">Loading Organization Chart</div>
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
              onClick={fetchTeamData}
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
    <div className="min-h-screen bg-slate-900 pb-20 text-white">
      <header className="border-b border-slate-700 bg-slate-800 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold uppercase tracking-wider md:text-4xl">GO DIGITAL AFRICA</h1>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Leadership Section */}
        <section className="mx-auto mb-16 mt-12 max-w-3xl text-center">
          <div className="flex flex-wrap justify-center gap-16">
            {leadership.map((leader) => (
              <div key={leader.id} className="flex flex-col items-center">
                <div
                  className="group cursor-pointer"
                  onClick={() => openEmployeeModal({ ...leader, department: "Leadership" })}
                >
                  <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-slate-700 transition-all group-hover:border-slate-500">
                    <img
                      src={leader.image || `/placeholder.svg?height=160&width=160`}
                      alt={leader.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-bold uppercase tracking-wider">{leader.name}</h3>
                  <p className="text-lg font-medium text-slate-300">{leader.role}</p>
                </div>
                <div className="mt-2 flex space-x-2">
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {leader.twitter && (
                    <a
                      href={leader.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Country Sections */}
        {countryCEOs.length > 0 && (
          <>
            <div className="mb-8 flex items-center justify-center">
              <div className="h-px w-1/4 bg-slate-700"></div>
              <div className="mx-4 rounded-lg bg-slate-800 px-8 py-3 text-xl font-bold uppercase tracking-wider">
                Country Teams
              </div>
              <div className="h-px w-1/4 bg-slate-700"></div>
            </div>

            {countryCEOs.map((ceo) => {
              const countryDepartments = getCountryDepartments(ceo.country)
              const activeDepartment = activeDepartmentByCountry[ceo.country] || countryDepartments[0] || ""
              const employees = employeesByCountryAndDept[ceo.country]?.[activeDepartment] || []

              return (
                <section key={ceo.id} className="mb-16 rounded-lg border border-slate-700 bg-slate-800 p-6">
                  <h2 className="mb-6 text-center text-2xl font-bold">{ceo.country} Team</h2>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Left Column - Country CEO */}
                    <div className="lg:col-span-1">
                      <div className="flex flex-col items-center rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
                        <div
                          className="group cursor-pointer"
                          onClick={() => openEmployeeModal({ ...ceo, department: "Leadership" })}
                        >
                          <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-slate-700 transition-all group-hover:border-slate-500">
                            <img
                              src={ceo.image || `/placeholder.svg?height=128&width=128`}
                              alt={ceo.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h3 className="mt-4 text-xl font-bold">{ceo.name}</h3>
                          <p className="text-slate-300">{ceo.role}</p>
                          <p className="text-sm text-slate-400">Leadership</p>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">{ceo.description}</p>
                        <div className="mt-4 flex space-x-3">
                          {ceo.linkedin && (
                            <a
                              href={ceo.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          )}
                          {ceo.twitter && (
                            <a
                              href={ceo.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Department + Employees */}
                    <div className="lg:col-span-3">
                      {/* Department Tabs */}
                      <div className="mb-4 border-b border-slate-700">
                        <div className="flex flex-wrap">
                          {countryDepartments.map((dept) => (
                            <button
                              key={dept}
                              className={`mr-2 px-4 py-2 text-sm font-medium ${
                                activeDepartment === dept
                                  ? "border-b-2 border-blue-500 text-blue-500"
                                  : "text-slate-400 hover:text-white"
                              }`}
                              onClick={() => setCountryDepartment(ceo.country, dept)}
                            >
                              {dept}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Employee Grid */}
                      {employees.length === 0 ? (
                        <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 text-center">
                          <p className="text-slate-400">No employees in this department yet.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                          {employees.map((employee) => (
                            <div
                              key={employee.id}
                              className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 p-4 transition-all hover:border-slate-600"
                              onClick={() => openEmployeeModal(employee)}
                            >
                              <div className="flex items-center">
                                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-slate-700">
                                  <img
                                    src={employee.image || `/placeholder.svg?height=56&width=56`}
                                    alt={employee.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-3">
                                  <h4 className="font-medium">{employee.name}</h4>
                                  <p className="text-sm text-slate-300">{employee.role}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )
            })}
          </>
        )}

        {/* Employee Detail Modal */}
        {isModalOpen && selectedEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border border-slate-700 bg-slate-800 p-6">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="aspect-square overflow-hidden rounded-lg border border-slate-700 bg-slate-700">
                    <img
                      src={selectedEmployee.image || `/placeholder.svg?height=300&width=300`}
                      alt={selectedEmployee.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-4 flex justify-center space-x-4">
                    {selectedEmployee.linkedin && (
                      <a
                        href={selectedEmployee.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-slate-700 p-2 text-slate-300 hover:bg-slate-600 hover:text-white"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {selectedEmployee.twitter && (
                      <a
                        href={selectedEmployee.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-slate-700 p-2 text-slate-300 hover:bg-slate-600 hover:text-white"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                  <p className="text-slate-300">
                    {selectedEmployee.role} • {selectedEmployee.department}
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">About</h3>
                      <p className="mt-1 text-slate-300">
                        {selectedEmployee.description || "No description available."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Details</h3>
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="text-sm text-slate-400">Role</div>
                        <div className="text-sm">{selectedEmployee.role}</div>

                        <div className="text-sm text-slate-400">Department</div>
                        <div className="text-sm">{selectedEmployee.department}</div>

                        <div className="text-sm text-slate-400">Country</div>
                        <div className="text-sm">{selectedEmployee.country}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

