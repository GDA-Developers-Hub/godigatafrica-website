"use client";

import { motion } from "framer-motion";
import { Check, Info} from "lucide-react";
import { Link} from "react-router-dom";

const packages = [
  {
    name: "STARTER",
    price: "30,000",
    currency: "KSH",
    features: [
      "1 Social media platform",
      "24 Posts per month (6 post per week)",
      "Graphic Design",
      "Ads (1 Post Per Month)",
      "Dedicated account manager",
      "Detailed monthly reports and analysis",
    ],
    color: "from-blue-400 to-blue-600",
    popular: false,
  },
  {
    name: "PREMIUM",
    price: "60,000",
    currency: "KSH",
    features: [
      "2 Social media platforms",
      "48 Posts per month (12 post per week)",
      "Quality Graphic Design",
      "Ads (2 Post Per Month)",
      "Photography",
      "Checking Statistics",
      "Detailed Monthly Report & Analysis",
    ],
    color: "from-cyan-400 to-blue-600",
    popular: true,
  },
  {
    name: "GOLD",
    price: "120,000",
    currency: "KSH",
    features: [
      "4 Social media platforms",
      "72 Posts per month (18 post per week)",
      "High-Quality Poster Graphic Design",
      "Ads (4 Posts Per Month)",
      "Videography & Photography",
      "Dedicated Account Manager",
      "Detailed Monthly Report & Analysis",
      "Checking Statistics",
      "Engaging Clients",
    ],
    color: "from-amber-400 to-amber-600",
    popular: false,
  },
];

const additionalServices = [
  {
    name: "Top 5 Trendsetting",
    description: "for Twitter, Instagram, Facebook",
    price: "50,000",
  },
  {
    name: "Additional Ads",
    description: "Per platform",
    price: "20,000",
  },
];

const paymentDetails = {
  paybill: "542542",
  account: "447911",
  accountName: "Go Digital Africa Solutions LTD",
};

export default function PricingSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[var(--background-light)]">
      {/* Background elements */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/10 to-slate-950" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" /> */}

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-blue-500 font-bold mb-3 tracking-wider text-sm uppercase block">Pricing</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--logo-bg)]">
            Social Media Management Packages
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 via-white to-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-[var(--text-secondary)] font-bold">
            Choose the perfect package to enhance your social media presence and engage with your audience effectively.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group bg-gray-800  backdrop-blur-sm rounded-2xl p-8 border-2 border-white/10 hover:border-cyan-500/30 transition-all duration-300 ${
                pkg.popular ? "lg:-translate-y-4 shadow-xl shadow-cyan-500/10" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium px-4 py-1 rounded-full">
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
              <Link to="/proposal-request" className={`min-w-full bg-gradient-to-r ${pkg.color} text-white px-4 py-2 rounded-full`}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-transparent shadow-[var(--text-secondary)] backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-secondary)] mb-6 flex items-center gap-2">
            Additional Services
            <span title="Extra services you can add to any package">
              <Info className="h-5 w-5 text-amber-400" />
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-bl  from-[var(--background)] to-[var(--card-background)]  backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    <p className="text-white text-sm font-extrabold">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-white/80 font-bold">KSH</span>
                    <span className="text-xl font-bold text-white/90 font-bold ml-1">{service.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-bl  from-[var(--background)] to-[var(--card-background)]  px-8 py-8 rounded-2xl backdrop-blur-sm border border-cyan-500/20">
            <h3 className="text-2xl  text-white font-extrabold mb-6">Terms of Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-white font-bold mb-1">Paybill Number</p>
                <p className="text-xl text-white/70 font-extrabold">{paymentDetails.paybill}</p>
              </div>
              <div>
                <p className="text-white font-bold mb-1">Account</p>
                <p className="text-xl text-white/70 font-extrabold">{paymentDetails.account}</p>
              </div>
              <div>
                <p className="text-white font-bold mb-1">Account Name</p>
                <p className="text-xl  text-white/70 font-extrabold">{paymentDetails.accountName}</p>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
