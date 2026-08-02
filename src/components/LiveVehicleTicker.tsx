'use client';

import React, { useRef } from 'react';
import { Car } from '@/lib/types';
import { Fuel, Settings2, ArrowRight, CalendarCheck2, ChevronLeft, ChevronRight } from 'lucide-react';

interface LiveVehicleTickerProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

export default function LiveVehicleTicker({ cars, onSelectCar }: LiveVehicleTickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (cars.length === 0) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-slate-900 text-white relative border-y border-slate-800 shadow-2xl">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex items-center justify-between gap-4 relative z-10">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400">
              Live Fleet Preview
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
              Swipe & Explore Vehicles Ready For Instant Rent
            </h3>
          </div>
        </div>

        {/* Mobile / Laptop Scroll Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Swipeable & Auto-scrolling Track */}
      <div className="relative w-full">
        
        {/* Left / Right Smooth Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />

        {/* Touch Pan / Swipeable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory px-4 sm:px-8 py-2 relative z-10 scroll-smooth touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => onSelectCar(car)}
              className="w-64 sm:w-72 shrink-0 snap-start bg-white text-slate-900 rounded-2xl border-t-4 border-t-primary border-x border-b border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Car Image Banner */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                      car.status === 'Available' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-extrabold border border-white/20">
                    {car.type}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end text-white">
                    <span className="bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-xs font-black drop-shadow">
                      ₹{car.priceDay.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-slate-200">/day</span>
                    </span>
                    <span className="bg-primary/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                      ₹{car.priceHour}/hr
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-3.5 space-y-2.5">
                  <div>
                    <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                      {car.brand}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 truncate mt-1">
                      {car.name}
                    </h4>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
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
              </div>

              {/* Action Button */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-500">Self Drive</span>
                <span className="font-extrabold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
