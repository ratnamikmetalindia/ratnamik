"use client"
import React, { useEffect, useRef, useState } from 'react';

// --- Reusable Animated Fade-Up Wrapper ---
const FadeUpSection = ({ children, delay = 0, isVisible }) => (
  <div
    className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const features = [
    {
      num: "01",
      title: "Global Standards",
      description: "We strictly adhere to international codes and specifications, ensuring flawless execution and absolute reliability across borders.",
    },
    {
      num: "02",
      title: "Decades of Expertise",
      description: "With over 40 years of pioneering experience, our deep industry knowledge translates directly into superior product quality.",
    },
    {
      num: "03",
      title: "Custom Engineering",
      description: "Delivering bespoke, precision-engineered metal solutions perfectly tailored to meet your most complex industrial demands.",
    },
    {
      num: "04",
      title: "Uncompromising Quality",
      description: "Rigorous testing protocols and ISO-certified processes guarantee durability, performance, and long-term value.",
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmerLine {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(300%); }
          }
          .animate-shimmer-line {
            animation: shimmerLine 2.5s infinite linear;
          }
        `
      }} />

      {/* 
        Section Layout: 
        - Background: Primary Blue (#06367b)
        - Height: min-h-[70vh] to ensure a massive, immersive presence
      */}
      <section 
        ref={sectionRef} 
        className="relative bg-[#075ca6] min-h-[70vh] py-20 md:py-32 px-4 md:px-[8%] w-full flex items-center overflow-hidden z-0"
      >
        
        {/* Abstract Ambient Glows for Premium Depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#075ca6] rounded-full blur-[150px] opacity-40 pointer-events-none -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EC4FF] rounded-full blur-[150px] opacity-10 pointer-events-none -z-10 transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
          
          {/* --- Left Column: Sticky Typography --- */}
          <div className="w-full lg:w-[40%] flex flex-col items-start lg:sticky lg:top-32 h-fit">
            <FadeUpSection isVisible={isVisible} delay={0}>
              
              {/* Subtle Tagline */}
              <p className="text-[#2EC4FF] font-semibold tracking-widest uppercase text-sm mb-4">
                The Ratnamik Advantage
              </p>

              {/* Main Heading -> Light Background (#fdfdfd) */}
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#fdfdfd] leading-[1.1] mb-8 tracking-tight">
                Why Choose<br />Our Solutions.
              </h2>
              
              {/* Premium Animated Shine Line */}
              {/* Base -> Secondary Blue (#075ca6), Shine -> Accent Glow Blue (#2EC4FF) */}
              <div 
                className={`relative h-1.5 bg-[#075ca6] rounded-full overflow-hidden mb-10 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? 'w-24 md:w-32 delay-[200ms]' : 'w-0'
                }`}
              >
                <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
              </div>

              {/* Description -> Soft Section BG (#EAF4FF) with opacity */}
              <p className="text-[#EAF4FF]/80 text-base md:text-[18px] leading-[1.9] tracking-[0.02em] max-w-md">
                We don't just supply metal products; we forge lasting partnerships. Our commitment to integrity, precision, and relentless innovation ensures your projects are built on the strongest possible foundation.
              </p>

            </FadeUpSection>
          </div>

          {/* --- Right Column: Interactive Luxury Rows --- */}
          <div className="w-full lg:w-[60%] flex flex-col">
            {/* Top Border for the list */}
            <div className="w-full h-[1px] bg-[#075ca6]/40"></div>

            {features.map((feature, index) => (
              <FadeUpSection 
                key={index} 
                isVisible={isVisible} 
                delay={(index + 1) * 150} // Staggered delay for each row
              >
                {/* 
                  Interactive Row:
                  Default border -> Secondary Blue with opacity
                  Hover -> Cyan line draws across the bottom
                */}
                <div className="group relative w-full py-8 md:py-10 border-b border-[#075ca6]/40 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center cursor-pointer transition-colors duration-500 hover:bg-[#075ca6]/10 px-4 md:px-8 -mx-4 md:-mx-8 rounded-lg overflow-hidden">
                  
                  {/* The Interactive Bottom Line that draws on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-[#2EC4FF] w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>

                  {/* Number Indicator -> Accent Glow Blue (#2EC4FF) */}
                  <span className="text-[#2EC4FF] font-medium text-lg md:text-xl tracking-widest shrink-0 w-12 transition-transform duration-500 group-hover:-translate-y-1">
                    {feature.num}.
                  </span>
                  
                  {/* Content Container (Shifts right on hover) */}
                  <div className="flex-1 transform transition-transform duration-500 group-hover:translate-x-3">
                    <h3 className="text-2xl md:text-[28px] font-bold text-[#fdfdfd] mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[#EAF4FF]/70 text-base md:text-[17px] leading-[1.8] tracking-[0.02em]">
                      {feature.description}
                    </p>
                  </div>

                  {/* Interaction Arrow */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-[#075ca6] group-hover:border-[#2EC4FF] group-hover:bg-[#2EC4FF] transition-all duration-500 shrink-0">
                    <svg 
                      className="w-5 h-5 text-[#EAF4FF] group-hover:text-[#06367b] transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>

                </div>
              </FadeUpSection>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default WhyChooseUs;