"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { CheckCircle, Shield, Zap, Clock, BarChart2, Server, RefreshCw, AlertTriangle, ArrowRight } from "lucide-react"
import { ServiceSEO } from "../../../SEO";
import Reviews from "../../Pages/ClientReviews";


export default function WebsiteMaintenance() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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

  const maintenanceServices = [
    {
      icon: <RefreshCw className="h-10 w-10 text-blue-500" />,
      title: "Regular Updates",
      description:
        "Keep your website's CMS, plugins, and themes up-to-date to ensure optimal performance and security.",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: "Security Monitoring",
      description: "Continuous monitoring for malware, suspicious activities, and implementation of security patches.",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: "Performance Optimization",
      description: "Regular speed tests, image optimization, code minification, and caching implementation.",
    },
    {
      icon: <Server className="h-10 w-10 text-blue-500" />,
      title: "Backup Management",
      description: "Automated daily or weekly backups of your website files and database with secure storage.",
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-blue-500" />,
      title: "Analytics & Reporting",
      description: "Monthly performance reports with insights on traffic, user behavior, and conversion metrics.",
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      title: "Uptime Monitoring",
      description: "24/7 monitoring of your website's availability with instant alerts for any downtime.",
    },
  ]

  const maintenancePlans = [
    {
      title: "Essential",
      price: "17,400",
      features: [
        "Monthly CMS & plugin updates",
        "Basic security monitoring",
        "Weekly backups",
        "Monthly performance check",
        "Email support",
        "Response time: 48 hours",
      ],
      recommended: false,
    },
    {
      title: "Professional",
      price: "25,000",
      features: [
        "Bi-weekly CMS & plugin updates",
        "Advanced security monitoring",
        "Daily backups",
        "Bi-weekly performance optimization",
        "Content updates (2 hours/month)",
        "Email & phone support",
        "Response time: 24 hours",
      ],
      recommended: true,
    },
    {
      title: "Enterprise",
      price: "30,000",
      features: [
        "Weekly CMS & plugin updates",
        "Premium security monitoring & firewall",
        "Real-time backups",
        "Weekly performance optimization",
        "Content updates (5 hours/month)",
        "Priority email & phone support",
        "Response time: 4 hours",
        "Monthly strategy consultation",
      ],
      recommended: false,
    },
    {
      title: "Custom",
      price: "40,000+",
      features: [
        "Tailored update schedule",
        "Enterprise-grade security solutions",
        "Continuous backup system",
        "Dedicated performance optimization",
        "Unlimited content updates",
        "24/7 dedicated support",
        "Response time: 1 hour",
        "Weekly strategy consultation",
        "Custom development hours included",
      ],
      recommended: false,
      isCustom: true,
    },
  ]

  return (
    <div className="w-full">
      <ServiceSEO service="websiteMaintenance" />
      {/* Animated background */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-100/80"></div>
      </div> */}

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-27 sm:px-6 lg:px-8  bg-[var(--card-background)]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl">
              <span className="block">Website Maintenance</span>
              <span className="block bg-white bg-clip-text text-transparent">
                Keep Your Digital Presence Flawless
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-[var(--text-secondary)] font-bold">
              Proactive maintenance to ensure your website remains secure, fast, and always up-to-date.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#plans"
                className="rounded-full bg-white px-8 py-3 font-bold text-black transition-all hover:from-blue-700 hover:to-blue-500"
              >
                View Maintenance Plans
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white  px-8 py-3 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Website Maintenance Section */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 bg-[var(--background-light)]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="mb-12 text-center"
          >
            <motion.h2 variants={itemVariants} className="mb-4 text-3xl font-bold sm:text-4xl text-[var(--text-primary)]">
              Why Website Maintenance Is <span className="text-blue-400">Critical</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mx-auto max-w-3xl text-lg text-[var(--text-primary)]">
              A website is not a "set it and forget it" investment. Regular maintenance is essential to protect your
              brand, ensure optimal performance, and maximize your return on investment.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-[var(--background)] p-6 shadow-lg backdrop-blur-sm transition-all"
            >
              <AlertTriangle className="mb-4 h-12 w-12 text-white" />
              <h3 className="mb-3 text-white font-bold">Security Vulnerabilities</h3>
              <p className="text-white">
                Outdated websites are prime targets for hackers. 43% of cyberattacks target small businesses, with
                outdated software being the primary vulnerability.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-[var(--background)] p-6 shadow-lg backdrop-blur-sm transition-all"
            >
              <Zap className="mb-4 h-12 w-12 text-white" />
              <h3 className="mb-3 text-white font-bold">Performance Degradation</h3>
              <p className="text-white">
                Without regular optimization, websites slow down over time. A 1-second delay in page load time can
                result in a 7% reduction in conversions.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-xl bg-[var(--background)] p-6 shadow-lg backdrop-blur-sm transition-all"
            >
              <BarChart2 className="mb-4 h-12 w-12 text-white" />
              <h3 className="mb-3 text-white font-bold">SEO Penalties</h3>
              <p className="text-white">
                Search engines prioritize websites that are secure, fast, and regularly updated. Neglected websites
                often experience ranking drops.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Maintenance Services */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 bg-[var(--background-light)]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Comprehensive <span className="text-blue-400">Maintenance Services</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[var(--text-primary)]">
              Our proactive approach ensures your website remains secure, fast, and fully functional at all times.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {maintenanceServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="text-gray-j950">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section id="plans" className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 bg-slate-800">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl text-white">
              Website Maintenance <span className="text-blue-400">Plans</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-white">
              Choose the maintenance plan that best suits your business needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {maintenancePlans.slice(0, 3).map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group bg-gray-800 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/10 hover:border-blue-500/30 transition-all duration-300 ${
                  plan.recommended ? "lg:-translate-y-4 shadow-xl shadow-blue-500/10" : ""
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-slate-400 text-lg">KSh</span>
                    <span className="text-4xl font-bold text-white">{plan.price.replace('KSh ', '')}</span>
                    <span className="text-slate-400 text-lg">/mo</span>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`rounded-full p-1 bg-gradient-to-r ${
                        plan.recommended ? "from-blue-500 to-blue-700" : "from-blue-600 to-blue-400"
                      }`}>
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact-us" 
                  className={`block text-center w-full bg-gradient-to-r ${
                    plan.recommended ? "from-blue-500 to-blue-700" : "from-blue-600 to-blue-400"
                  } text-white px-4 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Custom Package */}
          {maintenancePlans.length > 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-2xl border-2 border-blue-500/20 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{maintenancePlans[3].title}</h3>
                <p className="text-slate-300 mb-6">
                  Need a comprehensive maintenance solution for your enterprise website? Our custom plans start at <span className="text-white font-bold">{maintenancePlans[3].price}</span> and include {maintenancePlans[3].features.slice(0, 4).join(', ')}, and more.
                </p>
                <Link
                  to="/contact-us"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  Contact for Custom Quote
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Our Maintenance Process */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 bg-[var(--background-light)]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Our Maintenance <span className="text-blue-400">Process</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[var(--text-primary)]">
              A systematic approach to ensure your website remains in optimal condition.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-blue-500 md:block"></div>

            {/* Process steps */}
            <div className="space-y-12">
              {[
                {
                  title: "Initial Assessment",
                  description:
                    "We conduct a comprehensive audit of your website to identify security vulnerabilities, performance issues, and areas for improvement.",
                },
                {
                  title: "Customized Maintenance Plan",
                  description:
                    "Based on the assessment, we develop a tailored maintenance plan that addresses your specific needs and priorities.",
                },
                {
                  title: "Regular Maintenance Tasks",
                  description:
                    "We perform scheduled maintenance tasks according to your plan, including updates, backups, security scans, and performance optimizations.",
                },
                {
                  title: "Monitoring & Reporting",
                  description:
                    "Continuous monitoring of your website's performance, security, and uptime with detailed monthly reports on actions taken and results achieved.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                >
                  <div className="flex w-full flex-col items-center md:w-5/12">
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 z-10 h-8 w-8 -translate-x-1/2 transform rounded-full bg-blue-400 md:static md:translate-x-0"></div>

                    {/* Content */}
                    <div className="ml-8 w-full rounded-xl bg-slate-900 p-6 backdrop-blur-sm md:ml-0">
                      <h3 className="mb-3 text-blacke font-bold text-white">{step.title}</h3>
                      <p className="text-white">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 bg-[var(--background-light)]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Benefits of Our <span className="text-blue-400">Maintenance Services</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[var(--text-primary)]">
              Investing in professional website maintenance delivers significant returns for your business.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-6 text-2xl font-bold">Enhanced Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Protection against malware and hacking attempts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Regular security patches and updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Secure customer data and transactions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Reduced risk of downtime due to security breaches</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-6 text-2xl font-bold">Improved Performance</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Faster page loading speeds</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Better user experience and engagement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Higher conversion rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Improved search engine rankings</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-6 text-2xl font-bold">Peace of Mind</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>24/7 monitoring and support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Regular backups and disaster recovery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Proactive issue resolution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Focus on your business while we handle the technical details</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-6 text-2xl font-bold">Cost Savings</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Prevention of costly emergency repairs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Reduced downtime and lost revenue</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Extended website lifespan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                  <span>Better ROI on your website investment</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="">
        <Reviews/>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl bg-[var(--light-bg)] p-8 shadow-xl backdrop-blur-sm md:p-12"
          >
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h2 className="mb-4 text-3xl font-bold">Ready to ensure your website's optimal performance?</h2>
                <p className="mb-6 text-lg text-[var(--text-primary)] md:mb-0">
                  Contact us today to discuss your website maintenance needs and how we can help protect your digital
                  investment.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Link 
                  to="/contact-us"
                  className="inline-flex items-center rounded-full bg-blue-400  px-8 py-3 font-medium text-white transition-all hover:blue-700 "
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 bg-[var(--background-light)]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Frequently Asked <span className="text-blue-400">Questions</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-black">
              Get answers to common questions about our website maintenance services.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-6">
            {[
              {
                question: "How often should a website be maintained?",
                answer:
                  "Websites should be maintained regularly, with critical security updates applied immediately, CMS and plugin updates performed at least monthly, and comprehensive performance reviews conducted quarterly.",
              },
              {
                question: "What happens if I don't maintain my website?",
                answer:
                  "Neglecting website maintenance can lead to security vulnerabilities, slower performance, broken functionality, outdated content, and eventually loss of visitors and customers. It can also result in higher costs when emergency fixes are needed.",
              },
              {
                question: "Can I maintain my website myself?",
                answer:
                  "While basic maintenance tasks can be performed by website owners, professional maintenance ensures comprehensive coverage of technical aspects like security patches, performance optimization, and backup management that require specialized knowledge and tools.",
              },
              {
                question: "How do your maintenance services improve my website's SEO?",
                answer:
                  "Our maintenance services improve SEO by ensuring fast loading times, mobile responsiveness, secure connections (HTTPS), and regular content updates – all factors that search engines consider when ranking websites.",
              },
              {
                question: "Do you offer emergency support?",
                answer:
                  "Yes, all our maintenance plans include emergency support with varying response times based on the plan level. Our Professional and Enterprise plans provide faster response times for critical issues.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-3 text-xl font-bold">{faq.question}</h3>
                <p className="text-black">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

