"use client"

import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Building, Award, CheckCircle, Target, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { BASE_URL } from "../../../Utils/BaseUrl"

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [caseStudy, setCaseStudy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryIn, setRetryIn] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  // Get the ID from location state if available
  const id = location.state?.id
  console.log("ID:", id)
  

  const fetchCaseStudy = async (retryAttempt = 0) => {
    try {
      setLoading(true)
      setError(null)
      setIsRetrying(false)

      // If we have an ID, fetch directly by ID
      if (id) {
        const response = await fetch(`${BASE_URL}/case-studies/${id}/`)
        const data = await response.json()

        if (!response.ok) {
          if (response.status === 429) {
            // Extract the retry time from the error message if available
            let waitTime = 30 // Default wait time

            if (data && data.detail && typeof data.detail === "string") {
              const match = data.detail.match(/Expected available in (\d+) seconds/)
              if (match && match[1]) {
                waitTime = Number.parseInt(match[1], 10)
              }
            }

            setRetryIn(waitTime)

            // Start countdown timer
            const countdownInterval = setInterval(() => {
              setRetryIn((prevTime) => {
                if (prevTime <= 1) {
                  clearInterval(countdownInterval)
                  // Auto-retry after countdown if this is the first attempt
                  if (retryAttempt < 2) {
                    setIsRetrying(true)
                    fetchCaseStudy(retryAttempt + 1)
                  }
                  return 0
                }
                return prevTime - 1
              })
            }, 1000)

            throw new Error(`API rate limit exceeded. Please try again in ${waitTime} seconds.`)
          } else {
            throw new Error("Failed to fetch case study")
          }
        }

        setCaseStudy(data)
      } else {
        // Otherwise, fetch all case studies and find by slug
        const response = await fetch(`${BASE_URL}/case-studies`)
        const data = await response.json()

        if (!response.ok) {
          if (response.status === 429) {
            // Extract the retry time from the error message if available
            let waitTime = 30 // Default wait time

            if (data && data.detail && typeof data.detail === "string") {
              const match = data.detail.match(/Expected available in (\d+) seconds/)
              if (match && match[1]) {
                waitTime = Number.parseInt(match[1], 10)
              }
            }

            setRetryIn(waitTime)

            // Start countdown timer
            const countdownInterval = setInterval(() => {
              setRetryIn((prevTime) => {
                if (prevTime <= 1) {
                  clearInterval(countdownInterval)
                  // Auto-retry after countdown if this is the first attempt
                  if (retryAttempt < 2) {
                    setIsRetrying(true)
                    fetchCaseStudy(retryAttempt + 1)
                  }
                  return 0
                }
                return prevTime - 1
              })
            }, 1000)

            throw new Error(`API rate limit exceeded. Please try again in ${waitTime} seconds.`)
          } else {
            throw new Error("Failed to fetch case studies")
          }
        }

        const caseStudies = data.results || []

        // Find the case study with matching slug
        // Important: Add null check before calling toLowerCase()
        const matchedCaseStudy = caseStudies.find((study) => {
          // Ensure title exists before calling toLowerCase()
          const studyTitle = study.title || ""
          const studySlug = studyTitle.toLowerCase().replace(/\s+/g, "-")
          return studySlug === slug
        })

        if (matchedCaseStudy) {
          setCaseStudy(matchedCaseStudy)
        } else {
          throw new Error("Case study not found")
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseStudy()

    // Cleanup function to clear any intervals when component unmounts
    return () => {
      // Clear any intervals that might be running
      const highestId = window.setTimeout(() => {}, 0)
      for (let i = 0; i < highestId; i++) {
        clearTimeout(i)
      }
    }
  }, [slug, id])

  const handleGoBack = () => {
    navigate(-1)
  }

  // Manual retry function
  const handleRetry = () => {
    if (retryIn > 0) return // Don't retry if countdown is still active
    fetchCaseStudy()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading case study...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/30">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="mb-6">{error}</p>

          {retryIn > 0 ? (
            <div className="mb-6">
              <p className="text-amber-400 mb-2">Retrying in {retryIn} seconds...</p>
              <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden mb-6">
                <div
                  className="h-full bg-amber-500 transition-all duration-1000"
                  style={{ width: `${(retryIn / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className={`border border-cyan-500 text-white hover:bg-cyan-500/10 px-6 py-2 rounded-full flex items-center justify-center mx-auto mb-6 ${isRetrying ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Now
                </>
              )}
            </button>
          )}

          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-full transition-colors"
          >
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
          <p className="mb-6">The case study you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-full transition-colors"
          >
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Safely access properties with fallbacks
  const {
    title = "Untitled Case Study",
    industry = "General",
    client = "Client information unavailable",
    date = "Date unavailable",
    description = "No description available",
    challenges = "No challenges specified",
    solutions = "No solutions specified",
    results = "No results specified",
    image = "/placeholder.svg?height=600&width=1200",
    testimonial,
    technologies = [],
  } = caseStudy

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900"></div>
        </div>

        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-16">
          <button
            onClick={handleGoBack}
            className="absolute top-8 left-4 md:left-8 px-4 py-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-colors border border-white/10 mt-20"
          >
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            Back
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-cyan-500/20 backdrop-blur-sm text-cyan-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {industry}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              {client && (
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{client}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{date}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{description}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Challenges</h3>
              <p className="text-gray-300">{challenges}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Solutions</h3>
              <p className="text-gray-300">{solutions}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Results</h3>
              <p className="text-gray-300">{results}</p>
            </motion.div>
          </div>

          {technologies && technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30"
            >
              <h2 className="text-3xl font-bold mb-6">Client Testimonial</h2>
              <blockquote className="text-xl italic text-gray-200 mb-4">"{testimonial.quote}"</blockquote>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-300 text-sm">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="text-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full transition-colors inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

