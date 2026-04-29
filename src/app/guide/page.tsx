import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, GraduationCap, Star } from 'lucide-react';
import GuideSteps from '@/components/GuideSteps';
import { getGuides } from '@/lib/scholarships';

export const metadata: Metadata = {
  title: 'Scholarship Guide',
  description: 'Step-by-step guide to finding, applying, and winning international scholarships. From search strategies to interview preparation.',
};

export default async function GuidePage() {
  const guides = await getGuides();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-600 to-primary-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute top-10 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

        <div className="relative page-container py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/10">
            <Star className="w-4 h-4 text-amber-300" />
            <span className="text-sm text-white/90 font-medium">Free comprehensive guide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-4">
            Your Scholarship
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100">
              Success Guide
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about finding, applying to, and winning international scholarships — 
            from search strategies to interview preparation.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { num: '4', label: 'Modules' },
              { num: '12', label: 'Lessons' },
              { num: '45 min', label: 'Total Read Time' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-semibold text-white">{stat.num}</p>
                <p className="text-xs text-white/60 uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 28C1200 26 1320 22 1380 20L1440 18V60H0Z" className="fill-slate-50 dark:fill-slate-950"/>
          </svg>
        </div>
      </section>

      {/* Guide modules */}
      <section className="page-container py-12 sm:py-16">
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {guides.map((guide, i) => (
            <a
              key={guide.id}
              href={`#guide-${guide.id}`}
              className="card p-5 hover:shadow-card-hover transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-slate-100 dark:from-primary-900/30 dark:to-slate-900/30 flex items-center justify-center text-xl">
                  {guide.icon}
                </div>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                  Module {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                {guide.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {guide.lessons.length} lessons
              </p>
            </a>
          ))}
        </div>

        {/* Guide content */}
        <div className="max-w-3xl mx-auto space-y-16">
          {guides.map((guide) => (
            <div key={guide.id} id={`guide-${guide.id}`} className="scroll-mt-24">
              <GuideSteps guide={guide} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="card p-8 sm:p-10 bg-gradient-to-br from-primary-50 to-slate-50 dark:from-primary-900/10 dark:to-slate-900/10 border-primary-200 dark:border-primary-800">
            <GraduationCap className="w-10 h-10 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Ready to Apply?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Browse our curated database of international scholarships and start your application today.
            </p>
            <Link href="/scholarships" className="btn-primary">
              Browse Scholarships <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
