"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import { API_BASE_URL } from "../../../Utils/ChatBaseUrl";
import { useToast } from "../../../ChatInterface/Hooks/use-toast";

export function ApiKeyForm({ onApiKeySaved }) {
  const { showToast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpRefs = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Handler to update OTP digit and auto-focus next field
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    const otpString = otp.join("");
    try {
      if (!apiKey.startsWith("sk-")) {
        throw new Error("Invalid API Key format. It should start with 'sk-'");
      }
      if (otpString.length !== 6) {
        throw new Error("Please enter a 6-digit OTP.");
      }
      const response = await axios.post(`${API_BASE_URL}/global-openai-key/save-key`, { apiKey, otp: otpString });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Your API key has been saved.",
      });
      if (onApiKeySaved) onApiKeySaved(apiKey);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || error.message || "There was an error saving your API key.",
      });
      setErrorMessage(error.response?.data?.error || error.message || "There was an error saving your API key.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h5 className="text-xl font-bold mb-4">API Key Required</h5>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Please enter your API key and the OTP to save the global API key.
      </p>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter the API key. It must start with "sk-".
          </p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Enter OTP:</label>
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                ref={(el) => (otpRefs.current[index] = el)}
                className="w-12 h-12 text-center border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !apiKey.startsWith("sk-") || otp.join("").length !== 6}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save API Key"}
        </button>
      </form>
    </div>
  );
}

export default ApiKeyForm;
