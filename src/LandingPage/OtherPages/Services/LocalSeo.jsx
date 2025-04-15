"use client"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Search, Star, TrendingUp, Users, Building, CheckCircle, X } from "lucide-react"
import {Link} from "react-router-dom"
import image3 from "../../../assets/LocalSEO.jpg"
import { ServiceSEO } from "../../../SEO";
import { BASE_URL } from "../../../Utils/BaseUrl";
import swal from "sweetalert2";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";  


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

const LocalSeo = () => {
  // Move useState hooks inside the component
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

  return (
    <div className="bg-[var(--card-background)]">
      <ServiceSEO service="localSEO" />
      {/* Hero Section */}
      <section className="relative py-30 px-6 overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center">
            <div className="inline-blockp-1 rounded-full mb-6">
              <div className="">
                <span className="text-black font-bold bg-clip-text">
                  Boost Your Local Business Presence
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-white">
                Local SEO Services
              </span>
            </h1>

            <p className="mt-6 text-lg max-w-3xl mx-auto text-[var(--text-secondary)] font-bold leading-relaxed">
              Dominate your local market with our specialized SEO strategies designed to attract nearby customers,
              increase foot traffic, and grow your business in your community.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/proposal-request" className="bg-white text-black flex items-center justify-center rounded-full px-8 py-6 text-lg font-medium">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {/* <button
                variant="outline"
                className="border-white border-2 text-white rounded-full px-8 py-6 text-lg font-medium"
              >
                Learn More
              </button> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Local SEO Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-white bg-clip-text">
                What is Local SEO?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--logo-bg)] to-white mx-auto mb-6"></div>
            <p className="text-lg text-[var(--text-secondary)] font-bold max-w-3xl mx-auto">
              Local SEO is the process of optimizing your online presence to attract more business from relevant local
              searches. These searches take place on Google and other search engines, with a focus on location-specific
              results.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeIn} className="order-2 md:order-1">
              <div className="backdrop-blur-lg bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-white">Why Local SEO Matters</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-[var(--logo-bg)] mr-3 flex-shrink-0 mt-1" />
                    <p className="text-white font-semibold">
                      <span className="font-medium text-white">46% of all Google searches</span> are looking for local
                      information
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-[var(--logo-bg)] mr-3 flex-shrink-0 mt-1" />
                    <p className="text-white font-semibold">
                      <span className="font-medium text-white">88% of consumers</span> who search for a local business
                      on a mobile device call or visit that business within 24 hours
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-[var(--logo-bg)] mr-3 flex-shrink-0 mt-1" />
                    <p className="text-white font-semibold">
                      <span className="font-medium text-white">Local searches</span> lead to purchases 28% of the time
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-[var(--logo-bg)] mr-3 flex-shrink-0 mt-1" />
                    <p className="text-white font-semibold">
                      <span className="font-medium text-white">92% of users</span> will pick businesses on the first
                      page of local search results
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-950 to-blue-600 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
                  <img
                    src={image3}
                    alt="Local SEO Illustration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Local SEO Services */}
      <section className="py-20 px-6 bg-[var(--background-light)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-[var(--logo-bg)]">
                Our Local SEO Services
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--logo-bg)] to-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-white font-semibold max-w-3xl mx-auto">
              We offer comprehensive local SEO solutions tailored to your business needs, helping you connect with
              customers in your area.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <MapPin className="h-10 w-10 text-blue-500" />,
                title: "Google Business Profile Optimization",
                description:
                  "We optimize your Google Business Profile to improve visibility in local search results and Google Maps.",
              },
              {
                icon: <Star className="h-10 w-10 text-blue-500" />,
                title: "Review Management",
                description:
                  "We help you generate and manage customer reviews to build trust and improve local rankings.",
              },
              {
                icon: <Building className="h-10 w-10 text-blue-500" />,
                title: "Local Citation Building",
                description: "We create and optimize business listings across directories to boost local authority.",
              },
              {
                icon: <Search className="h-10 w-10 text-blue-500" />,
                title: "Local Keyword Research",
                description:
                  "We identify the most valuable local keywords to target for your specific business and location.",
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
                title: "Local Content Strategy",
                description:
                  "We develop content that resonates with your local audience and improves your search visibility.",
              },
              {
                icon: <Users className="h-10 w-10 text-blue-500" />,
                title: "Competitor Analysis",
                description:
                  "We analyze your local competitors to identify opportunities and develop winning strategies.",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeIn}>
                <div className="h-full backdrop-blur-lg bg-gray-900 border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="bg-gray-800/50 p-4 rounded-full inline-block mb-6 group-hover:bg-purple-900/20 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Local SEO Process */}
      <section className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">
                Our Local SEO Process
              </span>
            </h2>
            <div className="w-24 h-1  mx-auto mb-6"></div>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
              We follow a proven methodology to boost your local search presence and drive more customers to your
              business.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-white to-blue-400 hidden md:block"></div>

            {[
              {
                step: "01",
                title: "Local SEO Audit",
                description:
                  "We analyze your current local presence, identify issues, and create a roadmap for improvement.",
              },
              {
                step: "02",
                title: "Google Business Profile Optimization",
                description:
                  "We optimize your GBP with accurate information, compelling descriptions, and high-quality images.",
              },
              {
                step: "03",
                title: "Local Keyword Implementation",
                description:
                  "We integrate targeted local keywords into your website content, meta tags, and business listings.",
              },
              {
                step: "04",
                title: "Citation Building & Cleanup",
                description:
                  "We create consistent NAP (Name, Address, Phone) citations across the web to boost local authority.",
              },
              {
                step: "05",
                title: "Review Generation & Management",
                description:
                  "We implement strategies to generate positive reviews and respond appropriately to all feedback.",
              },
              {
                step: "06",
                title: "Ongoing Optimization & Reporting",
                description:
                  "We continuously monitor performance, make adjustments, and provide detailed reports on your progress.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`flex flex-col md:flex-row items-start gap-6 mb-12 md:mb-24 ${
                  index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%] md:flex-row-reverse"
                }`}
              >
                <div className="bg-gradient-to-br from-white to-blue-500 rounded-full p-6 flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-2xl font-bold">{process.step}</span>
                </div>

                <div
                  className={`backdrop-blur-lg bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl w-full ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">{process.title}</h3>
                  <p className="text-gray-300">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits of Local SEO */}
      <section className="py-20 px-6 bg-[var(--background-light)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-[var(--text-primary)] bg-clip-text">
                Benefits of Local SEO
              </span>
            </h2>
            {/* <div className="w-24 h-1 bg-[var(--text-primary)] mx-auto mb-6"></div> */}
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
              Investing in local SEO provides numerous advantages for businesses looking to grow their local customer
              base.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Increased Local Visibility",
                description:
                  "Rank higher in local search results and attract nearby customers actively looking for your products or services.",
              },
              {
                title: "Higher Quality Traffic",
                description:
                  "Attract visitors who are more likely to convert because they're specifically searching for local businesses like yours.",
              },
              {
                title: "Improved Brand Awareness",
                description:
                  "Increase recognition of your brand within your local community through consistent online presence.",
              },
              {
                title: "Enhanced Customer Trust",
                description:
                  "Build credibility through positive reviews, accurate business information, and local content.",
              },
              {
                title: "Cost-Effective Marketing",
                description:
                  "Generate high ROI compared to traditional advertising by targeting customers already searching for your services.",
              },
              {
                title: "Competitive Advantage",
                description:
                  "Stand out from local competitors who may not be optimizing their online presence effectively.",
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeIn}>
                <div className="backdrop-blur-lg bg-gray-900 p-6 rounded-xl border border-gray-800 h-full hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 z-0"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="backdrop-blur-xl bg-gray-900 p-10 md:p-16 rounded-2xl border border-gray-800 shadow-2xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-white">
                Ready to Dominate Local Search?
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
              Let our experts help you attract more local customers, increase foot traffic, and grow your business in
              your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={openModal} className="bg-white hover:from-purple-700 hover:to-blue-700 text-black rounded-full px-8 py-6 text-lg font-medium flex items-center justify-center">
                Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link to="/work/case-study"
                variant="outline"
                className="border-white border-2 text-white hover:bg-purple-500/10 rounded-full px-8 py-6 text-lg font-medium"
              >
                View Our Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-800">
        <div className="w-full max-w-[1600px] mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Local SEO Service Packages
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-bold">
              Flexible pricing options to boost your local visibility and attract nearby customers.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                title: "Basic",
                price: "Ksh 25,000",
                description: "Essential local SEO for small businesses targeting a single location",
                features: [
                  "Google Business Profile optimization",
                  "Local keyword research",
                  "Citation cleanup (10 directories)",
                  "Basic on-page SEO",
                  "Monthly performance reports"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 30,000",
                description: "Comprehensive local strategy for established businesses",
                features: [
                  "Everything in Basic",
                  "Citation building (30 directories)",
                  "Review management strategy",
                  "Local content creation (2 posts/month)",
                  "Local link building (5 links)",
                  "Bi-weekly optimization"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 35,000",
                description: "Advanced local SEO for businesses targeting multiple locations",
                features: [
                  "Everything in Standard",
                  "Citation building (50+ directories)",
                  "Local content creation (4 posts/month)",
                  "Reputation management",
                  "Local link building (10 links)",
                  "Competitor analysis",
                  "Weekly optimization"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 40,000+",
                description: "Enterprise-level local SEO solutions for multi-location businesses",
                features: [
                  "Everything in Premium",
                  "Dedicated account manager",
                  "Custom reporting dashboard",
                  "Multi-location management",
                  "Advanced competitor analysis",
                  "Local PR strategies",
                  "Priority support"
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
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-[var(--background-light)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-[var(--text-primary)]">
                Frequently Asked Questions
              </span>
            </h2>
            <div className="w-24 h-1 bg-[var(--text-primary)] mx-auto mb-6"></div>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
              Get answers to common questions about our local SEO services.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-6"
          >
            {[
              {
                question: "How long does it take to see results from local SEO?",
                answer:
                  "While some improvements can be seen within a few weeks, significant results typically take 3-6 months. Local SEO is an ongoing process that builds momentum over time as search engines recognize your improved online presence.",
              },
              {
                question: "Do I need a physical location for local SEO?",
                answer:
                  "While having a physical location is beneficial for local SEO, service-area businesses without storefronts can still benefit from local SEO strategies. We can help optimize your online presence to target specific service areas.",
              },
              {
                question: "How much does local SEO cost?",
                answer:
                  "Our local SEO services are customized based on your business needs, market competition, and goals. We offer flexible packages starting from affordable rates. Contact us for a personalized quote.",
              },
              {
                question: "What makes your local SEO services different?",
                answer:
                  "We combine data-driven strategies with creative solutions tailored specifically to your business and local market. Our comprehensive approach addresses all aspects of local SEO, and we provide transparent reporting to track your ROI.",
              },
              {
                question: "Can I do local SEO myself?",
                answer:
                  "While basic local SEO tasks can be done in-house, professional services provide expertise, time-saving benefits, and access to specialized tools. Our team stays current with algorithm changes and best practices to maximize your results.",
              },
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeIn}>
                <div className="backdrop-blur-lg bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-[var(--card-background)]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-white font-bold">
                Boost Your Local Business Today
              </span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 font-bold">
              Take the first step toward dominating local search results and attracting more customers to your business.
            </p>
            <Link href="/contact-us">
              <button className="bg-white hover:from-gray-700 hover:to-blue-900 flex-row text-black rounded-full px-8 py-6 text-lg font-medium">
                Contact Us Now
              </button>
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
  )
}

export default LocalSeo

