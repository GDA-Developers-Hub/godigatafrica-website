"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Mock components to simulate the website sections
const mockSections = [
  {
    name: "Hero Section",
    color: "from-purple-600 to-blue-600",
    content: (
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-2">Go Digital Africa</h2>
        <p className="text-sm mb-4">Transforming businesses through digital innovation</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs rounded-full bg-white/20">Get Started</button>
          <button className="px-3 py-1 text-xs rounded-full bg-white/10">Learn More</button>
        </div>
      </div>
    ),
  },
  {
    name: "Why Us Section",
    color: "from-blue-600 to-cyan-600",
    content: (
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Why Choose Us</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/10 p-2 rounded-lg">
            <h3 className="text-sm font-medium">Expertise</h3>
            <p className="text-xs">Industry leaders</p>
          </div>
          <div className="bg-white/10 p-2 rounded-lg">
            <h3 className="text-sm font-medium">Innovation</h3>
            <p className="text-xs">Cutting-edge solutions</p>
          </div>
          <div className="bg-white/10 p-2 rounded-lg">
            <h3 className="text-sm font-medium">Support</h3>
            <p className="text-xs">24/7 assistance</p>
          </div>
          <div className="bg-white/10 p-2 rounded-lg">
            <h3 className="text-sm font-medium">Results</h3>
            <p className="text-xs">Proven success</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "About Section",
    color: "from-cyan-600 to-teal-600",
    content: (
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">About Go Digital</h2>
        <p className="text-xs mb-2">
          We are a leading digital agency specializing in transforming businesses through innovative digital solutions.
        </p>
        <div className="flex justify-between">
          <div className="text-center">
            <div className="text-lg font-bold">5+</div>
            <div className="text-xs">Years</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">500+</div>
            <div className="text-xs">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">250+</div>
            <div className="text-xs">Projects</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "CTA Section",
    color: "from-teal-600 to-green-600",
    content: (
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold mb-2">Ready to Transform?</h2>
        <p className="text-xs mb-3">Take your business to the next level with our digital solutions</p>
        <button className="px-4 py-2 text-xs rounded-full bg-white/20">Contact Us Now</button>
      </div>
    ),
  },
  {
    name: "Marketing Services",
    color: "from-green-600 to-yellow-600",
    content: (
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Our Services</h2>
        <div className="space-y-2">
          <div className="bg-white/10 p-2 rounded-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🌐</div>
            <div>
              <h3 className="text-sm font-medium">Web Development</h3>
              <p className="text-xs">Custom websites & applications</p>
            </div>
          </div>
          <div className="bg-white/10 p-2 rounded-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">📱</div>
            <div>
              <h3 className="text-sm font-medium">Mobile Apps</h3>
              <p className="text-xs">iOS & Android solutions</p>
            </div>
          </div>
          <div className="bg-white/10 p-2 rounded-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">📊</div>
            <div>
              <h3 className="text-sm font-medium">Digital Marketing</h3>
              <p className="text-xs">SEO, SEM & Social Media</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Client Reviews",
    color: "from-yellow-600 to-orange-600",
    content: (
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Client Testimonials</h2>
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-xs italic mb-2">
            "Go Digital Africa transformed our business with their innovative solutions. Highly recommended!"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/20"></div>
            <div>
              <p className="text-xs font-medium">John Smith</p>
              <p className="text-xs opacity-70">CEO, TechCorp</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Pricing",
    color: "from-orange-600 to-red-600",
    content: (
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Pricing Plans</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 p-2 rounded-lg text-center">
            <h3 className="text-sm font-medium">Basic</h3>
            <div className="text-lg font-bold my-1">$99</div>
            <p className="text-xs">Starter package</p>
          </div>
          <div className="bg-white/20 p-2 rounded-lg text-center border border-white/30">
            <h3 className="text-sm font-medium">Pro</h3>
            <div className="text-lg font-bold my-1">$199</div>
            <p className="text-xs">Most popular</p>
          </div>
          <div className="bg-white/10 p-2 rounded-lg text-center">
            <h3 className="text-sm font-medium">Enterprise</h3>
            <div className="text-lg font-bold my-1">$299</div>
            <p className="text-xs">Full features</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Contact",
    color: "from-red-600 to-purple-600",
    content: (
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Get In Touch</h2>
        <div className="space-y-2">
          <input className="w-full p-2 text-xs bg-white/10 rounded-lg" placeholder="Your Name" />
          <input className="w-full p-2 text-xs bg-white/10 rounded-lg" placeholder="Email Address" />
          <textarea className="w-full p-2 text-xs bg-white/10 rounded-lg h-12" placeholder="Your Message"></textarea>
          <button className="w-full p-2 text-xs bg-white/20 rounded-lg font-medium">Send Message</button>
        </div>
      </div>
    ),
  },
]

const MobilePreview = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSectionIndex((prev) => (prev + 1) % mockSections.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      whileHover={{ boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">Go Digital Africa</div>
        <div></div>
      </div>

      <div className="p-4 flex flex-col items-center">
        <div className="relative w-[280px] h-[500px] bg-black rounded-[36px] p-3 overflow-hidden border-4 border-gray-700">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10"></div>

          {/* Screen content */}
          <div ref={containerRef} className="w-full h-full rounded-[28px] overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full p-4 bg-gradient-to-b ${mockSections[currentSectionIndex].color} flex items-center justify-center`}
              >
                {mockSections[currentSectionIndex].content}
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
              {mockSections.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentSectionIndex ? "bg-white" : "bg-white/30"}`}
                  onClick={() => setCurrentSectionIndex(index)}
                  whileHover={{ scale: 1.5 }}
                  animate={index === currentSectionIndex ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: index === currentSectionIndex ? Number.POSITIVE_INFINITY : 0 }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold mb-1">{mockSections[currentSectionIndex].name}</h3>
          <div className="flex justify-center gap-2 mt-2">
            <motion.button
              className="px-3 py-1 rounded-full bg-white/10 text-sm"
              onClick={() => setCurrentSectionIndex((prev) => (prev - 1 + mockSections.length) % mockSections.length)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            <motion.button
              className="px-3 py-1 rounded-full bg-white/10 text-sm"
              onClick={() => setCurrentSectionIndex((prev) => (prev + 1) % mockSections.length)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MobilePreview

