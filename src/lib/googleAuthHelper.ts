'use client';

export interface GoogleJwtPayload {
  iss?: string;
  sub: string; // Permanent Unique Google User ID
  azp?: string;
  aud?: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: number;
  exp?: number;
}

// Decode base64url encoded JWT payload safely
export function decodeGoogleJwt(token: string): GoogleJwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Failed to parse Google JWT token:', err);
    return null;
  }
}

// Get configured Google Client ID
export function getGoogleClientId(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('prep_ielts_google_client_id');
    if (stored && stored.trim()) return stored.trim();
  }
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
}

// Save Google Client ID
export function setGoogleClientId(id: string) {
  if (typeof window !== 'undefined') {
    if (id.trim()) {
      localStorage.setItem('prep_ielts_google_client_id', id.trim());
    } else {
      localStorage.removeItem('prep_ielts_google_client_id');
    }
  }
}
