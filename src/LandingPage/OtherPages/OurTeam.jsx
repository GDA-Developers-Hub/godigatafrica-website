"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Linkedin, Twitter, X } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../Utils/BaseUrl"

// Modal Component
function TeamMemberModal({ member, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-cyan-500/20 shadow-xl"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/5">
                <div className="relative overflow-hidden rounded-xl border border-slate-700 shadow-lg">
                  <motion.img
                    src={member.image || "/placeholder.svg?height=400&width=400"}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700 hover:bg-cyan-500 text-white p-3 rounded-full transition-colors"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>

                {member.created_at && (
                  <p className="text-center text-slate-400 text-sm mt-4">
                    Member since: {new Date(member.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="md:w-3/5">
                <h2 className="text-3xl font-bold text-white mb-2">{member.name}</h2>
                <p className="text-cyan-400 font-medium text-xl mb-6">{member.role}</p>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                  <div className="text-slate-300 prose prose-invert prose-sm max-w-none">
                    {member.bio ? (
                      <p className="whitespace-pre-line">{member.bio}</p>
                    ) : (
                      <p className="text-slate-400 italic">No bio available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Team Member Card Component
function TeamMemberCard({ member }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-xl border border-slate-700/50 hover:border-cyan-500/30 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
      >
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 overflow-hidden rounded-xl w-32 h-32 mx-auto">
              <img
                src={member.image || "/placeholder.svg?height=400&width=400"}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-cyan-400 font-medium mb-3">{member.role}</p>

            <div className="flex space-x-3 mb-4">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>

            {member.bio && <p className="text-slate-300 mb-4 line-clamp-2 text-sm">{member.bio}</p>}

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-4 py-2 bg-slate-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300 w-full flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-0"
            >
              View Details
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      <TeamMemberModal member={member} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

// Team Carousel (Mobile)
function TeamCarousel({ teamMembers }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!Array.isArray(teamMembers) || teamMembers.length === 0) return null

  return (
    <div className="relative md:hidden mb-12">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {teamMembers.map((member) => (
            <div key={member.id} className="w-full flex-shrink-0">
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1))}
          className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors"
          aria-label="Previous team member"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1))}
          className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors"
          aria-label="Next team member"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/team/`)
      // Ensure response.data is an array
      const members = Array.isArray(response.data) ? response.data : []
      setTeamMembers(members)
      setError(null)
    } catch (err) {
      setError("Failed to fetch team members. Please try again later.")
      console.error("Error fetching team members:", err)
      setTeamMembers([]) // Ensure teamMembers is always an array
    } finally {
      setLoading(false)
    }
  }

  const openMemberModal = (member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  return (
    <section className="relative py-24 overflow-hidden bg-[var(--card-background)] text-white">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
          <span className="text-[var(--text-primary)] mb-3 tracking-wider text-sm uppercase block font-bold">
            MEET THE EXPERTS
          </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Meet the Experts
            </h1>
            <p className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto font-bold">
              Our diverse team of passionate professionals combines technical expertise, creative talent, and deep
              understanding of the market to deliver exceptional digital solutions.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-500 text-white p-4 rounded-lg mb-6 max-w-md mx-auto text-center">
            <p>{error}</p>
            <button
              onClick={fetchTeamMembers}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Team Members - Mobile Carousel */}
            <TeamCarousel teamMembers={teamMembers} />

            {/* Team Members - Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

            {/* Empty State */}
            {!loading && teamMembers.length === 0 && (
              <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-lg">No team members found.</p>
              </div>
            )}
          </>
        )}

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-8 rounded-2xl backdrop-blur-sm border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about digital innovation.
            </p>
            <Link
              to="/agency/careers"
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              View Career Opportunities
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Selected Member Modal */}
      {selectedMember && (
        <TeamMemberModal member={selectedMember} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  )
}

