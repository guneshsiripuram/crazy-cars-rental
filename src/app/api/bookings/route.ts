import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const bookings = db.getBookings();
    return NextResponse.json(
      { success: true, data: bookings },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, carId, carName, pickupDate, returnDate, message } = body;

    if (!customerName || !phone || !carName) {
      return NextResponse.json({ success: false, message: 'Missing required booking details' }, { status: 400 });
    }

    const newBooking = db.addBooking({
      customerName,
      phone,
      carId: carId || '',
      carName,
      pickupDate: pickupDate || '',
      returnDate: returnDate || '',
      message: message || ''
    });

    if (supabase) {
      try {
        await supabase.from('bookings').insert([{
          customer_name: customerName,
          phone,
          car_id: carId || '',
          car_name: carName,
          pickup_date: pickupDate || '',
          return_date: returnDate || '',
          message: message || '',
          status: 'Pending'
        }]);
      } catch (err) {
        console.error('Supabase booking insert error:', err);
      }
    }

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to submit booking request' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Booking ID and status are required' }, { status: 400 });
    }

    const updatedBooking = db.updateBookingStatus(id, status);
    if (!updatedBooking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    if (supabase) {
      try {
        await supabase.from('bookings').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Supabase update booking error:', err);
      }
    }

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update booking status' }, { status: 400 });
  }
}
