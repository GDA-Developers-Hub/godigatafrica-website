"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  PenTool,
  Search,
  TrendingUp,
  BookOpen,
  MessageSquare,
  BarChart,
  FileText,
  HelpCircle,
  ArrowRight,
  Globe,
  Mail,
  ShoppingCart,
  Users,
  CheckCircle,
} from "lucide-react"
import { ServiceSEO } from "../../../SEO"

const CopyWriting = () => {
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
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="copywriting" />
      <div className="bg-[var(--card-background)] text-white min-h-screen font-sans">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center py-20 px-6 flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center mb-4">
            <PenTool className="w-12 h-12 text-white/80 mr-3" />
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-white drop-shadow-lg">
            Professional Copywriting Services
          </h1>
          <p className="mt-6 text-lg max-w-3xl text-gray-100 font-bold leading-relaxed">
            Engage your audience with compelling content that converts. We create powerful copy tailored to your brand's
            voice and business goals across the African market.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg flex items-center"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.section>

        {/* Benefits Section */}
        <section className="bg-[var(--background-light)] py-20 px-6 relative overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="relative z-10"
          >
            <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-primary)] font-bold">
              Why Choose Our Copywriting Services?
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
                  icon: <Search className="w-8 h-8 text-cyan-400" />,
                  title: "SEO-Optimized Content",
                  desc: "Boost search rankings with high-quality, keyword-rich copy tailored for African and global search engines.",
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
                  title: "Conversion-Focused Writing",
                  desc: "Turn visitors into customers with persuasive messaging that resonates with African consumers.",
                },
                {
                  icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
                  title: "Engaging Storytelling",
                  desc: "Keep your audience captivated with compelling narratives that reflect African values and experiences.",
                },
                {
                  icon: <MessageSquare className="w-8 h-8 text-cyan-400" />,
                  title: "Brand Voice Alignment",
                  desc: "Ensure consistency with content that reflects your unique tone and connects with local markets.",
                },
                {
                  icon: <BarChart className="w-8 h-8 text-cyan-400" />,
                  title: "Data-Driven Approach",
                  desc: "Leverage insights from African markets to create copy that delivers measurable results.",
                },
                {
                  icon: <FileText className="w-8 h-8 text-cyan-400" />,
                  title: "Versatile Content Formats",
                  desc: "From website copy to ad scripts, we cover all your content needs across multiple platforms.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-gray-900 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-cyan-900/20 border border-gray-800 hover:border-cyan-900/50 transition-all duration-300"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-gray-300 font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Our Approach Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--background-light)]/80"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-primary)] p-3">
            Our Copywriting Approach
          </h2>
          <div className="max-w-4xl mx-auto mt-12">
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Research & Discovery",
                  desc: "We dive deep into your industry, audience, and competitors to understand what makes your African market unique.",
                },
                {
                  number: "02",
                  title: "Strategy Development",
                  desc: "We create a tailored content strategy aligned with your business goals and target audience needs.",
                },
                {
                  number: "03",
                  title: "Content Creation",
                  desc: "Our expert copywriters craft compelling, culturally-relevant content that speaks to your audience.",
                },
                {
                  number: "04",
                  title: "Review & Refinement",
                  desc: "We collaborate with you to refine the content until it perfectly captures your brand voice.",
                },
                {
                  number: "05",
                  title: "Implementation & Analysis",
                  desc: "We help implement the content and analyze its performance to continuously improve results.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-start gap-6 p-6 bg-gray-800 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-900/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-gray-300">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Content Types Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--background-light)]"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-primary)] p-3">
            Content We Create
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Website Copy",
                desc: "Engaging, SEO-friendly content for your website.",
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Campaigns",
                desc: "Persuasive emails that drive opens, clicks, and conversions.",
              },
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Product Descriptions",
                desc: "Compelling copy that showcases your products' benefits.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Social Media Content",
                desc: "Engaging posts that build community and drive engagement.",
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Blog Articles",
                desc: "Informative, valuable content that establishes authority.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Ad Copy",
                desc: "High-converting copy for your digital advertising campaigns.",
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Case Studies",
                desc: "Persuasive success stories that showcase your results.",
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Brand Messaging",
                desc: "Consistent voice and tone across all communications.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-900 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-cyan-900/50 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-300 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-gray-100 font-medium">{item.desc}</p>
              </motion.div>
            ))}
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
                Copywriting Service Packages
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto font-bold">
                Choose the perfect package to elevate your brand's messaging.
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
                  price: "Ksh 10,000",
                  description: "Essential copywriting for small businesses",
                  features: [
                    "Up to 5 pages of website copy",
                    "Basic SEO optimization",
                    "1 round of revisions",
                    "Brand voice guidelines",
                    "7-day delivery"
                  ],
                  popular: false
                },
                {
                  title: "Standard",
                  price: "Ksh 20,000",
                  description: "Comprehensive content for growing businesses",
                  features: [
                    "Up to 10 pages of website copy",
                    "Advanced SEO optimization",
                    "2 rounds of revisions",
                    "Keyword research",
                    "5-day delivery",
                    "Basic social media content"
                  ],
                  popular: true
                },
                {
                  title: "Premium",
                  price: "Ksh 30,000",
                  description: "Complete content solution for established brands",
                  features: [
                    "Up to 15 pages of website copy",
                    "Expert SEO optimization",
                    "Unlimited revisions",
                    "In-depth competitor analysis",
                    "3-day delivery",
                    "Social media & email content"
                  ],
                  popular: false
                },
                {
                  title: "Custom",
                  price: "Ksh 40,000+",
                  description: "Tailored content strategy for enterprise needs",
                  features: [
                    "Custom content volume",
                    "Content strategy development",
                    "Premium SEO integration",
                    "Multi-platform content creation",
                    "Priority delivery",
                    "Dedicated content manager"
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

        {/* Sample Work Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--card-background)]"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-white">
            See Our Work in Action
          </h2>
          <p className="text-center text-gray-100 font-bold mt-4 max-w-3xl mx-auto">
            Watch these videos to see how our copywriting has helped businesses across Africa achieve their goals.
          </p>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-8">
            <div className="rounded-xl overflow-hidden">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.youtube.com/embed/UbmZAe5u5FI"
                title="Copywriting Sample Video"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="p-4 bg-gray-800 mt-5 rounded-lg min-h-40">
                <h3 className="text-xl font-semibold text-white">Effective Website Copy</h3>
                <p className="text-gray-300 mt-2 h-full">See how our website copy helped increase conversions by 45%.</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.youtube.com/embed/TX9qSaGXFyg"
                title="Marketing Copy Example"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="p-4 bg-gray-800 h-full mt-5 rounded-lg min-h-40">
                <h3 className="text-xl font-semibold text-white">Email Campaign Success</h3>
                <p className="text-gray-300 mt-2">
                  Learn how our email copy drove a 32% open rate and 12% click-through rate.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-100 font-bold mt-6 text-sm">
            Note: We recommend these videos as examples of effective copywriting presentations. Contact us to see our
            actual portfolio.
          </p>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 bg-[var(--background-light)]"
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-[var(--text-primary)] p-3">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            {[
              {
                question: "How do you ensure the copy reflects our brand voice?",
                answer:
                  "We begin with a comprehensive brand voice discovery session to understand your unique tone, style, and values. Our team then creates detailed brand voice guidelines that inform all content creation, ensuring consistency across all platforms.",
              },
              {
                question: "How long does it take to complete a copywriting project?",
                answer:
                  "Timelines vary based on project scope and complexity. Typically, website copy projects take 2-3 weeks, while email campaigns might take 1-2 weeks. During our initial consultation, we'll provide a detailed timeline specific to your project needs.",
              },
              {
                question: "Do you offer copywriting in multiple languages?",
                answer:
                  "Yes! We offer copywriting services in English, French, Swahili, and several other African languages. Our team includes native speakers who understand the cultural nuances of each language market.",
              },
              {
                question: "How do you incorporate SEO into your copywriting?",
                answer:
                  "We conduct thorough keyword research specific to African search patterns and global trends. Our copywriters are trained in SEO best practices and seamlessly incorporate relevant keywords while maintaining natural, engaging language that resonates with readers.",
              },
              {
                question: "What industries do you specialize in?",
                answer:
                  "We have extensive experience across various industries including technology, finance, healthcare, education, e-commerce, and tourism. Our team researches each industry thoroughly to ensure accurate, authoritative content.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-900 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-white font-bold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                    <p className="mt-2 text-gray-100 font-medium">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="py-20 px-6 text-center bg-[var(--background-light)]/80"
        >
          <div className="max-w-4xl mx-auto relative">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div> */}
            <div className="relative bg-gray-900 backdrop-blur-sm p-12 rounded-2xl border border-gray-800">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-white">
                Get High-Converting Copy Today
              </h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-100 font-bold leading-relaxed">
                Let's craft compelling copy that resonates with your African audience and drives measurable results for
                your business.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:shadow-lg hover:shadow-purple-600/20 transition duration-300 flex items-center"
                >
                  Get a Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-purple-600/10 transition duration-300"
                >
                  View Our Portfolio
                </motion.button>
              </div>
              <div className="mt-8 flex justify-center space-x-8">
                {[
                  { text: "100+", label: "Satisfied Clients" },
                  { text: "500+", label: "Projects Completed" },
                  { text: "15+", label: "Industries Served" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-blue-400">{stat.text}</p>
                    <p className="text-gray-100 font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default CopyWriting

