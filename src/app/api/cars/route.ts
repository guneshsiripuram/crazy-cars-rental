import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cars = db.getCars();
    return NextResponse.json({ success: true, data: cars });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch cars' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCar = db.addCar(body);
    return NextResponse.json({ success: true, data: newCar }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create car' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Car ID is required' }, { status: 400 });
    }
    const updatedCar = db.updateCar(id, updates);
    if (!updatedCar) {
      return NextResponse.json({ success: false, message: 'Car not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedCar });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update car' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Car ID is required' }, { status: 400 });
    }
    const deleted = db.deleteCar(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Car not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Car deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete car' }, { status: 500 });
  }
}
