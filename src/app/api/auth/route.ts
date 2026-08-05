import { NextResponse } from 'next/server';
import { ADMIN_SECRET } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    
    if (!body || typeof body.password !== 'string') {
      return NextResponse.json({ success: false, message: 'Password is required' }, { status: 400 });
    }

    const { password } = body;

    // Admin PIN check
    if (password === '182026') {
      return NextResponse.json({
        success: true,
        token: ADMIN_SECRET
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
  }
}
