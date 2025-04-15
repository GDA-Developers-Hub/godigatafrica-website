"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import logo from "../../Assets/logo.png";
import { useAgentAuth } from "../Contexts/AgentAuthContext";

const AgentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use the context's login method and agent state
  const { login, agent, isAuthenticated } = useAgentAuth();

  const { email, password } = formData;

  // Check if already logged in on page load/refresh
  useEffect(() => {
    console.log("AgentLogin: Checking authentication status:", isAuthenticated);
    console.log("AgentLogin: Agent state:", agent);
    
    if (isAuthenticated) {
      console.log("AgentLogin: Already authenticated, redirecting to dashboard");
      navigate("/agent");
    }
  }, [isAuthenticated, navigate, agent]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("AgentLogin: Submitting login form");
    console.log("AgentLogin: Email:", email);
    console.log("AgentLogin: Password length:", password?.length || 0);
    
    setError("");
    setLoading(true);

    // Call the login function from AgentAuthContext
    console.log("AgentLogin: Calling login function from context");
    const result = await login(email, password);
    console.log("AgentLogin: Login result:", result);

    if (result.success) {
      // Add a small delay before redirecting to prevent navigation throttling
      console.log("AgentLogin: Login successful, waiting briefly before redirecting");
      setTimeout(() => {
        console.log("AgentLogin: Now redirecting to dashboard");
        navigate("/agent");
      }, 1000); // 1000ms delay (1 second)
    } else {
      console.log("AgentLogin: Login failed:", result.error);
      setError(result.error || "Login failed. Please check your credentials.");
    }
    
    setLoading(false);
  };

  // Debug
  console.log("AgentLogin: Component mounting");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Agent Login
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Sign in to access your support dashboard
          </p>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="space-y-4">
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
                    autocomplete="email"
                  />
                </div>
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
                    required
                    autocomplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white rounded-lg py-2.5 px-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
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
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign in as Agent
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
            >
              Back to main site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;
