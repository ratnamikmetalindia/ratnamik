"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Custom SVG for the 3x3 dots (White color to show perfectly over the real images)
const CornerDots = ({ className }) => (
  <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    <circle cx="18" cy="6" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    <circle cx="30" cy="6" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    
    <circle cx="6" cy="18" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    <circle cx="18" cy="18" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    <circle cx="30" cy="18" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    
    <circle cx="6" cy="30" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    <circle cx="18" cy="30" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
    <circle cx="30" cy="30" r="2.5" stroke="#ffffff" strokeWidth="1.5"/>
  </svg>
);

function AboutCompany() {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  // This observer detects when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it has animated so it doesn't replay annoyingly
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the text is visible on screen
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  return (
    <>
      {/* Custom keyframes for the continuous shining line effect */}
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

      {/* Section Background */}
      <section className="bg-[#ffffff] py-16 md:py-24 px-4 md:px-[8%] w-full overflow-hidden">
        {/* Added items-start here so the heading naturally aligns with the top of the images */}
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* Left Side: Overlapping Images Layout */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-start">
            
            {/* Main Wrapper - Responsive height: short on phones (350px), tall on desktop (750px) */}
            <div className="relative w-full max-w-[550px] h-[350px] sm:h-[450px] md:h-[650px] lg:h-[750px]">
              
              {/* --- BACK IMAGE (Top Left) --- */}
              <div className="absolute top-0 left-0 w-[60%] h-[75%] border-[6px] md:border-[10px] border-[#fdfdfd] shadow-sm bg-[#fdfdfd] z-10">
                <div className="relative w-full h-full overflow-hidden group">
                   <Image 
                    src="/hero/slider1.jpg" 
                    alt="Industrial Facility" 
                    fill 
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <CornerDots className="absolute top-3 right-3 z-20 opacity-90" />
                </div>
              </div>

              {/* --- FRONT IMAGE (Massive, Bottom Right) --- */}
              <div className="absolute bottom-0 right-0 w-[65%] h-[75%] border-[6px] md:border-[10px] border-[#fdfdfd] shadow-lg bg-[#fdfdfd] z-20">
                <div className="relative w-full h-full overflow-hidden group">
                  <Image 
                    src="/hero/slider2.jpg" 
                    alt="Lobby Reception" 
                    fill 
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <CornerDots className="absolute top-3 right-3 z-30 opacity-90" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Exact Text Alignment and Formatting */}
          <div ref={textRef} className="w-full lg:w-[55%] flex flex-col pt-0">
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#06367b] leading-none mb-4 tracking-tight">
              About Company
            </h2>

            {/* Premium Animated Shine Line */}
            <div 
              className={`relative h-1.5 bg-[#06367b] rounded-full overflow-hidden mb-10 transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 w-24 md:w-32' : 'opacity-0 w-0'
              }`}
            >
              <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
            </div>

            {/* Paragraphs - Split into 3 parts, Increased Line Height & Letter Spacing */}
            <div className="flex flex-col gap-6 overflow-hidden">
              
              {/* Part 1 */}
              <div className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 delay-[200ms]' : 'opacity-0 translate-y-12'}`}>
                <p className="text-[#626569] text-base md:text-[17px] leading-[1.9] tracking-[0.02em] text-left">
                  <strong className="text-[#075ca6] font-semibold">Established in 2012</strong>, Ratnamik Metal India has emerged as a trusted name in the global metal industry, renowned for its excellence in exporting and supplying a comprehensive range of industrial piping solutions.
                </p>
              </div>

              {/* Part 2 */}
              <div className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 delay-[400ms]' : 'opacity-0 translate-y-12'}`}>
                <p className="text-[#626569] text-base md:text-[17px] leading-[1.9] tracking-[0.02em] text-left">
                  With over four decades of experience, we specialize in delivering high-quality <strong className="font-medium text-[#2A2E33]">Stainless Steel Fittings, Carbon Steel Pipes, and Industrial Valves</strong>, catering to diverse sectors including oil & gas, petrochemicals, power generation, and marine.
                </p>
              </div>

              {/* Part 3 */}
              <div className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 delay-[600ms]' : 'opacity-0 translate-y-12'}`}>
                <p className="text-[#626569] text-base md:text-[17px] leading-[1.9] tracking-[0.02em] text-left">
                  Our success is built on a strong foundation of integrity and quality. We ensure all products meet international standards for <strong className="font-medium text-[#2A2E33]">durability, precision, and performance</strong>, expanding our global footprint by delivering reliable solutions tailored to every industry.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default AboutCompany;