import React, { useEffect } from "react";
import { ArrowRight, BarChart3, Layers, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// A simple utility to concatenate class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WhyUsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="relative py-5 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Abstract background"
          className="object-cover opacity-20"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-[var(--background-light)]" />
      </div>

      {/* Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" 
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Top Heading and Content - Asymmetrical Layout */}
        <div ref={ref} className="max-w-4xl mx-auto mb-20">
          <div className="flex flex-col items-start">
            <motion.span 
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              className="text-[var(--logo-bg)] font-extrabold mb-3 tracking-wider text-1xl uppercase"
            >
              Why Choose Us
            </motion.span>
            
            <motion.h2 
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[var(--text-secondary)]"
            >
              Why{" "}
              <span className="bg-[var(--logo-bg)] text-transparent bg-clip-text">
                Go Digital Africa
              </span>{" "}
              is your top-choice
            </motion.h2>

            <motion.div 
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, width: 0 },
                visible: { opacity: 1, width: "5rem" }
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 w-20 bg-gradient-to-r from-[var(--logo-bg)] to-[var(--text-primary)] mb-8 rounded-full" 
            />

            <motion.p 
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl leading-relaxed font-semibold mb-10 text-[var(--text-secondary)]"
            >
              At Go Digital Africa, we're not just a digital marketing agency — we're your dedicated partner in
              achieving online excellence. With a team of seasoned professionals, innovative strategies, and a passion
              for delivering results, we empower businesses to thrive in the ever-evolving digital landscape.
            </motion.p>

            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/proposal-request" className="group relative inline-flex items-center justify-center bg-[var(--logo-bg)] text-white px-8 py-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30">
                <span className="relative z-10 flex items-center font-medium">
                  Get Proposal
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Three Feature Cards - Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedFeatureCard
            icon={<BarChart3 className="text-indigo-500" size={28} />}
            title="Data-driven Approach"
            description="We believe in the power of data. Our strategies are backed by in-depth analysis and insights, allowing us to make informed decisions that drive tangible results. We continuously monitor and optimize campaigns to ensure maximum ROI."
            index={0}
          />

          <AnimatedFeatureCard
            icon={<Layers className="text-purple-500" size={28} />}
            title="Bespoke Solutions"
            description="One size does not fit all! We understand that each business is unique, and that's why we tailor our strategies to meet your specific needs. Whether you're a startup or an established brand, we've got you covered."
            index={1}
          />

          <AnimatedFeatureCard
            icon={<Users className="text-pink-500" size={28} />}
            title="Expert Team"
            description="Our team comprises industry experts who are well-versed in the latest digital marketing trends. From Website development, SEO, Social media Management to content creation and PPC campaigns, we have the skills to elevate your business."
            index={2}
          />
        </div>

        {/* Bottom Decorative Element */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="flex justify-center mt-20"
        >
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ 
                  width: i === 0 ? "3rem" : i === 1 ? "1.5rem" : "0.75rem", 
                  opacity: 1 
                }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.3 * i
                }}
                viewport={{ once: true }}
                className={cn(
                  "h-2 rounded-full bg-gradient-to-r from-blue-200 to-[var(--logo-bg)]"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedFeatureCard({ icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        delay: 0.2 * index,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative p-8 rounded-xl bg-gradient-to-bl  from-[var(--background)] to-[var(--card-background)] backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + (0.1 * index) }}
            viewport={{ once: true }}
            className="p-3 bg-slate-900/50 rounded-lg border border-white/10"
          >
            {icon}
          </motion.div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="text-white/90" size={16} />
          </div>
        </div>

        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + (0.1 * index) }}
          viewport={{ once: true }}
          className="text-xl font-semibold mb-3 text-white group-hover:text-indigo-300 transition-colors duration-300"
        >
          {title}
        </motion.h3>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + (0.1 * index) }}
          viewport={{ once: true }}
          className="leading-relaxed text-slate-300"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}