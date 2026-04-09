"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const direction = useRef(1); // 1 means moving forward (left to right), -1 means backward (right to left)

  const slides = [
    {
      id: 1,
      image: "/hero/slider1.jpg",
      title: "Premium Metal Solutions",
      subtitle: "Delivering world-class alloys and steel products globally.",
    },
    {
      id: 2,
      image: "/hero/slider2.jpg",
      title: "Precision Engineering",
      subtitle: "ISO 9001:2015 certified manufacturing excellence.",
    },
    {
      id: 3,
      image: "/hero/slider3.jpg",
      title: "High-Grade Materials",
      subtitle: "Uncompromising quality for your most demanding projects.",
    },
    {
      id: 4,
      image: "/hero/slider4.jpg",
      title: "Reliable Global Export",
      subtitle: "Connecting Indian metal manufacturing to the world.",
    },
    {
      id: 5,
      image: "/hero/slider5.jpg",
      title: "Strength You Can Trust",
      subtitle: "Delivering durable metal products with unmatched reliability.",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play functionality with Ping-Pong effect (3 seconds)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          // If we are moving forward
          if (direction.current === 1) {
            if (prev >= slides.length - 1) {
              direction.current = -1; // Change direction to backward
              return prev - 1;
            }
            return prev + 1;
          } 
          // If we are moving backward
          else {
            if (prev <= 0) {
              direction.current = 1; // Change direction to forward
              return prev + 1;
            }
            return prev - 1;
          }
        });
      }, 3000); // 3 seconds interval
      
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  return (
    <div 
      id="home"
      className="relative w-full min-h-[500px] overflow-hidden scroll-mt-[90px] bg-gray-100 group"
      style={{ height: "calc(100vh - 90px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sliding Track for Premium Horizontal Transition */}
      <div
        className="flex w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full relative h-full">
            {/* Background Image Container */}
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  index === currentSlide ? "scale-105" : "scale-100"
                }`} // Adds a subtle, premium "Ken Burns" slow zoom effect to the active image
                sizes="100vw"
              />

              {/* Refined Gradient Overlay - Only darkens the left side for text, keeping the rest of the image perfectly bright */}
              <div className="absolute inset-y-0 left-0 w-full md:w-[50%] bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Text Content - Positioned over the gradient */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center h-full px-8 md:px-[10%] max-w-7xl pointer-events-none">
              <div className="max-w-3xl">
                <h1
                  className={`text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide transform transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100 delay-[400ms]"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-lg md:text-2xl text-gray-100 mb-10 leading-relaxed transform transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100 delay-[600ms]"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  {slide.subtitle}
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
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#075ca6] text-white font-semibold text-lg hover:bg-white hover:text-[#06367b] transition-all duration-400 shadow-lg hover:shadow-xl pointer-events-auto"
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