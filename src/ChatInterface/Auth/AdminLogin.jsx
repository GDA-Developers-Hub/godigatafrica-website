import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl";
import { LogIn, ShieldAlert, Mail, Lock } from "lucide-react";
import logo from "../../Assets/logo.png";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  // Check if admin is already logged in
  useEffect(() => {
    const token = localStorage.getItem("chatAdminToken");
    if (token) {
      navigate("/admin/agent");
    }
  }, [navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Sending login request with:", { email, password });
      // Make API request to login
      const response = await axios.post(`${API_BASE_URL}/admin-auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        // Store tokens in localStorage
        localStorage.setItem("chatAdminToken", response.data.chatAdminToken);
        localStorage.setItem("chatAdminRefreshToken", response.data.chatAdminRefreshToken);
        
        // Store admin info
        const adminInfo = {
          id: response.data.admin.id,
          username: response.data.admin.username,
          email: response.data.admin.email,
          role: response.data.admin.role
        };
        
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        
        // Show success toast
        Swal.fire({
          title: 'Login Successful',
          text: 'Welcome to the Admin Dashboard',
          icon: 'success',
          background: '#1f2937',
          color: '#fff',
          timer: 1500,
          showConfirmButton: false
        });
        
        // Redirect to agent dashboard
        navigate("/admin/agent");
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed. Please check your credentials.");
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
          
          <h2 className="text-2xl font-bold text-center text-white mb-2 flex items-center justify-center">
            <ShieldAlert className="mr-2 h-6 w-6 text-blue-500" />
           Agent Admin Dashboard
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Sign in to manage agents and configurations
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
                    placeholder="admin@example.com"
                    required
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
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg py-2.5 px-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
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
                    Sign in as Admin
                  </div>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 