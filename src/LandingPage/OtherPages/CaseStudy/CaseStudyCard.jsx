"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CaseStudyCard({ id, title, industry, description, challenges, solutions, results, image }) {
  const navigate = useNavigate()

  // Fix: Add null check for title to prevent the toLowerCase() error
  const safeTitle = title || "Untitled Case Study"
  const slug = safeTitle.toLowerCase().replace(/\s+/g, "-")

  const handleViewCaseStudy = () => {
    // Navigate to the detail page and pass the id via state
    navigate(`/case-studies/${slug}`, { state: { id } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-slate-900 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={safeTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        {/* Industry overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block bg-cyan-500/20 backdrop-blur-sm text-cyan-400 px-3 py-1 rounded-full text-sm font-medium mb-2">
            {industry || "General"}
          </span>
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {safeTitle}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-slate-300 mb-4 flex-grow">{description || "No description available."}</p>

        {/* Additional details */}
        <div className="text-slate-300 mb-6 space-y-2">
          {challenges && (
            <p>
              <strong  className="text-red-400">Challenges:</strong> {challenges}
            </p>
          )}
          {solutions && (
            <p >
              <strong className="text-green-400">Solutions:</strong> {solutions}
            </p>
          )}
          {results && (
            <p >
              <strong className="text-blue-400">Results:</strong> {results}
            </p>
          )}
        </div>

        <button
          onClick={handleViewCaseStudy}
          className="w-full border border-cyan-500/50 text-white hover:bg-cyan-500/10 px-4 py-2 rounded-full flex items-center justify-center"
        >
          View Case Study
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  )
}

