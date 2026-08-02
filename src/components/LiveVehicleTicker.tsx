'use client';

import React from 'react';
import { Car } from '@/lib/types';
import { Fuel, Settings2, Sparkles, ArrowRight, CalendarCheck2 } from 'lucide-react';

interface LiveVehicleTickerProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

export default function LiveVehicleTicker({ cars, onSelectCar }: LiveVehicleTickerProps) {
  // Duplicate array for seamless infinite marquee loop
  const displayCars = cars.length > 0 ? [...cars, ...cars] : [];

  if (cars.length === 0) return null;

  return (
    <section className="py-10 bg-slate-900 text-white overflow-hidden relative border-y border-slate-800">
      
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary-light">
              Live Fleet Preview
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Vehicles Ready For Instant Booking
            </h3>
          </div>
        </div>

        <a
          href="#fleet"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
        >
          <span>Explore All Vehicles</span>
          <ArrowRight className="w-4 h-4 text-primary" />
        </a>
      </div>

      {/* Ticker Container with Pause on Hover */}
      <div className="relative w-full overflow-hidden py-2 group">
        
        {/* Left/Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 animate-ticker group-hover:[animation-play-state:paused] w-max">
          {displayCars.map((car, index) => (
            <div
              key={`${car.id}-${index}`}
              onClick={() => onSelectCar(car)}
              className="w-72 shrink-0 bg-slate-800/90 hover:bg-slate-800 rounded-2xl p-4 border border-slate-700/80 shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Car Image Header */}
                <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                      car.status === 'Available' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-[10px] font-bold text-white">
                    ₹{car.priceDay}/day
                  </div>
                </div>

                {/* Info */}
                <div>
                  <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider">{car.brand}</span>
                  <h4 className="text-base font-extrabold text-white truncate">{car.name}</h4>
                </div>

                {/* Specs Pill */}
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                  <span className="flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-primary" />
                    {car.fuel}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Settings2 className="w-3.5 h-3.5 text-primary" />
                    {car.transmission}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-700/60 mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">₹{car.priceHour}/hr</span>
                <span className="font-bold text-primary text-xs flex items-center gap-1 group-hover:underline">
                  <CalendarCheck2 className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
