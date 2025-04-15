"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Megaphone, Smartphone, Users, Shield, TrendingUp } from "lucide-react";
import {Link} from "react-router-dom";

// Website sections overview
const websiteSections = [
  {
    title: "Information Systems & Web Applications",
    description:
      "Custom-built information systems and web applications tailored to meet the unique needs of your business.",
    icon: Globe,
    link: "#web-applications",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Mobile Applications",
    description: "Easy-to-use mobile applications that help you manage all your business activities on the go.",
    icon: Smartphone,
    link: "#mobile-applications",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Online Data Security",
    description:
      "Effective data security for emails, websites, and overall online presence through our cloud-based system.",
    icon: Shield,
    link: "#security",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Social Media Marketing",
    description: "Customized social media strategies that resonate with your target audience and elevate your brand.",
    icon: Megaphone,
    link: "#social-media",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Strategic Partnerships",
    description: "Powerful alliances with sponsors and stakeholders to deliver tailored digital solutions.",
    icon: Users,
    link: "#partnerships",
    color: "from-pink-500 to-red-500",
  },
  {
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing strategies to boost your online presence and drive business growth.",
    icon: TrendingUp,
    link: "#digital-marketing",
    color: "from-red-500 to-orange-500",
  },
];

export default function PortfolioOverview() {
  return (
    <section className="relative py-30 overflow-hidden bg-[var(--card-background)] text-white">
      {/* Background elements */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/10 to-slate-950" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" /> */}

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-[var(--text-primary)]  font-bold mb-3 tracking-wider text-sm uppercase block">
            Website Overview
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Go Digital  Africa
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-white via-black to-white mx-auto mb-8 rounded-full" />
          <p className="text-lg text-[var(--text-primary)] font-bold  mb-8">
            Welcome to Go Digital Africa, your premier partner for comprehensive digital solutions across the African
            continent. Our website showcases our expertise in web development, mobile applications, digital marketing,
            and strategic partnerships—all designed to elevate your business in the digital landscape.
          </p>
        </div>

        {/* Website Sections Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {websiteSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl bg-slate-800 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color} bg-opacity-10`}>
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="h-4 w-4 text-white/70" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {section.title}
                </h3>
                <p className="text-slate-300 group-hover:text-white/80 transition-colors duration-300 mb-4">
                  {section.description}
                </p>

                {/* Using an <a> tag for the link */}
                <a href={section.link} className="text-cyan-400 hover:text-cyan-300 flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About the Website */}
        {/* <div className="bg-slate-700 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">About This Website</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6" />
            <div className="space-y-6 text-slate-100">
              <p>
                The Go Digital Africa website is designed to showcase our comprehensive range of digital services and solutions.
                Our site features a modern, responsive design with intuitive navigation to help you easily find the information you need.
              </p>
              <p>
                Each section of our website is carefully crafted to provide detailed insights into our services, our approach, and the
                results we've achieved for our clients. From web and mobile application development to digital marketing and strategic
                partnerships, we've created dedicated sections that highlight our expertise and capabilities.
              </p>
              <p>
                Our website also features case studies, client testimonials, and a blog where we share industry insights and best practices.
                Whether you're looking for a specific digital solution or want to learn more about our company, our site provides all the
                information you need to make informed decisions about your digital journey.
              </p>
            </div>
          </div>
        </div> */}

        {/* Key Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)] ">Key Website Features</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-white via-black to-white mx-auto mb-8 rounded-full" />
            <p className="text-lg text-[var(--text-primary)]  max-w-3xl mx-auto font-bold">
              Our website incorporates modern design elements and functionality to provide you with an exceptional user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-800 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Design Elements</h3>
              <ul className="space-y-3">
                {[
                  "Modern glassmorphism UI with subtle backdrop blur effects",
                  "Responsive layout that adapts to all screen sizes",
                  "Animated elements and smooth transitions",
                  "Gradient accents and consistent color scheme",
                  "High-quality imagery and visual elements",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-800 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Functionality</h3>
              <ul className="space-y-3">
                {[
                  "Intuitive navigation and user-friendly interface",
                  "Interactive elements and hover effects",
                  "Contact forms for easy communication",
                  "Detailed service descriptions and case studies",
                  "Client testimonials and portfolio showcases",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-gray-900  to-gray-900 px-8 py-8 rounded-2xl backdrop-blur-sm border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Explore Our Services?</h3>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              Navigate through our website to discover how Go Digital Africa can help transform your digital presence and drive your business growth.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-blue-500 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300" />
              </button>
              <button className="border border-blue-500 text-white hover:bg-cyan-500/10 px-6 py-3 rounded-full">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}