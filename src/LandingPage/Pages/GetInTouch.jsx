"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, useInView, useAnimation } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { BASE_URL } from "../../Utils/BaseUrl";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ status: null, message: "" });
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormState({ status: null, message: "" });

    try {
      await axios.post(`${BASE_URL}/messages/`, formData);
      setFormState({
        status: "success",
        message:
          "Your message was sent successfully! We'll get back to you soon.",
      });
      setFormData({ full_name: "", email: "", phone: "", message: "" });

      formRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setFormState({
        status: "error",
        message:
          "There was an error sending your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[var(--light-bg)] text-white py-16"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={mainControls}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className="text-sm inline-block mb-3 tracking-wider uppercase font-bold text-[var(--text-secondary)]">
            Contact Us
          </span>
          <h2 className="text-4xl font-bold md:text-5xl">
            <span className="bg-clip-text text-[var(--logo-bg)]">
              Get in Touch With Us
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={mainControls}
          variants={containerVariants}
          className="grid gap-12 items-start max-w-6xl md:grid-cols-2 mx-auto"
        >
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-8 text-white">
              Contact Information
            </h3>
            <div className="space-y-7">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+254 720 222 249",
                },
                {
                  icon: Mail,
                  title: "Email",
                  value: "sales@godigitalafrica.com",
                },
                {
                  icon: MapPin,
                  title: "Address",
                  value: "Highridge Westlands, Nairobi, Kenya",
                },
              ].map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-6 items-center"
                >
                  <info.icon className="text-[rgb(72,202,249)]" size={24} />
                  <div>
                    <p className="text-sm text-white font-bold mb-1">
                      {info.title}
                    </p>
                    <p className="text-lg font-bold text-gray-100">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} ref={formRef}>
            {formState.status === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-700 border border-blue-600 p-8 rounded-2xl text-center shadow-lg"
              >
                <CheckCircle
                  className="text-[rgb(72,202,249)] mx-auto"
                  size={40}
                />
                <h3 className="text-2xl font-bold my-4 text-white">
                  Message Sent!
                </h3>
                <p className="text-gray-100">{formState.message}</p>
                <button
                  onClick={() => setFormState({ status: null, message: "" })}
                  className="bg-[var(--logo-bg)] hover:bg-blue-700 text-white rounded-lg mt-8 px-6 py-3 font-medium"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-lg"
                onSubmit={handleSubmit}
              >
                {["full_name", "email", "phone", "message"].map(
                  (field, index) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <label
                        htmlFor={field}
                        className="text-sm text-gray-100/70 font-medium"
                      >
                        {field.replace("_", " ")}
                      </label>
                      {field === "message" ? (
                        <textarea
                          id={field}
                          placeholder="Tell us about your project or inquiry"
                          value={formData[field]}
                          onChange={handleChange}
                          className="bg-gray-700 border border-gray-600 rounded-lg w-full px-4 py-3 min-h-[150px] text-gray-100"
                          required
                        />
                      ) : (
                        <input
                          id={field}
                          type={field === "email" ? "email" : "text"}
                          placeholder={`Enter your ${field.replace("_", " ")}`}
                          value={formData[field]}
                          onChange={handleChange}
                          className="bg-gray-700 border border-gray-600 rounded-lg w-full px-4 py-3 text-gray-100"
                          required
                        />
                      )}
                    </motion.div>
                  )
                )}

                {formState.status === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400"
                  >
                    {formState.message}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  type="submit"
                  className="bg-[var(--logo-bg)] hover:bg-blue-700 rounded-lg w-full px-6 py-3 mt-6 flex items-center justify-center text-white font-bold transition duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
