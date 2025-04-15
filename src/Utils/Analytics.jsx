export const GOOGLE_ANALYTICS_ID = 'G-XXXXXXXXXX'; 

export const loadGoogleAnalytics = () => {
  if (typeof window === "undefined") return;
  
  // Don't load twice
  if (window.ga_loaded) return;
  
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  script.async = true;
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  // Default to denied state for all consent types until explicitly granted
  window.gtag('js', new Date());
  window.gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
  });
  
  // Add the script tag to the document
  document.head.appendChild(script);
  window.ga_loaded = true;
  
  // Configure the gtag with our GA ID but don't send any data yet
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    send_page_view: false
  });
};

// Update consent settings based on user preferences
export const initializeAnalytics = (consent) => {
  if (typeof window === "undefined") return;
  
  console.log("Initializing analytics with consent:", consent);
  
  // Load the analytics script if not already loaded
  if (!window.ga_loaded) {
    loadGoogleAnalytics();
  }
  
  // Update Google Analytics consent
  if (window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'functionality_storage': consent.functional ? 'granted' : 'denied',
      'personalization_storage': consent.marketing ? 'granted' : 'denied'
    });
    
    // If analytics is granted, send initial pageview
    if (consent.analytics) {
      window.gtag('config', GOOGLE_ANALYTICS_ID, {
        'page_location': window.location.href,
        'page_path': window.location.pathname
      });
      console.log("Google Analytics: Initial pageview sent");
    }
  }
  
  // Initialize other marketing trackers if consent is given
  if (consent.marketing) {
    initializeFacebookPixel(consent);
    initializeLinkedInInsight(consent);
    console.log("Marketing trackers initialized with consent");
  }
};

// Initialize Facebook Pixel
export const initializeFacebookPixel = (consent) => {
  if (!consent.marketing || typeof window === "undefined") return;
  
  if (!window.fbq) {
    const FACEBOOK_PIXEL_ID = 'XXXXXXXXXX'; 
    
    window.fbq = function() {
      if (window._fbq) window._fbq.push(arguments);
      else window._fbq = [arguments];
    };
    
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    
    window.fbq('init', FACEBOOK_PIXEL_ID);
    window.fbq('track', 'PageView');
    
    console.log("Facebook Pixel initialized");
  }
};

// Initialize LinkedIn Insight Tag
export const initializeLinkedInInsight = (consent) => {
  if (!consent.marketing || typeof window === "undefined") return;
  
  if (!window._linkedin_data_partner_id) {
    const LINKEDIN_PARTNER_ID = 'XXXXXXX'; 
    
    window._linkedin_data_partner_id = LINKEDIN_PARTNER_ID;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);
    
    console.log("LinkedIn Insight Tag initialized");
  }
};

export const trackPageView = (path) => {
  if (typeof window === "undefined") return;
  
  // Check if analytics consent is given
  const savedPreferences = localStorage.getItem("cookiePreferences");
  if (!savedPreferences) return;
  
  try {
    const preferences = JSON.parse(savedPreferences);
    
    // Google Analytics page view
    if (preferences.analytics && window.gtag) {
      window.gtag('config', GOOGLE_ANALYTICS_ID, {
        'page_location': window.location.origin + path,
        'page_path': path
      });
      console.log(`Google Analytics: Page view tracked: ${path}`);
    }
    
    // Facebook Pixel pageview
    if (preferences.marketing && window.fbq) {
      window.fbq('track', 'PageView');
      console.log(`Facebook Pixel: Page view tracked: ${path}`);
    }
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window === "undefined") return;
  
  // Check if analytics consent is given
  const savedPreferences = localStorage.getItem("cookiePreferences");
  if (!savedPreferences) return;
  
  try {
    const preferences = JSON.parse(savedPreferences);
    
    // Google Analytics event
    if (preferences.analytics && window.gtag) {
      window.gtag('event', eventName, eventParams);
      console.log(`Google Analytics: Event tracked: ${eventName}`, eventParams);
    }
    
    // Facebook Pixel event
    if (preferences.marketing && window.fbq) {
      window.fbq('track', eventName, eventParams);
      console.log(`Facebook Pixel: Event tracked: ${eventName}`, eventParams);
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

// E-commerce specific tracking
export const trackPurchase = (transaction) => {
  if (typeof window === "undefined") return;
  
  const savedPreferences = localStorage.getItem("cookiePreferences");
  if (!savedPreferences) return;
  
  try {
    const preferences = JSON.parse(savedPreferences);
    
    if (preferences.analytics && window.gtag) {
      // Google Analytics 4 purchase event
      window.gtag('event', 'purchase', {
        transaction_id: transaction.id,
        value: transaction.value,
        currency: transaction.currency,
        tax: transaction.tax,
        shipping: transaction.shipping,
        items: transaction.items
      });
      console.log('Google Analytics: Purchase tracked', transaction);
    }
    
    if (preferences.marketing && window.fbq) {
      // Facebook Pixel purchase event
      window.fbq('track', 'Purchase', {
        value: transaction.value,
        currency: transaction.currency,
        contents: transaction.items,
        content_type: 'product'
      });
      console.log('Facebook Pixel: Purchase tracked', transaction);
    }
  } catch (error) {
    console.error("Error tracking purchase:", error);
  }
};

// Helper function to track user engagement
export const trackEngagement = (action, category, label, value) => {
  trackEvent('engagement', {
    engagement_action: action,
    engagement_category: category,
    engagement_label: label,
    engagement_value: value
  });
};

// Helper function to remove all tracking cookies when consent is withdrawn
export const clearTrackingCookies = () => {
  if (typeof window === "undefined") return;
  
  // Find all cookies and delete GA, FB and LinkedIn related ones
  const cookies = document.cookie.split(";");
  
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    
    // GA cookies
    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
    }
    
    // FB cookies
    if (name.startsWith('_fbp') || name.startsWith('_fbc')) {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
    }
    
    // LinkedIn cookies
    if (name.startsWith('li_') || name.startsWith('lang') || name.startsWith('bcookie')) {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
    }
  }
  
  console.log("All tracking cookies cleared");
};
