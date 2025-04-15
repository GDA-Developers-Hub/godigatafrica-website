"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sitemap() {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const sitemapData = [
    {
      title: "Home",
      links: [{ path: "/", label: "Home Page", priority: 1.0 }],
    },
    {
      title: "Services",
      links: [
        { path: "/services/software-development", label: "Software Development", priority: 0.8 },
        { path: "/services/seo", label: "SEO Services", priority: 0.8 },
        { path: "/services/social-media-marketing", label: "Social Media Marketing", priority: 0.8 },
        { path: "/services/content-marketing", label: "Content Marketing", priority: 0.8 },
        { path: "/services/google-ads", label: "Google Ads", priority: 0.8 },
        { path: "/services/social-platform-marketing", label: "Social Platform Marketing", priority: 0.8 },
      ],
    },
    {
      title: "Agency",
      links: [
        { path: "/agency/about-Us", label: "About Us", priority: 0.7 },
        { path: "/agency/our-team", label: "Our Team", priority: 0.7 },
        { path: "/agency/partners", label: "Partners", priority: 0.7 },
        { path: "/agency/news", label: "News", priority: 0.7 },
        { path: "/agency/careers", label: "Careers", priority: 0.7 },
        { path: "/agency/awards", label: "Awards", priority: 0.7 },
      ],
    },
    {
      title: "Work",
      links: [
        { path: "/work/portfolio", label: "Portfolio", priority: 0.8 },
        { path: "/work/case-study", label: "Case Studies", priority: 0.8 },
      ],
    },
    {
      title: "Content",
      links: [
        { path: "/blog", label: "Blog", priority: 0.9 },
        { path: "/projects", label: "Projects", priority: 0.8 },
      ],
    },
    {
      title: "Contact & Engagement",
      links: [
        { path: "/contact-us", label: "Contact Us", priority: 0.8 },
        { path: "/proposal-request", label: "Request a Proposal", priority: 0.7 },
        { path: "/join-the-movement", label: "Join the Movement", priority: 0.7 },
        { path: "/reviews", label: "Client Reviews", priority: 0.7 },
      ],
    },
    {
      title: "Legal",
      links: [
        { path: "/privacy-policy", label: "Privacy Policy", priority: 0.5 },
        { path: "/terms-and-conditions", label: "Terms and Conditions", priority: 0.5 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[var(--background)] to-slate-950 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto pt-20">
        <h1 className="text-3xl font-bold mb-8 text-center">Site Map</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {sitemapData.map((category) => (
            <div key={category.title} className="border border-slate-700 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full flex justify-between items-center p-4 bg-slate-800 hover:bg-slate-700 transition-colors text-left font-medium"
              >
                {category.title}
                <span className="text-gray-300">
                  {expandedCategories.includes(category.title) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </span>
              </button>

              {expandedCategories.includes(category.title) && (
                <div className="p-4 bg-slate-900">
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link.path} className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(link.priority)}`} />
                        <Link to={link.path} className="text-blue-400 hover:text-blue-500 hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-300">
          <p>Priority indicators:</p>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <span>High</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-500 mr-2" />
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPriorityColor(priority) {
  if (priority >= 0.9) return "bg-green-500"; // High priority
  if (priority >= 0.7) return "bg-yellow-500"; // Medium priority
  return "bg-gray-500"; // Low priority
}
