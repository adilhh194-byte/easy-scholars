export const ALLOWED_ADMIN_EMAIL = 'adilhh194@gmail.com';

export function isAllowedAdminEmail(email?: string | null): boolean {
  return email === ALLOWED_ADMIN_EMAIL;
}
