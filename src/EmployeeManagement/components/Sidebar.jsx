"use client"

import React from "react"

export default function Sidebar({ activeTab, setActiveTab, handleAddEmployee }) {
  return (
    <div className="hidden h-[calc(100vh-80px)] flex-col border-r border-slate-700 bg-slate-800 md:flex">
      <div className="flex h-14 items-center border-b border-slate-700 px-4">
        <h2 className="text-lg font-semibold text-white">Employee Management</h2>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <div className="px-4 py-2">
          <h3 className="mb-2 text-sm font-medium text-slate-300">Navigation</h3>
          <div className="space-y-1">
            <button
              className={`flex w-full items-center rounded-md px-3 py-2 text-left text-white transition-colors ${
                activeTab === "dashboard"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Dashboard
            </button>
            <button
              className={`flex w-full items-center rounded-md px-3 py-2 text-left text-white transition-colors ${
                activeTab === "employees"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setActiveTab("employees")}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Employees
            </button>
          </div>
        </div>
        
        {/* Only show Add Employee section when employees tab is active */}
        {activeTab === "employees" && (
          <div className="px-4 py-2">
            <h3 className="mb-2 text-sm font-medium text-slate-300">Add Employee</h3>
            <div className="space-y-1">
              <button
                className="flex w-full items-center rounded-md border border-slate-700 bg-gray-700 px-3 py-2 text-left text-white transition-colors hover:bg-gray-600"
                onClick={() => handleAddEmployee("founder")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 19h19L12 3z" />
                </svg>
                Add Founder
              </button>
              <button
                className="flex w-full items-center rounded-md border border-slate-700 bg-gray-700 px-3 py-2 text-left text-white transition-colors hover:bg-gray-600"
                onClick={() => handleAddEmployee("cofounder")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Add Co-founder
              </button>
              <button
                className="flex w-full items-center rounded-md border border-slate-700 bg-gray-700 px-3 py-2 text-left text-white transition-colors hover:bg-gray-600"
                onClick={() => handleAddEmployee("countryCeo")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
                Add Country CEO
              </button>
              <button
                className="flex w-full items-center rounded-md border border-slate-700 bg-gray-700 px-3 py-2 text-left text-white transition-colors hover:bg-gray-600"
                onClick={() => handleAddEmployee("employee")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                Add Employee
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}