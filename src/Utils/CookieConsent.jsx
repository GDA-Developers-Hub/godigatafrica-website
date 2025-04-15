"use client";

import { useState, useEffect } from "react";
import { X, Settings, Shield, BarChart3, Cookie, ChevronRight, Check } from "lucide-react";
import logo from "../assets/logo.png"
import { initializeAnalytics, clearTrackingCookies } from "./Analytics";


const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check if user has already set cookie preferences
    const savedPreferences = localStorage.getItem("cookiePreferences");

    if (!savedPreferences) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsedPrefs = JSON.parse(savedPreferences);
        setPreferences(parsedPrefs);
        // Initialize analytics with user consent settings
        initializeAnalytics(parsedPrefs);
      } catch (error) {
        console.error("Error parsing saved cookie preferences:", error);
        setShowBanner(true);
      }
    }
  }, []);

  const acceptAll = async () => {
    const newPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };

    await savePreferences(newPreferences);
  };

  const acceptNecessary = async () => {
    await savePreferences({
      ...preferences,
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const savePreferences = async (prefs) => {
    setSaving(true);

    try {
      // Mock API call to save preferences on the backend
      await mockApiCall(prefs);

      // Save to localStorage
      localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
      setPreferences(prefs);
      setShowBanner(false);
      setShowSettings(false);

      // If withdrawing previously granted consent, clear cookies
      const oldPrefs = localStorage.getItem("cookiePreferences");
      if (oldPrefs) {
        const parsedOldPrefs = JSON.parse(oldPrefs);
        if ((parsedOldPrefs.analytics && !prefs.analytics) || 
            (parsedOldPrefs.marketing && !prefs.marketing)) {
          clearTrackingCookies();
        }
      }

      // Initialize analytics with current preferences
      initializeAnalytics(prefs);
    } catch (error) {
      console.error("Error saving cookie preferences:", error);
    } finally {
      setSaving(false);
    }
  };

  const mockApiCall = async (data) => {
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Cookie preferences saved to backend:", data);
        resolve();
      }, 800);
    });
  };

  const handleToggle = (key) => {
    if (key === "necessary") return; // Cannot toggle necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  if (!showBanner && !showSettings) {
    return (
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-30 left-5 z-[8900] bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all"
        aria-label="Cookie Settings"
      >
        <Cookie className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      {/* Main Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[9998] bg-white shadow-lg transform transition-transform duration-500 animate-slide-up border-t border-gray-200">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Cookie className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">Cookie Preferences</h2>
                  <p className="text-gray-600 max-w-2xl mt-1">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze
                    our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button
                  onClick={openSettings}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex-1 md:flex-none flex items-center justify-center cursor-pointer"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex-1 md:flex-none cursor-pointer"
                >
                  Necessary Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 md:flex-none flex items-center justify-center cursor-pointer"
                >
                  Accept All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 mr-3 relative">
                  {/* Replace with your actual logo */}
                  <div className="absolute inset-0  rounded-lg flex items-center justify-center">
                    <img src={logo} alt="" className="h-10 w-10" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Cookie Settings</h2>
              </div>
              <button onClick={closeSettings} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <p className="text-gray-600 mb-6">
                Manage your cookie preferences. Necessary cookies are required for the website to function properly.
              </p>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800">Necessary Cookies</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          These cookies are essential for the website to function properly.
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Required
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <Cookie className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800">Functional Cookies</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          These cookies enable personalized features and functionality.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={preferences.functional}
                        onChange={() => handleToggle("functional")}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800">Analytics Cookies</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          These cookies help us understand how visitors interact with our website.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={preferences.analytics}
                        onChange={() => handleToggle("analytics")}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-orange-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800">Marketing Cookies</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          These cookies are used to track visitors across websites to display relevant advertisements.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={preferences.marketing}
                        onChange={() => handleToggle("marketing")}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={closeSettings}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => savePreferences(preferences)}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
