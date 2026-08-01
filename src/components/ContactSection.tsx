'use client';

import React from 'react';
import { WebsiteSettings } from '@/lib/types';
import { Phone, MessageCircle, Instagram, Mail, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  settings: WebsiteSettings;
  onOpenBookingModal?: () => void;
}

export default function ContactSection({ settings, onOpenBookingModal }: ContactSectionProps) {
  const whatsappUrl = `https://wa.me/91${settings.whatsapp}?text=${encodeURIComponent('Hello Crazy Cars, I would like to make an inquiry.')}`;
  const instagramUrl = `https://instagram.com/${settings.instagram}`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50/60 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Contact Crazy Cars Rental
          </h2>
          <p className="text-base text-slate-600">
            Have questions about pricing, car availability, or long-term packages? Reach out to us directly.
          </p>
        </div>

        {/* 3 Contact Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Phone Call Card */}
          <div className="bg-white p-7 rounded-3xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Hotline</span>
                <h3 className="text-xl font-extrabold text-secondary mt-1">Call Us Anytime</h3>
                <p className="text-sm text-slate-600 mt-2">Instant vehicle booking confirmation & assistance.</p>
              </div>
            </div>
            <a
              href={`tel:+91${settings.phone}`}
              className="mt-6 flex items-center gap-2 text-primary font-extrabold text-base hover:underline"
            >
              <span>+91 {settings.phone}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white p-7 rounded-3xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">WhatsApp Support</span>
                <h3 className="text-xl font-extrabold text-secondary mt-1">Chat on WhatsApp</h3>
                <p className="text-sm text-slate-600 mt-2">Send car photo requests, rates, & identity proof.</p>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-emerald-600 font-extrabold text-base hover:underline"
            >
              <span>+91 {settings.whatsapp}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Instagram Card */}
          <div className="bg-white p-7 rounded-3xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Follow Us</span>
                <h3 className="text-xl font-extrabold text-secondary mt-1">Instagram Page</h3>
                <p className="text-sm text-slate-600 mt-2">Check latest fleet videos, customer reviews, and offers.</p>
              </div>
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-pink-600 font-extrabold text-sm hover:underline truncate"
            >
              <span>@{settings.instagram}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>

        </div>

        {/* CTA Banner Box */}
        <div className="bg-secondary rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Book Your Self Drive Car?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Clean vehicles, unlimited memories. Contact Crazy Cars today and hit the open road in Visakhapatnam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenBookingModal}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-7 py-3.5 rounded-xl shadow-subtle hover:shadow-lg transition-all"
            >
              Book Car Now
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-subtle flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
              <span>WhatsApp Quick Book</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
