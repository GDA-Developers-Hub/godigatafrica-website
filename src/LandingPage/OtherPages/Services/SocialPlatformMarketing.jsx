import React from "react";
//import { Button } from "@/components/ui/button";
import { ServiceSEO } from "../../../SEO";

const SocialPlatformMarketing = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServiceSEO service="socialPlatformMarketing" />
      <section className="relative bg-[#0D0F21] text-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4A90E2] mb-6">
            Elevate Your Brand with Social Platform Marketing
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Harness the power of data-driven social media strategies to enhance engagement, build brand loyalty, and drive business growth. Our expertise ensures your message reaches the right audience with precision and impact.
          </p>
          <div className="mt-6">
            {/* <Button className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-6 py-3 rounded-lg font-semibold transition-all">
              Get Started
            </Button> */}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#4A90E2] mb-3">Targeted Advertising</h3>
            <p className="text-gray-400">Leverage advanced targeting tools to reach your ideal audience with precision, maximizing ROI and engagement.</p>
          </div>
          
          <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#4A90E2] mb-3">Content Optimization</h3>
            <p className="text-gray-400">Create compelling, high-converting content tailored to different platforms to enhance visibility and engagement.</p>
          </div>
          
          <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-[#4A90E2] mb-3">Analytics & Insights</h3>
            <p className="text-gray-400">Gain deep insights into audience behavior, refine marketing strategies, and optimize campaign performance.</p>
          </div>
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#4A90E2] text-center mb-8">Our Comprehensive Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#4A90E2] mb-3">Influencer Marketing</h3>
              <p className="text-gray-400">Partner with top influencers in your industry to enhance brand credibility and reach a wider audience.</p>
            </div>
            <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#4A90E2] mb-3">Social Media Management</h3>
              <p className="text-gray-400">Let us handle your social media presence, ensuring consistent branding, engagement, and growth.</p>
            </div>
            <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#4A90E2] mb-3">Paid Advertising Campaigns</h3>
              <p className="text-gray-400">Maximize ad spend with strategic campaigns across Facebook, Instagram, LinkedIn, and more.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4A90E2] mb-8">Client Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg">
              <p className="text-gray-400">"The best decision we made was working with this team. Our social media engagement skyrocketed!"</p>
              <h4 className="text-lg font-semibold text-[#4A90E2] mt-4">- Jane Doe, CEO</h4>
            </div>
            <div className="p-6 bg-[#1B1D36] rounded-lg shadow-lg">
              <p className="text-gray-400">"Their advertising strategies delivered exceptional ROI. Highly recommend!"</p>
              <h4 className="text-lg font-semibold text-[#4A90E2] mt-4">- John Smith, Marketing Head</h4>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SocialPlatformMarketing;
