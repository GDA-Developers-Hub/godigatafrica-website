"use client";

import React, { useState } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";

export default function AdminNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("adminRefreshToken");
      const adminToken = localStorage.getItem("adminToken");

      if (refreshToken && adminToken) {
        await axios.post(
          `${BASE_URL}/admin/logout/`,
          { refresh: refreshToken },
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );
      }

      // Clear local storage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      localStorage.removeItem("adminRefreshToken");

      Swal.fire("Success", "You have been logged out", "success");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire("Error", "Logout failed. Please try again", "error");
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 px-5 py-2 h-[70px] border-b border-gray-700">
      <span className="text-base font-bold text-cyan-400">
        Welcome, {localStorage.getItem("adminUsername")}
      </span>
      <div className="flex items-center gap-4">
        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-full text-cyan-400 hover:bg-gray-800 transition"
          >
            <User className="h-5 w-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50 flex flex-col">
              <div className="px-4 py-2 text-sm font-semibold text-white">
                My Account
              </div>
              <div className="border-t border-gray-700"></div>

              <Link
                to="/admin/settings"
                className="px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                Profile
              </Link>

              <Link
                to="/admin/settings"
                className="px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                Settings
              </Link>

              <div className="border-t border-gray-700"></div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
