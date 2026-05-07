import type { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact EasyScholars by email.',
};

export default function ContactPage() {
  return (
    <div className="page-container py-16">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Mail className="w-3.5 h-3.5" />
          Contact
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
          Contact EasyScholars
        </h1>

        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-8">
          For corrections, suggestions, or questions about the scholarship data, email the EasyScholars team.
        </p>

        <a
          href="mailto:ahussain@edu.hse.ru"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-100 px-5 py-3 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white transition-colors"
        >
          <Mail className="w-4 h-4" />
          ahussain@edu.hse.ru
        </a>
      </div>
    </div>
  );
}
