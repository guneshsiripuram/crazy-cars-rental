import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const gallery = db.getGallery();
    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, imageUrl } = body;
    if (!title || !imageUrl) {
      return NextResponse.json({ success: false, message: 'Title and image URL required' }, { status: 400 });
    }
    const newItem = db.addGalleryItem({
      title,
      category: category || 'Fleet',
      imageUrl
    });
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to add gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }
    const deleted = db.deleteGalleryItem(id);
    return NextResponse.json({ success: deleted, message: deleted ? 'Deleted' : 'Not found' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete item' }, { status: 500 });
  }
}
