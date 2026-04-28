import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CheckCircle, FileText, Target, Gift, ListChecks, ExternalLink } from 'lucide-react';
import { getScholarshipById, getRelatedScholarships } from '@/lib/scholarships';
import ScholarshipDetailSidebar from '@/components/ScholarshipDetailSidebar';
import ScholarshipCard from '@/components/ScholarshipCard';
import { MOCK_SCHOLARSHIPS } from '@/lib/mock-data';

interface ScholarshipDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ScholarshipDetailPageProps): Promise<Metadata> {
  const scholarship = await getScholarshipById(params.id);
  if (!scholarship) {
    return { title: 'Scholarship Not Found' };
  }

  const deadlineFormatted = new Date(scholarship.deadline).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const degreeLevels = scholarship.degreeLevel.join(', ');
  const seoTitle = `${scholarship.title} | ${scholarship.fundingType} ${scholarship.country} Scholarship ${new Date(scholarship.deadline).getFullYear()}`;
  const seoDescription = `Apply for ${scholarship.title} at ${scholarship.university}. ${scholarship.fundingType} ${degreeLevels} scholarship in ${scholarship.country}. Deadline: ${deadlineFormatted}. Eligibility, benefits, requirements & full application guide.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      scholarship.title,
      `${scholarship.country} scholarship`,
      `${scholarship.fundingType} scholarship`,
      ...scholarship.degreeLevel.map(d => `${d} scholarship`),
      scholarship.university,
      'study abroad',
      'international scholarship',
      ...scholarship.tags,
    ],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      siteName: 'EasyScholars',
    },
    twitter: {
      card: 'summary',
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export async function generateStaticParams() {
  return MOCK_SCHOLARSHIPS.map(s => ({ id: s.id }));
}

export default async function ScholarshipDetailPage({ params }: ScholarshipDetailPageProps) {
  const scholarship = await getScholarshipById(params.id);

  if (!scholarship) {
    return (
      <div className="page-container py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-7 h-7 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Scholarship Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The scholarship you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/scholarships" className="btn-primary">
          Browse All Scholarships
        </Link>
      </div>
    );
  }

  const related = await getRelatedScholarships(scholarship, 3);

  const SECTIONS = [
    {
      id: 'overview',
      icon: <FileText className="w-5 h-5" />,
      title: 'Overview',
      content: (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          {scholarship.description}
        </p>
      ),
    },
    {
      id: 'eligibility',
      icon: <Target className="w-5 h-5" />,
      title: 'Eligibility Criteria',
      content: (
        <ul className="space-y-3">
          {scholarship.eligibility.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-600 dark:text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'benefits',
      icon: <Gift className="w-5 h-5" />,
      title: 'Benefits',
      content: (
        <ul className="space-y-3">
          {scholarship.benefits.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 dark:text-primary-400 text-xs font-bold">{i + 1}</span>
              </div>
              <span className="text-slate-600 dark:text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'requirements',
      icon: <ListChecks className="w-5 h-5" />,
      title: 'Application Requirements',
      content: (
        <ul className="space-y-3">
          {scholarship.requirements.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0 mt-2" />
              <span className="text-slate-600 dark:text-slate-400">{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="page-container py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/scholarships" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Scholarships</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px]">{scholarship.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header card */}
          <div className="card p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                {scholarship.countryCode}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-1">
                  {scholarship.title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  {scholarship.university} · {scholarship.country}
                </p>
              </div>
            </div>

            {/* Degree level + funding badges */}
            <div className="flex flex-wrap gap-2">
              {scholarship.degreeLevel.map(level => (
                <span key={level} className="badge bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400">
                  {level}
                </span>
              ))}
              <span className={`badge ${
                scholarship.fundingType === 'Fully Funded'
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                  : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
              }`}>
                {scholarship.fundingType}
              </span>
            </div>
          </div>

          {/* Detail sections */}
          <div className="space-y-5">
            {SECTIONS.map(section => (
              <div key={section.id} className="card p-6 sm:p-8" id={section.id}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-primary-500">{section.icon}</div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
                </div>
                {section.content}
              </div>
            ))}
          </div>

          {/* Apply CTA - mobile */}
          <div className="lg:hidden mt-6">
            <a
              href={scholarship.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-violet-600 hover:from-primary-700 hover:to-violet-700 text-white rounded-xl py-4 font-semibold transition-all shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              Apply Now
            </a>
          </div>

          {/* Related scholarships */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-5">Related Scholarships</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map(s => (
                  <ScholarshipCard key={s.id} scholarship={s} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <ScholarshipDetailSidebar scholarship={scholarship} />
          </div>
        </div>
      </div>
    </div>
  );
}
