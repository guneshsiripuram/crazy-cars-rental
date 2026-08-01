'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, Phone, MessageCircle, Instagram, ShieldCheck, X } from 'lucide-react';
import { WebsiteSettings } from '@/lib/types';

interface FooterProps {
  settings: WebsiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const instagramUrl = `https://instagram.com/${settings.instagram}`;

  return (
    <footer className="bg-secondary text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 bg-white flex items-center justify-center shrink-0">
                <img
                  src="/crazy-cars-logo.png"
                  alt="Crazy Cars Self Drive Rental Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                CRAZY CARS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.footerText || 'Premium self-drive car rental service providing clean, well-maintained, affordable cars in Visakhapatnam.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/91${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:+91${settings.phone}`}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><a href="#hero" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#fleet" className="hover:text-primary transition-colors">Our Fleet & Cars</a></li>
              <li><a href="#why-us" className="hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">Vehicle Gallery</a></li>
              <li><a href="#location" className="hover:text-primary transition-colors">Location & Map</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Details</a></li>
            </ul>
          </div>

          {/* Policy & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Policies & Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => setActiveModal('privacy')} className="hover:text-primary transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('terms')} className="hover:text-primary transition-colors text-left">
                  Terms & Conditions
                </button>
              </li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Customer Contact</a></li>
              <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram Feed</a></li>
              <li>
                <Link href="/admin" className="text-primary font-bold hover:underline flex items-center gap-1 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin CMS Access</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Summary */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Gajuwaka Hub</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {settings.address}
            </p>
            <p className="text-xs font-bold text-white">Phone: +91 {settings.phone}</p>
            <p className="text-xs text-slate-400">WhatsApp: +91 {settings.whatsapp}</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Crazy Cars Self Drive Rental. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-slate-300">Privacy</button>
            <span>•</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-slate-300">Terms</button>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-300">Admin Login</Link>
          </div>
        </div>

      </div>

      {/* Modal for Privacy & Terms */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-secondary max-w-lg w-full rounded-3xl p-6 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-extrabold text-lg">
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {activeModal === 'privacy' ? (
                <>
                  <p><strong>1. Information Collection:</strong> Crazy Cars Self Drive Rental respects your privacy. We only collect essential customer details required for driving verification and rental agreements (e.g., Name, Phone Number, Driving License proof).</p>
                  <p><strong>2. Data Usage:</strong> Your contact information is never sold to third parties and is solely used to verify bookings, coordinate car pickup in Visakhapatnam, and provide customer support.</p>
                  <p><strong>3. Security:</strong> We implement standard administrative security protocols to keep customer enquiry records confidential.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Driver Requirements:</strong> Renter must possess a valid Original Indian Driving License and Aadhaar Card / ID proof at car pick-up time.</p>
                  <p><strong>2. Fuel Policy:</strong> Vehicles are delivered with sufficient fuel and should be returned with the equivalent fuel level.</p>
                  <p><strong>3. Usage Limits:</strong> Vehicles are intended for legal self-drive travel within designated state limits. Commercial passenger transport or illegal activities are strictly prohibited.</p>
                  <p><strong>4. Security Deposit:</strong> Standard refundable security deposit and ID verification apply upon pickup.</p>
                </>
              )}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
