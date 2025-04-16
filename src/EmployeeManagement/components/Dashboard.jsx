import React from "react"

export default function Dashboard({ teamData }) {
  // Calculate metrics
  const totalEmployees = teamData.reduce((total, dept) => total + dept.members.length, 0)
  const totalDepartments = teamData.length
  const totalCountries = new Set(teamData.flatMap((dept) => dept.members.map((member) => member.country))).size
  const leadershipCount = teamData.find((dept) => dept.department === "Leadership")?.members.length || 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white">
        <div className="pb-2">
          <h3 className="text-sm font-medium text-slate-300">Total Employees</h3>
        </div>
        <div className="pt-2">
          <div className="text-2xl font-bold">{totalEmployees}</div>
        </div>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white">
        <div className="pb-2">
          <h3 className="text-sm font-medium text-slate-300">Leadership</h3>
        </div>
        <div className="pt-2">
          <div className="text-2xl font-bold">{leadershipCount}</div>
        </div>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white">
        <div className="pb-2">
          <h3 className="text-sm font-medium text-slate-300">Departments</h3>
        </div>
        <div className="pt-2">
          <div className="text-2xl font-bold">{totalDepartments}</div>
        </div>
      </div>
      <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white">
        <div className="pb-2">
          <h3 className="text-sm font-medium text-slate-300">Countries</h3>
        </div>
        <div className="pt-2">
          <div className="text-2xl font-bold">{totalCountries}</div>
        </div>
      </div>

      {/* Department breakdown */}
      <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-white md:col-span-2 lg:col-span-4">
        <div className="pb-4">
          <h3 className="text-lg font-semibold">Department Breakdown</h3>
        </div>
        <div className="pt-2">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamData.map((department) => (
              <div key={department.department} className="rounded-lg border border-slate-600 bg-slate-700 p-4 text-white">
                <div className="pb-2">
                  <h4 className="text-sm font-medium">{department.department}</h4>
                </div>
                <div className="pt-2">
                  <div className="text-2xl font-bold">{department.members.length}</div>
                  <div className="text-xs text-slate-300">
                    {department.members.map((member) => member.name).join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

