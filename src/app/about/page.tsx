import type { Metadata } from 'next';
import { GraduationCap, Search, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about EasyScholars and the HSE students building it.',
};

export default function AboutPage() {
  return (
    <div className="page-container py-16">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <GraduationCap className="w-3.5 h-3.5" />
          Built by students, for students
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
          About EasyScholars
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-8">
          EasyScholars helps students discover international scholarship opportunities with clear
          eligibility, funding details, application steps, and links to official sources.
        </p>

        <div className="space-y-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            We are HSE students building a practical scholarship search platform for applicants who
            need trustworthy information without sorting through noisy or outdated listings.
          </p>
          <p>
            Our focus is simple: collect scholarship data from official programme, government,
            embassy, university, and scholarship-provider sources, then present it in a way that is
            easier to compare and act on.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-5">
            <Search className="w-5 h-5 text-slate-500 dark:text-slate-400 mb-3" />
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Easier discovery</h2>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Search by country, degree level, funding type, and applicant-country eligibility.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-5">
            <ShieldCheck className="w-5 h-5 text-slate-500 dark:text-slate-400 mb-3" />
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Source-backed data</h2>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Scholarship records link back to official sources so applicants can confirm details before applying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
