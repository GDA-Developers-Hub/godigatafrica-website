"use client";

import React, { useState } from "react";
import { User } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 px-5 py-2 h-[70px] border-b border-gray-700">
      <span className="text-base font-bold text-cyan-400">Welcome, {localStorage.getItem("adminUsername")}</span>
      <div className="flex items-center gap-4">
        {/* <ThemeToggleButton /> */}

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-full text-cyan-400 hover:bg-gray-800 transition"
          >
            <User className="h-5 w-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 overflow-hidden z-50">
              <div className="px-4 py-2 text-sm font-semibold text-white">My Account</div>
              <div className="border-t border-gray-700 flex-column" ></div>
              <Link to="/admin/settings" className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                Profile
              </Link>

              <Link to="/admin/settings" className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                Settings
              </Link>
              <div className="border-t border-gray-700"></div>
              <Link className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700">
                Log out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
