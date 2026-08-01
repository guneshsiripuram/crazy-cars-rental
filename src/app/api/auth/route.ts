import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    // Default admin password 'admin123'
    if (password === 'admin123' || password === 'crazycars2026') {
      return NextResponse.json({ success: true, token: 'crazy-cars-admin-token-2026' });
    }
    return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 500 });
  }
}
