"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Zap,
  Search,
  Smartphone,
  MessageSquare,
  Code,
  BarChart,
  Layers,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Cpu,
} from "lucide-react"
import { Link } from "react-router-dom"
import img1 from "../../../assets/landingpage.jpg"
import ClientReviews from "../../Pages/ClientReviews.jsx"
import { ServiceSEO } from "../../../SEO";


const LandingPageDev = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-full bg-[var(--card-background)] py-10" ref={containerRef}>
      <ServiceSEO service="landingPage" />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
  
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:14px_24px]" />


          {/* Animated particles */}
          {isLoaded &&
            [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white opacity-100"
                style={{
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-20">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                  Futuristic{" "}
                  <span className="text-transparent bg-clip-text bg-white">
                    Landing Pages
                  </span>{" "}
                  That Convert
                </h1>
                <div className="h-1 w-24 bg-white rounded-full mb-6" />
                <p className="text-lg text-[var(--text-primary)] font-bold leading-relaxed">
                  First impressions matter. At Go Digital Africa, we create lightning-fast, SEO-optimized landing pages
                  with modern polish and AI-powered features that captivate visitors and convert them into customers.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact-us"
                  className="px-6 py-3 bg-white text-black rounded-lg shadow-lg shadow-blue-500/20 flex items-center group"
                >
                  Get Your Landing Page
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/work/case-study"
                  className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors duration-300"
                >
                  View Our Work
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">300%</div>
                  <div className="text-sm text-white font-medium">Conversion Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1.2s</div>
                  <div className="text-sm text-white font-medium">Average Load Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">95+</div>
                  <div className="text-sm text-white font-medium">SEO Score</div>
                </div>
              </div>
            </motion.div>

            {/* Right image/mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ y, opacity }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20"></div>
                <div className="relative bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-2xl shadow-blue-500/10">
                  {/* Browser mockup */}
                  <div className="rounded-lg overflow-hidden">
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 ml-2">
                        <div className="bg-slate-700 rounded-full h-6 w-full flex items-center px-3">
                          <div className="text-xs text-slate-400 truncate">https://yourbusiness.com</div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={img1}
                        alt="Modern landing page example"
                        className="w-full h-auto"
                      />
                      {/* Overlay elements to make it look like a landing page */}
                      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-[var(--background)]">
                        <div className="w-32 h-8  rounded-md backdrop-blur-sm"></div>
                        <div className="flex gap-4">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="w-16 h-4 bg-white/10 rounded-md backdrop-blur-sm"></div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-1/3 left-10 max-w-xs">
                        <div className="w-64 h-8 bg-white/10 rounded-md backdrop-blur-sm mb-4"></div>
                        <div className="w-48 h-4 bg-white/10 rounded-md backdrop-blur-sm mb-2"></div>
                        <div className="w-56 h-4 bg-white/10 rounded-md backdrop-blur-sm mb-2"></div>
                        <div className="w-40 h-4 bg-white/10 rounded-md backdrop-blur-sm mb-6"></div>
                        <div className="w-32 h-10 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 rounded-md backdrop-blur-sm"></div>
                      </div>
                      {/* AI Chatbot mockup */}
                      <div className="absolute bottom-4 right-4 w-64 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700 shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 flex items-center justify-between">
                          <div className="text-sm font-medium">AI Assistant</div>
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <MessageSquare className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="p-3 text-xs">
                          <div className="bg-slate-700/50 rounded-lg p-2 mb-2 text-slate-300">
                            How can I help you today?
                          </div>
                          <div className="bg-blue-600/30 rounded-lg p-2 text-right text-slate-300">
                            I'd like to learn more about your services.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[var(--background-light)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Next-Generation{" "}
                <span className="text-blue-800">
                  Landing Page
                </span>{" "}
                Features
              </h2>
              <div className="h-1 w-24 bg-blue-800 mx-auto rounded-full mb-6" />
              <p className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto">
                Our landing pages are built with cutting-edge technology and designed to deliver exceptional user
                experiences that drive conversions.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[var(--background)] backdrop-blur-sm border border-blue-400 rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Zap className="h-7 w-7 text-white font-semibold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Lightning-Fast Loading</h3>
              <p className="text-white">
                Our landing pages are optimized for speed with lazy loading, code splitting, and next-gen image formats,
                ensuring visitors don't bounce before your content loads.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">1.2s average load time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">90+ Google PageSpeed score</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[var(--background)] backdrop-blur-sm border border-blue-400 rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Search className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">SEO Supercharged</h3>
              <p className="text-white">
                Built with search engines in mind, our landing pages feature semantic HTML, structured data, and
                optimized metadata to help you rank higher and get found.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Schema markup for rich results</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Core Web Vitals optimized</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[var(--background)] backdrop-blur-sm border border-blue-400 rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Smartphone className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Responsive Perfection</h3>
              <p className="text-white">
                Every landing page is meticulously crafted to look and function flawlessly across all devices, from
                desktop monitors to mobile phones.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Mobile-first design approach</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Adaptive layouts for all screen sizes</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[var(--background)] backdrop-blur-sm border border-blue-400 rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI-Powered Chatbots</h3>
              <p className="text-white">
                Engage visitors 24/7 with intelligent chatbots that can answer questions, qualify leads, and guide users
                through your offerings without human intervention.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Natural language processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Customizable to your business needs</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[var(--background)] backdrop-blur-sm border border-blue-400 rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Code className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Modern UI/UX Design</h3>
              <p className="text-white">
                Captivate visitors with stunning visuals, smooth animations, and intuitive interfaces that guide them
                naturally toward conversion actions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Micro-interactions and animations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Conversion-focused user journeys</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[var(--background)] backdrop-blur-sm border border-blue-400 rounded-xl p-6 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <BarChart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Advanced Analytics</h3>
              <p className="text-white">
                Gain deep insights into visitor behavior with integrated analytics that help you understand what works
                and continuously improve conversion rates.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Heat maps and session recordings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white">A/B testing capabilities</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 relative bg-[var(--background)]/80">
        {/* <div className="absolute inset-0 bg-white" /> */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Landing Page{" "}
                <span className="text-transparent bg-clip-text bg-white">
                  Development Process
                </span>
              </h2>
              <div className="h-1 w-24 bg-white mx-auto rounded-full mb-6" />
              <p className="text-lg text-white font-bold max-w-3xl mx-auto">
                We follow a proven methodology to create high-converting landing pages that align with your business
                goals and resonate with your target audience.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-400 rounded-xl blur opacity-20"></div> */}
              <div className="relative bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-blue-400">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Discovery & Strategy</h3>
                <p className="text-white">
                  We analyze your business goals, target audience, and competition to develop a strategic plan for your
                  landing page.
                </p>
                <div className="mt-4 flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">3-5 business days</span>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-400 rounded-xl blur opacity-20"></div> */}
              <div className="relative bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-blue-400">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Design & Prototyping</h3>
                <p className="text-white">
                  Our designers create visually stunning mockups and interactive prototypes that align with your brand
                  and conversion goals.
                </p>
                <div className="mt-4 flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">5-7 business days</span>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-400 rounded-xl blur opacity-20"></div> */}
              <div className="relative bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-blue-400">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Development & Integration</h3>
                <p className="text-white">
                  Our developers build your landing page with clean, optimized code and integrate all necessary features
                  and functionality.
                </p>
                <div className="mt-4 flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">7-10 business days</span>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-400 rounded-xl blur opacity-20"></div> */}
              <div className="relative bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-blue-400">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Launch & Optimization</h3>
                <p className="text-white">
                  We deploy your landing page, conduct thorough testing, and implement analytics to track performance
                  and continuously improve results.
                </p>
                <div className="mt-4 flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">3-5 business days</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[var(--background-light)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  AI-Powered
                </span>{" "}
                Landing Page Experience
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6" />
              <p className="text-lg text-[var(--text-primary)] leading-relaxed">
                Elevate your landing pages with cutting-edge AI technology that personalizes the user experience,
                increases engagement, and drives higher conversion rates.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Intelligent Chatbots</h3>
                    <p className="text-[var(--text-primary)]">
                      Our AI chatbots can answer questions, qualify leads, and guide visitors through your offerings
                      24/7 without human intervention.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Layers className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Dynamic Content Personalization</h3>
                    <p className="text-[var(--text-primary)]">
                      AI analyzes visitor behavior to dynamically adjust content, offers, and CTAs in real-time,
                      delivering a personalized experience for each user.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Cpu className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Predictive Analytics</h3>
                    <p className="text-[var(--text-primary)]">
                      Our AI systems analyze user patterns to predict which visitors are most likely to convert,
                      allowing for targeted engagement strategies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/join-the-movement"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/20 flex items-center group inline-flex"
                >
                  Explore AI Integration
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20"></div>
              <div className="relative bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-2xl shadow-blue-500/10">
                {/* AI Interaction Mockup */}
                <div className="bg-slate-800 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3">
                    <h3 className="text-white font-medium">AI-Powered Landing Page Demo</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Visitor Behavior Analysis */}
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <BarChart className="h-5 w-5 text-cyan-400 mr-2" />
                        <h4 className="text-white font-medium">Visitor Analysis</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300 text-sm">Interest: Product Features</span>
                          <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300 text-sm">Intent: Purchase</span>
                          <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300 text-sm">Stage: Consideration</span>
                          <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Content Adaptation */}
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Layers className="h-5 w-5 text-cyan-400 mr-2" />
                        <h4 className="text-white font-medium">Content Adaptation</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-slate-300 text-sm">Highlighting product features</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-slate-300 text-sm">Displaying comparison table</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-slate-300 text-sm">Showing customer testimonials</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Chatbot */}
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <MessageSquare className="h-5 w-5 text-cyan-400 mr-2" />
                        <h4 className="text-white font-medium">AI Assistant</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-slate-600/50 rounded-lg p-2 text-sm text-slate-300">
                          Would you like to see a product demo or learn about pricing options?
                        </div>
                        <div className="bg-blue-600/30 rounded-lg p-2 text-sm text-right text-slate-300">
                          I'm interested in seeing a demo first.
                        </div>
                        <div className="bg-slate-600/50 rounded-lg p-2 text-sm text-slate-300">
                          Great choice! I'll set up a personalized demo for you. Would you prefer a live walkthrough or
                          a recorded video?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Landing Page Development Packages
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Choose the perfect package to create a high-converting landing page that meets your business objectives.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Basic",
                price: "Ksh 25,000",
                description: "Simple single-page landing page for campaigns and promotions",
                features: [
                  "Single-page design",
                  "Responsive layout",
                  "Contact form integration",
                  "Basic SEO setup",
                  "Social media links",
                  "2 rounds of revisions"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 30,000",
                description: "Professional landing page with enhanced features for better conversions",
                features: [
                  "Custom design with branding",
                  "Responsive & mobile optimized",
                  "Lead capture forms with validation",
                  "Email marketing integration",
                  "Advanced SEO implementation",
                  "Google Analytics setup",
                  "4 rounds of revisions"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 35,000",
                description: "Advanced landing page with interactive elements and powerful integrations",
                features: [
                  "Everything in Standard",
                  "Multi-section scroll design",
                  "Interactive elements & animations",
                  "A/B testing setup",
                  "CRM integration",
                  "Chat bot functionality",
                  "Video integration",
                  "6 rounds of revisions"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 40,000+",
                description: "Tailored solution with AI-driven functionality and advanced features",
                features: [
                  "Everything in Premium",
                  "AI personalization features",
                  "Dynamic content adaptation",
                  "Custom third-party integrations",
                  "Advanced analytics dashboard",
                  "User behavior tracking",
                  "Dedicated project manager",
                  "Priority support",
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
                className={`relative bg-slate-800 p-8 rounded-xl shadow-xl border ${pkg.popular ? 'border-cyan-400' : 'border-slate-700'} hover:shadow-2xl transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-bold py-1 px-4 rounded-bl-xl rounded-tr-xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {pkg.title}
                </h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  <span className="text-slate-400 ml-1">/project</span>
                </div>
                <p className="text-slate-400 mb-6 min-h-[60px]">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/proposal-request">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold ${pkg.popular ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : pkg.isCustom ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'} transition-all duration-300`}
                >
                  {pkg.isCustom ? 'Contact for Custom Quote' : 'Get Started'}
                </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative">
        <ClientReviews />
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[var(--background-light)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative">
              {/* <div className="absolute -inset-1 bg-slate-700 rounded-xl blur opacity-30"></div> */}
              <div className="relative bg-slate-900 backdrop-blur-xl p-10 rounded-xl border border-b-slate-100 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Ready for a  Futuristic Landing Page?
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                  Transform your online presence with a high-converting, AI-powered landing page that loads instantly,
                  ranks higher, and delivers exceptional user experiences.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/contact-us"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/20 flex items-center justify-center group"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/work/case-study"
                    className="px-8 py-4 bg-blue-400 backdrop-blur-sm border border-blue-400 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    View Our Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPageDev

