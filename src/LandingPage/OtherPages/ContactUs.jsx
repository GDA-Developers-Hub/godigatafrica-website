"use client"
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Slider from "react-slick";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Globe,
} from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../Utils/BaseUrl";


export default function ContactSectionWithMaps() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ status: null, message: "" });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const formRef = useRef(null);

  // Fetch locations data from API
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await axios.get(`${BASE_URL}/company-info/`);
        if (response.data && response.data.length > 0) {
          setLocations(response.data);
          setSelectedLocation(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormState({ status: null, message: "" });

    try {
      await axios.post(`${BASE_URL}/messages/`, formData);
      setFormState({
        status: "success",
        message: "Your message was sent successfully! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });

      formRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setFormState({
        status: "error",
        message: "There was an error sending your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Settings for the Slick slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[var(--background-light)]" />

      <div className="mx-auto relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="w-full mx-auto text-center mb-16 bg-[var(--card-background)] py-24"
        >
          <span className="text-[var(--text-secondary)] font-bold mb-3 tracking-wider text-sm uppercase">
            Contact
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white">
              Lets Chat...
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] font-bold">
            Get in touch with us to discuss your project, share your ideas, or learn more about our services.
          </p>
        </motion.div>

        {/* Main Row: Contact Details & Contact Form */}
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto container">
          {/* Main Contact Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex-1 bg-slate-800 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
          >
            {isLoadingLocations ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
              </div>
            ) : selectedLocation ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Phone number</p>
                    <p className="text-white font-medium">
                      {selectedLocation.phone_number || "Not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email address</p>
                    <p className="text-white font-medium">{selectedLocation.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Office location</p>
                    <p className="text-white font-medium">{selectedLocation.address}</p>
                    <a
                      href={selectedLocation.google_map_link || `https://maps.google.com/?q=${encodeURIComponent(selectedLocation.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 text-sm flex items-center gap-1 mt-1 hover:text-cyan-300 transition-colors"
                    >
                      View on map <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-white">No location information available</p>
            )}
          </motion.div>

          {/* Contact Form */}
          <div ref={formRef} className="flex-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-slate-800 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              {formState.status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-slate-300">{formState.message}</p>
                  <button
                    onClick={() => setFormState({ status: null, message: "" })}
                    className="mt-6 bg-cyan-500/10 hover:bg-cyan-500/20 text-white py-2 px-4 rounded"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                        Company name
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, company: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      What can we help you with?
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white resize-none"
                      required
                    ></textarea>
                  </div>

                  {formState.status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p>{formState.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[var(--logo-bg)] hover:from-cyan-600 hover:via-blue-600 hover:to-amber-600 text-white py-3 px-6 rounded-4xl flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        GET IN TOUCH
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Other Locations (Carousel) */}
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">Our Locations</h3>
          <p className="text-amber-500 font-bold text-sm mb-6">Click on a location to view details.</p>
          
          {isLoadingLocations ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            </div>
          ) : locations.length > 0 ? (
            <Slider {...sliderSettings} className="location-slider">
              {locations.map((location) => (
                <motion.div
                  key={location.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="px-2"
                >
                  <div
                    className={
                      "bg-slate-800 backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 cursor-pointer h-full " +
                      (selectedLocation?.id === location.id
                        ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                        : "border-white/10 hover:border-cyan-500/30")
                    }
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 " +
                          (selectedLocation?.id === location.id
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                            : "bg-white/10")
                        }
                      >
                        <Globe className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">{location.city}</h4>
                        <p className="text-slate-300 text-sm mb-2">{location.address}</p>
                        {location.phone_number && (
                          <p className="text-cyan-400 text-sm">{location.phone_number}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          ) : (
            <p className="text-white text-center py-8">No locations available</p>
          )}
        </div>

        {/* Full-Width Map */}
        <div className="mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="w-full bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 overflow-hidden h-[450px]"
          >
            {selectedLocation ? (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=MY_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                  `${selectedLocation.city}, ${selectedLocation.address}`
                )}&zoom=14`}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-white">Select a location to view the map</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}