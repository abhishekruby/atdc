"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Home Collection', href: '/home-collection' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Test Prices', href: '/test-prices' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 h-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Acharya Tulsi Diagnostic Centre"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-x-7 text-sm tracking-tight">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-primary font-extrabold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : 'text-slate-600 hover:text-primary font-medium'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/book"
            className="bg-secondary text-on-secondary px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-container-low transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'}`}>
        <div className="flex flex-col px-4 py-4 gap-1 bg-white">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-slate-600 hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-secondary text-on-secondary px-5 py-3 rounded-xl font-semibold text-sm text-center hover:opacity-90 transition-all"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
}
