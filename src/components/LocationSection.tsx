'use client';

import React from 'react';
import { WebsiteSettings } from '@/lib/types';
import { MapPin, Navigation, Clock, Building2, Compass } from 'lucide-react';

interface LocationSectionProps {
  settings: WebsiteSettings;
}

export default function LocationSection({ settings }: LocationSectionProps) {
  const mapDirectionsUrl = settings.mapUrl?.includes('google.com/maps/place')
    ? settings.mapUrl
    : 'https://www.google.com/maps/place/Crazy+cars+self+drive+rental/@17.6876529,83.2201184,946m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a3969e620d16e49:0xd6f2a48922d19ec7!8m2!3d17.687653!4d83.2249893!16s%2Fg%2F11n4tbmjy9?entry=ttu';

  const embedUrl = 'https://maps.google.com/maps?q=17.687653,83.2249893&z=17&output=embed';

  return (
    <section id="location" className="py-16 md:py-24 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            Our Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Visit Our Gajuwaka Hub
          </h2>
          <p className="text-base text-slate-600">
            Conveniently located near Gajuwaka Bus Depot and MRO Office in Visakhapatnam for quick car pick-up and drop-off.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Address Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border-t-4 border-t-primary border-x border-b border-slate-200/90 shadow-[0_10px_30px_rgb(15,23,42,0.08)] flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-secondary tracking-tight">
                    Crazy Cars Main Hub
                  </h3>
                  <p className="text-xs font-semibold text-primary">Gajuwaka, Visakhapatnam</p>
                </div>
              </div>

              {/* Exact Address Box */}
              <div className="p-5 bg-white rounded-2xl border border-border space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-secondary">Office Address:</p>
                    <p className="leading-relaxed font-medium">
                      Mulagada Housing Colony,<br />
                      Gajuwaka Bus Depot Road,<br />
                      Near Hanuman Temple,<br />
                      Opposite MRO Office,<br />
                      Gajuwaka, Visakhapatnam,<br />
                      Andhra Pradesh — 530026
                    </p>
                  </div>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="p-4 bg-white rounded-2xl border border-border flex items-center gap-3 text-xs text-slate-600">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-secondary">Operating Hours</p>
                  <p>Open 7 Days a Week: 6:00 AM – 11:00 PM</p>
                </div>
              </div>

              {/* Landmark Note */}
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-center gap-3 text-xs text-slate-700">
                <Compass className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-primary">Landmark Guide</p>
                  <p>Right opposite MRO Office & 2 mins from Gajuwaka Depot Road.</p>
                </div>
              </div>

            </div>

            {/* Directions Button */}
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-6 rounded-2xl shadow-subtle hover:shadow-card-hover transition-all text-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>

          </div>

          {/* Right Embedded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-border shadow-card min-h-[380px] bg-slate-100 relative">
            <iframe
              title="Crazy Cars Self Drive Rental Gajuwaka Visakhapatnam Map"
              src={settings.mapUrl?.includes('output=embed') ? settings.mapUrl : embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
