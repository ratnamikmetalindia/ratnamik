"use client"
import React, { useEffect, useRef, useState } from 'react';

// --- Reusable Animated Fade-Up Wrapper (Down to Up Scroll) ---
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

// --- NEW UNIQUE, PREMIUM SCHEMATIC ICONS ---
// Scaled slightly for the new compact top-stacked layout
const ToleranceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500">
    <path d="M4 10V6a2 2 0 0 1 2-2h4M20 10V6a2 2 0 0 0-2-2h-4M4 14v4a2 2 0 0 0 2 2h4M20 14v4a2 2 0 0 1-2 2h-4"></path>
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path>
    <path d="m15 15 4 4M9 9l4 4"></path>
  </svg>
);

const SupplyChainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500">
    <path d="M16 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM8 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
    <path d="M18.12 12H19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2H9"></path>
    <path d="m11.12 9-2.12-3H6.5"></path>
    <path d="m13.12 9 2.12-3H18.5a2 2 0 0 1 2 2"></path>
    <path d="m16 2-2.12 3"></path>
  </svg>
);

const MetallurgyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    <path d="M12 12v3M9 14.5l3 .5 3-.5"></path>
  </svg>
);

const AuthorityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
    <path d="m9 12 2 2 4-4"></path>
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
      { threshold: 0.15 }
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
      title: "Micro-Tolerance Engineering",
      description: "Our vertical integration protocols enforce exacting dimensions on every blueprint, delivering unyielding structural integrity.",
      Icon: ToleranceIcon,
    },
    {
      title: "End-to-End Reliability",
      description: "Leverage decades of refined industrial logistics, ensuring high-stakes project seamlessness and flawless execution.",
      Icon: SupplyChainIcon,
    },
    {
      title: "Commanding Infrastructure",
      description: "Utilizing uncompromised material science and heavy-duty fabrication technology for demanding environments.",
      Icon: MetallurgyIcon,
    },
    {
      title: "Trusted Certification Authority",
      description: "Our rigid ISO validation guarantees unwavering compliance with the global spectrum of quality standards.",
      Icon: AuthorityIcon,
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
            animation: shimmerLine 2s infinite linear;
          }
        `
      }} />

      {/* 
        Section Background -> Solid Primary Blue (#06367b)
        Height reduced: Adjusted padding from py-32 down to py-16/20
      */}
      <section ref={sectionRef} className="bg-[#06367b] py-16 md:py-20 px-4 md:px-[8%] w-full overflow-hidden">
        
        {/* Increased max-width to accommodate a 4-column layout gracefully */}
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header Section */}
          <FadeUpSection isVisible={isVisible} delay={0}>
            <div className="flex flex-col items-center justify-center mb-12 md:mb-16 text-center">
              
              <h2 className="text-3xl md:text-5xl lg:text-[44px] font-bold text-[#fdfdfd] leading-tight mb-5 tracking-tight">
                Why Choose Us
              </h2>
              
              <div 
                className={`relative h-[4px] md:h-1.5 bg-[#075ca6] rounded-full overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? 'w-24 md:w-32 delay-[200ms]' : 'w-0'
                }`}
              >
                <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
              </div>
            </div>
          </FadeUpSection>

          {/* 
            NEW LAYOUT: 4-Column Grid on Desktop
            This vastly reduces the vertical height by spreading the content horizontally.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12">
            {features.map((feature, index) => (
              <FadeUpSection 
                key={index} 
                isVisible={isVisible} 
                delay={(index + 1) * 150} 
              >
                {/* 
                  NEW ARRANGEMENT: Flex-col (Vertical Stack)
                  Icon on top, Title, then Description.
                */}
                <div className="flex flex-col items-start group cursor-pointer transform transition-transform duration-500 hover:-translate-y-2">
                  
                  {/* Solid Circular Icon Area - DEFAULT SHADOW REMOVED */}
                  <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#2EC4FF] flex items-center justify-center mb-6 transition-all duration-[700ms] shadow-none group-hover:shadow-[0_8px_30px_rgba(46,196,255,0.4)]">
                    <div className="stroke-[#ffffff] group-hover:stroke-[#06367b]">
                      <feature.Icon />
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col">
                    
                    <h3 className="text-xl md:text-[20px] font-bold text-[#fdfdfd] mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-[#EAF4FF]/85 text-[15px] leading-[1.8] tracking-[0.02em]">
                      {feature.description}
                    </p>
                    
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