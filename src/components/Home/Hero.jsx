"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const videos = [
    {
      id: 1,
      src: "/heroVideo/video1.mp4",
      title: "Premium Metal Solutions",
      subtitle: "Delivering world-class alloys and steel products globally.",
      durationMs: 4000, // Plays for 4 seconds
    },
    {
      id: 2,
      src: "/heroVideo/video2.mp4",
      title: "Precision Engineering",
      subtitle: "ISO 9001:2015 certified manufacturing excellence.",
      durationMs: 48000, // Advance slide at exactly 48 seconds
      maxTime: 48,       // Force video to loop at 48 seconds if user is hovering
    },
    {
      id: 3,
      src: "/heroVideo/video3.mp4",
      title: "High-Grade Materials",
      subtitle: "Uncompromising quality for your most demanding projects.",
      durationMs: 6000, // Plays for 6 seconds
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  }, [videos.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  // Custom timer based on the specific duration of the current video
  useEffect(() => {
    if (!isHovered) {
      // Get the duration for the currently active video
      const currentDuration = videos[currentSlide].durationMs;
      
      const timer = setTimeout(() => {
        nextSlide();
      }, currentDuration);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isHovered, nextSlide, videos]);

  return (
    <div
      id="home"
      className="relative w-full min-h-[500px] overflow-hidden scroll-mt-[90px] bg-gray-900 group"
      style={{ height: "calc(100vh - 90px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container for videos - Absolute positioning for crossfade */}
      <div className="relative w-full h-full">
        {videos.map((vid, index) => (
          <div
            key={vid.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Video */}
            <div className="relative w-full h-full overflow-hidden">
              <video
                src={vid.src}
                autoPlay
                muted
                loop
                playsInline
                // This checks the time continuously. If it hits the maxTime (48s), it loops back to 0.
                onTimeUpdate={(e) => {
                  if (vid.maxTime && e.target.currentTime >= vid.maxTime) {
                    e.target.currentTime = 0;
                  }
                }}
                className="object-cover object-center w-full h-full"
              />

              {/* Refined Gradient Overlay */}
              <div className="absolute inset-y-0 left-0 w-full md:w-[50%] bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center h-full px-8 md:px-[10%] max-w-7xl pointer-events-none">
              <div className="max-w-3xl">
                <h1
                  className={`text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide transform transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100 delay-[400ms]"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  {vid.title}
                </h1>
                <p
                  className={`text-lg md:text-2xl text-gray-100 mb-10 leading-relaxed transform transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100 delay-[600ms]"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  {vid.subtitle}
                </p>

                {/* CTA Button */}
                <div
                  className={`transform transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100 delay-[800ms]"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#075ca6] text-white font-semibold text-lg hover:bg-white hover:text-[#06367b] transition-all duration-300 shadow-lg hover:shadow-xl pointer-events-auto"
                  >
                    Explore Products
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Solid White Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-[#075ca6] hover:scale-105 focus:outline-none"
        aria-label="Previous Slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-[#075ca6] hover:scale-105 focus:outline-none"
        aria-label="Next Slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div> 
  );
}

export default Hero;