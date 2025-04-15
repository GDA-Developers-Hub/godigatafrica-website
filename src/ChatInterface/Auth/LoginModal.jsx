import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl"; 

const LoginModal = ({ onClose, onForgotPassword }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login success:", response.data);
      const { authToken, resetToken } = response.data;

      localStorage.setItem("userId", authToken);
      localStorage.setItem("resetToken", resetToken);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        confirmButtonText: "OK",
      });

      onClose();
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.error || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-200">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              required
            />
            <label className="absolute left-10 top-0 px-1 text-sm text-gray-300 transform -translate-y-1/2 pointer-events-none transition-all duration-300
                         peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:text-sm dark:bg-gray-800"
              >
                Email
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              required
            />
            <label className="absolute left-10 top-0 px-1 text-sm text-gray-300 transform -translate-y-1/2 pointer-events-none transition-all duration-300
                         peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:text-sm dark:bg-gray-800"
              >
              Password
            </label>
            <button type="button" className="absolute right-2 top-2" onClick={togglePassword}>
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm">
            Forgot password?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={onForgotPassword}>
              Reset here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
