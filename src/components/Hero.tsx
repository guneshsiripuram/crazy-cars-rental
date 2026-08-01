'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle, Phone, ShieldCheck, Sparkles, Clock, Car } from 'lucide-react';
import { WebsiteSettings } from '@/lib/types';

interface HeroProps {
  settings: WebsiteSettings;
  onOpenBookingModal?: () => void;
}

export default function Hero({ settings, onOpenBookingModal }: HeroProps) {
  const whatsappUrl = `https://wa.me/91${settings.whatsapp}?text=${encodeURIComponent('Hello Crazy Cars, I would like to rent a self drive car in Visakhapatnam.')}`;

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badge Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span>#1 Rated Self Drive Car Rental in Visakhapatnam</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-secondary tracking-tight leading-[1.12]">
              {settings.heroTitle || 'Drive Your Dream Car Today'}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-semibold text-primary">
              {settings.heroSubtitle || 'Reliable Self Drive Car Rental in Visakhapatnam'}
            </p>

            {/* Intro Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {settings.heroIntro || 'Premium self-drive car rental service providing clean, well-maintained, affordable cars for daily, weekly, monthly and hourly rentals.'}
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-secondary">Zero Hassle</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-secondary">Hourly / Daily</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border">
                <Car className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-secondary">Well Maintained</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-success hover:bg-emerald-600 text-white text-base font-semibold px-7 py-3.5 rounded-xl shadow-subtle hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white text-success" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={`tel:+91${settings.phone}`}
                className="flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold px-7 py-3.5 rounded-xl shadow-subtle hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now: {settings.phone}</span>
              </a>
            </div>

            {/* Simple Trust Assurance */}
            <div className="pt-2 flex items-center gap-6 text-xs font-medium text-slate-500">
              <span>✓ Clean & Sanitized Cars</span>
              <span>✓ 24/7 Roadside Assistance</span>
              <span>✓ Easy Pick-up at Gajuwaka</span>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-border bg-card p-2 group">
              <div className="relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                  alt="Crazy Cars Self Drive Rental Visakhapatnam"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">Featured Vehicle</p>
                      <p className="text-base font-extrabold text-secondary">Toyota Fortuner Legender</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Starting from</p>
                      <p className="text-lg font-bold text-secondary">₹3,500 <span className="text-xs font-normal text-slate-500">/day</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Pill */}
            <div className="absolute -top-4 -right-4 bg-white border border-border shadow-card p-3 rounded-2xl hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary">Instant Approval</p>
                <p className="text-[11px] text-slate-500">Zero Paperwork Delay</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
