"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../Utils/apiClient";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl";
import { UserPlus, Mail, Lock, User, ArrowRight, Briefcase, Activity } from "lucide-react";
import logo from "../../Assets/logo.png";

const AgentRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agentName: "",
    status: "offline"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { fullName, email, password, confirmPassword, agentName, status } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending registration data:", { 
        fullName, 
        email, 
        password, 
        agentName, 
        status 
      });
      
      const response = await apiClient.post(`/agent-auth/register`, {
        fullName,
        email,
        password,
        agentName,
        status
      });

      if (response.data.success) {
        setSuccess(true);
        setError("");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/agent-login");
        }, 2000);
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Agent Registration
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Create an account to start providing support
          </p>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg mb-4">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={onChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Agent Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="agentName">
                  Agent Display Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    id="agentName"
                    type="text"
                    name="agentName"
                    value={agentName}
                    onChange={onChange}
                    placeholder="Your support agent name"
                    required
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">This name will be visible to customers</p>
              </div>

              {/* Agent Status */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="status">
                  Initial Status
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Activity className="h-5 w-5 text-gray-500" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    id="status"
                    name="status"
                    value={status}
                    onChange={onChange}
                    required
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
                <p className="text-gray-500 text-xs mt-1">Your initial availability when logging in</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="••••••••"
                    minLength="6"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    placeholder="••••••••"
                    minLength="6"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white rounded-lg py-2.5 px-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Register as Agent
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already registered?{" "}
              <Link
                to="/agent-login"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Login <ArrowRight className="inline h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegister; 