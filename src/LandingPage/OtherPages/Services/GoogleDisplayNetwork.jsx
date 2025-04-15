"use client"
import { motion } from "framer-motion"
import {
  Globe,
  Target,
  DollarSign,
  Users,
  BarChart,
  Image,
  Smartphone,
  Zap,
  HelpCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import google from "../../../assets/Google-display-network.jpeg"
import { Link } from "react-router-dom";
import { ServiceSEO } from "../../../SEO";

const GoogleDisplayNetwork = () => {
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="googleDisplayNetwork" />
      <div className="bg-[var(--card-background)] min-h-screen font-sans">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-[var(--card-background)]"
        >
          {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-800/90 backdrop-blur-sm"></div> */}

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center items-center"
            >
              <Globe className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl font-extrabold"
            >
              <span className="text-white">
                Google Display Network
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-lg max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed"
            >
              Maximize your brand's visibility with strategic display ads across Google's vast network of over 2 million
              websites, reaching your ideal customers wherever they browse online.
            </motion.p>
            <Link to="/proposal-request">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:from-gray-400 hover:to-gray-400 transition duration-300 shadow-lg flex items-center gap-2"
            >
              Start Advertising Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--background-light)] backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-[var(--text-primary)]">
                Benefits of Google Display Ads
              </span>
            </motion.h2>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-10 h-10 text-white" />,
                  title: "Massive Reach",
                  description:
                    "Access to over 2 million websites and apps in Google's Display Network, reaching 90% of internet users worldwide.",
                },
                {
                  icon: <Target className="w-10 h-10 text-white" />,
                  title: "Precise Targeting",
                  description:
                    "Target users based on demographics, interests, behaviors, and even specific websites they visit.",
                },
                {
                  icon: <DollarSign className="w-10 h-10 text-white" />,
                  title: "Cost-Effective",
                  description:
                    "Pay only for results with flexible pricing models including cost-per-click (CPC) and cost-per-thousand impressions (CPM).",
                },
                {
                  icon: <Users className="w-10 h-10 text-white" />,
                  title: "Audience Retargeting",
                  description: "Re-engage visitors who have previously interacted with your website but didn't convert.",
                },
                {
                  icon: <BarChart className="w-10 h-10 text-white" />,
                  title: "Detailed Analytics",
                  description: "Access comprehensive performance data to optimize campaigns and maximize ROI.",
                },
                {
                  icon: <Image className="w-10 h-10 text-white" />,
                  title: "Visual Engagement",
                  description: "Capture attention with compelling visual ads that communicate your message instantly.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
                >
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-400 mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Our Approach Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--background-light)]/80"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-[var(--text-primary)]">
                Our Strategic Approach
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeIn} className="order-2 md:order-1">
                <h3 className="text-3xl font-semibold text-[var(--text-primary)] mb-6">How We Maximize Your Display Ad Performance</h3>
                <ul className="space-y-4">
                  {[
                    "Custom audience targeting based on your ideal customer profile",
                    "Strategic ad placement on relevant websites in your industry",
                    "Compelling visual creative that captures attention and drives action",
                    "Continuous A/B testing to optimize performance",
                    "Regular campaign analysis and refinement",
                    "Transparent reporting with actionable insights",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 font-medium"
                    >
                      <Zap className="w-5 h-5 text-blue-800 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="order-1 md:order-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img
                    src={google}
                    alt="google ads"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
                    <p className="p-4 text-sm text-gray-300">
                      Our custom dashboard provides real-time insights into your campaign performance
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Ad Format Types */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--background-light)]"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-[var(--text-primary)]">
                Ad Formats We Optimize
              </span>
            </motion.h2>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Image className="w-10 h-10 text-blue-400" />,
                  title: "Responsive Display Ads",
                  description: "Automatically adjust to fit available ad spaces and look native on any website.",
                },
                {
                  icon: <Smartphone className="w-10 h-10 text-blue-400" />,
                  title: "Mobile App Ads",
                  description: "Reach users while they're using their favorite mobile applications.",
                },
                {
                  icon: <Globe className="w-10 h-10 text-blue-400" />,
                  title: "Gmail Ads",
                  description: "Appear at the top of users' Gmail inbox tabs for maximum visibility.",
                },
              ].map((format, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
                >
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {format.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-400 mb-3">{format.title}</h3>
                  <p className="text-gray-300">{format.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

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
                Google Display Network Packages
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto font-bold">
                Flexible pricing options designed to maximize your display advertising impact.
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
                  price: "Ksh 30,000",
                  description: "Essential display advertising for small businesses",
                  features: [
                    "Campaign setup & optimization",
                    "Basic audience targeting",
                    "Standard banner ads",
                    "Monthly performance reports",
                    "Up to 3 ad variations"
                  ],
                  popular: false
                },
                {
                  title: "Standard",
                  price: "Ksh 40,000",
                  description: "Comprehensive display strategy for growing businesses",
                  features: [
                    "Everything in Basic",
                    "Advanced audience targeting",
                    "Responsive display ads",
                    "Remarketing campaigns",
                    "Bi-weekly optimization",
                    "A/B testing"
                  ],
                  popular: true
                },
                {
                  title: "Premium",
                  price: "Ksh 50,000",
                  description: "Advanced display campaigns for established brands",
                  features: [
                    "Everything in Standard",
                    "Custom audience creation",
                    "All ad formats",
                    "Video display ads",
                    "Weekly performance calls",
                    "Cross-device targeting",
                    "Custom analytics dashboard"
                  ],
                  popular: false
                },
                {
                  title: "Custom",
                  price: "Ksh 60,000+",
                  description: "Enterprise-level display solutions tailored to your specific needs",
                  features: [
                    "Everything in Premium",
                    "Dedicated account manager",
                    "Multi-language campaigns",
                    "Programmatic ad buying",
                    "Advanced brand safety measures",
                    "Priority support",
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
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--background-light)]/80"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-[var(--text-primary)]">
                Frequently Asked Questions
              </span>
            </motion.h2>

            <motion.div variants={staggerContainer} className="space-y-8">
              {[
                {
                  question: "What is the Google Display Network?",
                  answer:
                    "The Google Display Network (GDN) is a vast collection of over 2 million websites, videos, and apps where your ads can appear. It reaches over 90% of internet users worldwide, allowing you to connect with potential customers as they browse their favorite websites, watch YouTube videos, check Gmail, or use mobile apps.",
                },
                {
                  question: "How much does it cost to advertise on the Google Display Network?",
                  answer:
                    "Display advertising costs vary based on your targeting, industry, and competition. With Go Digital Africa, you can start with budgets as low as $10 per day. We offer flexible pricing models including cost-per-click (CPC) and cost-per-thousand impressions (CPM), allowing you to choose what works best for your business goals.",
                },
                {
                  question: "How do you target the right audience with display ads?",
                  answer:
                    "We use a combination of targeting methods including demographics (age, gender, income), interests (what users are passionate about), in-market audiences (actively researching products), affinity audiences (lifestyle and habits), and remarketing (previous website visitors). We also implement contextual targeting to place your ads on websites relevant to your business.",
                },
                {
                  question: "How long does it take to see results from display advertising?",
                  answer:
                    "Initial results can be seen within the first week as your ads begin to generate impressions and clicks. However, for meaningful conversion data and ROI analysis, we recommend running campaigns for at least 30-60 days. This allows for proper optimization and refinement based on performance data.",
                },
                {
                  question: "Can I see where my ads are being displayed?",
                  answer:
                    "Yes, we provide complete transparency with detailed placement reports showing exactly which websites, apps, and videos your ads appear on. You can exclude any placements that don't align with your brand, and we can optimize toward the best-performing placements.",
                },
                {
                  question: "How do you measure the success of display ad campaigns?",
                  answer:
                    "We track multiple metrics including impressions, clicks, click-through rate (CTR), conversions, cost-per-acquisition (CPA), and return on ad spend (ROAS). We also implement view-through conversion tracking to measure when users see your ad but convert later through another channel, giving you a complete picture of campaign performance.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
                >
                  <div className="flex gap-4">
                    <HelpCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-24 px-6 text-center bg-[var(--background-light)] relative overflow-hidden"
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-clip-text text-transparent bg-[var(--text-primary)]">
                Boost Your Brand Visibility Today
              </span>
            </motion.h2>

            <motion.p variants={fadeIn} className="text-lg max-w-3xl mx-auto text-[var(--text-primary)] leading-relaxed mb-8 font-medium">
              Let our team of Google Display Network experts create a custom strategy that puts your brand in front of the
              right audience at the right time. Get started with a free consultation and campaign analysis.
            </motion.p>
            <Link to="/proposal-request">
            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-full text-lg font-bold hover:from-cyan-700 hover:to-blue-800 transition duration-300 shadow-lg flex items-center gap-2 mx-auto"
            >
              Get a Proposal
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default GoogleDisplayNetwork

