'use client';

import React, { useState, useEffect } from 'react';
import { Car, WebsiteSettings } from '@/lib/types';
import { X, Send, MessageCircle, CheckCircle2, Calendar, Phone, User, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  allCars: Car[];
  settings: WebsiteSettings;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedCar,
  allCars,
  settings,
}: BookingModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [carId, setCarId] = useState(selectedCar?.id || '');
  const [carName, setCarName] = useState(selectedCar?.name || '');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedCar) {
      setCarId(selectedCar.id);
      setCarName(selectedCar.name);
    } else if (allCars.length > 0) {
      setCarId(allCars[0].id);
      setCarName(allCars[0].name);
    }
  }, [selectedCar, allCars]);

  if (!isOpen) return null;

  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const foundId = e.target.value;
    setCarId(foundId);
    const found = allCars.find(c => c.id === foundId);
    if (found) setCarName(found.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !pickupDate || !returnDate || !carName) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          carId,
          carName,
          pickupDate,
          returnDate,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Booking submission failed. Please try again.');
      }
    } catch {
      setErrorMsg('An unexpected network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const formatWhatsAppText = () => {
    const text = `*NEW CAR RENTAL ENQUIRY*\n----------------------\n👤 Name: ${customerName}\n📞 Phone: ${phone}\n🚗 Car: ${carName}\n📅 Pickup: ${pickupDate}\n📅 Return: ${returnDate}\n💬 Message: ${message || 'N/A'}`;
    return encodeURIComponent(text);
  };

  const directWhatsAppUrl = `https://wa.me/91${settings.whatsapp}?text=${formatWhatsAppText()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-card border border-border overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Car Rental Booking Enquiry</h3>
              <p className="text-xs text-slate-300">Crazy Cars Self Drive Visakhapatnam</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-secondary">Enquiry Submitted!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you <strong className="text-secondary">{customerName}</strong>. Our team has received your enquiry for <strong className="text-primary">{carName}</strong>.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-border text-xs text-left space-y-1">
                <p><strong>Pickup Date:</strong> {pickupDate}</p>
                <p><strong>Return Date:</strong> {returnDate}</p>
                <p><strong>Phone:</strong> {phone}</p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-success text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-success" />
                  <span>Send Instantly on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-200"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Customer Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                  />
                </div>
              </div>

              {/* Selected Car Dropdown */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Selected Car *
                </label>
                <select
                  value={carId}
                  onChange={handleCarChange}
                  className="w-full p-2.5 bg-slate-50 border border-border rounded-xl text-sm font-semibold text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {allCars.filter(c => c.enabled && c.status === 'Available').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.type} - ₹{c.priceDay}/day)
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl text-xs font-medium text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-border rounded-xl text-xs font-medium text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Message / Remarks */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Additional Message / Destination Details
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    placeholder="E.g., Traveling to Araku with family, need child seat..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-border rounded-xl text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl shadow-subtle flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Enquiry'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
