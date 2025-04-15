import React from "react";
import { motion } from "framer-motion";
import { Youtube, Play, Clock, SkipForward, Users, BarChart, Target, DollarSign, LineChart, Zap, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';
import {Link} from "react-router-dom";
import { ServiceSEO } from "../../../SEO";

const YouTubeAds = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
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

  return (
    <div className="bg-[var(--card-background)]/60 text-white min-h-screen font-sans py-10">
      <ServiceSEO service="youtubeAds" />
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center py-20 px-6 flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center mb-6">
          <Youtube className="w-12 h-12 text-red-500 mr-3" />
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-white">
            YouTube Ads Marketing
          </h1>
        </div>
        <p className="mt-6 text-lg max-w-3xl text-[var(--text-secondary)] font-bold leading-relaxed">
          Harness the power of YouTube Ads to boost brand awareness, drive conversions, and engage your audience with high-impact video campaigns tailored for the African market.
        </p>
        <Link to="/contact-us">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition duration-300 flex items-center"
        >
          Get Started Today
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
        </Link>
      </motion.section>

      {/* Video Types Section */}
      <section className="bg-[var(--background-light)] backdrop-blur-sm py-16 px-6 border-t border-b border-[var(--card-background)]/20">


        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-secondary)] mb-12">
            Types of YouTube Ads
          </h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-8"
          >
            <motion.div 
              variants={fadeIn}
              className="bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <SkipForward className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-semibold text-white">Skippable In-Stream Ads</h3>
              </div>
              <p className="mt-3 text-gray-100 font-medium">
                Viewers can skip after 5 seconds. Great for driving conversions and brand awareness with longer, story-driven content.
              </p>
              <div className="mt-6 rounded-lg overflow-hidden shadow-lg shadow-purple-500/10">
                <iframe 
                  className="w-full aspect-video rounded-lg" 
                  src="https://www.youtube.com/watch?v=IhhjcB2ZjIM" 
                  title="Skippable Ad Example" 
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <p className="mt-4 text-sm text-gray-100 italic">
                Recommended: For better examples, consider using Google's own YouTube ads showcase videos
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-semibold text-white">Non-Skippable Ads</h3>
              </div>
              <p className="mt-3 text-gray-100 font-medium">
                Short, impactful videos of 15 seconds or less that ensure full ad exposure, perfect for concise messaging.
              </p>
              <div className="mt-6 rounded-lg overflow-hidden shadow-lg shadow-purple-500/10">
                <iframe 
                  className="w-full aspect-video rounded-lg" 
                  src="https://youtu.be/kB_VO8XMOsQ?si=gUXr0UnMJb5a2TMT" 
                  title="Non-Skippable Ad Example" 
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <p className="mt-4 text-sm text-gray-100 italic">
                Recommended: For better examples, consider using concise, high-impact ads from major brands
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[var(--background-light)]/80 py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-primary)] mb-12">
            Benefits of YouTube Ads
          </h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mt-12"
          >
            {[
              { 
                icon: <Users className="w-10 h-10 text-white" />,
                title: "Massive Reach", 
                desc: "Target millions of potential customers across Africa and worldwide." 
              },
              { 
                icon: <Play className="w-10 h-10 text-white" />,
                title: "Engaging Content", 
                desc: "Video ads capture attention better than static ads, increasing brand recall." 
              },
              { 
                icon: <DollarSign className="w-10 h-10 text-white" />,
                title: "Cost-Effective", 
                desc: "Only pay when users watch or interact with your ads, optimizing your budget." 
              },
              { 
                icon: <Target className="w-10 h-10 text-white" />,
                title: "Precision Targeting", 
                desc: "Leverage Google's AI to reach the right audience based on demographics and interests." 
              },
              { 
                icon: <BarChart className="w-10 h-10 text-white" />,
                title: "Measurable Results", 
                desc: "Track and optimize ad performance in real-time with comprehensive analytics." 
              },
              { 
                icon: <Zap className="w-10 h-10 text-white" />,
                title: "Flexible Ad Formats", 
                desc: "Choose from skippable, non-skippable, bumper ads and more to suit your goals." 
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-100 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Our Approach Section */}
      <section className="bg-[var(--background-light)] backdrop-blur-sm py-20 px-6 border-t border-b border-purple-500/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-primary)] mb-12">
            Our YouTube Ads Approach
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.ul className="space-y-6">
                {[
                  "Audience research and precise targeting",
                  "Compelling creative development tailored to African markets",
                  "Strategic campaign structure and bidding",
                  "Continuous optimization and A/B testing",
                  "Comprehensive performance tracking and reporting"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <Zap className="w-5 h-5 text-blue-800 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-[var(--text-primary)] foont-bold">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
              <LineChart className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">Performance-Driven Results</h3>
              <p className="text-gray-100 mb-4 font-medium">
                Our YouTube ad campaigns consistently deliver:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/80 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-300">30%+</p>
                  <p className="text-sm text-gray-100 font-bold">Higher Engagement</p>
                </div>
                <div className="bg-gray-800/80 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-300">25%+</p>
                  <p className="text-sm text-gray-100 font-bold">Lower CPM</p>
                </div>
                <div className="bg-gray-800/80 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-300">40%+</p>
                  <p className="text-sm text-gray-100 font-bold">Brand Recall</p>
                </div>
                <div className="bg-gray-800/80 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-300">3.5x</p>
                  <p className="text-sm text-gray-100 font-bold">ROI Average</p>
                </div>
              </div>
            </div>
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
              YouTube Advertising Packages
            </h2>
            <p className="text-lg text-white max-w-3xl mx-auto font-bold">
              Choose the perfect package to reach African audiences through targeted video campaigns.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Basic",
                price: "Ksh 35,000",
                description: "Essential YouTube advertising for businesses new to video marketing",
                features: [
                  "Campaign setup & optimization",
                  "Basic audience targeting",
                  "Ad creative consultation",
                  "Monthly performance reports",
                  "Up to 2 ad formats"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 45,000",
                description: "Comprehensive YouTube strategy for growing businesses",
                features: [
                  "Everything in Basic",
                  "Advanced audience targeting",
                  "A/B testing",
                  "Bi-weekly optimization",
                  "Up to 3 ad formats",
                  "Competitor analysis"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 55,000",
                description: "Advanced YouTube campaigns for maximum brand impact",
                features: [
                  "Everything in Standard",
                  "Custom audience creation",
                  "Weekly performance calls",
                  "Advanced attribution modeling",
                  "All YouTube ad formats",
                  "Cross-platform strategy integration"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 80,000+",
                description: "Enterprise-level YouTube campaigns tailored to your specific needs",
                features: [
                  "Everything in Premium",
                  "Dedicated account manager",
                  "Video production consultation",
                  "YouTube channel optimization",
                  "Custom reporting dashboard",
                  "Priority support & strategy sessions"
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
      <section className="bg-[var(--backgrund-light)] py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-primary)] mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How much does YouTube advertising cost?",
                answer: "YouTube advertising costs vary based on targeting, competition, and campaign goals. With Go Digital Africa, you can start with budgets as low as $10 per day, with most of our clients seeing optimal results in the $500-$2,000 monthly range."
              },
              {
                question: "How long does it take to see results from YouTube ads?",
                answer: "While you'll see data immediately, meaningful results typically emerge within 2-4 weeks as we optimize campaigns. This allows us to gather sufficient data, test different audiences, and refine your targeting for maximum performance."
              },
              {
                question: "What metrics should I track for YouTube ad success?",
                answer: "Key metrics include view rate, watch time, click-through rate (CTR), cost per view (CPV), and conversion rate. We'll help you focus on the metrics that align with your specific business goals and campaign objectives."
              },
              {
                question: "Can you target specific African countries or regions?",
                answer: "We can target specific countries, regions, cities, and even radius-based targeting around specific locations across Africa and globally, ensuring your ads reach the most relevant audience for your business."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
              >
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-white mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white/80 mb-2 font-bold">{item.question}</h3>
                    <p className="text-gray-100 font-medium">{item.answer}</p>
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
        className="py-20 px-6 text-center bg-[var(--background-light)]"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-[var(--text-primary)] drop-shadow-lg mb-6">
          Start Your YouTube Ad Campaign Today
        </h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-[var(--text-primary)] leading-relaxed font-bold">
          Let us help you craft a high-performing YouTube Ads strategy that drives real results for your business in the African market. Get in touch now!
        </p>
        <Link to="/proposal-request">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-bold hover:shadow-lg hover:shadow-purple-500/30 transition duration-300 flex items-center mx-auto"
        >
          Get a Proposal
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
        </Link>
      </motion.section>


    </div>
  );
};

export default YouTubeAds;
