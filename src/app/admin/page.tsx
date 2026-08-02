'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Car, Booking, WebsiteSettings, GalleryItem, CarStatus, CarType, FuelType, TransmissionType
} from '@/lib/types';
import {
  ShieldCheck, LayoutDashboard, Car as CarIcon, CalendarCheck2, Settings, Image as ImageIcon,
  Plus, Trash2, Edit3, CheckCircle2, XCircle, Clock, AlertTriangle, MessageCircle, RefreshCw,
  LogOut, Phone, MapPin, Instagram, Globe, Eye, EyeOff, Save, ExternalLink
} from 'lucide-react';

import { uploadImageToSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { Upload, Database } from 'lucide-react';

export default function AdminDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'cars' | 'bookings' | 'settings' | 'gallery'>('overview');

  // File Upload State
  const [uploadingImage, setUploadingImage] = useState(false);

  // Data states
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleFileUpload = async (file: File, target: 'car' | 'gallery') => {
    setUploadingImage(true);
    try {
      const publicUrl = await uploadImageToSupabase(file);
      if (publicUrl) {
        if (target === 'car') setCarForm(prev => ({ ...prev, image: publicUrl }));
        if (target === 'gallery') setGalleryForm(prev => ({ ...prev, imageUrl: publicUrl }));
        showFeedback('Image uploaded to Supabase Storage!');
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          if (target === 'car') setCarForm(prev => ({ ...prev, image: result }));
          if (target === 'gallery') setGalleryForm(prev => ({ ...prev, imageUrl: result }));
          showFeedback('Image selected! (Add Supabase keys in .env.local for automatic cloud storage)');
        };
        reader.readAsDataURL(file);
      }
    } catch {
      showFeedback('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };
  const [settings, setSettings] = useState<WebsiteSettings>({
    phone: '', whatsapp: '', instagram: '', address: '', mapUrl: '', heroTitle: '', heroSubtitle: '', heroIntro: '', footerText: ''
  });
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Car Modal State (Add/Edit)
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // Form State for Car
  const [carForm, setCarForm] = useState({
    name: '', brand: '', model: '', type: 'Hatchback' as CarType, fuel: 'Petrol' as FuelType,
    transmission: 'Manual' as TransmissionType, seats: 5, mileage: '20 km/l',
    priceHour: 150, priceDay: 1200, priceWeek: 7500, priceMonth: 26000,
    image: '', status: 'Available' as CarStatus, enabled: true
  });

  // Gallery Modal State
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'Fleet' as GalleryItem['category'], imageUrl: ''
  });

  // Toast / Status Feedback
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    // Check local storage for session
    const token = localStorage.getItem('crazy_cars_admin_token');
    if (token === 'crazy-cars-admin-token-2026') {
      setIsAuthenticated(true);
      fetchAllData();

      // Auto refresh every 15 seconds for live enquiries
      const interval = setInterval(() => {
        fetchAllData();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, []);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pinInput }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('crazy_cars_admin_token', data.token);
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        setAuthError('Invalid Admin Password.');
      }
    } catch {
      setAuthError('Authentication network error.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('crazy_cars_admin_token');
    setIsAuthenticated(false);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [carsRes, bookingsRes, settingsRes, galleryRes] = await Promise.all([
        fetch('/api/cars').then(r => r.json()),
        fetch('/api/bookings').then(r => r.json()),
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json()),
      ]);

      if (carsRes.success) setCars(carsRes.data);
      if (bookingsRes.success) setBookings(bookingsRes.data);
      if (settingsRes.success) setSettings(settingsRes.data);
      if (galleryRes.success) setGallery(galleryRes.data);
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setLoading(false);
    }
  };

  // Car CRUD Handlers
  const handleOpenCarModal = (car?: Car) => {
    if (car) {
      setEditingCar(car);
      setCarForm({
        name: car.name, brand: car.brand, model: car.model, type: car.type,
        fuel: car.fuel, transmission: car.transmission, seats: car.seats, mileage: car.mileage,
        priceHour: car.priceHour, priceDay: car.priceDay, priceWeek: car.priceWeek, priceMonth: car.priceMonth,
        image: car.image, status: car.status, enabled: car.enabled
      });
    } else {
      setEditingCar(null);
      setCarForm({
        name: '', brand: 'Maruti Suzuki', model: '', type: 'Hatchback', fuel: 'Petrol',
        transmission: 'Manual', seats: 5, mileage: '20.0 km/l',
        priceHour: 150, priceDay: 1200, priceWeek: 7500, priceMonth: 26000,
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
        status: 'Available', enabled: true
      });
    }
    setCarModalOpen(true);
  };

  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = '/api/cars';
      const method = editingCar ? 'PUT' : 'POST';
      const payload = editingCar ? { id: editingCar.id, ...carForm } : carForm;

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showFeedback(editingCar ? 'Car updated successfully!' : 'New car added to fleet!');
        setCarModalOpen(false);
        fetchAllData();
      }
    } catch (err) {
      showFeedback('Failed to save car');
    }
  };

  const handleDeleteCar = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/cars?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showFeedback('Car deleted successfully');
        fetchAllData();
      }
    } catch {
      showFeedback('Error deleting car');
    }
  };

  const handleStatusChange = async (carId: string, newStatus: CarStatus) => {
    try {
      const res = await fetch('/api/cars', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: carId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(`Car status updated to ${newStatus}`);
        fetchAllData();
      }
    } catch {
      showFeedback('Failed to update status');
    }
  };

  const handleToggleEnable = async (car: Car) => {
    try {
      const res = await fetch('/api/cars', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: car.id, enabled: !car.enabled }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(`Car online booking ${!car.enabled ? 'Enabled' : 'Disabled'}`);
        fetchAllData();
      }
    } catch {
      showFeedback('Failed to toggle car state');
    }
  };

  // Booking Status Handler
  const handleBookingStatus = async (id: string, newStatus: Booking['status']) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(`Booking enquiry updated to ${newStatus}`);
        fetchAllData();
      }
    } catch {
      showFeedback('Failed to update booking status');
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback('Website settings updated! Customer website updated live.');
      }
    } catch {
      showFeedback('Failed to save settings');
    }
  };

  // Gallery CRUD
  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback('Gallery image added');
        setGalleryModalOpen(false);
        setGalleryForm({ title: '', category: 'Fleet', imageUrl: '' });
        fetchAllData();
      }
    } catch {
      showFeedback('Failed to add gallery item');
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Delete this image from gallery?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showFeedback('Gallery image deleted');
        fetchAllData();
      }
    } catch {
      showFeedback('Failed to delete gallery item');
    }
  };

  // Login Screen View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 border border-slate-800 text-secondary">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-md flex items-center justify-center mx-auto bg-white">
              <img
                src="/crazy-cars-logo.png"
                alt="Crazy Cars Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin CMS Login</h1>
            <p className="text-xs text-slate-500">Crazy Cars Self Drive Rental Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-200">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Password / PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl shadow-subtle transition-all text-sm"
            >
              Log In to Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-border text-center">
            <Link href="/" className="text-xs font-semibold text-primary hover:underline">
              ← Return to Customer Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalCarsCount = cars.length;
  const availableCarsCount = cars.filter(c => c.status === 'Available').length;
  const bookedCarsCount = cars.filter(c => c.status === 'Booked').length;
  const serviceCarsCount = cars.filter(c => c.status === 'In Service').length;
  const totalBookingsCount = bookings.length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-50 text-secondary flex flex-col">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 bg-white flex items-center justify-center shrink-0">
              <img
                src="/crazy-cars-logo.png"
                alt="Crazy Cars Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight">CRAZY CARS CMS</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                Live Server
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Customer Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full space-y-6">
        
        {/* Toast Feedback */}
        {feedbackMsg && (
          <div className="p-4 bg-emerald-500 text-white text-xs font-bold rounded-2xl shadow-lg flex justify-between items-center animate-fadeIn">
            <span>✓ {feedbackMsg}</span>
            <button onClick={() => setFeedbackMsg('')}><XCircle className="w-4 h-4" /></button>
          </div>
        )}

        {/* CMS Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-border shadow-subtle flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-primary text-white shadow-subtle' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('cars')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cars' ? 'bg-primary text-white shadow-subtle' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CarIcon className="w-4 h-4" />
            <span>Fleet Management ({cars.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'bookings' ? 'bg-primary text-white shadow-subtle' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>Bookings & Enquiries ({bookings.length})</span>
            {pendingBookingsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-2 right-2" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings' ? 'bg-primary text-white shadow-subtle' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Content & Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'gallery' ? 'bg-primary text-white shadow-subtle' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Images</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 6 Stats Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-1">
                <p className="text-[11px] font-bold uppercase text-slate-400">Total Cars</p>
                <p className="text-2xl font-extrabold text-secondary">{totalCarsCount}</p>
                <span className="text-[10px] text-slate-500">Fleet Inventory</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-1">
                <p className="text-[11px] font-bold uppercase text-emerald-600">Available</p>
                <p className="text-2xl font-extrabold text-emerald-600">{availableCarsCount}</p>
                <span className="text-[10px] text-slate-500">Ready to Rent</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-1">
                <p className="text-[11px] font-bold uppercase text-amber-500">Booked</p>
                <p className="text-2xl font-extrabold text-amber-500">{bookedCarsCount}</p>
                <span className="text-[10px] text-slate-500">On Road Now</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-1">
                <p className="text-[11px] font-bold uppercase text-red-500">In Service</p>
                <p className="text-2xl font-extrabold text-red-500">{serviceCarsCount}</p>
                <span className="text-[10px] text-slate-500">Maintenance</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-1">
                <p className="text-[11px] font-bold uppercase text-slate-400">Total Enquiries</p>
                <p className="text-2xl font-extrabold text-secondary">{totalBookingsCount}</p>
                <span className="text-[10px] text-slate-500">Submitted</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-border shadow-card space-y-1 bg-amber-50/50">
                <p className="text-[11px] font-bold uppercase text-amber-600">Pending</p>
                <p className="text-2xl font-extrabold text-amber-600">{pendingBookingsCount}</p>
                <span className="text-[10px] text-amber-700 font-semibold">Needs Action</span>
              </div>
            </div>

            {/* Quick Actions & Recent Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Quick Actions Panel */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-border shadow-card space-y-4">
                <h3 className="text-base font-extrabold text-secondary">Quick Shortcuts</h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => handleOpenCarModal()}
                    className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-subtle"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Car to Fleet</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-subtle"
                  >
                    <CalendarCheck2 className="w-4 h-4" />
                    <span>Process {pendingBookingsCount} Pending Requests</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Update Phone / Contact Info</span>
                  </button>
                </div>
              </div>

              {/* Recent Pending Enquiries */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-border shadow-card space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-extrabold text-secondary">Recent Enquiries</h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No customer enquiries received yet.</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((bk) => (
                      <div key={bk.id} className="p-3.5 rounded-2xl bg-slate-50 border border-border flex justify-between items-center text-xs">
                        <div>
                          <p className="font-extrabold text-secondary">{bk.customerName} <span className="font-normal text-slate-500">({bk.phone})</span></p>
                          <p className="text-primary font-semibold">{bk.carName}</p>
                          <p className="text-[10px] text-slate-400">Dates: {bk.pickupDate} to {bk.returnDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            bk.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            bk.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {bk.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CAR MANAGEMENT (CRUD) */}
        {activeTab === 'cars' && (
          <div className="space-y-6">
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-extrabold text-secondary">Fleet & Vehicle Management</h2>
                <p className="text-xs text-slate-500">Add, update specs, change rates, and manage status.</p>
              </div>
              <button
                onClick={() => handleOpenCarModal()}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-subtle"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Car</span>
              </button>
            </div>

            {/* Cars Table */}
            <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100/70 border-b border-border font-bold uppercase text-[10px] text-slate-500">
                    <tr>
                      <th className="p-4">Car Image & Name</th>
                      <th className="p-4">Brand / Model</th>
                      <th className="p-4">Specs</th>
                      <th className="p-4">Rates (Day / Hr)</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Enabled</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-medium">
                    {cars.map((car) => (
                      <tr key={car.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={car.image}
                              alt={car.name}
                              className="w-12 h-10 object-cover rounded-lg border border-border"
                            />
                            <span className="font-extrabold text-secondary text-sm">{car.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-secondary">{car.brand}</p>
                          <p className="text-[10px] text-slate-400">{car.model}</p>
                        </td>
                        <td className="p-4 space-y-0.5">
                          <p>{car.fuel} • {car.transmission}</p>
                          <p className="text-[10px] text-slate-400">{car.seats} Seats • {car.mileage}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-secondary">₹{car.priceDay} <span className="text-[10px] text-slate-400 font-normal">/day</span></p>
                          <p className="text-[10px] text-slate-500">₹{car.priceHour} /hr</p>
                        </td>
                        <td className="p-4">
                          <select
                            value={car.status}
                            onChange={(e) => handleStatusChange(car.id, e.target.value as CarStatus)}
                            className={`p-1.5 rounded-lg text-xs font-extrabold border ${
                              car.status === 'Available' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                              car.status === 'Booked' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                              'bg-red-50 border-red-200 text-red-600'
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                            <option value="In Service">In Service</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleEnable(car)}
                            className={`p-1.5 rounded-lg text-xs font-bold ${
                              car.enabled ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'
                            }`}
                            title={car.enabled ? 'Disable Car' : 'Enable Car'}
                          >
                            {car.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenCarModal(car)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit Car"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id, car.name)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Car"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: BOOKING MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-secondary">Customer Booking Enquiries</h2>
              <p className="text-xs text-slate-500">Manage incoming car rental requests and respond via WhatsApp.</p>
            </div>

            <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100/70 border-b border-border font-bold uppercase text-[10px] text-slate-500">
                    <tr>
                      <th className="p-4">Customer Name & Phone</th>
                      <th className="p-4">Requested Car</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4">Message / Note</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions & WhatsApp Reply</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-medium">
                    {bookings.map((bk) => {
                      const replyText = encodeURIComponent(
                        `Hello ${bk.customerName}, regarding your enquiry for ${bk.carName} from ${bk.pickupDate} to ${bk.returnDate}: Your booking status is ${bk.status}.`
                      );
                      const whatsappReplyUrl = `https://wa.me/91${bk.phone}?text=${replyText}`;

                      return (
                        <tr key={bk.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <p className="font-extrabold text-secondary text-sm">{bk.customerName}</p>
                            <p className="text-slate-500 font-semibold">{bk.phone}</p>
                          </td>
                          <td className="p-4 font-bold text-primary">
                            {bk.carName}
                          </td>
                          <td className="p-4">
                            <p><strong>Pick:</strong> {bk.pickupDate}</p>
                            <p><strong>Return:</strong> {bk.returnDate}</p>
                          </td>
                          <td className="p-4 text-slate-600 max-w-xs truncate">
                            {bk.message || 'No additional note'}
                          </td>
                          <td className="p-4">
                            <select
                              value={bk.status}
                              onChange={(e) => handleBookingStatus(bk.id, e.target.value as Booking['status'])}
                              className={`p-1.5 rounded-lg text-xs font-extrabold border ${
                                bk.status === 'Approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                                bk.status === 'Pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                bk.status === 'Completed' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                'bg-red-50 border-red-200 text-red-700'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <a
                              href={whatsappReplyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-success text-white px-3 py-1.5 rounded-xl font-bold text-xs"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Reply on WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: SETTINGS & CONTENT */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-3xl border border-border shadow-card space-y-6 max-w-4xl">
            <div className="border-b border-border pb-4">
              <h2 className="text-2xl font-extrabold text-secondary">Website Content & Contact Information</h2>
              <p className="text-xs text-slate-500">Edit text and numbers displayed on customer website.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-secondary mb-1">Phone Hotline</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-semibold text-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-secondary mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-semibold text-secondary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-secondary mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-semibold text-secondary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-secondary mb-1">Office Address</label>
                <textarea
                  rows={2}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl text-secondary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-secondary mb-1">Google Maps Embed URL</label>
                <input
                  type="text"
                  value={settings.mapUrl}
                  onChange={(e) => setSettings({ ...settings, mapUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl text-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-secondary mb-1">Hero Main Title</label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-bold text-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-secondary mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-semibold text-secondary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-secondary mb-1">Hero Introduction Snippet</label>
                <textarea
                  rows={2}
                  value={settings.heroIntro}
                  onChange={(e) => setSettings({ ...settings, heroIntro: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl text-secondary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-secondary mb-1">Footer Copyright Text</label>
                <input
                  type="text"
                  value={settings.footerText}
                  onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl text-secondary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl shadow-subtle text-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Live Updates</span>
            </button>
          </form>
        )}

        {/* TAB 5: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-extrabold text-secondary">Fleet Photo Gallery</h2>
                <p className="text-xs text-slate-500">Add or remove photos displayed in customer site lightbox.</p>
              </div>
              <button
                onClick={() => setGalleryModalOpen(true)}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-subtle"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-card group">
                  <div className="h-44 bg-slate-200 relative">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-3 text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase text-primary">{item.category}</span>
                    <h4 className="font-bold text-secondary truncate">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CAR ADD/EDIT MODAL */}
      {carModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-border shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-extrabold text-lg text-secondary">
                {editingCar ? 'Edit Vehicle Details' : 'Add New Car to Fleet'}
              </h3>
              <button onClick={() => setCarModalOpen(false)} className="p-1 text-slate-400 hover:text-secondary">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCar} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-secondary mb-1">Car Name *</label>
                  <input
                    type="text" required placeholder="e.g. Swift ZXi+" value={carForm.name}
                    onChange={e => setCarForm({...carForm, name: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Brand *</label>
                  <input
                    type="text" required placeholder="e.g. Maruti Suzuki" value={carForm.brand}
                    onChange={e => setCarForm({...carForm, brand: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Model Variant</label>
                  <input
                    type="text" placeholder="e.g. 2024 Automatic" value={carForm.model}
                    onChange={e => setCarForm({...carForm, model: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Body Type</label>
                  <select
                    value={carForm.type}
                    onChange={e => setCarForm({...carForm, type: e.target.value as CarType})}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-bold"
                  >
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV / MPV</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-secondary mb-1">Fuel Type</label>
                  <select
                    value={carForm.fuel}
                    onChange={e => setCarForm({...carForm, fuel: e.target.value as FuelType})}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Transmission</label>
                  <select
                    value={carForm.transmission}
                    onChange={e => setCarForm({...carForm, transmission: e.target.value as TransmissionType})}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Seating Capacity</label>
                  <input
                    type="number" value={carForm.seats}
                    onChange={e => setCarForm({...carForm, seats: Number(e.target.value)})}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block font-bold text-secondary mb-1">Price / Hour (₹)</label>
                  <input
                    type="number" value={carForm.priceHour}
                    onChange={e => setCarForm({...carForm, priceHour: Number(e.target.value)})}
                    className="w-full p-2 bg-slate-50 border border-border rounded-xl font-bold text-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Price / Day (₹)</label>
                  <input
                    type="number" value={carForm.priceDay}
                    onChange={e => setCarForm({...carForm, priceDay: Number(e.target.value)})}
                    className="w-full p-2 bg-slate-50 border border-border rounded-xl font-bold text-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Price / Week (₹)</label>
                  <input
                    type="number" value={carForm.priceWeek}
                    onChange={e => setCarForm({...carForm, priceWeek: Number(e.target.value)})}
                    className="w-full p-2 bg-slate-50 border border-border rounded-xl font-bold text-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-secondary mb-1">Price / Month (₹)</label>
                  <input
                    type="number" value={carForm.priceMonth}
                    onChange={e => setCarForm({...carForm, priceMonth: Number(e.target.value)})}
                    className="w-full p-2 bg-slate-50 border border-border rounded-xl font-bold text-primary"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-secondary">Car Image (Upload File or Paste Link)</label>
                  <label className="cursor-pointer text-primary font-bold hover:underline flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'car')}
                    />
                  </label>
                </div>
                <input
                  type="text" value={carForm.image} placeholder="https://... or upload photo"
                  onChange={e => setCarForm({...carForm, image: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 font-bold text-secondary cursor-pointer">
                    <input
                      type="checkbox" checked={carForm.enabled}
                      onChange={e => setCarForm({...carForm, enabled: e.target.checked})}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span>Available for Booking</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button" onClick={() => setCarModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-subtle"
                  >
                    Save Vehicle
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-border shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-extrabold text-base text-secondary">Add Gallery Image</h3>
              <button onClick={() => setGalleryModalOpen(false)}><XCircle className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleAddGalleryItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-secondary mb-1">Image Title *</label>
                <input
                  type="text" required placeholder="e.g. Creta Clean Interior" value={galleryForm.title}
                  onChange={e => setGalleryForm({...galleryForm, title: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-secondary mb-1">Category</label>
                <select
                  value={galleryForm.category}
                  onChange={e => setGalleryForm({...galleryForm, category: e.target.value as GalleryItem['category']})}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-bold"
                >
                  <option value="Fleet">Fleet</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Interior">Interior</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-secondary">Image (Upload File or Paste Link) *</label>
                  <label className="cursor-pointer text-primary font-bold hover:underline flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'gallery')}
                    />
                  </label>
                </div>
                <input
                  type="text" required placeholder="https://... or upload photo" value={galleryForm.imageUrl}
                  onChange={e => setGalleryForm({...galleryForm, imageUrl: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl font-mono text-[11px]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-subtle mt-2"
              >
                Upload to Gallery
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
