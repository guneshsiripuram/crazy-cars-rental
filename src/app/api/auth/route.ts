import { NextResponse } from 'next/server';
import { createSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.password !== 'string') {
      return NextResponse.json({ success: false, message: 'Password is required' }, { status: 400 });
    }

    const adminPin = process.env.ADMIN_PIN || '182026';
    if (body.password !== adminPin) {
      return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      token: createSessionToken()
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
  }
}
