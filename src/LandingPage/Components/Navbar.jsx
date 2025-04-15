import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Briefcase,
  Building,
  Layers,
  Newspaper,
  Handshake,
  Phone,
  Search,
  Globe,
  Code,
  PenTool,
  MessageSquare,
  Star,
  Monitor,
  Users,
  FileText,
  Award,
} from "lucide-react";
import Toggle from "../../Utils/ToogleButton";
import logo from "../../assets/logo.png";
import logofv from "../../assets/Partners/image.png";
import skill from "../../assets/spinner/image.png";
import adcraft from "../../assets/adcraft.jpg";

// ClassNames component to replace the cn utility function
const ClassNames = ({ children, className = "", conditionalClasses = {} }) => {
  // Combine the base className with conditional classes
  const finalClassName = Object.entries(conditionalClasses).reduce(
    (acc, [key, value]) => (value ? `${acc} ${key}` : acc),
    className
  );

  return React.cloneElement(children, { className: finalClassName });
};

const partnersList = [
  { name: "SwiftSkillSquad", logo: logofv, alt: "Google Partner Logo" },
  { name: "SkillLink", logo: skill, alt: "Facebook Partner Logo" },
  { name: "AdCraft", logo: adcraft, alt: "Microsoft Advertising Logo" },
]


const servicesMegaMenu = [
  {
    title: "Google Marketing Solutions",
    icon: <Search className="h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />,
    links: [
      { name: "Google Ads", path: "/services/google-ads" },
      { name: "Search Engine Marketing", path: "/services/sem" },
      { name: "Google Shopping", path: "/services/google-shopping" },
      { name: "Google Display Network", path: "/services/google-display-network" },
      { name: "YouTube Ads", path: "/services/youtube-ads" },
    ],
  },
  {
    title: "SEO Solutions",
    icon: <Globe className="h-5 w-5 text-cyan-400 group-hover:text-cyan-500 transition-colors" />,
    links: [
      { name: "SEO", path: "/services/seo" },
      { name: "SERM", path: "/services/serm" },
      // { name: "SEO Referral Program", path: "/services/seo-referral" },
      { name: "International SEO", path: "/services/internal-seo" },
      { name: "Local SEO", path: "/services/local-seo" },
      { name: "Technical SEO", path: "/services/technical-seo" },
    ],
  },
  {
    title: "Website Solutions",
    icon: <Code className="h-5 w-5 text-amber-600 group-hover:text-blue-500 transition-colors" />,
    links: [
      { name: "E-commerce Design", path: "/services/ecommerce-design" },
      { name: "Corporate Web Dev", path: "/services/corporate-website" },
      { name: "Landing Page Dev", path: "/services/landing-page" },
      { name: "Maintenance & Management", path: "/services/website-maintenance" },
    ],
  },
  {
    title: "Content Marketing",
    icon: <PenTool className="h-5 w-5 text-pink-400 group-hover:text-pink-500 transition-colors" />,
    links: [
      { name: "Copywriting", path: "/services/copywriting" },
      { name: "Content Marketing", path: "/services/content-marketing" },
      { name: "Social Media Content", path: "/services/social-media-content" },
    ],
  },
  {
    title: "Social Media Marketing",
    icon: <MessageSquare className="h-5 w-5 text-red-700 group-hover:text-indigo-500 transition-colors" />,
    links: [
      { name: "Paid Social", path: "/services/paid-social" },
      { name: "Social Media Marketing", path: "/services/social-media-marketing" },
      { name: "Social Media Management", path: "/services/social-media-management" },
      { name: "LinkedIn Ads", path: "/services/linkedin-ads" },
    ],
  },
  {
    title: "Others",
    icon: <Star className="h-5 w-5 text-amber-400 group-hover:text-amber-500 transition-colors" />,
    links: [{ name: "Influencer Marketing", path: "/services/influencer-marketing" }],
  },
];

const agencyDropdown = {
  title: "Agency Information",
  icon: <Building className="h-5 w-5 text-blue-400 group-hover:text-blue-500 transition-colors" />,
  links: [
    { name: "About Us", path: "/agency/about-Us", icon: <Building className="h-4 w-4" /> },
    { name: "Our Team", path: "/agency/our-team", icon: <Users className="h-4 w-4" /> },
    { name: "Partners", path: "/agency/partners", icon: <Handshake className="h-4 w-4" /> },
    { name: "News", path: "/agency/news", icon: <Newspaper className="h-4 w-4" /> },
    { name: "Careers", path: "/agency/careers", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Awards", path: "/agency/awards", icon: <Award className="h-4 w-4" /> },
  ],
};

const workDropdown = {
  title: "",
  icon: <Layers className="h-5 w-5 text-green-400 group-hover:text-green-500 transition-colors" />,
  links: [
    { name: "Portfolio", path: "/work/portfolio", icon: <Monitor className="h-4 w-4" /> },
    { name: "Case Studies", path: "/work/case-study", icon: <FileText className="h-4 w-4" /> },
  ],
};

const navItems = [
  { name: "Home", path: "/", icon: <Home className="h-5 w-5 mr-2" /> },
  {
    name: "Services",
    icon: <Briefcase className="h-5 w-5 mr-2" />,
    megaDropdown: servicesMegaMenu,
  },
  {
    name: "Agency",
    icon: <Building className="h-5 w-5 mr-2" />,
    dropdown: agencyDropdown,
  },
  {
    name: "Work",
    icon: <Layers className="h-5 w-5 mr-2" />,
    dropdown: workDropdown,
  },
  { name: "Blog", path: "/blog", icon: <Newspaper className="h-5 w-5 mr-2" /> },
  { name: "Partnerships", path: "/projects", icon: <Handshake className="h-5 w-5 mr-2" /> },
  { name: "Contact", path: "/contact-us", icon: <Phone className="h-5 w-5 mr-2" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [servicesMegaMenuOpen, setServicesMegaMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setServicesMegaMenuOpen(false);
  }, [pathname]);

  // Close services mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesMegaMenuOpen && !event.target.closest('.services-mega-menu-container')) {
        setServicesMegaMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesMegaMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-white backdrop-blur-md shadow-lg"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
          {/* Logo */}
            <Link to="/" className="relative z-10">
              <div
                className={`w-auto relative transition-all duration-500 ${
                  scrolled ? "h-10 w-12" : "h-24 w-24"
                } sm:${scrolled ? "h-10 w-12" : "h-20 w-20"}`}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  <img
                    src={logo}
                    alt="logo"
                    className={`rounded transition-all duration-500 ${
                      scrolled ? "h-10 w-12" : "h-20 w-24"
                    } sm:${scrolled ? "h-10 w-12" : "h-20 w-20"}`}
                  />
                </div>
              </div>
            </Link>
            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.megaDropdown ? (
                    <div className="relative">
                    <div
                      onMouseEnter={() => setServicesMegaMenuOpen(true)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                        pathname.startsWith('/services')
                          ? scrolled
                            ? "text-black bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm"
                            : "text-white bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm"
                          : scrolled
                          ? "text-black hover:text-black hover:bg-white/10"
                          : "text-white hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        {item.name}
                      </span>
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform ${
                          servicesMegaMenuOpen ? "rotate-180" : ""
                        }`} 
                      />
                    </div>
                  </div>
                  ) : item.dropdown ? (
                    <div className="relative group">
                      <Link
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          pathname === item.path
                            ? scrolled
                              ? "text-black bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm"
                              : "text-white bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm"
                            : scrolled
                            ? "text-black hover:text-black hover:bg-white/10"
                            : "text-white hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span className="flex items-center">
                          {item.icon}
                          {item.name}
                        </span>
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      </Link>

                      <div className="absolute left-0 mt-2 w-60 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left group-hover:translate-y-0 translate-y-2">
                        <div className="bg-[var(--background)] backdrop-blur-md border border-gray-700/50 shadow-xl rounded-xl py-2">
                          <div className="flex items-center px-4 py-2 mb-1 border-b border-gray-700/30">
                            {item.dropdown.icon}
                            <h4 className="font-bold text-white ml-2 text-sm">{item.dropdown.title}</h4>
                          </div>
                          {item.dropdown.links.map((dropItem) => (
                            <Link
                              key={dropItem.name}
                              to={dropItem.path}
                              className={`flex items-center px-4 py-2 text-sm transition-all duration-200 ${
                                pathname === dropItem.path
                                  ? "text-white bg-white/10 font-medium"
                                  : "text-gray-100 font-medium hover:text-white hover:bg-white/5"
                              }`}
                            >
                              <span className="mr-2">{dropItem.icon}</span>
                              {dropItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        pathname === item.path
                          ? scrolled
                            ? "text-black bg-gradient-to-r from-blue-500/70 to-cyan-500/70 backdrop-blur-sm"
                            : "text-white bg-gradient-to-r from-blue-500/70 to-cyan-500/70 backdrop-blur-sm"
                          : scrolled
                          ? "text-black hover:text-black hover:bg-white/10"
                          : "text-white hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <Toggle />

              <button
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-8" /> : <Menu className="h-6 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Services Mega Menu */}
      <AnimatePresence>
        {servicesMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-screen bg-black/90 backdrop-blur-md z-50 pt-0 services-mega-menu-container"
            style={{ height:"100vh", overflowY: "auto", overflowX: "hidden" }}
          >
             <div className=" mx-auto px-4 py-1 h-full overflow-y-auto">
              {/* Close button for mega menu */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setServicesMegaMenuOpen(false)}
                  className="text-white hover:bg-white/10 p-2 rounded-full"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Services grid layout - More compact */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 px-14">
                {servicesMegaMenu.map((category, index) => (
                  <div key={index} className="bg-[var(--background)] backdrop-blur-sm rounded-lg p-3 hover:bg-blue-900 transition-all duration-300">
                    <div className="flex items-center mb-2 pb-1 border-b border-gray-700/50">
                      <div className="p-1 bg-gray-700/30 rounded-md mr-2">
                        {category.icon}
                      </div>
                      <h3 className="text-base font-bold text-white">{category.title}</h3>
                    </div>
                    <ul className="space-y-0">
                      {category.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            to={link.path}
                            onClick={() => setServicesMegaMenuOpen(false)}
                            className={`block px-2 py-1.5 text-sm rounded-md transition-all duration-200 ${
                              pathname === link.path
                                ? "text-white bg-white/10 font-medium"
                                : "text-gray-300 font-medium hover:text-blue-700 hover:bg-white/80"
                            }`}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Partners section - More compact */}
              <div className="partners-section">
                <h2 className="text-1xl font-bold mb-2 text-white ml-20">Explore Our Other Products</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-30">
                  {partnersList.map((partner, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="mb-2 w-full max-w-xs h-[100px] rounded"
                      />
                      <span className="text-white font-medium">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-16 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-gray-700/50 overflow-y-auto z-40"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <div key={item.name} className="py-2 border-b border-gray-700/30 last:border-0">
                  {item.megaDropdown ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="flex justify-between items-center w-full text-white font-medium py-2"
                      >
                        <span className="flex items-center">
                          {item.icon}
                          {item.name}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile megaDropdown */}
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-1 pl-4"
                          >
                            {item.megaDropdown.map((col, colIndex) => (
                              <div key={colIndex} className="mt-2 first:mt-0">
                                <div className="flex items-center mb-1">
                                  {col.icon}
                                  <h4 className="font-bold text-white ml-2 text-sm">{col.title}</h4>
                                </div>
                                <ul className="space-y-0 pl-7">
                                  {col.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                      <Link
                                        to={link.path}
                                        className={`block py-1 text-sm transition-colors ${
                                          pathname === link.path
                                            ? "text-purple-400 font-medium"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                      >
                                        {link.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {/* Mobile Partners Section */}
                            <div className="mt-4 border-t border-gray-700/30 pt-2 hidden">
                              <h4 className="font-bold text-white text-sm mb-2">Our Partners</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {partnersList.slice(0, 4).map((partner, index) => (
                                  <div 
                                    key={index}
                                    className="bg-gray-800/30 rounded-lg p-1 flex items-center justify-center"
                                  >
                                    <img 
                                      src={partner.logo} 
                                      alt={partner.alt} 
                                      className="max-h-8 w-20" 
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.dropdown ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="flex justify-between items-center w-full text-white font-medium py-2"
                      >
                        <span className="flex items-center">
                          {item.icon}
                          {item.name}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile single dropdown */}
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-1 pl-4"
                          >
                            <div className="flex items-center mb-1">
                              {item.dropdown.icon}
                              <h4 className="font-bold text-white ml-2 text-sm">{item.dropdown.title}</h4>
                            </div>
                            
                            <div className="pl-4">
                              {item.dropdown.links.map((dropItem) => (
                                <Link
                                  key={dropItem.name}
                                  to={dropItem.path}
                                  className={`flex items-center py-1 text-sm transition-colors ${
                                    pathname === dropItem.path
                                      ? "text-purple-400 font-medium"
                                      : "text-gray-300 hover:text-white"
                                  }`}
                                >
                                  <span className="mr-2">{dropItem.icon}</span>
                                  {dropItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center py-2 text-sm font-medium transition-colors ${
                        pathname === item.path
                          ? "text-purple-400 font-medium"
                          : "text-white hover:text-white"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;