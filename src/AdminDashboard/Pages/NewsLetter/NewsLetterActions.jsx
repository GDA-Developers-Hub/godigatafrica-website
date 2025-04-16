import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../Utils/BaseUrl";

// Define full API endpoints using BASE_URL
const API_ENDPOINTS = {
  SEND_NEWSLETTER: `${BASE_URL}/send-newsletter/`,
  GET_SUBSCRIBERS: `${BASE_URL}/list/subscribers/`
};

// Function to send a newsletter
export async function sendNewsletter(data) {
  try {
    const { subject, htmlContent, recipients, isTest, links } = data;
    const emailData = {
      subject,
      htmlContent,
      recipients: isTest ? recipients : [],
      isTest,
      headers: {
        "List-Unsubscribe": `<${BASE_URL}/unsubscribe/>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
      }
    };
    

    const response = await axios.post(API_ENDPOINTS.SEND_NEWSLETTER, emailData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });

    Swal.fire({
      title: "Success",
      text: response.data.message || "Newsletter sent successfully!",
      icon: "success",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    });

    return {
      success: true,
      message: response.data.message || "Newsletter sent successfully!"
    };
  } catch (error) {
    console.error("Failed to send newsletter:", error);
    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Failed to send newsletter",
      icon: "error",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    });
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send newsletter"
    };
  }
}

// Function to get subscribers statistics
export async function getSubscribers() {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_SUBSCRIBERS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });

    Swal.fire({
      title: "Success",
      text: "Subscribers fetched successfully!",
      icon: "success",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    });

    return {
      success: true,
      data: response.data,
      totalSubscribers: response.data.length || 0,
      openRate: response.data.openRate || 0,
      bounceRate: response.data.bounceRate || 0
    };
  } catch (error) {
    console.error("Failed to get subscribers:", error);
    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Failed to get subscribers",
      icon: "error",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    });
    return {
      success: false,
      message: error.response?.data?.message || "Failed to get subscribers"
    };
  }
}

// Function to handle unsubscribe request and show notification
export async function processUnsubscribe(email) {
  try {
    const response = await axios.post(`${BASE_URL}/unsubscribe/`, {
      email
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Show success alert to the user
    Swal.fire({
      title: "Unsubscribed",
      text: "You have been successfully unsubscribed from our newsletter.",
      icon: "success",
      confirmButtonText: "OK"
    });

    return {
      success: true,
      message: "Successfully unsubscribed"
    };
  } catch (error) {
    console.error("Unsubscribe error:", error);
    
    // Show error alert to the user
    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Failed to unsubscribe. Please try again.",
      icon: "error",
      confirmButtonText: "OK"
    });
    
    return {
      success: false,
      message: error.response?.data?.message || "Failed to unsubscribe"
    };
  }
}
