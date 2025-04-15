"use client"
import { CheckCircle, BarChart3, ShoppingCart, DollarSign, LineChart, Image, Award, Zap,X } from "lucide-react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../../Utils/BaseUrl"
import { motion, AnimatePresence } from "framer-motion"
import google from "../../../assets/Google-shopping.jpg"
import swal from "sweetalert2";
import { ServiceSEO } from "../../../SEO";

const GoogleShopping = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        description: "",
      })
      const [isSubmitting, setIsSubmitting] = useState(false)
    
      const openModal = () => {
        setIsModalOpen(true)
      }
    
      const closeModal = () => {
        setIsModalOpen(false)
      }
    
      // Handle input change
      const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        // Validate fields
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.description) {
          alert("Please fill out all fields before submitting.")
          return
        }
    
        setIsSubmitting(true)
        console.log("Sending request to API...")
    
         try {
              // Replace with your actual API endpoint
              const response = await fetch(`${BASE_URL}/consultations/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
        
              if (response.ok) {
                const data = await response.json()
                console.log("Submission successful!")
                swal.fire("Success!", "Your consultation request has been submitted successfully!", "success");
        
                // Reset form and close modal
                setFormData({ name: "", email: "", phone: "", date: "", description: "" })
                setIsModalOpen(false)
              } else {
                throw new Error("Unexpected response from the server")
              }
            } catch (error) {
              
              swal.fire("Submission Failed", "There was an error submitting your request. Please try again later.", "error");
            } finally {
              setIsSubmitting(false)
            }
      }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

    
  // Animation variants for form fields
  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 * custom, duration: 0.4 }
    })
  }

  const services = [
    {
      title: "Product Feed Optimization",
      description:
        "We enhance your product data to ensure maximum visibility and click-through rates in Google Shopping results.",
      icon: <ShoppingCart className="w-10 h-10 text-blue-300" />,
    },
    {
      title: "Strategic Bidding",
      description:
        "Our AI-powered bidding strategies maximize your budget efficiency and ROAS across all product categories.",
      icon: <DollarSign className="w-10 h-10 text-blue-300" />,
    },
    {
      title: "Image Optimization",
      description:
        "Professional enhancement of product images to stand out in the competitive Google Shopping landscape.",
      icon: <Image className="w-10 h-10 text-blue-300" />,
    },
    {
      title: "Campaign Structure",
      description: "Strategic organization of your shopping campaigns for optimal performance and management.",
      icon: <Zap className="w-10 h-10 text-blue-300" />,
    },
    {
      title: "Performance Analytics",
      description: "Comprehensive reporting and insights to continuously improve your shopping campaign results.",
      icon: <BarChart3 className="w-10 h-10 text-blue-300" />,
    },
    {
      title: "Competitor Analysis",
      description: "Regular monitoring of competitor pricing and strategies to maintain your competitive edge.",
      icon: <LineChart className="w-10 h-10 text-blue-300" />,
    },
  ]

  const packages = [
    {
      title: "Basic",
      price: "Ksh 25,000",
      description: "Perfect for small e-commerce stores with up to 100 products",
      features: [
        "Product feed setup & optimization",
        "Basic campaign structure",
        "Monthly performance reports",
        "Quarterly strategy review",
        "Up to Ksh 50,000 ad spend management"
      ],
      popular: false
    },
    {
      title: "Standard",
      price: "Ksh 35,000",
      description: "Ideal for growing e-commerce businesses with 100-500 products",
      features: [
        "Everything in Basic",
        "Advanced product feed optimization",
        "Custom shopping campaign structure",
        "Competitor price monitoring",
        "Bi-weekly performance reports",
        "Up to Ksh 100,000 ad spend management"
      ],
      popular: true
    },
    {
      title: "Premium",
      price: "Ksh 45,000",
      description: "Advanced solution for established e-commerce stores with 500+ products",
      features: [
        "Everything in Standard",
        "Premium feed management",
        "Advanced inventory management",
        "Custom reporting dashboard",
        "Weekly strategy calls",
        "Up to Ksh 200,000 ad spend management"
      ],
      popular: false
    },
    {
      title: "Custom",
      price: "Ksh 60,000+",
      description: "Enterprise-level solution for large e-commerce operations",
      features: [
        "Everything in Premium",
        "Dedicated account manager",
        "Multi-market targeting",
        "Advanced inventory solutions",
        "API integration support",
        "Unlimited ad spend management",
        "Priority support"
      ],
      popular: false,
      isCustom: true
    }
  ]

  const results = [
    { value: "320%", label: "Average ROAS" },
    { value: "42%", label: "Increase in CTR" },
    { value: "38%", label: "Reduction in CPA" },
    { value: "65%", label: "Increase in conversion rate" },
  ]

  const faqs = [
    {
      question: "How long does it take to see results from Google Shopping campaigns?",
      answer:
        "Most clients begin seeing improvements within the first 2-4 weeks as we optimize your product feed and refine bidding strategies. However, significant results typically become apparent after 1-3 months of continuous optimization and data collection.",
    },
    {
      question: "Do I need to have a large inventory to benefit from Google Shopping ads?",
      answer:
        "No, businesses with even a small number of products can benefit from Google Shopping ads. We tailor our approach based on your inventory size, focusing on maximizing visibility and conversions for your specific product range.",
    },
    {
      question: "How do you optimize our product feed for better performance?",
      answer:
        "We enhance your product titles, descriptions, and attributes based on search data and industry best practices. We also optimize your product images, ensure accurate categorization, and implement structured data markup to improve visibility and click-through rates.",
    },
    {
      question: "Can Google Shopping ads work alongside my other digital marketing efforts?",
      answer:
        "Google Shopping ads complement other marketing channels like SEO, social media, and email marketing. We can help integrate your shopping campaigns with your broader digital strategy for maximum impact and consistent messaging across all channels.",
    },
  ]

  return (
    <>
      <ServiceSEO service="googleShopping" />
      <div className="bg-[var(--card-background)] overflow-hidden py-10">
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-white inline-block text-transparent bg-clip-text mb-6">
                Google Shopping Ads Management
              </h1>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
              Showcase your products to ready-to-buy customers and drive e-commerce growth across Africa.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openModal}
                  className="px-8 py-4 text-black font-semibold bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get a Free Consultation
                </motion.button>
                <Link to="/work/case-study"
                  className="px-8 py-4 text-white font-semibold border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  View Case Studies
                  </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[var(--background-light)] backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {results.map((stat, index) => (
                <motion.div key={index} variants={fadeIn} className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold bg-[var(--logo-bg)] inline-block text-transparent bg-clip-text">
                    {stat.value}
                  </h3>
                  <p className="text-[var(--text-secondary)] font-bold mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Google Shopping */}
        <section className="py-20 bg-[var(--background-light)]/80 ">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
             <h2 className="text-3xl md:text-4xl font-bold bg-[var(--logo-bg)] inline-block text-transparent bg-clip-text mb-6">
                Why Choose Google Ads?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] font-bold max-w-3xl mx-auto">
                In today's competitive e-commerce landscape, Google Shopping Ads offer unparalleled advantages for
                businesses looking to grow their online sales.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Benefit 1 */}
              <motion.div
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <ShoppingCart className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">Visual Appeal</h3>
                <p className="text-gray-300">
                  Showcase your products with high-quality images that catch the eye of potential customers, making your
                  offerings stand out in search results.
                </p>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <DollarSign className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">High Purchase Intent</h3>
                <p className="text-gray-300">
                  Target users who are actively searching for products like yours, resulting in higher conversion rates
                  and better ROI than traditional text ads.
                </p>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <LineChart className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">Competitive Insights</h3>
                <p className="text-gray-300">
                  Gain valuable data on competitor pricing and positioning, allowing you to adjust your strategy for
                  maximum market impact.
                </p>
              </motion.div>

              {/* Benefit 4 */}
              <motion.div
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <Zap className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">Immediate Visibility</h3>
                <p className="text-gray-300">
                  Unlike SEO which takes months to show results, Google Shopping ads deliver immediate visibility for your
                  products as soon as campaigns go live.
                </p>
              </motion.div>

              {/* Benefit 5 */}
              <motion.div
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <Award className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">Mobile Optimization</h3>
                <p className="text-gray-300">
                  Reach the growing number of mobile shoppers across Africa with ads perfectly optimized for smartphone
                  and tablet users.
                </p>
              </motion.div>

              {/* Benefit 6 */}
              <motion.div
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">Detailed Analytics</h3>
                <p className="text-gray-300">
                  Access comprehensive performance data to understand which products perform best and optimize your
                  inventory accordingly.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Google Shopping Services */}
        <section className="py-20 bg-[var(--background-light)]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-[var(--text-primary)] inline-block text-transparent bg-clip-text mb-6">
                Our Google Shopping Services
              </h2>
              <p className="text-xl text-[var(--text-secondary)] font-medium max-w-3xl mx-auto">
                Go Digital Africa offers comprehensive Google Shopping management services tailored to your e-commerce
                business goals.
              </p>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-gradient-to-r from-slate-800 to-slate-600 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Transparency & Ownership */}
        <section className="py-20 bg-[var(--background-light)]/70">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
                <h2 className="text-3xl md:text-4xl font-bold bg-[var(--text-primary)] inline-block text-transparent bg-clip-text mb-6">
                  Full Transparency & Account Ownership
                </h2>
                <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
                  At Go Digital Africa, we believe in complete transparency and client empowerment. You'll always have:
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-primary)]/80 font-medium">Full ownership of your Google Merchant Center account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-primary)]/80 font-medium">Complete access to performance data and analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-primary)]/80 font-medium">Regular, jargon-free reporting on campaign performance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-primary)]/80 font-medium">Clear communication about strategy and optimizations</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                className="bg-gradient-to-r from-[#007ACC]/20 to-[#005F99]/20 p-6 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl"
              >
                <img
                  src={google}
                  alt="Google Shopping Dashboard"
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing */}
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
                Google Shopping Service Packages
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto font-bold">
                Choose the perfect package to showcase your products where shoppers are actively searching.
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid md:grid-cols-4 gap-8"
            >
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`relative bg-gradient-to-r ${pkg.popular ? "from-slate-900 to-slate-900 border-blue-500/30" : "from-slate-800 to-slate-800 border-blue-500/20"} p-8 rounded-2xl backdrop-blur-sm border shadow-xl transition-all duration-300`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#2f8dff] to-[#b8d8ff] text-black text-sm font-bold py-1 px-4 rounded-bl-xl rounded-tr-xl">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-white mb-2">{pkg.title}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="text-gray-300 ml-1">/month</span>
                  </div>
                  <p className="text-gray-300 mb-6 min-h-[60px]">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/proposal-request">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-full font-semibold ${pkg.popular ? "bg-gradient-to-r from-[#2f9aff] to-[#1e7cda] text-white" : pkg.isCustom ? "bg-gradient-to-r from-[#007ACC] to-[#005F99] text-white" : "bg-white/10 text-white hover:bg-white/20"} transition-all duration-300`}
                  >
                    {pkg.isCustom ? 'Contact for Custom Quote' : 'Get Started'}
                  </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[var(--background-light)]/80">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-[var(--text-primary)] inline-block text-transparent bg-clip-text mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
                Get answers to common questions about our Google Shopping management services.
              </p>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="mb-6 bg-slate-700 rounded-2xl backdrop-blur-sm border border-blue-500/20 overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 text-white font-semibold cursor-pointer">
                      {faq.question}
                      <span className="transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-300">{faq.answer}</div>
                  </details>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[var(--background-light)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-secondary)] mb-6">Ready to Boost Your E-commerce Sales?</h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 font-bold">
                Partner with Go Digital Africa for expert Google Shopping management that drives real results for your
                business.
              </p>
              <Link to="/proposal-request">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 text-[#FFFFFF] font-semibold bg-[var(--logo-bg)] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Schedule Your Free Consultation
              </motion.button>
              </Link>
            </motion.div>
          </div>
          
          {/* MODAL with improved design and AnimatePresence for smooth exit animations */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex bg-black/80 backdrop-blur-sm justify-center p-4 fixed inset-0 items-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="bg-gray-900 p-6 rounded-2xl shadow-2xl text-white w-full max-w-md border border-white/10"
                >
                  <div className="flex justify-between items-center mb-6">
                    <motion.h3 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl font-bold bg-clip-text bg-gradient-to-r text-transparent from-cyan-400 to-purple-500"
                    >
                      Schedule a Consultation
                    </motion.h3>
                    <motion.button 
                      onClick={closeModal} 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </motion.button>
                  </div>
    
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { name: "name", type: "text", placeholder: "Your full name", custom: 1 },
                      { name: "email", type: "email", placeholder: "Your email address", custom: 2 },
                      { name: "phone", type: "tel", placeholder: "Your phone number", custom: 3 },
                      { name: "date", type: "date", placeholder: "", custom: 4 },
                      { name: "description", type: "textarea", placeholder: "Tell us about your project", custom: 5 },
                    ].map((field) => (
                      <motion.div 
                        key={field.name}
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={field.custom}
                      >
                        <motion.label 
                          className="text-gray-300 text-sm block capitalize font-medium mb-1"
                        >
                          {field.name}
                        </motion.label>
                        {field.type === "textarea" ? (
                          <motion.textarea
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gray-800 p-3 rounded-lg text-white w-full border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            rows={3}
                            required
                          />
                        ) : (
                          <motion.input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gray-800 p-3 rounded-lg text-white w-full border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            required
                          />
                        )}
                      </motion.div>
                    ))}
    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 p-3 rounded-lg text-white w-full font-semibold transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Submitting...
                        </motion.span>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Submit Request
                        </motion.span>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  )
}

export default GoogleShopping

