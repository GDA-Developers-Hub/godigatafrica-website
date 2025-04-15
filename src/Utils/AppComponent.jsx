"use client";

import { useEffect, useState } from 'react';
import { trackPageView, trackEvent, trackEngagement } from './Analytics';

export default function AnalyticsProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Track page views
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);
    
    // Set up listener for route changes
    const handleRouteChange = () => {
      const path = window.location.pathname;
      if (path !== currentPath) {
        setCurrentPath(path);
        trackPageView(path);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      originalPushState.apply(this, arguments);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
    };
  }, [currentPath]);

  // Example of tracking a custom event - call this from your components
  const handleButtonClick = () => {
    trackEvent('button_click', {
      button_name: 'example_button',
      page: currentPath
    });
  };

  // Example of tracking user engagement
  const handleVideoPlayback = (videoId, progress) => {
    trackEngagement('video_progress', 'media', videoId, progress);
  };

  // Example of tracking form submission
  const handleFormSubmit = (formId, success) => {
    trackEvent('form_submit', {
      form_id: formId,
      success: success,
      page: currentPath
    });
  };

  return children;
}

