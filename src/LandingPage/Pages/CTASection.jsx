import React, { useState } from "react";
import Slider from "react-slick";
import { Calendar, FileText, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import heroImage from "../../assets/home-image.jpg";
import heroImage2 from "../../assets/home-image-2.jpg";
import { BASE_URL } from "../../Utils/BaseUrl";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Trust indicators component with animations
const TrustIndicators = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className="flex flex-wrap justify-center gap-4 items-center mt-6"
  >
    <motion.div variants={itemVariants} className="flex items-center">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="bg-white/10 backdrop-blur-sm rounded-full p-2"
      >
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      </motion.div>
      <span className="ml-2 text-white">Trusted by 500+ clients</span>
    </motion.div>
    <motion.div variants={itemVariants} className="flex items-center">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="bg-white/10 backdrop-blur-sm rounded-full p-2"
      >
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      </motion.div>
      <span className="ml-2 text-white">100% satisfaction</span>
    </motion.div>
  </motion.div>
);

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Array of background images to be used by the slider
  const backgroundImages = [heroImage, heroImage2];

  // react-slick settings
  const sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1500,
    fade: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.description) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    console.log("Sending request to API...");

    try {
      const response = await fetch(`${BASE_URL}/consultations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        swal.fire("Success!", "Your consultation request has been submitted successfully!", "success");
        setFormData({ name: "", email: "", phone: "", date: "", description: "" });
        setIsModalOpen(false);
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      swal.fire("Submission Failed", "There was an error submitting your request. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for form fields
  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 * custom, duration: 0.4 },
    }),
  };

  return (
    <section className="overflow-hidden flex items-center bg-[var(--background)] py-10 justify-center relative lg:h-screen h-auto" id="cta" >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 h-screen hidden md:block">
        <div className="relative h-full w-full">
          <Slider {...sliderSettings}>
            {backgroundImages.map((imgSrc, index) => (
              <div key={index} className="h-screen">
                <motion.img
                  src={imgSrc}
                  alt={`Background ${index + 1}`}
                  className="h-full w-full object-cover md:object-cover sm:object-contain xs:object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                />
              </div>
            ))}
          </Slider>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            // className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-800/30 via-indigo-700/20" 
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            className="bg-[var(--background)]/30 border border-white/20 p-6 md:p-10 rounded-2xl shadow-2xl relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center space-y-6 md:space-y-8"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-2xl text-white font-bold md:text-5xl lg:text-5xl tracking-tight"
              >
                Ready to{" "}
                <motion.span 
                  className="bg-clip-text text-3xl md:text-5xl font-bold bg-gradient-to-r text-white"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Transform
                </motion.span>{" "}
                Your Business?
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-white/90 text-base max-w-2xl md:text-xl mx-auto"
              >
                Join hundreds of businesses that have successfully gone digital with our innovative solutions.
              </motion.p>

              <motion.div 
                variants={containerVariants}
                className="flex flex-col justify-center gap-3 pt-2 md:pt-4 sm:flex-row"
              >
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openModal}
                  className="bg-transparent border-2 border-gray-200 hover:bg-white/90 rounded-xl shadow-blue-500/20 shadow-lg text-white w-full duration-300 font-medium group hover:shadow-blue-500/30 hover:shadow-xl hover:text-indigo-800 overflow-hidden px-4 py-4 md:px-8 md:py-6 relative sm:w-auto transition-all text-sm md:text-base"
                >
                  <span className="flex justify-center items-center relative z-10">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Schedule a Free Consultation
                  </span>
                </motion.button>
                <Link to="/work/case-study">
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="border-2 border-white rounded-xl text-white w-full duration-300 font-medium group hover:border-white/50 overflow-hidden px-4 py-4 md:px-8 md:py-6 relative sm:w-auto transition-all text-sm md:text-base"
                  >
                    <span className="flex justify-center items-center relative z-10">
                      <FileText className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      View Case Studies
                      <motion.span
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <ArrowRight className="ml-2" size={16} />
                      </motion.span>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              <TrustIndicators />
            </motion.div>
          </motion.div>

          {/* Floating badge */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="bg-gradient-to-r rounded-full shadow-lg text-xs md:text-sm text-white -top-3 md:-top-5 -translate-x-1/2 absolute font-medium from-cyan-500 left-1/2 px-4 md:px-6 py-1 md:py-2 to-blue-500 transform border border-white/20"
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block"
            >
              Limited Time Offer
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex bg-black/80 backdrop-blur-sm justify-center p-4 fixed inset-0 items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-2xl text-white w-full max-w-md border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <motion.h3 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold bg-clip-text bg-gradient-to-r text-transparent from-cyan-400 to-purple-500"
                >
                  Schedule a Consultation
                </motion.h3>
                <motion.button 
                  onClick={closeModal} 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {[
                  { name: "name", type: "text", placeholder: "Your full name", custom: 1 },
                  { name: "email", type: "email", placeholder: "Your email address", custom: 2 },
                  { name: "phone", type: "tel", placeholder: "Your phone number", custom: 3 },
                  { name: "date", type: "date", placeholder: "", custom: 4 },
                  { name: "description", type: "textarea", placeholder: "Tell us about your project", custom: 5 },
                ].map((field) => (
                  <motion.div 
                    key={field.name}
                    variants={formFieldVariants}
                    initial="hidden"
                    animate="visible"
                    custom={field.custom}
                  >
                    <motion.label className="text-gray-300 text-sm block capitalize font-medium mb-1">
                      {field.name}
                    </motion.label>
                    {field.type === "textarea" ? (
                      <motion.textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-gray-800 p-3 rounded-lg text-white w-full border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        rows={3}
                        required
                      />
                    ) : (
                      <motion.input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-gray-800 p-3 rounded-lg text-white w-full border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        required
                      />
                    )}
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 p-3 rounded-lg text-white w-full font-semibold transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}