"use client"
import { motion } from "framer-motion"
import { Building, BarChart, Globe, Users, Shield, Smartphone, Code, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import img2 from "../../../assets/coprate.jpg"
import img3 from "../../../assets/cop1.jpg"
import img4 from "../../../assets/firebase.jpeg"
import img5 from "../../../assets/react.jpg"
import img6 from "../../../assets/next.jpg"
import img7 from "../../../assets/spring boot.jpeg"
import img8 from "../../../assets/node.jpeg"
import img9 from "../../../assets/django.jpeg"
import { ServiceSEO } from "../../../SEO";


const CorporateWebDev = () => {
  return (
    <div className="w-full bg-gradient-to-tr from-[var(--background)] via-[var(--background-light)] to-[var(--background)] py-10">
      <ServiceSEO service="corporateWebsite" />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">Corporate Website Development</h1>
            <p className="text-lg text-[var(--text-primary)] font-medium mb-8">
              Go Digital Africa creates professional, high-performance corporate websites that establish your brand's
              digital presence and drive business growth across the African continent and beyond.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-lg">
                <img
                  src={img2}
                  alt="Corporate website on multiple devices"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 rounded bg-[var(--background-light)]">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4"
          >
            Why Your Business Needs a Professional Corporate Website
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[var(--text-color)] max-w-3xl mx-auto"
          >
            In today's digital-first business environment, your corporate website serves as the foundation of your
            online presence and a critical business asset.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">Establish Credibility</h3>
            <p className="text-[var(--text-color)]">
              A professional website builds trust with potential clients and partners, showcasing your company's
              legitimacy and expertise.
            </p>
          </motion.div>

          {/* Benefit 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Globe className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">Global Reach</h3>
            <p className="text-[var(--text-color)]">
              Expand your business beyond geographical boundaries, reaching potential clients across Africa and
              internationally.
            </p>
          </motion.div>

          {/* Benefit 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <BarChart className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">Lead Generation</h3>
            <p className="text-[var(--text-color)]">
              Convert website visitors into qualified leads with strategic calls-to-action and optimized user journeys.
            </p>
          </motion.div>

          {/* Benefit 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">Brand Storytelling</h3>
            <p className="text-[var(--text-color)]">
              Communicate your company's mission, values, and unique selling propositions effectively to your target
              audience.
            </p>
          </motion.div>

          {/* Benefit 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">Mobile Accessibility</h3>
            <p className="text-[var(--text-color)]">
              Reach the growing number of mobile users across Africa with responsive websites optimized for all devices.
            </p>
          </motion.div>

          {/* Benefit 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-7 w-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">Competitive Advantage</h3>
            <p className="text-[var(--text-color)]">
              Stand out from competitors with a modern, feature-rich website that showcases your industry leadership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="container mx-auto px-4 py-16 bg-[var(--background-light)]">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4"
          >
            The Go Digital Africa Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[var(--text-color)] max-w-3xl mx-auto"
          >
            We combine strategic thinking, creative design, and technical expertise to deliver corporate websites that
            drive real business results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={img3}
              alt="Go Digital Africa team working on website design"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-[var(--text-color)] mb-6">What Sets Us Apart</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--text-color)]">African Market Expertise</h4>
                  <p className="text-[var(--text-color)]">
                    We understand the unique challenges and opportunities of doing business in Africa's diverse markets.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--text-color)]">Business-First Approach</h4>
                  <p className="text-[var(--text-color)]">
                    We focus on your business objectives and design websites that help achieve your specific goals.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--text-color)]">Performance Optimization</h4>
                  <p className="text-[var(--text-color)]">
                    We build fast-loading websites optimized for varying internet speeds across the continent.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--text-color)]">Future-Proof Technology</h4>
                  <p className="text-[var(--text-color)]">
                    We use scalable, modern technologies that grow with your business and adapt to changing needs.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Website Types Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4"
          >
            Corporate Website Solutions We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[var(--text-color)] max-w-3xl mx-auto"
          >
            We develop tailored corporate websites for businesses of all sizes across various industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Type 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative grou"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Corporate Branding Websites</h3>
              <p className="text-white mb-4">
                Showcase your company's brand identity, values, and corporate information with a professional website
                that builds trust and credibility.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Company profile and history</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Leadership team profiles</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Corporate social responsibility</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Type 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">B2B Service Websites</h3>
              <p className="text-white mb-4">
                Present your professional services with detailed information that helps potential clients understand
                your expertise and value proposition.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Service descriptions and benefits</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Case studies and success stories</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Client testimonials and reviews</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Type 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Investor Relations Websites</h3>
              <p className="text-white mb-4">
                Provide transparent financial information and corporate governance details for shareholders, investors,
                and financial analysts.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Financial reports and presentations</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Corporate governance information</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Shareholder resources and FAQs</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Type 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Corporate Intranets & Portals</h3>
              <p className="text-white mb-4">
                Develop internal communication platforms and employee portals that streamline information sharing and
                collaboration.
              </p>
              <ul className="space-y-2">
                <li className="flex items-cente text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Secure employee access</span>
                </li>
                <li className="flex items-cente text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Document management systems</span>
                </li>
                <li className="flex items-cente text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Internal communication tools</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Type 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lead Generation Websites</h3>
              <p className="text-white mb-4">
                Create conversion-focused websites designed to capture leads and drive business inquiries through
                strategic CTAs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Optimized contact forms</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Lead magnet integration</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>CRM system integration</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Type 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-slate-800 p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Multi-lingual Corporate Sites</h3>
              <p className="text-white mb-4">
                Reach diverse audiences across Africa and globally with websites that support multiple languages and
                cultural considerations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Language selection interface</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Culturally adapted content</span>
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Region-specific information</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="container mx-auto px-4 py-16 bg-[var(--background-light)]/80 rounded-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            Our Corporate Website Development Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto"
          >
            We follow a structured, collaborative approach to ensure your corporate website meets your business
            objectives and exceeds expectations.
          </motion.p>
        </div>

        <div className="relative">
          {/* Process Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

          <div className="space-y-12 relative">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-3">Discovery & Strategy</h3>
                <p className="text-[var(--text-color)]">
                  We begin by understanding your business goals, target audience, and competitive landscape to develop a
                  strategic roadmap for your website.
                </p>
              </div>
              <div className="mx-auto md:mx-0 my-4 md:my-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                1
              </div>
              <div className="md:w-1/2 md:pl-12">
                <ul className="space-y-2">
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Business objectives analysis</span>
                  </li>
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>User persona development</span>
                  </li>
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Competitive analysis</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <ul className="space-y-2">
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>Information architecture planning</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>Wireframe development</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>User experience mapping</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                </ul>
              </div>
              <div className="mx-auto md:mx-0 my-4 md:my-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                2
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-3">Planning & Architecture</h3>
                <p className="text-[var(--text-color)]">
                  We create a comprehensive site structure and user flow that organizes your content logically and
                  enhances the user experience.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-3">Design & Branding</h3>
                <p className="text-[var(--text-color)]">
                  Our designers create visually compelling layouts that align with your brand identity and appeal to
                  your target audience.
                </p>
              </div>
              <div className="mx-auto md:mx-0 my-4 md:my-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                3
              </div>
              <div className="md:w-1/2 md:pl-12">
                <ul className="space-y-2">
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Brand-aligned visual design</span>
                  </li>
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Responsive mockups</span>
                  </li>
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Interactive prototypes</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <ul className="space-y-2">
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>Clean, semantic code development</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>CMS implementation</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>Responsive functionality</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                </ul>
              </div>
              <div className="mx-auto md:mx-0 my-4 md:my-0 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                4
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-3">Development & CMS</h3>
                <p className="text-[var(--text-color)]">
                  Our developers build your website using modern technologies and implement a user-friendly content
                  management system.
                </p>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-3">Testing & Quality Assurance</h3>
                <p className="text-[var(--text-color)]">
                  We rigorously test your website across devices, browsers, and connection speeds to ensure optimal
                  performance.
                </p>
              </div>
              <div className="mx-auto md:mx-0 my-4 md:my-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                5
              </div>
              <div className="md:w-1/2 md:pl-12">
                <ul className="space-y-2">
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Cross-browser compatibility testing</span>
                  </li>
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Mobile responsiveness validation</span>
                  </li>
                  <li className="flex items-center text-[var(--text-color)]">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Performance optimization</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <ul className="space-y-2">
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>Website deployment</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>SEO implementation</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                  <li className="flex items-center md:justify-end text-[var(--text-color)]">
                    <span>Analytics setup</span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  </li>
                </ul>
              </div>
              <div className="mx-auto md:mx-0 my-4 md:my-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
                6
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-3">Launch & Optimization</h3>
                <p className="text-[var(--text-color)]">
                  We deploy your website, implement SEO best practices, and set up analytics to track performance and
                  user behavior.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4"
          >
            Technologies & Platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[var(--text-color)] max-w-3xl mx-auto"
          >
            We use modern, scalable technologies to build corporate websites that are secure, fast, and easy to
            maintain.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Tech 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="h-16 flex items-center justify-center mb-4">
              <img src={img4} alt="WordPress logo" className="h-12 w-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Firebase</h3>
          </motion.div>

          {/* Tech 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="h-16 flex items-center justify-center mb-4">
              <img src={img5} alt="React logo" className="h-12 w-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">React</h3>
          </motion.div>

          {/* Tech 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="h-16 flex items-center justify-center mb-4">
              <img src={img6} alt="Next.js logo" className="h-12 w-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Next.js</h3>
          </motion.div>

          {/* Tech 4 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="h-16 flex items-center justify-center mb-4">
              <img src={img7} alt="Shopify logo" className="h-12 w-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Spring Boot</h3>
          </motion.div>

          {/* Tech 5 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="h-16 flex items-center justify-center mb-4">
              <img src={img8} alt="Laravel logo" className="h-12 w-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Node Js</h3>
          </motion.div>

          {/* Tech 6 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="h-16 flex items-center justify-center mb-4">
              <img src={img9} alt="Webflow logo" className="h-12 w-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Django</h3>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-800">
        <div className="w-full max-w-[1600px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Corporate Web Development Packages
            </h2>
            <p className="text-lg text-white max-w-3xl mx-auto font-bold">
              Choose the package that best fits your business needs and digital transformation goals.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Basic",
                price: "Ksh 45,000",
                description: "Essential website for small to medium businesses",
                features: [
                  "Up to 5 pages",
                  "Responsive design",
                  "Basic SEO setup",
                  "Contact form",
                  "Social media integration",
                  "3 rounds of revisions"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 55,000",
                description: "Comprehensive website for growing companies",
                features: [
                  "Up to 10 pages",
                  "Responsive design",
                  "Advanced SEO setup",
                  "Content management system",
                  "Blog/news section",
                  "Analytics integration",
                  "Contact forms with validation",
                  "5 rounds of revisions"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 65,000",
                description: "Advanced solution for established corporations",
                features: [
                  "Up to 20 pages",
                  "Custom responsive design",
                  "Comprehensive SEO strategy",
                  "Advanced CMS with user roles",
                  "Multi-language support",
                  "Interactive elements/animations",
                  "Newsletter subscription",
                  "Performance optimization",
                  "7 rounds of revisions"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 80,000+",
                description: "Enterprise-level solution tailored to specific needs",
                features: [
                  "Unlimited pages",
                  "Custom design and functionality",
                  "Advanced security features",
                  "Integration with enterprise systems",
                  "Multi-language/multi-region support",
                  "Custom application development",
                  "Dedicated project manager",
                  "Ongoing priority support",
                  "Unlimited revisions"
                ],
                popular: false,
                isCustom: true
              }
            ].map((pkg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-slate-500 p-8 rounded-xl shadow-xl border ${pkg.popular ? 'border-blue-500' : 'border-gray-200'} hover:shadow-2xl transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-bold py-1 px-4 rounded-bl-xl rounded-tr-xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {pkg.title}
                </h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-white ml-1">/project</span>
                </div>
                <p className="text-white mb-6 min-h-[60px]">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/proposal-request">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold ${pkg.popular ? 'bg-blue-500 text-white' : pkg.isCustom ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-all duration-300`}
                >
                  {pkg.isCustom ? 'Contact for Custom Quote' : 'Get Started'}
                </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var--logo-bg] py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Corporate Digital Presence?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[var(--text-primary)] mb-8 max-w-3xl mx-auto"
          >
            Contact Go Digital Africa today to discuss your corporate website project and take your business to the next
            level.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Request a Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              View Our Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CorporateWebDev

