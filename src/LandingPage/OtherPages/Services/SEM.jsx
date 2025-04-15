"use client"
import { motion } from "framer-motion"
import {
  BarChart3,
  LineChart,
  PieChart,
  Target,
  Split,
  Search,
  Award,
  Layers,
  Zap,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import google from "../../../assets/google-partner-no-bg.jpg"
import image2 from "../../../assets/GoogleAdsDashboard.jpg"
import { ServiceSEO } from "../../../SEO";


const SEM = () => {
  // Animation variants
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

  // FAQ items
  const faqItems = [
    {
      question: "What is Search Engine Marketing (SEM)?",
      answer:
        "Search Engine Marketing (SEM) is a digital marketing strategy that involves promoting websites by increasing their visibility in search engine results pages through paid advertising. At Go Digital Africa, we combine paid search strategies with advanced targeting to maximize your ROI.",
    },
    {
      question: "How long does it take to see results from SEM campaigns?",
      answer:
        "Unlike SEO which can take months, SEM campaigns can generate results almost immediately after launch. However, optimal performance typically occurs after 2-4 weeks as we gather data and optimize your campaigns based on performance metrics.",
    },
    {
      question: "How much should I budget for SEM campaigns?",
      answer:
        "Your SEM budget depends on your industry, competition, and business goals. At Go Digital Africa, we work with businesses of all sizes, with monthly ad spend budgets ranging from $1,000 to $50,000+. Our team will help you determine the optimal budget to achieve your specific objectives.",
    },
    {
      question: "Do you provide regular reporting on campaign performance?",
      answer:
        "Transparency is core to our approach. We provide comprehensive weekly and monthly reports detailing key performance metrics, insights, and recommendations. Our clients also receive access to a real-time dashboard to monitor campaign performance at any time.",
    },
    {
      question: "Can you manage SEM campaigns across multiple countries in Africa?",
      answer:
        "Yes! As specialists in the African digital landscape, Go Digital Africa has extensive experience managing multi-country SEM campaigns across the continent. We understand the nuances of different African markets and can tailor your campaigns accordingly.",
    },
  ]

  return (
    <div className="bg-[var(--card-background)] text-white min-h-screen font-sans py-10">
      <ServiceSEO service="sem" />
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center py-20 px-6 flex flex-col items-center justify-center bg-[var(--card-background)]"
      >
        <h1 className="text-5xl font-extrabold bg-white inline-block text-transparent bg-clip-text drop-shadow-lg">
          Search Engine Marketing
        </h1>
        <p className="mt-6 text-lg max-w-3xl text-[var(--text-primary)] leading-relaxed font-bold">
          Elevate your business with Go Digital Africa's powerful SEM strategies. Drive conversions, reduce costs, and
          maximize your return on investment with our expert solutions tailored for the African market.
        </p>
        <Link to="/proposal-request"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-white text-black rounded-full text-lg font-semibold transition duration-300 shadow-lg"
        >
          Get Started Today
        </Link>
      </motion.section>

      {/* Google Partner Section */}
      <section className="bg-[var(--background-light)] py-16 px-6 backdrop-blur-sm bg-opacity-80">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="bg-[#1A1A2E] p-6 rounded-xl shadow-2xl">
            <img
              src={google}
              alt="Google Partner"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-[var(--text-primary)] inline-block text-transparent bg-clip-text">
              Premier Google Partner
            </h2>
            <p className="mt-4 text-[var(--text-primary)] leading-relaxed font-bold">
              Go Digital Africa's collaboration with Google-certified experts ensures cutting-edge strategies with full
              transparency and accountability. Our team stays ahead of industry trends to deliver exceptional results
              for businesses across Africa.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Transparency Section */}
      <section className="py-20 px-6 bg-[var(--background-light)]/80">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold bg-[var(--logo-bg)] inline-block text-transparent bg-clip-text">
              100% Transparency & Ownership
            </h2>
            <p className="mt-4 text-[var(--text-primary)] leading-relaxed font-bold">
              With Go Digital Africa, you gain full control and ownership of your Google Ads account. We ensure complete
              transparency so you stay informed every step of the way. Our African-focused approach means we understand
              the unique challenges and opportunities in local markets.
            </p>
          </div>
          <div className="bg-[#0F3460] p-6 rounded-xl shadow-2xl">
            <img
              src={image2}
              alt="Google Ads Dashboard"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </motion.div>
      </section>

      {/* SEM Strategies */}
      <section className="bg-[var(--background-light)] py-20 px-6 backdrop-blur-sm bg-opacity-80">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeIn}
          className="flex-column items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-center bg-[var(--logo-bg)] inline-block text-transparent bg-clip-text">
            How Go Digital Africa Manages Your SEM Campaigns
          </h2>
          <p className="text-lg text-[var(--text-primary)] font-bold text-center max-w-3xl mx-auto mt-4">
            Our data-driven approach ensures optimal results by leveraging AI and strategic insights tailored to your
            business needs and the unique African digital landscape.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mt-12"
        >
          {[
            {
              icon: <BarChart3 className="h-8 w-8 text-[#4A9FFF] mb-3" />,
              title: "AI-Powered Optimization",
              desc: "Leverage machine learning algorithms specifically trained on African market data for enhanced campaign performance.",
            },
            {
              icon: <LineChart className="h-8 w-8 text-[#4A9FFF] mb-3" />,
              title: "Detailed Performance Reports",
              desc: "Access real-time data insights and campaign metrics through our custom dashboard designed for transparency.",
            },
            {
              icon: <Target className="h-8 w-8 text-[#4A9FFF] mb-3" />,
              title: "Cost-Effective Strategies",
              desc: "Maximize ROI while lowering ad expenses with our efficient bidding strategies optimized for local markets.",
            },
            {
              icon: <PieChart className="h-8 w-8 text-[#4A9FFF] mb-3" />,
              title: "Conversion Tracking",
              desc: "Monitor user behavior across devices for higher engagement and better understanding of your customer journey.",
            },
            {
              icon: <Split className="h-8 w-8 text-[#4A9FFF] mb-3" />,
              title: "A/B Split Testing",
              desc: "Compare multiple ad versions with culturally relevant messaging to identify what resonates best with your audience.",
            },
            {
              icon: <Search className="h-8 w-8 text-[#4A9FFF] mb-3" />,
              title: "Keyword & Bidding Strategies",
              desc: "Fine-tune targeting with localized keyword research and bidding strategies for optimal reach and impact.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-slate-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-opacity-80 border border-gray-800"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#4A9FFF] to-[#00C2FF] inline-block text-transparent bg-clip-text">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
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
              Search Engine Marketing Packages
            </h2>
            <p className="text-lg text-white max-w-3xl mx-auto font-bold">
              Choose the perfect package to drive qualified traffic and leads through targeted search campaigns.
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
                price: "Ksh 25,000",
                description: "Essential SEM strategy for small businesses",
                features: [
                  "Account setup & optimization",
                  "Keyword research (up to 100 keywords)",
                  "2 ad copy variations",
                  "Basic conversion tracking",
                  "Monthly performance reports",
                  "Email support"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 35,000",
                description: "Comprehensive SEM campaigns for growing businesses",
                features: [
                  "Everything in Basic",
                  "Advanced keyword research (up to 300 keywords)",
                  "4 ad copy variations",
                  "A/B testing",
                  "Competitor analysis",
                  "Bi-weekly optimization",
                  "Phone & email support"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 45,000",
                description: "Advanced SEM strategies for established brands",
                features: [
                  "Everything in Standard",
                  "Unlimited keyword research",
                  "8+ ad copy variations",
                  "Advanced conversion tracking",
                  "Weekly optimization",
                  "Custom reporting dashboard",
                  "Strategic consultation"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 60,000+",
                description: "Enterprise-level SEM solutions tailored to your specific needs",
                features: [
                  "Everything in Premium",
                  "Dedicated account manager",
                  "Multi-language campaigns",
                  "Multi-market targeting",
                  "Cross-platform strategy integration",
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
      <section className="bg-[var(--background-light)]/80 py-20 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeIn} className="flex-column items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-center bg-[var(--logo-bg)] inline-block text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[var(--text-secondary)] text-center max-w-3xl mx-auto mt-4 font-bold">
            Get answers to common questions about our SEM services and approach.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto mt-12 space-y-6"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-[#1A1A2E] p-6 rounded-xl shadow-md backdrop-blur-sm bg-opacity-80 border border-gray-800"
            >
              <div className="flex items-start">
                <HelpCircle className="h-6 w-6 text-[#FF0080] mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-gray-300">{item.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="bg-[var(--background-light)] py-20 px-6 text-center"
      >
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeIn} className="flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-extrabold bg-[var(--text-primary)]/70 inline-block text-transparent bg-clip-text drop-shadow-lg">
            Transform Your Business with Go Digital Africa
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-[var(--text-primary)] leading-relaxed font-bold">
            Partner with us to gain a competitive edge in search engine marketing across African markets. Let's drive
            more leads and conversions together with strategies designed for local success.
          </p>
          <Link to="/contact-us">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-4 bg-[var(--logo-bg)] text-white rounded-full text-lg font-bold transition duration-300 shadow-lg flex items-center justify-center"
          >
            Contact us directly <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default SEM

