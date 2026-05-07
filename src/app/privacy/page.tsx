import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for EasyScholars.',
};

export default function PrivacyPage() {
  return (
    <div className="page-container py-16">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Shield className="w-3.5 h-3.5" />
          Privacy
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            EasyScholars is a scholarship information website. We aim to keep the platform simple,
            useful, and respectful of student privacy.
          </p>

          <section>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">Information we show</h2>
            <p>
              Scholarship records are compiled from official scholarship, government, embassy,
              university, or programme sources. Applicants should always confirm deadlines,
              eligibility, benefits, and application steps on the linked official source before applying.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">Personal data</h2>
            <p>
              EasyScholars does not ask visitors to create an account or submit personal application
              documents through this website. If you contact us by email, your email address and
              message are used only to respond to your request.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">External links</h2>
            <p>
              The website links to official scholarship and university pages. Those external websites
              have their own privacy policies and data practices.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
