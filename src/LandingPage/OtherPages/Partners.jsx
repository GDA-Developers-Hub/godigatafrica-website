"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";

import brand1 from "../../assets/au-center.png";
import brand2 from "../../assets/best-lady.png";
import brand3 from "../../assets/cawee.png";
import brand4 from "../../assets/classic-safari.png";
import brand5 from "../../assets/hp.png";
import brand6 from "../../assets/inch-cape.png";
import brand7 from "../../assets/mi-vida.png";
import brand8 from "../../assets/rubis.png";
import image01 from "../../assets/meta.png";
import image02 from "../../assets/tiktok.png";
import image03 from "../../assets/Partners/salesforce.jpeg";
import image04 from "../../assets/openai.webp";

// Mock client brand logos
const clientBrands = [
  { name: "AU Center", logo: brand1, industry: "Government" },
  { name: "Best Lady", logo: brand2, industry: "Beauty & Cosmetics" },
  { name: "CAWEE", logo: brand3, industry: "Women Empowerment" },
  { name: "Classic Safari", logo: brand4, industry: "Tourism & Travel" },
  { name: "HP", logo: brand5, industry: "Technology" },
  { name: "Inch Cape", logo: brand6, industry: "Energy" },
  { name: "Mi Vida", logo: brand7, industry: "Real Estate" },
  { name: "Rubis", logo: brand8, industry: "Energy" },
];

// Technology partners
const techPartners = [
  {
    name: "Meta",
    logo: image01,
    description: "Official Meta Business Partner",
    benefits: [
      "Advanced Facebook & Instagram advertising capabilities",
      "Early access to new Meta marketing features",
      "Specialized training and certification",
    ],
  },
  {
    name: "TikTok",
    logo: image02,
    description: "TikTok Marketing Partner",
    benefits: [
      "Enhanced TikTok campaign management",
      "Access to exclusive TikTok creative tools",
      "Performance optimization expertise",
    ],
  },
  {
    name: "Google",
    logo: image03,
    description: "Google Partner",
    benefits: [
      "Google Ads optimization expertise",
      "Analytics and data insights specialization",
      "Search engine marketing certification",
    ],
  },
  {
    name: "OpenAI",
    logo: image04,
    description: "AI Implementation Partner",
    benefits: [
      "Advanced AI integration for marketing",
      "Custom GPT development for businesses",
      "AI-powered content creation solutions",
    ],
  },
];

// Partnership stats
const partnershipStats = [
  { value: 50, label: "Client brands across Africa", suffix: "+" },
  { value: 8, label: "Years of strategic partnerships", suffix: "+" },
  { value: 4, label: "Global technology partners", suffix: "" },
];

export default function Partners() {
  return (
    <section className="relative py-30 overflow-hidden bg-[var(--card-background)] text-white">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
             <span className="inline-block py-1 px-3 bg-cyan-500/10 text-[var(--text-primary)] mb-4 rounded-full text-sm font-bold">
              OUR PARTNERS & CLIENTS
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our  Partners  & Clients
            </h1>
            <p className="text-lg text-[var(--text-primary)] font-bold">
              Go Digital Africa collaborates with leading brands and technology partners to deliver exceptional digital
              solutions.
            </p>
          </motion.div>
        </div>

        {/* Partnership Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {partnershipStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-700 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <p className="text-slate-100 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Client Brands */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Trusted By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clientBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-slate-700 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 flex flex-col items-center"
              >
                <img src={brand.logo} alt={brand.name} className="h-16 mb-4 filter grayscale hover:grayscale-0 rounded-full" />
                <h3 className="text-white font-medium">{brand.name}</h3>
                <p className="text-slate-100 text-sm font-medium">{brand.industry}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Partners */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Technology Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-700 rounded-2xl p-8 border border-white/10 hover:border-cyan-500/30"
              >
                <div className="flex items-center gap-6 mb-6">
                  <img src={partner.logo} alt={partner.name} className="h-16 w-16 rounded-xl bg-white/10 p-2" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
                    <p className="text-cyan-400">{partner.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {partner.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
