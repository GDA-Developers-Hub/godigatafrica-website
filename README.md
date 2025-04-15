# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Analytics Implementation Guide

This document explains how the analytics system works with the CookieConsent component.

## Overview

The analytics implementation is designed to comply with privacy regulations like GDPR, CCPA, and ePrivacy. It includes:

1. **Cookie Consent Banner** - Allows users to choose which types of cookies they accept
2. **Google Analytics 4 Integration** - Respects user consent choices
3. **Marketing Trackers** - Facebook Pixel and LinkedIn Insight Tag (only loaded with consent)
4. **Event Tracking** - For custom events and user engagement

## How It Works

### Consent Management

The `CookieConsent.jsx` component handles collecting and storing user consent:

- **Necessary Cookies** - Always enabled (required for basic site functionality)
- **Functional Cookies** - For enhanced features
- **Analytics Cookies** - For usage statistics (Google Analytics)
- **Marketing Cookies** - For ad targeting (Facebook Pixel, LinkedIn)

User preferences are stored in `localStorage` under the key `cookiePreferences`.

### Analytics Integration (Analytics.jsx)

The `Analytics.jsx` file contains all the logic for tracking and respects user consent:

1. **Script Loading** - Analytics scripts are only loaded after consent is given
2. **Consent Modes** - All tracking is set to "denied" by default and only enabled when consent is granted
3. **Consent Withdrawal** - Cookies are cleared if consent is withdrawn

## Available Functions

### Core Functions

- `initializeAnalytics(consent)` - Sets up all tracking based on user consent
- `trackPageView(path)` - Tracks page views (respects consent)
- `trackEvent(eventName, eventParams)` - Tracks custom events

### Advanced Functions

- `trackPurchase(transaction)` - E-commerce purchase tracking
- `trackEngagement(action, category, label, value)` - User engagement tracking
- `clearTrackingCookies()` - Removes all tracking cookies

## Implementation Steps

### 1. Configure Analytics IDs

In `Analytics.jsx`, replace the placeholder IDs with your actual tracking IDs:

```javascript
export const GOOGLE_ANALYTICS_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
const FACEBOOK_PIXEL_ID = 'XXXXXXXXXX'; // Replace with your actual Pixel ID
const LINKEDIN_PARTNER_ID = 'XXXXXXX'; // Replace with your actual LinkedIn ID
```

### 2. Add the Analytics Provider

Wrap your application with the `AnalyticsProvider` component in your main layout or app file:

```javascript
import AnalyticsProvider from './components/AnalyticsProvider';

function MyApp({ Component, pageProps }) {
  return (
    <AnalyticsProvider>
      <Component {...pageProps} />
    </AnalyticsProvider>
  );
}

export default MyApp;
```

### 3. Track Custom Events

Import the tracking functions where needed:

```javascript
import { trackEvent, trackEngagement, trackPurchase } from './Analytics';

// Track a button click
const handleSubmit = () => {
  trackEvent('form_submitted', { form_id: 'contact_form' });
  // rest of the code...
}

// Track a purchase
const handleCheckout = (order) => {
  trackPurchase({
    id: order.id,
    value: order.total,
    currency: 'USD',
    items: order.items
  });
}
```

## Testing

To verify the implementation:

1. Open your website and check the console
2. You should see initialization logs when consent is given
3. Check that Google Analytics receives data only when consent is given
4. Test withdrawing consent and verify cookies are cleared

## Compliance Notes

- Always load scripts only after consent is given
- Default state should be "denied" for all non-necessary cookies
- Provide clear options to withdraw consent
- Document all tracking in your privacy policy

## Troubleshooting

- If tracking doesn't work, check browser console for errors
- Verify consent is properly stored in localStorage
- Test in incognito/private mode to simulate first-time visitors
- Use browser dev tools to verify cookies are created/removed properly 