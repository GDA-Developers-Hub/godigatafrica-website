import React from 'react';
import SEOHead from './SEOHead';

// Base URL for canonical links
const baseUrl = 'https://godigitalafrica.com';

// Page SEO definitions
const pageSEOData = {
  home: {
    title: 'Digital Marketing Agency for African Businesses',
    description: 'Go Digital Africa is a full-service digital marketing agency specialized in helping African businesses grow online with SEO, social media, web development, and digital advertising.',
    keywords: 'digital marketing Africa, African digital agency, SEO services Africa, web development Africa, social media marketing, digital transformation',
    canonical: baseUrl,
    ogImage: '/images/go-digital-africa-og.jpg'
  },
  
  about: {
    title: 'About Our Digital Marketing Agency',
    description: 'Learn about Go Digital Africa, a leading digital marketing agency dedicated to helping African businesses thrive in the digital world through innovative marketing solutions.',
    keywords: 'Go Digital Africa, about us, digital agency Africa, marketing agency, our team, African digital experts',
    canonical: `${baseUrl}/agency/about-us`,
    ogImage: '/images/about-us-og.jpg'
  },
  
  team: {
    title: 'Meet Our Team of Digital Experts',
    description: 'Meet the passionate team behind Go Digital Africa. Our digital marketing experts combine local market knowledge with global best practices.',
    keywords: 'digital marketing team, African marketers, Go Digital team, marketing professionals, digital experts',
    canonical: `${baseUrl}/agency/our-team`,
    ogImage: '/images/our-team-og.jpg'
  },
  
  partners: {
    title: 'Our Strategic Digital Partners',
    description: 'Discover Go Digital Africa\'s network of strategic partners helping us deliver exceptional digital marketing services across the African continent.',
    keywords: 'digital marketing partners, strategic alliances, Africa tech partners, business partners, technology collaborations',
    canonical: `${baseUrl}/agency/partners`,
    ogImage: '/images/partners-og.jpg'
  },
  
  news: {
    title: 'Latest Digital Marketing News & Updates',
    description: 'Stay updated with the latest digital marketing news, trends, and insights relevant to businesses operating in African markets.',
    keywords: 'digital marketing news, Africa tech updates, industry trends, marketing insights, digital innovation, African business news',
    canonical: `${baseUrl}/agency/news`,
    ogImage: '/images/news-og.jpg'
  },
  
  careers: {
    title: 'Career Opportunities at Go Digital Africa',
    description: 'Explore exciting career opportunities with Go Digital Africa. Join our team of digital marketing professionals making an impact across the continent.',
    keywords: 'digital marketing jobs, career Africa, marketing positions, job opportunities, work with us, digital careers',
    canonical: `${baseUrl}/agency/careers`,
    ogImage: '/images/careers-og.jpg'
  },
  
  awards: {
    title: 'Our Awards & Recognition',
    description: 'View the awards and recognition earned by Go Digital Africa for excellence in digital marketing services across the African continent.',
    keywords: 'digital marketing awards, industry recognition, marketing excellence, African business awards, agency achievements',
    canonical: `${baseUrl}/agency/awards`,
    ogImage: '/images/awards-og.jpg'
  },
  
  contact: {
    title: 'Contact Our Digital Marketing Team',
    description: 'Get in touch with Go Digital Africa\'s digital marketing experts. We\'re here to help your African business succeed in the digital landscape.',
    keywords: 'contact digital agency, marketing consultation, Get in touch, digital services inquiry, African marketing agency contact',
    canonical: `${baseUrl}/contact-us`,
    ogImage: '/images/contact-us-og.jpg'
  },
  
  blog: {
    title: 'Digital Marketing Blog & Insights',
    description: 'Explore our digital marketing blog for expert insights, tips, and strategies tailored for businesses operating in African markets.',
    keywords: 'digital marketing blog, Africa business tips, marketing strategies, SEO insights, social media tips, digital transformation',
    canonical: `${baseUrl}/blog`,
    ogImage: '/images/blog-og.jpg'
  },
  
  portfolio: {
    title: 'Our Digital Marketing Portfolio',
    description: 'Explore Go Digital Africa\'s portfolio of successful digital marketing projects and campaigns for businesses across the African continent.',
    keywords: 'digital marketing portfolio, African business success stories, marketing case studies, client projects, agency work',
    canonical: `${baseUrl}/work/portfolio`,
    ogImage: '/images/portfolio-og.jpg'
  },
  
  caseStudies: {
    title: 'Digital Marketing Case Studies',
    description: 'Discover real-world digital marketing success stories from Go Digital Africa\'s work with businesses across various African markets and industries.',
    keywords: 'digital marketing case studies, success stories, African business growth, marketing results, client success',
    canonical: `${baseUrl}/work/case-study`,
    ogImage: '/images/case-studies-og.jpg'
  },
  
  pricing: {
    title: 'Digital Marketing Services Pricing',
    description: 'Transparent pricing for Go Digital Africa\'s digital marketing services. Find affordable solutions tailored for businesses across the African continent.',
    keywords: 'digital marketing pricing, affordable marketing services, service packages, marketing costs, agency pricing',
    canonical: `${baseUrl}/pricing`,
    ogImage: '/images/pricing-og.jpg'
  },
  
  reviews: {
    title: 'Client Reviews & Testimonials',
    description: 'Read what our clients say about Go Digital Africa\'s digital marketing services and the results we\'ve delivered for businesses across Africa.',
    keywords: 'digital marketing reviews, client testimonials, African business feedback, service ratings, customer experiences',
    canonical: `${baseUrl}/reviews`,
    ogImage: '/images/reviews-og.jpg'
  },
  
  privacyPolicy: {
    title: 'Privacy Policy',
    description: 'Go Digital Africa\'s privacy policy. Learn how we collect, use, and protect your information when you use our digital marketing services or website.',
    keywords: 'privacy policy, data protection, information security, privacy practices, GDPR compliance',
    canonical: `${baseUrl}/privacy-policy`,
    ogImage: '/images/privacy-policy-og.jpg'
  },
  
  termsConditions: {
    title: 'Terms and Conditions',
    description: 'Go Digital Africa\'s terms and conditions for using our digital marketing services and website. Understand your rights and responsibilities.',
    keywords: 'terms and conditions, service terms, legal agreement, usage policy, user terms',
    canonical: `${baseUrl}/terms-and-conditions`,
    ogImage: '/images/terms-conditions-og.jpg'
  },
  
  sitemap: {
    title: 'Website Sitemap',
    description: 'Navigate the Go Digital Africa website with our comprehensive sitemap. Find all our digital marketing services and resources in one place.',
    keywords: 'sitemap, website navigation, site structure, page index, website pages',
    canonical: `${baseUrl}/sitemap`,
    ogImage: '/images/sitemap-og.jpg'
  },
  
  glossary: {
    title: 'Digital Marketing Glossary',
    description: 'Comprehensive glossary of digital marketing terms and concepts relevant to businesses operating in African markets.',
    keywords: 'digital marketing terms, marketing glossary, industry terminology, SEO terms, social media terms',
    canonical: `${baseUrl}/glossary`,
    ogImage: '/images/glossary-og.jpg'
  },
  
  partnerships: {
    title: 'Partnership Opportunities',
    description: 'Explore partnership opportunities with Go Digital Africa. Collaborate with the leading digital marketing agency for African businesses.',
    keywords: 'business partnerships, agency collaboration, strategic partners, joint ventures, marketing alliances',
    canonical: `${baseUrl}/partnerships`,
    ogImage: '/images/partnerships-og.jpg'
  },
  
  joinMovement: {
    title: 'Join the Digital Transformation Movement',
    description: 'Join Go Digital Africa\'s movement to drive digital transformation across the continent. Be part of bringing African businesses online.',
    keywords: 'digital transformation, Africa online, business digitization, digital movement, tech adoption',
    canonical: `${baseUrl}/join-the-movement`,
    ogImage: '/images/join-movement-og.jpg'
  },
  
  proposalRequest: {
    title: 'Request a Digital Marketing Proposal',
    description: 'Request a customized digital marketing proposal from Go Digital Africa. Get tailored solutions for your African business needs.',
    keywords: 'marketing proposal, service proposal, digital strategy, custom quote, business proposal',
    canonical: `${baseUrl}/proposal-request`,
    ogImage: '/images/proposal-request-og.jpg'
  }
};

// Page SEO component to be used in individual pages
const PageSEO = ({ page }) => {
  const seoData = pageSEOData[page];
  
  if (!seoData) {
    console.warn(`SEO data not found for page: ${page}`);
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

export default PageSEO;
export { pageSEOData }; 