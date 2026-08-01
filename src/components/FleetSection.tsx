'use client';

import React, { useState, useMemo } from 'react';
import { Car, WebsiteSettings } from '@/lib/types';
import CarCard from './CarCard';
import { Search, Filter, RefreshCw, Car as CarIcon, AlertCircle } from 'lucide-react';

interface FleetSectionProps {
  cars: Car[];
  settings: WebsiteSettings;
  onBookNow: (car: Car) => void;
}

export default function FleetSection({ cars, settings, onBookNow }: FleetSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('All');
  const [selectedFuel, setSelectedFuel] = useState<string>('All');

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Search matches name, brand, or model
      const matchesSearch = 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'All' || car.status === selectedStatus;
      const matchesType = selectedType === 'All' || car.type === selectedType;
      const matchesTransmission = selectedTransmission === 'All' || car.transmission === selectedTransmission;
      const matchesFuel = selectedFuel === 'All' || car.fuel === selectedFuel;

      return matchesSearch && matchesStatus && matchesType && matchesTransmission && matchesFuel;
    });
  }, [cars, searchTerm, selectedStatus, selectedType, selectedTransmission, selectedFuel]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedType('All');
    setSelectedTransmission('All');
    setSelectedFuel('All');
  };

  return (
    <section id="fleet" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            Our Premium Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Explore Available Self Drive Cars
          </h2>
          <p className="text-base text-slate-600">
            Choose from hatchbacks, luxury sedans, 4x4 SUVs, and spacious MPVs. Fully insured & ready to drive.
          </p>
        </div>

        {/* Search & Filter Bar Controls */}
        <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-subtle mb-10 space-y-4">
          
          {/* Top Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by car name, brand (e.g. Swift, Fortuner, Thar, Creta)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-secondary placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-secondary"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Selects Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            
            {/* Status Filter */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2.5 bg-white border border-border rounded-xl font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available Only</option>
                <option value="Booked">Already Rented</option>
                <option value="In Service">In Service</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Body Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2.5 bg-white border border-border rounded-xl font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
              >
                <option value="All">All Body Types</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV / MPV</option>
              </select>
            </div>

            {/* Transmission Filter */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Transmission</label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full p-2.5 bg-white border border-border rounded-xl font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
              >
                <option value="All">All Transmissions</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Fuel Filter */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Fuel Type</label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full p-2.5 bg-white border border-border rounded-xl font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
              >
                <option value="All">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

          </div>

          {/* Active Filter Indicators & Reset Button */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-border">
            <span>Showing <strong className="text-secondary">{filteredCars.length}</strong> of {cars.length} vehicles</span>
            
            {(searchTerm || selectedStatus !== 'All' || selectedType !== 'All' || selectedTransmission !== 'All' || selectedFuel !== 'All') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-primary font-semibold hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                whatsappNumber={settings.whatsapp}
                phoneNumber={settings.phone}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border border-border space-y-4 max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-secondary">No matching vehicles found</h3>
            <p className="text-sm text-slate-500">Try broadening your search query or reset filters.</p>
            <button
              onClick={resetFilters}
              className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
