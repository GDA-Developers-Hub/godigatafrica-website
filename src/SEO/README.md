# SEO Implementation Guide for Go Digital Africa Website

This directory contains SEO components for implementing search engine optimization across the Go Digital Africa website.

## Overview

The SEO implementation uses React Helmet Async to manage document head metadata like title, description, and keywords for all pages.

## Components

1. `SEOHead.jsx` - Base component that handles metadata rendering
2. `ServicesSEO.jsx` - Service-specific SEO for service pages
3. `PageSEO.jsx` - General page SEO for non-service pages
4. `index.js` - Export all SEO components

## How to Use

### For Service Pages

Import the `ServiceSEO` component and place it at the top of your component:

```jsx
import { ServiceSEO } from "../../../SEO";

export default function YourServiceComponent() {
  return (
    <div>
      <ServiceSEO service="serviceKeyName" />
      {/* Rest of your component */}
    </div>
  );
}
```

Available service keys:
- `softwareDevelopment`
- `seo`
- `socialMediaMarketing`
- `paidSocial`
- etc. (see all keys in `ServicesSEO.jsx`)

### For Regular Pages

Import the `PageSEO` component and place it at the top of your component:

```jsx
import { PageSEO } from "../../SEO";

export default function YourPageComponent() {
  return (
    <div>
      <PageSEO page="pageKeyName" />
      {/* Rest of component */}
    </div>
  );
}
```

Available page keys:
- `home`
- `about`
- `contact`
- `blog`
- etc. (see all keys in `PageSEO.jsx`)

### For Custom SEO

For pages that need custom or dynamic SEO:

```jsx
import { SEOHead } from "../../SEO";

export default function CustomPage() {
  // Dynamic values
  const pageTitle = "Your Dynamic Title";
  
  return (
    <div>
      <SEOHead 
        title={pageTitle}
        description="Custom description..."
        keywords="keyword1, keyword2, keyword3"
        canonical="https://godigitalafrica.com/your-page"
        ogImage="/images/custom-image.jpg"
      />
      {/* Rest of component */}
    </div>
  );
}
```

## Adding New SEO Definitions

To add new SEO definitions:

1. For services, add to the `serviceSEOData` object in `ServicesSEO.jsx`
2. For pages, add to the `pageSEOData` object in `PageSEO.jsx`

## Best Practices

- Keep titles under 60 characters
- Keep descriptions between 140-160 characters
- Include 5-10 relevant keywords
- Ensure canonical URLs are correct
- Provide high-quality og:images (1200x630px recommended) 