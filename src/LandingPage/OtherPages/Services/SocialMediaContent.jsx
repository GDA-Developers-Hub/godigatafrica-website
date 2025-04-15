"use client"
import { motion } from "framer-motion"
import { ServiceSEO } from "../../../SEO";
import {
  Instagram,
  Facebook,
  Twitter,
  FileText,
  Image,
  Video,
  BarChart,
  Link2,
  Megaphone,
  Star,
  Trophy,
  FileDigit,
  MessageCircle,
  Calendar,
  Smartphone,
  Globe,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react"

const SocialMediaContent = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className=" text-white min-h-screen font-sans">
      <ServiceSEO service="socialMediaContent" />
      {/* Hero Section */}
      <section className="relative py-26 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-[var(--card-background)]/80 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" transition={{ duration: 0.5 }} variants={fadeIn}>
              <h1 className="text-5xl font-extrabold bg-clip-text text-white">
                Strategic Social Media Content
              </h1>
              <p className="mt-6 text-lg text-gray-100 font-bold leading-relaxed">
                Elevate your brand's digital presence across Africa with compelling social media content that resonates
                with local audiences and drives meaningful engagement.
              </p>
              <button className="mt-8 px-6 py-3 bg-white text-black rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition duration-300 shadow-lg flex items-center gap-2">
                Transform Your Social Presence <TrendingUp size={18} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-sm">
                {/* <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-30 transform -rotate-6"></div> */}
                <div className="relative bg-slate-900 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1">
                      <Instagram size={24} className="text-pink-400" />
                      <Facebook size={24} className="text-blue-400" />
                      <Twitter size={24} className="text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200">Go Digital Africa</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-sm">
                        Discover the power of authentic African storytelling in your social media strategy!
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-sm">
                        Our latest case study: How we increased engagement by 287% for a pan-African retail brand.
                      </p>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>2.4K Likes</span>
                      <span>342 Shares</span>
                      <span>89 Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Social Media Content Section */}
      <section className="py-16 px-6  bg-[var(--background-light)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6">What is Social Media Content?</h2>
              <p className="text-[var(--text-primary)]  font-bold leading-relaxed mb-4">
                Social media content encompasses everything you share on platforms like Facebook, Instagram, Twitter,
                and WhatsApp. In the African context, it's the digital voice of your brand that connects with local
                communities and builds authentic relationships.
              </p>
              <p className="text-[var(--text-primary)]  font-bold leading-relaxed mb-4">
                From vibrant images that showcase African culture to videos that tell compelling local stories, social
                media content comes in many forms. At Go Digital Africa, we craft content that resonates with African
                audiences while driving your business objectives.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <Globe className="text-blue-800" size={24} />
                <p className="text-[var(--text-secondary)] italic font-bold">
                  We understand the unique social media landscape across different African regions.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-slate-800 rounded-xl"></div>
              <div className="relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <Smartphone className="text-purple-400 mb-4" size={32} />
                <h3 className="text-2xl font-semibold text-white mb-3">The African Advantage</h3>
                <p className="text-gray-300 mb-4">
                  Africa has one of the fastest-growing social media user bases in the world, with unique content
                  consumption patterns:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Users className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                    <p className="text-gray-300">
                      Mobile-first audience with 85% accessing social media via smartphones
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                    <p className="text-gray-300">Peak engagement times differ by region and platform</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                    <p className="text-gray-300">
                      Video content sees 4.5x higher engagement rates across the continent
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-16 px-6  bg-[var(--light-bg)]/90">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[var(--text-secondary)]">Effective Social Media Content for African Audiences</h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Our research shows these content types drive the highest engagement across African markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText size={28} />,
                title: "Culturally Relevant Articles",
                description:
                  "Long-form content that addresses local challenges and opportunities, establishing your brand as an authority in the African market.",
              },
              {
                icon: <Image size={28} />,
                title: "Visual Storytelling",
                description:
                  "High-quality images that showcase African aesthetics and cultural nuances, driving 3x more engagement than generic visuals.",
              },
              {
                icon: <Video size={28} />,
                title: "Short-Form Videos",
                description:
                  "Engaging video content optimized for mobile viewing, perfect for Africa's smartphone-first audience with varying data constraints.",
              },
              {
                icon: <BarChart size={28} />,
                title: "Data Visualizations",
                description:
                  "Infographics that simplify complex information about African markets, making your insights accessible and shareable.",
              },
              {
                icon: <Link2 size={28} />,
                title: "Curated Local Content",
                description:
                  "Sharing valuable third-party content relevant to African audiences, positioning your brand as a valuable resource.",
              },
              {
                icon: <Megaphone size={28} />,
                title: "Company Updates",
                description:
                  "Announcements about your African initiatives, partnerships, and community involvement that build local credibility.",
              },
              {
                icon: <Star size={28} />,
                title: "Customer Testimonials",
                description:
                  "Authentic stories from African customers that resonate with local audiences and build trust through social proof.",
              },
              {
                icon: <Trophy size={28} />,
                title: "Interactive Campaigns",
                description:
                  "Contests and challenges designed for African audiences, driving engagement while respecting cultural sensitivities.",
              },
              {
                icon: <FileDigit size={28} />,
                title: "Educational Resources",
                description:
                  "E-books and guides addressing specific needs in different African markets, establishing your brand as a valuable partner.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <div className="text-white/80 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Go Digital Africa Section */}
      <section className="py-16 px-6  bg-[var(--background-light)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[var(--text-secondary)]">Why Choose Go Digital Africa?</h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] font-bold">
              Our deep understanding of African social media landscapes sets us apart.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-semibold text-white-400 mb-4">Local Expertise, Global Standards</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Globe className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Pan-African Insights</h4>
                    <p className="text-gray-300">
                      We understand the nuances of social media usage across different African countries and cultures.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <MessageCircle className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Multilingual Capabilities</h4>
                    <p className="text-gray-300">
                      Content creation in multiple African languages to connect authentically with diverse audiences.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <TrendingUp className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Data-Driven Approach</h4>
                    <p className="text-gray-300">
                      We analyze platform-specific metrics to optimize content for African audience preferences.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Our Content Creation Process</h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-cyan-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Market Research</h4>
                    <p className="text-gray-300">
                      We analyze your target African markets to understand local trends and preferences.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-cyan-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Strategic Planning</h4>
                    <p className="text-gray-300">
                      Developing a content calendar aligned with local events and cultural moments.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-cyan-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Content Creation</h4>
                    <p className="text-gray-300">
                      Crafting culturally relevant content that resonates with local audiences.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-cyan-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Performance Analysis</h4>
                    <p className="text-gray-300">
                      Continuous monitoring and optimization based on audience engagement.
                    </p>
                  </div>
                </li>
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Calendar Section */}
      <section className="py-16 px-6 bg-[var(--light-bg)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-[var(--text-secondary)] mb-6">Strategic Content Calendar</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4 font-bold">
                Our comprehensive content calendar approach ensures your brand stays relevant and consistent across all
                social platforms.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Calendar className="text-blue-800 mt-1" size={20} />
                  <p className="text-[var(--text-primary)] font-semibold">Alignment with African holidays, events, and cultural moments</p>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-blue-800 mt-1" size={20} />
                  <p className="text-[var(--text-primary)] font-semibold">Optimal posting schedules based on regional engagement patterns</p>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-blue-800 mt-1" size={20} />
                  <p className="text-[var(--text-primary)] font-semibold">Content mix optimized for each platform's algorithm and audience</p>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-blue-800 mt-1" size={20} />
                  <p className="text-[var(--text-primary)] font-semibold">Collaborative approval workflows with your team</p>
                </li>
              </ul>
              <button className="mt-8 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition duration-300 shadow-lg flex items-center gap-2">
                Get Your Custom Calendar <Calendar size={18} />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-20"></div>
              <div className="relative bg-gray-600 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <div className="bg-gray-900/80 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-cyan-400">July 2023</h4>
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                          [3, 7, 12, 18, 24, 29].includes(i)
                            ? "bg-purple-500/30 text-white"
                            : [5, 10, 15, 20, 25, 30].includes(i)
                              ? "bg-cyan-500/30 text-white"
                              : [2, 9, 16, 23].includes(i)
                                ? "bg-blue-500/30 text-white"
                                : "text-gray-400"
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 rounded-full bg-purple-400 mt-1"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Promotional Content</p>
                      <p className="text-gray-400 text-xs">Product features, special offers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 rounded-full bg-cyan-400 mt-1"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Educational Content</p>
                      <p className="text-gray-400 text-xs">Industry insights, how-to guides</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-400 mt-1"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Engagement Content</p>
                      <p className="text-gray-400 text-xs">Polls, questions, community building</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-[var(--background-light)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)]">Social Media Content Packages</h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Choose the perfect package to elevate your brand's social media presence across African markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Basic",
                price: "Ksh 30,000",
                description: "Essential social media content for small businesses",
                features: [
                  "8 social posts per month",
                  "1 social platform",
                  "Basic visual content",
                  "Monthly performance report",
                  "Content calendar"
                ],
                popular: false
              },
              {
                title: "Standard",
                price: "Ksh 35,000",
                description: "Comprehensive content strategy for growing brands",
                features: [
                  "15 social posts per month",
                  "2 social platforms",
                  "Custom graphics & visuals",
                  "1 short video per month",
                  "Engagement monitoring",
                  "Bi-weekly performance reports",
                  "Hashtag research"
                ],
                popular: true
              },
              {
                title: "Premium",
                price: "Ksh 40,000",
                description: "Advanced social media content for established brands",
                features: [
                  "25 social posts per month",
                  "3 social platforms",
                  "Premium graphics & animations",
                  "2 videos per month",
                  "Engagement strategy",
                  "Social listening",
                  "Weekly performance reports",
                  "Content localization"
                ],
                popular: false
              },
              {
                title: "Custom",
                price: "Ksh 45,000+",
                description: "Enterprise-level social media content tailored to your needs",
                features: [
                  "Unlimited social posts",
                  "All major platforms",
                  "Advanced video production",
                  "Multilingual content",
                  "Influencer content coordination",
                  "Campaign-specific content",
                  "Dedicated content manager",
                  "Custom analytics dashboard"
                ],
                popular: false,
                isCustom: true
              }
            ].map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-gray-800 backdrop-blur-sm p-6 rounded-xl border ${pkg.popular ? 'border-purple-500' : 'border-gray-700'} hover:border-purple-500/50 transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-purple-500 text-white text-sm font-bold py-1 px-4 rounded-bl-xl rounded-tr-xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {pkg.title}
                </h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <p className="text-gray-300 mb-6 min-h-[60px]">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Star className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-full font-semibold ${pkg.popular ? 'bg-purple-500 hover:bg-purple-600 text-white' : pkg.isCustom ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'} transition-all duration-300`}
                >
                  {pkg.isCustom ? 'Contact for Custom Quote' : 'Get Started'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6  bg-[var(--background-light)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[var(--text-primary)]">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]  font-bold">
              Common questions about social media content for African markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How often should we post on social media?",
                answer:
                  "For African markets, we recommend 3-5 posts per week on Instagram and Facebook, 5-7 posts on Twitter, and 2-3 posts on LinkedIn. However, this varies by industry and audience engagement patterns across different regions.",
              },
              {
                question: "Which social platforms are most effective in Africa?",
                answer:
                  "Facebook and WhatsApp have the highest penetration across Africa, while Instagram is growing rapidly among younger audiences. Twitter is influential for business and political conversations, and LinkedIn for B2B. Platform effectiveness varies by country and demographic.",
              },
              {
                question: "How do you measure social media content success?",
                answer:
                  "We track engagement metrics (likes, comments, shares), reach and impressions, click-through rates, conversion metrics, and audience growth. We provide monthly reports with insights specific to African market performance.",
              },
              {
                question: "Do you create content in local African languages?",
                answer:
                  "Yes, we offer content creation in multiple African languages including Swahili, Amharic, Yoruba, Zulu, Arabic, French, and Portuguese to better connect with diverse African audiences.",
              },
              {
                question: "How do you handle data constraints in African markets?",
                answer:
                  "We optimize content for low-bandwidth environments, creating lightweight images and videos, offering text alternatives, and implementing progressive loading strategies for different connection speeds.",
              },
              {
                question: "What makes social media content effective in African markets?",
                answer:
                  "Effective content respects cultural nuances, addresses local challenges, celebrates African identity, and provides genuine value. Mobile optimization is crucial, as is understanding regional differences in content consumption.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              >
                <div className="flex gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-purple-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.question}</h3>
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--light-bg)]/50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-[var(--text-primary)]">
            Ready to Transform Your Social Media Presence Across Africa?
          </h2>
          <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed">
            Partner with Go Digital Africa for content that truly connects with African audiences and drives meaningful
            business results.
          </p>
          <button className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition duration-300 shadow-lg">
            Schedule Your Strategy Session
          </button>
        </motion.div>
      </section>
    </div>
  )
}

export default SocialMediaContent

