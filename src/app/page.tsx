'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import FleetSection from '@/components/FleetSection';
import BookingModal from '@/components/BookingModal';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Car, WebsiteSettings, GalleryItem } from '@/lib/types';

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>({
    phone: '7337422124',
    whatsapp: '7337422124',
    instagram: 'crazy_cars_self_drive_rental_',
    address: 'Mulagada Housing Colony, Gajuwaka Bus Depot Road, Near Hanuman Temple, Opposite MRO Office, Gajuwaka, Visakhapatnam, AP 530026',
    mapUrl: 'https://maps.google.com/maps?q=17.6974,83.2100&z=15&output=embed',
    heroTitle: 'Drive Your Dream Car Today',
    heroSubtitle: 'Reliable Self Drive Car Rental in Visakhapatnam',
    heroIntro: 'Premium self-drive car rental service providing clean, well-maintained, affordable cars for daily, weekly, monthly and hourly rentals.',
    footerText: '© Crazy Cars Self Drive Rental. All rights reserved. Premium Self-Drive Rental Services in Visakhapatnam.'
  });
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    // Fetch Cars
    fetch('/api/cars')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCars(data.data);
        }
      })
      .catch(console.error);

    // Fetch Settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSettings(data.data);
        }
      })
      .catch(console.error);

    // Fetch Gallery
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setGallery(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleOpenBookingModal = (car?: Car) => {
    setSelectedCar(car || null);
    setBookingModalOpen(true);
  };

  // Schema Markup JSON-LD for LocalBusiness & AutoRental
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    'name': 'Crazy Cars Self Drive Rental',
    'image': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    '@id': 'https://crazycars.com',
    'url': 'https://crazycars.com',
    'telephone': `+91-${settings.phone}`,
    'priceRange': '₹150 - ₹6000',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Mulagada Housing Colony, Gajuwaka Bus Depot Road, Near Hanuman Temple, Opposite MRO Office',
      'addressLocality': 'Gajuwaka, Visakhapatnam',
      'addressRegion': 'Andhra Pradesh',
      'postalCode': '530026',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 17.6974,
      'longitude': 83.2100
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '06:00',
      'closes': '23:00'
    },
    'sameAs': [
      `https://instagram.com/${settings.instagram}`,
      `https://wa.me/91${settings.whatsapp}`
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-secondary selection:bg-primary/20">
      
      {/* Inject SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Navigation */}
      <Navbar
        settings={settings}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          settings={settings}
          onOpenBookingModal={() => handleOpenBookingModal()}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Fleet Section */}
        <FleetSection
          cars={cars}
          settings={settings}
          onBookNow={(car) => handleOpenBookingModal(car)}
        />

        {/* Fleet Gallery */}
        <GallerySection items={gallery} />

        {/* Location & Map */}
        <LocationSection settings={settings} />

        {/* Contact Us */}
        <ContactSection
          settings={settings}
          onOpenBookingModal={() => handleOpenBookingModal()}
        />

      </main>

      {/* Footer */}
      <Footer settings={settings} />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedCar={selectedCar}
        allCars={cars}
        settings={settings}
      />

    </div>
  );
}
