export type CarStatus = 'Available' | 'Booked' | 'In Service';
export type CarType = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury';
export type FuelType = 'Petrol' | 'Diesel' | 'EV' | 'Hybrid';
export type TransmissionType = 'Manual' | 'Automatic';

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: CarType;
  fuel: FuelType;
  transmission: TransmissionType;
  seats: number;
  mileage: string;
  priceHour: number;
  priceDay: number;
  priceWeek: number;
  priceMonth: number;
  image: string;
  status: CarStatus;
  enabled: boolean;
  featured?: boolean;
}

export type BookingStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed';

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  carId: string;
  carName: string;
  pickupDate: string;
  returnDate: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface WebsiteSettings {
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  mapUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  heroIntro: string;
  footerText: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Fleet';
  imageUrl: string;
  createdAt: string;
}
