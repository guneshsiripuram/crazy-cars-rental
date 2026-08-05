import { NextResponse } from 'next/server';
import { verifySessionToken } from './auth';

export function requireAdmin(req: Request): NextResponse | null {
  const authHeader = req.headers.get('authorization') || '';
  const adminHeader = req.headers.get('x-admin-token') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim() || adminHeader.trim();

  if (!verifySessionToken(token)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Admin authorization required.' },
      { status: 401 }
    );
  }
  return null;
}
