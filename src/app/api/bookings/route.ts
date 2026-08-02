import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Booking } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const bookings = await db.getBookingsAsync();
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

    const newBooking = await db.addBookingAsync({
      customerName,
      phone,
      carId: carId || '',
      carName,
      pickupDate: pickupDate || '',
      returnDate: returnDate || '',
      message: message || ''
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to submit booking request' }, { status: 400 });
  }
}

async function updateBookingHandler(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Booking ID and status are required' }, { status: 400 });
    }

    const updatedBooking = await db.updateBookingStatusAsync(id, status as Booking['status']);
    if (!updatedBooking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update booking status' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  return updateBookingHandler(request);
}

export async function PATCH(request: Request) {
  return updateBookingHandler(request);
}
