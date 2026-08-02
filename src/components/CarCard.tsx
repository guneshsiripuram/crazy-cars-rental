'use client';

import React from 'react';
import { Car } from '@/lib/types';
import { Fuel, Gauge, Users, Settings2, MessageCircle, Phone, CalendarCheck2, Compass } from 'lucide-react';

interface CarCardProps {
  car: Car;
  whatsappNumber: string;
  phoneNumber: string;
  onBookNow: (car: Car) => void;
}

export default function CarCard({ car, whatsappNumber, phoneNumber, onBookNow }: CarCardProps) {
  const isAvailable = car.status === 'Available';
  const isBooked = car.status === 'Booked';

  const price12 = car.price12hr || (car.priceHour * 12);
  const price24 = car.price24hr || car.priceDay;
  const km12 = car.kmLimit12hr || 150;
  const km24 = car.kmLimit24hr || 250;
  const excessKm = car.excessKmRate || 6;
  const extraHr = car.extraHrRate || 170;
  const ghatCharge = car.seats >= 7 ? 700 : 500;

  const whatsappMessage = encodeURIComponent(
    `Hello Crazy Cars! I want to inquire about renting the ${car.name} (12 Hrs: ₹${price12}, 24 Hrs: ₹${price24}). Please share availability.`
  );
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className={`bg-white rounded-2xl border-t-4 border-t-primary border-x border-b border-slate-200/90 shadow-[0_8px_30px_rgb(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.16)] transition-all duration-300 overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1 ${
      !car.enabled ? 'opacity-60 grayscale-[0.3]' : ''
    }`}>
      
      <div>
        {/* Car Image Header */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={car.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop'}
            alt={car.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-md ${
              isAvailable
                ? 'bg-emerald-500 text-white'
                : isBooked
                ? 'bg-amber-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
              {car.status}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-extrabold px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
              {car.type}
            </span>
          </div>

          {/* Price Highlight Banner (12 HRS & 24 HRS) */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
            <div>
              <p className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">12 HRS ({km12} KM)</p>
              <p className="text-xl font-black tracking-tight text-white drop-shadow-sm">
                ₹{price12.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right bg-primary/90 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 shadow-md">
              <p className="text-[9px] uppercase font-bold text-blue-100">24 HRS ({km24} KM)</p>
              <p className="text-sm font-black text-white">
                ₹{price24.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          
          {/* Brand & Name */}
          <div>
            <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">{car.brand}</span>
            <h3 className="text-xl font-extrabold text-secondary tracking-tight leading-tight mt-1.5">
              {car.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">{car.model}</p>
          </div>

          {/* Specifications Pills */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-primary shrink-0" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-primary shrink-0" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary shrink-0" />
              <span>{car.seats} Seater</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-primary shrink-0" />
              <span>{car.mileage}</span>
            </div>
          </div>

          {/* Official Rental Rates Breakdown */}
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 space-y-2 text-xs font-semibold">
            <div className="flex justify-between items-center text-slate-700 border-b border-blue-200/60 pb-1.5">
              <span>12 Hours Limit ({km12} KM):</span>
              <span className="font-extrabold text-secondary text-sm">₹{price12.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 border-b border-blue-200/60 pb-1.5">
              <span>24 Hours Limit ({km24} KM):</span>
              <span className="font-extrabold text-primary text-sm">₹{price24.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 text-[11px]">
              <span>Excess KM Charge:</span>
              <span className="font-bold text-slate-900">₹{excessKm} / km</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 text-[11px]">
              <span>Extra Hour Charge:</span>
              <span className="font-bold text-slate-900">₹{extraHr} / hr</span>
            </div>
          </div>

          {/* Ghat Road Charge Note */}
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center gap-2 text-[11px] text-amber-900 font-semibold">
            <Compass className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Ghat Road Charges: ₹{ghatCharge}/day ({car.seats} Seater)</span>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-success hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-2 rounded-xl transition-colors text-center"
          >
            <MessageCircle className="w-4 h-4 fill-white text-success shrink-0" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:+91${phoneNumber}`}
            className="flex items-center justify-center gap-1.5 bg-secondary hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-2 rounded-xl transition-colors text-center"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>Call</span>
          </a>
        </div>

        <button
          onClick={() => onBookNow(car)}
          disabled={!isAvailable || !car.enabled}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
            isAvailable && car.enabled
              ? 'bg-primary hover:bg-primary-hover text-white shadow-subtle hover:shadow-md'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <CalendarCheck2 className="w-4 h-4" />
          <span>{isAvailable && car.enabled ? 'Send Booking Enquiry' : car.status}</span>
        </button>
      </div>

    </div>
  );
}
