import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ClipboardList,
  ExternalLink,
  Filter,
  Globe2,
  GraduationCap,
  Landmark,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ScholarshipCard from '@/components/ScholarshipCard';
import CategoryCard from '@/components/CategoryCard';
import { getFeaturedScholarships, getLatestScholarships, getCategories } from '@/lib/scholarships';

const quickFilters = [
  { label: 'Fully Funded', href: '/scholarships?fundingType=Fully%20Funded', icon: Award, active: true },
  { label: 'Masters', href: '/scholarships?degreeLevel=Master', icon: GraduationCap },
  { label: 'PhD', href: '/scholarships?degreeLevel=PhD', icon: BookOpen },
  { label: 'Government', href: '/scholarships?category=Government', icon: Landmark },
  { label: 'Russia', href: '/scholarships?country=Russia', icon: MapPin },
  { label: 'Europe', href: '/scholarships?q=Europe', icon: Globe2 },
];

const trustFeatures = [
  {
    icon: ExternalLink,
    title: 'Official source links',
    desc: 'Every record points applicants back to the scholarship provider or official programme page.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear eligibility',
    desc: 'Country rules, degree level, documents, and requirements are surfaced before you apply.',
  },
  {
    icon: ClipboardList,
    title: 'Application guidance',
    desc: 'Review steps, tips, selection criteria, and document checklists in one focused view.',
  },
  {
    icon: Filter,
    title: 'Country filters',
    desc: 'Filter opportunities by destination and applicant-country eligibility where official data exists.',
  },
];

function QuickFilterPills() {
  return (
    <div className="-mx-4 sm:mx-0 overflow-x-auto px-4 sm:px-0 pb-2">
      <div className="flex min-w-max items-center gap-3">
        {quickFilters.map(({ label, href, icon: Icon, active }) => (
          <Link
            key={label}
            href={href}
            className={
              active
                ? 'inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 dark:bg-slate-100 dark:text-slate-900'
                : 'inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-white'
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeroVisual() {
  const statCards = [
    { label: 'Countries', value: '20+', color: 'bg-orange-400' },
    { label: 'Scholarships', value: '50+', color: 'bg-blue-500' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl lg:pt-0">
      <div className="absolute -left-6 top-10 h-40 w-40 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-900/20 sm:-left-10 sm:top-16 sm:h-56 sm:w-56" />
      <div className="absolute -right-4 bottom-4 h-44 w-44 rounded-full bg-blue-200/35 blur-3xl dark:bg-blue-950/30 sm:-right-6 sm:h-60 sm:w-60" />

      <div className="relative rounded-[2rem] border border-white/50 bg-white/30 p-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/30 sm:min-h-[500px]">
        <div className="absolute right-5 top-6 hidden h-[360px] w-[250px] rounded-[1.4rem] border border-white/70 bg-white/35 shadow-xl shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-900/30 sm:block" />
        <div className="absolute left-6 top-32 hidden h-36 w-36 rounded-[1.5rem] border border-white/70 bg-white/25 shadow-lg shadow-slate-300/20 dark:border-slate-800 dark:bg-slate-900/30 sm:block" />

        <div className="relative mx-auto w-[210px] overflow-hidden rounded-[1.75rem] border-[8px] border-white bg-white shadow-2xl shadow-slate-400/30 dark:border-slate-900 dark:bg-slate-900 sm:mr-24 sm:mt-2 sm:w-[285px] sm:rounded-[2rem] sm:border-[10px]">
          <Image
            src="/images/hero-scholar-portrait.jpg"
            alt="Smiling scholarship applicant"
            width={288}
            height={382}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:absolute sm:right-0 sm:top-24 sm:mt-0 sm:flex sm:w-28 sm:flex-col sm:gap-4">
          {statCards.map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-white/80 bg-white p-3 shadow-xl shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-950 sm:p-4">
              <span className={`mb-2 block h-3.5 w-3.5 rounded-full ${color} sm:mb-3 sm:h-4 sm:w-4`} />
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">{value}</p>
              <p className="text-xs leading-tight text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-4 rounded-[1.5rem] bg-slate-900 p-4 text-white shadow-2xl shadow-slate-400/25 dark:bg-slate-100 dark:text-slate-950 sm:absolute sm:bottom-7 sm:left-6 sm:right-auto sm:mt-0 sm:w-64 sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold leading-snug">Verified scholarship pathway</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 dark:text-slate-600">
                Compare official sources, eligibility, and funding before you apply.
              </p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 dark:bg-slate-900/10">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>
          <Link href="/scholarships" className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:bg-white dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
            Start search <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="absolute left-6 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/30 dark:bg-slate-950 sm:left-7 sm:top-6 sm:h-12 sm:w-12">
          <ShieldCheck className="h-5 w-5 text-blue-500" />
        </div>

        <div className="absolute bottom-24 right-8 hidden h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/30 dark:bg-slate-950 sm:flex">
          <BookOpen className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </div>
      </div>
    </div>
  );
}

function TrustFeatureCards() {
  return (
    <section className="page-container py-12 sm:py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustFeatures.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 transition-transform hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/20">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedScholarships(),
    getLatestScholarships(6),
    getCategories(),
  ]);

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-slate-950">
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(125,211,252,0.22),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(203,213,225,0.55),transparent_28%),linear-gradient(135deg,#f8fafc_0%,#eef6f8_42%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_15%_10%,rgba(14,116,144,0.18),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(51,65,85,0.45),transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#020617_100%)]" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-white/60 blur-3xl dark:bg-slate-800/20" />

        <div className="relative page-container pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pb-24 lg:pt-20 xl:pb-28 xl:pt-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-14">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                Verified scholarship platform
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-5xl xl:text-6xl">
                Find verified scholarships for your next academic journey
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                Search official scholarship opportunities by country, degree level, funding type,
                and eligibility - with clear requirements and application guidance.
              </p>

              <div className="mt-8 max-w-2xl">
                <SearchBar
                  size="lg"
                  placeholder="Search by country, university, scholarship, or keyword..."
                  className="shadow-2xl shadow-slate-300/30 dark:shadow-slate-950/30"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/scholarships" className="btn-primary rounded-2xl px-6 py-3">
                  Browse Scholarships <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/guide" className="btn-secondary rounded-2xl px-6 py-3">
                  Read Application Guide
                </Link>
              </div>

              <div className="mt-8">
                <QuickFilterPills />
              </div>
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      <TrustFeatureCards />

      <section className="page-container py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Sparkles className="h-4 w-4" />
              Featured
            </div>
            <h2 className="section-title">Top scholarships to explore</h2>
            <p className="section-subtitle">High-value opportunities with official source links and clear eligibility.</p>
          </div>
          <Link href="/scholarships" className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((s, i) => (
            <ScholarshipCard key={s.id} scholarship={s} className={i >= 3 ? 'hidden lg:block' : ''} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="page-container py-14 sm:py-16">
          <div className="mb-10 text-center">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle mx-auto max-w-lg">Move from search to official application with a cleaner workflow.</p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { step: '1', icon: Search, title: 'Search scholarships', desc: 'Use keywords, country filters, degree level, funding type, and applicant eligibility.' },
              { step: '2', icon: CheckCircle, title: 'Review requirements', desc: 'Compare deadlines, benefits, documents, country rules, and selection criteria.' },
              { step: '3', icon: ExternalLink, title: 'Apply officially', desc: 'Open the official source page and follow the verified application process.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-semibold text-slate-200 dark:text-slate-800">{step}</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-14 sm:py-16">
        <div className="mb-10 text-center">
          <h2 className="section-title">Browse by category</h2>
          <p className="section-subtitle mx-auto max-w-xl">
            Explore government awards, university grants, STEM funding, foundation programmes, and regional opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="page-container py-14 sm:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Calendar className="h-4 w-4" />
                Recently added
              </div>
              <h2 className="section-title">Fresh scholarship listings</h2>
              <p className="section-subtitle">Newly added records from the current scholarship dataset.</p>
            </div>
            <Link href="/scholarships" className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white sm:flex">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 shadow-2xl shadow-slate-300/30 dark:bg-slate-100 dark:shadow-slate-950/30 sm:p-12">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/20" />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white dark:text-slate-950 sm:text-3xl">
                Prepare a stronger scholarship application
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-300 dark:text-slate-600">
                Use the EasyScholars guide to plan documents, personal statements, references, and interviews before you apply.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/guide" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
                Read Application Guide <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/scholarships" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 dark:border-slate-900/20 dark:text-slate-900 dark:hover:bg-slate-900/10">
                Browse Scholarships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
