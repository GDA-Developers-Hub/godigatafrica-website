import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  FileText,
  MessageSquare,
  Briefcase,
  Star,
  Newspaper,
  MessageCircle,
  Clipboard,
  Award,
  ArrowUpDown,
} from "lucide-react";
import { BASE_URL } from "../../Utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BASE_URL}/dashboard/stats/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex bg-gray-900 h-[calc(100vh-4rem)] justify-center p-6 items-center">
        <div className="border-b-2 border-cyan-500 border-t-2 h-12 rounded-full w-12 animate-spin"></div>
      </div>
    );
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  // All stats including additional cards
  const stats = [
    { title: "Blogs", value: data.total_blogs, icon: <FileText className="h-8 w-8 text-blue-400" />, description: "Total blog posts" },
    { title: "Subscribers", value: data.total_subscribers, icon: <Users className="h-8 w-8 text-green-400" />, description: "Email subscribers" },
    { title: "Reviews", value: data.total_reviews, icon: <Star className="h-8 w-8 text-purple-400" />, description: "Client reviews" },
    { title: "Careers", value: data.total_careers, icon: <Briefcase className="h-8 w-8 text-yellow-400" />, description: "Open positions" },
    { title: "Messages", value: data.total_messages, icon: <MessageSquare className="h-8 w-8 text-pink-400" />, description: "New messages" },
    { title: "News", value: data.total_news, icon: <Newspaper className="h-8 w-8 text-cyan-400" />, description: "News articles" },
    { title: "Consultations", value: data.total_consultations, icon: <MessageCircle className="h-8 w-8 text-orange-400" />, description: "Consultation requests" },
    { title: "Case Studies", value: data.total_case_studies, icon: <FileText className="h-8 w-8 text-indigo-400" />, description: "Published case studies" },
    { title: "Proposals", value: data.total_proposals, icon: <Clipboard className="h-8 w-8 text-teal-400" />, description: "Submitted proposals" },
    { title: "Awards", value: data.total_awards, icon: <Award className="h-8 w-8 text-indigo-400" />, description: "Awards received" },
    { title: "Career Applications", value: data.total_career_applications, icon: <Users className="h-8 w-8 text-red-400" />, description: "Job applications" },
    { title: "Admins", value: data.total_admins, icon: <Users className="h-8 w-8 text-indigo-400" />, description: "Total admins" },
  ];

  // Mapping stat title to admin route
  const routeMapping = {
    Blogs: "/admin/blog",
    Subscribers: "/admin/subscribers",
    Reviews: "/admin/reviews",
    Careers: "/admin/careers",
    Messages: "/admin/messages",
    News: "/admin/news",
    Consultations: "/admin/consultations",
    "Case Studies": "/admin/case-studies",
    Proposals: "/admin/proposals",
    Awards: "/admin/awards",
    "Career Applications": "/admin/applications",
    Admins: "/admin/admins",
  };

  const recentActivities = data.recent_activities || [];

// Icon mapping for recent activities
const iconMapping = {
  Blog: <FileText className="h-4 w-4" />,
  Reviews: <Star className="h-4 w-4" />,
  Careers: <Briefcase className="h-4 w-4" />,
  Messages: <MessageSquare className="h-4 w-4" />,
  News: <Newspaper className="h-4 w-4" />,
  Consultation: <MessageCircle className="h-4 w-4" />,
  "Case Study": <FileText className="h-4 w-4" />,
  Proposal: <Clipboard className="h-4 w-4" />,
  Awards: <Award className="h-4 w-4" />,
  Subscribers: <Users className="h-4 w-4" />,
  Admins: <Users className="h-4 w-4" />,
};

// Category colors for recent activities
const categoryColors = {
  Blog: "bg-blue-600",
  Reviews: "bg-purple-600",
  Careers: "bg-yellow-600",
  Messages: "bg-pink-600",
  News: "bg-cyan-600",
  Consultation: "bg-orange-600",
  "Case Study": "bg-indigo-600",
  Proposal: "bg-teal-600",
  Awards: "bg-indigo-600",
  Subscribers: "bg-green-600",
  Admins: "bg-indigo-600",
};


  return (
    <div className="bg-gray-900 p-6 text-gray-200 w-full min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl text-white font-bold">Dashboard Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 md:grid-cols-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => {
              const route = routeMapping[stat.title];
              if (route) navigate(route);
            }}
            className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="flex flex-row justify-between items-center pb-2">
              <h3 className="text-lg font-medium">{stat.title}</h3>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-gray-400 text-sm mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="w-full mt-8">
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => {
              const icon =
                iconMapping[activity.category] || (
                  <FileText className="h-4 w-4" />
                );
              const bgColor =
                categoryColors[activity.category] || "bg-gray-600";
              return (
                <li
                  key={index}
                  className="flex border-b border-gray-700 justify-between items-center pb-4"
                >
                  <div className="flex items-center">
                    <span
                      className={`flex ${bgColor} h-8 w-8 items-center justify-center rounded-full mr-3 text-white`}
                    >
                      {icon}
                    </span>
                    <div>
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-gray-400 text-sm">{activity.date}</p>
                    </div>
                  </div>
                  <span
                    className={`${bgColor} rounded-full text-white text-xs px-2 py-1`}
                  >
                    {activity.category}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
