"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { HelpCircle, ArrowRight, Award, BarChart, Target, Users, Globe, TrendingUp, MessageSquare, Check } from "lucide-react"
import image1 from "../../../assets/strategy.jpg"
import image2 from "../../../assets/seo.jpg"
import image3 from "../../../assets/socialMedia.jpg"
import image4 from "../../../assets/influencers.jpg"
import image5 from "../../../assets/video-content.jpg"
import image6 from "../../../assets/email-marketing.jpg"
import image8 from "../../../assets/research.jpg"
import image9 from "../../../assets/content-creation.jpg"
import image10 from "../../../assets/analytics.jpg"
import { Link } from "react-router-dom"
import { ServiceSEO } from "../../../SEO"

const services = [
  {
    title: "Strategic Planning",
    description: "We develop a tailored content strategy to align with your business goals and audience.",
    image: image1,
  },
  {
    title: "SEO Optimization",
    description: "Optimized content to ensure top search rankings and enhanced discoverability.",
    image: image2,
  },
  {
    title: "Social Media Integration",
    description: "Seamless content distribution across multiple social media channels.",
    image: image3,
  },
  {
    title: "Influencer Collaborations",
    description: "Partnering with industry leaders to expand your brand reach.",
    image: image4,
  },
  {
    title: "Video Content Creation",
    description: "High-quality video marketing to engage and captivate your audience.",
    image: image5,
  },
  {
    title: "Email Marketing Campaigns",
    description: "Targeted email strategies that convert leads into loyal customers.",
    image: image6,
  },
]

const processSteps = [
  {
    title: "Research & Analysis",
    description:
      "We conduct thorough market research to understand your audience, competitors, and industry trends to develop a data-driven content strategy.",
    image: image8,
    icon: <Target className="w-6 h-6 text-[#AAB8FF]" />,
  },
  {
    title: "Content Creation",
    description:
      "Our expert team creates high-quality, engaging content tailored to your brand voice and optimized for your target platforms.",
    image: image9,
    icon: <MessageSquare className="w-6 h-6 text-[#AAB8FF]" />,
  },
  {
    title: "Performance Monitoring",
    description:
      "We continuously track, analyze, and optimize your content performance to ensure maximum ROI and ongoing improvement.",
    image: image10,
    icon: <BarChart className="w-6 h-6 text-[#AAB8FF]" />,
  },
]

const faqs = [
  {
    question: "What types of content do you create?",
    answer:
      "We create a wide range of content including blog posts, articles, social media content, video scripts, infographics, whitepapers, case studies, email newsletters, and more. Our content is tailored to your specific industry, audience, and business goals.",
  },
  {
    question: "How do you measure content marketing success?",
    answer:
      "We track various metrics including website traffic, engagement rates, conversion rates, lead generation, social shares, backlinks, search rankings, and ROI. We provide regular reports with actionable insights to continuously improve your content strategy.",
  },
  {
    question: "How long does it take to see results from content marketing?",
    answer:
      "Content marketing is a long-term strategy. While some results may be visible within 3-6 months, significant impact typically takes 6-12 months. We focus on building sustainable growth rather than quick, temporary gains.",
  },
  {
    question: "Do you create content for specific African markets?",
    answer:
      "Yes, we specialize in creating culturally relevant content for various African markets. Our team understands the nuances of different regions and can tailor content to resonate with specific local audiences across the continent.",
  },
  {
    question: "How often should we publish new content?",
    answer:
      "The optimal publishing frequency depends on your industry, audience, and resources. We'll develop a content calendar that balances quality and quantity to maximize impact while maintaining consistency.",
  },
]

const benefits = [
  {
    title: "Increased Brand Awareness",
    description: "Expand your reach and visibility across digital platforms.",
    icon: <Globe className="w-6 h-6 text-[#AAB8FF]" />,
  },
  {
    title: "Higher Conversion Rates",
    description: "Turn more visitors into leads and customers with compelling content.",
    icon: <TrendingUp className="w-6 h-6 text-[#AAB8FF]" />,
  },
  {
    title: "Improved Customer Loyalty",
    description: "Build stronger relationships with your audience through valuable content.",
    icon: <Users className="w-6 h-6 text-[#AAB8FF]" />,
  },
  {
    title: "Enhanced Authority",
    description: "Position your brand as a thought leader in your industry.",
    icon: <Award className="w-6 h-6 text-[#AAB8FF]" />,
  },
]

const ContentMarketing = () => {
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .stars {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px);
        background-size: 50px 50px;
        animation: twinkle 5s infinite alternate;
      }

      @keyframes twinkle {
        from {
          opacity: 0.3;
          transform: translateY(0px);
        }
        to {
          opacity: 0.6;
          transform: translateY(-10px);
        }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="contentMarketing" />
      <section className="relative bg-[var(--card-background)] text-white py-26 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="stars" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 text-center mb-16 bg-[var(--background-light)] rounded-3xl py-5">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-[var(--text-primary)] bg-clip-text p-3">
              Content Marketing
            </h2>
            <p className="text-lg mt-4 text-[var(--text-secondary)] font-bold max-w-3xl mx-auto">
              Elevating brands with cutting-edge digital marketing strategies that drive revenue and impact across African
              markets and beyond.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-6 py-3 bg-blue-800 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#1F3A93]/30 transition duration-300 flex items-center mx-auto"
            >
              Start Your Content Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Services Section */}
        <div className="relative z-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Content Services</h2>
            <p className="text-lg mt-4 text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
              Comprehensive content marketing solutions tailored to your unique business needs and goals.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-[var(--background-light)] rounded-lg shadow-lg border border-[#1F3A93] hover:shadow-xl hover:shadow-[#1F3A93]/20 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={400}
                  height={250}
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-bold mb-2 text-[var(--text-secondary)]">{service.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm font-medium">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Go Digital Africa Section */}
        <div className="relative z-10 py-16 my-20">
          <div className="absolute inset-0 bg-[var(--background-light)] backdrop-blur-sm rounded-3xl"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-secondary)]">Why Choose Go Digital Africa</h2>
            <p className="text-lg mt-4 text-[var(--text-secondary)] max-w-3xl mx-auto font-bold">
              We combine global best practices with local insights to deliver content that resonates with African
              audiences.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {[
              {
                title: "African Market Expertise",
                description: "Deep understanding of diverse African markets and consumer behaviors.",
                icon: <Globe className="w-10 h-10 text-[#AAB8FF]" />,
              },
              {
                title: "Multilingual Content",
                description: "Content creation in multiple languages including English, French, Swahili, and more.",
                icon: <MessageSquare className="w-10 h-10 text-[#AAB8FF]" />,
              },
              {
                title: "Data-Driven Approach",
                description: "Strategic decisions based on comprehensive analytics and market research.",
                icon: <BarChart className="w-10 h-10 text-[#AAB8FF]" />,
              },
              {
                title: "Integrated Marketing",
                description: "Seamless integration with your overall digital marketing strategy.",
                icon: <Target className="w-10 h-10 text-[#AAB8FF]" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-slate-900 backdrop-blur-sm rounded-xl border border-[#1F3A93]/50 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-gray-800 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white text-sm font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="relative z-10 my-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Process</h2>
            <p className="text-lg mt-4 text-gray-100 font-bold max-w-3xl mx-auto">
              Our strategic approach to content marketing ensures brand growth and digital success.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-[var(--background-light)] rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#1F3A93]/20 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={400}
                  height={250}
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <div className="flex items-center mb-2">
                  {step.icon}
                  <h3 className="text-xl font-semibold ml-2 text-[var(--text-secondary)]">{step.title}</h3>
                </div>
                <p className="text-[var(--text-primary)] font-medium">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="relative z-10 my-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">Benefits of Content Marketing</h2>
            <p className="text-lg mt-4 text-white max-w-3xl mx-auto font-bold">
              Strategic content marketing delivers multiple advantages for your business growth.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-[var(--background-light)] backdrop-blur-sm rounded-xl border border-[#1F3A93]/50 hover:border-[#1F3A93] transition-all duration-300"
              >
                <div className="mb-4 p-2 bg-[var(--background)]/50 rounded-full w-12 h-12 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[var(--text-secondary)]">{benefit.title}</h3>
                <p className="font-bold text-[var(--text-secondary)]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative z-10 my-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-lg mt-4 text-gray-100 font-bold max-w-3xl mx-auto">
              Get answers to common questions about our content marketing services.
            </p>
          </motion.div>
          <div className="mx-auto space-y-6 bg-slate-700 container p-10 rounded-4xl">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-[var(--background-light)] backdrop-blur-sm rounded-xl border border-[#1F3A93]/50 hover:border-[#1F3A93] transition-all duration-300"
              >
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-[var(--text-primary)] mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{faq.question}</h3>
                    <p className="mt-2 text-[var(--text-secondary)] font-medium">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="relative z-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">Content Marketing Packages</h2>
            <p className="text-lg mt-4 text-white max-w-3xl mx-auto font-bold">
              Choose the perfect package to elevate your brand with strategic content marketing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                currency: "Ksh",
                price: "15,000",
                features: [
                  "Content strategy development",
                  "2 blog posts per month",
                  "Basic SEO optimization",
                  "1 social media platform",
                  "Monthly performance report"
                ],
                popular: false,
                color: "from-blue-600 to-blue-400"
              },
              {
                name: "Standard",
                currency: "Ksh",
                price: "25,000",
                features: [
                  "Detailed content strategy",
                  "4 blog posts per month",
                  "Advanced SEO optimization",
                  "2 social media platforms",
                  "Content distribution",
                  "Bi-weekly performance reports",
                  "Quarterly strategy review"
                ],
                popular: true,
                color: "from-blue-500 to-blue-700"
              },
              {
                name: "Premium",
                currency: "Ksh",
                price: "35,000",
                features: [
                  "Comprehensive content strategy",
                  "8 content pieces per month",
                  "Premium SEO optimization",
                  "3 social media platforms",
                  "Email newsletter creation",
                  "Lead magnet development",
                  "Content repurposing",
                  "Weekly performance reports"
                ],
                popular: false,
                color: "from-blue-600 to-blue-400"
              }
            ].map((pkg, index) => (
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
                        <Check className="h-4 w-4 text-white" />
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
                Need a comprehensive content marketing strategy for your brand? Our custom packages start at <span className="text-white font-bold">Ksh 45,000+</span> and include unlimited content creation, multi-platform distribution, video production, and a dedicated content manager.
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

        {/* Case Studies Section */}
        <div className="relative z-10 my-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">Success Stories</h2>
            <p className="text-lg mt-4 text-gray-100 font-bold max-w-3xl mx-auto">
              See how our content marketing strategies have helped businesses across Africa achieve remarkable results.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "E-commerce Growth",
                description:
                  "Helped an African e-commerce platform increase organic traffic by 215% and conversions by 180% through strategic content marketing.",
                stats: [
                  { label: "Traffic Increase", value: "215%" },
                  { label: "Conversion Growth", value: "180%" },
                  { label: "ROI", value: "320%" },
                ],
              },
              {
                title: "B2B Lead Generation",
                description:
                  "Generated 450+ qualified leads for a B2B SaaS company through targeted content marketing and lead magnets.",
                stats: [
                  { label: "Leads Generated", value: "450+" },
                  { label: "Cost Per Lead", value: "-45%" },
                  { label: "Sales Cycle", value: "-30%" },
                ],
              },
            ].map((case_study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-[var(--background-light)] rounded-lg shadow-lg border border-[#1F3A93] hover:shadow-xl hover:shadow-[#1F3A93]/20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">{case_study.title}</h3>
                <p className="text-[var(--text-secondary)] mb-4">{case_study.description}</p>
                <div className="grid grid-cols-3 gap-4 mt-">
                  {case_study.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center p-3 bg-slate-700 rounded-lg">
                      <p className="text-2xl font-bold text-[#AAB8FF]">{stat.value}</p>
                      <p className="text-sm text-gray-400 font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F3A93]/30 to-[#3B5EDB]/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-[#16233A]/80 backdrop-blur-sm p-12 rounded-2xl border border-[#1F3A93]/50">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Transform Your Content Strategy?</h2>
              <p className="text-lg mt-4 text-gray-100 max-w-3xl mx-auto font-bold">
                Let's create content that resonates with your audience and drives measurable business results.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:shadow-lg hover:shadow-[#1F3A93]/30 transition duration-300 flex items-center"
                >
                  Get a Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-[#1F3A93]/10 transition duration-300"
                >
                  View Our Portfolio
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

export default ContentMarketing

