"use client"
import React, { useState } from 'react';

// --- Premium Icons ---
const CheckCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="url(#paint0_linear)" fillOpacity="0.15"/>
    <path d="M10 16.4L6 12.4L7.41 10.99L10 13.57L16.59 6.98L18 8.4L10 16.4Z" fill="url(#paint0_linear)"/>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06367b"/>
        <stop offset="0.5" stopColor="#2EC4FF"/>
        <stop offset="1" stopColor="#075ca6"/>
      </linearGradient>
    </defs>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const CloseIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronLeft = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// --- Certificate Data (Reordered: ISO is now first) ---
const certificatesData = [
  {
    id: 4,
    title: "ISO 9001:2015 Quality Management System",
    description: "Certified by VRC Certification Pvt. Ltd., accredited by Emirates International Accreditation Centre.",
    details: [
      { label: "Company Name", value: "RATNAMIK METAL INDIA" },
      { label: "Certificate No.", value: "RMD1Q0408V26" },
      { label: "Scope", value: "Manufacturer and Stockist of Stainless Steel Flanges, Pipe fittings and Fasteners. Supplier of Industrial Raw Material." },
      { label: "Issued Date", value: "04/04/2026" },
      { label: "Expiry Date", value: "03/04/2029" },
    ],
    highlights: [
      "Conforms to ISO 9001:2015 Standards",
      "Internationally recognized quality management",
      "Maintained through continuous surveillance audits"
    ],
    pdfPath: "/certificates/RATNAMIK METAL INDIA SOFT.pdf",
    totalPages: 1
  },
  {
    id: 1,
    title: "GST Registration Certificate",
    description: "Certified by the Government of India, Form GST REG-06.",
    details: [
      { label: "Legal Name", value: "BHARAT KUMAR HARJIJI PRAJAPATI" },
      { label: "Trade Name", value: "RATNAMIK METAL INDIA" },
      { label: "GSTIN", value: "27BJJPP0738H1Z0" },
      { label: "Constitution of Business", value: "Proprietorship" },
      { label: "Date of Liability", value: "01/07/2017" },
      { label: "Registered Address", value: "1ST FLOOR., OFFICE NO.08,, 81/83, ESSA MANZIL,, PRABHU SHREE RAM MANDIR MARG, 4TH KUMBHARWADA LANE,, Mumbai City, Maharashtra, 400004" },
    ],
    highlights: [
      "System generated digitally signed Registration Certificate",
      "Issued based on the deemed approval of application",
      "Valid for regular tax collection"
    ],
    pdfPath: "/certificates/GSTCERTIFICATE.pdf",
    totalPages: 3
  },
  {
    id: 2,
    title: "Importer-Exporter Code (IEC) Certificate",
    description: "Certified by the Directorate General of Foreign Trade, Ministry of Commerce and Industry, Government of India.",
    details: [
      { label: "Firm Name", value: "RATNAMIK METAL INDIA" },
      { label: "IEC Code / PAN", value: "BJJPP0738H" },
      { label: "Nature of Concern", value: "Proprietorship" },
      { label: "Date of Issue", value: "03/04/2026" },
      { label: "Registered Address", value: "OFFICE NO: 08, 1 ST FLOOR, 81/83, ESSA MANZIL,, PRABHU SHREE RAM MANDIR MARG, 4TH KUMBHARWADA LANE.. MUMBAI, MAHARASHTRA, 400004" },
      { label: "Name of Signatory", value: "Bharat Kumar H Prajapati" },
    ],
    highlights: [
      "Certified by DGFT, Government of India",
      "Valid for international trade",
      "Authenticity can be verified online"
    ],
    pdfPath: "/certificates/IEC.pdf",
    totalPages: 1
  },
  {
    id: 3,
    title: "UDYAM Registration Certificate (MSME)",
    description: "Certified by the Ministry of Micro, Small and Medium Enterprises, Government of India.",
    details: [
      { label: "Name of Enterprise", value: "RATNAMIK METAL INDIA" },
      { label: "UDYAM Registration Number", value: "UDYAM-MH-18-0115460" },
      { label: "Type of Enterprise", value: "MICRO" },
      { label: "Major Activity", value: "MANUFACTURING" },
      { label: "Date of Incorporation", value: "01/07/2017" },
      { label: "Date of UDYAM Registration", value: "13/12/2021" },
    ],
    highlights: [
      "Registered under Ministry of MSME",
      "Eligible for Government Schemes and benefits",
      "Official computer-generated statement"
    ],
    pdfPath: "/certificates/MSME (2).pdf",
    totalPages: 2
  }
];

function Certificate() {
  const [modalData, setModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Open Modal and reset to page 1
  const openModal = (cert) => {
    setModalData(cert);
    setCurrentPage(1);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalData(null);
    document.body.style.overflow = 'unset';
  };

  // Navigate PDF Pages
  const handlePrevPage = (e) => {
    e.stopPropagation();
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = (e) => {
    e.stopPropagation();
    if (modalData && currentPage < modalData.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-[#ffffff] min-h-screen py-16 font-sans">
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeSlide {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-slide {
            animation: fadeSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          /* Custom scrollbar to hide scrollbars natively if they appear */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />

      <div className="max-w-[1300px] mx-auto px-4 md:px-[5%]">

        {/* Certificates List (Alternating Left/Right) */}
        <div className="flex flex-col gap-24 md:gap-36 mt-4">
          {certificatesData.map((cert, index) => {
            // Even index = Image Left, Text Right. Odd index = Text Left, Image Right.
            const isImageLeft = index % 2 === 0;

            return (
              <div 
                key={cert.id} 
                className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center`}
              >
                
                {/* --- Static PDF Preview Wrapper --- */}
                <div className="w-full md:w-1/2 shrink-0">
                  {/* Gray background padding like a frame */}
                  <div className="bg-gray-50 p-6 md:p-10 rounded-[2rem] flex items-center justify-center relative shadow-lg border border-gray-100">
                    
                    {/* Strict A4 Aspect Ratio Container (1 : 1.414) to prevent scrollbars */}
                    <div className="relative w-full aspect-[1/1.414] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                      <iframe 
                        /* view=Fit ensures the PDF fits exactly within the box, preventing scrolling */
                        src={`${cert.pdfPath}#page=1&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=Fit`} 
                        className="absolute inset-0 w-[102%] h-[102%] -ml-[1%] -mt-[1%] border-0 pointer-events-none no-scrollbar" 
                        title={cert.title}
                        scrolling="no"
                        frameBorder="0"
                      ></iframe>
                    </div>

                    {/* Invisible overlay blocks interactions, ensuring it remains static like an image */}
                    <div className="absolute inset-0 z-10 bg-transparent rounded-[2rem]"></div>
                  </div>
                </div>

                {/* --- Text Content Side --- */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <h2 className="text-[32px] md:text-[38px] font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
                    {cert.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {cert.description}
                  </p>

                  {/* Details List */}
                  <div className="flex flex-col gap-3 mb-10 border-l-4 border-blue-50 pl-4">
                    {cert.details.map((detail, idx) => (
                      <div key={idx} className="text-[16px] text-gray-700 leading-relaxed tracking-wide">
                        <span className="font-bold text-gray-900">{detail.label}: </span> 
                        {detail.value}
                      </div>
                    ))}
                  </div>

                  {/* Highlights (Premium Checkmarks) */}
                  <div className="flex flex-col gap-4 mb-10">
                    {cert.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0"><CheckCircleIcon /></div>
                        <span className="text-gray-700 font-medium text-[15.5px]">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Certificate Button (Premium Blue Gradient) */}
                  <button 
                    onClick={() => openModal(cert)}
                    className="bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] text-white font-bold px-8 py-4 rounded-full shadow-[0_8px_20px_-6px_rgba(46,196,255,0.5)] hover:scale-105 hover:shadow-[0_12px_25px_-6px_rgba(46,196,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5 w-max tracking-wide"
                  >
                    <EyeIcon />
                    View Certificate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* -------------------- PREMIUM SLIDER PDF MODAL VIEWER -------------------- */}
      {/* ========================================================================= */}
      {modalData && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={closeModal} // Clicking background closes modal
        >
          
          {/* Floating Close Button */}
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white hover:rotate-90 transition-all duration-300 z-50 p-2"
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          {/* Left Arrow */}
          {modalData.totalPages > 1 && (
            <button 
              onClick={handlePrevPage}
              className={`absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 ${
                currentPage === 1 
                ? 'opacity-0 pointer-events-none' 
                : 'text-white bg-white/10 hover:bg-white/25 hover:scale-110 cursor-pointer'
              }`}
            >
              <ChevronLeft />
            </button>
          )}

          {/* Right Arrow */}
          {modalData.totalPages > 1 && (
            <button 
              onClick={handleNextPage}
              className={`absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 ${
                currentPage === modalData.totalPages 
                ? 'opacity-0 pointer-events-none' 
                : 'text-white bg-white/10 hover:bg-white/25 hover:scale-110 cursor-pointer'
              }`}
            >
              <ChevronRight />
            </button>
          )}

          {/* Main Content: PDF Presentation Slider (Locked A4 Size) */}
          <div 
            key={currentPage} // Forces re-render animation when page changes
            className="relative w-full max-w-[800px] aspect-[1/1.414] max-h-[85vh] bg-white rounded-xl shadow-2xl animate-fade-slide flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent clicking the PDF from closing the modal
          >
            {/* The invisible div blocks the native PDF hover controls, maintaining the clean image-like UI */}
            <div className="absolute inset-0 z-10 pointer-events-none"></div>

            <iframe 
              src={`${modalData.pdfPath}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=Fit`} 
              className="absolute inset-0 w-[102%] h-[102%] -ml-[1%] -mt-[1%] border-0 pointer-events-none no-scrollbar" 
              title={`${modalData.title} Page ${currentPage}`}
              scrolling="no"
              frameBorder="0"
            ></iframe>
          </div>

          {/* Page Indicator (Bottom Center) */}
          {modalData.totalPages > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm font-bold tracking-widest bg-white/10 px-5 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
              {currentPage} / {modalData.totalPages}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Certificate;