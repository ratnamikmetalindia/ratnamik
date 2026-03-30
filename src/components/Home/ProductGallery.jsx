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

// --- Premium Arrow Icon ---
const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="M12 5l7 7-7 7"></path>
  </svg>
);

function ProductGallery() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const products = [
    {
      id: 1,
      name: "Buttweld Fittings",
      category: "Industrial Fittings",
      image: "/productGallery/buttweld-fittings.jpg",
    },
    {
      id: 2,
      name: "Connectors",
      category: "Piping Solutions",
      image: "/productGallery/Connectors.jpg",
    },
    {
      id: 3,
      name: "Fasteners",
      category: "Industrial Hardware",
      image: "/productGallery/fasteners.jpg",
    },
    {
      id: 4,
      name: "Flanges",
      category: "Structural Support",
      image: "/productGallery/flanges.jpg",
    },
    {
      id: 5,
      name: "Forged Fittings",
      category: "Heavy-Duty Fittings",
      image: "/productGallery/forged-fittings.jpg",
    },
    {
      id: 6,
      name: "Sheets, Plates & Coils",
      category: "Raw Materials",
      image: "/productGallery/sheets-plates-coil1.jpg",
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

      {/* Section Background -> Pure White (#ffffff) */}
      <section ref={sectionRef} className="bg-[#ffffff] py-24 md:py-32 px-4 md:px-[8%] w-full overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header Section */}
          <FadeUpSection isVisible={isVisible} delay={0}>
            <div className="flex flex-col items-center justify-center mb-16 md:mb-24 text-center">
              
              <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#06367b] leading-tight mb-6 tracking-tight">
                Featured Products
              </h2>
              
              {/* Premium Animated Shine Line */}
              <div 
                className={`relative h-1.5 bg-[#06367b] rounded-full overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? 'w-24 md:w-32 delay-[200ms]' : 'w-0'
                }`}
              >
                <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
              </div>
            </div>
          </FadeUpSection>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
            {products.map((product, index) => (
              <FadeUpSection 
                key={product.id} 
                isVisible={isVisible} 
                delay={(index % 3) * 150 + Math.floor(index / 3) * 100} 
              >
                {/* Premium Simple Card Layout */}
                <div className="group relative flex flex-col w-full bg-white rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(6,54,123,0.15)] transition-all duration-500 border border-gray-100">
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-[5/4] overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                  </div>

                  {/* 
                    Interactive Content Container (Footer)
                    Uses a cross-fading background technique for perfectly smooth gradient transitions.
                  */}
                  <div className="relative flex flex-col p-6 md:p-8 overflow-hidden">
                    
                    {/* Default Background Layer (White) */}
                    <div className="absolute inset-0 bg-white border-t border-gray-100 opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-0"></div>
                    
                    {/* Hover Background Layer (Premium Gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                    {/* Content (z-10 ensures it stays above the backgrounds) */}
                    <div className="relative z-10">
                      <span className="block text-[#626569] group-hover:text-[#EAF4FF] text-xs md:text-sm font-medium tracking-wide uppercase mb-2.5 transition-colors duration-500">
                        {product.category}
                      </span>
                      
                      <div className="flex justify-between items-center gap-4">
                        <h3 className="text-xl md:text-[22px] font-semibold text-[#06367b] group-hover:text-white tracking-tight leading-snug transition-colors duration-500">
                          {product.name}
                        </h3>
                        
                        {/* 
                          The "View" Button 
                          Cross-fades from Gradient Background + White Text -> White Background + Blue Text
                        */}
                        <div className="relative shrink-0 flex items-center justify-center rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-500 px-4 py-2 md:px-5 md:py-2.5">
                          
                          {/* Button Default Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                          
                          {/* Button Hover Background */}
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Button Text & Icon */}
                          <div className="relative z-10 flex items-center gap-2 text-white group-hover:text-[#06367b] font-bold text-sm transition-colors duration-500">
                            <span className="hidden md:block">
                              View
                            </span>
                            <div className="transform transition-transform duration-500 group-hover:translate-x-1">
                              <ArrowRight />
                            </div>
                          </div>
                          
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </FadeUpSection>
            ))}
          </div>

          {/* Centered Action Button */}
          <FadeUpSection isVisible={isVisible} delay={400}>
            <div className="flex justify-center">
              {/* Premium Button: Solid Primary Blue default. Gradient on hover. */}
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-[#06367b] rounded-full overflow-hidden shadow-[0_4px_20px_rgba(6,54,123,0.2)] hover:shadow-[0_8px_30px_rgba(46,196,255,0.3)] hover:-translate-y-1">
                
                {/* The Gradient Hover Fill */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button Text & Icon */}
                <span className="relative z-10 flex items-center gap-3 text-sm md:text-base tracking-wide">
                  Explore Full Catalog
                  <div className="transform transition-transform duration-500 group-hover:translate-x-1">
                    <ArrowRight />
                  </div>
                </span>
              </button>
            </div>
          </FadeUpSection>

        </div>
      </section>
    </>
  );
}

export default ProductGallery;