"use client"
import React from 'react';
import Link from 'next/link';

// --- Small Chevron Icon for Links ---
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M9 18l6-6-6-6"></path>
  </svg>
);

// --- Solid/Filled Icons for Contact Details ---
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.03 21c.53 0 .96-.4.96-.94v-3.71c0-.53-.42-.97-.98-.97z"></path>
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44z"></path>
  </svg>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/#home" },
    { name: "Company", href: "/#company" },
    { name: "Products", href: "/products" },
    { name: "Certificate", href: "/certificate" },
    { name: "Contact Us", href: "/#contact-us" },
  ];

  const products = [
    { name: "Buttweld Fittings", href: "/products?category=Buttweld%20Fittings" },
    { name: "Connectors", href: "/products?category=Connectors" },
    { name: "Fasteners", href: "/products?category=Fasteners" },
    { name: "Flanges", href: "/products?category=Flanges" },
    { name: "Forged Fittings", href: "/products?category=Forged%20Fittings" },
    { name: "Sheets, Plates & Coils", href: "/products?category=Sheets%2C%20Plates%20%26%20Coils" },
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

      {/* Main Footer Container */}
      <footer className="relative bg-[#06367b] text-white pt-20 pb-8 w-full overflow-hidden font-sans">
        
        <div className="max-w-[1500px] mx-auto px-4 md:px-[5%] xl:px-[8%] relative z-10">
          
          {/* Top Grid Section - 5 columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Logo & About */}
            <div className="flex flex-col gap-6 lg:pr-4">
              {/* Premium Logo Box */}
              <div className="bg-white rounded-2xl py-4 px-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)] w-fit mb-2 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                <img 
                    src="/logo.png" 
                    alt="Company Logo"
                    className="h-14 md:h-16 w-auto object-contain" 
                />
              </div>
              <p className="text-white/80 text-[15px] leading-[1.8] text-justify">
                Ratnamik Metal India is a leading supplier and stockist of Stainless Steel Pipe, 
                Stainless Steel Tube, Sheet, Plate, Coil, Round Bar, Pipe, and Forged Fittings. 
                Our vision is aiming for the best.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[22px] font-bold tracking-wide relative pb-3">
                Quick Links
                {/* Animated Line */}
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-[#06367b] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
                </div>
              </h3>
              <ul className="flex flex-col gap-4 mt-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="group flex items-center gap-3 text-white/80 hover:text-[#2EC4FF] transition-colors duration-300 w-fit">
                      <span className="text-white/60 group-hover:text-[#2EC4FF] transform transition-transform duration-300 group-hover:translate-x-1">
                        <ChevronRight />
                      </span>
                      <span className="text-[15px] font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Products */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[22px] font-bold tracking-wide relative pb-3">
                Products
                {/* Animated Line */}
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-[#06367b] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
                </div>
              </h3>
              <ul className="flex flex-col gap-4 mt-2">
                {products.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="group flex items-center gap-3 text-white/80 hover:text-[#2EC4FF] transition-colors duration-300 w-fit">
                      <span className="text-white/60 group-hover:text-[#2EC4FF] transform transition-transform duration-300 group-hover:translate-x-1">
                        <ChevronRight />
                      </span>
                      <span className="text-[15px] font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[22px] font-bold tracking-wide relative pb-3">
                Contact us
                {/* Animated Line */}
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-[#06367b] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
                </div>
              </h3>
              <div className="flex flex-col gap-7 mt-2">
                
                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 shrink-0 text-white group-hover:text-[#2EC4FF] transition-colors duration-300">
                    <LocationIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-white/60 tracking-wider uppercase">Address</span>
                    <p className="text-[14px] text-white/90 leading-relaxed">
                      Office No.8, 1st Floor, Aayesha Manzil, Bldg. No. 81/83, 4th Kumbharwada, Mumbai Maharashtra - 400004, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 shrink-0 text-white group-hover:text-[#2EC4FF] transition-colors duration-300">
                    <PhoneIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-white/60 tracking-wider uppercase">Phone</span>
                    <a href="tel:+919833864009" className="text-[14px] text-white/90 hover:text-[#2EC4FF] transition-colors">
                      +91 9833864009
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 shrink-0 text-white group-hover:text-[#2EC4FF] transition-colors duration-300">
                    <EnvelopeIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-white/60 tracking-wider uppercase">Email</span>
                    <a href="mailto:info@ratnamikmetal.com" className="text-[14px] text-white/90 hover:text-[#2EC4FF] transition-colors break-all">
                      info@ratnamikmetal.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Column 5: Map Section (No heading, centered vertically to align with other content) */}
            <div className="flex flex-col justify-start lg:mt-12 w-full h-full">
              <div className="w-full h-[250px] lg:h-[280px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10 relative z-10 bg-white/5">
                {/* Embedded Map configured to point directly to Ratnamik Metal India */}
                <iframe 
                  src="https://maps.google.com/maps?q=Ratnamik+Metal+India,+Mumbai,+Maharashtra&t=&z=15&ie=UTF8&iwloc=B&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-center items-center gap-2 text-center text-sm text-white/70">
            <p>
              Copyright © {currentYear} Ratnamik Metal India | Build by Asha Next Technologies | 9594430223
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}

export default Footer;