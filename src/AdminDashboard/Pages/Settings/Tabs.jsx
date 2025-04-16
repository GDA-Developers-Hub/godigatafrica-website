
// Tabs.jsx
import React from "react";

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "company", label: "Company Info" },
    { id: "partners", label: "Partners" },
    { id: "api", label: "API Key" },
  ];

  return (
    <div className="flex flex-wrap border-b border-gray-700 text-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center gap-2 px-6 py-3 w-full sm:w-auto ${
            activeTab === tab.id ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
