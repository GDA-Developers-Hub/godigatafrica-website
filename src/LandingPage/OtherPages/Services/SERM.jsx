"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ServiceSEO } from "../../../SEO";
import {
  Shield,
  Search,
  Award,
  ThumbsUp,
  TrendingUp,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Package,
  BarChart,
  ArrowRight,
  HelpCircle,
  Layers,
  Monitor,
  FileText,
  Bell,
  MessageSquare,
  CheckCircle,
} from "lucide-react"

const SERM = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className=" text-white min-h-screen font-sans">
      <ServiceSEO service="serm" />
      {/* Hero Section */}
      <section className="text-center py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-[var(--card-background)]">
        {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-blue-200 backdrop-blur-sm"></div> */}

        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="text-white mr-3 h-12 w-12" />
            <Search className="text-white h-12 w-12" />
          </div>
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-white drop-shadow-lg">
            Search Engine Reputation Management
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed">
            Protect and enhance your brand's digital presence across Africa with our comprehensive SERM strategies. We
            help businesses maintain a positive online reputation that builds trust and drives growth.
          </p>
          <Link to="/proposal-request">
          <motion.button
            className="mt-8 px-6 py-3 bg-white text-black rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Protect Your Reputation <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[var(--background-light)]/80 py-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-[var(--text-primary)]">
            Benefits of SERM
          </h2>
          <p className="text-center text-[var(--text-primary)] font-bold max-w-3xl mx-auto mb-12">
            In today's digital landscape, your online reputation can make or break your business. Here's how our SERM
            services can help:
          </p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <Award className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Build Trust & Credibility</h3>
            <p className="mt-3 text-white">
              Establish trust with African consumers through a strong, positive online presence that showcases your
              reliability and expertise.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <ThumbsUp className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Increase Positive Reviews</h3>
            <p className="mt-3 text-white">
              Implement strategic review management systems that encourage satisfied customers to share their positive
              experiences.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <TrendingUp className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Improve Search Rankings</h3>
            <p className="mt-3 text-white">
              Enhance your visibility in African search engines by promoting positive content that ranks higher in
              search results.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <AlertTriangle className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Crisis Management</h3>
            <p className="mt-3 text-white">
              Quickly address negative publicity with our rapid response protocols designed specifically for the African
              market context.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <Eye className="text-whiteh-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Enhance Brand Awareness</h3>
            <p className="mt-3 text-white">
              Control how your brand is perceived online across multiple African countries and language markets.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <Monitor className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Continuous Monitoring</h3>
            <p className="mt-3 text-white">
              Stay ahead of reputation threats with our 24/7 monitoring systems that track mentions across African
              digital platforms.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our SERM Process */}
      <section className="py-20 px-6 bg-[var(--light-bg)]/80">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-[var(--text-primary)]">
            Our SERM Process
          </h2>
          <p className="text-center font-bold text-[var(--text-primary)] max-w-3xl mx-auto mb-12">
            Go Digital Africa follows a proven methodology to build and maintain your online reputation:
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-purple-600 hidden md:block"></div>

            {/* Process Steps */}
            <motion.div
              className="grid md:grid-cols-2 gap-8 relative"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Step 1 */}
              <motion.div className="md:text-right md:pr-12 md:col-start-1" variants={fadeIn}>
                <div className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300">
                  <div className="flex items-center md:justify-end mb-4">
                    <h3 className="text-2xl font-semibold text-white mr-3">Reputation Audit</h3>
                    <Search className="text-white h-8 w-8 flex-shrink-0" />
                  </div>
                  <p className="text-white">
                    We conduct a comprehensive analysis of your current online reputation across African search engines
                    and review platforms to identify strengths and areas for improvement.
                  </p>
                </div>
                <div className="hidden md:block absolute right-0 top-[10%] w-4 h-4 rounded-full bg-cyan-400 transform translate-x-[50%]"></div>
              </motion.div>

              <div className="md:col-start-2 md:pl-12"></div>

              {/* Step 2 */}
              <div className="md:col-start-1 md:pr-12"></div>

              <motion.div className="md:text-left md:pl-12 md:col-start-2" variants={fadeIn}>
                <div className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <FileText className="text-white h-8 w-8 flex-shrink-0 mr-3" />
                    <h3 className="text-2xl font-semibold text-white">Strategy Development</h3>
                  </div>
                  <p className="text-white">
                    We create a tailored SERM strategy that addresses your specific needs, considering the unique
                    aspects of African digital landscapes and cultural contexts.
                  </p>
                </div>
                <div className="hidden md:block absolute left-0 top-[35%] w-4 h-4 rounded-full bg-blue-400 transform translate-x-[-50%]"></div>
              </motion.div>

              {/* Step 3 */}
              <motion.div className="md:text-right md:pr-12 md:col-start-1" variants={fadeIn}>
                <div className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300">
                  <div className="flex items-center md:justify-end mb-4">
                    <h3 className="text-2xl font-semibold text-white mr-3">Implementation</h3>
                    <Layers className="text-white h-8 w-8 flex-shrink-0" />
                  </div>
                  <p className="text-white">
                    Our team executes the strategy through content creation, review management, and strategic
                    partnerships with African media outlets and influencers.
                  </p>
                </div>
                <div className="hidden md:block absolute right-0 top-[60%] w-4 h-4 rounded-full bg-cyan-400 transform translate-x-[50%]"></div>
              </motion.div>

              <div className="md:col-start-2 md:pl-12"></div>

              {/* Step 4 */}
              <div className="md:col-start-1 md:pr-12"></div>

              <motion.div className="md:text-left md:pl-12 md:col-start-2" variants={fadeIn}>
                <div className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Bell className="text-whiteh-8 w-8 flex-shrink-0 mr-3" />
                    <h3 className="text-2xl font-semibold text-white">Monitoring & Maintenance</h3>
                  </div>
                  <p className="text-white">
                    We continuously monitor your online reputation and make adjustments to ensure long-term positive
                    perception across African digital platforms.
                  </p>
                </div>
                <div className="hidden md:block absolute left-0 top-[85%] w-4 h-4 rounded-full bg-blue-400 transform translate-x-[-50%]"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-800">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Search Engine Reputation Management Packages
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-bold">
              Flexible pricing options designed to protect and enhance your online reputation.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Basic",
                price: "Ksh 15,000",
                description: "Essential reputation monitoring for small businesses",
                features: [
                  "Basic reputation monitoring",
                  "Monthly reputation reports",
                  "Review management",
                  "Basic content optimization",
                  "Google My Business management"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 25,000",
                description: "Comprehensive reputation management for growing brands",
                features: [
                  "Everything in Basic",
                  "Proactive reputation building",
                  "Social media monitoring",
                  "Competitor reputation analysis",
                  "Review generation strategy",
                  "Bi-weekly reports"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 35,000",
                description: "Advanced reputation management for established organizations",
                features: [
                  "Everything in Standard",
                  "Crisis management planning",
                  "Content removal assistance",
                  "Sentiment analysis",
                  "Executive reputation management",
                  "Weekly reporting",
                  "Priority support"
                ],
                popular: false
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
              Need a tailored reputation management solution for your enterprise? We offer custom SERM packages starting at Ksh 50,000, designed specifically for complex reputation challenges and large organizations.
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

      {/* Why Work with Us */}
      <section className="bg-[var(--background-light)]/80 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-[var(--text-primary)]">
            Why Choose Go Digital Africa?
          </h2>
          <p className="text-center text-[var(--text-primary)] font-bold max-w-3xl mx-auto mb-12">
            Our specialized approach to SERM is designed specifically for the African market:
          </p>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <CheckCircle2 className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">African Market Expertise</h3>
            <p className="mt-3 text-white">
              Our team understands the unique digital landscape across different African countries, including local
              search engines and review platforms.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <Package className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Comprehensive Solutions</h3>
            <p className="mt-3 text-white">
              We offer end-to-end services, from content creation to review management, tailored to the multilingual
              needs of African businesses.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300"
            variants={fadeIn}
            whileHover={{ y: -5 }}
          >
            <BarChart className="text-white h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold text-white">Results-Driven Approach</h3>
            <p className="mt-3 text-white">
              We focus on strategies that deliver measurable improvements in reputation and visibility across African
              search engines and platforms.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6  bg-[var(--background-light)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-[var(--text-primary)]">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-[var(--text-primary)] font-bold max-w-3xl mx-auto mb-12">
            Get answers to common questions about our SERM services:
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                question: "What exactly is Search Engine Reputation Management?",
                answer:
                  "SERM is the practice of monitoring, influencing, and improving how your brand appears in search engine results. It combines SEO, content marketing, and review management to ensure that when potential customers search for your business, they find positive, accurate information.",
              },
              {
                question: "How long does it take to see results from SERM?",
                answer:
                  "SERM is typically a medium to long-term strategy. Initial improvements can be seen within 1-3 months, but significant changes in search results usually take 3-6 months. The timeline varies based on your current reputation, industry competitiveness, and the specific African markets you're targeting.",
              },
              {
                question: "Can negative content be completely removed from search results?",
                answer:
                  "In most cases, we cannot directly remove negative content from third-party websites. However, our strategies focus on suppressing negative content by promoting positive content that ranks higher in search results. In some cases, we can work with website owners or platforms to address false or defamatory content.",
              },
              {
                question: "How do you measure the success of SERM campaigns?",
                answer:
                  "We track several key metrics, including the sentiment of search results (positive vs. negative), review ratings across platforms, brand mention sentiment, search visibility for key terms, and ultimately, the impact on your business metrics like leads and sales.",
              },
              {
                question: "How is SERM different in African markets compared to global markets?",
                answer:
                  "SERM in African markets requires understanding local search engines beyond Google (like Jumia in Nigeria or Konga in Kenya), local review platforms, language variations across regions, and cultural nuances that affect how reputation is perceived. Our strategies are tailored to these unique aspects of the African digital landscape.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-slate-900 backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-400transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 flex items-center"
                variants={fadeIn}
              >
                <div className="flex items-start">
                  <HelpCircle className="text-white h-6 w-6 flex-shrink-0 mt-1 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                    <p className="mt-3 text-white">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-[var(--background-light)]/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-[var(--light-bg)]/80 backdrop-blur-sm"></div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold bg-[var(--text-primary)]/70 inline-block text-transparent bg-clip-text drop-shadow-lg">
            Protect Your Brand's Reputation Today
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed">
            Don't let negative content define your brand's online presence. Let Go Digital Africa help you build and
            maintain a positive reputation that resonates with African consumers and drives business growth.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              className="px-8 py-4 bg-blue-400 text-white rounded-full text-lg font-bold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-transparent border border-blue-500 text-[var(--text-primary)] rounded-full text-lg font-bold hover:bg-purple-500/10 transition duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Contact Our Team
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default SERM

