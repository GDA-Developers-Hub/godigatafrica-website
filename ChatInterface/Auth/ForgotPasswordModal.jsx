import React, { useState } from "react";
import { X } from "lucide-react";
import { API_BASE_URL } from "../../Utils/ChatBaseUrl"; 
import Swal from "sweetalert2";
import axios from "axios";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Password reset email sent:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password reset email sent.",
        confirmButtonText: "OK",
      });
      onClose();
    } catch (error) {
      console.error("Reset error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
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
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              required
            />
            <label className="absolute left-10 top-0 px-1 text-sm text-gray-300 transform -translate-y-1/2 pointer-events-none transition-all duration-300
                         peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:text-sm dark:bg-gray-800"
              >
                Email
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
