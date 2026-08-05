// Server-side admin verification secret key
export const ADMIN_SECRET = process.env.ADMIN_SECRET || 'crazy-cars-admin-sec-2026-v2';

export function isAuthorizedAdmin(request: Request): boolean {
  const authHeader = request.headers.get('authorization') || '';
  const adminHeader = request.headers.get('x-admin-token') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim() || adminHeader.trim();

  return Boolean(token && token === ADMIN_SECRET);
}
