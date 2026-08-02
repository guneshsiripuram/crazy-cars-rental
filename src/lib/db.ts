import fs from 'fs';
import path from 'path';
import { Car, Booking, WebsiteSettings, GalleryItem } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Vercel serverless /tmp fallback
const TMP_DATA_DIR = '/tmp';
const TMP_DB_FILE = path.join(TMP_DATA_DIR, 'db.json');

interface DatabaseSchema {
  cars: Car[];
  bookings: Booking[];
  settings: WebsiteSettings;
  gallery: GalleryItem[];
}

const INITIAL_CARS: Car[] = [
  {
    id: 'car-kwid',
    name: 'Renault Kwid',
    brand: 'Renault',
    model: 'Kwid RXT',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '22.0 km/l',
    priceHour: 100,
    priceDay: 1800,
    price12hr: 1000,
    price24hr: 1800,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 4,
    extraHrRate: 100,
    priceWeek: 11000,
    priceMonth: 38000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-celerio',
    name: 'Maruti Suzuki Celerio',
    brand: 'Maruti Suzuki',
    model: 'Celerio ZXi',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '23.5 km/l',
    priceHour: 120,
    priceDay: 2000,
    price12hr: 1200,
    price24hr: 2000,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 4,
    extraHrRate: 120,
    priceWeek: 12500,
    priceMonth: 42000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-ignis',
    name: 'Maruti Suzuki Ignis',
    brand: 'Maruti Suzuki',
    model: 'Ignis Zeta',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '20.8 km/l',
    priceHour: 120,
    priceDay: 2200,
    price12hr: 1300,
    price24hr: 2200,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 5,
    extraHrRate: 120,
    priceWeek: 13500,
    priceMonth: 45000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-swift',
    name: 'Maruti Suzuki Swift',
    brand: 'Maruti Suzuki',
    model: 'Swift ZXi+',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '22.5 km/l',
    priceHour: 150,
    priceDay: 2500,
    price12hr: 1500,
    price24hr: 2500,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 5,
    extraHrRate: 150,
    priceWeek: 15000,
    priceMonth: 50000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-dzire',
    name: 'Maruti Swift Dzire',
    brand: 'Maruti Suzuki',
    model: 'Dzire ZXi',
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '23.2 km/l',
    priceHour: 170,
    priceDay: 2600,
    price12hr: 1600,
    price24hr: 2600,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 6,
    extraHrRate: 170,
    priceWeek: 16000,
    priceMonth: 52000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-baleno',
    name: 'Maruti Suzuki Baleno',
    brand: 'Maruti Suzuki',
    model: 'Baleno Zeta',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '22.3 km/l',
    priceHour: 170,
    priceDay: 2600,
    price12hr: 1600,
    price24hr: 2600,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 6,
    extraHrRate: 170,
    priceWeek: 16000,
    priceMonth: 52000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-baleno-new',
    name: 'Maruti Baleno New',
    brand: 'Maruti Suzuki',
    model: 'Baleno Alpha 2024',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '22.9 km/l',
    priceHour: 170,
    priceDay: 2600,
    price12hr: 1600,
    price24hr: 2600,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 6,
    extraHrRate: 170,
    priceWeek: 16000,
    priceMonth: 52000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-i20',
    name: 'Hyundai i20',
    brand: 'Hyundai',
    model: 'i20 Asta (O)',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '20.2 km/l',
    priceHour: 170,
    priceDay: 2600,
    price12hr: 1600,
    price24hr: 2600,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 6,
    extraHrRate: 170,
    priceWeek: 16000,
    priceMonth: 52000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-amaze',
    name: 'Honda Amaze',
    brand: 'Honda',
    model: 'Amaze VX',
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '18.6 km/l',
    priceHour: 170,
    priceDay: 2600,
    price12hr: 1600,
    price24hr: 2600,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 6,
    extraHrRate: 170,
    priceWeek: 16000,
    priceMonth: 52000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-ciaz',
    name: 'Maruti Suzuki Ciaz',
    brand: 'Maruti Suzuki',
    model: 'Ciaz Alpha',
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '20.6 km/l',
    priceHour: 180,
    priceDay: 2800,
    price12hr: 1800,
    price24hr: 2800,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 7,
    extraHrRate: 180,
    priceWeek: 17500,
    priceMonth: 58000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-verna',
    name: 'Hyundai Verna',
    brand: 'Hyundai',
    model: 'Verna SX (O)',
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '19.0 km/l',
    priceHour: 200,
    priceDay: 3000,
    price12hr: 2000,
    price24hr: 3000,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 8,
    extraHrRate: 200,
    priceWeek: 19000,
    priceMonth: 65000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-ertiga',
    name: 'Maruti Suzuki Ertiga',
    brand: 'Maruti Suzuki',
    model: 'Ertiga ZXi 7-Str',
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 7,
    mileage: '20.5 km/l',
    priceHour: 220,
    priceDay: 3700,
    price12hr: 2700,
    price24hr: 3700,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 8,
    extraHrRate: 220,
    priceWeek: 23000,
    priceMonth: 78000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-innova',
    name: 'Toyota Innova',
    brand: 'Toyota',
    model: 'Innova GX 7-Str',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    mileage: '14.0 km/l',
    priceHour: 250,
    priceDay: 3800,
    price12hr: 2800,
    price24hr: 3800,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 8,
    extraHrRate: 250,
    priceWeek: 24000,
    priceMonth: 82000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-xuv500',
    name: 'Mahindra XUV 500',
    brand: 'Mahindra',
    model: 'XUV 500 W11',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    mileage: '15.1 km/l',
    priceHour: 300,
    priceDay: 3500,
    price12hr: 2500,
    price24hr: 3500,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 9,
    extraHrRate: 300,
    priceWeek: 22000,
    priceMonth: 75000,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-crysta',
    name: 'Toyota Innova Crysta',
    brand: 'Toyota',
    model: 'Innova Crysta VX',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    mileage: '14.5 km/l',
    priceHour: 350,
    priceDay: 4500,
    price12hr: 3500,
    price24hr: 4500,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 10,
    extraHrRate: 350,
    priceWeek: 28000,
    priceMonth: 95000,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-scorpio',
    name: 'Mahindra Scorpio',
    brand: 'Mahindra',
    model: 'Scorpio Classic S11',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    mileage: '15.0 km/l',
    priceHour: 350,
    priceDay: 5000,
    price12hr: 3500,
    price24hr: 5000,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 10,
    extraHrRate: 350,
    priceWeek: 31000,
    priceMonth: 105000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-thar',
    name: 'Mahindra Thar 4x4',
    brand: 'Mahindra',
    model: 'Thar LX Hard Top',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 4,
    mileage: '15.2 km/l',
    priceHour: 500,
    priceDay: 5000,
    price12hr: 3500,
    price24hr: 5000,
    kmLimit12hr: 150,
    kmLimit24hr: 250,
    excessKmRate: 15,
    extraHrRate: 500,
    priceWeek: 32000,
    priceMonth: 110000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  }
];

const INITIAL_SETTINGS: WebsiteSettings = {
  phone: '7337422124',
  whatsapp: '7337422124',
  instagram: 'crazy_cars_self_drive_rental_',
  address: 'Mulagada Housing Colony, Gajuwaka Bus Depot Road, Near Hanuman Temple, Opposite MRO Office, Gajuwaka, Visakhapatnam, AP 530026',
  mapUrl: 'https://www.google.com/maps/place/Crazy+cars+self+drive+rental/@17.6876529,83.2201184,946m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a3969e620d16e49:0xd6f2a48922d19ec7!8m2!3d17.687653!4d83.2249893!16s%2Fg%2F11n4tbmjy9?entry=ttu',
  heroTitle: 'Drive Your Dream Car Today',
  heroSubtitle: 'Reliable Self Drive Car Rental in Visakhapatnam',
  heroIntro: 'Premium self-drive car rental service providing clean, well-maintained, affordable cars for daily, weekly, monthly and hourly rentals with zero hidden charges.',
  footerText: '© Crazy Cars Self Drive Rental. All rights reserved. Premium Self-Drive Rental Services in Visakhapatnam.'
};

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Thar 4x4 Offroad Ready',
    category: 'Fleet',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2026-07-01'
  },
  {
    id: 'gal-2',
    title: 'Fortuner Luxury Interior',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2026-07-05'
  },
  {
    id: 'gal-3',
    title: 'Hyundai Creta Metallic Finish',
    category: 'Exterior',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2026-07-10'
  },
  {
    id: 'gal-4',
    title: 'Clean Sanitized Cabin',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    createdAt: '2026-07-15'
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    customerName: 'Rahul Verma',
    phone: '9876543210',
    carId: 'car-crysta',
    carName: 'Toyota Innova Crysta',
    pickupDate: '2026-08-05',
    returnDate: '2026-08-08',
    message: 'Need the car for a family trip to Araku Valley.',
    status: 'Approved',
    createdAt: new Date().toISOString()
  },
  {
    id: 'bk-102',
    customerName: 'Suresh Kumar',
    phone: '9123456789',
    carId: 'car-i20',
    carName: 'Hyundai i20',
    pickupDate: '2026-08-02',
    returnDate: '2026-08-04',
    message: 'Local city ride around Vizag.',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

// Global in-memory fallback for Vercel serverless
let memoryDb: DatabaseSchema | null = null;

function ensureDbExists(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  // 1. Try reading from Vercel /tmp/db.json
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const raw = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.cars) && parsed.cars.length > 0) {
        memoryDb = parsed;
        return memoryDb!;
      }
    }
  } catch {
    // Tmp read failed
  }

  // 2. Try reading primary DB_FILE
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.cars) && parsed.cars.length > 0) {
        memoryDb = parsed;
        return memoryDb!;
      }
    }
  } catch {
    // Primary read failed
  }

  // 3. Fallback to default initial data
  const defaultData: DatabaseSchema = {
    cars: INITIAL_CARS,
    bookings: INITIAL_BOOKINGS,
    settings: INITIAL_SETTINGS,
    gallery: INITIAL_GALLERY,
  };

  memoryDb = defaultData;
  saveDb(defaultData);
  return memoryDb;
}

function saveDb(data: DatabaseSchema) {
  memoryDb = data;
  
  // Try writing to primary DB_FILE
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return;
  } catch {
    // Primary write failed (e.g. read-only Vercel filesystem)
  }

  // Fallback writing to Vercel /tmp/db.json
  try {
    if (!fs.existsSync(TMP_DATA_DIR)) {
      fs.mkdirSync(TMP_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Tmp write failed, memoryDb is preserved
  }
}

export const db = {
  getDb(): DatabaseSchema {
    return ensureDbExists();
  },

  // Cars
  getCars(): Car[] {
    return ensureDbExists().cars;
  },

  addCar(car: Omit<Car, 'id'>): Car {
    const data = ensureDbExists();
    const newCar: Car = {
      ...car,
      id: `car-${Date.now()}`
    };
    data.cars.unshift(newCar);
    saveDb(data);
    return newCar;
  },

  updateCar(id: string, updates: Partial<Car>): Car | null {
    const data = ensureDbExists();
    const index = data.cars.findIndex(c => c.id === id);
    if (index === -1) return null;
    data.cars[index] = { ...data.cars[index], ...updates };
    saveDb(data);
    return data.cars[index];
  },

  deleteCar(id: string): boolean {
    const data = ensureDbExists();
    const initialLength = data.cars.length;
    data.cars = data.cars.filter(c => c.id !== id);
    if (data.cars.length !== initialLength) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Bookings
  getBookings(): Booking[] {
    return ensureDbExists().bookings;
  },

  addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
    const data = ensureDbExists();
    const newBooking: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    data.bookings.unshift(newBooking);
    saveDb(data);
    return newBooking;
  },

  updateBookingStatus(id: string, status: Booking['status']): Booking | null {
    const data = ensureDbExists();
    const booking = data.bookings.find(b => b.id === id);
    if (!booking) return null;
    booking.status = status;
    saveDb(data);
    return booking;
  },

  // Settings
  getSettings(): WebsiteSettings {
    return ensureDbExists().settings;
  },

  updateSettings(newSettings: Partial<WebsiteSettings>): WebsiteSettings {
    const data = ensureDbExists();
    data.settings = { ...data.settings, ...newSettings };
    saveDb(data);
    return data.settings;
  },

  // Gallery
  getGallery(): GalleryItem[] {
    return ensureDbExists().gallery;
  },

  addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
    const data = ensureDbExists();
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    data.gallery.unshift(newItem);
    saveDb(data);
    return newItem;
  },

  deleteGalleryItem(id: string): boolean {
    const data = ensureDbExists();
    const initialLength = data.gallery.length;
    data.gallery = data.gallery.filter(g => g.id !== id);
    if (data.gallery.length !== initialLength) {
      saveDb(data);
      return true;
    }
    return false;
  }
};
