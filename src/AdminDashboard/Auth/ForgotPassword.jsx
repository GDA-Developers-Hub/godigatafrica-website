"use client"

import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../Utils/BaseUrl"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Simple toast notification function
const toast = ({ title, description, variant }) => {
  alert(`${title}: ${description}`)
}

export const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post(`${BASE_URL}/password-reset/`, { email })
      toast({
        title: "Password Reset",
        description: "If an account exists with this email, a reset link will be sent.",
        variant: "default",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to process password reset request.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-xl shadow-md overflow-hidden dark:bg-slate-800">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-4 px-6">
        <h2 className="text-xl font-bold text-white">Request Password Reset</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <Link to="/admin/login" className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  // Use useParams to get uidb64 and token from the URL
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await axios.post(`${BASE_URL}/password-reset-confirm/${uidb64}/${token}/`, {
        password,
        confirm_password: confirmPassword,
      })

      toast({
        title: "Password Reset",
        description: "Your password has been successfully reset.",
        variant: "default",
      })

      // Redirect to login page after successful reset
      navigate("/admin/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to reset password. The link may be invalid or expired.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-xl shadow-md overflow-hidden dark:bg-slate-800">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 py-4 px-6">
        <h2 className="text-xl font-bold text-white">Reset Your Password</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              required
              minLength="8"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />

            {/* Password strength indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex h-1 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`transition-all duration-300 ${
                      passwordStrength === 0
                        ? "bg-red-500 w-1/4"
                        : passwordStrength === 1
                          ? "bg-orange-500 w-2/4"
                          : passwordStrength === 2
                            ? "bg-yellow-500 w-3/4"
                            : "bg-green-500 w-full"
                    }`}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                  {passwordStrength === 0 && "Very weak - Use at least 8 characters"}
                  {passwordStrength === 1 && "Weak - Add uppercase letters"}
                  {passwordStrength === 2 && "Medium - Add numbers"}
                  {passwordStrength === 3 && "Strong - Add special characters"}
                  {passwordStrength === 4 && "Very strong password"}
                </p>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength="8"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />

            {/* Password match indicator */}
            {password && confirmPassword && (
              <p
                className={`text-xs mt-1 ${password === confirmPassword ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || password !== confirmPassword || !password}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              isLoading || password !== confirmPassword || !password
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?
            <a
              href="/contact-us"
              className="ml-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword