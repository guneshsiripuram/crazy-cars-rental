import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    // Admin password set to 182026
    if (password === '182026') {
      return NextResponse.json({ success: true, token: 'crazy-cars-admin-token-2026' });
    }
    return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 500 });
  }
}
