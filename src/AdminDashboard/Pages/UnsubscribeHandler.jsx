"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function UnsubscribeHandler() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email and token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    const token = urlParams.get("token");
    
    if (!emailParam || !token) {
      setError("Invalid unsubscribe link. Missing required parameters.");
      setLoading(false);
      return;
    }

    setEmail(emailParam);
    
    // Process unsubscribe request
    const unsubscribeUser = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/unsubscribe/`, {
          email: emailParam,
          token: token
        });
        
        if (response.data.success) {
          setSuccess(true);
        } else {
          setError(response.data.message || "Failed to unsubscribe. Please try again later.");
        }
      } catch (error) {
        console.error("Unsubscribe error:", error);
        setError("An error occurred while processing your request. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    unsubscribeUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center">
          {loading ? (
            <div>
              <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Processing your request...</p>
            </div>
          ) : success ? (
            <div>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold text-gray-800 mt-4">Successfully Unsubscribed</h1>
              <p className="mt-2 text-gray-600">
                {email} has been removed from our mailing list. You will no longer receive newsletters from us.
              </p>
              <div className="mt-6">
                <a 
                  href="/" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Return to Home
                </a>
              </div>
            </div>
          ) : (
            <div>
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h1 className="text-2xl font-bold text-gray-800 mt-4">Unsubscribe Failed</h1>
              <p className="mt-2 text-gray-600">{error}</p>
              <div className="mt-6">
                <a 
                  href="/" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Return to Home
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 