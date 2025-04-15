"use client";

import { Target, TelescopeIcon } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";

const AboutGoDigital = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="py-16 bg-[var(--light-bg)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full h-full aspect-square">
              <img
                src={logo}
                alt="GoDigital Agency"
                className="object-cover object-center w-full h-full"
              />
            </div>
          </div>

          {/* Right side - Cards */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Mission Card */}
            <div 
              className={`bg-[var(--background-light)] rounded-xl p-8 border-l-4 border-blue-500 transition-all duration-300 hover:translate-x-1 ${
                hoveredCard === 0 ? "transform scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Mobile-first approach for the card content */}
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Header section with icon and title for mobile */}
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-xl text-white">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-blue-500 sm:hidden">
                    Our Mission
                  </h3>
                </div>
                
                <div className="w-full">
                  {/* Title only visible on larger screens */}
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-blue-500 hidden sm:block">
                    Our Mission
                  </h3>
                  <p className="text-[var(--text-primary)]/70 text-lg w-full leading-relaxed mb-6 sm:ml-0 lg:ml-9">
                    Our digital marketing mission is to amplify creativity and innovation by showcasing the power of design. Through captivating visuals, thought-provoking content, and strategic storytelling, we strive to inspire businesses to elevate their brands. By leveraging our design expertise across web, graphics, and multimedia, we are dedicated to helping clients communicate their unique visions effectively.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div 
              className={`bg-[var(--background-light)] rounded-xl p-8 border-l-4 border-[var(--logo-bg)] transition-all duration-300 hover:translate-x-1 ${
                hoveredCard === 2 ? "transform scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Mobile-first approach for the card content */}
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Header section with icon and title for mobile */}
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-4 rounded-xl text-white">
                    <TelescopeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-blue-500 sm:hidden">
                    Our Vision
                  </h3>
                </div>
                
                <div className="w-full">
                  {/* Title only visible on larger screens */}
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-blue-500 hidden sm:block">
                    Our Vision
                  </h3>
                  <p className="text-[var(--text-primary)]/70 text-lg w-full leading-relaxed mb-6 sm:ml-0 lg:ml-9">
                    Our vision is to be the catalyst that transforms businesses into digital powerhouses. We envision a world where brands seamlessly connect with their audiences, where innovation drives success, and where every digital touch point reflects excellence. Through our unwavering commitment to creativity, data-driven strategies, and collaborative partnerships, we aim to redefine the boundaries of digital marketing and shape the future of online engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGoDigital;