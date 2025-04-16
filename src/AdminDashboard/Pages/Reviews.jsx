"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  StarHalf,
  User,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/reviews/`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        Swal.fire("Error", "Failed to load reviews", "error");
      } finally {
        setIsLoading(false);
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
      stars.push(<Star key={`star-${i}`} className="w-5 h-5 text-cyan-500" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-5 h-5 text-cyan-500" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-5 h-5 text-gray-500" />);
    }
    return stars;
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${BASE_URL}/reviews/${id}/toggle/`,
        { status: currentStatus ? "OFF" : "ON" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(
        reviews.map((review) =>
          review.id === id ? { ...review, status: currentStatus ? "OFF" : "ON" } : review
        )
      );
      Swal.fire({
        title: "Success",
        text: `Review ${!currentStatus ? "activated" : "deactivated"} successfully`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error toggling review status:", error);
      Swal.fire("Error", "Failed to update review status", "error");
    }
  };

  const handleDeleteReview = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/reviews/${id}/`);
          setReviews(reviews.filter((review) => review.id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Review has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting review:", error);
          Swal.fire("Error", "Failed to delete review", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-[calc(100vh-4rem)] bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Client Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage).map((review) => (
          <div key={review.id} className={`bg-gray-900 border border-gray-800 rounded-lg p-6 ${review.status === "OFF" ? "opacity-60" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
              <div>
              <button onClick={() => handleToggleActive(review.id, review.status === "ON")}> {review.status === "ON" ? <ToggleRight className="text-green-500 mr-3" /> : <ToggleLeft />} </button>
              <button onClick={() => handleDeleteReview(review.id)}>
                <Trash2 className="text-red-500" />
              </button>
              </div>
            </div>
            <img src={review.image_url} alt={review.name} className="w-16 h-16 rounded-full mb-4" />
            <p className="italic text-gray-300">"{review.comment}"</p>
            <h4 className="font-bold text-cyan-300 mt-4">{review.name}</h4>
            <p className="text-sm text-gray-400">{review.position}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg w-40 flex align-center justify-content-center p-4" onClick={prevPage} disabled={currentPage === 0}>
          <ChevronLeft /> Previous
        </button>
        <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg w-40 flex align-center justify-content-center p-4" onClick={nextPage} disabled={currentPage === totalPages - 1}>
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
}
