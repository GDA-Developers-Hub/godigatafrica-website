import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Lightbulb,
  Search,
  ThumbsUp,
  Globe,
  MonitorSmartphone,
  Handshake,
  Palette,
  Brain,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// Define the service card data
const serviceCards = [
  {
    title: "Google Marketing Solutions",
    icon: Lightbulb,
    items: ["SEM", "Google Shopping", "Google Display Network", "YouTube Ads"],
  },
  {
    title: "SEO Solutions",
    icon: Search,
    items: [
      "SEO",
      "SERM",
      "SEO Referral Program",
      "International SEO",
      "Local SEO",
      "SEO Copywriting",
      "E-commerce SEO",
      "Shopify SEO",
      "Video SEO",
    ],
  },
  {
    title: "Social Media Marketing Solutions",
    icon: ThumbsUp,
    items: ["Paid Social", "Social Media Management", "LinkedIn Ads"],
  },
  {
    title: "Website Development Solutions",
    icon: Globe,
    items: [
      "E-commerce Website Design and Development",
      "Corporate Website Design and Development",
      "Dedicated Landing Page Development",
      "Website Maintenance",
      "Domain/Hosting",
    ],
  },
  {
    title: "Content Marketing",
    icon: MonitorSmartphone,
    items: [
      "Copywriting",
      "Content Marketing",
      "Skyscraper Content",
      "Social Media Content",
      "Infographic Content Creation",
      "Blog Article",
    ],
  },
  {
    title: "Agency Partnership Program",
    icon: Handshake,
    items: ["Digital Marketing Referral Program"],
  },
  {
    title: "Creative Solutions",
    icon: Palette,
    items: ["Display Ads Production", "YouTube Video Ads Production"],
  },
  {
    title: "AI-Powered Solutions",
    icon: Brain, 
    items: [
        "Intelligent Automation",
        "Predictive Analytics",
        "AI Chatbots & Virtual Assistants",
        "Personalized Marketing AI",
        "Data-Driven Decision Making",
        "Machine Learning Models",
        "Computer Vision & Image Recognition"
    ],
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// ScrollAnimationWrapper component
const ScrollAnimationWrapper = ({ children, variants, className, threshold = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function MarketingServices() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="relative min-h-screen bg-[var(--background-light)] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-no-repeat bg-right-top opacity-20" />
      </div>

      {/* Decorative circles */}
      <ScrollAnimationWrapper 
        variants={fadeIn}
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[rgb(72,202,249)]/5 blur-3xl" 
      />
      <ScrollAnimationWrapper 
        variants={fadeIn}
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[rgb(72,202,249)]/5 blur-3xl" 
      />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <main>
          <ScrollAnimationWrapper 
            variants={slideUp}
            className="text-center mb-16"
            threshold={0.3}
          >
            <motion.span 
              variants={slideUp}
              className="inline-block text-[rgb(67,155,255)] font-bold mb-3 tracking-wider text-sm uppercase"
            >
              Our Expertise
            </motion.span>
            <motion.h1 
              variants={slideUp}
              className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              <span className="text-transparent bg-clip-text bg-[var(--logo-bg)]">
                Our Services Tailored to Your Needs
              </span>
            </motion.h1>
            <motion.div 
              variants={slideUp}
              className="h-1 w-24 bg-gradient-to-r from-transparent via-[rgb(255,255,255)] to-transparent mx-auto mb-6" 
            />
            <motion.p 
              variants={slideUp}
              className="text-[var(--text-color)] font-bold max-w-2xl mx-auto text-lg"
            >
              Comprehensive digital marketing solutions designed to elevate your brand and drive measurable results
            </motion.p>
          </ScrollAnimationWrapper>

          {/* Services Grid */}
          <ScrollAnimationWrapper 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            threshold={0.1}
          >
            {serviceCards.map((card, index) => (
              <motion.div
                key={index}
                variants={slideIn}
                custom={index}
                whileHover={{ y: -10 }}
                className="group relative bg-[var(--card-background)] shadow-[var(--text-secondary)] backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-500 hover:border-[rgb(72,202,249)]/50"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hover background effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[var(--background)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <motion.div 
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="w-16 h-16 rounded-2xl bg-[rgb(72,202,249)]/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500"
                    >
                      <card.icon
                        className="w-8 h-8 text-white group-hover:text-cyan-300 transition-colors duration-500"
                      />
                    </motion.div>

                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileHover={{ x: 5 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[rgb(72,202,249)]"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.span>
                  </div>

                  <h2 className="text-xl font-bold text-[var(--text-secondary)] mb-4 group-hover:text-[rgb(72,202,249)] transition-colors duration-300">
                    {card.title}
                  </h2>

                  <motion.ul 
                    variants={staggerContainer}
                    className="space-y-2 text-white/70"
                  >
                    {card.items.map((item, itemIndex) => (
                      <motion.li 
                        key={itemIndex} 
                        variants={slideIn}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-[rgb(72,202,249)]">•</span>
                        <span className=" text-white/80 font-medium transition-colors duration-300">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Hidden "Learn More" that appears on hover */}
                  {/* <div className="mt-6 overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
                    <motion.button 
                      whileHover={{ x: 5 }}
                      className="flex items-center text-[rgb(72,202,249)] font-medium"
                    >
                      Learn more
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </div> */}
                </div>

                {/* Animated border on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl pointer-events-none ${
                    hoveredCard === index
                      ? "border-2 border-[rgb(72,202,249)]/30 shadow-[0_0_15px_rgba(72,202,249,0.3)]"
                      : ""
                  } transition-all duration-500`}
                />
              </motion.div>
            ))}
          </ScrollAnimationWrapper>

          {/* Bottom CTA */}
          <ScrollAnimationWrapper 
            variants={slideUp}
            className="text-center mt-16"
            threshold={0.2}
          >
            <motion.div 
              variants={slideUp}
              whileHover={{ y: -5 }}
              className="inline-block bg-transparent shadow-2xl shadow-slate-700 px-8 py-6 rounded-2xl backdrop-blur-sm border border-[rgb(72,202,249)]/20"
            >
              <motion.h3 
                variants={slideUp}
                className="text-2xl font-bold text-[var(--text-secondary)] mb-4"
              >
                Ready to elevate your digital presence?
              </motion.h3>
              <motion.button 
                variants={slideUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-8 py-3 bg-[var(--logo-bg)] text-white font-bold rounded-lg hover:bg-[rgb(72,202,249)]/90 transition-all duration-300"
              >
                <Link to="/proposal-request" className="relative z-10 flex items-center">
                  Get Started Today
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </Link>
              </motion.button>
            </motion.div>
          </ScrollAnimationWrapper>
        </main>
      </div>
    </div>
  );
}