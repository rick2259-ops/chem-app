'use client';

import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { sendMagicLink, signOut, getSession, onAuthStateChange, AUTH_USER_KEY } from '@/lib/supabase/auth';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [session, setSession]     = useState<Session | null>(null);
  const [checking, setChecking]   = useState(true);
  const [email, setEmail]         = useState('');
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    getSession().then(s => {
      setSession(s);
      if (s?.user) localStorage.setItem(AUTH_USER_KEY, s.user.id);
      setChecking(false);
    });

    const { data: listener } = onAuthStateChange((event, s) => {
      setSession(s);
      if (s?.user) {
        localStorage.setItem(AUTH_USER_KEY, s.user.id);
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setError('');
    const err = await sendMagicLink(email.trim());
    setSending(false);
    if (err) { setError(err); }
    else { setSent(true); }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">⚗️</div>
            <h1 className="text-2xl font-bold text-white mb-1">UCR Chem Trainer</h1>
            <p className="text-slate-400 text-sm">Sign in to save your progress across all devices</p>
          </div>

          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
            {sent ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">📬</div>
                <p className="text-white font-semibold mb-1">Check your email</p>
                <p className="text-slate-400 text-sm">
                  We sent a sign-in link to <span className="text-violet-300">{email}</span>
                </p>
                <button
                  onClick={() => { setSent(false); setEmail(''); }}
                  className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@ucr.edu"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending || !email.trim()}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Magic Link'
                  )}
                </button>

                <p className="text-center text-xs text-slate-500">
                  No password needed — we email you a sign-in link
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Sign-out button — floats in top right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <span className="text-xs text-slate-500 hidden sm:block">{session.user.email}</span>
        <button
          onClick={signOut}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>
      {children}
    </>
  );
}
