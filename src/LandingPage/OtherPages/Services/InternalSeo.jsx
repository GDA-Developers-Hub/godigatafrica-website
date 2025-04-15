"use client"
import { motion } from "framer-motion"
import {
  FileText,
  Zap,
  Layout,
  CheckCircle,
  ArrowRight,
  Search,
  BarChart4,
  HelpCircle,
  Layers,
  Compass,
  Award,
  X,
} from "lucide-react"
import { ServiceSEO } from "../../../SEO"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../../Utils/BaseUrl"
import swal from "sweetalert2"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"


const InternalSeo = () => {
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


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
  

  return (
    <div className="bg-[var(--card-background)]">
      <ServiceSEO service="internationalSEO" />
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4 mt-10">
            <Search className="text-white mr-3 h-10 w-10" />
            <FileText className="text-white h-10 w-10" />
          </div>
          <h1 className="text-5xl font-extrabold bg-white bg-clip-text text-transparent drop-shadow-lg">
            Internal SEO Optimization
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed">
            Improve your website's structure, content, and internal linking to enhance search engine visibility and user
            experience across African markets.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
            <Link to="/proposal-request">
            <button className="px-6 py-6 h-auto bg-white text-black rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-blue-900 transition duration-300 flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Aspects Section */}
      <section className=" bg-[var(--background-light)] bg-opacity-70 backdrop-blur-sm py-16 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-center bg-[var(--text-primary)] bg-clip-text text-transparent">
              Key Aspects of Internal SEO
            </h2>
            <div className="w-24 h-1 bg-[var(--text-primary)] mx-auto mt-4 rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={fadeIn}
              className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-3 rounded-lg inline-block mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">On-Page Optimization</h3>
              <p className="text-white font-semibold">
                Enhance title tags, meta descriptions, headers, and content to improve rankings and click-through rates.
                We optimize each page to target specific keywords relevant to African markets.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-3 rounded-lg inline-block mb-4">
                <Link className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Internal Linking Strategy</h3>
              <p className="text-white font-semibold">
                Improve site navigation and distribute link equity effectively throughout your website. Our strategic
                internal linking boosts important pages and creates a logical site structure.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-3 rounded-lg inline-block mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Site Speed & Performance</h3>
              <p className="text-white font-semibold">
                Optimize loading times for a better user experience and rankings. We implement performance enhancements
                tailored for the varying internet speeds across African regions.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-3 rounded-lg inline-block mb-4">
                <Layout className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Content Structure</h3>
              <p className="text-white font-semibold">
                Ensure content is well-structured with proper headers, formatting, and readability. We optimize content
                for both search engines and human readers, focusing on local relevance.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-[var(--light-bg)]/80 bg-opacity-70 backdrop-blur-sm ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-center bg-[var(--text-primary)] bg-clip-text text-transparent">
              Benefits of Internal SEO
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-cyan-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart4 className="h-8 w-8 text-white" />,
                title: "Improved Rankings",
                description: "Boost your position in search results for targeted keywords relevant to African markets.",
              },
              {
                icon: <Compass className="h-8 w-8 text-white" />,
                title: "Better User Experience",
                description: "Create a more intuitive navigation structure that keeps visitors engaged longer.",
              },
              {
                icon: <Layers className="h-8 w-8 text-white" />,
                title: "Increased Page Authority",
                description: "Distribute link equity effectively to boost important pages and content.",
              },
              {
                icon: <Search className="h-8 w-8 text-white" />,
                title: "Enhanced Crawlability",
                description: "Help search engines discover and index all your important content efficiently.",
              },
              {
                icon: <Award className="h-8 w-8 text-white" />,
                title: "Higher Conversion Rates",
                description: "Guide users through optimized conversion paths with strategic internal linking.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-white" />,
                title: "Reduced Bounce Rates",
                description: "Keep visitors engaged with relevant internal links and well-structured content.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20"
              >
                <div className="bg-blue-700 p-3 rounded-lg inline-block mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white font-semibold">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Process Section */}
      <section className=" bg-[var(--background-light)] bg-opacity-70 backdrop-blur-sm py-16 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-center bg-[var(--text-primary)] bg-clip-text text-transparent">
              Our Internal SEO Process
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-cyan-700 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Comprehensive Audit",
                description: "We analyze your current internal SEO structure, identifying issues and opportunities.",
              },
              {
                step: 2,
                title: "Strategy Development",
                description: "We create a customized internal linking and content optimization strategy.",
              },
              {
                step: 3,
                title: "Implementation",
                description: "Our team executes the strategy, optimizing content and internal link structure.",
              },
              {
                step: 4,
                title: "Monitoring & Refinement",
                description: "We track performance metrics and continuously refine the strategy for optimal results.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-xl">
                  {process.step}
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold text-white mb-3">{process.title}</h3>
                  <p className="text-white">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
              Internal SEO Service Packages
            </h2>
            <p className="text-lg text-white max-w-3xl mx-auto font-bold">
              Choose the perfect package to optimize your website's internal structure and improve search performance.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Basic",
                price: "Ksh 25,000",
                description: "Essential internal SEO for small websites with simple structure",
                features: [
                  "Content audit & optimization",
                  "Basic keyword research",
                  "On-page SEO for 10 pages",
                  "Internal linking strategy",
                  "Monthly performance reports"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 35,000",
                description: "Comprehensive internal SEO for medium-sized websites",
                features: [
                  "Everything in Basic",
                  "On-page SEO for 25 pages",
                  "Content gap analysis",
                  "Site structure optimization",
                  "Semantic content enhancement",
                  "Bi-weekly optimization"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 45,000",
                description: "Advanced internal SEO for larger websites with complex structure",
                features: [
                  "Everything in Standard",
                  "On-page SEO for 50+ pages",
                  "Advanced content strategy",
                  "Content silo development",
                  "User experience optimization",
                  "Custom reporting dashboard",
                  "Weekly progress updates"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 55,000+",
                description: "Enterprise-level internal SEO solutions for large content websites",
                features: [
                  "Everything in Premium",
                  "Dedicated SEO specialist",
                  "Content & SEO workshops",
                  "Complete site restructuring",
                  "Custom content planning",
                  "International content strategy",
                  "Executive reporting"
                ],
                popular: false,
                isCustom: true
              }
            ].map((pkg, index) => (
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
                  className={`w-full py-3 rounded-full font-semibold ${pkg.popular ? 'bg-gradient-to-r from-[var(--logo-bg)] to-blue-400 text-white' : pkg.isCustom ? 'bg-gradient-to-r from-[#007ACC] to-[#005F99] text-white' : 'bg-white/10 text-white hover:bg-white/20'} transition-all duration-300`}
                >
                  {pkg.isCustom ? 'Contact for Custom Quote' : 'Get Started'}
                </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className=" bg-[var(--background-light)] bg-opacity-70 backdrop-blur-sm py-16 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-center bg-[var(--text-primary)] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-[var(--text-primary)] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What is the difference between internal and external SEO?",
                answer:
                  "Internal SEO focuses on optimizing elements within your website (content, structure, links), while external SEO involves factors outside your site like backlinks and social signals. Both are essential for a comprehensive SEO strategy.",
              },
              {
                question: "How long does it take to see results from internal SEO?",
                answer:
                  "Initial improvements can be seen within 2-4 weeks as search engines recrawl your site. However, the full impact typically takes 2-3 months to materialize, depending on your site's size and the scope of optimization.",
              },
              {
                question: "Do I need to update my internal SEO regularly?",
                answer:
                  "Yes, internal SEO should be an ongoing process. As you add new content, your internal linking strategy should evolve. Regular audits (quarterly or bi-annually) help ensure your site structure remains optimized.",
              },
              {
                question: "How is internal SEO different for African markets?",
                answer:
                  "Internal SEO for African markets requires consideration of local language variations, regional search trends, and content relevance to local audiences. We tailor internal linking strategies to highlight content most relevant to African users.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300"
              >
                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-white font-semibold">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 px-6 text-center bg-[var(--card-background)]/70 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold  text-white drop-shadow-lg">
            Optimize Your Website Today
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed">
            Our expert SEO strategies will help your website rank higher and perform better across African markets.
            Contact us now for a personalized approach!
          </p>
          <Link    onClick={openModal}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
            <button className="px-8 py-6 h-auto bg-white text-black rounded-full text-lg font-bold hover:shadow-lg hover:shadow-purple-700/20 transition duration-300 flex items-center mx-auto">
              Get a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
          </Link>
        </div>
      </motion.section>
       
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
    </div>
  )
}

export default InternalSeo

