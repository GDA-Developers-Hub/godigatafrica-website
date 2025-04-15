"use client"
import { motion } from "framer-motion"
import {
  Zap,
  Smartphone,
  FileSearch,
  Database,
  Shield,
  Globe,
  Code,
  BarChart4,
  ArrowRight,
  HelpCircle,
  Search,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import { ServiceSEO } from "../../../SEO";


const TechnicalSeo = () => {
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
    <div className="bg-[var(--card-background)]">
      <ServiceSEO service="technicalSEO" />
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"></div> */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-white shadow-xl">
              <Code className="text-black h-8 w-8" />
            </div>
            <div className="w-8"></div>
            <div className="p-3 rounded-full bg-white shadow-xl">
              <Search className="text-black h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-[var(--text-primary)] bg-clip-text text-transparent drop-shadow-lg mb-6">
            Technical SEO Optimization
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed">
            Enhance your website's backend structure and performance to improve search engine indexing and user
            experience across African markets.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-10">
            <button className="px-8 py-6 bg-white text-black rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 flex items-center h-auto">
              Get a Free Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Aspects Section */}
      <section className="py-20 px-6 bg-[var(--background-light)] backdrop-blur-sm relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div> */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-[var(--text-primary)] bg-clip-text text-transparent inline-block">
              Key Aspects of Technical SEO
            </h2>
            <div className="mt-4 w-24 h-1 bg-[var(--text-primary)] mx-auto rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Zap className="h-10 w-10 text-white mb-4" />,
                title: "Site Speed Optimization",
                description:
                  "Reduce load times and improve user experience with advanced speed techniques optimized for African internet infrastructure.",
              },
              {
                icon: <Smartphone className="h-10 w-10 text-white mb-4" />,
                title: "Mobile-Friendly Design",
                description:
                  "Ensure seamless user experience across all devices with responsive design, crucial for Africa's mobile-first internet users.",
              },
              {
                icon: <FileSearch className="h-10 w-10 text-white mb-4" />,
                title: "Indexing & Crawlability",
                description:
                  "Optimize robots.txt, sitemaps, and metadata for search engine indexing, ensuring visibility in local African search results.",
              },
              {
                icon: <Database className="h-10 w-10 text-white mb-4" />,
                title: "Structured Data",
                description:
                  "Enhance search visibility with schema markup and structured data tailored for African businesses and local search needs.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-2xl border border-blue-400 transition-all duration-500 hover:shadow-xl hover:shadow-purple-900/20 group"
              >
                <div className="p-3 bg-slate-700 rounded-xl inline-block mb-4 border border-blue-400 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Advanced Technical SEO Section */}
      <section className="py-20 px-6 bg-[var(--light-bg)]/80 relative">
        {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div> */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-white bg-clip-text text-transparent inline-block">
              Advanced Technical SEO Solutions
            </h2>
            <div className="mt-4 w-24 h-1 bg-white mx-auto rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Shield className="h-10 w-10 text-white mb-4" />,
                title: "HTTPS & Security",
                description: "Implement secure protocols and protect user data, building trust with African consumers.",
              },
              {
                icon: <Globe className="h-10 w-10 text-white mb-4" />,
                title: "International SEO",
                description: "Optimize for multiple languages and regions across Africa with hreflang implementation.",
              },
              {
                icon: <Code className="h-10 w-10 text-white mb-4" />,
                title: "JavaScript SEO",
                description:
                  "Ensure proper rendering of JavaScript content for search engines while maintaining performance.",
              },
              {
                icon: <BarChart4 className="h-10 w-10 text-white mb-4" />,
                title: "Core Web Vitals",
                description: "Optimize user experience metrics that directly impact search rankings and conversions.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-slate-800 backdrop-blur-sm p-8 rounded-2xl border border-blue-400 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl "
              >
                <div className="p-3 bg-blue-400 rounded-xl inline-block mb-4 border border-blue-400  transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 px-6  bg-[var(--background-light)] backdrop-blur-sm relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div> */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-[var(--text-primary)] bg-clip-text text-transparent inline-block">
              Our Technical SEO Process
            </h2>
            <div className="mt-4 w-24 h-1 bg-[] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-white mb-4" />,
                title: "Comprehensive Audit",
                description:
                  "We analyze your site's technical foundation, identifying all issues affecting search performance.",
              },
              {
                icon: <Award className="h-10 w-10 text-white mb-4" />,
                title: "Strategic Planning",
                description: "We prioritize issues based on impact and develop a customized implementation roadmap.",
              },
              {
                icon: <Code className="h-10 w-10 text-white mb-4" />,
                title: "Implementation",
                description:
                  "Our experts execute technical fixes and optimizations with minimal disruption to your site.",
              },
              {
                icon: <Clock className="h-10 w-10 text-white mb-4" />,
                title: "Monitoring & Refinement",
                description: "We continuously track performance and make adjustments to maximize results.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-[var(--card-background)] backdrop-blur-sm p-8 rounded-2xl border border-blue-400  transition-all duration-500 relative group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="p-3 bg-slate-800 rounded-xl inline-block mb-4 border border-blue-400 group">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

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
              Technical SEO Service Packages
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto font-bold">
              Comprehensive solutions to optimize your website's technical performance.
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
                price: "Ksh 45,000",
                description: "Essential technical SEO for small websites with up to 100 pages",
                features: [
                  "Technical SEO audit",
                  "Site speed optimization",
                  "Mobile responsiveness check",
                  "Basic schema markup",
                  "XML sitemap creation",
                  "Monthly performance reports"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 65,000",
                description: "Comprehensive technical strategy for growing websites",
                features: [
                  "Everything in Basic",
                  "Advanced schema implementation",
                  "JavaScript SEO optimization",
                  "Core Web Vitals improvement",
                  "Structured data enhancement",
                  "Bi-weekly optimization"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 85,000",
                description: "Advanced technical SEO for complex websites and e-commerce",
                features: [
                  "Everything in Standard",
                  "International SEO optimization",
                  "Advanced site architecture analysis",
                  "Custom server configuration recommendations",
                  "Log file analysis",
                  "Priority issue resolution",
                  "Weekly progress reports"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 120,000+",
                description: "Enterprise-level technical SEO solutions for large websites",
                features: [
                  "Everything in Premium",
                  "Dedicated technical SEO specialist",
                  "Custom API integrations",
                  "Advanced security implementations",
                  "Enterprise-level crawling solutions",
                  "24/7 monitoring and alerts",
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
      <section className="py-20 px-6  bg-[var(--background-light)] relative">
        {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div> */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-[var(--text-primary)] bg-clip-text text-transparent inline-block">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 w-24 h-1 bg-[var(--text-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What exactly is technical SEO?",
                answer:
                  "Technical SEO focuses on improving the technical aspects of a website to help search engines crawl and index it more effectively. This includes optimizing site speed, mobile-friendliness, indexability, site architecture, and structured data implementation.",
              },
              {
                question: "How long does it take to see results from technical SEO?",
                answer:
                  "Initial improvements can be seen within weeks as search engines recrawl your site. However, the full impact of technical SEO optimizations typically takes 2-3 months to materialize, depending on your site's size and the scope of technical issues addressed.",
              },
              {
                question: "How is technical SEO different for African markets?",
                answer:
                  "Technical SEO for African markets requires special consideration for mobile optimization (as most users access the internet via mobile), bandwidth constraints, multilingual content, and local search engine preferences. We tailor our approach to address these unique challenges.",
              },
              {
                question: "Do you provide technical SEO for e-commerce websites?",
                answer:
                  "Yes, we specialize in technical SEO for e-commerce sites across Africa. This includes product schema implementation, faceted navigation optimization, duplicate content management, and inventory management solutions tailored for African e-commerce platforms.",
              },
              {
                question: "How do you measure the success of technical SEO?",
                answer:
                  "We track key metrics including crawl stats, indexation rates, page load times, mobile usability scores, Core Web Vitals, organic traffic growth, and ultimately, conversion improvements to measure the success of our technical SEO implementations.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-slate-800 backdrop-blur-sm p-8 rounded-2xl border border-blue-400  transition-all duration-500 group"
              >
                <div className="flex items-start">
                  <div className="p-2 bg-gray-900/50 rounded-lg inline-block mr-4 border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-500 group-hover:bg-cyan-900/20 flex-shrink-0 mt-1">
                    <HelpCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-white">{faq.answer}</p>
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
        className="py-24 px-6 text-center bg-[var(--background-light)]/80 relative overflow-hidden"
      >
        {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"></div> */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-blue-700 bg-clip-text text-transparent drop-shadow-lg mb-6">
            Boost Your Website's Technical Performance
          </h2>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed">
            Get expert technical SEO strategies tailored for African markets that enhance search engine rankings, site
            efficiency, and user experience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="px-8 py-6 bg-blue-400 text-white rounded-full text-lg font-bold hover:shadow-lg hover:shadow-purple-500/20 transition duration-300 flex items-center h-auto">
                Request a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                variant="outline"
                className="px-8 py-6 bg-transparent border-2 border-white text-[var(--text-primary)] rounded-full text-lg font-bold hover:bg-purple-900/20 hover:border-purple-500 transition duration-300 h-auto"
              >
                View Case Studies
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default TechnicalSeo

