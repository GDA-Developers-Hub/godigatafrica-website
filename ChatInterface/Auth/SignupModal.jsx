import React, { useState } from "react";
import { X, Mail, ArrowBigRightDash  } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl";
import Swal from "sweetalert2";
 
const SignupModal = ({ onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
      const handleSignupWithEmail = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Passwords do not match!",
          });
          return;
        }
        setIsSubmitting(true);
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/signup`, formData, {
            headers: { "Content-Type": "application/json" },
          });
          console.log("Signup success:", response.data);
          
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Account created successfully!",
            confirmButtonText: "OK",
          }).then(() => {
            if (onSwitchToLogin) {
              onSwitchToLogin();
            } else {
              onClose();
            }
          });
        } catch (error) {
          console.error("Signup error:", error);
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: error.response?.data?.error || "Something went wrong. Please try again.",
          });
        } finally {
          setIsSubmitting(false);
        }
      };
      
      const handleSignupWithGoogle = async () => {
        // Redirect to the backend endpoint for Google OAuth
        window.location.href = `${API_BASE_URL}/auth/google`;
      };
    

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-200">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-100 relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4 flex items-center">
          Email Signup <Mail className="size-9 ml-2.5"/>
        </h2>
        <div className="space-y-4">
          <button
            onClick={handleSignupWithGoogle}
            className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded"
          >
            <ArrowBigRightDash  className="w-5 h-5 mr-2" />
            Sign Up with Google
          </button>
          <div className="flex items-center justify-center text-gray-500">or</div>
          <form onSubmit={handleSignupWithEmail} className="space-y-4 ">
            {/* Username */}
            <div className="relative mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                required
              />
              <label className="absolute left-10 top-0 px-1 text-sm text-gray-300 transform -translate-y-1/2 pointer-events-none transition-all duration-300
                         peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:text-sm dark:bg-gray-800"
              >
                Username
              </label>
            </div>
            {/* Email */}
            <div className="relative mb-4">
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
            {/* Password */}
            <div className="relative mb-4">
              <input
                type="password"
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
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                required
              />
              <label className="absolute left-10 top-0 px-1 text-sm text-gray-300 transform -translate-y-1/2 pointer-events-none transition-all duration-300
                         peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:text-sm dark:bg-gray-800"
              >
                Confirm Password
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
