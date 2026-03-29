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

// --- Custom Minimalist Icons ---
const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M2 12h20"></path>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const TimelineIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const EngineeringIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20"></path>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const QualityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const features = [
    {
      title: "Global Standards",
      description: "Strict adherence to international codes, ensuring flawless execution across borders.",
      Icon: GlobeIcon,
    },
    {
      title: "Decades of Expertise",
      description: "40+ years of pioneering experience translating into superior product quality.",
      Icon: TimelineIcon,
    },
    {
      title: "Custom Engineering",
      description: "Bespoke, precision-engineered metal solutions tailored to complex demands.",
      Icon: EngineeringIcon,
    },
    {
      title: "Uncompromising Quality",
      description: "Rigorous testing and ISO-certified processes guarantee long-term value.",
      Icon: QualityIcon,
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
        - Primary Blue (#06367b)
        - min-h-[70vh] combined with flex and items-center keeps it perfectly contained.
      */}
      <section 
        ref={sectionRef} 
        className="relative bg-[#06367b] min-h-[70vh] py-16 md:py-20 px-4 md:px-[8%] w-full flex items-center justify-center overflow-hidden z-0"
      >
        
        {/* Subtle Background Glow for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#075ca6] rounded-full blur-[200px] opacity-30 pointer-events-none -z-10"></div>

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* --- Left Column: Typography (Takes up 5/12 of the grid on desktop) --- */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <FadeUpSection isVisible={isVisible} delay={0}>
              
              <p className="text-[#2EC4FF] font-semibold tracking-widest uppercase text-sm mb-4">
                The Ratnamik Advantage
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#fdfdfd] leading-[1.1] mb-6 tracking-tight">
                Why Choose<br />Our Solutions.
              </h2>
              
              {/* Premium Animated Shine Line */}
              <div 
                className={`relative h-1.5 bg-[#075ca6] rounded-full overflow-hidden mb-8 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? 'w-24 md:w-32 delay-[200ms]' : 'w-0'
                }`}
              >
                <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
              </div>

              <p className="text-[#EAF4FF]/80 text-base md:text-[17px] leading-[1.9] tracking-[0.02em] max-w-md">
                We don't just supply metal products; we forge lasting partnerships. Our commitment to integrity, precision, and relentless innovation ensures your projects are built on the strongest possible foundation.
              </p>

            </FadeUpSection>
          </div>

          {/* --- Right Column: 2x2 Bento Grid (Takes up 7/12 of the grid) --- */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FadeUpSection 
                key={index} 
                isVisible={isVisible} 
                delay={(index + 1) * 150} 
              >
                {/* 
                  Premium Compact Card: 
                  - Default: Transparent dark blue with ultra-subtle border
                  - Hover: Border glows Cyan, slightly lifts
                */}
                <div className="group relative h-full flex flex-col p-8 rounded-2xl bg-[#075ca6]/10 border border-[#2EC4FF]/10 hover:border-[#2EC4FF]/50 hover:bg-[#075ca6]/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                  
                  {/* Subtle hover glow inside the card */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2EC4FF] rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Icon Area */}
                  <div className="w-12 h-12 rounded-full bg-[#06367b] border border-[#2EC4FF]/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                    <div className="text-[#2EC4FF]">
                      <feature.Icon />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-[22px] font-bold text-[#fdfdfd] mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#EAF4FF]/70 text-[15px] leading-[1.8] tracking-[0.02em]">
                    {feature.description}
                  </p>

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