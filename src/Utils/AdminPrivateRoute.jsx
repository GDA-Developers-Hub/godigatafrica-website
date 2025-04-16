import React, { useEffect, useState, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "./BaseUrl";

const AdminPrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const isRefreshing = useRef(false); // Prevent multiple refresh requests

  useEffect(() => {
    const checkToken = async () => {
      console.log("🔍 Checking authentication tokens...");

      const accessToken = localStorage.getItem("adminToken");
      const refreshToken = localStorage.getItem("adminRefreshToken");
      const currentTime = Date.now() / 1000;

      if (!accessToken && !refreshToken) {
        console.log("❌ No tokens found! Redirecting to login...");
        setIsAuthenticated(false);
        return;
      }

      if (accessToken) {
        try {
          console.log("🔑 Found Access Token! Decoding...");
          const decodedToken = jwtDecode(accessToken);
          if (decodedToken.exp > currentTime) {
            console.log("✅ Access Token is valid! User is authenticated.");
            setIsAuthenticated(true);
            return;
          } else {
            console.log("⚠️ Access Token is expired! Removing...");
            localStorage.removeItem("adminToken");
          }
        } catch (error) {
          console.log("❌ Invalid Access Token! Removing...");
          localStorage.removeItem("adminToken");
        }
      }

      if (refreshToken) {
        try {
          console.log("🔄 Found Refresh Token! Decoding...");
          const decodedRefresh = jwtDecode(refreshToken);
          if (decodedRefresh.exp < currentTime) {
            console.log("⚠️ Refresh Token is expired! Removing and redirecting...");
            localStorage.removeItem("adminRefreshToken");
            await showSessionExpiredAlert();
            setIsAuthenticated(false);
            return;
          }
        } catch (error) {
          console.log("❌ Error decoding Refresh Token. Will attempt to use it anyway...");
        }

        if (isRefreshing.current) {
          console.log("⏳ Refresh process already in progress. Skipping duplicate request...");
          return;
        }

        isRefreshing.current = true; // Prevent multiple refresh calls

        try {
          console.log("🔄 Requesting new Access Token from server...");
          const response = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          if (response.data?.access) {
            console.log("✅ Successfully refreshed Access Token!");
            localStorage.setItem("adminToken", response.data.access);
            if (response.data.refresh) {
              console.log("🔄 Updating Refresh Token...");
              localStorage.setItem("adminRefreshToken", response.data.refresh);
            }
            setIsAuthenticated(true);
          } else {
            throw new Error("Invalid refresh response");
          }
        } catch (error) {
          if (error.response?.status === 401) {
            console.log("❌ Server rejected Refresh Token (401)! Removing and redirecting...");
            localStorage.removeItem("adminRefreshToken");
            await showSessionExpiredAlert();
          } else {
            console.log("⚠️ Failed to refresh token, but not removing refresh token.");
          }
          setIsAuthenticated(false);
        } finally {
          isRefreshing.current = false; // Reset after request completes
        }
      } else {
        console.log("❌ No Refresh Token available! Redirecting...");
        setIsAuthenticated(false);
      }
    };

    const showSessionExpiredAlert = async () => {
      console.log("⚠️ Showing session expired alert...");
      await Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
      });
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>
        <div className="flex bg-gray-900 h-[calc(100vh-4rem)] justify-center p-6 items-center">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 rounded-full w-12 animate-spin">
          
        </div>
      </div>
    </div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/amin/login" state={{ from: location }} replace />;
};

export default AdminPrivateRoute;
