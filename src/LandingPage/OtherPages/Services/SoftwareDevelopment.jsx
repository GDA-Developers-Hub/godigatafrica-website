"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Settings,
  Smartphone,
  Users,
  Code,
  Database,
  Layout,
  Shield,
  RefreshCw,
  Key,
  Lock,
} from "lucide-react";

import laptop from "../../../assets/laptop.webp";
import web from "../../../assets/web.png";
import upload from "../../../assets/upload.jpeg";
import contentmanagement from "../../../assets/content-management.webp";
import illustration from "../../../assets/illustration.webp";
import { ServiceSEO } from "../../../SEO";

export default function SoftwareDevelopment() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
      <ServiceSEO service="softwareDevelopment" />
      <HeroSection />
      <ServicesSection />
      <WebApplicationsSection />
      <MobileApplicationsSection />
      <SecuritySection />
      <ClientsSection />
    </main>
  );
}

// Hero Section
function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[var(--background)]/80"
          style={{
            transform: `scale(1.1) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400 opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 pt-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                Information Systems &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Web Applications
                </span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6" />
              <p className="text-lg text-slate-300 leading-relaxed">
                Are you ready to take your online presence to the next level? At Go Digital Africa, we understand the
                crucial role a well-designed and functional information system and web applications have in today's
                digital landscape. Our custom-built information systems and web applications, tailored to meet the
                unique needs of your business, ensuring powerful and competitive digital solutions for a competitive
                online presence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/proposal-request" className="flex items-center rounded-4xl justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 group p-4 w-60">
                GET A QUOTE
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
             
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent z-10" />
              <img
                src={laptop}
                alt="Digital workspace with laptop"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-cyan-300 rounded-tl-xl" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-cyan-300 rounded-br-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Strategic Approach",
      description:
        "We analyze your business goals, target audience, and industry trends to create a solution that aligns perfectly with your business objectives.",
      icon: Lightbulb,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Customized Solutions",
      description:
        "No two businesses are the same, and our web solutions reflect your brand's personality and unique requirements.",
      icon: Settings,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Responsive Design",
      description:
        "With the increasing use of mobile devices, having a website that responds optimally on various screen sizes is essential.",
      icon: Smartphone,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Our intuitive user experience (UX) is our priority, ensuring visitors can navigate your website efficiently.",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[var(--background-light)]/80">
      {/* Background elements */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--background-light)]/80" />
      </div> */}
      {/* Decorative elements */}
      {/* <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" /> */}

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-bold mb-3 tracking-wider text-sm uppercase">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">
            What we have to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">offer...</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Your digital presence is often the first interaction a potential customer has with your brand. At Go Digital
            Africa, our information systems and apps help businesses and brands stand out online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl bg-slate-900 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} bg-opacity-10`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="h-4 w-4 text-white/70" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-300 group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
              {/* Animated border on hover */}
              <div
                className={`absolute inset-0 rounded-xl pointer-events-none ${
                  hoveredCard === index ? "border-2 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : ""
                } transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Web Applications Section
function WebApplicationsSection() {
  return (
    <section className="relative py-24 bg-[var(--background)]/80 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={web}
                alt="Web application development"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-transparent to-transparent" />
              {/* Code overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
                <div className="font-mono text-xs text-cyan-400/80 overflow-hidden">
                  <div>{'<div className="app-container">'}</div>
                  <div>{"  <Header />"}</div>
                  <div>{"  <main>"}</div>
                  <div>{"    <Dashboard data={userData} />"}</div>
                  <div>{"  </main>"}</div>
                  <div>{"</div>"}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                WEBSITES &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500">
                  WEB BASED APPLICATIONS
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mb-6" />
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Go Digital Africa creates web solutions that automate business processes through customized software
                development, legacy application modernization, project recovery, and e-learning solutions.
              </p>
            </div>

            <div className="space-y-6">
              <FeatureItem
                icon={<Layout className="h-5 w-5 text-cyan-400" />}
                title="Strategic Approach"
                description="Before starting any development work, it is important to plan, select and implement the elements of the web application that best fit your business needs."
              />
              <FeatureItem
                icon={<Code className="h-5 w-5 text-cyan-400" />}
                title="Customized Solutions"
                description="We develop bespoke solutions to better meet the specific needs and requirements of a specific project. Customized solutions can provide a competitive advantage."
              />
              <FeatureItem
                icon={<Database className="h-5 w-5 text-cyan-400" />}
                title="Responsive Design"
                description="The design approach that aims to create websites and applications with a wide range of devices and screen sizes, from desktop computers to mobile devices."
              />
              <FeatureItem
                icon={<Shield className="h-5 w-5 text-cyan-400" />}
                title="Security Focus"
                description="Security is a critical aspect of web development, as protecting sensitive data and user information is essential to maintaining trust and safeguarding against cyber threats."
              />
            </div>
            <Link to="/contact-us" className="flex items-center rounded-4xl justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 group p-4 w-60">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Mobile Applications Section
function MobileApplicationsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[var(--background-light)]">
      {/* Background elements */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      </div> */}
      {/* Decorative elements */}
      {/* <div className="absolute top-20 right-10 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" /> */}

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Right image - Mobile app mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              {/* Main phone mockup */}
              <div className="relative z-20 mx-auto w-[280px]">
                <div className="rounded-[6px] overflow-hidden border-8 border-slate-800 shadow-2xl shadow-cyan-500/10">
                  <img
                    src={illustration}
                    alt="Mobile application interface"
                    className="w-full h-auto"
                  />
                </div>
                {/* UI Elements overlay */}
                <div className="absolute top-[20%] left-[10%] right-[10%] p-4 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-white/10 text-white text-sm">
                  <div className="flex justify-between items-center">
                    <div>Responsviness</div>
                    <div className="text-cyan-400 font-bold">100%</div>
                  </div>
                </div>
                <div className="absolute bottom-[20%] left-[10%] right-[10%] p-4 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-white/10 text-white text-sm">
                  <div className="flex justify-between items-center">
                    <div>Security level</div>
                    <div className="text-cyan-400 font-bold">High</div>
                  </div>
                </div>
              </div>
              {/* Secondary phone mockup (background) */}
              <div className="absolute top-[10%] -right-[5%] w-[240px] z-10 opacity-70 rotate-6">
                <div className="rounded-[36px] overflow-hidden border-8 border-slate-800 shadow-xl">
                  <img
                    src={contentmanagement}
                    alt="Secondary mobile interface"
                    className="w-full h-full"
                  />
                </div>
              </div>
              {/* Tertiary phone mockup (background) */}
              <div className="absolute top-[15%] -left-[5%] w-[240px] z-0 opacity-70 -rotate-6">
                <div className="rounded-[36px] overflow-hidden border-8 border-slate-800 shadow-xl">
                  <img
                    src={upload}
                    alt="Tertiary mobile interface"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
                <span className="text-transparent bg-clip-text bg-[var(--logo-bg)]">Mobile {" "}</span>
                Applications
              </h2>
              <div className="h-1 w-24 bg-[var(--text-primary)] rounded-full mb-6" />
              <p className="text-lg text-[var(--text-primary)] leading-relaxed mb-6 font-bold">
                At Go Digital Africa we help you manage all your business activities on the go. Our team of experts
                supports multiple easy-to-use mobile applications. Our technology competencies covers iOS, Android,
                Windows, Blackberry and feature phones.
              </p>
            </div>

            <div className="space-y-6">
              <FeatureItem
                icon={<Shield className="h-5 w-5 text-blue-400" />}
                title="Secure coding practices"
                description="Follow secure coding guidelines and best practices to develop secure applications in the first place. This includes input validation to prevent common security issues like injection attacks."
              />
              <FeatureItem
                icon={<RefreshCw className="h-5 w-5 text-blue-400" />}
                title="Data synchronization"
                description="Implement efficient data sync between the mobile device and server. This ensures that data remains consistent across devices using strong replication algorithms, equipment data encryption, and the ability to work for low-bandwidth connections."
              />
              <FeatureItem
                icon={<Key className="h-5 w-5 text-blue-400" />}
                title="Multi-factor authentication"
                description="Implement secure user authentication methods, such as multi-factor authentication (MFA), strong password policies, and biometric authentication to protect your application and authorization. Protect user credentials, session tokens, and sensitive information to prevent unauthorized access."
              />
              <FeatureItem
                icon={<Smartphone className="h-5 w-5 text-blue-400" />}
                title="User customization"
                description="Allow users to customize their experience by restricting user access to specific features, data, and functionalities based on user roles and privileges."
              />
            </div>
            {/* <button className="flex items-center rounded-4xl justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 group p-4 w-60">
              Explore Mobile Solutions
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Security Section
function SecuritySection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[var(--background)]">
      {/* Background elements */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      </div> */}
      {/* Decorative elements */}
      {/* <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" /> */}

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-white font-medium mb-3 tracking-wider text-sm uppercase">Protection & Privacy</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-transparent bg-[var(--text-primary)] bg-clip-text">
              ONLINE DATA
            </span>{" "}
            SECURITY
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-white max-w-2xl mx-auto">
            We provide our customers with the power to protect important information through our cloud-based system.
            This gives effective data security for emails, websites, and overall online presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left security features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full space-y-8"
            >
              <SecurityFeature
                icon={<Lock className="h-6 w-6 text-cyan-400" />}
                title="Strong encryption"
                description="Implement encryption techniques, such as Secure Sockets Layer (SSL) and Transport Layer Security (TLS), for data transmitted over networks. Encrypt sensitive data at rest using encryption algorithms to prevent unauthorized access."
                delay={0}
              />
              <SecurityFeature
                icon={<Shield className="h-6 w-6 text-cyan-400" />}
                title="Intrusion detection and prevention"
                description="Implement intrusion detection and prevention systems (IDS/IPS), and virtual private networks (VPNs) to protect against unauthorized access, malware, and cyber attacks."
                delay={0.1}
              />
              <SecurityFeature
                icon={<Key className="h-6 w-6 text-cyan-400" />}
                title="Multi-factor authentication (MFA)"
                description="Implement multi-factor authentication for administrators and end-users to add an extra layer of security. Combine something you know (password), something you have (security token), and something you are (biometric) to log in with the latest security practices and technologies."
                delay={0.2}
              />
            </motion.div>

            {/* Right security features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full space-y-8"
            >
              <SecurityFeature
                icon={<Database className="h-6 w-6 text-cyan-400" />}
                title="Regular updates"
                description="Update management policies for websites, servers, and applications to prevent unauthorized access. Require strong passwords, use a combination of uppercase and lowercase letters, and implement regular password rotation."
                delay={0.3}
              />
              <SecurityFeature
                icon={<Lock className="h-6 w-6 text-cyan-400" />}
                title="Data backup and disaster recovery"
                description="Implement regular data backups and maintain copies in secure offline locations. Develop critical data to secure offline locations, cloud storage, or both to ensure data availability and recovery in case of system incidents."
                delay={0.4}
              />
            </motion.div>
          </div>

          {/* Security image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10 h-[500px]"
          >
            <img
              src={laptop}
              alt="Data security visualization"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col items-center">
                  <Lock className="h-16 w-16 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise-Grade Security</h3>
                  <p className="text-slate-300 text-center mb-6">
                    Our security solutions are built to protect businesses of all sizes with enterprise-level
                    protection.
                  </p>
                 <button className="flex items-center rounded-4xl justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 group p-4 w-60">

                    Learn About Our Security
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch client data on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/clients/`);
        setClients(response.data);
      } catch (error) {
        setError('Failed to fetch client data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--background-light)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[var(--text-primary)] font-bold mb-3 tracking-wider text-sm uppercase">
            Trusted By Industry Leaders
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">Trusted</span>{" "}
            Clients
          </h2>
          <p className="text-lg text-[var(--text-primary)] max-w-2xl mx-auto">
            We've had the privilege of working with organizations of all sizes across various industries.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500">Loading clients...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16"
          >
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="p-4 flex justify-center items-center">
                  {client.logo && (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-40 object-contain rounded-xl transition-transform duration-300 hover:scale-105"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-slate-900 to-slate-900 px-8 py-8 rounded-2xl backdrop-blur-sm border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to transform your digital presence?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join our growing list of satisfied clients and experience the difference our expertise can make for your
              business.
            </p>
            <Link to="/proposal-request" className="flex items-center rounded-4xl justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 group p-4 w-60">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
        <p className="text-[var(--text-primary)]">{description}</p>
      </div>
    </div>
  );
}

// Security Feature Component
function SecurityFeature({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex gap-4 p-6 rounded-xl bg-slate-800 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </motion.div>
  );
}
