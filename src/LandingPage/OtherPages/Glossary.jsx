"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Glossary() {
  // State to hold the current active filter and the terms that are visible
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [visibleTerms, setVisibleTerms] = useState([]);

  // Glossary data
  const glossaryTerms = [
    // Numbers
    {
      id: "200-status-code",
      term: "200 Status Code",
      definition: (
        <>
          <p>
            The HTTP 200 OK success status is by far the most common response. It indicates that the request for a web
            page was received, understood, and processed.
          </p>
        </>
      ),
      category: "Numbers",
    },
    {
      id: "301-status-code",
      term: "301 Status Code",
      definition: (
        <>
          <p>
            The HTTP 301 Moved Permanently status is used for permanent URL redirection. When you're doing a site migration
            or replacing an old page with a new one, a 301 redirect is necessary.
          </p>
        </>
      ),
      category: "Numbers",
    },
    {
      id: "403-status-code",
      term: "403 Status Code",
      definition: (
        <>
          <p>
            403 Forbidden means that accessing the page or resource is not allowed due to permission restrictions set by
            the server owner.
          </p>
        </>
      ),
      category: "Numbers",
    },
    {
      id: "404-status-code",
      term: "404 Status Code",
      definition: (
        <>
          <p>
            The 404 status code indicates that the page you are trying to reach could not be found on the server.
          </p>
        </>
      ),
      category: "Numbers",
    },
    {
      id: "500-status-code",
      term: "500 Status Code",
      definition: (
        <>
          <p>
            The 500 Internal Server Error indicates that the server encountered an unexpected condition that prevented
            it from fulfilling the request.
          </p>
        </>
      ),
      category: "Numbers",
    },
    // A
    {
      id: "ahrefs",
      term: "Ahrefs",
      definition: (
        <>
          <p>
            Ahrefs is a suite of digital marketing tools used for website audits, backlink analysis, and tracking URL rankings.
          </p>
        </>
      ),
      category: "A",
    },
    {
      id: "amp",
      term: "AMP (Accelerated Mobile Pages)",
      definition: (
        <>
          <p>
            AMP is a stripped-down form of HTML designed for ultra-fast loading on mobile devices. Major platforms like Google
            support AMP for a better mobile experience.
          </p>
        </>
      ),
      category: "A",
    },
    {
      id: "algorithm",
      term: "Algorithm",
      definition: (
        <>
          <p>
            An algorithm is a set of rules followed by search engines to rank web pages. Modern SEO techniques are based on these algorithms.
          </p>
        </>
      ),
      category: "A",
    },
    {
      id: "alt-text",
      term: "Alt Text (Alt Tag)",
      definition: (
        <>
          <p>
            Alt text provides a textual description of images in HTML, which is used for accessibility and SEO.
          </p>
        </>
      ),
      category: "A",
    },
    {
      id: "anchor-text",
      term: "Anchor Text",
      definition: (
        <>
          <p>
            Anchor text is the clickable text in a hyperlink. It is important for SEO and should accurately describe the link's destination.
          </p>
        </>
      ),
      category: "A",
    },
    // B
    {
      id: "backlink",
      term: "Backlink",
      definition: (
        <>
          <p>
            A backlink is created when one website links to another. It is a critical ranking factor in SEO, signaling trust and authority.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "bing",
      term: "Bing",
      definition: (
        <>
          <p>
            Bing is Microsoft's search engine and is the second most popular search engine after Google.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "black-hat-seo",
      term: "Black Hat SEO",
      definition: (
        <>
          <p>
            Black Hat SEO refers to unethical SEO practices that violate search engine guidelines, often resulting in penalties.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "blogography",
      term: "Blogography (SEO)",
      definition: (
        <>
          <p>
            Blogography involves publishing blogs to provide valuable content while also generating quality backlinks.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "bots",
      term: "Bots",
      definition: (
        <>
          <p>
            Bots (or spiders) are automated programs that crawl the internet to index content for search engines.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "bounce-rate",
      term: "Bounce Rate",
      definition: (
        <>
          <p>
            Bounce rate is the percentage of visitors who leave a site after viewing only one page, indicating user engagement.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "branded-keywords",
      term: "Branded Keywords",
      definition: (
        <>
          <p>
            Branded keywords are search phrases that include a company's name, helping to capture brand-specific traffic.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "breadcrumbs",
      term: "Breadcrumbs",
      definition: (
        <>
          <p>
            Breadcrumbs are navigational aids that help users and search engines understand a website's structure.
          </p>
        </>
      ),
      category: "B",
    },
    {
      id: "broken-link",
      term: "Broken Link",
      definition: (
        <>
          <p>
            A broken link leads to a 404 error and indicates that a page has been moved or deleted.
          </p>
        </>
      ),
      category: "B",
    },
    // C
    {
      id: "canonical-url",
      term: 'Canonical URL (rel="canonical")',
      definition: (
        <>
          <p>
            A canonical URL is the preferred version of a web page that helps avoid duplicate content issues.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "cache",
      term: "Cache",
      definition: (
        <>
          <p>
            A cache is a stored snapshot of a web page that speeds up loading times and improves user experience.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "ccTLD",
      term: "Country Code Top-Level Domain (ccTLD)",
      definition: (
        <>
          <p>
            A ccTLD is a domain extension reserved for a specific country (e.g., .sg for Singapore).
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "ctr",
      term: "Click-Through Rate (CTR)",
      definition: (
        <>
          <p>
            CTR is the ratio of users who click on a link to the total number of users who view the link.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "cloaking",
      term: "Cloaking",
      definition: (
        <>
          <p>
            Cloaking is a black hat SEO technique where content presented to search engines is different from that shown to users.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "citation",
      term: "Citation",
      definition: (
        <>
          <p>
            A citation is a reference to a business's name, address, and phone number (NAP), often used for local SEO.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "cdn",
      term: "Content Delivery Network (CDN)",
      definition: (
        <>
          <p>
            A CDN is a network of servers used to distribute content to users based on their geographic location, reducing latency.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "content-marketing",
      term: "Content Marketing",
      definition: (
        <>
          <p>
            Content marketing involves creating valuable content to attract and engage an audience while boosting SEO.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "conversion",
      term: "Conversion",
      definition: (
        <>
          <p>
            A conversion occurs when a user completes a desired action on a website, such as subscribing or purchasing.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "conversion-rate",
      term: "Conversion Rate",
      definition: (
        <>
          <p>
            The conversion rate is the percentage of website visitors who complete a desired action, indicating website performance.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "crawl",
      term: "Crawl",
      definition: (
        <>
          <p>
            Crawling is the process by which search engine bots scan websites to index their content.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "cross-linking",
      term: "Cross-Linking",
      definition: (
        <>
          <p>
            Cross-linking is linking between two websites to provide additional context and improve SEO.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "curated-content",
      term: "Curated Content",
      definition: (
        <>
          <p>
            Curated content involves gathering and presenting information relevant to a specific topic or audience.
          </p>
        </>
      ),
      category: "C",
    },
    {
      id: "css",
      term: "CSS – Cascading Style Sheets",
      definition: (
        <>
          <p>
            CSS is a language used to style HTML elements, controlling fonts, colors, layout, and overall presentation.
          </p>
        </>
      ),
      category: "C",
    },
    // D
    {
      id: "de-indexed",
      term: "De-Indexed",
      definition: (
        <>
          <p>
            When a website is de-indexed, it is removed from search engine results, often due to policy violations.
          </p>
        </>
      ),
      category: "D",
    },
    {
      id: "disavow",
      term: "Disavow",
      definition: (
        <>
          <p>
            Disavowing links is a process to notify search engines not to consider certain backlinks when ranking a website.
          </p>
        </>
      ),
      category: "D",
    },
    {
      id: "dofollow",
      term: "Dofollow",
      definition: (
        <>
          <p>
            Dofollow links allow search engines to follow them and count as backlinks for SEO.
          </p>
        </>
      ),
      category: "D",
    },
    {
      id: "doorway-page",
      term: "Doorway Page",
      definition: (
        <>
          <p>
            Doorway pages are created solely to rank for specific keywords, often leading to a single destination; a practice frowned upon in SEO.
          </p>
        </>
      ),
      category: "D",
    },
    {
      id: "domain-authority",
      term: "Domain Authority (DA)",
      definition: (
        <>
          <p>
            Domain Authority is a metric (scored from 1 to 100) used to predict how well a website will rank on search engine results pages.
          </p>
        </>
      ),
      category: "D",
    },
        {
          "id": "e-a-t",
          "term": "E-A-T (Expertise, Authoritativeness, Trustworthiness)",
          "definition": "E-A-T is used by search engines like Google to measure the quality of a web page and the content it provides. While not an official ranking factor, E-A-T heavily influences how search engines evaluate content, especially for Your Money or Your Life (YMYL) topics. Websites demonstrating strong E-A-T are more likely to rank higher in search results.",
          "category": "E"
        },
        {
          "id": "edge-seo",
          "term": "Edge SEO",
          "definition": "Edge SEO is a practice that uses CDN-based approaches to run code at the network’s edge. This method allows near-instant changes to a site’s content or structure without requiring server-level updates, often improving site speed and user experience—both beneficial for SEO.",
          "category": "E"
        },
        {
          "id": "entity",
          "term": "Entity",
          "definition": "In SEO, an entity is a concept or object (e.g., a person, place, thing, or idea) recognized by search engines as distinct and unique. Entities help search engines better understand relationships and context between pieces of information, improving relevance and accuracy in search results.",
          "category": "E"
        },
        {
          "id": "evergreen-content",
          "term": "Evergreen Content",
          "definition": "Evergreen content remains relevant and valuable over time, rather than expiring or becoming outdated. It consistently drives traffic, engagement, and can significantly improve a site’s SEO by providing long-term value to readers.",
          "category": "E"
        },
        {
          "id": "exact-match-anchor-text",
          "term": "Exact Match Anchor Text",
          "definition": "Exact match anchor text is when the clickable text of a hyperlink matches exactly the target keyword. While useful for signaling relevance, overusing exact match anchors can appear manipulative to search engines and potentially lead to ranking penalties.",
          "category": "E"
        },
        {
          "id": "external-link",
          "term": "External Link",
          "definition": "An external link is a hyperlink that points from one domain to another. Linking out to authoritative, reputable sites can lend credibility and context to your content, but it’s crucial to link responsibly to maintain user trust and SEO value.",
          "category": "E"
        },
        {
          "id": "exit-rate",
          "term": "Exit Rate",
          "definition": "Exit rate is the percentage of visitors who leave a website from a particular page, regardless of how many pages they visited beforehand. A high exit rate might indicate issues with that page’s content, layout, or user experience.",
          "category": "E"
        },
    
            {
              "id": "featured-snippet",
              "term": "Featured Snippet",
              "definition": "A featured snippet is a highlighted excerpt of text that appears at the top of Google’s search results, often in a box, providing a direct answer to a user’s query.",
              "category": "F"
            },
            {
              "id": "funnel",
              "term": "Funnel",
              "definition": "A marketing funnel illustrates the journey users take from initial awareness to conversion or purchase. SEO strategies often focus on attracting top-of-funnel traffic and nurturing users toward conversion.",
              "category": "F"
            },
            {
              "id": "google-analytics",
              "term": "Google Analytics",
              "definition": "Google Analytics is a free web analytics service that tracks and reports website traffic, user behavior, and other valuable metrics to help optimize marketing strategies.",
              "category": "G"
            },
            {
              "id": "google-my-business",
              "term": "Google My Business (GMB)",
              "definition": "GMB is a free tool allowing businesses to manage their online presence across Google, including Search and Maps, crucial for local SEO and visibility.",
              "category": "G"
            },
            {
              "id": "heading-tags",
              "term": "Heading Tags (H1–H6)",
              "definition": "Heading tags structure the content of a webpage, from H1 (main title) to H6 (subheadings). Proper use of heading tags can improve SEO and readability.",
              "category": "H"
            },
            {
              "id": "hreflang",
              "term": "Hreflang",
              "definition": "Hreflang is an HTML attribute that indicates the language and intended audience of a webpage, helping search engines serve the correct regional or language version.",
              "category": "H"
            },
            {
              "id": "indexed",
              "term": "Indexed",
              "definition": "Indexed refers to a page or site that search engines have crawled and stored, making it eligible to appear in search results.",
              "category": "I"
            },
            {
              "id": "inbound-links",
              "term": "Inbound Links",
              "definition": "Inbound links (or backlinks) are external links pointing to your website, signaling trust and authority to search engines.",
              "category": "I"
            },
            {
              "id": "javascript-seo",
              "term": "JavaScript SEO",
              "definition": "JavaScript SEO focuses on ensuring that dynamically rendered or client-side JavaScript content is discoverable and indexable by search engines.",
              "category": "J"
            },
            {
              "id": "keyword",
              "term": "Keyword",
              "definition": "A keyword is a term or phrase that users type into a search engine, used by SEOs to optimize site content for higher visibility.",
              "category": "K"
            },
            {
              "id": "keyword-stuffing",
              "term": "Keyword Stuffing",
              "definition": "Keyword stuffing is an outdated, black hat SEO technique where keywords are overused in content, often resulting in ranking penalties.",
              "category": "K"
            },
            {
              "id": "landing-page",
              "term": "Landing Page",
              "definition": "A landing page is a standalone web page created specifically for a marketing or advertising campaign, designed to convert visitors.",
              "category": "L"
            },
            {
              "id": "link-building",
              "term": "Link Building",
              "definition": "Link building is the process of acquiring quality inbound links to improve a website’s authority and ranking in search engines.",
              "category": "L"
            },
            {
              "id": "meta-description",
              "term": "Meta Description",
              "definition": "A meta description is a brief HTML attribute providing a summary of a page’s content, displayed in search engine results.",
              "category": "M"
            },
            {
              "id": "mobile-first-index",
              "term": "Mobile-First Index",
              "definition": "Google’s mobile-first index primarily uses the mobile version of content for indexing and ranking, reflecting the shift to mobile browsing.",
              "category": "M"
            },
            {
              "id": "noindex",
              "term": "Noindex",
              "definition": "Noindex is a meta directive or HTTP header that instructs search engines not to index a specific page in their search results.",
              "category": "N"
            },
            {
              "id": "nofollow",
              "term": "Nofollow",
              "definition": "Nofollow is an HTML attribute signaling search engines not to follow a link, preventing link equity from passing to the destination URL.",
              "category": "N"
            },
            {
              "id": "organic-traffic",
              "term": "Organic Traffic",
              "definition": "Organic traffic refers to visitors who land on your site by clicking non-paid search engine results.",
              "category": "O"
            },
            {
              "id": "page-speed",
              "term": "Page Speed",
              "definition": "Page speed is how quickly a page loads. Faster pages often rank higher and improve user satisfaction.",
              "category": "P"
            },
            {
              "id": "penalty",
              "term": "Penalty",
              "definition": "A penalty is a punitive action by a search engine, usually for violating guidelines. This often leads to reduced rankings or removal from search results.",
              "category": "P"
            },
            {
              "id": "query",
              "term": "Query",
              "definition": "A query is the term or phrase users type into a search engine to find information, products, or services.",
              "category": "Q"
            },
            {
              "id": "ranking-factors",
              "term": "Ranking Factors",
              "definition": "Ranking factors are criteria used by search engines to evaluate and rank web pages, such as relevance, authority, and user experience.",
              "category": "R"
            },
            {
              "id": "robots-txt",
              "term": "Robots.txt",
              "definition": "Robots.txt is a file instructing search engine crawlers on which pages or files they can or cannot request from your site.",
              "category": "R"
            },
            {
              "id": "schema-markup",
              "term": "Schema Markup",
              "definition": "Schema markup is code that helps search engines better understand your content, potentially resulting in rich snippets and improved visibility.",
              "category": "S"
            },
            {
              "id": "sitemap",
              "term": "Sitemap",
              "definition": "A sitemap is a file that lists a website’s pages, helping search engines discover and index content more effectively.",
              "category": "S"
            },
            {
              "id": "social-signals",
              "term": "Social Signals",
              "definition": "Social signals (likes, shares, comments) can hint at a page’s popularity, indirectly influencing search engine rankings.",
              "category": "S"
            },
            {
              "id": "title-tag",
              "term": "Title Tag",
              "definition": "A title tag is an HTML element specifying the title of a web page, important for both SEO and user click-through rates.",
              "category": "T"
            },
            {
              "id": "traffic",
              "term": "Traffic",
              "definition": "Traffic is the volume of visitors a website receives. Tracking traffic sources helps refine SEO and marketing strategies.",
              "category": "T"
            },
            {
              "id": "utm-parameters",
              "term": "UTM Parameters",
              "definition": "UTM parameters are tags added to a URL to track marketing campaigns, telling analytics tools where traffic originates.",
              "category": "U"
            },
            {
              "id": "voice-search",
              "term": "Voice Search",
              "definition": "Voice search allows users to speak queries rather than typing, impacting SEO strategies to target more conversational keywords.",
              "category": "V"
            },
            {
              "id": "web-vitals",
              "term": "Web Vitals",
              "definition": "Core Web Vitals are performance metrics Google deems important for user experience, such as loading speed, interactivity, and visual stability.",
              "category": "W"
            },
            {
              "id": "xml-sitemap",
              "term": "XML Sitemap",
              "definition": "An XML sitemap is a structured list of a site’s URLs, helping search engines discover and index content more efficiently.",
              "category": "X"
            },
            {
              "id": "yandex",
              "term": "Yandex",
              "definition": "Yandex is Russia’s largest search engine, holding a significant market share in that region, with its own ranking algorithms.",
              "category": "Y"
            },
            {
              "id": "zero-click-search",
              "term": "Zero-Click Search",
              "definition": "A zero-click search is when users get an immediate answer on the SERP, so they do not click further to a website, often due to featured snippets or knowledge panels.",
              "category": "Z"
            }
          
          
    
      
  ];

  // Available categories: "ALL", "Numbers", and letters A to Z.
  const allCategories = ["ALL", "Numbers", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  useEffect(() => {
    if (activeFilter === "ALL") {
      setVisibleTerms(glossaryTerms);
    } else {
      setVisibleTerms(glossaryTerms.filter((term) => term.category === activeFilter));
    }
  }, [activeFilter]);

  // Group terms by category
  const groupedTerms = {};
  visibleTerms.forEach((term) => {
    const category = term.category || "Other";
    if (!groupedTerms[category]) {
      groupedTerms[category] = [];
    }
    groupedTerms[category].push(term);
  });

  return (
    <div className=" mx-auto px-4 py-28 bg-gradient-to-b from-slate-900 via-[var(--background)] to-slate-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Glossary</h1>

      {/* Alphabet Navigation */}
      <div className="mb-8 border-t border-b py-4 flex flex-wrap items-center bg-slate-800">
        {allCategories.map((letter) => (
          <button
            key={letter}
            onClick={() => setActiveFilter(letter)}
            className={`px-2 py-1 mx-1 text-sm font-medium rounded ${
              activeFilter === letter ? "bg-purple-700 text-white" : "text-amber-700 hover:bg-purple-100"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Display Terms */}
      {Object.keys(groupedTerms).length > 0 ? (
        Object.entries(groupedTerms).map(([category, terms]) => (
          <div key={category} className="mb-10">
            <div className="bg-purple-700 text-white py-2 px-4 mb-4">
              <h2 className="text-xl font-bold">{category}</h2>
            </div>
            <div className="space-y-6">
              {terms.map((term) => (
                <div key={term.id} className="border-b pb-4" id={term.id}>
                  <h3 className="text-lg font-bold text-white mb-2">{term.term}</h3>
                  <div className="text-gray-300">{term.definition}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 text-gray-500">No terms found for this filter.</div>
      )}

    </div>
  );
}

function getPriorityColor(priority) {
  if (priority >= 0.9) return "bg-green-500"; // High priority
  if (priority >= 0.7) return "bg-yellow-500"; // Medium priority
  return "bg-gray-400"; // Low priority
}
