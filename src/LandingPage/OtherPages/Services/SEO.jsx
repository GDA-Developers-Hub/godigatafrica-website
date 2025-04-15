"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart,
  TrendingUp,
  Users,
  Search,
  Globe,
  ShoppingCart,
  Video,
  FileText,
  Settings,
  Link as LinkIcon,
  Map,
  CheckCircle,
} from "lucide-react";
import seo from "../../../assets/seo.jpg";
import { ServiceSEO } from "../../../SEO";

export default function SEOServices() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="seo" />
      <HeroSection />
      <WhyInvestSection />
      <ServicesSection />
      <PricingSection />
      <ReferralProgramSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative py-30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background-light)] to-[var(--background)]" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Search Engine{" "}
              <span className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--logo-bg)] to-blue-400">
                Optimization
              </span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed">
              Go Digital Africa, we specialize in driving unparalleled success for businesses through cutting-edge SEO
              strategies. In today's competitive digital landscape, a strong online presence is essential for attracting
              and retaining customers. Our expert team is dedicated to optimizing your website's visibility, increasing
              organic traffic, and boosting your overall online performance.
            </p>
            <Link to="/proposal-request" className="bg-gradient-to-r from-blue-500 w-[200px] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-black border-0 rounded-full flex items-center group px-7 py-4
">
              GET A QUOTE
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <img
                src={seo}
                alt="SEO Illustration"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyInvestSection() {
  const benefits = [
    {
      title: "Boost Website Traffic",
      description:
        "Attract a consistent stream of potential customers actively searching for your products or services.",
      icon: BarChart,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Increase Leads & Sales",
      description:
        "Turn Google into your 24/7 sales engine, delivering a steady flow of leads and sales daily without ongoing costs or effort.",
      icon: TrendingUp,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Cost-Effective Growth",
      description:
        "Enjoy continuous organic (free) traffic and results without ongoing investment making SEO the most cost-effective, long-term marketing strategy.",
      icon: TrendingUp,
      color: "from-rose-500 to-red-500",
    },
    {
      title: "Build Credibility & Trust",
      description:
        "Secure top positions in search engine results to position your brand as a trusted industry leader and outshine competitors.",
      icon: Users,
      color: "from-red-500 to-orange-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background-light)] to-[var(--background)]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Why Invest in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--logo-bg)] to-blue-600">
              SEO?
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--logo-bg)] to-blue-600 mx-auto mb-8 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl bg-slate-700 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${benefit.color} bg-opacity-10 mb-6 inline-block`}
              >
                <benefit.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                {benefit.title}
              </h3>

              <p className="text-slate-300 group-hover:text-white/80 transition-colors duration-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Keyword Research",
      description: "Utilizing advanced tools, we identify keywords that will drive visitors to your website.",
      icon: Search,
    },
    {
      title: "On-Page SEO",
      description: "Optimize your website content, meta tags, images and internal linking to enhance relevance.",
      icon: Settings,
    },
    {
      title: "Off-Page SEO",
      description: "Build quality backlinks and improve domain authority through strategic outreach.",
      icon: LinkIcon,
    },
    {
      title: "Technical SEO",
      description: "Improve site speed, mobile responsiveness, and crawlability for better rankings.",
      icon: Settings,
    },
    {
      title: "International SEO",
      description: "Target multiple countries with region-specific content and search engine optimization.",
      icon: Globe,
    },
    {
      title: "Local SEO",
      description: "Optimize for local search results and improve visibility in your target area.",
      icon: Map,
    },
    {
      title: "E-Commerce SEO",
      description: "Optimize product pages and category structures for better visibility in shopping searches.",
      icon: ShoppingCart,
    },
    {
      title: "Video SEO",
      description: "Optimize video content for better visibility on YouTube and Google search results.",
      icon: Video,
    },
    {
      title: "Content Writing",
      description: "Create engaging, keyword-optimized content that resonates with your audience.",
      icon: FileText,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--background-light)]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">
            Our SEO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--logo-bg)] to-blue-600">
              Services
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--logo-bg)] to-blue-600 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Our comprehensive SEO framework is designed to help businesses rank higher, attract quality traffic, and
            achieve measurable results. We tailor strategies to fit your unique business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl bg-[var(--card-background)] backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-gradient-to-r from-white to-[var(--logo-bg)] bg-opacity-10 mb-6 inline-block">
                <service.icon className="h-6 w-6 text-[var(--text-primary)] font-bold" />
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-white font-medium group-hover:text-white/80 transition-colors duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
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
      title: "Basic",
      price: "Ksh 45,000",
      description: "Essential SEO for small businesses looking to establish online presence",
      features: [
        "Keyword research & analysis",
        "On-page SEO optimization",
        "Technical SEO audit",
        "Monthly performance reports",
        "Google My Business optimization"
      ],
      popular: false
    },
    {
      title: "Standard",
      price: "Ksh 65,000",
      description: "Comprehensive SEO strategy for growing businesses",
      features: [
        "Everything in Basic",
        "Advanced keyword research",
        "Content optimization",
        "Competitor analysis",
        "Link building strategy",
        "Bi-weekly performance reports"
      ],
      popular: true
    },
    {
      title: "Premium",
      price: "Ksh 85,000",
      description: "Enterprise-level SEO for maximum online visibility and growth",
      features: [
        "Everything in Standard",
        "Advanced technical SEO",
        "Content creation & strategy",
        "Authority link building",
        "Weekly performance reports",
        "Conversion rate optimization",
        "Priority support"
      ],
      popular: false
    }
  ];

  return (
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
            SEO Service Packages
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto font-bold">
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
            Need a tailored SEO solution for your enterprise? We offer custom SEO packages starting at Ksh 120,000, designed specifically for your business goals and challenges.
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
  );
}

function ReferralProgramSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="w-full max-w-[1600px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            SEO Referral Program
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto font-bold">
            Earn rewards by referring businesses to our SEO services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-700 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">How It Works</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Refer a Business</h4>
                  <p className="text-gray-300">Share your unique referral code with businesses that could benefit from our SEO services.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">They Sign Up</h4>
                  <p className="text-gray-300">When they sign up for any of our SEO packages using your code, we'll track the referral.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Earn Rewards</h4>
                  <p className="text-gray-300">You'll receive a commission based on the package they choose, paid directly to you each month.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-700 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Referral Rewards</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                <span className="text-white font-medium">Basic Package</span>
                <span className="text-lg font-bold text-blue-400">Ksh 10,000</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                <span className="text-white font-medium">Standard Package</span>
                <span className="text-lg font-bold text-blue-400">Ksh 15,000</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                <span className="text-white font-medium">Premium Package</span>
                <span className="text-lg font-bold text-blue-400">Ksh 20,000</span>
              </div>
              
              <div className="flex items-center justify-between pb-4">
                <span className="text-white font-medium">Enterprise Solutions</span>
                <span className="text-lg font-bold text-blue-400">12% Commission</span>
              </div>
            </div>
            
            <Link onClick={() => alert("This feature is not available yet")}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-[var(--logo-bg)] to-blue-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join Referral Program
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-700 p-6 rounded-xl mt-10 max-w-3xl mx-auto text-center"
        >
          <h4 className="text-xl font-semibold text-white mb-2">Already part of our referral program?</h4>
          <p className="text-gray-300 mb-4">Track your referrals and commissions by logging into your referral dashboard.</p>
          <Link onClick={() => alert("This feature is not available yet")}>
            <button className="px-8 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-medium rounded-full transition-all duration-300">
              Referral Login
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

