"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Check,
  Star,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  TrendingUp,
  Users,
  Target,
  BarChart4,
  Award,
  Zap,
} from "lucide-react"
import { Link } from "react-router-dom"
import { ServiceSEO } from "../../../SEO";


const InfluencerMarketing = () => {
  const [activeTab, setActiveTab] = useState("micro")
  const [isVisible, setIsVisible] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  const platformIcons = {
    instagram: <Instagram className="w-6 h-6 text-pink-500" />,
    youtube: <Youtube className="w-6 h-6 text-red-500" />,
    twitter: <Twitter className="w-6 h-6 text-blue-400" />,
    facebook: <Facebook className="w-6 h-6 text-blue-600" />,
    linkedin: <Linkedin className="w-6 h-6 text-blue-700" />,
  }

  const influencerTypes = {
    micro: {
      title: "Micro-Influencer Campaigns",
      followers: "1K-10K followers",
      description: "Perfect for targeted local campaigns and authentic engagement with niche audiences across Africa.",
      benefits: [
        "Higher engagement rates",
        "More authentic connections",
        "Cost-effective campaigns",
        "Targeted local reach",
      ],
      icon: <Users className="w-12 h-12 text-purple-500" />,
    },
    mid: {
      title: "Mid-Tier Influencer Partnerships",
      followers: "10K-100K followers",
      description: "Ideal for regional brand awareness and engagement with growing audiences in specific markets.",
      benefits: [
        "Broader regional reach",
        "Strong community engagement",
        "Professional content creation",
        "Balanced cost and reach",
      ],
      icon: <Target className="w-12 h-12 text-blue-500" />,
    },
    premium: {
      title: "Premium Influencer Collaborations",
      followers: "100K+ followers",
      description: "Strategic partnerships with Africa's top voices for maximum brand exposure and credibility.",
      benefits: [
        "Massive audience reach",
        "Celebrity endorsement effect",
        "Cross-platform campaigns",
        "Premium content production",
      ],
      icon: <Award className="w-12 h-12 text-amber-500" />,
    },
  }

  const caseStudies = [
    {
      client: "AfriStyle Fashion",
      industry: "Retail",
      challenge: "Launching a new clothing line across East Africa",
      solution: "Micro-influencer campaign with 25 fashion influencers across Kenya, Tanzania, and Uganda",
      results: [
        "2.3x return on investment",
        "78% increase in website traffic",
        "156% boost in social media followers",
        "45% of campaign content repurposed for brand channels",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      client: "PayQuick",
      industry: "Fintech",
      challenge: "Increasing app downloads for a new mobile payment solution",
      solution: "Mid-tier influencer partnerships with financial content creators and tech reviewers",
      results: [
        "189% increase in app downloads",
        "Cost per acquisition reduced by 42%",
        "4.8/5 average app store rating",
        "Featured in 3 major tech publications",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      client: "TechPro Electronics",
      industry: "Consumer Electronics",
      challenge: "Building brand awareness for new smartphone accessories",
      solution: "Premium influencer collaboration with top tech YouTubers and Instagram creators",
      results: [
        "43% engagement rate on campaign content",
        "3.2M total impressions",
        "28% increase in direct sales",
        "Successful expansion into 2 new markets",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const pricingPackages = [
    {
      name: "Starter",
      price: "Ksh 150,000",
      period: "per month",
      description: "Perfect for small businesses looking to test influencer marketing",
      features: [
        "5-10 micro-influencers",
        "Single platform focus",
        "Basic campaign reporting",
        "Content rights for 3 months",
        "Campaign strategy development",
      ],
      popular: false,
    },
    {
      name: "Growth",
      price: "Ksh 250,000",
      period: "per month",
      description: "Ideal for established brands wanting to scale their influence",
      features: [
        "10-15 influencers (mix of micro and mid-tier)",
        "Multi-platform campaigns",
        "Comprehensive performance analytics",
        "Content rights for 6 months",
        "Influencer relationship management",
        "A/B testing for optimal results",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "Ksh 300,000",
      period: "per month",
      description: "For brands seeking maximum impact and premium partnerships",
      features: [
        "Custom influencer mix (including premium)",
        "Integrated cross-platform campaigns",
        "Advanced attribution modeling",
        "Unlimited content rights",
        "Dedicated campaign manager",
        "Crisis management protocols",
        "Competitor analysis",
      ],
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "How do you select the right influencers for our brand?",
      answer:
        "We use a proprietary vetting process that analyzes audience demographics, engagement quality, content authenticity, and brand alignment. We prioritize influencers with genuine engagement over those with inflated follower counts, ensuring your brand connects with real, interested audiences across Africa.",
    },
    {
      question: "How long does it take to see results from influencer marketing?",
      answer:
        "Initial results like engagement and reach are visible immediately, while conversion metrics typically emerge within 2-4 weeks. Long-term brand awareness benefits build over 3-6 months of consistent campaigns. We provide regular reporting to track all KPIs throughout your campaign lifecycle.",
    },
    {
      question: "Do you handle all aspects of the influencer relationship?",
      answer:
        "Yes, we manage the entire process from identification to final reporting. This includes influencer selection, negotiation, briefing, content approval, campaign monitoring, and performance analysis. Our team handles all communication and ensures deliverables meet your brand standards.",
    },
    {
      question: "How do you measure the ROI of influencer campaigns?",
      answer:
        "We track multiple metrics including engagement rates, reach, impressions, website traffic, conversion rates, and direct sales through unique tracking links and promo codes. Our advanced analytics platform attributes results across the customer journey, providing clear ROI measurements for your campaigns.",
    },
    {
      question: "Can we repurpose the content created by influencers?",
      answer:
        "Yes, all our packages include content rights for brand usage. The duration and scope of these rights vary by package level. This allows you to maximize your investment by repurposing high-quality influencer content across your marketing channels.",
    },
  ]

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="w-full overflow-hidden">
      <ServiceSEO service="influencerMarketing" />
      {/* Hero Section */}
      <section className="relative py-30 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--card-background)]"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay"></div>

        {/* <div className="absolute inset-0">
          <div className="h-full w-full flex">
            <div className="w-1/3 h-full bg-gradient-to-b from-pink-500/20 to-transparent"></div>
            <div className="w-1/3 h-full bg-gradient-to-b from-purple-500/10 to-transparent"></div>
            <div className="w-1/3 h-full bg-gradient-to-b from-blue-500/20 to-transparent"></div>
          </div>
        </div> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="block">Amplify Your Brand With</span>
              <span className="bg-clip-text text-transparent bg-[var(--text-primary)]">
                Africa's Top Influencers
              </span>
            </h1>

            <p className="text-xl text-white font-bold mb-8">
              Connect with authentic voices that resonate with your target audience across the continent and beyond.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.div
                className="flex items-center bg-slate-700 backdrop-blur-sm rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="w-5 h-5 text-pink-400 mr-2" />
                <span className="text-white">61% higher engagement than traditional ads</span>
              </motion.div>

              <motion.div
                className="flex items-center bg-slate-700  backdrop-blur-sm rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
              >
                <BarChart4 className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-white">92% of consumers trust influencer recommendations</span>
              </motion.div>

              <motion.div
                className="flex items-center bg-slate-700  backdrop-blur-sm rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white">11x higher ROI than traditional digital campaigns</span>
              </motion.div>
            </div>

            <Link
              to="/contact-us"
              className="inline-block bg-white text-black font-medium rounded-full px-8 py-4 text-lg transition-all hover:shadow-lg hover:shadow-purple-500/30"
            >
              Amplify Your Brand Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-[var(--background-light)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-secondary)] mb-6">Harness the Power of Authentic Voices</h2>
            <p className="text-xl text-[var(--text-secondary)] font-bold">
              At Go Digital Africa, we connect your brand with influential voices that authentically resonate with your
              target audience. Our data-driven approach ensures maximum impact and measurable results for your
              influencer marketing campaigns.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="bg-slate-900 rounded-xl shadow-xl p-8 border-t-4 border-pink-500" variants={fadeIn}>
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Increased Brand Awareness</h3>
              <p className="text-gray-200">
                Expand your reach across Africa with authentic voices that introduce your brand to new, engaged
                audiences who trust their recommendations.
              </p>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl shadow-xl p-8 border-t-4 border-purple-500" variants={fadeIn}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Enhanced Credibility & Trust</h3>
              <p className="text-gray-200">
                Leverage the established trust between influencers and their followers to build credibility for your
                brand in new and existing markets.
              </p>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl shadow-xl p-8 border-t-4 border-blue-500" variants={fadeIn}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Targeted Audience Reach</h3>
              <p className="text-gray-200">
                Connect with specific demographics, interests, and regions across Africa through carefully selected
                influencers who speak directly to your ideal customers.
              </p>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl shadow-xl p-8 border-t-4 border-indigo-500" variants={fadeIn}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Higher Engagement Rates</h3>
              <p className="text-gray-200">
                Generate meaningful interactions with your brand through authentic content that resonates with audiences
                and encourages action.
              </p>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl shadow-xl p-8 border-t-4 border-amber-500" variants={fadeIn}>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <BarChart4 className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Improved Conversion Rates</h3>
              <p className="text-gray-200">
                Transform awareness into action with influencer partnerships that drive measurable conversions, from
                website visits to direct sales.
              </p>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl shadow-xl p-8 border-t-4 border-teal-500" variants={fadeIn}>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Content Amplification</h3>
              <p className="text-gray-200">
                Extend the life and reach of your marketing content through authentic creator partnerships that generate
                shareable, repurposable assets.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-[var(--light-bg)]/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Strategic Approach</h2>
            <p className="text-xl text-gray-200">
              We tailor influencer campaigns to your specific goals, leveraging different tiers of influence to maximize
              impact and ROI.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row mb-8 gap-4">
            <div className="bg-slate-700 backdrop-blur-sm rounded-xl p-4 flex space-x-4">
              <button
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${activeTab === "micro" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "text-white/80 hover:bg-white/10"}`}
                onClick={() => setActiveTab("micro")}
              >
                Micro-Influencers
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${activeTab === "mid" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "text-white/80 hover:bg-white/10"}`}
                onClick={() => setActiveTab("mid")}
              >
                Mid-Tier Influencers
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${activeTab === "premium" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "text-white/80 hover:bg-white/10"}`}
                onClick={() => setActiveTab("premium")}
              >
                Premium Influencers
              </button>
            </div>
          </div>

          <motion.div
            className="bg-slate-800 backdrop-blur-sm rounded-xl p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={activeTab}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">{influencerTypes[activeTab].icon}</div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-white">{influencerTypes[activeTab].title}</h3>
                <p className="text-purple-300 mb-4 font-bold">{influencerTypes[activeTab].followers}</p>
                <p className="text-gray-100 font-bold mb-6">{influencerTypes[activeTab].description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {influencerTypes[activeTab].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-100 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {Object.entries(platformIcons).map(([platform, icon], index) => (
              <motion.div
                key={platform}
                className="bg-slate-900 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center"
                variants={fadeIn}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                {icon}
                <h4 className="mt-4 capitalize text-white font-bold">{platform}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Campaign Process Section */}
      <section className="py-20 bg-[var(--background-light)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-secondary)] mb-6">Our Campaign Process</h2>
            <p className="text-xl text-[var(--text-secondary)] font-bold">
              We follow a proven methodology to ensure your influencer campaigns deliver maximum impact and measurable
              results.
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Steps */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[var(--text-primary)] transform -translate-x-1/2"></div>

            <motion.div
              className="space-y-24"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Step 1 */}
              <motion.div className="relative" variants={fadeIn}>
                <div className="hidden md:block absolute left-1/2 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transform -translate-x-1/2 shadow-lg shadow-purple-500/30"></div>

                <div className="md:w-5/12 md:ml-auto md:pl-16">
                  <div className="bg-slate-900 rounded-xl shadow-xl p-8">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                      <span className="text-xl font-bold text-purple-600">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Strategy Development</h3>
                    <p className="text-gray-200 mb-4">
                      We begin by understanding your brand, goals, and target audience to develop a customized
                      influencer strategy that aligns with your business objectives.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Define campaign objectives and KPIs</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Identify target audience segments</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Develop campaign messaging and themes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div className="relative" variants={fadeIn}>
                <div className="hidden md:block absolute left-1/2 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transform -translate-x-1/2 shadow-lg shadow-purple-500/30"></div>

                <div className="md:w-5/12 md:mr-auto md:pr-16">
                  <div className="bg-slate-900 rounded-xl shadow-xl p-8">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                      <span className="text-xl font-bold text-purple-600">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Influencer Identification</h3>
                    <p className="text-gray-200 mb-4">
                      Our data-driven approach identifies the perfect influencers who align with your brand values and
                      have authentic connections with your target audience.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Analyze audience demographics and psychographics</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Verify engagement authenticity and quality</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Assess brand alignment and content style</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div className="relative" variants={fadeIn}>
                <div className="hidden md:block absolute left-1/2 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transform -translate-x-1/2 shadow-lg shadow-purple-500/30"></div>

                <div className="md:w-5/12 md:ml-auto md:pl-16">
                  <div className="bg-slate-900 rounded-xl shadow-xl p-8">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                      <span className="text-xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Campaign Execution</h3>
                    <p className="text-gray-200 mb-4">
                      We manage all aspects of campaign implementation, from influencer briefing to content approval and
                      publication scheduling.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Comprehensive influencer briefing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Content review and approval process</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Strategic content publishing schedule</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div className="relative" variants={fadeIn}>
                <div className="hidden md:block absolute left-1/2 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transform -translate-x-1/2 shadow-lg shadow-purple-500/30"></div>

                <div className="md:w-5/12 md:mr-auto md:pr-16">
                  <div className="bg-slate-900 rounded-xl shadow-xl p-8">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                      <span className="text-xl font-bold text-purple-600">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Performance Analysis</h3>
                    <p className="text-gray-200 mb-4">
                      We provide comprehensive reporting and analysis to measure campaign performance against your KPIs
                      and extract actionable insights.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Real-time campaign monitoring</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">Detailed performance analytics</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-200">ROI calculation and optimization recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-[var(--background)]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Success Stories</h2>
            <p className="text-xl text-gray-100 py-5 font-bold mb-5">
              See how our influencer marketing strategies have helped brands across Africa achieve remarkable results.
            </p>
            <Link to="/work/case-study" className="bg-white hover:from-blue-300 hover:to-blue-400 text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-[1.02]">
           Case Studies
          </Link>
          </motion.div>
        </div>

      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[var(--background-light)] text-[var(--text-primary)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">Influencer Marketing Packages</h2>
            <p className="text-xl text-[var(--text-primary)] font-bold">
              Choose the perfect package to amplify your brand's presence across Africa.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`rounded-xl overflow-hidden ${pkg.popular ? "transform md:-translate-y-4" : ""}`}
                variants={fadeIn}
              >
                <div
                  className={`relative ${pkg.popular ? "bg-slate-900 text-white" : "bg-slate-900 text-gray-100"}`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="flex items-end mb-6">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className={`ml-2 ${pkg.popular ? "text-white/80" : "text-gray-300"}`}>{pkg.period}</span>
                    </div>
                    <p className={`mb-6 ${pkg.popular ? "text-white/90" : "text-gray-100"}`}>{pkg.description}</p>
                  </div>
                </div>
                <div
                  className={`p-8 ${pkg.popular ? "bg-white/50 border-2 border-t-0 border-purple-200 rounded-b-xl" : "bg-white"}`}
                >
                  <ul className="space-y-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check
                          className={`w-5 h-5 mr-2 mt-0.5 ${pkg.popular ? "text-purple-600" : "text-green-500"}`}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      to="/proposal-request"
                      className={`block text-center py-3 px-6 rounded-lg font-medium transition-all ${
                        pkg.popular
                          ? "bg-gray-800 text-white hover:shadow-lg hover:shadow-purple-500/30"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="text-center bg-slate-700 p-8 rounded-2xl backdrop-blur-sm border border-blue-500">
                          <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Influencer Marketing?</h3>
                            Let Go Digital Africa's expert team create and manage high-performing influencer campaigns that drive real business results across Africa.
                          <h3 className="text-2xl font-bold text-white mb-4">Custom Enterprise Solution</h3>
                          <p className="text-slate-300 mb-6">
                            Need a comprehensive Influencer marketing strategy for your brand? Our custom packages start at <span className="text-white font-bold">Ksh 500,000+</span> and include advanced targeting, account-based marketing strategies, and dedicated campaign management.
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

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--light-bg)]/80 t-ext-[var(--text-primary)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our influencer marketing services.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto divide-y divide-gray-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} className="py-6" variants={fadeIn}>
                <button className="flex justify-between items-center w-full text-left" onClick={() => toggleFaq(index)}>
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === index ? "transform rotate-90" : ""}`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="mt-4 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--card-background)] to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Amplify Your Brand with Africa's Top Influencers?
            </h2>
            <p className="text-xl text-gray-100 font-bold mb-8">
              Partner with Go Digital Africa to create authentic connections with your target audience through strategic
              influencer collaborations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/proposal-request"
                className="bg-white text-black font-medium rounded-full px-8 py-4 text-lg transition-all hover:shadow-lg hover:shadow-purple-500/30"
              >
                Start Your Campaign
              </Link>
              <Link
                to="/work/case-study"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white font-medium rounded-full px-8 py-4 text-lg transition-all hover:bg-white/20"
              >
                View More Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default InfluencerMarketing

