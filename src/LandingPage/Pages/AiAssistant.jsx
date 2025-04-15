import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Send, User, BotIcon as Robot, PhoneCall, MessageSquare, Brain, Sparkles, Zap } from "lucide-react"
import { Link } from "react-router-dom"
// Utility function to conditionally join classNames
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// Single AI response for all interactions
const DEFAULT_MESSAGE = "Hello, I'm GDAi your AI assistant. How can I help you?"

const RESPONSE_MESSAGE = "Great! Now you can speak with our AI chat assistant by clicking the button in the bottom right of your screen or talk to one of our agents by using these keywords: 'speak to agent', 'talk to agent', 'connect to agent', 'speak to human', 'talk to human', 'connect to human', 'connect me to an agent', 'connect me agent', 'connect me to a human', 'connect me to a human agent'."

const AI_MESSAGES = [
  {
    role: "assistant",
    content: DEFAULT_MESSAGE,
  },
]

const AiAssistant = () => {
  const [messages, setMessages] = useState(AI_MESSAGES)
  const [userInput, setUserInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showAgentButton, setShowAgentButton] = useState(false)
  const controls = useAnimation()
  const chatContainerRef = useRef(null)

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  }

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const userMessage = { role: "user", content: userInput }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setUserInput("")
    setIsTyping(true)

    // Always return the same response after user input
    setTimeout(() => {
      const aiMessage = { role: "assistant", content: RESPONSE_MESSAGE }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
  }


  return (
    <section className="py-20 bg-[var(--background-light)] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
              }
            }
          }}
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold vr-text-primary mb-4"
          >
            The Future of Business is <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600">AI-Powered</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg vr-text-primary max-w-2xl mx-auto"
          >
            Experience how Go Digital Africa is transforming businesses with next-generation AI solutions
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Phone Mockup */}
          <motion.div 
            variants={fadeInUp}
            className="relative order-2 md:order-1"
          >
            <motion.div 
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-20"
            ></motion.div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
              className="relative bg-gray-800/90 backdrop-blur-sm p-1 rounded-2xl shadow-2xl"
            >
              <div className="rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400">GDAi</div>
                </div>

                <div ref={chatContainerRef} className="p-4 h-[400px] overflow-auto">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={cn("flex", message.role === "assistant" ? "justify-start" : "justify-end", "mb-2")}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "rounded-lg p-3 max-w-[75%]",
                            message.role === "assistant" ? "bg-gray-700/50" : "bg-blue-600/50",
                          )}
                        >
                          {message.role === "assistant" ? (
                            <div className="flex items-center">
                              <Robot className="w-4 h-4 mr-2" />
                              <TypeAnimation
                                sequence={[message.content]}
                                wrapper="span"
                                cursor={false}
                                speed={60}
                                className="text-gray-300"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              <p className="text-gray-300">{message.content}</p>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start mb-2"
                    >
                      <div className="rounded-lg p-3 bg-gray-700/50 max-w-[75%]">
                        <div className="flex items-center">
                          <Robot className="w-4 h-4 mr-2" />
                          <TypeAnimation
                            sequence={["..."]}
                            wrapper="span"
                            cursor={false}
                            speed={60}
                            className="text-gray-300"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
                  <div className="flex items-center">
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      type="text"
                      placeholder="Type your message..."
                      value={userInput}
                      onChange={handleInputChange}
                      className="flex-1 bg-gray-700/50 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      type="submit" 
                      className="ml-2"
                    >
                      <Send className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Content & CTA */}
          <motion.div 
            variants={fadeInUp}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl font-bold mb-6 vr-text-primary">
              Make Your Business, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600">AI-Enhanced</span>
            </h2>
            <p className="text-lg vr-text-primary mb-8">
              Discover how our AI solutions can transform your customer engagement, streamline operations, and drive growth. Try our interactive assistant now!
            </p>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6 mb-10"
            >
              <motion.div 
                variants={featureVariants}
                className="flex items-start gap-4"
              >
                <motion.div 
                  initial="initial"
                  animate="animate"
                  variants={floatingAnimation}
                  className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-lg shrink-0"
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold vr-text-primary mb-1">Intelligent Automation</h3>
                  <p className="vr-text-primary opacity-80">Our AI solutions automate complex tasks while maintaining the human touch your customers expect.</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={featureVariants}
                className="flex items-start gap-4"
              >
                <motion.div 
                  initial="initial"
                  animate="animate"
                  variants={floatingAnimation}
                  className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-lg shrink-0"
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold vr-text-primary mb-1">24/7 Customer Engagement</h3>
                  <p className="vr-text-primary opacity-80">AI-powered assistants that engage your customers around the clock, answering questions and providing support.</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={featureVariants}
                className="flex items-start gap-4"
              >
                <motion.div 
                  initial="initial"
                  animate="animate"
                  variants={floatingAnimation}
                  className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-lg shrink-0"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold vr-text-primary mb-1">Personalized Experiences</h3>
                  <p className="vr-text-primary opacity-80">Our AI learns from every interaction to deliver increasingly personalized customer experiences.</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/proposal-request">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 15px rgba(125, 81, 229, 0.5)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition duration-300 shadow-lg flex items-center gap-2"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
                    Get AI Proposal
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AiAssistant

