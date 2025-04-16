"use client"

import { useState, useEffect } from "react"
import { Linkedin, Twitter, X } from "lucide-react"
import { fetchTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from "../services/api"
// import { ROLE_RANK } from "../utils/employeeData"
import EmployeeDirectory from "../components/EmployeeDirectory"

export default function TeamPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [teamData, setTeamData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [formType, setFormType] = useState(null)

  useEffect(() => {
    loadTeamData()
  }, [])

  const loadTeamData = async () => {
    try {
      setIsLoading(true)
      const data = await fetchTeamMembers()
      setTeamData(data)
    } catch (error) {
      console.error("Failed to load team data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to open the employee detail modal
  const openEmployeeModal = (employee, department) => {
    setSelectedEmployee({ ...employee, department })
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (formData) => {
    try {
      await createTeamMember(formData)
      await loadTeamData() // Refresh the team data
      setOpenDialog(false) // Close the form dialog
    } catch (error) {
      console.error("Failed to submit form:", error)
    }
  }

  // Get leadership team (CEO, Founder, Co-Founder)
  const leadershipTeam = teamData.find((dept) => dept.department === "Leadership")?.members || []

  // Sort leadership by role rank
  const sortedLeadership = [...leadershipTeam].sort((a, b) => (ROLE_RANK[a.role] || 999) - (ROLE_RANK[b.role] || 999))

  // Get country CEOs
  const countryCEOs = teamData
    .flatMap((dept) => dept.members)
    .filter((member) => member.role === "Country CEO")
    .sort((a, b) => a.country.localeCompare(b.country))

  // Group other employees by country
  const employeesByCountry = {}

  teamData.forEach((department) => {
    department.members.forEach((member) => {
      // Skip leadership and country CEOs as they're handled separately
      if (
        member.role === "Founder" ||
        member.role === "Co-Founder" ||
        member.role === "CEO" ||
        member.role === "Country CEO"
      ) {
        return
      }

      if (!employeesByCountry[member.country]) {
        employeesByCountry[member.country] = []
      }

      employeesByCountry[member.country].push({
        ...member,
        department: department.department,
      })
    })
  })

  // Sort countries alphabetically
  const sortedCountries = Object.keys(employeesByCountry).sort()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center text-white">
          <div className="mb-4 text-4xl">Loading...</div>
          <p className="text-slate-400">Please wait while we fetch the team data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700 bg-slate-800 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold md:text-4xl">Our Team</h1>
          <p className="mt-2 text-center text-slate-300">
            Meet the talented individuals who make our company exceptional
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => {
                setFormType("founder")
                setOpenDialog(true)
              }}
              className="rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
            >
              Add Founder
            </button>
            <button
              onClick={() => {
                setFormType("cofounder")
                setOpenDialog(true)
              }}
              className="rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
            >
              Add Co-founder
            </button>
            <button
              onClick={() => {
                setFormType("countryCeo")
                setOpenDialog(true)
              }}
              className="rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
            >
              Add Country CEO
            </button>
            <button
              onClick={() => {
                setFormType("employee")
                setOpenDialog(true)
              }}
              className="rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
            >
              Add Employee
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Leadership Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">Leadership</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedLeadership.map((leader) => (
              <div key={leader.id} className="col-span-1 flex justify-center lg:col-span-1">
                <EmployeeCard
                  employee={leader}
                  department="Leadership"
                  onClick={() => openEmployeeModal(leader, "Leadership")}
                  isLeadership
                />
              </div>
            ))}
          </div>
        </section>

        {/* Country CEOs Section */}
        {countryCEOs.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold">Country Leadership</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {countryCEOs.map((ceo) => (
                <EmployeeCard
                  key={ceo.id}
                  employee={ceo}
                  department="Leadership"
                  onClick={() => openEmployeeModal(ceo, "Leadership")}
                />
              ))}
            </div>
          </section>
        )}

        {/* Teams by Country */}
        {sortedCountries.map((country) => (
          <section key={country} className="mb-16">
            <div className="mb-8 flex items-center">
              <div className="h-px flex-1 bg-slate-700"></div>
              <h2 className="mx-4 text-xl font-bold">{country} Team</h2>
              <div className="h-px flex-1 bg-slate-700"></div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {employeesByCountry[country]
                .sort((a, b) => (ROLE_RANK[a.role] || 999) - (ROLE_RANK[b.role] || 999))
                .map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    department={employee.department}
                    onClick={() => openEmployeeModal(employee, employee.department)}
                  />
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* Employee Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-[600px] rounded-lg bg-slate-800 p-6 text-white">
            {selectedEmployee && (
              <>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-white">{selectedEmployee.name}</h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-slate-300">
                    {selectedEmployee.role} • {selectedEmployee.department}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <div className="aspect-square overflow-hidden rounded-lg bg-slate-700">
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
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {selectedEmployee.twitter && (
                        <a
                          href={selectedEmployee.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-slate-700 p-2 text-slate-300 hover:bg-slate-600 hover:text-white"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="mb-4 space-y-2">
                      <h3 className="text-lg font-medium text-white">About</h3>
                      <p className="text-slate-300">{selectedEmployee.description || "No description available."}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white">Details</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-slate-300">Role</div>
                        <div className="text-sm font-medium text-white">{selectedEmployee.role}</div>

                        <div className="text-sm text-slate-300">Department</div>
                        <div className="text-sm font-medium text-white">{selectedEmployee.department}</div>

                        <div className="text-sm text-slate-300">Country</div>
                        <div className="text-sm font-medium text-white">{selectedEmployee.country}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Employee Form Dialog */}
      <EmployeeDirectory
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        formType={formType}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  )
}

function EmployeeCard({ employee, department, onClick, isLeadership = false }) {
  return (
    <div
      className={`group w-full cursor-pointer overflow-hidden rounded-lg border border-slate-700 bg-slate-800 transition-all hover:border-slate-600 hover:shadow-lg ${
        isLeadership ? "max-w-sm" : "max-w-xs"
      }`}
      onClick={onClick}
    >
      <div className={`relative ${isLeadership ? "aspect-[4/3]" : "aspect-square"} w-full bg-slate-700`}>
        <img
          src={`/placeholder.svg?height=300&width=300`}
          alt={employee.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">{employee.name}</h3>
          <p className="text-sm text-slate-300">{employee.role}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-white">{department}</span>
          <div className="flex space-x-2">
            {employee.linkedin && (
              <a
                href={employee.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {employee.twitter && (
              <a
                href={employee.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-300">
          {employee.description || "No description available."}
        </p>
      </div>
    </div>
  )
}

