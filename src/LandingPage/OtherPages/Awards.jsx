"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${BASE_URL}/awards/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAwards(response.data);
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAwards();
  }, []);

  if (isLoading) {
    return (
      <section className="flex bg-gradient-to-r justify-center text-white from-[#0D0F21] items-center md:px-20 px-6 py-16 relative to-[#1B1D36]">
        <div className="flex bg-gray-900 h-[calc(100vh-4rem)] justify-center p-6 items-center">
         <div className="border-b-2 border-cyan-500 border-t-2 h-12 rounded-full w-12 animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--card-background)] text-white py-30">
      <div className="text-center max-w-6xl mx-auto">
      <span className="text-[var(--text-primary)] mb-3 tracking-wider text-sm uppercase block font-bold">
            ARCHIEVEMENTS
        </span>
        <h1 className="bg-clip-text bg-gradient-to-r text-3xl text-transparent font-bold from-white mb-6 md:text-5xl sm:text-4xl to-white">
          Our Achievements & Awards
        </h1>
        <p className="text-base text-[var(--text-primary)]  font-bold max-w-3xl mx-auto sm:text-lg">
          Celebrating our milestones and industry recognition for excellence.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mt-12 mx-auto px-4 sm:grid-cols-2">
        {awards.map((award) => (
          <div
            key={award.id}
            className="bg-gradient-to-br p-6 rounded-lg shadow-lg from-[#1B1D36] hover:scale-105 to-[#2A2D50] transform transition-transform"
          >
            <h3 className="bg-clip-text bg-white text-lg text-transparent font-semibold">
              {award.title}
            </h3>
            <p className="text-gray-100 font-bold text-sm sm:text-base">
              {award.description}
            </p>
            {award.awarded_date && (
              <p className="text-gray-100 font-bold text-sm mt-2">
                Awarded on: {new Date(award.awarded_date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
