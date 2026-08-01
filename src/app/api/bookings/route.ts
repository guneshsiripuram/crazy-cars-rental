import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
      return NextResponse.json({ success: false, message: 'Required fields missing' }, { status: 400 });
    }

    const newBooking = db.addBooking({
      customerName,
      phone,
      carId: carId || '',
      carName,
      pickupDate,
      returnDate,
      message
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create booking' }, { status: 500 });
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
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update booking status' }, { status: 500 });
  }
}
