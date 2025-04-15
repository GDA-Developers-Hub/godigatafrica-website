"use client"
import { Link } from "react-router-dom"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ArrowRight, BarChart3, Target, DollarSign, LineChart, Users, Award, Zap, X } from "lucide-react"
import { BASE_URL } from "../../../Utils/BaseUrl"
import swal from "sweetalert2";
import { ServiceSEO } from "../../../SEO";

const GoogleAds = () => {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    {
      title: "Search Campaigns",
      description: "Target users actively searching for your products or services with strategic keyword bidding and compelling ad copy.",
      icon: <Target className="w-10 h-10 text-blue-300" />
    },
    {
      title: "Display Advertising",
      description: "Reach potential customers with visually engaging ads across Google's vast network of websites and apps.",
      icon: <Users className="w-10 h-10 text-blue-300" />
    },
    {
      title: "Shopping Campaigns",
      description: "Showcase your products with images, prices, and business information directly in search results.",
      icon: <DollarSign className="w-10 h-10 text-blue-300" />
    },
    {
      title: "Remarketing",
      description: "Re-engage visitors who've previously interacted with your website to drive conversions.",
      icon: <Zap className="w-10 h-10 text-blue-300" />
    },
    {
      title: "Video Campaigns",
      description: "Capture attention with compelling video ads on YouTube and across the web.",
      icon: <Award className="w-10 h-10 text-blue-300" />
    },
    {
      title: "Performance Analysis",
      description: "Gain actionable insights with comprehensive reporting and analytics to optimize campaign performance.",
      icon: <BarChart3 className="w-10 h-10 text-blue-300" />
    }
  ];

  const packages = [
    {
      title: "Starter",
      price: "Ksh 25,000",
      description: "Perfect for small businesses looking to establish a digital presence",
      features: [
        "Campaign setup & optimization",
        "Keyword research",
        "Ad copywriting",
        "Monthly performance reports",
        "Up to Ksh 20,000 ad spend management"
      ],
      popular: false
    },
    {
      title: "Growth",
      price: "Ksh 35,000",
      description: "Ideal for businesses ready to scale their digital marketing efforts",
      features: [
        "Everything in Starter",
        "Advanced audience targeting",
        "Competitor analysis",
        "A/B testing",
        "Conversion tracking setup",
        "Up to Ksh 100,000 ad spend management"
      ],
      popular: true
    },
    {
      title: "Premium",
      price: "Ksh 45,000",
      description: "Comprehensive solution for established businesses seeking maximum ROI",
      features: [
        "Everything in Growth",
        "Custom landing page recommendations",
        "Cross-platform strategy integration",
        "Weekly performance calls",
        "Advanced attribution modeling",
        "Ksh 100,000+ ad spend management"
      ],
      popular: false
    }
  ];

  
  // Animation variants for form fields
  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 * custom, duration: 0.4 }
    })
  }

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Analysis",
      description: "We analyze your business goals, target audience, and competitors to develop a strategic foundation."
    },
    {
      number: "02",
      title: "Campaign Strategy",
      description: "Our experts craft a customized Google Ads strategy aligned with your specific business objectives."
    },
    {
      number: "03",
      title: "Implementation",
      description: "We build and launch your campaigns with optimized keywords, compelling ad copy, and strategic bidding."
    },
    {
      number: "04",
      title: "Monitoring & Optimization",
      description: "Continuous performance tracking and campaign refinement to maximize your return on investment."
    },
    {
      number: "05",
      title: "Reporting & Analysis",
      description: "Transparent reporting with actionable insights to understand campaign performance and future opportunities."
    }
  ];

  const stats = [
    { value: "8x", label: "Average ROI" },
    { value: "73%", label: "Increase in qualified leads" },
    { value: "45%", label: "Reduction in cost per acquisition" },
    { value: "91%", label: "Client retention rate" }
  ];

  const faqs = [
    {
      question: "How long does it take to see results from Google Ads?",
      answer: "While you can start seeing impressions and clicks immediately after launching a campaign, meaningful results typically begin to appear within 2-4 weeks as we gather data and optimize your campaigns. For more competitive industries, it may take 1-3 months to achieve optimal performance."
    },
    {
      question: "What budget do I need for Google Ads?",
      answer: "Your ideal budget depends on your industry, competition, and business goals. We recommend starting with a minimum of $500/month in ad spend (plus management fee) to gather sufficient data. Our team will help you determine the most effective budget allocation for your specific situation."
    },
    {
      question: "How do you measure the success of Google Ads campaigns?",
      answer: "We track key performance indicators aligned with your business goals, including impressions, clicks, click-through rates, conversions, cost per acquisition, and return on ad spend. We provide transparent reporting and insights to demonstrate the value and performance of your campaigns."
    },
    {
      question: "Do I need a landing page for Google Ads?",
      answer: "While not strictly required, dedicated landing pages significantly improve conversion rates. They provide a focused experience aligned with your ad messaging. We can advise on landing page optimization or connect you with our web development team to create high-converting landing pages."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="googleAds" />
      <div className="bg-[var(--card-background)] text-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-30 px-6">
          {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div> */}
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-white inline-block text-transparent bg-clip-text mb-6">
                Google Ads Management
              </h1>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
                Maximize your ROI with data-driven Google Ads campaigns that convert clicks into customers.
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-bold bg-[var(--logo-bg)]
                inline-block text-transparent bg-clip-text">
                    {stat.value}
                  </h3>
                  <p className="text-[var(--text-secondary)] font-bold mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Google Ads */}
        <section className="py-20 bg-transparent">
          <div className="max-w-6xl mx-auto px-">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-white inline-block text-transparent bg-clip-text mb-6">
                Why Choose Google Ads?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
                In today's competitive digital landscape, <span className="text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">Google Ads</span> offers unparalleled reach and targeting capabilities to help your business thrive.
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
                <Target className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Precision Targeting
                </h3>
                <p className="text-gray-300">
                  Place your brand in front of the right audience at the right time using advanced targeting based on demographics, interests, location, and online behavior.
                </p>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div 
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <DollarSign className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Cost-Effective Campaigns
                </h3>
                <p className="text-gray-300">
                  Only pay when users interact with your ads. Experience a high return on investment while minimizing wasted ad spend with our data-driven approach.
                </p>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div 
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <LineChart className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Real-Time Analytics
                </h3>
                <p className="text-gray-300">
                  Track ad performance, measure conversions, and optimize campaigns with live data insights. Make informed decisions based on comprehensive analytics.
                </p>
              </motion.div>

              {/* Benefit 4 */}
              <motion.div 
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <Zap className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Instant Visibility
                </h3>
                <p className="text-gray-300">
                  Unlike SEO which takes months to show results, Google Ads delivers immediate visibility and traffic to your website as soon as campaigns go live.
                </p>
              </motion.div>

              {/* Benefit 5 */}
              <motion.div 
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <Users className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Remarketing Capabilities
                </h3>
                <p className="text-gray-300">
                  Re-engage visitors who've shown interest in your products or services with strategic remarketing campaigns that boost conversion rates.
                </p>
              </motion.div>

              {/* Benefit 6 */}
              <motion.div 
                variants={fadeIn}
                className="bg-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Scalable Campaigns
                </h3>
                <p className="text-gray-300">
                  Easily scale your advertising efforts up or down based on business needs, seasonal demands, or performance metrics.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Google Ads Services */}
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
                Our Google Ads Services
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
                Go Digital Africa offers comprehensive Google Ads management services tailored to your business goals and target audience.
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
                  className="bg-gradient-to-r from-[var(--background)] to-[var(--card-background)] p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-100">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-20 bg-[var(--background-light)]/50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-4xl font-bold bg-white  inline-block text-transparent bg-clip-text mb-6">
                Our Google Ads Process
              </h2>
              <p className="text-xl text-[var(--text-primary)] font-bold max-w-3xl mx-auto">
                We follow a proven methodology to create, implement, and optimize Google Ads campaigns that deliver results.
              </p>
            </motion.div>

            {/* Process Steps */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Process line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-white hidden md:block"></div>
              
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[var(--logo-bg)] to-[var(--text-primary)] flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-gradient-to-r from-[var(--background)] to-slate-800 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-100 font-medium">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-[var(--background-light)]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] inline-block text-transparent bg-clip-text mb-6">
                Google Ads Management Packages
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
                Flexible pricing options designed to fit your business needs and budget.
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {packages.map((pkg, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className={`relative bg-gradient-to-r ${pkg.popular ? 'from-slate-800 to-slate-600 border-blue-500/30' : 'from-slate-800 to-slate-600 border-blue-500/20'} p-8 rounded-2xl backdrop-blur-sm border shadow-xl transition-all duration-300`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[var(--logo-bg)] to-blue-400 text-white text-sm font-bold py-1 px-4 rounded-bl-xl rounded-tr-xl">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {pkg.title}
                  </h3>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold text-white">{pkg.price}</span>
                    <span className="text-gray-300 ml-1">/month</span>
                  </div>
                  <p className="text-gray-300 mb-6 min-h-[60px]">
                    {pkg.description}
                  </p>
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
                    className={`w-full py-3 rounded-full font-semibold ${pkg.popular ? 'bg-gradient-to-r from-[var(--logo-bg)] to-blue-400 text-white' : 'bg-white/10 text-white hover:bg-white/20'} transition-all duration-300`}
                  >
                    Get Started
                  </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mt-12 bg-slate-700 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Custom Enterprise Solutions</h3>
              <p className="text-gray-300 max-w-3xl mx-auto mb-6 font-medium">
                Need a tailored solution for your enterprise? We offer custom Google Ads management packages designed specifically for your business goals and challenges,
                starting from <span className="font-bold text-amber-500">Ksh 60,000+</span> per month

              </p>
              <Link to="/proposal-request">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-white font-semibold bg-gradient-to-r from-[#007ACC] to-[#005F99] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact for Custom Quote
              </motion.button>
              </Link>
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
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto font-medium">
                Get answers to common questions about our Google Ads management services.
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
                  className="mb-6 bg-slate-800 rounded-2xl backdrop-blur-sm border border-4 border-blue-500/20 overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 text-white font-extrabold cursor-pointer">
                      {faq.question}
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-100 font-medium">
                      {faq.answer}
                    </div>
                  </details>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[var(--background-light)] relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div> */}
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-secondary)] mb-6">
                Ready to Supercharge Your Digital Advertising?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 font-medium">
                Partner with Go Digital Africa for data-driven Google Ads campaigns that deliver measurable results and exceptional ROI.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="px-10 py-4 text-[var(--text-secondary-white)] font-semibold bg-[var(--logo-bg)] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Schedule Your Free Consultation
              </motion.button>
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
    </main>
  );
};

export default GoogleAds;

