"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PageSEO } from "../../SEO";

// Background images
import somalia from "../../assets/somalia-updated.jpg";
import ethiopia from "../../assets/ethiopia.jpg";
import kenya from "../../assets/Nairobi.jpg";
import dubai from "../../assets/dubai.jpg";
import rwanda from "../../assets/rwanda.jpg";
import tanzania from "../../assets/tanzania.jpg";  
import senegal from "../../assets/senegal.jpeg";
import ghana from "../../assets/ghana.jpg";
import zambia from "../../assets/zambia.jpg";
import djibouti from "../../assets/djibouti.jpg";

// Flag images
import somaliaFlag from "../../assets/somalia-flag.webp";
import ethiopiaFlag from "../../assets/ethiopia-flag.webp";
import kenyaFlag from "../../assets/kenya-flag.webp";
import dubaiFlag from "../../assets/uae-flag.webp";
import rwandaFlag from "../../assets/rwanda-flag.webp";
import tanzaniaFlag from "../../assets/tz.webp";  
import senegalFlag from "../../assets/senegal-flag.webp";
import ghanaFlag from "../../assets/ghana-flag.webp";
import zambiaFlag from "../../assets/zm.webp";
import djiboutiFlag from "../../assets/dj.webp";

// Card data for carousel
const cards = [
  {
    title: "Web Applications",
    description:
      "Enhance efficiency with custom-built web applications and information systems. Automate processes, improve productivity, and scale seamlessly to stay ahead in today's digital-driven world.",
    buttonText: "Learn More",
    color: "from-cyan-500 to-blue-600", 
    link: "/services/software-development",
  },
  {
    title: "Search Engine Optimization",
    description:
      "Boost visibility and attract customers with expert SEO strategies. Rank higher, drive organic traffic, and increase conversions with data-driven, search-engine-friendly optimization techniques.",
    buttonText: "Learn More",
    color: "from-blue-500 to-cyan-400", 
    link: "/services/seo",
  },
  {
    title: "Social Media Marketing",
    description:
      "Grow your brand with strategic social media campaigns. Engage audiences, drive sales, and build lasting customer relationships through compelling content and targeted advertising.",
    buttonText: "Learn More",
    color: "from-cyan-600 to-blue-500", 
    link: "/services/social-media-marketing",
  },
  {
    title: "Social Platform Management",
    description:
      "Simplify social media management with expert solutions. We handle content, engagement, and analytics to keep your brand relevant, active, and ahead of competitors.",
    buttonText: "Learn More",
    color: "from-blue-400 to-cyan-500", 
    link: "/services/social-platform-marketing",
  },
];

export default function Home() {
  const [currentCard, setCurrentCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const heroRef = useRef(null);
  const backgroundSliderRef = useRef(null);

  // Image arrays
  const backgroundImages = [kenya, somalia, dubai, ethiopia, rwanda, tanzania, senegal, ghana, zambia, djibouti];
  const flagImages = [kenyaFlag, somaliaFlag, dubaiFlag, ethiopiaFlag, rwandaFlag, tanzaniaFlag, senegalFlag, ghanaFlag, zambiaFlag, djiboutiFlag];
  const countryNames = ["Kenya", "Somalia", "UAE", "Ethiopia", "Rwanda", "Tanzania", "Senegal", "Ghana", "Zambia", "Djibouti"];


  // Mouse movement effect for background parallax
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

  // Settings for card carousel
  const cardSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    arrows: true,
    beforeChange: (current, next) => setCurrentCard(next),
    customPaging: (i) => (
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          currentCard === i
            ? `bg-gradient-to-r ${cards[i].color} w-6`
            : "bg-white/30 hover:bg-white/50"
        }`}
      />
    ),
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    appendDots: dots => (
      <div className="absolute bottom-4 left-0 right-0">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
  };

  // Settings for background image slider
  const backgroundSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    pauseOnHover: false,
    arrows: false,
    beforeChange: (current, next) => setCurrentBgIndex(next),
  };

  // Custom arrow components
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="-translate-y-1/2 absolute left-2 top-1/2 z-10">
        <button
          onClick={onClick}
          className="bg-black/20 border border-white/10 p-2 rounded-full text-white backdrop-blur-md duration-300 hover:bg-[rgb(72,202,249)]/20 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
      </div>
    );
  }
  
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="-translate-y-1/2 absolute right-2 top-1/2 z-10">
        <button
          onClick={onClick}
          className="bg-black/20 border border-white/10 p-2 rounded-full text-white backdrop-blur-md duration-300 hover:bg-[rgb(72,202,249)]/20 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  const goToSlide = (index) => {
    if (backgroundSliderRef.current) {
      backgroundSliderRef.current.slickGoTo(index);
    }
  };

  return (
    <section
      ref={heroRef}
      className="flex flex-col w-full h-[78vh] md:flex-row overflow-hidden relative bg-transparent"
    >
      <PageSEO page="home" />
      
      {/* Background Image Slider */}
      <div className="h-full w-full absolute inset-0 z-0 overflow-hidden">
        <Slider ref={backgroundSliderRef} {...backgroundSettings}>
          {backgroundImages.map((image, index) => (
            <div key={index} className="outline-none">
              <div className="relative h-[78vh] w-full">
                <img
                  src={image}
                  alt="Hero Background"
                  className="h-[78vh] object-cover w-full absolute inset-0"
                  style={{
                    transform: `scale(1.1) translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                  }}
                />
                <div className="bg-gradient-to-br absolute from-[rgba(16,21,32,0.75)] inset-0 to-[rgba(16,50,62,0.72)]" />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Country indicator */}
      <div className="absolute bottom-4 right-4 z-10 lg:top-5/12 lg:right-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeInOut" 
            }}
            className="flex items-center gap-2"
          >
            <motion.img
              src={backgroundImages[currentBgIndex]}
              alt={`${countryNames[currentBgIndex]} Flag`}
              className="h-18 w-23 object-cover rounded-sm shadow-md border border-white/20 sm:h-14 sm:w-18"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut"
              }}
            />
            <motion.p
              className="text-white font-medium text-xs backdrop-blur-sm bg-black/30 px-2 py-1 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.6,
                ease: "easeInOut" 
              }}
            >
              {countryNames[currentBgIndex]}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-full absolute opacity-20"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 8 + 8}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="flex items-center h-full w-full mx-auto px-6 md:px-12 relative z-10 mt-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 w-full">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full md:w-1/2 flex flex-col justify-center"
          >
            <div className="relative mb-4">
              <div className="border-[rgb(72,202,249)] border-l-2 border-t-2 h-4 w-4 -left-3 -top-3 absolute" />
              <div className="border-[rgb(72,202,249)] border-b-2 border-r-2 h-4 w-4 -bottom-3 -right-3 absolute" />

              <h2 className="text-xl text-white font-bold md:text-2xl tracking-tight">
                Transform Your Business{" "}
                <span className="bg-clip-text text-white">
                  Now with GDAi
                </span>
              </h2>
            </div>
            
            <p className="text-sm text-white/90 md:text-base leading-relaxed mb-6 font-medium">
              Discover how our AI-powered solutions can revolutionize your workflow, drive innovation, and empower your
              team to achieve more in today's competitive landscape.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/chat"
                className="bg-[rgb(8,146,219)] rounded-md text-white duration-200 font-medium group hover:shadow-[rgb(72,202,249)]/30 hover:shadow-md px-5 py-2 relative transition-all text-sm"
              >
                <span className="flex items-center relative z-10">
                  Check Out Our AI Model
                  <ArrowRight className="duration-200 group-hover:translate-x-1 ml-2 transition-transform" size={16} />
                </span>
                <span className="bg-white absolute duration-200 group-hover:opacity-10 inset-0 opacity-0 transition-opacity" />
              </Link>

              <Link
                to="/join-the-movement"
                className="bg-transparent border border-[rgb(72,202,249)]/50 rounded-md text-white duration-200 font-medium group hover:border-[rgb(72,202,249)] px-5 py-2 relative transition-all text-sm"
              >
                <span className="flex items-center relative z-10">
                  Join the Movement
                  <ArrowRight
                    className="duration-200 group-hover:opacity-100 group-hover:translate-x-1 ml-2 opacity-0 transition-all"
                    size={16}
                  />
                </span>
                <span className="bg-[rgb(72,202,249)]/5 absolute duration-200 group-hover:opacity-100 inset-0 opacity-0 transition-opacity" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Services Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 flex items-center"
          >
            {/* <div className="w-full h-[30vh] md:h-[38vh]">
              <Slider {...cardSettings} className="h-full">
                {cards.map((card, index) => (
                  <div key={index} className="outline-none h-full px-1 py-2">
                    <div className={`bg-gradient-to-br ${card.color} rounded-lg p-5 h-full flex flex-col justify-between shadow-lg border border-white/10`}>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                        <p className="text-white/90 text-sm mb-4">{card.description}</p>
                      </div>
                      <Link 
                        to={card.link}
                        className="bg-white/20 hover:bg-white/30 text-white text-sm rounded-md px-4 py-2 inline-flex items-center w-fit transition-all duration-200"
                      >
                        {card.buttonText}
                        <ArrowRight size={14} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* Flag Navigation - Bottom */}
      <div className="absolute bottom-4 left-4 z-10 hidden md:block bg-transparent">
        <div className="flex gap-2">
          {flagImages.slice(0, 10).map((flag, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{
                opacity: currentBgIndex === index ? 1 : 0.5,
                scale: currentBgIndex === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
              onClick={() => goToSlide(index)}
            >
              <img
                src={flag}
                alt={`${countryNames[index]} Flag`}
                className={`h-8 w-10 object-cover rounded-sm border ${
                  currentBgIndex === index ? "border-[rgb(72,202,249)]" : "border-white/20"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}