"use client";

import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminPrivateRoute from "./Utils/AdminPrivateRoute.jsx";
import "./root.css";



import { AgentAuthProvider } from "./ChatInterface/Auth/AgentAuthContext";

const AdminDashboard = lazy(() => import("./AdminDashboard/Components/AdminDashboard"));
const RegisterAdmin = lazy(() => import("./AdminDashboard/Auth/RegisterAdmin"));
const Login = lazy(() => import("./AdminDashboard/Auth/Login"));
const ForgotPassword = lazy(() => import("./AdminDashboard/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import('./AdminDashboard/Auth/ForgotPassword').then(module => ({ default: module.ResetPassword })));
const AddBlog = lazy(() => import("./AdminDashboard/Pages/AddBlog"));
const AdminSubscribers = lazy(() => import("./AdminDashboard/Pages/Subscribers.jsx"));
const AdminReviews = lazy(() => import("./AdminDashboard/Pages/Reviews.jsx"));
const AdminNews = lazy(() => import("./AdminDashboard/Pages/News.jsx"));
const AdminCareers = lazy(() => import("./AdminDashboard/Pages/Careers.jsx"));
const AdminAwards = lazy(() => import("./AdminDashboard/Pages/Awards.jsx"));
const DashboardPage = lazy(() => import("./AdminDashboard/Pages/DashboardPage"));
const SettingsPage = lazy(() => import("./AdminDashboard/Pages/Settings/SettingsPage.jsx"));
const Consultations = lazy(() => import("./AdminDashboard/Pages/Consultations"));
const Logout = lazy(() => import("./AdminDashboard/Pages/Logout"));
const Messages = lazy(() => import("./AdminDashboard/Pages/Messages"));
const Proposal = lazy(() => import("./AdminDashboard/Pages/Proposals"));
const CaseStudies = lazy(() => import("./AdminDashboard/Pages/CaseStudies.jsx"));
const CareerApplications = lazy(() => import("./AdminDashboard/Pages/CareerApplications.jsx"));
const TeamManagement = lazy(() => import("./AdminDashboard/Pages/TeamManagement.jsx"));
const NewsLetterAdmin = lazy(() => import("./AdminDashboard/Pages/NewsLetter/NewsLetterAdmin.jsx"));
const AgentDashboard = lazy(() => import("./AdminDashboard/Components/AgentDashboard.jsx"));
const AgentAdminLogin = lazy(() => import("./ChatInterface/Auth/AdminLogin.jsx"));

// Chat interface components
const ApiKeyForm = lazy(() => import("./ChatInterface/Components/ApiKeyForm"));
const AgentLogin = lazy(() => import("./ChatInterface/Auth/AgentLogin"));
const AgentRegister = lazy(() => import("./ChatInterface/Auth/AgentRegister"));
const Agent = lazy(() => import("./ChatInterface/App/Agent.jsx"));
const AgentRoute = lazy(() => import("./ChatInterface/Auth/AgentRoute"));


import Employee from "./EmployeeManagement/employee-management.jsx";

// Core components that should load eagerly (navbar, footer, utilities)
import Navbar from "./LandingPage/Components/Navbar";
import Footer from "./LandingPage/Components/Footer";
import WhatsappIcon from "./Utils/WhatsAppIcon";
import CookieConsent from "./Utils/CookieConsent";
import AnalyticsProvider from "./Utils/AppComponent";
import Ai from "./LandingPage/Pages/Ai";

// Lazy load all other components
// Landing page components
const Home = lazy(() => import("./LandingPage/Pages/Home.jsx"));
const GetInTouch = lazy(() => import("./LandingPage/Pages/GetInTouch.jsx"));
const CTASection = lazy(() => import("./LandingPage/Pages/CTASection.jsx"));
const MarketingServices = lazy(() => import("./LandingPage/Pages/MarketingServices.jsx"));
const WhyUsSection = lazy(() => import("./LandingPage/Pages/WhyUsSection.jsx"));
const ClientReviews = lazy(() => import("./LandingPage/Pages/ClientReviews.jsx"));
const About = lazy(() => import("./LandingPage/OtherPages/About.jsx"));
const AboutGoDigital = lazy(() => import("./LandingPage/Pages/AboutGoDigital.jsx"));
const Pricing = lazy(() => import("./LandingPage/Pages/Pricing.jsx"));
const AiAssistant = lazy(() => import("./LandingPage/Pages/AiAssistant.jsx"));

// Other pages
const News = lazy(() => import("./LandingPage/OtherPages/News.jsx"));
const Careers = lazy(() => import("./LandingPage/OtherPages/Career.jsx"));
const Awards = lazy(() => import("./LandingPage/OtherPages/Awards.jsx"));
const OurTeam = lazy(() => import("./LandingPage/OtherPages/org-chart.jsx"));
const Partners = lazy(() => import("./LandingPage/OtherPages/Partners.jsx"));
const Blog = lazy(() => import("./LandingPage/OtherPages/Blog.jsx"));
const ContactUs = lazy(() => import("./LandingPage/OtherPages/ContactUs.jsx"));
const PartnershipsSection = lazy(() => import("./LandingPage/OtherPages/PartnershipSection.jsx"));
const PortfolioOverview = lazy(() => import("./LandingPage/OtherPages/PortfolioOverview.jsx"));
const JoinTheMovement = lazy(() => import("./LandingPage/OtherPages/JoinTheMovement.jsx"));
const MadeBy = lazy(() => import("./Utils/MadeBy.jsx"));
const PrivacyPolicy = lazy(() => import("./LandingPage/OtherPages/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./LandingPage/OtherPages/TermsAndConditions.jsx"));
const Sitemap = lazy(() => import("./LandingPage/OtherPages/SiteMap.jsx"));
const Glossary = lazy(() => import("./LandingPage/OtherPages/Glossary.jsx"));
const PartnershipSection = lazy(() => import("./LandingPage/OtherPages/Partnerships-Section.jsx"));
const CaseStudiesList = lazy(() => import("./LandingPage/OtherPages/CaseStudy/CaseStudiesList.jsx"));
const CaseStudyDetail = lazy(() => import("./LandingPage/OtherPages/CaseStudy/CaseStudyDetail.jsx"));
const ProposalRequest = lazy(() => import("./LandingPage/OtherPages/ProposalRequest.jsx"));

// Services
const PaidSocial = lazy(() => import("./LandingPage/OtherPages/Services/PaidSocial.jsx"));
const SocialMediaManagement = lazy(() => import("./LandingPage/OtherPages/Services/SocialMediaManagement.jsx"));
const LinkedInAds = lazy(() => import("./LandingPage/OtherPages/Services/LinkedInAds.jsx"));
const EcommerceDesign = lazy(() => import("./LandingPage/OtherPages/Services/EcommerceDesign.jsx"));
const SoftwareDevelopment = lazy(() => import("./LandingPage/OtherPages/Services/SoftwareDevelopment.jsx"));
const SEOServices = lazy(() => import("./LandingPage/OtherPages/Services/SEO.jsx"));
const SocialMediaMarketing = lazy(() => import("./LandingPage/OtherPages/Services/SocialMediaMarketing.jsx"));
const ContentMarketing = lazy(() => import("./LandingPage/OtherPages/Services/ContentMarketing.jsx"));
const GoogleAds = lazy(() => import("./LandingPage/OtherPages/Services/GoogleAds.jsx"));
const SocialPlatformMarket = lazy(() => import("./LandingPage/OtherPages/Services/SocialPlatformMarketing.jsx"));
const SEO = lazy(() => import("./LandingPage/OtherPages/Services/SEO.jsx"));
const CopyWriting = lazy(() => import("./LandingPage/OtherPages/Services/CopyWriting.jsx"));
const GoogleDisplayNetwork = lazy(() => import("./LandingPage/OtherPages/Services/GoogleDisplayNetwork.jsx"));
const GoogleShopping = lazy(() => import("./LandingPage/OtherPages/Services/GoogleShopping.jsx"));
const InfluencerMarketing = lazy(() => import("./LandingPage/OtherPages/Services/InfluencerMarketing.jsx"));
const LocalSEO = lazy(() => import("./LandingPage/OtherPages/Services/LocalSeo.jsx"));
const TechnicalSEO = lazy(() => import("./LandingPage/OtherPages/Services/TechnicalSeo.jsx"));
const YouTubeAds = lazy(() => import("./LandingPage/OtherPages/Services/YouTubeAds.jsx"));
const SERM = lazy(() => import("./LandingPage/OtherPages/Services/SERM.jsx"));
const SeoReferalProgram = lazy(() => import("./LandingPage/OtherPages/Services/SeoReferalProgram.jsx"));
const InternalSEO = lazy(() => import("./LandingPage/OtherPages/Services/InternalSeo.jsx"));
const SEM = lazy(() => import("./LandingPage/OtherPages/Services/SEM.jsx"));
const CorporateWebDev = lazy(() => import("./LandingPage/OtherPages/Services/CoporateWebDev.jsx"));
const LandingPageDev = lazy(() => import("./LandingPage/OtherPages/Services/LandingPageDev.jsx"));
const WebsiteMaintenance = lazy(() => import("./LandingPage/OtherPages/Services/WebsiteMaintainance.jsx"));
const SocialMediaContent = lazy(() => import("./LandingPage/OtherPages/Services/SocialMediaContent.jsx"));

// Chat interface components
const Page = lazy(() => import("./ChatInterface/App/Page"));

// Newsletter unsubscribe component
import Unsubscribe from "./Utils/NewsletterUnsubscribe";

import spinner from "./assets/spinner/1600x1200-spinner-sm.gif"

// Loading component to display while lazy components are loading
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background:'white',
  }}>
    {/* <div style={{
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style> */}
    <img src={spinner} alt="spinner" className="h-50 w-80 sm:h-25 sm:w-40" />
  </div>
);

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Group homepage components for code organization
const Homepage = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Home />
    <WhyUsSection />
    {/* <AboutGoDigital /> */}
    <CTASection />
    <MarketingServices />
    <ClientReviews />
    {/* <Pricing /> */}
    <AiAssistant />
    {/* <GetInTouch /> */}
  </Suspense>
);

function AppContent() {
  const location = useLocation();
  // Hide header, footer, WhatsApp, and AI when on /chat, /admin, /agent, or /unsubscribe pages.
  const hideLayout =
    location.pathname === "/chat" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/agent") ||
    location.pathname === "/unsubscribe" ||
    location.pathname === "/made-by";

  return (
    <>
      {/* Render utilities only if layout is not hidden */}
      {!hideLayout && (
        <>
        <WhatsappIcon className="hidden lg:block" />
          {/* <CookieConsent /> */}
        </>
      )}

      {/* Scroll to top on navigation */}
      <ScrollToTop />

      {/* Show Navbar & AI only if not hidden */}
      {!hideLayout && <Navbar />}
      {!hideLayout && <Ai />}

      <AnalyticsProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <AgentAuthProvider>
            <Routes>
              {/* Landing page routes */}
              <Route path="/" element={<Homepage />} />
              {/* Service Routes */}
              <Route path="/services/software-development" element={<SoftwareDevelopment />} />
              <Route path="/services/seo" element={<SEOServices />} />
              <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
              <Route path="/services/paid-social" element={<PaidSocial />} />
              <Route path="/services/social-media-management" element={<SocialMediaManagement />} />
              <Route path="/services/linkedin-ads" element={<LinkedInAds />} />
              <Route path="/services/ecommerce-design" element={<EcommerceDesign />} />
              <Route path="/services/content-marketing" element={<ContentMarketing />} />
              <Route path="/services/google-ads" element={<GoogleAds />} />
              <Route path="/services/sem" element={<SEM />} />
              <Route path="/services/google-shopping" element={<GoogleShopping />} />
              <Route path="/services/google-display-network" element={<GoogleDisplayNetwork />} />
              <Route path="/services/youtube-ads" element={<YouTubeAds />} />
              <Route path="/made-by" element={<MadeBy />} />
              <Route path="/services/serm" element={<SERM />} />
              {/* <Route path="/services/seo-referral" element={<SeoReferalProgram />} /> */}
              <Route path="/services/internal-seo" element={<InternalSEO />} />
              <Route path="/services/local-seo" element={<LocalSEO />} />
              <Route path="/services/technical-seo" element={<TechnicalSEO />} />
              <Route path="/services/copywriting" element={<CopyWriting />} />
              <Route path="/services/influencer-marketing" element={<InfluencerMarketing />} />
              <Route path="/services/corporate-website" element={<CorporateWebDev />} />
              <Route path="/services/landing-page" element={<LandingPageDev />} />
              <Route path="/services/website-maintenance" element={<WebsiteMaintenance />} />
              <Route path="/services/social-media-content" element={<SocialMediaContent />} />
              <Route path="/services/social-platform-marketing" element={<SocialPlatformMarket />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/projects" element={<PartnershipsSection />} />
              <Route path="/work/portfolio" element={<PortfolioOverview />} />
              <Route path="/work/case-study" element={<CaseStudiesList />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />

              {/* About sub Routes */}
              <Route path="/agency/about-Us" element={<About />} />
              <Route path="/agency/our-team" element={<OurTeam />} />
              <Route path="/agency/partners" element={<Partners />} />
              <Route path="/agency/news" element={<News />} />
              <Route path="/agency/careers" element={<Careers />} />
              <Route path="/agency/awards" element={<Awards />} />
              <Route path="/proposal-request" element={<ProposalRequest />} />
              <Route path="/join-the-movement" element={<JoinTheMovement />} />
              <Route path="/reviews" element={<ClientReviews />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/partnerships" element={<PartnershipSection />} />

              {/* Chat interface routes */}
              <Route path="/chat" element={<Page />} />

              {/* Newsletter Unsubscribe route */}
              <Route path="/unsubscribe" element={<Unsubscribe />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminPrivateRoute />}>
                <Route element={<AdminDashboard />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="blog" element={<AddBlog />} />
                  <Route path="subscribers" element={<AdminSubscribers />} />
                  <Route path="reviews" element={<AdminReviews />} />
                  <Route path="news" element={<AdminNews />} />
                  <Route path="careers" element={<AdminCareers />} />
                  <Route path="awards" element={<AdminAwards />} />
                  <Route path="proposals" element={<Proposal />} />
                  <Route path="consultations" element={<Consultations />} />
                  <Route path="admins" element={<RegisterAdmin />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="team" element={<TeamManagement />} />
                  <Route path="newsletter" element={<NewsLetterAdmin />} />
                  <Route path="agent" element={<AgentDashboard />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="case-studies" element={<CaseStudies />} />
                  <Route path="applications" element={<CareerApplications />} />
                  <Route path="logout" element={<Logout />} />
                  <Route path="agent-admin/login" element={<AgentAdminLogin />} />
                  <Route path="api-key" element={<ApiKeyForm />} />
                  <Route path="employee" element={<Employee />} />
                </Route>
              </Route>
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin/forgot-password/:uidb64/:token" element={<ResetPassword />} />
              
              {/* Agent routes */}
              <Route path="/agent" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AgentRoute>
                    <Agent />
                  </AgentRoute>
                </Suspense>
              } />
              <Route path="/agent-login" element={<AgentLogin />} />
            </Routes>
          </AgentAuthProvider>
        </Suspense>
      </AnalyticsProvider>

      {/* Show Footer only if not hidden */}
      {!hideLayout && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Router basename="/website">
      <AppContent />
    </Router>
  );
}

export default AppRoutes;
