import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Calendar, Send, Code, Zap, Brain, Sparkles, ChevronRight, ArrowRight, ImageDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import image from "../../assets/image.png";

const codeSnippets = [
  `// AI-powered content generation
const generateContent = async (prompt) => {
  const response = await ai.complete({
    model: "gpt-4",
    prompt: prompt,
    temperature: 0.7,
  });
  return response.text;
};`,
  `// Intelligent customer segmentation
function segmentCustomers(data) {
  return aiModel.cluster({
    data: data,
    dimensions: ['purchase_history', 'browsing_behavior', 'demographics'],
    clusters: 5
  });
}`,
  `// Predictive analytics implementation
const predictConversion = (userBehavior) => {
  const prediction = model.predict(userBehavior);
  return {
    likelihood: prediction.score,
    nextBestAction: prediction.recommendation
  };
};`,
];

export default function JoinTheMovement() {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Validate fields
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.description) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill out all fields before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Sending request to API...");

    try {
      const response = await axios.post(`${BASE_URL}/consultations/`, formData);

      if (response.status === 200 || response.status === 201) {
        console.log("Submission successful!");
        Swal.fire({
          icon: "success",
          title: "Success!",
          html: `
            <p>Your consultation request has been submitted.</p>
            <p><strong>Name:</strong> ${response.data.name}</p>
            <p><strong>Email:</strong> ${response.data.email}</p>
            <p><strong>Phone:</strong> ${response.data.phone}</p>
            <p><strong>Date:</strong> ${response.data.date}</p>
            <p><strong>Description:</strong> ${response.data.description}</p>
          `,
        });

        // Reset form and close modal
        setFormData({ name: "", email: "", phone: "", date: "", description: "" });
        setIsModalOpen(false);
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Typing effect for code snippets
  useEffect(() => {
    let timeout;
    const currentSnippet = codeSnippets[currentCodeIndex];

    if (isTyping) {
      if (displayedCode.length < currentSnippet.length) {
        timeout = setTimeout(() => {
          setDisplayedCode(currentSnippet.slice(0, displayedCode.length + 1));
        }, 30);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    } else {
      if (displayedCode.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedCode(displayedCode.slice(0, displayedCode.length - 1));
        }, 15);
      } else {
        setIsTyping(true);
        setCurrentCodeIndex((currentCodeIndex + 1) % codeSnippets.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedCode, isTyping, currentCodeIndex]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

 

  return (
    <div className="relative w-full overflow-hidden bg-[var(--background)]/80 text-white">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-20"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-white">
            Join The AI Revolution
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-bold max-w-3xl mx-auto">
            Transform your digital presence with cutting-edge AI solutions tailored for your business
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Information */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Sparkles className="mr-3 text-blue-400" />
              How AI Elevates Your Digital Presence
            </h2>

            {/* AI Benefits */}
            <div className="space-y-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-start p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
              >
                <div className="flex-shrink-0 p-2 bg-blue-500/20 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Intelligent Website Optimization</h3>
                  <p className="text-gray-300">
                    AI analyzes user behavior to optimize your website layout, content, and conversion paths in
                    real-time, increasing engagement by up to 35%.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-start p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
              >
                <div className="flex-shrink-0 p-2 bg-purple-500/20 rounded-lg mr-4">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Personalized Marketing Automation</h3>
                  <p className="text-gray-300">
                    Create hyper-personalized marketing campaigns that adapt to individual customer preferences,
                    delivering 3x higher conversion rates than traditional approaches.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-start p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
              >
                <div className="flex-shrink-0 p-2 bg-pink-500/20 rounded-lg mr-4">
                  <Code className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Predictive Analytics & Insights</h3>
                  <p className="text-gray-300">
                    Leverage AI to forecast trends, customer behavior, and market shifts before they happen, giving your
                    business a competitive edge.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* AI Partners */}
            {/* <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold mb-4">Powered by Leading AI Technologies</h3>
              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="OpenAI"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-2">OpenAI</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Google Gemini"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-2">Gemini</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Anthropic Claude"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-2">Claude</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Hugging Face"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-2">Hugging Face</span>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
          <div>

          {/* Code typing animation */}
          <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mb-3 relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-25"></div>
              <div className="relative p-4 bg-gray-950 rounded-lg overflow-hidden border border-gray-800">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-sm text-gray-400">AI-powered code</span>
                </div>
                <pre className="text-sm text-amber-400 font-mono overflow-x-auto h-50">
                  <code>{displayedCode}</code>
                </pre>
              </div>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            >
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-700 via-blue-700 to-purple-700 rounded-xl blur opacity-25"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-md p-8 rounded-xl border border-gray-800">
                <div className="flex flex-col space-y-6">
                
                {/* Get Proposal Button */}
                <Link to="/proposal-request">
                    <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-3 px-6 border border-transparent rounded-lg bg-white/80 text-black font-medium flex items-center justify-center transition-all duration-300 border-flash"
                    >
                    <span>Get Your Proposal</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>
                </Link>

                {/* Schedule Consultation Button */}
                <motion.button
                    onClick={openModal}
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-3 px-6 border border-transparent rounded-lg bg-white/90 text-black font-medium flex items-center justify-center transition-all duration-300 border-flash"
                >
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Schedule a Consultation</span>
                </motion.button>

                {/* Contact Us Button */}
                <Link to="/contact-us">
                    <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-3 px-6 border border-transparent rounded-lg bg-white text-black font-medium flex items-center justify-center transition-all duration-300 border-flash"
                    >
                    <Send className="mr-2 h-5 w-5" />
                    <span>Contact Us Directly</span>
                    </motion.button>
                </Link>
                
                </div>
            </div>
            </motion.div>

            </div>

        </div>

        {/* Custom AI Model Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-20"></div>
          <div className="relative p-8 md:p-12 bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Check Out Our Custom AI Model</h2>
                <p className="text-gray-300 mb-6">
                  Our proprietary AI model is tailored to provide digital software solutions to those seeking innovative
                  approaches to their business challenges. With specialized training on industry-specific data, our
                  model delivers unparalleled results.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Trained on industry-specific datasets",
                    "Optimized for African market needs",
                    "Continuous learning and improvement",
                    "Seamless integration with existing systems",
                    "Privacy-focused with data protection",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  onClick={openModal}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <span>Get Yours Today</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="relative h-64 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={image}
                  alt="AI Model Visualization"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            </div>
          </div>
        </motion.div>

        {/* Go Digital Africa Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block">
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-white">
                Go Digital Africa
              </span>
            </div>
            <p className="mt-4 text-white font-bold max-w-2xl mx-auto">
              Leading the digital transformation across Africa with innovative AI solutions tailored for businesses of
              all sizes.
            </p>
          </div>
        </motion.div>
      </div>
      {/* MODAL */}
            {isModalOpen && (
              <div className="flex bg-black bg-opacity-70 justify-center p-4 fixed inset-0 items-center z-50">
                <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-2xl text-white w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Schedule a Consultation</h3>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-300">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
      
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "email", "phone", "date", "description"].map((field) => (
                      <div key={field}>
                        <label className="text-gray-300 text-sm block capitalize font-medium">
                          {field}
                        </label>
                        {field === "description" ? (
                          <textarea
                            name={field}
                            placeholder={`Enter your ${field}`}
                            value={formData[field]}
                            onChange={handleInputChange}
                            className="bg-gray-800 p-3 rounded-lg text-white w-full"
                            rows="3"
                            required
                          />
                        ) : (
                          <input
                            type={field === "date" ? "date" : "text"}
                            name={field}
                            placeholder={`Enter your ${field}`}
                            value={formData[field]}
                            onChange={handleInputChange}
                            className="bg-gray-800 p-3 rounded-lg text-white w-full"
                            required
                          />
                        )}
                      </div>
                    ))}
      
                    <button type="submit" className="bg-blue-600 p-3 rounded-lg text-white w-full font-semibold hover:bg-blue-500" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </form>
                </div>
              </div>
            )}
    </div>
  );
}
