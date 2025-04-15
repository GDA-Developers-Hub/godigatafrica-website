import React from 'react';
import SEOHead from './SEOHead';

// Base URL for canonical links
const baseUrl = 'https://godigitalafrica.com';

// Service SEO definitions
const serviceSEOData = {
  // Web Development & Software 
  softwareDevelopment: {
    title: 'Custom Software Development Services',
    description: 'Professional web applications & software development tailored for African businesses. Enhance efficiency with custom-built solutions that automate processes and improve productivity.',
    keywords: 'software development, web applications, custom software, Africa tech solutions, business automation, digital transformation',
    canonical: `${baseUrl}/services/software-development`,
    ogImage: '/images/software-development-og.jpg'
  },
  
  corporateWebsite: {
    title: 'Corporate Website Development',
    description: 'Professional corporate website development services for Africa-based businesses. Create a powerful online presence with modern, responsive, and brand-aligned websites.',
    keywords: 'corporate website, business website, professional web design, Africa web development, company website, responsive design',
    canonical: `${baseUrl}/services/corporate-website`,
    ogImage: '/images/corporate-website-og.jpg'
  },
  
  ecommerceDesign: {
    title: 'E-commerce Website Design & Development',
    description: 'Expert e-commerce website design services optimized for African markets. Create user-friendly online stores with secure payment options and mobile-responsive designs.',
    keywords: 'e-commerce design, online store development, Africa e-commerce, mobile shopping, digital marketplace, online retail solutions',
    canonical: `${baseUrl}/services/ecommerce-design`,
    ogImage: '/images/ecommerce-design-og.jpg'
  },
  
  landingPage: {
    title: 'Custom Landing Page Development',
    description: 'High-converting landing page development services for African businesses. Increase leads and sales with targeted, conversion-optimized landing pages.',
    keywords: 'landing page design, conversion optimization, lead generation pages, Africa digital marketing, sales pages, campaign landing pages',
    canonical: `${baseUrl}/services/landing-page`,
    ogImage: '/images/landing-page-og.jpg'
  },
  
  websiteMaintenance: {
    title: 'Website Maintenance Services',
    description: 'Professional website maintenance services for businesses across Africa. Keep your website secure, updated, and performing optimally with our expert support.',
    keywords: 'website maintenance, website updates, website security, Africa web services, website support, website management',
    canonical: `${baseUrl}/services/website-maintenance`,
    ogImage: '/images/website-maintenance-og.jpg'
  },
  
  // SEO Services
  seo: {
    title: 'Search Engine Optimization Services',
    description: 'Effective SEO services tailored for African businesses. Boost online visibility, drive organic traffic, and increase conversions with data-driven optimization strategies.',
    keywords: 'SEO services, search engine optimization, African SEO, organic traffic, website ranking, google ranking, local SEO',
    canonical: `${baseUrl}/services/seo`,
    ogImage: '/images/seo-services-og.jpg'
  },
  
  localSEO: {
    title: 'Local SEO Services for African Businesses',
    description: 'Targeted local SEO services to help African businesses dominate local search results. Boost visibility in your geographic market and attract nearby customers.',
    keywords: 'local SEO, African business SEO, Google My Business, local search optimization, map listings, local rankings, city-specific SEO',
    canonical: `${baseUrl}/services/local-seo`,
    ogImage: '/images/local-seo-og.jpg'
  },
  
  technicalSEO: {
    title: 'Technical SEO Services & Audits',
    description: 'Expert technical SEO services for Africa-based websites. Optimize site structure, fix technical issues, and improve crawlability for better search engine rankings.',
    keywords: 'technical SEO, website audit, site speed optimization, mobile optimization, schema markup, crawlability, technical audits',
    canonical: `${baseUrl}/services/technical-seo`,
    ogImage: '/images/technical-seo-og.jpg'
  },
  
  internationalSEO: {
    title: 'International SEO Services',
    description: 'International SEO services for African businesses expanding globally. Optimize your website for international search engines and diverse global markets.',
    keywords: 'international SEO, global SEO strategy, multi-language SEO, international markets, global expansion, hreflang implementation',
    canonical: `${baseUrl}/services/international-seo`,
    ogImage: '/images/international-seo-og.jpg'
  },
  
  serm: {
    title: 'Search Engine Reputation Management',
    description: 'Professional search engine reputation management for African businesses and individuals. Control your online narrative and build a positive digital presence.',
    keywords: 'online reputation management, SERM, brand reputation, negative search results, reputation monitoring, digital image management',
    canonical: `${baseUrl}/services/serm`,
    ogImage: '/images/serm-og.jpg'
  },
  
  seoReferral: {
    title: 'SEO Referral Program',
    description: 'Partner with Go Digital Africa through our SEO referral program. Earn commissions by referring clients to our professional SEO services across Africa.',
    keywords: 'SEO referral program, digital marketing partnership, affiliate program, SEO commission, referral rewards, SEO partnership',
    canonical: `${baseUrl}/services/seo-referral`,
    ogImage: '/images/seo-referral-og.jpg'
  },
  
  // Social Media Services
  socialMediaMarketing: {
    title: 'Social Media Marketing Services',
    description: 'Strategic social media marketing services for African businesses. Grow your brand with targeted campaigns that engage audiences and drive results.',
    keywords: 'social media marketing, social media strategy, Africa social media, brand building, social engagement, social media campaigns',
    canonical: `${baseUrl}/services/social-media-marketing`,
    ogImage: '/images/social-media-marketing-og.jpg'
  },
  
  socialMediaManagement: {
    title: 'Social Media Management Services',
    description: 'Professional social media management for African businesses. We handle content creation, scheduling, monitoring, and engagement to grow your online presence.',
    keywords: 'social media management, content creation, social strategy, engagement management, social media growth, profile optimization',
    canonical: `${baseUrl}/services/social-media-management`,
    ogImage: '/images/social-media-management-og.jpg'
  },
  
  socialMediaContent: {
    title: 'Social Media Content Creation',
    description: 'Professional social media content creation services for African businesses. Create engaging, culturally relevant content that resonates with African audiences.',
    keywords: 'social media content, content creation, Africa-focused content, visual content, engagement content, branded content',
    canonical: `${baseUrl}/services/social-media-content`,
    ogImage: '/images/social-media-content-og.jpg'
  },
  
  socialPlatformMarketing: {
    title: 'Social Platform Marketing Services',
    description: 'Strategic social platform marketing services tailored for African markets. Leverage the right platforms to reach your target audience and achieve business goals.',
    keywords: 'social platform marketing, multi-channel strategy, platform optimization, social media channels, audience targeting',
    canonical: `${baseUrl}/services/social-platform-marketing`,
    ogImage: '/images/social-platform-marketing-og.jpg'
  },
  
  // Paid Advertising
  paidSocial: {
    title: 'Paid Social Media Advertising',
    description: 'Effective paid social media advertising services for African businesses. Reach targeted audiences and drive conversions with optimized paid campaigns.',
    keywords: 'paid social ads, social media advertising, Facebook ads, Instagram ads, social ad campaigns, targeted advertising',
    canonical: `${baseUrl}/services/paid-social`,
    ogImage: '/images/paid-social-og.jpg'
  },
  
  googleAds: {
    title: 'Google Ads Management Services',
    description: 'Professional Google Ads management services for African businesses. Maximize ROI with expertly managed search, display, and video advertising campaigns.',
    keywords: 'Google Ads, PPC management, search advertising, display ads, Google advertising, Africa PPC, AdWords management',
    canonical: `${baseUrl}/services/google-ads`,
    ogImage: '/images/google-ads-og.jpg'
  },
  
  linkedInAds: {
    title: 'LinkedIn Advertising Services',
    description: 'Strategic LinkedIn advertising services for African B2B businesses. Reach decision-makers and professionals with targeted LinkedIn ad campaigns.',
    keywords: 'LinkedIn ads, B2B advertising, professional targeting, LinkedIn campaigns, business advertising, lead generation ads',
    canonical: `${baseUrl}/services/linkedin-ads`,
    ogImage: '/images/linkedin-ads-og.jpg'
  },
  
  googleShopping: {
    title: 'Google Shopping Ads Management',
    description: 'Expert Google Shopping ads management for African e-commerce businesses. Increase product visibility and sales with optimized shopping campaigns.',
    keywords: 'Google Shopping ads, product listing ads, e-commerce advertising, shopping campaigns, product ads, retail advertising',
    canonical: `${baseUrl}/services/google-shopping`,
    ogImage: '/images/google-shopping-og.jpg'
  },
  
  googleDisplayNetwork: {
    title: 'Google Display Network Advertising',
    description: 'Strategic Google Display Network advertising for African businesses. Reach potential customers across millions of websites with visually engaging ads.',
    keywords: 'display advertising, banner ads, Google Display Network, visual advertising, remarketing, brand awareness ads',
    canonical: `${baseUrl}/services/google-display-network`,
    ogImage: '/images/google-display-network-og.jpg'
  },
  
  youtubeAds: {
    title: 'YouTube Advertising Services',
    description: 'Effective YouTube advertising services for African businesses. Engage audiences with video ads on the world\'s largest video platform.',
    keywords: 'YouTube ads, video advertising, pre-roll ads, TrueView ads, video marketing, YouTube campaigns',
    canonical: `${baseUrl}/services/youtube-ads`,
    ogImage: '/images/youtube-ads-og.jpg'
  },
  
  sem: {
    title: 'Search Engine Marketing Services',
    description: 'Comprehensive search engine marketing services for African businesses. Drive targeted traffic and conversions through strategic paid search campaigns.',
    keywords: 'search engine marketing, SEM, paid search, PPC, Google Ads, Bing Ads, search advertising',
    canonical: `${baseUrl}/services/sem`,
    ogImage: '/images/sem-og.jpg'
  },
  
  // Content Marketing
  contentMarketing: {
    title: 'Content Marketing Services',
    description: 'Strategic content marketing services for African businesses. Build authority and engage audiences with valuable, culturally relevant content.',
    keywords: 'content marketing, content strategy, African content, brand storytelling, content creation, audience engagement',
    canonical: `${baseUrl}/services/content-marketing`,
    ogImage: '/images/content-marketing-og.jpg'
  },
  
  copywriting: {
    title: 'Professional Copywriting Services',
    description: 'Expert copywriting services for African businesses. Create compelling copy that resonates with African audiences and drives action.',
    keywords: 'copywriting services, content writing, business copywriting, website copy, SEO copywriting, marketing copy',
    canonical: `${baseUrl}/services/copywriting`,
    ogImage: '/images/copywriting-og.jpg'
  },
  
  influencerMarketing: {
    title: 'Influencer Marketing Services',
    description: 'Strategic influencer marketing services for African brands. Connect with relevant African influencers to amplify your message and reach new audiences.',
    keywords: 'influencer marketing, Africa influencers, brand partnerships, influencer campaigns, social media influencers, brand ambassadors',
    canonical: `${baseUrl}/services/influencer-marketing`,
    ogImage: '/images/influencer-marketing-og.jpg'
  }
};

// Service SEO component to be used in individual service pages
const ServiceSEO = ({ service }) => {
  const seoData = serviceSEOData[service];
  
  if (!seoData) {
    console.warn(`SEO data not found for service: ${service}`);
    return null;
  }
  
  return (
    <SEOHead
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      canonical={seoData.canonical}
      ogImage={seoData.ogImage}
      ogType="website"
    />
  );
};

export default ServiceSEO;
export { serviceSEOData }; 