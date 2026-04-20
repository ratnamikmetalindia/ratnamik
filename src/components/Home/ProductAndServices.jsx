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

// --- Custom Minimalist Industrial SVGs ---
const IconTubes = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const IconPipes = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v4H4z"></path>
    <path d="M4 16h16v4H4z"></path>
    <path d="M9 8v8"></path>
    <path d="M15 8v8"></path>
  </svg>
);

const IconProcessing = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const IconColdDrawing = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12H2"></path>
    <path d="M15 5l7 7-7 7"></path>
    <rect x="2" y="8" width="6" height="8"></rect>
  </svg>
);

const IconCustomSolutions = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v8"></path>
    <path d="M12 14v8"></path>
    <path d="M4.93 4.93l5.66 5.66"></path>
    <path d="M13.41 13.41l5.66 5.66"></path>
    <path d="M2 12h8"></path>
    <path d="M14 12h8"></path>
    <path d="M4.93 19.07l5.66-5.66"></path>
    <path d="M13.41 10.59l5.66-5.66"></path>
  </svg>
);

const IconQuality = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

function ProductAndServices() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null); // State to handle mobile click/tap
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const services = [
    {
      title: "Stainless Steel Tubes",
      description: "High-grade stainless steel tubes manufactured with precision for various industrial applications. Corrosion-resistant and durable for long-lasting performance.",
      Icon: IconTubes,
    },
    {
      title: "Carbon Steel Pipes",
      description: "Premium quality carbon steel pipes designed for strength and reliability. Perfect for structural applications and high-pressure systems.",
      Icon: IconPipes,
    },
    {
      title: "Alloy Steel Processing",
      description: "Specialized alloy steel products engineered for specific industrial requirements. Enhanced strength and performance characteristics.",
      Icon: IconProcessing,
    },
    {
      title: "Cold Drawing Process",
      description: "Advanced cold drawing techniques ensuring dimensional accuracy and superior surface finish for all our steel products.",
      Icon: IconColdDrawing,
    },
    {
      title: "Custom Solutions",
      description: "Tailored manufacturing solutions to meet specific client requirements. From design to delivery, we ensure precision and quality.",
      Icon: IconCustomSolutions,
    },
    {
      title: "Quality Assurance",
      description: "ISO 9001:2015 certified processes ensuring consistent quality and reliability. Comprehensive testing and quality control measures.",
      Icon: IconQuality,
    }
  ];

  // Handler for mobile taps
  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmerLine {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(300%); }
          }
          .animate-shimmer-line {
            animation: shimmerLine 2s infinite linear;
          }
        `
      }} />

      {/* Section Background -> Pure White (#ffffff) */}
      <section ref={sectionRef} className="bg-[#ffffff] py-24 md:py-32 px-4 md:px-[8%] w-full overflow-hidden">
        {/* Expanded container for larger cards */}
        <div className="max-w-[1536px] mx-auto">
          
          {/* Header Section */}
          <FadeUpSection isVisible={isVisible} delay={0}>
            <div className="flex flex-col items-center justify-center mb-20 text-center">
              
              <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#06367b] leading-none mb-6 tracking-tight">
                Our Products & Services
              </h2>
              
              <div 
                className={`relative h-1.5 bg-[#06367b] rounded-full overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? 'w-24 md:w-32 delay-[200ms]' : 'w-0'
                }`}
              >
                <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
              </div>
            </div>
          </FadeUpSection>

          {/* Grid Container - Decreased gap to pull larger cards closer together */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {services.map((service, index) => {
              
              // Check if this specific card is tapped/active
              const isActive = activeCard === index;

              return (
                <FadeUpSection 
                  key={index} 
                  isVisible={isVisible} 
                  delay={(index % 3) * 150 + Math.floor(index / 3) * 100} 
                >
                  <div 
                    onClick={() => handleCardClick(index)}
                    className={`group relative h-full transition-all duration-500 bg-[#ffffff] rounded-2xl z-0 cursor-pointer ${
                      isActive 
                        ? '-translate-y-2 shadow-[0_20px_40px_rgba(6,54,123,0.12)]' 
                        : 'shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,54,123,0.12)]'
                    }`}
                  >
                    
                    {/* --- 1. Default Light Gray Border Layer --- */}
                    <div className={`absolute inset-0 rounded-2xl border border-gray-200 transition-opacity duration-500 pointer-events-none z-20 ${
                      isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                    }`}></div>

                    {/* --- 2. Gradient Border on Hover / Click --- */}
                    <div className={`absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-[#06367b] via-[#2EC4FF] to-[#075ca6] transition-opacity duration-500 pointer-events-none z-20 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div className="w-full h-full bg-[#ffffff] rounded-[14.5px]"></div>
                    </div>

                    {/* --- 3. Card Content (Increased Padding and Min-Height) --- */}
                    <div className="relative z-30 p-10 lg:p-12 flex flex-col h-full min-h-[380px]">
                      
                      {/* Icon Presentation with Gradient Background and 360 Spin on Hover / Click */}
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#06367b] via-[#2EC4FF] to-[#075ca6] flex items-center justify-center mb-10 transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] shadow-lg ${
                        isActive ? 'rotate-[360deg]' : 'group-hover:rotate-[360deg]'
                      }`}>
                        <div className={`text-white transform transition-transform duration-500 ${
                          isActive ? 'scale-110' : 'group-hover:scale-110'
                        }`}>
                          <service.Icon />
                        </div>
                      </div>
                      
                      {/* Card Title */}
                      <h3 className="text-2xl md:text-[24px] font-bold text-[#06367b] mb-5 tracking-tight">
                        {service.title}
                      </h3>
                      
                      {/* Card Description */}
                      <p className="text-[#626569] text-base md:text-[17px] leading-[1.9] tracking-[0.02em]">
                        {service.description}
                      </p>

                    </div>
                  </div>
                </FadeUpSection>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

export default ProductAndServices;