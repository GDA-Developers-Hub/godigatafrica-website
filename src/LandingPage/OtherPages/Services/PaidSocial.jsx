"use client"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Users, BarChart2, Target, PieChart, Zap, Award, CheckCircle } from "lucide-react"
import facebookad from "../../../assets/facebook-ads.jpeg"
import instagramad from "../../../assets/instagram-ad.jpeg"
import facebookvedioad from "../../../assets/facebook-vedio-ads.jpeg"
import clicktowebsite from "../../../assets/click-to-website-ad.jpeg"
import facebookcarouselad from "../../../assets/facebook-carousel-ad.jpeg"
import { ServiceSEO } from "../../../SEO"

const PaidSocial = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const portfolioRef = useRef<HTMLDivElement>(null)

  const portfolioItems = [
    {
      id: 1,
      client: "Classic Safari",
      image: "/placeholder.svg?height=400&width=300",
      description: "Tourism campaign that increased bookings by 45%",
    },
    {
      id: 2,
      client: "Mi Vida Homes",
      image: "/placeholder.svg?height=400&width=300",
      description: "Property showcase that generated 120+ qualified leads",
    },
    {
      id: 3,
      client: "Best Lady",
      image: "/placeholder.svg?height=400&width=300",
      description: "Product launch campaign with 3.2x ROI",
    },
  ]

  const adTypes = [
    {
      title: "Facebook Lead Generation",
      image: facebookad,
      description: "Capture qualified leads directly within Facebook",
    },
    {
      title: "Instagram Ad",
      image: instagramad,
      description: "Visually engaging ads for the Instagram feed and stories",
    },
    {
      title: "Facebook Video Ad",
      image: facebookvedioad,
      description: "Dynamic video content that drives engagement",
    },
    {
      title: "Click to Website",
      image: clicktowebsite,
      description: "Direct traffic to your website with compelling CTAs",
    },
    {
      title: "Facebook Carousel Ad",
      image: facebookcarouselad,
      description: "Showcase multiple products or features in a single ad",
    },
  ]

  const services = [
    {
      title: "Advanced Audience Targeting",
      icon: <Target className="h-12 w-12 text-primary" />,
      description:
        "We analyze, identify, and understand your target audience to design campaigns that deliver maximum conversions across Africa.",
    },
    {
      title: "Conversion Tracking",
      icon: <BarChart2 className="h-12 w-12 text-primary" />,
      description:
        "We implement pixel tracking to monitor conversions from your campaigns and optimize for better performance.",
    },
    {
      title: "Account Management",
      icon: <Users className="h-12 w-12 text-primary" />,
      description:
        "Unlike other agencies, we give you 100% ownership of your accounts while providing expert management.",
    },
    {
      title: "Performance Reporting",
      icon: <PieChart className="h-12 w-12 text-primary" />,
      description: "Transparent monthly reporting on campaign performance with actionable insights for improvement.",
    },
    {
      title: "Custom Creative Design",
      icon: <Zap className="h-12 w-12 text-primary" />,
      description:
        "Our in-house design team creates eye-catching, high-converting ad creatives tailored to your brand.",
    },
    {
      title: "Campaign Optimization",
      icon: <Award className="h-12 w-12 text-primary" />,
      description:
        "Continuous A/B testing and optimization to ensure your campaigns deliver the best possible results.",
    },
  ]

  const scrollPortfolio = (direction) => {
    if (portfolioRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      portfolioRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="paidSocial" />
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative py-25 overflow-hidden bg-[var(--card-background)]">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10 z-0"></div> */}
          <div className="container mx-auto px-4 relative z-10 mt-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-white">
                Facebook & Instagram Advertising
              </h1>
              <p className="text-lg md:text-xl mb-8 text-[var(--text-primary)] font-bold">
                With over 2 billion active users across Africa, Facebook and Instagram present unparalleled opportunities
                to reach your target audience. Go Digital Africa's expert team will help you harness the power of these
                platforms to drive real business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact-us"
                  className="px-8 py-3 bg-white rounded-lg font-medium text-black hover:opacity-90 transition-all"
                >
                  Get Started
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-medium text-[var(--text-primary)] hover:bg-white hover:border-white transition duration-300 h-auto"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ad Types Section */}
        <section className="py-16  bg-[var(--background-light)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">Social Ad Formats That Convert</h2>
              <p className="text-lg text-[var(--text-primary)] font-bold max-w-3xl mx-auto">
                We create high-performing ads across multiple formats to meet your specific business objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {adTypes.map((adType, index) => (
                <motion.div
                  key={adType.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden group hover:border-blue-500/50 transition-all"
                >
                  <div className="relative h-auto overflow-hidden">
                    <img
                      src={adType.image || "/placeholder.svg"}
                      alt={adType.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 h-30 w-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-white font-semibold mb-2">{adType.title}</h3>
                    <p className="text-white font-bold text-sm">{adType.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section className="py-16 bg-[var(--light-bg)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Facebook & Instagram Offerings</h2>
              <p className="text-lg text-[var(--text-primary)] font-bold max-w-3xl mx-auto">
                With over 3 billion users worldwide, Facebook and Instagram provide unmatched opportunities to grow your
                brand. Our comprehensive services help you maximize results on these powerful platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[var(--card-background)] backdrop-blur-sm border border-blue-400 rounded-xl p-6  transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-xl text-white font-bold mb-3">{service.title}</h3>
                  <p className="text-white font-bold">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-slate-800/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Facebook & Instagram Ads Packages
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto font-bold">
                Flexible pricing options designed to maximize your social media advertising impact.
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Basic",
                  currency: "Ksh",
                  price: "45,000",
                  features: [
                    "Account setup & optimization",
                    "Basic targeting setup",
                    "2 ad creatives per month",
                    "Monthly performance reports",
                    "Single platform management"
                  ],
                  popular: false,
                  color: "from-blue-600 to-blue-400"
                },
                {
                  name: "Standard",
                  currency: "Ksh",
                  price: "55,000",
                  features: [
                    "Everything in Basic",
                    "Advanced audience targeting",
                    "4 ad creatives per month",
                    "A/B testing",
                    "Bi-weekly optimization",
                    "Multi-platform management"
                  ],
                  popular: true,
                  color: "from-blue-500 to-blue-700"
                },
                {
                  name: "Premium",
                  currency: "Ksh",
                  price: "65,000",
                  features: [
                    "Everything in Standard",
                    "Custom audience creation",
                    "8 ad creatives per month",
                    "Advanced conversion tracking",
                    "Weekly optimization",
                    "Custom reporting dashboard"
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
                          <CheckCircle className="h-4 w-4 text-white" />
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
                  Need a tailored social advertising strategy? Our custom packages start at <span className="text-white font-bold">Ksh 75,000+</span> and are designed specifically for your business goals and target audiences across African markets.
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

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden bg-[var(--background-light)]">
          {/* <div className="absolute inset-0 bg-bg-gradient-to-b from-[var(--background)] via-[var(--background-light)] to-[var(--background)] z-0"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5 z-0"></div> */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Social Media Advertising?</h2>
              <p className="text-lg text-[var(--text-primary)] font-bold mb-8">
                Let Go Digital Africa's expert team create and manage high-performing Facebook and Instagram campaigns
                that drive real business results across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-blue-400 rounded-lg font-medium text-white hover:opacity-90 transition-all text-lg"
                >
                  Get Started Today
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-4 bg-white border-2 border-blue-500  rounded-lg font-medium text-black transition-all text-lg"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PaidSocial

