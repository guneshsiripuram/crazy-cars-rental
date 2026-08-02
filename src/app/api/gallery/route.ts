import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const gallery = await db.getGalleryAsync();
    return NextResponse.json(
      { success: true, data: gallery },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
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
    const newItem = await db.addGalleryItemAsync({
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
    const deleted = await db.deleteGalleryItemAsync(id);
    return NextResponse.json({ success: deleted, message: deleted ? 'Deleted' : 'Not found' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete gallery item' }, { status: 500 });
  }
}
