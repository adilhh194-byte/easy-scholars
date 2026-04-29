import Link from 'next/link';
import { ArrowRight, Globe, GraduationCap, Users, ExternalLink, CheckCircle, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ScholarshipCard from '@/components/ScholarshipCard';
import CategoryCard from '@/components/CategoryCard';
import { getFeaturedScholarships, getLatestScholarships, getCategories } from '@/lib/scholarships';

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedScholarships(),
    getLatestScholarships(6),
    getCategories(),
  ]);

  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800">
        <div className="page-container py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-5 tracking-tight">
              Find verified scholarship opportunities worldwide
            </h1>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Clear eligibility criteria, verified deadlines, and step-by-step application guidance for
              fully funded scholarships across 20+ countries.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar size="lg" placeholder="Search by country, university, or scholarship name…" />
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 dark:text-slate-500 text-sm">
              {[
                { icon: Globe, label: '20+ Countries' },
                { icon: GraduationCap, label: '50+ Scholarships' },
                { icon: Users, label: 'Free to use' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Section ─────────────────────────────────────────────────── */}
      <section className="page-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ExternalLink, title: 'Official sources', desc: 'Every scholarship links to its official programme page.' },
            { icon: Calendar, title: 'Verified deadlines', desc: 'Deadlines are checked and marked when estimated.' },
            { icon: CheckCircle, title: 'Clear eligibility', desc: 'Know exactly what is required before you apply.' },
            { icon: BookOpen, title: 'Application guidance', desc: 'Step-by-step process, required documents, and tips.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-5">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Scholarships ────────────────────────────────────────── */}
      <section className="page-container py-12 sm:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="section-title">Top Scholarships</h2>
            <p className="section-subtitle">Fully funded opportunities with verified eligibility and deadlines</p>
          </div>
          <Link href="/scholarships" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((s, i) => (
            <ScholarshipCard key={s.id} scholarship={s} className={i >= 3 ? 'hidden lg:block' : ''} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/scholarships" className="btn-primary">
            View All Scholarships <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── Categories ────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="page-container py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Explore scholarships by type — government awards, university grants, and foundation programmes
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Scholarships ─────────────────────────────────────────── */}
      <section className="page-container py-12 sm:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Recently Added</h2>
            <p className="section-subtitle">The newest verified scholarship listings</p>
          </div>
          <Link href="/scholarships" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map(s => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────────────────────── */}
      <section className="page-container pb-16">
        <div className="rounded-2xl bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 p-10 sm:p-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 tracking-tight">
            Prepare a stronger application
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Read our step-by-step guide covering personal statements, recommendation letters, and
            interview preparation for international scholarships.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/guide" className="bg-white text-slate-800 hover:bg-slate-100 font-medium rounded-xl px-6 py-3 transition-all inline-flex items-center gap-2 text-sm">
              Read Free Guide <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/scholarships" className="text-white border border-slate-600 hover:bg-slate-700 font-medium rounded-xl px-6 py-3 transition-all inline-flex items-center gap-2 text-sm">
              Browse Scholarships
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
