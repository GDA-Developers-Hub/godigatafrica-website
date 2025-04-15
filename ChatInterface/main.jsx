import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Agent from "./App/Agent.jsx";
import AgentLogin from "./App/AgentLogin.jsx";
import AgentRegister from "./App/AgentRegister.jsx";
import AgentDashboard from "./App/AgentDashboard.jsx";
import AdminLogin from "./App/AdminLogin.jsx";
import AgentRoute from "./Components/AgentRoute.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";
import { AgentAuthProvider } from "./Auth/AgentAuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AgentAuthProvider>
        <Routes>
          {/* Main application routes */}
          <Route path="/" element={<App />} />
          <Route path="/chat" element={<App />} />
          
          {/* Agent routes */}
          <Route path="/agent" element={
            <AgentRoute>
              <Agent />
            </AgentRoute>
          } />
          <Route path="/agent-login" element={<AgentLogin />} />
          <Route path="/agent-register" element={<AgentRegister />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/agents" element={
            <AdminRoute>
              <AgentDashboard />
            </AdminRoute>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AgentAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
); 