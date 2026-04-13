'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-[#F1F4F9] w-full rounded-t-[2rem] mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/logo.png"
              alt="ATDC Full Logo"
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Precision diagnostics you can trust. Serving Surat with excellence since 1997.
            </p>
          </div>

          {/* Our Branches */}
          <div>
            <h4 className="font-bold text-[#00103E] mb-5 text-sm uppercase tracking-wider">Our Branches</h4>
            <ul className="space-y-3">
              {['Udhna', 'Pandesara', 'Bhestan', 'Sachin', 'Godadara'].map(branch => (
                <li key={branch}>
                  <a
                    href={`https://maps.google.com/?q=${branch}+Surat`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00677D] text-sm hover:underline flex items-center gap-1.5 transition-all hover:translate-x-1 duration-200"
                  >
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {branch} Branch
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#00103E] mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Services', href: '/services' },
                { label: 'Doctor Profiles', href: '/doctors' },
                { label: 'Test Prices', href: '/test-prices' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#00677D] text-sm hover:underline hover:translate-x-1 transition-all duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#00103E] mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">location_on</span>
                <p className="text-sm text-slate-500 leading-snug">Main Office, Udhna Magdalla Road, Surat, Gujarat</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[18px]">call</span>
                <a href="tel:+912611234567" className="text-sm text-slate-500 hover:text-secondary transition-colors">+91 261 1234567</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[18px]">mail</span>
                <a href="mailto:udhnatyp@gmail.com" className="text-sm text-slate-500 hover:text-secondary transition-colors">udhnatyp@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
                <p className="text-sm text-slate-500">Mon – Sun: 7:00 AM – 9:00 PM</p>
              </div>
              <Link
                href="/book"
                className="inline-block mt-2 bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {mounted ? new Date().getFullYear() : '2025'} Acharya Tulsi Diagnostic Centre. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
