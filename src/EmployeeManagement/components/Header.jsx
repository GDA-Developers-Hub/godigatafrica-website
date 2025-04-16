"use client"

import React from "react"

export default function Header({ searchQuery, setSearchQuery, activeTab, setActiveTab, handleAddEmployee }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-slate-700 bg-slate-800 px-6">
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search employees..."
              className="w-full appearance-none rounded-md border border-slate-600 bg-slate-700 px-3 py-2 pl-8 text-white placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 md:w-2/3 lg:w-1/3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-white hover:bg-slate-700"
        >
          <svg
            className="h-4 w-4"
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
        </button>
        <button
          onClick={() => setActiveTab("employees")}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-white hover:bg-slate-700"
        >
          <svg
            className="h-4 w-4"
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
        </button>
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-700 text-white hover:bg-slate-600 md:hidden"
        onClick={() => handleAddEmployee("employee")}
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </header>
  )
}

