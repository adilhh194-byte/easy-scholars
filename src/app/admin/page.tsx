'use client';

import { useState } from 'react';
import { Database, Upload, CheckCircle, AlertCircle, RefreshCw, ShieldAlert } from 'lucide-react';
import { seedScholarships } from '@/lib/scholarships';
import { MOCK_SCHOLARSHIPS } from '@/lib/mock-data';

export default function AdminPage() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Block access in production
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="page-container py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Access Denied</h1>
        <p className="text-slate-500 dark:text-slate-400">Admin panel is only available in development mode.</p>
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

  return (
    <div className="page-container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-slate-600 flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Admin Panel</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage scholarship data and seed Firestore</p>
          </div>
        </div>

        {/* Seed card */}
        <div className="card p-6 mb-8">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary-500" />
            Seed Database
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Push {MOCK_SCHOLARSHIPS.length} sample scholarships to your Firestore database. 
            Requires Firebase credentials in <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">.env.local</code>.
          </p>

          <button
            onClick={handleSeed}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Seeding…
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Seed {MOCK_SCHOLARSHIPS.length} Scholarships
              </>
            )}
          </button>

          {status && (
            <div className={`mt-4 flex items-start gap-2 p-3 rounded-xl text-sm ${
              status.success
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            }`}>
              {status.success ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
              {status.message}
            </div>
          )}
        </div>

        {/* Data overview table */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-primary-500" />
              Mock Data Overview
              <span className="text-xs font-medium text-slate-400 ml-auto">{MOCK_SCHOLARSHIPS.length} records</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 text-xs uppercase tracking-wider">ID</th>
                  <th className="text-left font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 text-xs uppercase tracking-wider">Country</th>
                  <th className="text-left font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 text-xs uppercase tracking-wider">Degree</th>
                  <th className="text-left font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 text-xs uppercase tracking-wider">Funding</th>
                  <th className="text-left font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 text-xs uppercase tracking-wider">Deadline</th>
                  <th className="text-left font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 text-xs uppercase tracking-wider">Featured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_SCHOLARSHIPS.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">{s.id}</td>
                    <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-200 max-w-[200px] truncate">{s.title}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{s.countryCode} {s.country}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.degreeLevel.map(d => (
                          <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium">{d}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        s.fundingType === 'Fully Funded'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                      }`}>
                        {s.fundingType}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-400 text-xs">{s.deadline}</td>
                    <td className="px-5 py-3">
                      {s.featured ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <span className="text-slate-300 dark:text-slate-700">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Firebase config hint */}
        <div className="mt-8 card p-6">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3">Firebase Configuration</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            Create a <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">.env.local</code> file in the project root with your Firebase credentials:
          </p>
          <pre className="bg-slate-900 dark:bg-slate-950 text-slate-300 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
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
