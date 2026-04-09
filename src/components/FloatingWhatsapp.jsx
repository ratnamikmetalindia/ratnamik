"use client"
import React, { useState } from 'react';
import Image from 'next/image';

export default function FloatingWhatsApp() {
  const phoneNumber = "919833864009";
  const defaultMessage = "Hello Ratnamik Metal India, I would like to know more about your products.";
  const [userMessage, setUserMessage] = useState("");
  const [open, setOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=`;

  return (
    /* Adjusted bottom and left for a better "corner" feel on mobile */
    <div 
      className="fixed bottom-[-20px] left-2 md:left-5 z-[90] flex flex-col items-start"
      onMouseEnter={() => setOpen(true)}
    >

      {/* Popup UI */}
      <div
        className={`
          absolute bottom-40 md:bottom-48 left-2 md:left-0 w-[280px] md:w-96 rounded-xl shadow-2xl
          transition-all duration-300 flex flex-col overflow-hidden
          ${open 
            ? "opacity-100 visible translate-y-0 pointer-events-auto" 
            : "opacity-0 invisible translate-y-4 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="bg-[#075E54] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#075E54] font-bold">
              RM
            </div>
            <div>
              <p className="font-semibold text-white text-sm md:text-base">Ratnamik Metal India</p>
              <p className="text-xs text-green-200">online</p>
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="text-white/80 hover:text-white transition-colors p-1 bg-white/10 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div
          className="p-4 flex flex-col gap-3 max-h-[250px] md:max-h-[300px] overflow-y-auto"
          style={{
            backgroundColor: "#efeae2",
            backgroundImage: "url('/whatsapp-pattern.png')",
          }}
        >
          <div className="self-start bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
            <p className="text-sm text-gray-800">
              Hey! How can we help you?
            </p>
            <p className="text-[10px] text-gray-400 mt-1 text-right">
              Just now
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 flex gap-2 items-center bg-[#eae9e9] border-t">
          <input
            type="text"
            placeholder="Type a message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="flex-grow px-4 py-2 rounded-full border bg-white outline-none text-sm"
          />
          <a
            href={whatsappUrl + encodeURIComponent(userMessage || defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] p-3 rounded-full flex items-center justify-center hover:scale-105 transition"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main WhatsApp Icon - ENLARGED FOR MOBILE (w-36) */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-36 h-36 md:w-40 md:h-40 transition-transform duration-300 hover:scale-105 active:scale-95 outline-none"
      >
        <Image
          src="/Whatsapp-icon-.avif" 
          alt="WhatsApp Chat"
          fill
          className="object-contain"
          priority
        />
      </button>

    </div>
  );
}