'use client';

import { useState } from 'react';
import { Calendar, Globe, Award, ExternalLink, Share2, BookmarkPlus, Clock, CheckCircle } from 'lucide-react';
import { Scholarship } from '@/types';
import { cn, formatDeadline, getDaysUntilDeadline, getDeadlineUrgency } from '@/lib/utils';

interface ScholarshipDetailSidebarProps {
  scholarship: Scholarship;
}

export default function ScholarshipDetailSidebar({ scholarship }: ScholarshipDetailSidebarProps) {
  const [copied, setCopied] = useState(false);
  const days = getDaysUntilDeadline(scholarship.deadline);
  const urgency = getDeadlineUrgency(scholarship.deadline);

  const urgencyConfig = {
    expired: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-500', label: 'Applications Closed' },
    urgent: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', label: `${days} days left!` },
    soon: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', label: `${days} days left` },
    open: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', label: `${days} days left` },
  }[urgency];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <aside className="space-y-4">
      {/* Main action card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card p-6">
        {/* Funding type */}
        <div className="flex items-center justify-between mb-4">
          <span className={cn(
            'text-sm font-bold px-3 py-1.5 rounded-xl',
            scholarship.fundingType === 'Fully Funded'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
          )}>
            {scholarship.fundingType}
          </span>
          <span className="text-2xl">{scholarship.countryCode}</span>
        </div>

        {/* Deadline countdown */}
        <div className={cn('rounded-xl p-4 mb-5', urgencyConfig.bg)}>
          <div className="flex items-center gap-2 mb-1">
            <Clock className={cn('w-4 h-4', urgencyConfig.text)} />
            <span className={cn('text-xs font-semibold uppercase tracking-wide', urgencyConfig.text)}>
              Deadline
            </span>
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-slate-100">
            {formatDeadline(scholarship.deadline)}
          </p>
          <p className={cn('text-sm font-semibold mt-0.5', urgencyConfig.text)}>
            {urgencyConfig.label}
          </p>
        </div>

        {/* Apply button */}
        <a
          href={scholarship.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-sm transition-all shadow-sm hover:shadow-md',
            urgency === 'expired'
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed pointer-events-none'
              : 'bg-gradient-to-r from-primary-600 to-slate-600 hover:from-primary-700 hover:to-slate-700 text-white'
          )}
        >
          <ExternalLink className="w-4 h-4" />
          {urgency === 'expired' ? 'Applications Closed' : 'Apply Now'}
        </a>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 transition-all hover:border-primary-300 dark:hover:border-primary-700">
            <BookmarkPlus className="w-3.5 h-3.5" />
            Save
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 transition-all hover:border-primary-300 dark:hover:border-primary-700"
          >
            {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>

      {/* Quick info card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card p-5">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Quick Info</h3>
        <div className="space-y-3">
          <InfoRow icon={<Globe className="w-4 h-4" />} label="Host Country" value={scholarship.hostCountry} />
          <InfoRow icon={<Award className="w-4 h-4" />} label="Category" value={scholarship.category} />
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="Degree Levels"
            value={scholarship.degreeLevel.join(', ')}
          />
        </div>
      </div>

      {/* Tags */}
      {scholarship.tags.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card p-5">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {scholarship.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-primary-500 mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{value}</p>
      </div>
    </div>
  );
}
