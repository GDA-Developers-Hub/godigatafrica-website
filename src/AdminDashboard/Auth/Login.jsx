import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "axios"
import Swal from "sweetalert2"
import { BASE_URL } from "../../Utils/BaseUrl"

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/login/`, formData);
      
      // Assuming the token is returned in response.data.token
      localStorage.setItem("adminToken", response.data.access);
      localStorage.setItem("adminRefreshToken", response.data.refresh);
      localStorage.setItem("adminRole", response.data.role);
      localStorage.setItem("adminUsername", response.data.username);
      
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back, Admin!",
        timer: 2000,
        showConfirmButton: false,
      });
      
      navigate("/admin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
      });
    }
  };
  

  return (
    <div className="flex bg-gray-900 justify-center items-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-center text-white font-bold mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="relative">
            <FaUser className="text-gray-400 absolute left-3 top-4" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-gray-700 border border-gray-600 p-3 rounded-md text-white w-full focus:border-blue-500 focus:outline-none pl-10"
              placeholder="Username"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="text-gray-400 absolute left-3 top-4" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-gray-700 border border-gray-600 p-3 rounded-md text-white w-full focus:border-blue-500 focus:outline-none pl-10 pr-10"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-4 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 rounded-md text-white w-full font-semibold hover:bg-blue-600 py-3 transition"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link to="/admin/forgot-password" className="text-blue-400 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login