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
    id: 'car-1',
    name: 'Maruti Suzuki Swift',
    brand: 'Maruti Suzuki',
    model: 'Swift ZXi+',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '22.0 km/l',
    priceHour: 150,
    priceDay: 1200,
    priceWeek: 7500,
    priceMonth: 26000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-2',
    name: 'Hyundai i20 Asta',
    brand: 'Hyundai',
    model: 'i20 Asta (O)',
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    mileage: '20.2 km/l',
    priceHour: 180,
    priceDay: 1400,
    priceWeek: 8500,
    priceMonth: 30000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-3',
    name: 'Maruti Suzuki Dzire',
    brand: 'Maruti Suzuki',
    model: 'Dzire ZXi',
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: '23.2 km/l',
    priceHour: 200,
    priceDay: 1500,
    priceWeek: 9000,
    priceMonth: 32000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-4',
    name: 'Mahindra Thar 4x4 LX',
    brand: 'Mahindra',
    model: 'Thar LX Hard Top',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 4,
    mileage: '15.2 km/l',
    priceHour: 450,
    priceDay: 3500,
    priceWeek: 22000,
    priceMonth: 75000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-5',
    name: 'Toyota Fortuner Legender',
    brand: 'Toyota',
    model: 'Fortuner 4x4 AT',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    mileage: '12.4 km/l',
    priceHour: 750,
    priceDay: 6000,
    priceWeek: 38000,
    priceMonth: 140000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true,
    featured: true
  },
  {
    id: 'car-6',
    name: 'Hyundai Creta SX',
    brand: 'Hyundai',
    model: 'Creta SX Tech',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 5,
    mileage: '18.0 km/l',
    priceHour: 350,
    priceDay: 2800,
    priceWeek: 17500,
    priceMonth: 60000,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    status: 'Booked',
    enabled: true
  },
  {
    id: 'car-7',
    name: 'Toyota Innova 2.5',
    brand: 'Toyota',
    model: 'Innova GX 7-Str',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    mileage: '14.0 km/l',
    priceHour: 320,
    priceDay: 2500,
    priceWeek: 16000,
    priceMonth: 55000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop',
    status: 'Available',
    enabled: true
  },
  {
    id: 'car-8',
    name: 'Toyota Innova Crysta',
    brand: 'Toyota',
    model: 'Innova Crysta VX',
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    mileage: '14.5 km/l',
    priceHour: 400,
    priceDay: 3200,
    priceWeek: 20000,
    priceMonth: 70000,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop',
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
  mapUrl: 'https://maps.google.com/maps?q=17.6974,83.2100&z=15&output=embed',
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
    carId: 'car-5',
    carName: 'Toyota Fortuner Legender',
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
    carId: 'car-6',
    carName: 'Hyundai Creta SX',
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

  const defaultData: DatabaseSchema = {
    cars: INITIAL_CARS,
    bookings: INITIAL_BOOKINGS,
    settings: INITIAL_SETTINGS,
    gallery: INITIAL_GALLERY,
  };

  try {
    const publicDir = path.join(process.cwd(), 'public');
    const sourceImage = path.join(process.cwd(), 'images', 'Screenshot 2026-08-01 184412.png');
    const destLogo = path.join(publicDir, 'logo.png');
    const destCrazyLogo = path.join(publicDir, 'crazy-cars-logo.png');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (fs.existsSync(sourceImage) && !fs.existsSync(destLogo)) {
      fs.copyFileSync(sourceImage, destLogo);
      fs.copyFileSync(sourceImage, destCrazyLogo);
    }
  } catch {
    // Ignore read-only filesystem on Vercel
  }

  // Try reading primary DB file
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb!;
    }
  } catch {
    // Read failed, try tmp
  }

  // Try reading Vercel /tmp DB file
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const raw = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb!;
    }
  } catch {
    // Tmp read failed
  }

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
