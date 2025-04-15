"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, BarChart3, Target, Users, MessageSquare, Video } from "lucide-react"
import linkedin1 from "../../../assets/linkedin1.jpg"
import linkedin2 from "../../../assets/linkedin2.jpg"
import linkedin3 from "../../../assets/linkedin3.jpg"
import linkedin4 from "../../../assets/linkedin4.jpg"
import { ServiceSEO } from "../../../SEO"

const LinkedInAds = () => {
  // Animation variants for pricing section
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

  const packages = [
    {
      name: "Basic",
      currency: "Ksh",
      price: "30,000",
      features: [
        "LinkedIn Ads account setup",
        "Campaign structure setup",
        "Basic audience targeting",
        "2 ad variations",
        "Monthly performance reports",
        "Email support"
      ],
      popular: false,
      color: "from-blue-600 to-blue-400"
    },
    {
      name: "Standard",
      currency: "Ksh",
      price: "40,000",
      features: [
        "Everything in Basic",
        "Advanced audience targeting",
        "4 ad variations",
        "A/B testing",
        "Campaign optimization",
        "Bi-weekly reporting",
        "Phone & email support"
      ],
      popular: true,
      color: "from-blue-500 to-blue-700"
    },
    {
      name: "Premium",
      currency: "Ksh",
      price: "50,000",
      features: [
        "Everything in Standard",
        "Custom audience creation",
        "8+ ad variations",
        "Lead form integration",
        "Conversion tracking",
        "Weekly optimization",
        "Dedicated account manager"
      ],
      popular: false,
      color: "from-blue-600 to-blue-400"
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--background-light)]/80">
      <ServiceSEO service="linkedInAds" />
      <div className="w-full bg-[var(--light-bg)]">
        {/* Hero Section */}
        <section className="mx-auto px-4 py-36 md:py-24  bg-[var(--background)] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-white">
                LinkedIn: Africa's Premier Professional Network
              </h1>
              <p className="text-lg text-white font-bold mb-8">
                With over 40 million professionals across Africa, LinkedIn offers unparalleled opportunities to connect
                with decision-makers, industry leaders, and business professionals who matter to your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-white hover:from-blue-700 hover:to-blue-800 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all"
                >
                  Get Started with LinkedIn Ads
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm p-1 rounded-2xl">
                <img
                  src={linkedin2}
                  alt="LinkedIn Platform"
                  width={500}
                  height={400}
                  className="rounded-xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is LinkedIn Advertising */}
        <section className="mx-auto px-4 py-16 bg-[var(--card-backrground)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="relative">
                {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div> */}
                <div className="relative bg-blue-400 backdrop-blur-sm p-1 rounded-2xl">
                  <img
                    src={linkedin1}
                    alt="LinkedIn Advertising Network"
                    width={500}
                    height={400}
                    className="rounded-xl w-full"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-2xl md:text-4xl mb-6 bg-clip-text text-transparent bg-[var(--text-primary)] font-bold">
                Go Digital Africa's LinkedIn Advertising Expertise
              </h2>
              <p className="text-lg text-[var(--text-primary)] mb-6 font-bold">
                Our team at Go Digital Africa specializes in creating high-performing LinkedIn campaigns that drive
                qualified leads, build brand awareness, and establish your company as an industry leader across African
                markets.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-[var(--text-primary)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Sponsored Content</h3>
                    <p className="text-[var(--text-primary)] font-bold">
                      Boost your visibility in the LinkedIn feed with engaging posts that drive action
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-[var(--text-primary)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Message Ads</h3>
                    <p className="text-[var(--text-primary)] font-bold">Deliver personalized messages directly to decision-makers' inboxes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Video className="h-6 w-6 text-[var(--text-primary)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Video Ads</h3>
                    <p className="text-[var(--text-primary)] font-bold">Capture attention with compelling video content that tells your story</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-[var(--text-primary)]">
              Benefits of LinkedIn Advertising with Go Digital Africa
            </h2>
            <p className="text-lg text-[var(--text-primary)] font-bold max-w-3xl mx-auto">
              Our strategic approach to LinkedIn advertising delivers measurable results for businesses looking to expand
              their reach in professional markets across Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-xl text-whitye">Precision Targeting</h3>
                    <p className="text-[var(--text-primary)] font-bold">
                      Target by industry, job title, seniority, company size, and more to reach the exact audience that
                      matters to your business
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-xl">Lead Generation</h3>
                    <p className="text-[var(--text-primary)] font-bold">
                      Capture high-quality leads with LinkedIn's built-in lead gen forms that pre-fill with user profile
                      data
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-xl">Brand Authority</h3>
                    <p className="text-[var(--text-primary)] font-bold">
                      Establish your company as a thought leader in your industry with content that resonates with
                      professionals
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-xl">Performance Analytics</h3>
                    <p className="text-[var(--text-primary)] font-bold">
                      Gain valuable insights with detailed reporting on campaign performance, audience engagement, and ROI
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm p-1 rounded-2xl">
                <img
                  src={linkedin3}
                  alt="LinkedIn on Mobile"
                  width={500}
                  height={400}
                  className="rounded-xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* B2B Marketing Section */}
        <section className="container mx-auto px-10 py-16 bg-[var(--card-background)] rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-blue-400 backdrop-blur-sm p-1 rounded-2xl">
                <img
                  src={linkedin4}
                  alt="B2B Marketing Handshake"
                  width={500}
                  height={400}
                  className="rounded-xl w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-[var(--text-primary)]">
                Successful B2B Marketing with Go Digital Africa
              </h2>
              <p className="text-lg text-white mb-6">
                LinkedIn stands out as the most effective platform for B2B marketing in Africa. Our team at Go Digital
                Africa leverages this powerful network to connect your business with decision-makers who matter.
              </p>
              <div className="bg-blue-400 backdrop-blur-sm p-6 rounded-xl border border-blue-400 mb-6">
                <h3 className="font-semibold text-xl mb-3">Why LinkedIn Works for African B2B Markets:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Growing professional user base across the continent</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>High concentration of business decision-makers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Advanced targeting for industry-specific campaigns</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Professional context that drives business conversations</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center transition-all"
              >
                Discuss Your LinkedIn Strategy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-[var(--background-light)]/80">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                LinkedIn Ads Packages
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto font-bold">
                Strategic LinkedIn advertising solutions to reach decision-makers and grow your B2B business
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg, index) => (
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
                  Need a comprehensive LinkedIn advertising strategy? Our custom packages start at <span className="text-white font-bold">Ksh 60,000+</span> and include advanced targeting, account-based marketing strategies, and dedicated campaign management.
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

        {/* How to Use LinkedIn Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparenttext-[var(--text-primary)]">
              How Go Digital Africa Maximizes Your LinkedIn Marketing
            </h2>
            <p className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto">
              Our proven methodology ensures your LinkedIn presence drives meaningful business results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-700 backdrop-blur-sm p-6 rounded-xl border border-blue-400"
            >
              <div className="bg-blue-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3">Strategic Profile Optimization</h3>
              <p className="text-white">
                We build and optimize your company page to attract the right audience, with compelling content, regular
                updates, and strategic keywords.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-700 backdrop-blur-sm p-6 rounded-xl border border-blue-400"
            >
              <div className="bg-blue-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3">Targeted Campaign Management</h3>
              <p className="text-white">
                Our team creates and manages campaigns that reach your ideal audience with messaging that resonates and
                drives action.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-700 backdrop-blur-sm p-6 rounded-xl border border-blue-400"
            >
              <div className="bg-blue-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3">Performance Optimization</h3>
              <p className="text-white">
                We continuously monitor, analyze, and refine your campaigns to maximize ROI and achieve your business
                objectives.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--card-background)] backdrop-blur-md p-8 md:p-12 rounded-2xl border border-blue-700/30"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to Transform Your LinkedIn Presence?</h2>
              <p className="text-lg text-gray-100 font-bold mb-8">
                Partner with Go Digital Africa to leverage the power of LinkedIn for your business growth. Our team of
                experts is ready to help you connect with the professional audience that matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="bg-transparent hover:bg-gray-800 text-white border-2 border-blue-600 font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all"
                >
                  View Success Stories
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

export default LinkedInAds