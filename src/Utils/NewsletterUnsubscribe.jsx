"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "./BaseUrl";
import { AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";

export default function NewsletterUnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [resubscribing, setResubscribing] = useState(false);
  // Destructure the searchParams from the returned array
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get email from URL parameters if available
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
        Swal.fire("Oops!", "Please enter your email address", "warning");
        return;
    }

    setLoading(true);

    try {
        const response = await axios.post(`${BASE_URL}/unsubscribe/${encodeURIComponent(email)}/`);

        if (response.data.success) {
            setUnsubscribed(true);
            Swal.fire({
                title: "Unsubscribed",
                text: "You've been successfully unsubscribed and removed from our records",
                icon: "success",
                confirmButtonColor: "#6366f1",
            });
        } else {
            Swal.fire("Error!", response.data.message || "Unsubscribe failed!", "error");
        }
    } catch (error) {
        console.error("Unsubscribe Error:", error);
        Swal.fire("Error!", "Something went wrong. Please try again later.", "error");
    } finally {
        setLoading(false);
    }
};

  

  const handleResubscribe = async () => {
    setResubscribing(true);

    try {
      const response = await axios.post(`${BASE_URL}/subscribe/`, { email });

      if (response.data.message) {
        Swal.fire({
          title: "Welcome Back!",
          text: "You've successfully resubscribed to our newsletter!",
          icon: "success",
          confirmButtonColor: "#6366f1",
        });
        setUnsubscribed(false);
      } else {
        Swal.fire("Error!", response.data.message || "Resubscription failed!", "error");
      }
    } catch (error) {
      console.error("Resubscription Error:", error);
      Swal.fire("Error!", "Something went wrong. Please try again later.", "error");
    } finally {
      setResubscribing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
      >
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 mb-6 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>

        {unsubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              You've Been Unsubscribed
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mt-3 mb-6">
              We're sorry to see you go! If you'd like to share why you're unsubscribing, it would help us improve our
              newsletter.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-6">
              <h5 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Missing out on exclusive content?
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Our newsletter includes industry insights, special offers, and early access to new services that aren't
                shared anywhere else.
              </p>
              <button
                onClick={handleResubscribe}
                disabled={resubscribing}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                {resubscribing ? "Resubscribing..." : "Resubscribe Now"}
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              If you change your mind, you can always subscribe again later.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 mb-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Unsubscribe from Newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                We're sorry to see you go. Please confirm your email address below.
              </p>
            </div>

            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#25D366] text-sm font-medium text-black bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {loading ? "Processing..." : "Unsubscribe"}
                </button>
              </div>

              {/* <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Before you go...</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Would you prefer to receive our newsletter less frequently instead? We also offer content
                  customization options to better match your interests.
                </p>
                <Link
                  to="/newsletter"
                  className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 inline-block hover:underline"
                >
                  Adjust my preferences instead
                </Link>
              </div> */}
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
