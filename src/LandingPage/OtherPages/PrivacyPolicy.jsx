"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-2">Privacy Policy</h1>
            <p className="text-xl text-gray-600 mb-10">for Go Digital Africa</p>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What information do we collect?</h2>
                <p className="text-lg text-gray-700">
                  When you interact with us, we may collect your name, email address, phone number, and other relevant details.
                  We also collect information about your interactions with our website, including IP address, browser type, and pages visited.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How do we collect information?</h2>
                <p className="text-lg text-gray-700 mb-4">We may collect information when you:</p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Contact us regarding our services</li>
                  <li>Create an account on our website</li>
                  <li>Sign up for newsletters</li>
                  <li>Participate in surveys</li>
                  <li>Use our website (via cookies and analytics)</li>
                  <li>Apply for a job or partnership</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How we use your information</h2>
                <p className="text-lg text-gray-700 mb-4">Your data is used to:</p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you effectively</li>
                  <li>Enhance website experience</li>
                  <li>Ensure compliance with regulations</li>
                  <li>Prevent fraud and security threats</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Confidentiality</h2>
                <p className="text-lg text-gray-700">
                  We do not share your personal data with third-party sites. Our security measures ensure a high level of data protection.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your rights</h2>
                <p className="text-lg text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request data correction</li>
                  <li>Request deletion of data</li>
                  <li>Object to data processing</li>
                  <li>Withdraw consent for marketing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Making a complaint</h2>
                <p className="text-lg text-gray-700">
                  If you have concerns, email us at{" "}
                  <a href="mailto:info@godigitalafrica.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                    info@godigitalafrica.com
                  </a>. We aim to resolve issues within 15 working days.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to this policy</h2>
                <p className="text-lg text-gray-700">
                  We update our privacy policy periodically. Check our website for the latest version.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact us</h2>
                <p className="text-lg text-gray-700">For privacy concerns, reach out to:</p>
                <div className="mt-4 text-lg text-gray-700">
                  <p>Go Digital Africa</p>
                  <p>Email:{" "}
                    <a href="mailto:info@godigitalafrica.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                      info@godigitalafrica.com
                    </a>
                  </p>
                  <p>Phone: +254 720 222 249</p>
                  <p>Address: Highridge Westlands, Nairobi, Kenya</p>
                </div>
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
