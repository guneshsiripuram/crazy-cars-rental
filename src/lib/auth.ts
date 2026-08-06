import crypto from 'crypto';

function getAuthSecret(): string {
  const secret = process.env.ADMIN_AUTH_SECRET || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!secret) {
    throw new Error('ADMIN_AUTH_SECRET environment variable is missing.');
  }
  return secret;
}

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours expiry

export function createSessionToken(): string {
  const secret = getAuthSecret();
  const payload = `${Date.now() + TOKEN_TTL_MS}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const secret = getAuthSecret();
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [exp, sig] = parts;
    const expected = crypto.createHmac('sha256', secret).update(exp).digest('hex');
    if (sig !== expected) return false;
    if (Date.now() > Number(exp)) return false;
    return true;
  } catch (err) {
    console.error('Auth verification error:', err);
    return false;
  }
}
