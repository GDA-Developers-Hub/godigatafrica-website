"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[var(--background)] to-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          {/* <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link> */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-2">Terms & Conditions</h1>
            <p className="text-xl text-gray-600 mb-10">for Go Digital Africa</p>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who we are</h2>
                <p className="text-lg text-gray-700">
                  Our website address is: <a href="https://godigitalafrica.com" className="text-blue-600 hover:text-blue-800">godigitalafrica.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">User Responsibilities</h2>
                <p className="text-lg text-gray-700">
                  By using this site, you agree not to misuse our services, including engaging in fraudulent activities, spamming, or violating intellectual property rights.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookies</h2>
                <p className="text-lg text-gray-700">
                  We use cookies to enhance your browsing experience. By using our site, you consent to our cookie policy.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Embedded Content</h2>
                <p className="text-lg text-gray-700">
                  Articles on this site may include embedded content (e.g., videos, images, articles). Embedded content behaves as if the visitor has visited the other website.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Sharing</h2>
                <p className="text-lg text-gray-700">
                  If you request a password reset, your IP address will be included in the reset email.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Retention</h2>
                <p className="text-lg text-gray-700">
                  If you leave a comment, it and its metadata are retained indefinitely to recognize follow-up comments automatically.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>
                <p className="text-lg text-gray-700">
                  You can request an exported file of your personal data. You can also request deletion of any data we hold about you.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <p className="text-lg text-gray-700">
                  For any concerns, email us at{" "}
                  <a href="mailto:info@godigitalafrica.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                    info@godigitalafrica.com
                  </a>.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500">Last updated: March 22, 2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
