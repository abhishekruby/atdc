'use client';
import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our AI Receptionist on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 right-8 z-[60] flex items-center gap-3 group"
    >
      {/* Label pill */}
      <div
        className={`bg-white text-[#128C7E] text-xs font-bold px-3 py-2 rounded-xl shadow-lg border border-green-100 whitespace-nowrap transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        AI Receptionist for<br />
        <span className="text-[#075E54]">Acharya Tulsi Diagnostic Centre</span>
      </div>

      {/* WhatsApp button */}
      <div className="bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0px_12px_32px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all">
        {/* WhatsApp SVG icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.466 2.02 7.76L0 32l8.476-2.001A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.758-1.843l-.484-.287-5.03 1.188 1.205-4.897-.315-.5A13.249 13.249 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667c7.364 0 13.333 5.97 13.333 13.333 0 7.364-5.969 13.333-13.333 13.333zm7.307-9.987c-.4-.2-2.368-1.168-2.735-1.302-.367-.133-.634-.2-.9.2-.267.4-1.035 1.302-1.268 1.569-.234.267-.467.3-.867.1-.4-.2-1.688-.622-3.215-1.983-1.188-1.059-1.99-2.367-2.223-2.767-.234-.4-.025-.616.176-.815.18-.178.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.234-2.967-.325-.778-.656-.672-.9-.684l-.767-.013c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.334 0 1.967 1.433 3.867 1.633 4.134.2.267 2.82 4.3 6.832 6.031.955.412 1.7.658 2.283.843.959.305 1.832.262 2.521.159.769-.115 2.368-.969 2.702-1.902.333-.934.333-1.734.233-1.902-.1-.167-.367-.267-.767-.467z"/>
        </svg>
      </div>
    </a>
  );
}
