"use client"

import { useState, useEffect } from "react"
import CompanyCard from "./CompanyCard"
import { ChevronDown, ChevronUp } from "lucide-react"
import {BASE_URL} from "../../../Utils/BaseUrl"


export default function CompanySelector({ selectedCompany, onCompanySelect }) {
  const [companies, setCompanies] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Get adminToken from localStorage
        const adminToken = localStorage.getItem("adminToken")

        const response = await fetch(`${BASE_URL}/companies/`, {
          headers: {
            Authorization: adminToken ? `Bearer ${adminToken}` : "",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setCompanies(data)

          // If no company is selected and we have companies, select the first one
          if (!selectedCompany && data.length > 0) {
            onCompanySelect(data[0])
          }
        } else {
          console.error("Failed to fetch companies")
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [selectedCompany, onCompanySelect])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCompanySelect = (company) => {
    onCompanySelect(company)
    setIsOpen(false)
  }

  if (loading) {
    return <div className="text-gray-400">Loading companies...</div>
  }

  if (companies.length === 0) {
    return <div className="text-gray-400">No companies found</div>
  }

  return (
    <div className="relative mb-6">
      <div className="mb-2 font-medium text-white">Select Company</div>

      <div
        className="flex items-center justify-between bg-slate-700 p-3 rounded-lg cursor-pointer border border-gray-600"
        onClick={toggleDropdown}
      >
        <div>
          {selectedCompany ? (
            <span>{selectedCompany.name}</span>
          ) : (
            <span className="text-gray-400">Select a company</span>
          )}
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-slate-800 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2 grid gap-2">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                isSelected={selectedCompany?.id === company.id}
                onClick={handleCompanySelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

