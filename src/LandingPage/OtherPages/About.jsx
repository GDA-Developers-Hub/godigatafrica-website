"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Award,
  CheckCircle,
  Globe,
  MapPin,
  Users,
  Loader2,
  Zap,
} from "lucide-react";
import { BASE_URL } from "../../Utils/BaseUrl";
import { PageSEO } from "../../SEO";

// Company stats
const companyStats = [
  {
    value: 12,
    suffix: "+",
    label: "Years of Experience",
    description: "Delivering digital excellence across Africa",
    icon: Award,
  },
  {
    value: 250,
    suffix: "+",
    label: "Projects Completed",
    description: "For clients across various industries",
    icon: CheckCircle,
  },
  {
    value: 8,
    suffix: "",
    label: "Office Locations",
    description: "Serving clients across the continent",
    icon: MapPin,
  },
  {
    value: 95,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on client feedback and reviews",
    icon: Users,
  },
];

// Company values
const companyValues = [
  {
    title: "Innovation",
    description:
      "Exploring new technologies and approaches to deliver cutting-edge solutions.",
    icon: Zap,
  },
  {
    title: "Excellence",
    description: "Committed to delivering the highest quality in everything we do.",
    icon: Award,
  },
  {
    title: "Integrity",
    description:
      "Operating with honesty, transparency, and ethical business practices.",
    icon: CheckCircle,
  },
  {
    title: "Client-Centric",
    description:
      "Putting our clients' needs at the center of our work and decision-making.",
    icon: Users,
  },
  {
    title: "Pan-African Vision",
    description:
      "Empowering businesses across Africa through digital transformation.",
    icon: Globe,
  },
];

export default function About() {
  const [locations, setLocations] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  // Fetch locations data from API
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await axios.get(`${BASE_URL}/company-info/`);
        if (response.data && response.data.length > 0) {
          setLocations(response.data);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-30 overflow-hidden bg-[var(--card-background)] text-white">
      <PageSEO page="about" />
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-[var(--text-primary)] font-bold mb-3 tracking-wider text-sm uppercase block">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Empowering Digital Africa
          </h1>
          <p className="text-lg text-[var(--text-primary)] font-bold">
            Go Digital Africa is a leading digital solutions provider dedicated
            to transforming businesses across the African continent through
            innovative technology and strategic digital marketing.
          </p>
        </div>

        {/* Company Stats */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeIn}
                className="bg-gray-800 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-800 to-blue-500 flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-slate-300 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeIn}
                className="bg-slate-900 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-800 to-blue-500 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-300">{value.description}</p>
              </motion.div>
            ))}
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
      </div>
    </section>
  );
}
