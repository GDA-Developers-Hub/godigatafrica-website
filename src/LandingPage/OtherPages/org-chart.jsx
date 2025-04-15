"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import spinner from "../../assets/spinner/1600x1200-spinner-sm.gif"
import { BASE_URL } from "../../Utils/BaseUrl"

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
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load organization chart data',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const processTeamData = (teamData) => {
    // Leadership roles in order of importance
    const leadershipRoles = ['Founder', 'Co-Founder', 'CEO']
    const countryLeaderRoles = ['CEO', 'CTO']
    
    // Process all members across departments
    const allMembers = teamData.flatMap(dept => 
      dept.members.map(member => ({
        ...member,
        department: member.department || dept.department
      }))
    )
    
    // Extract global leadership team (non-country specific)
    const globalLeadership = allMembers.filter(member => 
      leadershipRoles.includes(member.role) && 
      (!member.country || member.country === "Global")
    )
    
    // Sort leadership by role importance
    const roleOrder = {
      "Founder": 1,
      "Co-Founder": 2,
      "CEO": 3
    }
    
    const sortedLeadership = [...globalLeadership].sort((a, b) => 
      (roleOrder[a.role] || 999) - (roleOrder[b.role] || 999)
    )
    
    setLeadership(sortedLeadership)
    
    // Extract country leaders
    const countryLeaders = allMembers
      .filter(member => 
        countryLeaderRoles.includes(member.role) && 
        member.country && 
        member.country !== "Global"
      )
      .sort((a, b) => {
        // First show Kenya at the top
        if (a.country === "Kenya") return -1;
        if (b.country === "Kenya") return 1;
        
        // Then sort other countries alphabetically
        const countryCompare = a.country?.localeCompare(b.country || "")
        if (countryCompare !== 0) return countryCompare
        
        // Then by role (Country CEO first, then CTO)
        return a.role === "CEO" ? -1 : 1
      })
    
    // Filter to only include one leader per country (prioritize Country CEO)
    const uniqueCountryLeaders = []
    const countriesWithLeaders = new Set()
    
    countryLeaders.forEach(leader => {
      if (!countriesWithLeaders.has(leader.country)) {
        uniqueCountryLeaders.push(leader)
        countriesWithLeaders.add(leader.country)
      }
    })
    
    setCountryCEOs(uniqueCountryLeaders)
    
    // Extract actual departments from the data, excluding Leadership
    const actualDepartments = [...new Set(
      teamData
        .map(dept => dept.department)
        .filter(dept => dept !== "Executive" && dept !== null)
    )]
    
    setDepartments(actualDepartments)
    
    // Get unique countries from all members
    const countries = [...new Set(
      allMembers
        .map(member => member.country)
        .filter(country => country && country !== "Global")
    )]
    
    // Initialize the structure for all countries and departments
    const employeeMap = {}
    
    countries.forEach((country) => {
      employeeMap[country] = {}
      actualDepartments.forEach((dept) => {
        employeeMap[country][dept] = []
      })
    })
    
    // Add "Global" for employees not tied to a specific country
    employeeMap["Global"] = {}
    actualDepartments.forEach((dept) => {
      employeeMap["Global"][dept] = []
    })
    
    // Populate with regular employees (non-leadership roles)
    allMembers.forEach((member) => {
      if (
        !leadershipRoles.includes(member.role) && 
        !countryLeaderRoles.includes(member.role)
      ) {
        const country = member.country || "Global"
        const memberDept = member.department
        
        // Skip if department not in our list
        if (!actualDepartments.includes(memberDept)) return
        
        // Ensure the country exists in our map
        if (!employeeMap[country]) {
          employeeMap[country] = {}
          actualDepartments.forEach((dept) => {
            employeeMap[country][dept] = []
          })
        }
        
        // Add employee to the appropriate department
        if (employeeMap[country][memberDept]) {
          employeeMap[country][memberDept].push({
            ...member,
            department: memberDept,
          })
        }
      }
    })
    
    // Sort employees in each department by role name
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
      const firstDeptWithEmployees = actualDepartments.find(
        (dept) =>
          employeeMap[country] && 
          employeeMap[country][dept] && 
          employeeMap[country][dept].length > 0
      )
      
      defaultDepts[country] = firstDeptWithEmployees || (actualDepartments.length > 0 ? actualDepartments[0] : "")
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background:'var(--background-light)',
      }}>
        <img src={spinner} alt="spinner" className="h-100 w-160 sm:h-50 sm:w-80" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--light-bg)] p-6">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center text-[var(--text-primary)]">
            <div className="mb-4 text-4xl font-bold">Error</div>
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchTeamData}
              className="mt-4 rounded-md bg-[var(--background)]/80 px-4 py-2 text-white hover:bg-[var(--background)]/80"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background-light)] pb-20 text-[var(--text-primary)]">
      <header className="border-b border-slate-300 bg-[var(--background)]/70 py-8">
        <div className="container mx-auto px-4 py-20">
          <h3 className="text-center text-2xl font-bold uppercase tracking-wider text-white md:text-4xl">GO DIGITAL AFRICA TEAM</h3>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Leadership Section */}
        <section className="mx-auto mb-12 mt-12 max-w-3xl text-center bg-[var(--background)]/80 p-6 rounded-2xl">
          <div className="flex flex-wrap justify-center gap-16">
            {leadership.map((leader) => (
              <div key={leader.id} className="flex flex-col items-center">
                <div
                  className="group cursor-pointer"
                  onClick={() => openEmployeeModal({ ...leader, department: "Leadership" })}
                >
                  <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-[var(--card-background)] transition-all group-hover:border-white">
                    <img
                      src={leader.image || `/api/placeholder/160/160`}
                      alt={leader.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-bold uppercase tracking-wider text-white">{leader.name}</h3>
                  <p className="text-lg font-bold text-white">{leader.role}</p>
                </div>
                <div className="mt-2 flex space-x-2">
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-primary)] hover:text-white"
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
                      className="text-[var(--text-primary)] hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Country CEOs Grid Section */}
        {/* {countryCEOs.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-center justify-center">
              <div className="h-px w-1/4 bg-slate-300"></div>
              <div className="mx-4 rounded-lg bg-[var(--background)] px-8 py-3 text-xl font-bold uppercase tracking-wider text-white">
                Country CEOs
              </div>
              <div className="h-px w-1/4 bg-slate-300"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {countryCEOs.map((ceo) => (
                <div key={ceo.id} className="flex flex-col items-center bg-[var(--card-background)] rounded-lg p-3 text-center">
                  <div 
                    className="cursor-pointer"
                    onClick={() => openEmployeeModal({ ...ceo, department: "Leadership" })}
                  >
                    <div className="h-24 w-24 mx-auto overflow-hidden rounded-full border-2 border-[var(--background)]">
                      <img
                        src={ceo.image || `/api/placeholder/96/96`}
                        alt={ceo.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-3 text-base font-bold text-white">{ceo.name}</h3>
                    <p className="text-sm text-white">{ceo.country} CEO</p>
                  </div>
                  <div className="mt-2 flex justify-center space-x-2">
                    {ceo.linkedin && (
                      <a
                        href={ceo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-primary)] hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {ceo.twitter && (
                      <a
                        href={ceo.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-primary)] hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )} */}

        {/* Country Teams Section */}
        {countryCEOs.length > 0 && (
          <>
            <div className="mb-8 flex items-center justify-center">
              <div className="h-px w-1/4 bg-slate-300"></div>
              <div className="mx-4 rounded-lg bg-[var(--background)] px-8 py-3 text-xl font-bold uppercase tracking-wider text-white">
                Country Teams
              </div>
              <div className="h-px w-1/4 bg-slate-300"></div>
            </div>

            {countryCEOs.map((ceo) => {
              const countryDepartments = getCountryDepartments(ceo.country)
              const activeDepartment = activeDepartmentByCountry[ceo.country] || countryDepartments[0] || ""
              const employees = employeesByCountryAndDept[ceo.country]?.[activeDepartment] || []

              return (
                <section key={ceo.id} className="mb-16 rounded-lg border border-slate-300 bg-[var(--card-background)] p-6">
                  <h2 className="mb-6 text-center text-2xl font-bold text-white">{ceo.country} Team</h2>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Left Column - Country CEO */}
                    <div className="lg:col-span-1">
                      <div className="flex flex-col items-center rounded-lg border border-slate-300 bg-[var(--background-light)] p-4 text-center">
                        <div
                          className="group cursor-pointer"
                          onClick={() => openEmployeeModal({ ...ceo, department: "Leadership" })}
                        >
                          <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-[var(--background)] transition-all group-hover:border-[var(--background)]/80">
                            <img
                              src={ceo.image || `/api/placeholder/128/128`}
                              alt={ceo.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)]">{ceo.name}</h3>
                          <p className="font-bold text-[var(--text-primary)]">{ceo.role}</p>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          {ceo.linkedin && (
                            <a
                              href={ceo.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--text-primary)] hover:text-blue-300"
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
                              className="text-[var(--text-primary)]  hover:text-blue-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Department + Employees */}
                    <div className="lg:col-span-3">
                      {/* Department Tabs */}
                      <div className="mb-4 border-b border-white">
                        <div className="flex flex-wrap">
                          {countryDepartments.map((dept) => (
                            <button
                              key={dept}
                              className={`mr-2 px-4 py-2 text-sm font-medium ${
                                activeDepartment === dept
                                  ? "border-b-2 border-white text-white font-bold"
                                  : "text-[var(--text-primary)] hover:text-white"
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
                        <div className="rounded-lg border border-slate-300 bg-[var(--background-light)] p-6 text-center">
                          <p className="text-[var(--text-primary)]">No employees in this department yet.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                          {employees.map((employee) => (
                            <div
                              key={employee.id}
                              className="cursor-pointer rounded-lg border border-slate-300 bg-[var(--background-light)] p-4 transition-all hover:border-[var(--background)]"
                              onClick={() => openEmployeeModal(employee)}
                            >
                              <div className=" items-center">
                                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-[var(--background)]">
                                  <img
                                    src={employee.image || `/api/placeholder/56/56`}
                                    alt={employee.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-3">
                                  <h4 className="font-bold text-[var(--text-primary)]">{employee.name}</h4>
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
            <div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border border-slate-300 bg-[var(--background-light)] p-6">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-full p-1 text-[var(--text-primary)] hover:bg-[var(--background)] hover:text-white"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="aspect-square overflow-hidden rounded-lg border border-slate-300 bg-[var(--light-bg)]">
                    <img
                      src={selectedEmployee.image || `/api/placeholder/300/300`}
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
                        className="rounded-full bg-[var(--light-bg)] p-2 text-[var(--text-primary)] hover:bg-[var(--background)] hover:text-white"
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
                        className="rounded-full bg-[var(--light-bg)] p-2 text-[var(--text-primary)] hover:bg-[var(--background)] hover:text-white"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">{selectedEmployee.name}</h2>
                  <p className="text-[var(--background)]">
                    <span className="font-bold">{selectedEmployee.role}</span> • {selectedEmployee.department}
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-[var(--text-primary)]">About</h3>
                      <p className="mt-1 text-[var(--text-primary)]">
                        {selectedEmployee.description || "No description available."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-[var(--text-primary)]">Details</h3>
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="text-sm text-[var(--background)]">Role</div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">{selectedEmployee.role}</div>

                        <div className="text-sm text-[var(--background)]">Department</div>
                        <div className="text-sm text-[var(--text-primary)]">{selectedEmployee.department}</div>

                        <div className="text-sm text-[var(--background)]">Country</div>
                        <div className="text-sm text-[var(--text-primary)]">{selectedEmployee.country}</div>
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