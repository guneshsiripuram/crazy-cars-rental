'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Car } from '@/lib/types';
import { Fuel, Settings2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface LiveVehicleTickerProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

export default function LiveVehicleTicker({ cars, onSelectCar }: LiveVehicleTickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Triple array for infinite looping
  const displayCars = cars.length > 0 ? [...cars, ...cars, ...cars] : [];

  // Auto-scroll effect that runs continuously on page load
  useEffect(() => {
    if (cars.length === 0) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!isPaused && container) {
        container.scrollLeft += 1.2;

        // Reset scroll position seamlessly when reaching half of the scroll width
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }
      }
    }, 20); // 50fps smooth scroll

    return () => clearInterval(interval);
  }, [isPaused, cars]);

  // Pause auto-scroll temporarily when user touches or swipes
  const pauseAutoScroll = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    
    // Resume auto-scroll after 3.5 seconds of user inactivity
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3500);
  };

  if (cars.length === 0) return null;

  const scrollLeft = () => {
    pauseAutoScroll();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    pauseAutoScroll();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 sm:pt-28 pb-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative border-b-2 border-primary/40 shadow-2xl overflow-hidden">
      
      {/* Background Subtle Glowing Grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#60a5fa_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between gap-4 relative z-10">
        
        {/* Live Header */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
          </span>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-400/20">
              Live Fleet Preview
            </span>
            <h3 className="text-base sm:text-xl font-black text-white tracking-tight leading-tight mt-1">
              Auto-Live Vehicles • Swipe to Explore
            </h3>
          </div>
        </div>

        {/* Desktop Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-primary text-white border border-white/20 flex items-center justify-center transition-all shadow-md active:scale-95 backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-primary text-white border border-white/20 flex items-center justify-center transition-all shadow-md active:scale-95 backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Swipeable & Auto-scrolling Track */}
      <div className="relative w-full">
        
        {/* Left & Right Smooth Edge Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-indigo-950 via-indigo-950/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Auto + Manual Touch Swipe Container */}
        <div
          ref={scrollContainerRef}
          onTouchStart={pauseAutoScroll}
          onTouchMove={pauseAutoScroll}
          onMouseDown={pauseAutoScroll}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={() => setIsPaused(false)}
          onWheel={pauseAutoScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none px-4 sm:px-8 py-2 relative z-10 touch-pan-x cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCars.map((car, index) => (
            <div
              key={`${car.id}-${index}`}
              onClick={() => onSelectCar(car)}
              className="w-64 sm:w-72 shrink-0 bg-white text-slate-900 rounded-2xl border-t-4 border-t-primary border-x border-b border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between group overflow-hidden select-none"
            >
              <div>
                {/* Car Image Header */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
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
                      12h: ₹{(car.price12hr || car.priceHour * 12).toLocaleString('en-IN')}
                    </span>
                    <span className="bg-primary/90 text-white px-2.5 py-1 rounded-lg text-xs font-black border border-white/20 shadow">
                      24h: ₹{(car.price24hr || car.priceDay).toLocaleString('en-IN')}
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
