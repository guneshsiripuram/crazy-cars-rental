import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const bookings = db.getBookings();
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, carId, carName, pickupDate, returnDate, message } = body;
    
    if (!customerName || !phone || !carName || !pickupDate || !returnDate) {
      return NextResponse.json({ success: false, message: 'Please fill in all required fields' }, { status: 400 });
    }

    // Save to memory / local db fallback
    const newBooking = db.addBooking({
      customerName,
      phone,
      carId: carId || '',
      carName,
      pickupDate,
      returnDate,
      message
    });

    // Try saving to Supabase DB table if configured
    if (supabase) {
      try {
        await supabase.from('bookings').insert([
          {
            customer_name: customerName,
            phone,
            car_name: carName,
            pickup_date: pickupDate,
            return_date: returnDate,
            message,
            status: 'Pending'
          }
        ]);
      } catch {
        // Supabase DB table insert optional fail-safe
      }
    }

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    console.error('Booking creation error:', error);
    // Return graceful fallback so user can complete booking & WhatsApp dispatch
    return NextResponse.json({
      success: true,
      data: {
        id: `bk-${Date.now()}`,
        customerName: 'Customer',
        status: 'Pending'
      }
    }, { status: 201 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and Status are required' }, { status: 400 });
    }
    const updated = db.updateBookingStatus(id, status);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update booking status' }, { status: 500 });
  }
}
