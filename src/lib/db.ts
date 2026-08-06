import fs from 'fs';
import path from 'path';
import { Car, Booking, WebsiteSettings, GalleryItem } from './types';
import { supabase } from './supabase';

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
    image: 'https://pxumlqtlyfkhehhtsdwp.supabase.co/storage/v1/object/public/crazy-cars-images/innova-crysta.jpg',
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

  // Async Supabase-integrated Cars
  async getCarsAsync(): Promise<Car[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          // Map DB columns to Car type
          const mappedCars: Car[] = data.map(item => ({
            id: item.id || `car-${Date.now()}`,
            name: item.name,
            brand: item.name?.toLowerCase().includes('kwid') ? 'Renault' : (item.brand || 'Maruti Suzuki'),
            model: item.model,
            type: item.type,
            fuel: item.fuel,
            transmission: item.transmission,
            seats: Number(item.seats) || 5,
            mileage: item.mileage || '20.0 km/l',
            priceHour: Number(item.price_hour) || 150,
            priceDay: Number(item.price_day) || 2500,
            price12hr: Number(item.price_12hr) || 1600,
            price24hr: Number(item.price_24hr) || 2600,
            kmLimit12hr: Number(item.km_limit_12hr) || 150,
            kmLimit24hr: Number(item.km_limit_24hr) || 250,
            excessKmRate: Number(item.excess_km_rate) || 6,
            extraHrRate: Number(item.extra_hr_rate) || 170,
            priceWeek: Number(item.price_week) || 16000,
            priceMonth: Number(item.price_month) || 52000,
            image: item.image || item.image_url || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
            status: item.status || 'Available',
            enabled: item.enabled !== false,
            featured: Boolean(item.featured)
          }));

          // Sync to memory
          const localData = ensureDbExists();
          localData.cars = mappedCars;
          saveDb(localData);
          return mappedCars;
        } else if (!error && data && data.length === 0) {
          // Table exists but is empty -> auto seed initial 17 official vehicles!
          const payload = INITIAL_CARS.map(c => ({
            id: c.id,
            name: c.name,
            brand: c.brand,
            model: c.model,
            type: c.type,
            fuel: c.fuel,
            transmission: c.transmission,
            seats: c.seats,
            mileage: c.mileage,
            price_hour: c.priceHour,
            price_day: c.priceDay,
            price_12hr: c.price12hr || 1600,
            price_24hr: c.price24hr || 2600,
            km_limit_12hr: c.kmLimit12hr || 150,
            km_limit_24hr: c.kmLimit24hr || 250,
            excess_km_rate: c.excessKmRate || 6,
            extra_hr_rate: c.extraHrRate || 170,
            price_week: c.priceWeek,
            price_month: c.priceMonth,
            image: c.image,
            status: c.status,
            enabled: c.enabled,
            featured: c.featured || false
          }));

          await supabase.from('cars').insert(payload);
          return INITIAL_CARS;
        }
      } catch (err) {
        console.error('Supabase getCarsAsync error:', err);
      }
    }

    return ensureDbExists().cars;
  },

  async addCarAsync(car: Omit<Car, 'id'>): Promise<Car> {
    const newCar: Car = {
      ...car,
      id: `car-${Date.now()}`
    };

    if (supabase) {
      try {
        await supabase.from('cars').insert([{
          id: newCar.id,
          name: newCar.name,
          brand: newCar.brand,
          model: newCar.model,
          type: newCar.type,
          fuel: newCar.fuel,
          transmission: newCar.transmission,
          seats: newCar.seats,
          mileage: newCar.mileage,
          price_hour: newCar.priceHour,
          price_day: newCar.priceDay,
          price_12hr: newCar.price12hr || 1600,
          price_24hr: newCar.price24hr || 2600,
          km_limit_12hr: newCar.kmLimit12hr || 150,
          km_limit_24hr: newCar.kmLimit24hr || 250,
          excess_km_rate: newCar.excessKmRate || 6,
          extra_hr_rate: newCar.extraHrRate || 170,
          price_week: newCar.priceWeek,
          price_month: newCar.priceMonth,
          image: newCar.image,
          status: newCar.status,
          enabled: newCar.enabled,
          featured: newCar.featured || false
        }]);
      } catch (err) {
        console.error('Supabase addCarAsync error:', err);
      }
    }

    const data = ensureDbExists();
    data.cars.unshift(newCar);
    saveDb(data);
    return newCar;
  },

  async updateCarAsync(id: string, updates: Partial<Car>): Promise<Car | null> {
    if (supabase) {
      try {
        const payload: Record<string, any> = {};
        if (updates.name !== undefined) payload.name = updates.name;
        if (updates.brand !== undefined) payload.brand = updates.brand;
        if (updates.model !== undefined) payload.model = updates.model;
        if (updates.type !== undefined) payload.type = updates.type;
        if (updates.fuel !== undefined) payload.fuel = updates.fuel;
        if (updates.transmission !== undefined) payload.transmission = updates.transmission;
        if (updates.seats !== undefined) payload.seats = updates.seats;
        if (updates.mileage !== undefined) payload.mileage = updates.mileage;
        if (updates.priceHour !== undefined) payload.price_hour = updates.priceHour;
        if (updates.priceDay !== undefined) payload.price_day = updates.priceDay;
        if (updates.price12hr !== undefined) payload.price_12hr = updates.price12hr;
        if (updates.price24hr !== undefined) payload.price_24hr = updates.price24hr;
        if (updates.kmLimit12hr !== undefined) payload.km_limit_12hr = updates.kmLimit12hr;
        if (updates.kmLimit24hr !== undefined) payload.km_limit_24hr = updates.kmLimit24hr;
        if (updates.excessKmRate !== undefined) payload.excess_km_rate = updates.excessKmRate;
        if (updates.extraHrRate !== undefined) payload.extra_hr_rate = updates.extraHrRate;
        if (updates.priceWeek !== undefined) payload.price_week = updates.priceWeek;
        if (updates.priceMonth !== undefined) payload.price_month = updates.priceMonth;
        if (updates.image !== undefined) payload.image = updates.image;
        if (updates.status !== undefined) payload.status = updates.status;
        if (updates.enabled !== undefined) payload.enabled = updates.enabled;
        if (updates.featured !== undefined) payload.featured = updates.featured;

        await supabase.from('cars').update(payload).eq('id', id);
      } catch (err) {
        console.error('Supabase updateCarAsync error:', err);
      }
    }

    const data = ensureDbExists();
    const index = data.cars.findIndex(c => c.id === id);
    if (index !== -1) {
      data.cars[index] = { ...data.cars[index], ...updates };
      saveDb(data);
      return data.cars[index];
    }

    return { id, ...updates } as Car;
  },

  async deleteCarAsync(id: string): Promise<boolean> {
    if (supabase) {
      try {
        await supabase.from('cars').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase deleteCarAsync error:', err);
      }
    }

    const data = ensureDbExists();
    const initialLength = data.cars.length;
    data.cars = data.cars.filter(c => c.id !== id);
    if (data.cars.length !== initialLength) {
      saveDb(data);
    }
    return true;
  },

  // Synchronous Car fallbacks for backward compatibility
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

  // Bookings Async (Supabase + Local fallback)
  async getBookingsAsync(): Promise<Booking[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          const mappedBookings: Booking[] = data.map(item => ({
            id: item.id || `bk-${Date.now()}`,
            customerName: item.customer_name || item.customerName || 'Customer',
            phone: item.phone || '',
            carId: item.car_id || item.carId || '',
            carName: item.car_name || item.carName || 'Vehicle',
            pickupDate: item.pickup_date || item.pickupDate || '',
            returnDate: item.return_date || item.returnDate || '',
            message: item.message || '',
            status: (item.status as Booking['status']) || 'Pending',
            createdAt: item.created_at || new Date().toISOString()
          }));

          const localData = ensureDbExists();
          localData.bookings = mappedBookings;
          saveDb(localData);
          return mappedBookings;
        }
      } catch (err) {
        console.error('Supabase getBookingsAsync error:', err);
      }
    }
    return ensureDbExists().bookings;
  },

  async addBookingAsync(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    if (supabase) {
      try {
        await supabase.from('bookings').insert([{
          id: newBooking.id,
          customer_name: newBooking.customerName,
          phone: newBooking.phone,
          car_id: newBooking.carId,
          car_name: newBooking.carName,
          pickup_date: newBooking.pickupDate,
          return_date: newBooking.returnDate,
          message: newBooking.message || '',
          status: newBooking.status,
          created_at: newBooking.createdAt
        }]);
      } catch (err) {
        console.error('Supabase addBookingAsync error:', err);
      }
    }

    const data = ensureDbExists();
    data.bookings.unshift(newBooking);
    saveDb(data);
    return newBooking;
  },

  async updateBookingStatusAsync(id: string, status: Booking['status']): Promise<Booking | null> {
    if (supabase) {
      try {
        await supabase.from('bookings').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Supabase updateBookingStatusAsync error:', err);
      }
    }

    const data = ensureDbExists();
    const booking = data.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
      saveDb(data);
      return booking;
    }
    return { id, status } as any;
  },

  // Settings Async (Supabase + Local fallback)
  async getSettingsAsync(): Promise<WebsiteSettings> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('settings').select('*').eq('id', 'main').single();
        if (!error && data) {
          const mappedSettings: WebsiteSettings = {
            phone: data.phone || INITIAL_SETTINGS.phone,
            whatsapp: data.whatsapp || INITIAL_SETTINGS.whatsapp,
            instagram: data.instagram || INITIAL_SETTINGS.instagram,
            address: data.address || INITIAL_SETTINGS.address,
            mapUrl: data.map_url || data.mapUrl || INITIAL_SETTINGS.mapUrl,
            heroTitle: data.hero_title || data.heroTitle || INITIAL_SETTINGS.heroTitle,
            heroSubtitle: data.hero_subtitle || data.heroSubtitle || INITIAL_SETTINGS.heroSubtitle,
            heroIntro: data.hero_intro || data.heroIntro || INITIAL_SETTINGS.heroIntro,
            footerText: data.footer_text || data.footerText || INITIAL_SETTINGS.footerText
          };

          const localData = ensureDbExists();
          localData.settings = mappedSettings;
          saveDb(localData);
          return mappedSettings;
        }
      } catch (err) {
        console.error('Supabase getSettingsAsync error:', err);
      }
    }
    return ensureDbExists().settings;
  },

  async updateSettingsAsync(newSettings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    const current = ensureDbExists().settings;
    const updated = { ...current, ...newSettings };

    if (supabase) {
      try {
        await supabase.from('settings').upsert({
          id: 'main',
          phone: updated.phone,
          whatsapp: updated.whatsapp,
          instagram: updated.instagram,
          address: updated.address,
          map_url: updated.mapUrl,
          hero_title: updated.heroTitle,
          hero_subtitle: updated.heroSubtitle,
          hero_intro: updated.heroIntro,
          footer_text: updated.footerText
        });
      } catch (err) {
        console.error('Supabase updateSettingsAsync error:', err);
      }
    }

    const data = ensureDbExists();
    data.settings = updated;
    saveDb(data);
    return updated;
  },

  // Gallery Async (Supabase + Local fallback)
  async getGalleryAsync(): Promise<GalleryItem[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          const mappedGallery: GalleryItem[] = data.map(item => ({
            id: item.id || `gal-${Date.now()}`,
            title: item.title,
            category: item.category || 'Fleet',
            imageUrl: item.image_url || item.imageUrl,
            createdAt: item.created_at || new Date().toISOString().split('T')[0]
          }));

          const localData = ensureDbExists();
          localData.gallery = mappedGallery;
          saveDb(localData);
          return mappedGallery;
        }
      } catch (err) {
        console.error('Supabase getGalleryAsync error:', err);
      }
    }
    return ensureDbExists().gallery;
  },

  async addGalleryItemAsync(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (supabase) {
      try {
        await supabase.from('gallery').insert([{
          id: newItem.id,
          title: newItem.title,
          category: newItem.category,
          image_url: newItem.imageUrl,
          created_at: newItem.createdAt
        }]);
      } catch (err) {
        console.error('Supabase addGalleryItemAsync error:', err);
      }
    }

    const data = ensureDbExists();
    data.gallery.unshift(newItem);
    saveDb(data);
    return newItem;
  },

  async deleteGalleryItemAsync(id: string): Promise<boolean> {
    if (supabase) {
      try {
        await supabase.from('gallery').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase deleteGalleryItemAsync error:', err);
      }
    }

    const data = ensureDbExists();
    data.gallery = data.gallery.filter(g => g.id !== id);
    saveDb(data);
    return true;
  },

  // Synchronous Car fallbacks for backward compatibility
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

  getSettings(): WebsiteSettings {
    return ensureDbExists().settings;
  },

  updateSettings(newSettings: Partial<WebsiteSettings>): WebsiteSettings {
    const data = ensureDbExists();
    data.settings = { ...data.settings, ...newSettings };
    saveDb(data);
    return data.settings;
  },

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
    data.gallery = data.gallery.filter(g => g.id !== id);
    saveDb(data);
    return true;
  }
};
