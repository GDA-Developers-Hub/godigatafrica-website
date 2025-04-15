"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Handshake,
  TrendingUp,
  Globe,
  Users,
  Award,
  Zap,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import google from "../../assets/google-partner-no-bg.jpg"
import microsoft from "../../assets/partners/microsoft.jpeg"
import amazon from "../../assets/partners/amazon.jpg"
import salesforce from "../../assets/partners/salesforce.jpeg"
import hubspot from "../../assets/partners/hubspot.jpeg"
import oracle from "../../assets/partners/oracle.jpeg"

import adobe from "../../assets/partners/adobe.png"
import shopify from "../../assets/partners/shopify.jpg"
import wordpress from "../../assets/partners/wordpress.jpeg"
import wix from "../../assets/partners/wix.png"
import mailchimp from "../../assets/partners/mailchimp.jpeg"
import stripe from "../../assets/partners/stripe.jpeg"

import ict_board from "../../assets/partners/kict.jpeg"
import safaricom from "../../assets/partners/safaricom.jpeg"
import equity_bank from "../../assets/partners/equity.jpeg"
import kcb_group from "../../assets/partners/kcb.jpeg"
import national_media_group from "../../assets/partners/nationalmediagroup.jpeg"
import east_african_breweries from "../../assets/partners/eabl.jpeg"

import deloitte from "../../assets/partners/deloitte.png"
import accenture from "../../assets/partners/accenture.jpeg"
import bbdo from "../../assets/partners/bbdo.jpeg"
import ogilvy from "../../assets/partners/ogilvy.jpeg"
import dentsu from "../../assets/partners/dentsu.jpeg"
import wpp from "../../assets/partners/wpp.jpeg"


const PartnershipSection = () => {
  const [activeTab, setActiveTab] = useState("strategic")

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

  // Partner logos - replace with actual partner logos
  const partners = {
    strategic: [
      { name: "Microsoft", logo: microsoft },
      { name: "Google", logo: google },
      { name: "Amazon Web Services", logo: amazon },
      { name: "Salesforce", logo: salesforce },
      { name: "HubSpot", logo: hubspot },
      { name: "Oracle", logo: oracle },
    ],
    technology: [
      { name: "Adobe", logo: adobe },
      { name: "Shopify", logo: shopify },
      { name: "WordPress", logo: wordpress },
      { name: "Wix", logo: wix },
      { name: "Mailchimp", logo: mailchimp },
      { name: "Stripe", logo: stripe },
    ],
    agency: [
      { name: "Deloitte Digital", logo: deloitte },
      { name: "Accenture Interactive", logo: accenture },
      { name: "BBDO", logo: bbdo },
      { name: "Ogilvy", logo: ogilvy },
      { name: "Dentsu", logo: dentsu },
      { name: "WPP", logo: wpp },
    ],
    local: [
      { name: "Kenya ICT Board", logo: ict_board },
      { name: "Safaricom", logo: safaricom },
      { name: "Equity Bank", logo: equity_bank },
      { name: "KCB Group", logo: kcb_group },
      { name: "Nation Media Group", logo: national_media_group },
      {name: "East African Breweries", logo: east_african_breweries },
    ],
  }
  // Partnership benefits
  const benefits = [
    {
      icon: <TrendingUp className="h-10 w-10 text-cyan-400" />,
      title: "Market Expansion",
      description:
        "Access new markets across Africa with our established presence and local expertise in multiple countries.",
    },
    {
      icon: <Globe className="h-10 w-10 text-cyan-400" />,
      title: "Digital Innovation",
      description: "Leverage our cutting-edge digital solutions to bring innovative offerings to African consumers.",
    },
    {
      icon: <Users className="h-10 w-10 text-cyan-400" />,
      title: "Knowledge Exchange",
      description: "Benefit from our deep understanding of African digital landscapes and consumer behaviors.",
    },
    {
      icon: <Award className="h-10 w-10 text-cyan-400" />,
      title: "Brand Credibility",
      description: "Enhance your brand's reputation through association with a trusted digital leader in Africa.",
    },
    {
      icon: <Zap className="h-10 w-10 text-cyan-400" />,
      title: "Accelerated Growth",
      description: "Fast-track your business growth with our established networks and digital infrastructure.",
    },
    {
      icon: <Handshake className="h-10 w-10 text-cyan-400" />,
      title: "Collaborative Success",
      description: "Create mutual value through strategic alliances that leverage our combined strengths.",
    },
  ]

  // Partnership programs
  const programs = [
    {
      title: "Strategic Alliance Program",
      description:
        "Long-term partnerships focused on joint market development and shared growth objectives across African markets.",
      features: [
        "Joint market development initiatives",
        "Shared resource allocation",
        "Executive-level engagement",
        "Long-term strategic planning",
      ],
    },
    {
      title: "Technology Partner Program",
      description:
        "Collaboration with technology providers to integrate and deploy innovative digital solutions throughout Africa.",
      features: [
        "Technical integration support",
        "Co-development opportunities",
        "Joint solution offerings",
        "Technical knowledge sharing",
      ],
    },
    {
      title: "Agency Partner Network",
      description:
        "Collaborative relationships with complementary agencies to deliver comprehensive digital transformation services.",
      features: [
        "Client referral system",
        "Collaborative project delivery",
        "Shared best practices",
        "Joint marketing initiatives",
      ],
    },
    {
      title: "Local Business Partnerships",
      description: "Empowering local African businesses through digital enablement and market access partnerships.",
      features: [
        "Digital skills development",
        "Market access facilitation",
        "Technology adoption support",
        "Growth mentorship",
      ],
    },
  ]

  return (
    <div className="bg-[var(--card-background)] text-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative overflow-hidden py-20 px-6"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Handshake className="h-16 w-16 text-white mx-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-white bg-clip-text text-transparent">
              Strategic Partnerships
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto text-[var(--text-primary)] font-bold">
              Collaborate with Go Digital Africa to drive digital innovation and market expansion across the African
              continent.
            </p>
          </div>

          <div className="bg-slate-800 bg-opacity-60 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-xl">
            <p className="text-lg text-white mb-6 font-bold">
              At Go Digital Africa, we believe in the power of collaboration. Our partnerships are built on shared
              values, mutual growth, and a commitment to digital excellence across Africa. Together, we can unlock new
              opportunities and drive digital transformation throughout the continent.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact-us" className="bg-white hover:from-purple-700 hover:to-blue-700 text-black not-last:px-6 py-3 px-6 rounded-full flex align-center justify-center">
                Become a Partner <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Partnership Types Tabs */}
      <section className="py-16 px-6 bg-[var(--background-light)] bg-opacity-70">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-[var(--text-primary)] bg-clip-text text-transparent">
            Our Partnership Ecosystem
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["strategic", "technology", "agency", "local"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-blue-500 text-black"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Partners
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {partners[activeTab].map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 flex items-center justify-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-h-16 max-w-full filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Programs */}
      <section className="py-16 px-6 bg-[var(--card-background)] bg-opacity-70">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-[var(--text-primary)] bg-clip-text text-transparent">
            Partnership Programs
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{program.title}</h3>
                <p className="text-gray-300 mb-6">{program.description}</p>
                <ul className="space-y-3">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-[var(--background-light)] bg-opacity-70">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-[var(--text-primary)] bg-clip-text text-transparent">
            Benefits of Partnering With Us
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 px-6 text-center bg-[var(--light-bg)]/80 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold bg-white bg-clip-text text-transparent">
            Ready to Partner With Go Digital Africa?
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-var(--text-primary) leading-relaxed font-bold">
            Join our ecosystem of innovative partners driving digital transformation across Africa. Together, we can
            create impactful solutions and unlock new opportunities.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact-us" className="bg-white hover:from-blue-700 hover:to-blue-700 text-black px-8 py-4 rounded-full text-lg font-bold flex align-center justify-center">
              Apply for Partnership
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              variant="outline"
              className="border-2 border-white text-white hover:bg-purple-900/20 px-8 py-4 rounded-full text-lg font-bold flex align-center justify-center"
            >
              Download Partnership Guide
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default PartnershipSection

