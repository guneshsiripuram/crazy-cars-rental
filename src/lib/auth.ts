import crypto from 'crypto';

const SECRET = process.env.ADMIN_AUTH_SECRET || 'crazy-cars-sec-fallback-key-2026-v99';
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours expiry

export function createSessionToken(): string {
  const payload = `${Date.now() + TOKEN_TTL_MS}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [exp, sig] = parts;
  const expected = crypto.createHmac('sha256', SECRET).update(exp).digest('hex');
  if (sig !== expected) return false;
  if (Date.now() > Number(exp)) return false;
  return true;
}
