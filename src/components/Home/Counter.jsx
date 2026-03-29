"use client"
import React, { useEffect, useRef, useState } from 'react';

// Reusable component for the smooth counting effect
const AnimatedNumber = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <>{count}</>;
};

function Counter() {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    { num: 61, label: 'GLOBAL NETWORK' },
    { num: 231, label: 'CLIENTS' },
    { num: 38, label: 'TEAM' },
    { num: 37, label: 'INDUSTRY' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes sweep {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(500%) skewX(-20deg); }
          }
          .animate-sweep {
            animation: sweep 6s infinite linear;
          }
        `
      }} />

      <section 
        ref={sectionRef} 
        className="relative w-full overflow-hidden lg:h-[230px] flex items-center justify-center py-12 lg:py-0 bg-fixed bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop')` 
        }}
      >
        {/* Dark Blue Tint Overlay for Readability */}
        <div className="absolute inset-0 bg-[#06367b]/80 z-0"></div>

        {/* Animated Sweep Element */}
        <div className="absolute top-0 left-0 w-[50%] md:w-[20%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sweep pointer-events-none z-10"></div>

        {/* Counters Container - Changed to grid-cols-1 for mobile view! */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 md:px-[8%] grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 text-center text-white">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <h3 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">
                <AnimatedNumber end={stat.num} isVisible={isVisible} />
              </h3>
              <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-200">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Counter;