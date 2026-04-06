"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

// --- Download Icon for Catalog ---
const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 text-current">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 
  const headerRef = useRef(null);

  // --- DYNAMIC HEIGHT FIX ---
  // Calculates height ONLY when the menu is actively open.
  // This guarantees zero scroll lag when the menu is closed.
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const availableHeight = window.innerHeight - rect.bottom;
        headerRef.current.style.setProperty('--dynamic-menu-height', `${Math.max(0, availableHeight)}px`);
      }
    };

    if (isMenuOpen) {
      updateHeight(); // Calculate instantly on open
      window.addEventListener('scroll', updateHeight, { passive: true });
      window.addEventListener('resize', updateHeight, { passive: true });
      return () => {
        window.removeEventListener('scroll', updateHeight);
        window.removeEventListener('resize', updateHeight);
      };
    }
  }, [isMenuOpen]);

  // --- SMART SCROLL HANDLER ---
  const handleNavClick = (e, path) => {
    if (path.startsWith('/#') && pathname === '/') {
      e.preventDefault(); 
      const targetId = path.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', path);
      }
    }
    setIsMenuOpen(false);
  };

  // Reusable link style for desktop
  const linkStyle = "text-[#2A2E33] hover:text-[#075ca6] transition-colors duration-200 py-2 block";

  // Product List
  const productsList = [
    { name: "Nut Bolt", path: "/products/nut-bolt" },
    { name: "Hex Bolt", path: "/products/hex-bolt" },
    { name: "Pipes", path: "/products/pipes" },
    { name: "Hose Pipes", path: "/products/hose-pipes" },
    { name: "Flanges", path: "/products/flanges" },
    { name: "RTJ Slip On / Blind Flanges", path: "/products/rtj-slip-on-blind-flanges" },
    { name: "Weld Neck Flanges", path: "/products/weld-neck-flanges" },
    { name: "Sheets and Coils", path: "/products/sheets-coils" },
    { name: "Mirror Sheet", path: "/products/mirror-sheet" },
    { name: "Stainless Steel", path: "/products/stainless-steel" },
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

      {/* Top Contact Bar */}
      <div className="bg-[#075ca6] w-full relative overflow-hidden text-white py-5 px-4 md:px-[10%] flex flex-col md:flex-row justify-between items-center text-[13px] md:text-base gap-3 md:gap-0 z-[10]">
        <div className="absolute top-0 left-0 w-[40%] md:w-[20%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep pointer-events-none z-0"></div>
        <div className="font-medium tracking-wide text-center md:text-left relative z-10">
          ISO 9001 : 2012 Certified Co.
        </div>
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center relative z-10">
          <a href="https://wa.me/917313726882" className="flex items-center gap-2 hover:text-gray-200 transition">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            +91 7313726882
          </a>
          <span className="hidden md:inline opacity-60">|</span>
          <a href="mailto:ratnamikspecialalloys@gmail.com" className="flex items-center gap-2 hover:text-gray-200 transition">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            ratnamikspecialalloys@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navbar - Added transform-gpu and isolate to prevent sticky hit-area bugs */}
      <header ref={headerRef} className="bg-[#ffffff] h-[90px] w-full flex justify-between px-4 md:px-0 sticky top-0 z-[99999] shadow-sm transform-gpu isolate">
        
        {/* Logo Section */}
        <div className="w-auto md:w-[50%] h-full flex items-center md:pl-[10%]">
          <Link href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-2 cursor-pointer relative z-50">
            <Image src="/logo.png" alt="logo" height={80} width={80} className="w-[60px] md:w-[80px]" />
            <div className="leading-tight">
              <h2 className="font-bold text-xl md:text-2xl text-[#075ca6]">RATNAMIK</h2>
              <p className="font-semibold text-sm md:text-xl text-[#626569]">Metal India</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex w-[50%] h-[100%] justify-center items-center">
          <ul className="flex justify-center text-[17px] font-semibold items-center gap-8">
            <li><Link href="/#home" onClick={(e) => handleNavClick(e, '/#home')} className={linkStyle}>Home</Link></li>
            <li><Link href="/#company" onClick={(e) => handleNavClick(e, '/#company')} className={linkStyle}>Company</Link></li>
            
            {/* Products Dropdown */}
            <li className="relative group h-[90px] flex items-center">
              <Link href="/products" onClick={(e) => handleNavClick(e, '/products')} className={linkStyle}>
                Products
              </Link>
              
              <div className="absolute top-[90px] left-0 w-64 bg-white shadow-md border-t-[2px] border-[#075ca6] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[1000]">
                <ul className="flex flex-col py-3">
                  {productsList.map((product, idx) => (
                    <li key={idx}>
                      <Link 
                        href={product.path} 
                        onClick={(e) => handleNavClick(e, product.path)}
                        className="block px-6 py-2.5 text-[16px] font-normal text-[#333333] hover:text-[#075ca6] hover:bg-gray-50 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li><Link href="/catalog" onClick={(e) => handleNavClick(e, '/catalog')} className={linkStyle}>Catalog</Link></li>
            <li><Link href="/certificate" onClick={(e) => handleNavClick(e, '/certificate')} className={linkStyle}>Certificate</Link></li>
            <li><Link href="/#contact-us" onClick={(e) => handleNavClick(e, '/#contact-us')} className={linkStyle}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Mobile Hamburger Button - Increased Hit Target and Max Z-Index */}
        <div className="md:hidden flex items-center pr-2">
          <button 
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-[#075ca6] focus:outline-none w-12 h-12 flex items-center justify-center cursor-pointer relative z-[999999]"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-8 h-8 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown - Absolute relative to Header */}
        {isMenuOpen && (
          <div 
            className="md:hidden absolute top-[90px] left-0 w-full bg-[#D1D1D1] flex flex-col z-[100] shadow-2xl border-t border-gray-300 overflow-y-auto overflow-x-hidden overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ maxHeight: 'var(--dynamic-menu-height, calc(100dvh - 90px))' }}
          >
            
            {/* Top Primary Links */}
            <div className="flex flex-col py-3 bg-[#dcdbdb]">
              <Link href="/#home" onClick={(e) => handleNavClick(e, '/#home')} className="block px-6 py-3 text-lg font-medium tracking-wide text-gray-800 hover:text-[#075ca6] hover:bg-[#cecece] transition-colors">Home</Link>
              <Link href="/#company" onClick={(e) => handleNavClick(e, '/#company')} className="block px-6 py-3 text-lg font-medium tracking-wide text-gray-800 hover:text-[#075ca6] hover:bg-[#cecece] transition-colors">Company</Link>
              <Link href="/products" onClick={(e) => handleNavClick(e, '/products')} className="block px-6 py-3 text-lg font-medium tracking-wide text-gray-800 hover:text-[#075ca6] hover:bg-[#cecece] transition-colors">Products</Link>
            </div>

            {/* Indented Product List */}
            <div className="flex flex-col py-3 bg-[#ffffff] border-y border-gray-300/50">
              {productsList.map((product, idx) => (
                <Link 
                  key={idx} 
                  href={product.path} 
                  onClick={(e) => handleNavClick(e, product.path)}
                  className="block px-10 py-3 text-base tracking-wide text-gray-700 hover:text-[#075ca6] hover:bg-gray-100 transition-colors"
                >
                  {product.name}
                </Link>
              ))}
            </div>

            {/* Remaining Primary Links */}
            <div className="bg-[#dcdbdb] flex flex-col py-3">
              <Link href="/catalog" onClick={(e) => handleNavClick(e, '/catalog')} className="flex items-center px-6 py-3 text-lg font-medium tracking-wide text-gray-800 hover:text-[#075ca6] hover:bg-[#cecece] transition-colors">
                Catalog
              </Link>
              <Link href="/certificate" onClick={(e) => handleNavClick(e, '/certificate')} className="block px-6 py-3 text-lg font-medium tracking-wide text-gray-800 hover:text-[#075ca6] hover:bg-[#cecece] transition-colors">Certificate</Link>
              <Link href="/#contact-us" onClick={(e) => handleNavClick(e, '/#contact-us')} className="block px-6 py-3 text-lg font-medium tracking-wide text-gray-800 hover:text-[#075ca6] hover:bg-[#cecece] transition-colors">Contact Us</Link>
            </div>

          </div>
        )}
        
      </header>
    </>
  );
}

export default Navbar;