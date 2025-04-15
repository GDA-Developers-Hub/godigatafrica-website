"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Github, Linkedin, MessageSquare, Code, Server, Cpu, Braces, Layers, Sparkles, Database, Paintbrush, Workflow } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import MobilePreview from "./preview"
import eliud from "../assets/eliud.jpg"
// import ismael from "../assets/ismael.jpg"
import ian from "../assets/ian.jpg"

// Helper function to replace the cn utility
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null)
  const controls = useAnimation()
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls])

  return [ref, controls]
}

const fadeInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const developers = [
  {
    name: "Ismael Kiprop",
    role: "Backend Developer",
    description: "Django specialist who architected the robust backend systems powering Go Digital Africa's services.",
    realLifeDescription: "Senior backend engineer with 8+ years of experience building scalable systems. Specializes in distributed architectures and cloud infrastructure. Passionate about mentoring junior developers and contributing to open-source projects.",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    whatsapp: "+1234567890",
    avatar: "/placeholder.svg?height=400&width=400",
    skills: ["Django", "Python", "PostgreSQL", "MySQL", "Docker", "AWS"],
    primaryColor: "#2ecc71",
    secondaryColor: "#27ae60",
    detailedSkills: {
      languages: ["Python", "SQL", ],
      frameworks: ["Django", "Django REST Framework", "FastAPI"],
      databases: ["PostgreSQL", "MySQL", "Redis"],
      tools: ["Docker", "Git", "AWS", "Nginx"],
      specialties: ["API Design", "Database Optimization", "System Architecture"]
    },
    contributions: [
      "Designed and implemented RESTful API architecture",
      "Created secure authentication and authorization systems",
      "Optimized database queries for performance",
      "Implemented caching strategies for improved response times",
      "Developed automated testing suite for backend services",
    ],
  },
  {
    name: "Ian Kipchirchir",
    role: "FullStack Web Developer",
    description:
      "React expert and AI champion who led the frontend development and implemented the AI assistant and agent capabilities.",
    realLifeDescription: "Creative technologist bridging design and development with 6 years of experience in interactive web applications. Conference speaker and workshop facilitator on modern frontend architecture and AI integration in user interfaces.",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    whatsapp: "+1234567891",
    avatar: ian,
    skills:  ["React", "Next.js", "Node.js", "Express","Spring Boot","Java", "Firebase","Php","MySql","Tailwind","Bootstrap","Javascript"],
    primaryColor: "#9b59b6",
    secondaryColor: "#8e44ad",
    detailedSkills: {
      languages: ["JavaScript", "TypeScript", "Python", "Go"],
      frameworks: ["React", "Next.js", "Node.js", "Express","Spring Boot","Tailwind","Bootstrap"],
      tools: ["Framer Motion", "Firebase", "Git", "Firebase","Vercel","Heroku","Github","Apache","Railway"],
      ai: ["GPT-4 Integration", "OpenAI API", "Conversational UI"],
      specialties: ["Modern UI/UX", "Animation", "AI Assistant Intergration Development"]
    },
    contributions: [
      "Architected the frontend design",
      "Developed the AI assistant frontend and backend with Node.js",
      "Implemented advanced animations and transitions",
      "Created responsive designs for all device sizes",
      "Championed AI chat model integration and optimization",
      "Implimented web socket communication for real-time agent chat",
    ],
  },
  {
    name: "Eliud Obure",
    role: "Fullstack Web developer",
    description: "React frontend developer who helped create the stunning UI components and responsive layouts.",
    realLifeDescription: "As a skilled Software Engineer, I design and develop high-performance, scalable solutions using cutting-edge technologies. With expertise in backend, frontend, and cloud computing, I thrive on solving complex problems and building innovative, efficient systems.",
    github: "https://github.com/Eliud254",
    linkedin: "https://www.linkedin.com/in/eliudobure/",
    whatsapp: "+254799666988",
    avatar: eliud,
    skills: ["React", "Next.js", "Tailwind", "JavaScript", "Go", "Python","MongoDB","MySQL","Docker","AWS"],
    primaryColor: "#3498db",
    secondaryColor: "#2980b9",
    detailedSkills: {
      languages: ["JavaScript", "Java"],
      frameworks: ["React", "Tailwind CSS","Next.js"],
      tools: ["Git", "Storybook", "Jest","Git hub"],
      design: ["UI/UX", "Responsive Design", "Animation", "Accessibility"],
      specialties: ["Component Design", "Modern Interfaces", "Performance Optimization"]
    },
    contributions: [
      "Developed reusable UI components",
      "Implemented responsive layouts across the site",
      "Created animations and interactive elements",
      "Optimized frontend performance",
      "Collaborated on design implementation",
    ],
  },
]

const technologies = [
  { name: "React", icon: <Braces className="w-5 h-5" />, description: "Frontend UI library", color: "#61dafb" },
  { name: "Node.js", icon: <Code className="w-5 h-5" />, description: "JavaScript runtime for backend", color: "#68a063" },
  { name: "Django", icon: <Server className="w-5 h-5" />, description: "Backend Python framework", color: "blue" },
  { name: "MySQL", icon: <Database className="w-5 h-5" />, description: "Relational database", color: "#4479a1" },
  { name: "PostgreSQL", icon: <Database className="w-5 h-5" />, description: "Advanced relational database", color: "#336791" },
  { name: "Framer Motion", icon: <Sparkles className="w-5 h-5" />, description: "Animation library", color: "#ff0055" },
  { name: "Tailwind CSS", icon: <Paintbrush className="w-5 h-5" />, description: "Utility-first CSS framework", color: "#38b2ac" },
  { name: "GPT-4", icon: <Cpu className="w-5 h-5" />, description: "AI model for chatbot integration", color: "#10a37f" },
  { name: "Firebse", icon: <Server className="w-5 h-5" />, description: "Image processing library", color: "#375a7f" },
  { name: "Git", icon: <Workflow className="w-5 h-5" />, description: "Version control system", color: "#f05032" },
]

const codeSnippets = [
    `// React Component with Framer Motion
  import { motion } from 'framer-motion';
  
  export const AnimatedCard = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {children}
    </motion.div>
  );`,
  
    `# Django View
  from rest_framework.views import APIView
  from rest_framework.response import Response
  
  class ProjectsView(APIView):
      def get(self, request):
          projects = Project.objects.all()
          serializer = ProjectSerializer(projects, many=True)
          return Response(serializer.data)`,
    
    `// AI Assistant Integration
  import { OpenAI } from 'openai';
  
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  
  export async function generateResponse(prompt) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    
    return completion.choices[0].message.content;
  }`,
  
    `// Express.js API Endpoint
  const express = require('express');
  const router = express.Router();
  
  router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
  
  module.exports = router;`,
  
    `# Flask Route Example
  from flask import Flask, jsonify
  
  app = Flask(__name__)
  
  @app.route('/api/hello')
  def hello():
      return jsonify(message="Hello, World!")
  
  if __name__ == '__main__':
      app.run(debug=True)`,
    
    `// Tailwind CSS Component
  export function Button({ label }) {
    return (
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        {label}
      </button>
    );
  }`,
  
    `// Next.js API Route
  export default function handler(req, res) {
    res.status(200).json({ message: 'Hello from Next.js API!' });
  }`,
  
    `// Node.js File System (fs)
  const fs = require('fs');
  
  fs.writeFileSync('example.txt', 'Hello, world!', 'utf8');
  console.log('File created successfully!');`
  ];
  

const SocialIcon = ({
  icon,
  href,
  color,
  hoverColor,
  whatsapp = false,
}) => {
  const controls = useAnimation()

  const randomMovement = () => {
    controls.start({
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      rotate: Math.random() * 20 - 10,
      transition: { duration: 2, ease: "easeInOut" },
    })

    setTimeout(randomMovement, Math.random() * 3000 + 2000)
  }

  useEffect(() => {
    randomMovement()
  }, [])

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "flex items-center justify-center w-12 h-12 rounded-full text-white transition-all duration-300",
        whatsapp ? "bg-green-500 hover:bg-green-600" : `bg-${color} hover:bg-${hoverColor}`,
      )}
      whileHover={{
        scale: 1.2,
        boxShadow: "0 0 25px rgba(255, 255, 255, 0.8)",
        rotate: [0, -10, 10, -5, 5, 0],
        transition: {
          rotate: {
            duration: 0.5,
            ease: "easeInOut",
          },
        },
      }}
      animate={controls}
    >
      {icon}
    </motion.a>
  )
}

const DeveloperCard = ({ developer, index }) => {
  const [activeTab, setActiveTab] = useState("skills")
  const [ref, controls] = useScrollAnimation()
  
  return (
    <motion.div
      ref={ref}
      variants={fadeInVariants}
      initial="hidden"
      animate={controls}
      className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 shadow-xl"
      whileHover={{
        boxShadow: `0 0 30px ${developer.primaryColor}40`,
        borderColor: `${developer.primaryColor}80`
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${developer.primaryColor}, ${developer.secondaryColor})`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            opacity: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
            backgroundPosition: {
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse"
            }
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: 180,
              transition: { rotateY: { duration: 0.5 } }
            }}
            className="relative w-32 h-32 rounded-full overflow-hidden border-4"
            style={{ borderColor: developer.primaryColor }}
          >
            <img
              src={developer.avatar || "/placeholder.svg"}
              alt={developer.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.h3 
              className="text-2xl font-bold mb-1"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {developer.name}
            </motion.h3>
            <motion.h4 
              className="text-xl mb-3 bg-clip-text text-transparent" 
              style={{ backgroundImage: `linear-gradient(90deg, ${developer.primaryColor}, ${developer.secondaryColor})` }}
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {developer.role}
            </motion.h4>
            <motion.p 
              className="text-gray-300 mb-4"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {developer.description}
            </motion.p>

            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              {developer.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${developer.primaryColor}30`,
                    color: developer.primaryColor,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: `${developer.primaryColor}50`,
                    y: -5
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          className="mt-4 bg-white/5 p-4 rounded-lg"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <h5 className="text-lg font-semibold mb-2" style={{ color: developer.primaryColor }}>
            About {developer.name}
          </h5>
          <p className="text-gray-300">{developer.realLifeDescription}</p>
        </motion.div>

        <motion.div 
          className="mt-6 grid grid-cols-2 gap-4"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          <motion.button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "skills" ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Cpu className="w-4 h-4" />
            Skills & Expertise
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTab("contributions")}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "contributions" ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Code className="w-4 h-4" />
            Contributions
          </motion.button>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeTab === "contributions" && (
            <motion.div 
              key="contributions"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <h5 className="text-lg font-semibold mb-3" style={{ color: developer.primaryColor }}>
                Project Contributions
              </h5>
              <ul className="space-y-2">
                {developer.contributions.map((contribution, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span 
                      className="mt-1 text-lg" 
                      style={{ color: developer.primaryColor }}
                    >
                      •
                    </span>
                    <span>{contribution}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {activeTab === "skills" && (
            <motion.div 
              key="skills"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <h5 className="text-lg font-semibold mb-3" style={{ color: developer.primaryColor }}>
                Skills & Expertise
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(developer.detailedSkills).map(([category, skills], i) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white/5 p-3 rounded-lg"
                  >
                    <h6 
                      className="text-base font-medium mb-2 capitalize"
                      style={{ color: developer.primaryColor }}
                    >
                      {category}
                    </h6>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, j) => (
                        <motion.span
                          key={j}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-white/10"
                          whileHover={{ scale: 1.1, backgroundColor: `${developer.primaryColor}30` }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center justify-center md:justify-between gap-4">
          <div className="flex space-x-3">
            <SocialIcon
              icon={<Github className="w-5 h-5" />}
              href={developer.github}
              color="gray-800"
              hoverColor="gray-700"
            />
            <SocialIcon
              icon={<Linkedin className="w-5 h-5" />}
              href={developer.linkedin}
              color="blue-600"
              hoverColor="blue-700"
            />
          </div>

          <motion.a
            href={`https://wa.me/${developer.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)",
              backgroundColor: "#25D366" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 15, 0],
                scale: [1, 1.2, 1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <MessageSquare className="w-4 h-4" />
            </motion.div>
            <span>WhatsApp</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

const CodeDisplay = () => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
  const [ref, controls] = useScrollAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariants}
      initial="hidden"
      animate={controls}
      className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 shadow-2xl"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">
          {currentSnippetIndex === 0
            ? "React + Framer Motion"
            : currentSnippetIndex === 1
              ? "Django Backend"
              : "AI Integration"}
        </div>
        <div></div>
      </div>

      <div className="p-4 h-[300px] overflow-auto font-mono text-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSnippetIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <TypeAnimation
              sequence={[codeSnippets[currentSnippetIndex]]}
              wrapper="div"
              cursor={true}
              repeat={0}
              style={{ whiteSpace: "pre-wrap" }}
              speed={70}
              className="text-gray-300"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function MadeBy() {
  const [headerRef, headerControls] = useScrollAnimation()
  const [techRef, techControls] = useScrollAnimation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          variants={fadeUpVariants}
          initial="hidden"
          animate={headerControls}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-500 to-white"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          >
            The Creators
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Meet the talented team behind Go Digital Africa's website, combining expertise in frontend, backend, and AI
            technologies.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={techRef}
          variants={fadeUpVariants}
          initial="hidden"
          animate={techControls}
          className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 shadow-xl mb-16"
          whileHover={{ boxShadow: "0 0 30px rgba(155, 89, 182, 0.3)" }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Technologies Used in This Website
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  y: -5,
                  boxShadow: `0 10px 25px ${tech.color}30`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                  animate={{
                    boxShadow: [
                      `0 0 0 rgba(${tech.color}, 0.4)`,
                      `0 0 20px ${tech.color}60`,
                      `0 0 0 rgba(${tech.color}, 0.4)`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {tech.icon}
                </motion.div>
                <motion.h4 
                  className="font-bold text-lg mb-1 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.4 }}
                >
                  {tech.name}
                </motion.h4>
                <motion.p 
                  className="text-sm text-gray-400 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.5 }}
                >
                  {tech.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-8 mb-16">
          {developers.map((developer, index) => (
            <DeveloperCard key={index} developer={developer} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <CodeDisplay />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <MobilePreview />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MadeBy