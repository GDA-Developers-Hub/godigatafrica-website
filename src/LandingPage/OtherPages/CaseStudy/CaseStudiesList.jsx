import { useState, useEffect } from "react";
import { ArrowRight, Search, RefreshCw } from 'lucide-react';
import CaseStudyCard from "./CaseStudyCard";
import { getCaseStudies, clearCache } from "./ApiService";

export default function CaseStudiesList() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryIn, setRetryIn] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchCaseStudies = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      setIsRetrying(false);
      
      // If forceRefresh is true, we'll skip the cache
      const data = await getCaseStudies();
      
      // Extract the case studies from the "results" property
      const caseStudiesArray = data.results || [];
      setCaseStudies(caseStudiesArray);

      // Extract unique industries and filter out any undefined values
      const uniqueIndustries = [...new Set(caseStudiesArray
        .map((study) => study.industry)
        .filter(industry => industry) // Filter out undefined/null industries
      )];
      setIndustries(uniqueIndustries);
      
    } catch (err) {
      // Check if it's a rate limit error
      if (err.message.includes("API rate limit exceeded") || 
          err.message.includes("Request was throttled")) {
        
        // Extract retry time from error message
        const match = err.message.match(/(\d+) seconds/);
        if (match && match[1]) {
          const waitTime = parseInt(match[1], 10);
          setRetryIn(waitTime);
          
          // Start countdown timer
          const countdownInterval = setInterval(() => {
            setRetryIn(prevTime => {
              if (prevTime <= 1) {
                clearInterval(countdownInterval);
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
        }
      }
      
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
    
    // Cleanup function to clear any intervals when component unmounts
    return () => {
      const highestId = window.setTimeout(() => {}, 0);
      for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
      }
    };
  }, []);

  // Manual retry function
  const handleRetry = () => {
    if (retryIn > 0) return; // Don't retry if countdown is still active
    // Force refresh when manually retrying
    fetchCaseStudies(true);
  };

  // Filter case studies based on active industry and search query
  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesIndustry = activeIndustry === "all" || study.industry === activeIndustry;
    const matchesSearch =
      searchQuery === "" ||
      (study.title && study.title.toLowerCase().includes(searchQuery.toLowerCase())); // Add null check
    return matchesIndustry && matchesSearch;
  });

  return (
    <section className="relative py-30 overflow-hidden bg-gradient-to-t from-gray-900 via-[var(--background)] to-gray-900 text-white">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase block">
            Our Work
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Case Studies
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
            />
          </div>

          {/* Industry Filter */}
          <div className="flex flex-wrap gap-3">
            <button
              className={`px-4 py-2 rounded-full ${
                activeIndustry === "all"
                  ? "bg-cyan-500 text-white"
                  : "border border-cyan-500 text-white hover:bg-cyan-500/10"
              }`}
              onClick={() => setActiveIndustry("all")}
            >
              All Industries
            </button>
            {industries.map((industry) => (
              <button
                key={industry}
                className={`px-4 py-2 rounded-full ${
                  activeIndustry === industry
                    ? "bg-cyan-500 text-white"
                    : "border border-cyan-500 text-white hover:bg-cyan-500/10"
                }`}
                onClick={() => setActiveIndustry(industry)}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid or Error/Loading States */}
        {loading ? (
          <div className="text-center py-16 text-gray-300">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl">Loading case studies...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-red-500/30 mb-16">
            <h3 className="text-2xl font-bold text-white mb-4">Error</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            
            {retryIn > 0 ? (
              <div className="mb-6">
                <p className="text-amber-400 mb-2">Retrying in {retryIn} seconds...</p>
                <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-1000" 
                    style={{ width: `${(retryIn / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className={`border border-cyan-500 text-white hover:bg-cyan-500/10 px-6 py-2 rounded-full flex items-center justify-center mx-auto ${isRetrying ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Now
                  </>
                )}
              </button>
            )}
          </div>
        ) : filteredCaseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCaseStudies.map((study, index) => (
              <CaseStudyCard key={study.id || index} {...study} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700 mb-16">
            <h3 className="text-2xl font-bold text-white mb-4">No Case Studies Found</h3>
            <p className="text-gray-300 mb-6">Try a different search term or filter.</p>
            <button
              className="border border-cyan-500 text-white hover:bg-cyan-500/10 px-4 py-2 rounded-full"
              onClick={() => {
                setActiveIndustry("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}