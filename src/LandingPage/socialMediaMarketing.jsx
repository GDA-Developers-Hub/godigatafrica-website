"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart2,
  Target,
  PenTool,
  LineChart,
  Users,
  Share2,
  MessageCircle,
  Bell,
  Zap,
} from "lucide-react";
import socialmedia from "../../assets/social-media-marketing.jpeg";
import meta from "../../assets/meta.png";

export default function SocialMediaMarketing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <HeroSection />
      <ServicesSection />
      <MetaPartnerSection />
      <EngagementSection />
      <TeamSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-slate-950 to-slate-900" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Social Media{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500">
                Marketing
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Unlock the full potential of your brand with our Social Media Marketing (SMM) services. In today's digital
              age, social media is a powerhouse for connecting with your audience, building brand awareness, and driving
              business growth. At Go Digital Africa, we specialize in crafting customized social media strategies that
              resonate with your target audience and elevate your brand to new heights.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 hover:from-cyan-600 hover:via-blue-600 hover:to-amber-600 text-white border-0 group px-4 py-2 rounded-full">
              GET A QUOTE
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
              <img
                src={socialmedia}
                alt="Social Media Marketing"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent" />

              {/* Floating social media icons */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  {[Bell, Share2, MessageCircle].map((Icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Social Media Strategy Development",
      description:
        "Tailored strategies to align with your business goals. Comprehensive analysis of your target audience and competitors. Content calendars for consistent and engaging posts.",
      icon: Target,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Platform Management",
      description:
        "Expert management across all major social media platforms (Facebook, Instagram, Twitter, LinkedIn, etc.). Regular posting, monitoring, and engagement to keep your audience hooked.",
      icon: Users,
      gradient: "from-blue-500 to-amber-500",
    },
    {
      title: "Content Creation and Curation",
      description:
        "Captivating and shareable content creation. Utilization of multimedia, including images, videos, and infographics. Curated content to enhance credibility and industry authority.",
      icon: PenTool,
      gradient: "from-amber-500 to-purple-500",
    },
    {
      title: "Paid Advertising Campaigns",
      description:
        "Targeted advertising to reach your specific audience. Continuous optimization for maximum ROI. Strategic ad placement and budget management.",
      icon: BarChart2,
      gradient: "from-purple-500 to-cyan-500",
    },
    {
      title: "Analytics and Reporting",
      description:
        "Regular performance analysis and reporting. Data-driven insights to refine your strategy. Comprehensive metrics tracking and ROI measurement.",
      icon: LineChart,
      gradient: "from-cyan-500 via-blue-500 to-amber-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950/10 to-slate-900" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            What we have to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500">
              offer...
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Ready to take your social media presence to the next level? Let's embark on this journey together. Our
            social media marketing services can transform your brand's digital presence!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${service.gradient} bg-opacity-10 mb-6 inline-block`}
              >
                <service.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-slate-300 group-hover:text-white/80 transition-colors duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaPartnerSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950/5 to-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Working with a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500">
                Meta Business Partner
              </span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              By working with us, you will be partnering with a team of trained Meta (Facebook) marketing specialists to
              provide you with all-rounded support on Meta (Facebook) – which includes strategising and running
              advertisements, as well as setting up the advertising account – so that you can be free to focus on other
              aspects of your business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-cyan-500/30">
              <img src="/placeholder.svg?height=100&width=200" alt="Meta Business Partner" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EngagementSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950/10 to-slate-900" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Grow Fans and Increase{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500">
                Engagement
              </span>{" "}
              with Facebook Ads
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Boosted posts using Facebook Ads allows you to reach out a much bigger audience. Together with organic
              reach, boosted posts increases the engagement of your post and gets you new followers. Our team has
              certified Facebook Blueprint specialists that can help you with your Facebook Ads.
            </p>
            <button className="mt-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 hover:from-cyan-600 hover:via-blue-600 hover:to-amber-600 text-white border-0 group px-4 py-2 rounded-full">
              Learn More About Facebook Ads
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
              <img
                src={meta}
                alt="Facebook Ads Management"
                className="w-full h-auto "
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950/10 to-slate-900" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Professional Social Media Team"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Professional Team To{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-500">
                Manage Your Social Media
              </span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              We are Social Media Strategists, Content Marketers, Copywriters, Designers. With a creative team that
              consists of members who excel in their niche, we are confident of producing quality content that captures
              the attention of your target audiences.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {["Strategy", "Content", "Design"].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-cyan-500/20 text-center"
                >
                  <Zap className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-white font-medium">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
