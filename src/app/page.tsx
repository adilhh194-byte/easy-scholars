import Link from 'next/link';
import {
  ArrowRight, Globe, GraduationCap, Users, ExternalLink, CheckCircle,
  Calendar, BookOpen, TrendingUp, Search, FileText, Award, MapPin,
  ClipboardList, Shield, Sparkles
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ScholarshipCard from '@/components/ScholarshipCard';
import CategoryCard from '@/components/CategoryCard';
import { getFeaturedScholarships, getLatestScholarships, getCategories } from '@/lib/scholarships';

/* ── SVG hero illustration (education-themed, inline) ────────────── */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      {/* Decorative background shapes */}
      <div className="absolute -top-6 -right-6 w-48 h-48 bg-teal-100/40 dark:bg-teal-900/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-2xl" />

      <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full h-auto drop-shadow-sm">
        {/* Globe */}
        <circle cx="200" cy="170" r="100" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
        <ellipse cx="200" cy="170" rx="60" ry="100" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
        <path d="M100 170 Q200 140 300 170" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
        <path d="M100 170 Q200 200 300 170" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />

        {/* Continent shapes (simplified) */}
        <path d="M165 110 Q175 100 185 105 Q195 110 190 120 Q185 130 175 125 Q165 120 165 110Z" fill="#5eead4" opacity="0.6" />
        <path d="M210 120 Q225 115 235 125 Q240 135 230 140 Q220 145 210 135 Q205 128 210 120Z" fill="#5eead4" opacity="0.5" />
        <path d="M180 180 Q195 175 205 185 Q210 195 200 200 Q190 205 182 195 Q175 188 180 180Z" fill="#5eead4" opacity="0.4" />

        {/* Graduation cap */}
        <g transform="translate(280, 60)">
          <polygon points="0,20 40,0 80,20 40,40" fill="#334155" />
          <rect x="36" y="20" width="8" height="25" rx="2" fill="#475569" />
          <circle cx="40" cy="50" r="5" fill="#334155" />
          <path d="M40 45 L40 30" stroke="#475569" strokeWidth="2" />
          <path d="M55 22 L70 35" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <circle cx="72" cy="37" r="3" fill="#fbbf24" />
        </g>

        {/* Book */}
        <g transform="translate(50, 230)">
          <rect x="0" y="10" width="70" height="50" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="5" y="5" width="70" height="50" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="50" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="15" y1="18" x2="35" y2="18" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="25" x2="35" y2="25" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
          <line x1="15" y1="32" x2="30" y2="32" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
          <line x1="47" y1="18" x2="67" y2="18" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="47" y1="25" x2="67" y2="25" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Certificate */}
        <g transform="translate(260, 220)">
          <rect x="0" y="0" width="90" height="65" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="15" y1="14" x2="75" y2="14" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="24" x2="70" y2="24" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round" />
          <line x1="25" y1="32" x2="65" y2="32" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round" />
          <circle cx="45" cy="48" r="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M41 48 L44 51 L50 44" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Location pins on globe */}
        <g transform="translate(170, 95)">
          <path d="M5 0 C5 -7 -5 -7 -5 0 C-5 5 5 12 0 16 C-5 12 -15 5 -15 0 C-15 -12 15 -12 15 0 Z" fill="#f87171" opacity="0.8" transform="scale(0.5)" />
        </g>
        <g transform="translate(225, 130)">
          <path d="M5 0 C5 -7 -5 -7 -5 0 C-5 5 5 12 0 16 C-5 12 -15 5 -15 0 C-15 -12 15 -12 15 0 Z" fill="#f87171" opacity="0.8" transform="scale(0.5)" />
        </g>
        <g transform="translate(188, 185)">
          <path d="M5 0 C5 -7 -5 -7 -5 0 C-5 5 5 12 0 16 C-5 12 -15 5 -15 0 C-15 -12 15 -12 15 0 Z" fill="#f87171" opacity="0.8" transform="scale(0.5)" />
        </g>

        {/* Connecting dots/lines between elements */}
        <circle cx="150" cy="120" r="2" fill="#5eead4" opacity="0.6" />
        <circle cx="260" cy="200" r="2" fill="#5eead4" opacity="0.6" />
        <circle cx="130" cy="220" r="2" fill="#5eead4" opacity="0.6" />
      </svg>
    </div>
  );
}

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedScholarships(),
    getLatestScholarships(6),
    getCategories(),
  ]);

  return (
    <>
      {/* ═══ HERO SECTION ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

        {/* Subtle decorative shapes */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-teal-100/20 dark:bg-teal-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/5 rounded-full blur-3xl" />

        <div className="relative page-container py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text content */}
            <div>
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-full px-3.5 py-1.5 mb-5 border border-teal-200/60 dark:border-teal-800/40">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Verified from official sources</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-slate-900 dark:text-slate-100 leading-[1.15] mb-5 tracking-tight">
                Find and compare verified scholarships worldwide
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
                Clear eligibility criteria, verified deadlines, and step-by-step application guidance
                for fully funded scholarships across 20+ countries.
              </p>

              {/* Search Bar */}
              <div className="max-w-lg mb-6">
                <SearchBar size="lg" placeholder="Search by country, university, or keyword…" />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Link href="/scholarships" className="btn-primary">
                  Browse All Scholarships <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/guide" className="btn-secondary">
                  Read Free Guide
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400 dark:text-slate-500 text-sm">
                {[
                  { icon: Globe, label: '20+ Countries' },
                  { icon: GraduationCap, label: '50+ Scholarships' },
                  { icon: Users, label: 'Free to use' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: illustration */}
            <div className="hidden lg:block">
              <HeroIllustration />
            </div>
          </div>
        </div>

        {/* Subtle bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      </section>

      {/* ═══ TRUST / FEATURES STRIP ══════════════════════════════════════════ */}
      <section className="page-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ExternalLink, title: 'Official sources', desc: 'Every scholarship links directly to the official programme page — no middlemen.' },
            { icon: Calendar, title: 'Verified deadlines', desc: 'Deadlines are checked against official sources and marked when estimated.' },
            { icon: CheckCircle, title: 'Clear eligibility', desc: 'Know exactly what is required — citizenship, GPA, documents — before you apply.' },
            { icon: BookOpen, title: 'Application guidance', desc: 'Step-by-step process, required documents, selection criteria, and application tips.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group card p-5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
                <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="page-container py-14 sm:py-18">
          <div className="text-center mb-10">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle max-w-lg mx-auto">Three simple steps from search to application</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: '1', icon: Search, title: 'Search scholarships', desc: 'Browse by country, degree level, funding type, or keyword. Find opportunities that match your profile.' },
              { step: '2', icon: ClipboardList, title: 'Compare requirements', desc: 'Review eligibility, deadlines, required documents, and application process side by side.' },
              { step: '3', icon: ExternalLink, title: 'Apply through official source', desc: 'Follow the step-by-step process and apply directly through the official scholarship website.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                  {step}
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED SCHOLARSHIPS ═══════════════════════════════════════════ */}
      <section className="page-container py-14 sm:py-18">
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

      {/* ═══ CATEGORIES ══════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="page-container py-14 sm:py-18">
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

      {/* ═══ STATS STRIP ═════════════════════════════════════════════════════ */}
      <section className="page-container py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '20+', label: 'Countries', icon: MapPin },
            { value: '50+', label: 'Scholarships', icon: Award },
            { value: '100%', label: 'Free to use', icon: Sparkles },
            { value: '✓', label: 'Verified sources', icon: Shield },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="card p-5">
              <Icon className="w-5 h-5 text-teal-500 dark:text-teal-400 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-slate-800 dark:text-slate-200">{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LATEST SCHOLARSHIPS ═════════════════════════════════════════════ */}
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

      {/* ═══ CTA SECTION ═════════════════════════════════════════════════════ */}
      <section className="page-container pb-16">
        <div className="rounded-2xl bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 p-10 sm:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3 tracking-tight">
                Prepare a stronger application
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Read our step-by-step guide covering personal statements, recommendation letters,
                and interview preparation for international scholarships.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:justify-end gap-3">
              <Link href="/guide" className="bg-white text-slate-800 hover:bg-slate-100 font-medium rounded-xl px-6 py-3 transition-all inline-flex items-center justify-center gap-2 text-sm">
                Read Free Guide <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/scholarships" className="text-white border border-slate-600 hover:bg-slate-700 font-medium rounded-xl px-6 py-3 transition-all inline-flex items-center justify-center gap-2 text-sm">
                Browse Scholarships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
