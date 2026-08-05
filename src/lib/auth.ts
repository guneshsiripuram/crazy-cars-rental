export const ADMIN_TOKEN = 'crazy-cars-admin-token-2026';

export function isAuthorizedAdmin(request: Request): boolean {
  const authHeader = request.headers.get('authorization') || '';
  const adminHeader = request.headers.get('x-admin-token') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim() || adminHeader.trim();
  
  return token === ADMIN_TOKEN;
}
