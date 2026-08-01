'use client';

import React, { useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { Maximize2, X, Image as ImageIcon } from 'lucide-react';

interface GallerySectionProps {
  items: GalleryItem[];
}

export default function GallerySection({ items }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Fleet', 'Exterior', 'Interior'];

  const filteredItems = items.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50/60 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            Fleet Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Take a Look at Our Sanitized Fleet
          </h2>
          <p className="text-base text-slate-600">
            Real photos of our well-maintained vehicles ready for your next road trip across Andhra Pradesh.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-subtle'
                  : 'bg-white text-slate-600 border border-border hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="relative h-64 rounded-2xl overflow-hidden bg-slate-200 border border-border shadow-card hover:shadow-card-hover group cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <span className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary-light">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold truncate">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 space-y-4 p-4 text-white">
            <div className="relative max-h-[75vh] h-[500px] w-full rounded-2xl overflow-hidden">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-4 pb-2 flex justify-between items-center text-sm">
              <div>
                <h3 className="font-extrabold text-lg text-white">{activeLightbox.title}</h3>
                <p className="text-xs text-slate-400">Category: {activeLightbox.category}</p>
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
