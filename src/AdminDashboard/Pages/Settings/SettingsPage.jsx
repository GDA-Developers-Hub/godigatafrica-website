// SettingsPage.jsx
"use client"

import { useState, useEffect } from "react"
import ProfileSettings from "./ProfileSettings"
import CompanyInfoSettings from "./CompanyInfoSettings"
import PartnersSettings from "./PartnersSettings"
import ApiKeyForm from "./ApiKeyForm"
import Tabs from "./Tabs"
import {BASE_URL} from "../../../Utils/BaseUrl"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [admin, setAdmin] = useState(null)
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get adminToken from localStorage
    const adminToken = localStorage.getItem("adminToken")

    // Fetch admin data
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/profile`, {
          headers: {
            Authorization: adminToken ? `Bearer ${adminToken}` : "",
          },
        })
        const data = await response.json()
        setAdmin(data)
      } catch (error) {
        console.error("Error fetching admin data:", error)
      }
    }

    // Fetch partners
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${BASE_URL}/partners/`, {
          headers: {
            Authorization: adminToken ? `Bearer ${adminToken}` : "",
          },
        })
        const data = await response.json()
        setPartners(data)
      } catch (error) {
        console.error("Error fetching partners:", error)
      }
    }

    Promise.all([fetchAdminData(), fetchPartners()]).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-xl">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Tabs Navigation */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render selected tab */}
      <div className="mt-6">
        {activeTab === "profile" && <ProfileSettings admin={admin} setAdmin={setAdmin} />}
        {activeTab === "company" && <CompanyInfoSettings />}
        {activeTab === "locations" && <LocationsSettings />}
        {activeTab === "partners" && <PartnersSettings partners={partners} setPartners={setPartners} />}
        {activeTab === "api" && <ApiKeyForm />}
      </div>
    </div>
  )
}

