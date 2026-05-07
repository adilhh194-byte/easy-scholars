'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Lock, AlertCircle, ShieldCheck } from 'lucide-react';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { isAllowedAdminEmail } from '@/lib/admin-auth';

function getAuthErrorMessage(error: unknown): string {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';

  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password') || code.includes('auth/user-not-found')) {
    return 'Invalid email or password.';
  }

  if (code.includes('auth/too-many-requests')) {
    return 'Too many attempts. Please try again later.';
  }

  return 'Unable to sign in. Please check your details and try again.';
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentAuth = auth;
    if (!currentAuth) return;

    return onAuthStateChanged(currentAuth, async (user) => {
      if (!user) return;

      if (isAllowedAdminEmail(user.email)) {
        router.replace('/admin');
        return;
      }

      await signOut(currentAuth);
      setError('You are not authorized to access this admin area.');
    });
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!isFirebaseConfigured() || !auth) {
      setError('Firebase Authentication is not configured.');
      return;
    }

    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);

      if (!isAllowedAdminEmail(credential.user.email)) {
        await signOut(auth);
        setError('You are not authorized to access this admin area.');
        return;
      }

      router.replace('/admin');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20 sm:p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
            <Lock className="h-5 w-5" />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Admin Login</h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              Admin access is restricted.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-800/60"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-800/60"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-2xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full rounded-2xl py-3 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
