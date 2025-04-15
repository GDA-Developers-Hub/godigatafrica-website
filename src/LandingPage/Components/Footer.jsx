import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { Home, Star, FileSearch, Mail } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";
import meta from "../../assets/meta.png";
import tiktok from "../../assets/tiktok.png";
import google from "../../assets/google.png";
import OpenAi from "../../assets/openai.webp";
import SocialIcons from "../Utils/SocialIcons";
import { BASE_URL } from "../../Utils/BaseUrl";
import kenya from "../../assets/kenya-flag.webp";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      Swal.fire("Oops!", "Please enter a valid email!", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/subscribe/`, { email });

      if (response.data.message) {
        Swal.fire("Success!", "You've subscribed to our newsletter!", "success");
        setEmail(""); 
      } else {
        Swal.fire("Error!", response.data.message || "Subscription failed!", "error");
      }
    } catch (error) {
      console.error("Subscription Error:", error);
      Swal.fire("Error!", "You Might be already subscribed to our newsletter!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.footer 
      ref={footerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gradient-to-t from-slate-900 via-[var(--background)] to-[var(--background)] text-white"
    >
      <div className="container md:px-12 mx-auto px-6">
        {/* Top Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col justify-between items-center md:flex-row pb-6"
        >
          {/* Logo & Tagline */}
          <motion.div 
            variants={itemVariants}
            className="p-4 rounded-full text-[var(--background-reverse)] text-center md:text-left"
          >
            <motion.h2 
              className="text-4xl font-bold mb-4 md:text-5xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-clip-text bg-gradient-to-r text-transparent from-white to-white via-blue-400">
                Go Digital Africa
              </span>
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white h-1 w-24" 
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white mt-2 font-bold"
            >
              Shaping Online Future
            </motion.p>
          </motion.div>

          {/* Partners */}
          <motion.div 
            variants={itemVariants}
            className="flex-col gap-6 md:mt-0 mt-6"
          >
            <h2 className="text-2xl font-bold">Our Partners</h2>
            <div className="flex gap-6 md:mt-0 mt-0">
              {[
                { src: google, alt: "Google Partner" },
                { src: meta, alt: "Meta Partner" },
                { src: tiktok, alt: "Tiktok Partner" },
                { src: OpenAi, alt: "OpenAI Partner" }
              ].map((partner, index) => (
                <motion.img 
                  key={index}
                  src={partner.src} 
                  alt={partner.alt} 
                  className="h-10 mt-3" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <SocialIcons />
          </motion.div>
        </motion.div>

        {/* Middle Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col bg-transparent not-first:justify-between p-6 rounded-lg w-full gap-8 items-start md:flex-row md:items-center shadow-emerald-50"
        >
          {/* Quick Links Section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col space-y-3"
          >
            <h2 className="bg-clip-text bg-gradient-to-r text-2xl text-transparent font-bold from-white to-white">
              Quick Links
            </h2>
            <div className="flex flex-col space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/blog", label: "Blog" },
                { path: "/work/portfolio", label: "Who We Are" },
                { path: "/services/social-media-marketing", label: "Marketing Solutions" },
                { path: "/projects", label: "Projects and Partnerships" },
              ].map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  <Link
                    to={link.path}
                    className="text-white w-fit group overflow-hidden py-1 relative"
                  >
                    <span className="duration-300 group-hover:text-blue-600 relative transition-colors z-10">
                      {link.label}
                    </span>
                    <span className="bg-gradient-to-r h-0.5 w-full absolute bottom-0 duration-300 from-cyan-400 group-hover:scale-x-100 left-0 origin-left scale-x-0 to-purple-600 transform transition-transform via-blue-500"></span>
                    <span className="bg-gradient-to-r h-full w-0 absolute bottom-0 duration-300 group-hover:w-full left-0 to-purple-600/10 transition-all via-blue-500/10"></span>
                  </Link>
                  
                </motion.div>    
              ))}
                <Link
                    to="/agency/our-team"
                    className="text-white w-fit group overflow-hidden py-1 relative mt-4"
                  >
                  <span className="duration-300 group-hover:text-blue-600 relative transition-colors z-10 flex items-center justify-center">
                    Made with Love by GDA Tech team
                    <img src={kenya} alt="" className="h-4 w-5 ml-1" />
                  </span>

                    <span className="bg-gradient-to-r h-0.5 w-full absolute bottom-0 duration-300 from-cyan-400 group-hover:scale-x-100 left-0 origin-left scale-x-0 to-purple-600 transform transition-transform via-blue-500"></span>
                    <span className="bg-gradient-to-r h-full w-0 absolute bottom-0 duration-300 group-hover:w-full left-0 to-purple-600/10 transition-all via-blue-500/10"></span>
                  </Link>

            </div>
          </motion.div>

          {/* Navigation Icons */}
          <motion.div variants={itemVariants}>
            <nav className="flex flex-wrap justify-center text-lg gap-8 md:justify-start">
              {[
                { to: "/agency/about-us", icon: Home, color: "text-cyan-400", label: "Agency" },
                { to: "/reviews", icon: Star, color: "text-amber-400", label: "Reviews" },
                { to: "/work/case-study", icon: FileSearch, color: "text-purple-400", label: "Case Studies" },
                { to: "/contact-us", icon: Mail, color: "text-orange-400", label: "Contact" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <Link to={item.to} className="flex flex-col text-center hover:text-[var(--blue-light)] items-center">
                    <item.icon className={`h-8 ${item.color} w-8 mb-1`} />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r h-1 w-24 from-transparent mt-4 mx-auto to-transparent via-[rgb(17,0,255)]" 
            />
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="flex flex-col bg-[var(--background)] p-6 rounded-xl shadow shadow-white text-white font-bold w-full items-center md:w-[400px]"
          >
            <h2 className="text-2xl font-semibold mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-sm mb-4 opacity-90">Get the latest updates & offers.</p>

            <motion.form 
              onSubmit={handleSubmit} 
              className="flex flex-col w-full gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[var(--text-white)]"
                placeholder="Enter your email"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 rounded-lg text-white duration-300 font-semibold hover:bg-blue-700 px-5 py-3 transition"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col border-[var(--background-light)] border-t justify-between items-center md:flex-row mt-12 pt-6"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white text-sm mb-4"
          >
            © {new Date().getFullYear()} Go Digital Africa
          </motion.p>
          {/* Bottom Links */}
          <div className="flex gap-6 md:mt-0 mt-4 sm:mb-7">
            {[
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms-and-conditions", label: "Terms and Conditions" },
              { to: "/sitemap", label: "Sitemap" },
              { to: "/glossary", label: "Glossary" }
            ].map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              >
                <Link to={link.to} className="hover:text-[var(--blue-light)]">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;