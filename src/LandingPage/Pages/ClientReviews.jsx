import React, { useState, useEffect, useRef } from "react";
import { Star, StarHalf, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import axios from "axios";
import swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploader from "../../Utils/ImageUploader";
import { BASE_URL } from "../../Utils/BaseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientReviews = () => {
  // Main state variables
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  // Modal & form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    position: "",
    rating: 5,
    comment: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation states
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animateReviews, setAnimateReviews] = useState(false);
  const [animateNavigation, setAnimateNavigation] = useState(false);

  // Scroll animation refs
  const headerRef = useRef(null);
  const reviewsRef = useRef(null);
  const navigationRef = useRef(null);
  
  // Manual scroll effect for animation triggers
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (headerRef.current) {
        const headerPosition = headerRef.current.offsetTop;
        if (scrollPosition > headerPosition + 100) {
          setAnimateHeader(true);
        }
      }
      
      if (reviewsRef.current) {
        const reviewsPosition = reviewsRef.current.offsetTop;
        if (scrollPosition > reviewsPosition) {
          setAnimateReviews(true);
        }
      }
      
      if (navigationRef.current) {
        const navigationPosition = navigationRef.current.offsetTop;
        if (scrollPosition > navigationPosition) {
          setAnimateNavigation(true);
        }
      }
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/reviews/`);
        const activeReviews = response.data.filter(review => review.status === "ON");
        setReviews(activeReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-blue-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 text-blue-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-blue-400" />);
    }
    return stars;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewChange = (e) => {
    const words = e.target.value.split(/\s+/).filter(Boolean);
    if (words.length > 30) {
      swal.fire("Word Limit Exceeded", "Review cannot exceed 30 words", "error");
      return;
    }
    handleInputChange(e);
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append("name", newReview.name);
    formData.append("position", newReview.position);
    formData.append("rating", newReview.rating);
    formData.append("comment", newReview.comment);
    if (previewImage) {
      formData.append("image_url", previewImage);
    }
    formData.append("status", "ON");
    formData.append("created_at", new Date().toISOString());
  
    console.log("Submitting new review FormData:", {
      name: newReview.name,
      position: newReview.position,
      rating: newReview.rating,
      comment: newReview.comment,
      image_url: previewImage || null,
      status: "ON",
      created_at: new Date().toISOString(),
    });
  
    try {
      const response = await axios.post(`${BASE_URL}/reviews/`, formData);
      console.log("Review submitted successfully:", response.data);
      setReviews((prev) => [response.data, ...prev]);
      setNewReview({ name: "", position: "", rating: 5, comment: "" });
      setPreviewImage(null);
      setIsModalOpen(false);
      swal.fire("Success", "Review submitted successfully", "success");
    } catch (error) {
      console.error("Error submitting review:", error);
      swal.fire("Error", "There was an error submitting your review", "error");
    } finally {
      console.log("Submission process finished");
      setIsSubmitting(false);
    }
  };
  
  // Header scroll animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 12, 
        stiffness: 100,
        staggerChildren: 0.2,
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "6rem", 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: "easeOut" 
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.4
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.6
      }
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Reviews grid animation variants
  const reviewsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        damping: 12,
        delay: i * 0.1 + 0.2
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  // Navigation animation variants
  const navigationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 15, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-bl from-[var(--background)] to-[var(--background)] border-t-2 border-[var(--background-light)] text-white p-4">
        <div className="max-w-7xl mx-auto py-14">
          <motion.div 
            ref={headerRef}
            className="text-center mb-12"
            variants={headerVariants}
            initial="hidden"
            animate={animateHeader ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-4xl font-bold mb-4 md:text-5xl"
              variants={titleVariants}
            >
              <span className="bg-clip-text text-white">
                What Our Clients Say
              </span>
            </motion.h2>
            <motion.div 
              className="bg-gradient-to-r h-1 w-24 from-transparent mb-6 mx-auto to-transparent via-[rgb(72,202,249)]"
              variants={lineVariants}
            />
            <motion.p 
              className="text-white max-w-2xl mx-auto font-bold"
              variants={descriptionVariants}
            >
              See for yourself! Discover what our clients say about their experience working with us and how we've transformed their businesses.
            </motion.p>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-white rounded-full shadow-lg text-black font-medium hover:bg-cyan-600 hover:shadow-xl mt-6 px-6 py-3 transition-all"
            >
              Share Your Experience
            </motion.button>
          </motion.div>

          {/* Reviews Grid */}
          <motion.div 
            ref={reviewsRef}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2"
            variants={reviewsContainerVariants}
            initial="hidden"
            animate={animateReviews ? "visible" : "visible"}
          >
            {reviews
              .slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)
              .map((review, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col bg-gray-800 h-full p-6 rounded-lg shadow-lg"
                  variants={cardVariants}
                  custom={index}
                  whileHover="hover"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                    <span className="text-white text-sm">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-100 italic mb-6">"{review.comment}"</p>
                  <div className="flex items-center mt-auto">
                    <div className="flex-shrink-0 mr-4">
                      {review.image_url ? (
                        <motion.img
                          src={review.image_url}
                          alt={review.name}
                          className="border-2 border-[var(--logo-bg)] h-12 rounded-full w-12 object-cover"  
                          whileHover={{ scale: 1.1 }}
                        />
                      ) : (
                        <motion.div 
                          className="flex bg-gray-700 h-12 justify-center rounded-full w-12 items-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <User className="h-6 w-6 text-cyan-400" />
                        </motion.div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[var(--logo-bg)] font-bold">{review.name}</h4>
                      <p className="text-white text-sm font-medium">{review.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            ref={navigationRef}
            className="flex justify-center mt-8 space-x-4"
            variants={navigationVariants}
            initial="hidden"
            animate={animateNavigation ? "visible" : "hidden"}
          >
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex bg-white rounded-lg text-black disabled:opacity-50 items-center px-4 py-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2">Previous</span>
            </motion.button>
            <motion.button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex bg-white rounded-lg text-black disabled:opacity-50 items-center px-4 py-2"
            >
              <span className="mr-2">Next</span>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Review Form Modal with AnimatePresence for exit animations */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="flex bg-black bg-opacity-70 justify-center p-4 fixed inset-0 items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-[#1e1e1e] p-6 rounded-2xl shadow-2xl text-white w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Share Your Experience</h3>
                <motion.button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
    
              {/* Review Form */}
              <motion.form 
                onSubmit={handleSubmit} 
                className="mt-4 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2c2c2c] border border-gray-600 p-2 rounded text-white w-full"
                  whileFocus={{ borderColor: "#48caf9", scale: 1.01 }}
                />
    
                <motion.input
                  type="text"
                  name="position"
                  placeholder="Your Position"
                  value={newReview.position}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2c2c2c] border border-gray-600 p-2 rounded text-white w-full"
                  whileFocus={{ borderColor: "#48caf9", scale: 1.01 }}
                />
    
                {/* Profile Image Upload using custom ImageUploader */}
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Upload Profile Image:
                </label>
                <ImageUploader
                  onSaveUrl={(url) => {
                    setPreviewImage(url);
                  }}
                />
                {previewImage && (
                  <motion.div 
                    className="mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-xs text-gray-400 mb-1">Preview:</p>
                    <motion.img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-md border border-gray-700"
                      whileHover={{ scale: 1.02 }}
                      layoutId="preview-image"
                    />
                  </motion.div>
                )}
    
                {/* Star Rating */}
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange(rating)}
                      className="focus:outline-none"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= newReview.rating ? "text-cyan-500" : "text-gray-500"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
    
                {/* Review Input */}
                <motion.textarea
                  name="comment"
                  placeholder="Your Review (Max 30 words)"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  rows="3"
                  required
                  className="bg-[#2c2c2c] border border-gray-600 p-2 rounded text-white w-full"
                  whileFocus={{ borderColor: "#48caf9", scale: 1.01 }}
                ></motion.textarea>
    
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="bg-blue-600 p-2 rounded text-white w-full font-semibold hover:bg-blue-500"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientReviews;