import Link from 'next/link';
import { ArrowRight, Sparkles, Globe, GraduationCap, TrendingUp, Users } from 'lucide-react';
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
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-violet-600 to-purple-700 animate-gradient-x" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />

        <div className="relative page-container py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm text-white/90 font-medium">Trusted by 50,000+ students worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
              Your Gateway to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100">
                Global Scholarships
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Discover fully-funded scholarships from 50+ countries. Filter by degree level, 
              country, and funding type — all in one place.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar size="lg" placeholder="Search scholarships by country, university, or keyword…" />
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/70 text-sm">
              {[
                { icon: Globe, label: '50+ Countries', value: '' },
                { icon: GraduationCap, label: '500+ Scholarships', value: '' },
                { icon: Users, label: '100% Free', value: '' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-amber-300/80" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 48C1200 48 1320 40 1380 36L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" className="fill-slate-50 dark:fill-slate-950"/>
          </svg>
        </div>
      </section>

      {/* ─── Featured Scholarships ────────────────────────────────────────── */}
      <section className="page-container py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="section-title">Top Scholarships</h2>
            <p className="section-subtitle">Hand-picked fully-funded opportunities you shouldn&apos;t miss</p>
          </div>
          <Link href="/scholarships" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group">
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
      <section className="bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="page-container py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Explore scholarships organized by type — from government-funded awards to university-specific grants
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
      <section className="page-container py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Latest</span>
            </div>
            <h2 className="section-title">Recently Added</h2>
            <p className="section-subtitle">The newest scholarship opportunities from around the world</p>
          </div>
          <Link href="/scholarships" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group">
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
      <section className="page-container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-violet-600 to-purple-700 p-10 sm:p-16 text-center">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8 text-lg font-light">
              Read our step-by-step scholarship guide to maximize your chances of winning a fully-funded scholarship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/guide" className="bg-white text-primary-700 hover:bg-white/90 font-semibold rounded-xl px-6 py-3 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-sm">
                Read Free Guide <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/scholarships" className="text-white border border-white/30 hover:bg-white/10 font-semibold rounded-xl px-6 py-3 transition-all inline-flex items-center gap-2 text-sm">
                Browse Scholarships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
