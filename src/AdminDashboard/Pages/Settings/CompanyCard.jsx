"use client"

export default function CompanyCard({ company, isSelected, onClick }) {
  return (
    <div
      className={`bg-slate-700 p-4 rounded-lg cursor-pointer transition-all ${
        isSelected ? "border-2 border-blue-500" : "border border-gray-700"
      }`}
      onClick={() => onClick(company)}
    >
      <h3 className="text-lg font-medium mb-2">{company.name || "Company"}</h3>
      <p className="text-gray-300 mb-1">
        <span className="text-gray-400">Email:</span> {company.email}
      </p>
      <p className="text-gray-300 mb-1">
        <span className="text-gray-400">Phone:</span> {company.phone_number}
      </p>
      {company.office_location && (
        <p className="text-gray-300">
          <span className="text-gray-400">Location:</span> {company.office_location}
        </p>
      )}
    </div>
  )
}

