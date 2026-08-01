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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-header shadow-subtle border-b border-border py-3' : 'bg-white/90 backdrop-blur-md py-4 border-b border-border/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Circular Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-md group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center shrink-0">
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
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-secondary leading-none">
                CRAZY CARS
              </span>
              <span className="text-[10px] font-bold tracking-wider text-primary uppercase mt-0.5">
                Self Drive Rental
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#hero" className="hover:text-primary transition-colors py-1">Home</a>
            <a href="#fleet" className="hover:text-primary transition-colors py-1">Cars</a>
            <a href="#why-us" className="hover:text-primary transition-colors py-1">Why Us</a>
            <a href="#gallery" className="hover:text-primary transition-colors py-1">Gallery</a>
            <a href="#location" className="hover:text-primary transition-colors py-1">Location</a>
            <a href="#contact" className="hover:text-primary transition-colors py-1">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:+91${settings.phone}`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-secondary hover:text-primary bg-card hover:bg-slate-100 border border-border rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{settings.phone}</span>
            </a>

            <button
              onClick={onOpenBookingModal}
              className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-subtle hover:shadow-card-hover transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Now
            </button>

            <Link
              href="/admin"
              className="p-2.5 text-slate-400 hover:text-secondary hover:bg-slate-100 rounded-xl transition-colors"
              title="Admin CMS"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenBookingModal}
              className="bg-primary text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-700">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-100"
            >
              Home
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-100"
            >
              Our Fleet
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-100"
            >
              Why Choose Us
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-100"
            >
              Gallery
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-100"
            >
              Location & Map
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary py-1 border-b border-slate-100"
            >
              Contact Us
            </a>
          </nav>
          
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-success text-white font-semibold py-2.5 rounded-xl"
            >
              <MessageCircle className="w-4 h-4 fill-white text-success" />
              <span>Book on WhatsApp</span>
            </a>
            <div className="flex justify-between items-center pt-2 text-xs text-slate-500">
              <span>Call Direct: {settings.phone}</span>
              <Link href="/admin" className="text-primary font-semibold underline">
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
