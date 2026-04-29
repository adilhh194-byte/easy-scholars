'use client';

import { useState } from 'react';
import { Database, Upload, CheckCircle, AlertCircle, RefreshCw, ShieldAlert, XCircle } from 'lucide-react';
import { seedScholarships } from '@/lib/scholarships';
import { MOCK_SCHOLARSHIPS } from '@/lib/mock-data';

function isRichComplete(s: typeof MOCK_SCHOLARSHIPS[number]): boolean {
  return (
    (s.eligibility?.length ?? 0) >= 3 &&
    (s.coverageDetails?.length ?? 0) >= 2 &&
    (s.requiredDocuments?.length ?? 0) >= 2 &&
    (s.applicationProcess?.length ?? 0) >= 3 &&
    (s.applicationTips?.length ?? 0) >= 2 &&
    !!s.officialSourceUrl
  );
}

function QualityBadge({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
      <CheckCircle className="w-3 h-3" /> Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
      <AlertCircle className="w-3 h-3" /> Needs review
    </span>
  );
}

export default function AdminPage() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="page-container py-20 text-center">
        <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-6 h-6 text-red-500" />
        </div>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Admin tools are disabled in production.</h1>
        <p className="text-slate-500 dark:text-slate-400">This page is only available in development mode.</p>
      </div>
    );
  }

  const handleSeed = async () => {
    setLoading(true);
    setStatus(null);
    const result = await seedScholarships();
    setStatus(result);
    setLoading(false);
  };

  const richCount = MOCK_SCHOLARSHIPS.filter(isRichComplete).length;
  const sourceCount = MOCK_SCHOLARSHIPS.filter(s => !!s.officialSourceUrl).length;

  return (
    <div className="page-container py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-slate-800 dark:bg-slate-200 flex items-center justify-center">
            <Database className="w-5 h-5 text-white dark:text-slate-800" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Admin Panel</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage scholarship data and review quality</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4">
            <p className="text-2xl font-semibold text-slate-800 dark:text-slate-200">{MOCK_SCHOLARSHIPS.length}</p>
            <p className="text-xs text-slate-500">Total scholarships</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{richCount}</p>
            <p className="text-xs text-slate-500">Rich details complete</p>
          </div>
          <div className="card p-4">
            <p className="text-2xl font-semibold text-slate-600 dark:text-slate-400">{sourceCount}</p>
            <p className="text-xs text-slate-500">Have official source</p>
          </div>
        </div>

        {/* Seed card */}
        <div className="card p-5 mb-8">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-slate-500" />
            Seed Database
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Push {MOCK_SCHOLARSHIPS.length} scholarships to Firestore. Requires Firebase credentials in <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">.env.local</code>.
          </p>
          <button onClick={handleSeed} disabled={loading} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Seeding…</> : <><Upload className="w-4 h-4" /> Seed {MOCK_SCHOLARSHIPS.length} Scholarships</>}
          </button>
          {status && (
            <div className={`mt-4 flex items-start gap-2 p-3 rounded-lg text-sm ${status.success ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
              {status.success ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
              {status.message}
            </div>
          )}
        </div>

        {/* Quality table */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-500" />
              Data Quality Overview
              <span className="text-xs font-medium text-slate-400 ml-auto">{MOCK_SCHOLARSHIPS.length} records</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left font-medium text-slate-500 px-4 py-2.5 text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left font-medium text-slate-500 px-4 py-2.5 text-xs uppercase tracking-wider">Country</th>
                  <th className="text-left font-medium text-slate-500 px-4 py-2.5 text-xs uppercase tracking-wider">Funding</th>
                  <th className="text-left font-medium text-slate-500 px-4 py-2.5 text-xs uppercase tracking-wider">Deadline</th>
                  <th className="text-left font-medium text-slate-500 px-4 py-2.5 text-xs uppercase tracking-wider">Source</th>
                  <th className="text-left font-medium text-slate-500 px-4 py-2.5 text-xs uppercase tracking-wider">Verified</th>
                  <th className="text-left font-medium text-slate-500 px-4 py-2.5 text-xs uppercase tracking-wider">Rich Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_SCHOLARSHIPS.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-slate-800 dark:text-slate-200 max-w-[200px] truncate">{s.title}</td>
                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{s.countryCode} {s.country}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        s.fundingType === 'Fully Funded' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>{s.fundingType}</span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400 text-xs">{s.deadline}</td>
                    <td className="px-4 py-2.5">
                      {s.officialSourceUrl ? (
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">✓ Yes</span>
                      ) : (
                        <span className="text-xs font-medium text-red-500">✗ Missing</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{s.lastVerified || '—'}</td>
                    <td className="px-4 py-2.5"><QualityBadge ok={isRichComplete(s)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Config hint */}
        <div className="mt-8 card p-5">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Firebase Configuration</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            Create <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">.env.local</code> with:
          </p>
          <pre className="bg-slate-900 dark:bg-slate-950 text-slate-300 rounded-lg p-4 text-xs overflow-x-auto leading-relaxed">
{`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`}
          </pre>
        </div>
      </div>
    </div>
  );
}
