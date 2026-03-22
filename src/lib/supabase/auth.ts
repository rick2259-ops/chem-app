import { supabase } from './client';
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';

export const AUTH_USER_KEY = 'supabase-auth-uid';

export async function sendMagicLink(email: string): Promise<string | null> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : '' },
  });
  return error ? error.message : null;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
) {
  return supabase.auth.onAuthStateChange(callback);
}

/** Returns the Supabase auth UID if logged in, else null */
export function getAuthUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_USER_KEY);
}
