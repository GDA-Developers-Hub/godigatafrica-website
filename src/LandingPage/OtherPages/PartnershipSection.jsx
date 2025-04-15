"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Megaphone, PenTool, TrendingUp } from "lucide-react";
import CountUp from "react-countup";
import partnership from "../../assets/handshake.avif";
import { Link } from "react-router-dom";
const services = [
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to boost your online presence",
    icon: TrendingUp,
    items: ["Social Media Management", "SEO", "SEM", "Content Creation"],
  },
  {
    title: "Website Development",
    description: "Custom web solutions that drive results",
    icon: Globe,
    items: ["Responsive Design", "E-commerce", "CMS Development", "Web Applications"],
  },
  {
    title: "Advertisement",
    description: "Strategic ad campaigns that convert",
    icon: Megaphone,
    items: ["PPC Advertising", "Display Ads", "Social Media Ads", "Retargeting"],
  },
  {
    title: "Content Marketing",
    description: "Engaging content that tells your story",
    icon: PenTool,
    items: ["Content Strategy", "Blog Writing", "Video Production", "Infographics"],
  },
];

const stats = [
  { value: 86, label: "Increase in conversion rates", suffix: "%" },
  { value: 150, label: "Strategic partnerships formed", suffix: "+" },
  { value: 92, label: "Client satisfaction rate", suffix: "%" },
];

export default function PartnershipsSection() {
  return (
    <section className="relative py-30 bg-[var(--card-background)]  overflow-hidden text-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Strategic Partnerships and{" "}
              <span className="text-[var(--text-primary)] bg-clip-text ">Innovative Solutions</span>
            </h1>
            <p className="text-lg text-white font-bold">
              We specialize in forming strong alliances with sponsors and stakeholders to deliver tailored digital solutions that elevate your business.
            </p>
            <Link to="/partnerships" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-[var(--logo-bg)] hover:from-cyan-600 hover:via-blue-600 hover:to-blue-600 text-white px-6 py-3 rounded-full flex items-center justify-center">
              Explore Partnerships
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
              <img src={partnership}alt="Strategic Partnerships" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.items.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-20 text-center">
          <div className="inline-block bg-slate-800 px-8 py-8 rounded-2xl border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Partner With Us?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our network of strategic partners and let's create innovative digital solutions together.
            </p>
            <Link to="/contact-us" className="bg-[var(--logo-bg)] hover:bg-blue-400 text-white px-6 py-3 rounded-full flex items-center justify-center">
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
