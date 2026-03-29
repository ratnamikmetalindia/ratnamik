"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLink = (path) =>
    pathname === path
      ? "text-[#075ca6] font-semibold transition-colors duration-200"
      : "text-[#2A2E33] hover:text-[#075ca6] transition-colors duration-200";

  return (
    <>
      {/* Custom styles for the left-to-right sweep animation */}
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

      {/* Top Contact Bar - Added overflow-hidden here to fix the X-axis scroll issue */}
      <div className="bg-[#075ca6] w-full relative overflow-hidden text-white py-5 px-4 md:px-[10%] flex flex-col md:flex-row justify-between items-center text-[13px] md:text-base gap-3 md:gap-0 z-[10]">
        
        {/* Animated White Shine Element */}
        <div className="absolute top-0 left-0 w-[40%] md:w-[20%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep pointer-events-none z-0"></div>

        <div className="font-medium tracking-wide text-center md:text-left relative z-10">
          ISO 9001 : 2015 Certified Co.
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center relative z-10">
          <a href="https://wa.me/919920461462" className="flex items-center gap-2 hover:text-gray-200 transition">
            {/* WhatsApp Icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            +91 7313726882
          </a>
          <span className="hidden md:inline opacity-60">|</span>
          <a href="mailto:resistantspecialalloys@gmail.com" className="flex items-center gap-2 hover:text-gray-200 transition">
            {/* Email Icon */}
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            ratnamikspecialalloys@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navbar - Sticky wrapper added here */}
      <header className="bg-[#ffffff] h-[90px] w-full flex justify-between px-4 md:px-0 sticky top-0 z-[999] shadow-sm">
        
        {/* Logo Section */}
        <div className="w-auto md:w-[50%] h-full flex items-center md:pl-[10%]">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logoo.png" alt="logo" height={80} width={80} className="w-[60px] md:w-[80px]" />
            <div className="leading-tight">
              <h2 className="font-bold text-xl md:text-2xl text-[#075ca6]">RATNAMIK</h2>
              <p className="font-semibold text-sm md:text-xl text-[#626569]">Metal India</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex w-[50%] h-[100%] justify-center items-center">
          <ul className="flex justify-center text-[17px] font-semibold items-center gap-8">
            <li><Link href="/" className={navLink("/")}>Home</Link></li>
            <li><Link href="/company" className={navLink("/company")}>Company</Link></li>
            <li><Link href="/products" className={navLink("/products")}>Products</Link></li>
            <li><Link href="/about-us" className={navLink("/about-us")}>About Us</Link></li>
          </ul>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center pr-2">
          <button 
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-[#075ca6] focus:outline-none p-2"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              // Close Icon
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              // Hamburger Icon
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[100%] font-semibold left-0 w-full bg-[#fdfdfd] shadow-xl border-t border-gray-100 flex flex-col items-center py-6 gap-6 z-[100]">
            <Link href="/" className={navLink("/")} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/company" className={navLink("/company")} onClick={() => setIsMenuOpen(false)}>Company</Link>
            <Link href="/products" className={navLink("/products")} onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link href="/about-us" className={navLink("/about-us")} onClick={() => setIsMenuOpen(false)}>About Us</Link>
          </div>
        )}
        
      </header>
    </>
  );
}

export default Navbar;