'use client';

import React from 'react';
import { Car } from '@/lib/types';
import { Fuel, Gauge, Users, Settings2, MessageCircle, Phone, CalendarCheck2, Clock } from 'lucide-react';

interface CarCardProps {
  car: Car;
  whatsappNumber: string;
  phoneNumber: string;
  onBookNow: (car: Car) => void;
}

export default function CarCard({ car, whatsappNumber, phoneNumber, onBookNow }: CarCardProps) {
  const isAvailable = car.status === 'Available';
  const isBooked = car.status === 'Booked';
  const isInService = car.status === 'In Service';

  const whatsappMessage = encodeURIComponent(
    `Hello Crazy Cars! I want to inquire about renting the ${car.name} (${car.fuel}, ${car.transmission}). Please share availability details.`
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-80" />

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

          {/* Price Highlight Banner */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Daily Rate</p>
              <p className="text-xl font-black tracking-tight text-white drop-shadow-sm">₹{car.priceDay.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-200">/day</span></p>
            </div>
            <div className="text-right bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
              <p className="text-[9px] uppercase font-bold text-slate-300">Hourly Rate</p>
              <p className="text-xs font-bold text-white">₹{car.priceHour} /hr</p>
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

          {/* Rental Pricing Grid Breakdown */}
          <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 space-y-1.5 text-xs font-semibold">
            <div className="flex justify-between items-center text-slate-600">
              <span>Weekly Pack:</span>
              <span className="font-extrabold text-secondary">₹{car.priceWeek.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Monthly Pack:</span>
              <span className="font-extrabold text-primary">₹{car.priceMonth.toLocaleString('en-IN')}</span>
            </div>
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
          <span>{isAvailable && car.enabled ? 'Send Enquiry Form' : car.status}</span>
        </button>
      </div>

    </div>
  );
}
