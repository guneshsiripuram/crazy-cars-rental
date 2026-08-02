'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Phone, Menu, X, ShieldCheck, MessageCircle } from 'lucide-react';
import { WebsiteSettings } from '@/lib/types';

interface NavbarProps {
  settings: WebsiteSettings;
  onOpenBookingModal?: () => void;
}

export default function Navbar({ settings, onOpenBookingModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/91${settings.whatsapp}?text=${encodeURIComponent('Hello Crazy Cars, I would like to inquire about renting a self-drive car.')}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-xl ${
      isScrolled ? 'py-3 shadow-2xl' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Circular Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/40 shadow-md group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center shrink-0">
              <img
                src="/crazy-cars-logo.png"
                alt="Crazy Cars Self Drive Rental Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white leading-none">
                CRAZY CARS
              </span>
              <span className="text-[10px] font-extrabold tracking-widest text-blue-400 uppercase mt-1">
                Self Drive Rental
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors py-1">Home</a>
            <a href="#fleet" className="hover:text-white transition-colors py-1">Cars</a>
            <a href="#why-us" className="hover:text-white transition-colors py-1">Why Us</a>
            <a href="#gallery" className="hover:text-white transition-colors py-1">Gallery</a>
            <a href="#location" className="hover:text-white transition-colors py-1">Location</a>
            <a href="#contact" className="hover:text-white transition-colors py-1">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:+91${settings.phone}`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{settings.phone}</span>
            </a>

            <button
              onClick={onOpenBookingModal}
              className="bg-primary hover:bg-blue-600 text-white text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-md hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Now
            </button>

            <Link
              href="/admin"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
              title="Admin CMS"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenBookingModal}
              className="bg-primary text-white text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-5 pt-3 pb-6 space-y-4 shadow-2xl text-white">
          <nav className="flex flex-col space-y-3 text-base font-semibold text-slate-200">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-800/80"
            >
              Home
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-800/80"
            >
              Our Fleet
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-800/80"
            >
              Why Choose Us
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-800/80"
            >
              Gallery
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-800/80"
            >
              Location & Map
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-800/80"
            >
              Contact Us
            </a>
          </nav>
          
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-success text-white font-extrabold py-3 rounded-xl shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-success" />
              <span>Book on WhatsApp</span>
            </a>
            <div className="flex justify-between items-center pt-2 text-xs text-slate-400">
              <span>Call Direct: {settings.phone}</span>
              <Link href="/admin" className="text-blue-400 font-bold underline">
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
