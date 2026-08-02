'use client';

import React from 'react';
import { DollarSign, Sparkles, ShieldCheck, CalendarRange, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Competitive hourly, daily, weekly, and monthly rates with transparent pricing and no hidden extra charges.',
      badge: 'Best Rates'
    },
    {
      icon: Sparkles,
      title: 'Clean & Maintained Cars',
      description: 'Every vehicle undergoes thorough multi-point safety checks and deep sanitization before key handover.',
      badge: '100% Sanitized'
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Self Drive Rentals',
      description: 'Verified fleet with complete insurance documentation, seamless booking, and 24/7 emergency roadside help.',
      badge: 'Trusted Choice'
    },
    {
      icon: CalendarRange,
      title: 'Flexible Rental Plans',
      description: 'Whether you need a car for 4 hours or 4 months, customize your duration with easy pick-up in Visakhapatnam.',
      badge: 'Custom Hours'
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-slate-50/80 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            The Crazy Cars Advantage
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We provide a premium self-drive experience tailored for your comfort, convenience, and complete peace of mind.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 border-t-4 border-t-primary border-x border-b border-slate-200/80 shadow-[0_8px_30px_rgb(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title with Checkmark */}
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <h3 className="text-lg font-extrabold text-secondary tracking-tight">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
