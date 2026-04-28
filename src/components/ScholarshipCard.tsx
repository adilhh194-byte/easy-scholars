import Link from 'next/link';
import { MapPin, Calendar, Award, ExternalLink, Clock } from 'lucide-react';
import { Scholarship } from '@/types';
import { cn, formatDeadline, getDaysUntilDeadline, truncate } from '@/lib/utils';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

function FundingBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    'Fully Funded': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    'Partial': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    'Stipend': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    'Tuition Only': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  };
  return (
    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', colors[type] ?? 'bg-slate-100 text-slate-600')}>
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

  return (
    <Link
      href={`/scholarships/${scholarship.id}`}
      className={cn(
        'group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden',
        className
      )}
    >
      {/* Top color bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className={cn('p-5', isCompact && 'p-4')}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Country flag avatar */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
            {scholarship.countryCode}
          </div>
          <FundingBadge type={scholarship.fundingType} />
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug mb-1',
          isCompact ? 'text-sm' : 'text-base'
        )}>
          {scholarship.title}
        </h3>

        {/* University */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 flex-shrink-0" />
          {truncate(scholarship.university, 45)}
        </p>

        {!isCompact && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {truncate(scholarship.description, 100)}
          </p>
        )}

        {/* Degree level badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {scholarship.degreeLevel.map(level => (
            <span
              key={level}
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium"
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
      </div>
    </Link>
  );
}
