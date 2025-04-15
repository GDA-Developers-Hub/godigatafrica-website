import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

const News = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/news/`);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Function to extract the first 30 words
  const getPreview = (content) => {
    const words = content.split(" ");
    return words.length > 30 ? words.slice(0, 30).join(" ") + "..." : content;
  };

  return (
    <section className="relative bg-gradient-to-b from-[var(--card-background)] to-[var(--card-background)] text-white py-27">
      <div className="max-w-6xl mx-auto text-center">
      <span className="text-[var(--text-primary)] mb-3 tracking-wider text-sm uppercase block font-bold">
            NEWS
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore the latest News & Updates
          </h1>
        <p className="text-base sm:text-lg text-[var(--text-primary)] font-bold max-w-3xl mx-auto">
          Stay informed with the latest trends, updates, and insights from the digital marketing world.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A90E2]"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12 max-w-6xl mx-auto px-4">
          {news.length > 0 ? (
            news.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-[#1B1D36] rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg sm:text-xl font-extrabold text-white mb-3">
                  {item.title}
                </h3>
                <p
                  className="text-gray-100 text-sm sm:text-base font-medium"
                  dangerouslySetInnerHTML={{ __html: getPreview(item.content) }}
                ></p>
                <button
                  onClick={() => setSelectedNews(item)}
                  className="mt-2 text-cyan-400 hover:underline text-sm"
                >
                  Read More
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center w-full">
              No news available at the moment.
            </p>
          )}
        </div>
      )}

      {/* Modal for full content */}
      {selectedNews && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-50">
          <div className="bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-3xl p-6 overflow-y-auto max-h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{selectedNews.title}</h3>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-gray-400 hover:text-white"
              >
                X
              </button>
            </div>
            <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: selectedNews.content }}></div>
            {selectedNews.image && (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="mt-4 w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
