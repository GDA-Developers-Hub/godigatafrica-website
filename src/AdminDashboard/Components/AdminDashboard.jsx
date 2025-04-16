import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-grow-0">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <AdminNavbar />

        <div className="flex-1 w-full h-[calc(100vh-70px)] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
