import Link from 'next/link';
import { MapPin, Calendar, Award, Clock, ArrowRight } from 'lucide-react';
import { Scholarship } from '@/types';
import { cn, formatDeadline, getDaysUntilDeadline, truncate } from '@/lib/utils';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

function FundingBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    'Fully Funded': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Partial': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Stipend': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    'Tuition Only': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  };
  return (
    <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', colors[type] ?? 'bg-slate-100 text-slate-600')}>
      {type}
    </span>
  );
}

function DeadlineChip({ deadline }: { deadline: string }) {
  const days = getDaysUntilDeadline(deadline);
  const isUrgent = days <= 30 && days >= 0;
  const isExpired = days < 0;

  return (
    <div className={cn(
      'flex items-center gap-1 text-xs font-medium',
      isExpired ? 'text-slate-400 dark:text-slate-600'
        : isUrgent ? 'text-red-600 dark:text-red-400'
        : 'text-slate-500 dark:text-slate-400'
    )}>
      <Clock className="w-3.5 h-3.5" />
      {isExpired ? 'Closed' : isUrgent ? `${days}d left` : formatDeadline(deadline)}
    </div>
  );
}

export default function ScholarshipCard({ scholarship, className, variant = 'default' }: ScholarshipCardProps) {
  const isCompact = variant === 'compact';
  const highlights = (scholarship.coverageDetails?.length ? scholarship.coverageDetails : scholarship.benefits)?.slice(0, 2) ?? [];

  return (
    <Link
      href={`/scholarships/${scholarship.id}`}
      className={cn(
        'group block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 overflow-hidden',
        className
      )}
    >
      <div className={cn('p-5', isCompact && 'p-4')}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">
            {scholarship.countryCode}
          </div>
          <FundingBadge type={scholarship.fundingType} />
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors leading-snug mb-1',
          isCompact ? 'text-sm' : 'text-base'
        )}>
          {scholarship.title}
        </h3>

        {/* University */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 flex-shrink-0" />
          {truncate(scholarship.university, 45)}
        </p>

        {!isCompact && (
          <>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              {truncate(scholarship.description, 90)}
            </p>

            {/* Highlights from coverage */}
            {highlights.length > 0 && (
              <div className="space-y-1 mb-3">
                {highlights.map((h, i) => (
                  <p key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    {truncate(h, 50)}
                  </p>
                ))}
              </div>
            )}
          </>
        )}

        {/* Degree level badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {scholarship.degreeLevel.map(level => (
            <span
              key={level}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
            >
              {level}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5" />
            {scholarship.country}
          </div>
          <DeadlineChip deadline={scholarship.deadline} />
        </div>

        {/* View Details */}
        {!isCompact && (
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
            View Details
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}
      </div>
    </Link>
  );
}
