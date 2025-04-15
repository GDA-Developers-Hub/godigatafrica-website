"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import {
  CheckCircle,
  Users,
  BarChart2,
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  Clock,
  Target,
  Zap,
} from "lucide-react"
import { Link } from "react-router-dom"
import { ServiceSEO } from "../../../SEO"

const SocialMediaManagement = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="socialMediaManagement" />
      <div className="w-full bg-[var(--background)]">
        {/* Hero Section */}
        <section className="relative py-30 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div> */}

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-white">
                Expert Social Media Management
              </h1>
              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-bold">
                Elevate your brand's digital presence with Go Digital Africa's comprehensive social media management
                services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-5xl p-6 md:p-10 bg-[var(--card-background)] backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-xl"
            >
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div> */}
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Expert Team Makes the Difference</h2>
                <p className="text-white mb-8 font-bold">
                  At Go Digital Africa, our social media management team consists of seasoned professionals with extensive
                  experience across multiple industries and platforms. Unlike other agencies that apply a
                  one-size-fits-all approach, our specialists craft tailored strategies that align with your unique
                  business goals and target audience across Africa's diverse markets.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <Users className="h-6 w-6 text-blue-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-white">Platform Specialists</h3>
                      <p className="text-white font-bold">
                        Dedicated experts for each social platform ensuring optimal performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <BarChart2 className="h-6 w-6 text-blue-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-white">Data Analysts</h3>
                      <p className="text-white font-bold">Continuous performance monitoring and strategy refinement.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MessageSquare className="h-6 w-6 text-blue-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-white">Content Creators</h3>
                      <p className="text-white font-bold">
                        Creative professionals who craft engaging, culturally relevant content.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Target className="h-6 w-6 text-blue-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-white">Strategy Directors</h3>
                      <p className="text-white font-bold">
                        Experienced leaders who align social efforts with business objectives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center mb-16">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Our Approach to Social Media Management
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-white font-bold max-w-3xl mx-auto">
                While many agencies focus solely on posting content, we deliver a comprehensive strategy that drives real
                business results.
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-slate-700 backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all duration-300">
                  <Calendar className="h-7 w-7 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Strategic Planning</h3>
                <p className="text-white">
                  Unlike competitors who rely on generic templates, we develop custom content calendars aligned with your
                  business goals, industry trends, and audience behaviors specific to African markets.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-gray-300">Audience analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-gray-300">Competitor benchmarking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-gray-300">Platform-specific strategies</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-slate-700 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center mb-transition-all duration-300">
                  <Zap className="h-7 w-7 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Content Creation & Engagement</h3>
                <p className="text-white">
                  While other agencies recycle generic content, our team creates authentic, culturally relevant material
                  that resonates with African audiences and drives meaningful engagement.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-white">Localized content creation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-white">Community management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-white">Crisis communication planning</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-slate-700 backdrop-blur-sm p-6 rounded-xl border border-blue-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center mb-6transition-all duration-300">
                  <TrendingUp className="h-7 w-7 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Analytics & Optimization</h3>
                <p className="text-white">
                  Unlike agencies that provide basic metrics, we deliver comprehensive analytics that track ROI and
                  continuously optimize your strategy based on real performance data.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-gray-300">Custom KPI tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-gray-300">Conversion attribution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-gray-300">Competitive analysis</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background-light)] relative">
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px] opacity-20"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What Sets Us Apart</h2>
              <p className="text-xl text-white font-bold max-w-3xl mx-auto">
                Go Digital Africa delivers social media management that outperforms industry standards through our unique
                approach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Traditional Agencies</h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-start">
                    <Clock className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Generic posting schedules with little strategic planning</p>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">One-size-fits-all content that ignores cultural nuances</p>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Basic vanity metrics with limited business impact analysis</p>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Junior staff managing multiple accounts simultaneously</p>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Minimal integration with other marketing channels</p>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl border border-blue-500/30 relative overflow-hidden group">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-100 transition-opacity duration-500"></div> */}
                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">
                  Go Digital Africa
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-start">
                    <Award className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Data-driven strategies tailored to African markets and business goals</p>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">
                      Culturally relevant content created by local experts who understand regional nuances
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Comprehensive analytics focused on ROI and business impact</p>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Dedicated specialists for each platform and account</p>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white">Seamless integration with your entire digital marketing ecosystem</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-slate-800/90 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Social Media Management Packages
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto font-bold">
                Choose the perfect package for your business needs and budget
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Basic",
                  currency: "Ksh",
                  price: "20,000",
                  features: [
                    "Management of 2 social platforms",
                    "8 posts per month",
                    "Basic content calendar",
                    "Monthly performance reports",
                    "Community management",
                    "Email support"
                  ],
                  popular: false,
                  color: "from-blue-600 to-blue-400"
                },
                {
                  name: "Standard",
                  currency: "Ksh",
                  price: "30,000",
                  features: [
                    "Management of 3 social platforms",
                    "16 posts per month",
                    "Advanced content strategy",
                    "Community engagement",
                    "Bi-weekly reporting",
                    "Competitor analysis",
                    "Priority support"
                  ],
                  popular: true,
                  color: "from-blue-500 to-blue-700"
                },
                {
                  name: "Premium",
                  currency: "Ksh",
                  price: "40,000",
                  features: [
                    "Management of 4+ platforms",
                    "24 posts per month",
                    "Custom content creation",
                    "Dedicated account manager",
                    "Weekly reporting",
                    "Crisis management",
                    "24/7 support"
                  ],
                  popular: false,
                  color: "from-blue-600 to-blue-400"
                }
              ].map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative group bg-gray-800 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/10 hover:border-blue-500/30 transition-all duration-300 ${
                    pkg.popular ? "lg:-translate-y-4 shadow-xl shadow-blue-500/10" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-slate-400 text-lg">{pkg.currency}</span>
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      <span className="text-slate-400 text-lg">/mo</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`rounded-full p-1 bg-gradient-to-r ${pkg.color}`}>
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/proposal-request" 
                    className={`block text-center w-full bg-gradient-to-r ${pkg.color} text-white px-4 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Custom Package */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-2xl border-2 border-blue-500/20 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Custom Enterprise Solution</h3>
                <p className="text-slate-300 mb-6">
                  Need a comprehensive social media strategy for a larger brand? Our custom packages start at <span className="text-white font-bold">Ksh 50,000+</span> and include dedicated account teams, custom content production, and advanced analytics.
                </p>
                <Link
                  to="/proposal-request"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  Contact for Custom Quote
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[var(--light-bg)]">

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-slate-800 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-gray-300 shadow-2xl text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Ready to Transform Your Social Media Presence?
              </h2>
              <p className="text-xl text-white mb-8 text-center">
                Join the leading brands across Africa who trust Go Digital Africa with their social media management.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 rounded-lg text-base font-medium text-white bg-transparent hover:bg-gray-800 transition-all duration-300"
                >
                  View Success Stories
                </Link>
              </div>

              <p className="text-sm text-white text-center">
                Our team will respond within 24 hours to discuss your social media needs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default SocialMediaManagement

