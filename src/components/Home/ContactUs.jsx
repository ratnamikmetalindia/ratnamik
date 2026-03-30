"use client"
import React, { useEffect, useRef, useState } from 'react';

// --- Reusable Animated Fade-Up Wrapper ---
const FadeUpSection = ({ children, delay = 0, isVisible, className = "" }) => (
  <div
    className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    } ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

// --- Premium Form Input Component with Gradient Focus Border ---
const ContactInput = ({ label, required, type = 'text', isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-2.5 ${isTextArea ? 'col-span-1 md:col-span-2' : ''}`}>
      <label className="text-sm font-semibold text-[#06367b]/90 tracking-wide">
        {label} {required && <span className="text-[#2EC4FF]">*</span>}
      </label>
      
      {/* Wrapper to handle the gradient border effect */}
      <div className="relative rounded-xl p-[1.5px] transition-all duration-300 z-0">
        
        {/* The Animated Gradient Border (visible only on focus) */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] transition-opacity duration-300 -z-10 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* The Default Gray Border (visible when NOT focused) */}
        <div className={`absolute inset-0 rounded-xl bg-gray-200 transition-opacity duration-300 -z-10 ${
          isFocused ? 'opacity-0' : 'opacity-100'
        }`}></div>

        {/* The actual Input Field */}
        {isTextArea ? (
          <textarea 
            rows="6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="px-5 py-4 rounded-[10.5px] bg-white text-[#06367b] transition-all duration-300 resize-none outline-none w-full relative z-10"
          />
        ) : (
          <input 
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="px-5 py-4 rounded-[10.5px] bg-white text-[#06367b] transition-all duration-300 outline-none w-full relative z-10"
          />
        )}
      </div>
    </div>
  );
};

// --- UPDATED: Solid/Filled White Icons for the Contact Card ---
const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0 text-white">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0 text-white">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.03 21c.53 0 .96-.4.96-.94v-3.71c0-.53-.42-.97-.98-.97z"></path>
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0 text-white">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0 text-white">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
  </svg>
);

// --- Paper Plane Submit Icon ---
const PaperPlaneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-45 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

function ContactUs() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const contactItems = [
    {
      Icon: LocationIcon,
      label: 'Address',
      content: 'Office No.8, 1st Floor, Aayesha Manzil, Bldg. No. 81/83, 4th Kumbharwada,Mumbai Maharashtra - 400004, India'
    },
    {
      Icon: PhoneIcon,
      label: 'Phone',
      content: ['+91 7313726882']
    },
    {
      Icon: EnvelopeIcon,
      label: 'Email',
      content: 'ratnamikmetalindia.com'
    },
    {
      Icon: ClockIcon,
      label: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 8:00 PM'
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

      {/* Main Section - Clean Light Gray Background */}
      <section ref={sectionRef} className="bg-[#F8F9FA] py-24 md:py-32 px-4 md:px-[8%] w-full overflow-hidden">
        
        {/* Container for content grid */}
        <div className="max-w-[1300px] mx-auto">

          {/* --- Global Section Header --- */}
          <FadeUpSection isVisible={isVisible} delay={0}>
            <div className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#06367b] leading-tight mb-6 tracking-tight">
                Contact Us
              </h2>
              
              {/* Premium Animated Cyan Shine Line */}
              <div 
                className={`relative h-1.5 bg-[#06367b] rounded-full overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? 'w-24 md:w-32 delay-[200ms]' : 'w-0'
                }`}
              >
                <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#2EC4FF] to-transparent animate-shimmer-line"></div>
              </div>
            </div>
          </FadeUpSection>
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* --- Left Column: Premium Form Card --- */}
            <div className="lg:col-span-3 h-full">
              <FadeUpSection isVisible={isVisible} delay={150} className="h-full">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 h-full flex flex-col justify-between">
                  
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold text-[#06367b] mb-3 tracking-tight">Send us a message</h3>
                    <p className="text-gray-500">Fill out the form below and our team will get back to you shortly.</p>
                  </div>

                  <form className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <ContactInput label="Full Name" required />
                      <ContactInput label="Email Address" required type="email" />
                      <ContactInput label="Phone Number" type="tel" />
                      <ContactInput label="Subject" />
                      <ContactInput label="Message" required isTextArea={true} />
                    </div>

                    {/* Left-aligned Premium Submit Button */}
                    <div className="flex justify-start mt-2">
                      <button type="submit" className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 font-bold text-white rounded-full overflow-hidden shadow-[0_4px_20px_rgba(46,196,255,0.2)] hover:shadow-[0_8px_30px_rgba(46,196,255,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6]"></div>
                        <span className="relative z-10 flex items-center gap-3 tracking-wide">
                          <PaperPlaneIcon />
                          Send Message
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </FadeUpSection>
            </div>

            {/* --- Right Column: Contact Panel --- */}
            <div className="lg:col-span-2 h-full">
              <FadeUpSection isVisible={isVisible} delay={300} className="h-full">
                <div className="p-8 md:p-12 bg-[#075ca6] rounded-2xl shadow-[0_20px_40px_rgba(7,92,166,0.2)] flex flex-col gap-12 text-white overflow-hidden relative h-full">
                  
                  {/* Decorative background element */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#2EC4FF] opacity-15 blur-[80px] pointer-events-none"></div>

                  <div className="flex flex-col items-start gap-4 relative z-10">
                    <h3 className="text-3xl font-bold tracking-tight text-white">Get In Touch</h3>
                  </div>

                  {/* Container for all contact details items */}
                  <div className="flex flex-col gap-10 relative z-10 mt-4">
                    {contactItems.map((item, idx) => (
                      <div key={idx} className="flex flex-row items-start gap-5 group">
                        
                        {/* UPDATED: Solid icons, no background circle */}
                        <div className="mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#2EC4FF]">
                          <item.Icon />
                        </div>
                        
                        <div className="flex flex-col gap-1.5 flex-1 pt-1">
                          <span className="text-sm font-semibold tracking-wider text-white/80 uppercase">
                            {item.label}
                          </span>
                          {/* Handling content as string or array of strings (for phones) */}
                          {Array.isArray(item.content) ? (
                            <div className="flex flex-col gap-1">
                              {item.content.map((sub, sidx) => (
                                <a key={sidx} href={`tel:${sub.replace(/\s+/g, '')}`} className="text-base text-white hover:text-[#2EC4FF] transition-colors leading-relaxed">
                                  {sub}
                                </a>
                              ))}
                            </div>
                          ) : item.label === 'Email' ? (
                            <a href={`mailto:${item.content}`} className="text-base text-white hover:text-[#2EC4FF] transition-colors leading-relaxed">
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-base text-white leading-relaxed">
                              {item.content}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUpSection>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default ContactUs;