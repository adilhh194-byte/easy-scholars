import { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight, CheckCircle, FileText, Target, Gift,
  ListChecks, ExternalLink, Globe, Languages, Lightbulb,
  ClipboardList, Award, Shield
} from 'lucide-react';
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
        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-6 h-6 text-slate-400" />
        </div>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Scholarship Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The scholarship you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/scholarships" className="btn-primary">
          Browse All Scholarships
        </Link>
      </div>
    );
  }

  const related = await getRelatedScholarships(scholarship, 3);

  const coverageData = scholarship.coverageDetails?.length ? scholarship.coverageDetails : scholarship.benefits;

  const SECTIONS = [
    {
      id: 'overview',
      icon: <FileText className="w-4 h-4" />,
      title: 'Overview',
      content: scholarship.description ? (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          {scholarship.description}
        </p>
      ) : null,
    },
    {
      id: 'eligibility',
      icon: <Target className="w-4 h-4" />,
      title: 'Eligibility',
      content: scholarship.eligibility?.length ? (
        <ul className="space-y-2.5">
          {scholarship.eligibility.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      id: 'coverage',
      icon: <Gift className="w-4 h-4" />,
      title: 'Coverage & Benefits',
      content: coverageData?.length ? (
        <ul className="space-y-2.5">
          {coverageData.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-2" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      id: 'documents',
      icon: <ListChecks className="w-4 h-4" />,
      title: 'Required Documents',
      content: scholarship.requiredDocuments?.length ? (
        <ul className="space-y-2.5">
          {scholarship.requiredDocuments.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-2" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      id: 'language',
      icon: <Languages className="w-4 h-4" />,
      title: 'Language Requirements',
      content: scholarship.languageRequirements?.length ? (
        <ul className="space-y-2.5">
          {scholarship.languageRequirements.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-2" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      id: 'process',
      icon: <ClipboardList className="w-4 h-4" />,
      title: 'Application Process',
      content: scholarship.applicationProcess?.length ? (
        <ol className="space-y-3">
          {scholarship.applicationProcess.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
            </li>
          ))}
        </ol>
      ) : null,
    },
    {
      id: 'criteria',
      icon: <Award className="w-4 h-4" />,
      title: 'Selection Criteria',
      content: scholarship.selectionCriteria?.length ? (
        <ul className="space-y-2.5">
          {scholarship.selectionCriteria.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      id: 'tips',
      icon: <Lightbulb className="w-4 h-4" />,
      title: 'Tips to Improve Your Application',
      content: scholarship.applicationTips?.length ? (
        <ul className="space-y-2.5">
          {scholarship.applicationTips.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      ) : null,
    },
  ];

  return (
    <div className="page-container py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/scholarships" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Scholarships</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[240px]">{scholarship.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header card */}
          <div className="card p-6 sm:p-8 mb-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl flex-shrink-0">
                {scholarship.countryCode}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-1">
                  {scholarship.title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {scholarship.university} · {scholarship.country}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {scholarship.degreeLevel.map(level => (
                <span key={level} className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
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
              {scholarship.isDeadlineEstimated && (
                <span className="badge bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                  Estimated deadline
                </span>
              )}
            </div>
          </div>

          {/* Detail sections — only render if content exists */}
          <div className="space-y-4">
            {SECTIONS.map(section => {
              if (!section.content) return null;
              return (
                <div key={section.id} className="card p-6 sm:p-8" id={section.id}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="text-slate-500 dark:text-slate-400">{section.icon}</div>
                    <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">{section.title}</h2>
                  </div>
                  {section.content}
                </div>
              );
            })}

            {/* Official Source */}
            {scholarship.officialSourceUrl && (
              <div className="card p-6 sm:p-8" id="source">
                <div className="flex items-center gap-2.5 mb-4">
                  <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">Official Source</h2>
                </div>
                <a
                  href={scholarship.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 underline underline-offset-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {scholarship.officialSourceUrl}
                </a>
                {scholarship.lastVerified && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    Last verified: {new Date(scholarship.lastVerified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
                {scholarship.sourceNotes && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    {scholarship.sourceNotes}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Apply CTA — mobile */}
          <div className="lg:hidden mt-5">
            <a
              href={scholarship.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-slate-100 dark:text-slate-900 text-white rounded-xl py-3.5 font-medium transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Apply Now
            </a>
          </div>

          {/* Related scholarships */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Related Scholarships</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
