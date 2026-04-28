'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { DegreeLevel, FundingType, ScholarshipFilters } from '@/types';
import { cn } from '@/lib/utils';

const COUNTRIES = ['United Kingdom', 'United States', 'Germany', 'Australia', 'Switzerland', 'European Union', 'Sweden', 'South Korea', 'Japan', 'Canada', 'China', 'France', 'Turkey', 'Hungary', 'New Zealand', 'Netherlands', 'Italy', 'Singapore', 'Belgium', 'Austria', 'Mexico', 'Russia', 'Brunei', 'Multiple'];
const DEGREE_LEVELS: DegreeLevel[] = ['Bachelor', 'Master', 'PhD', 'Postdoc', 'Any'];
const FUNDING_TYPES: FundingType[] = ['Fully Funded', 'Partial', 'Stipend', 'Tuition Only'];
const DEADLINES = [
  { label: 'Next 30 days', value: getDateOffset(30) },
  { label: 'Next 3 months', value: getDateOffset(90) },
  { label: 'Next 6 months', value: getDateOffset(180) },
  { label: 'Next 12 months', value: getDateOffset(365) },
];

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

interface FilterSection {
  label: string;
  key: string;
  open: boolean;
}

interface FilterSidebarProps {
  filters: ScholarshipFilters;
  onChange: (filters: ScholarshipFilters) => void;
  className?: string;
}

export default function FilterSidebar({ filters, onChange, className }: FilterSidebarProps) {
  const [sections, setSections] = useState<FilterSection[]>([
    { label: 'Country', key: 'country', open: true },
    { label: 'Degree Level', key: 'degreeLevel', open: true },
    { label: 'Funding Type', key: 'fundingType', open: true },
    { label: 'Deadline', key: 'deadline', open: false },
  ]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (key: string) => {
    setSections(s => s.map(sec => sec.key === key ? { ...sec, open: !sec.open } : sec));
  };

  const hasActiveFilters = Object.values(filters).some(v => v && v !== '');

  const clearAll = () => onChange({});

  const FilterContent = () => (
    <div className="space-y-1">
      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors py-2 mb-2 border border-red-200 dark:border-red-900/40 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10"
        >
          <X className="w-3.5 h-3.5" /> Clear All Filters
        </button>
      )}

      {/* Country */}
      <FilterAccordion
        label="Country"
        isOpen={sections.find(s => s.key === 'country')?.open ?? true}
        onToggle={() => toggleSection('country')}
      >
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          {COUNTRIES.map(c => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="radio"
                name="country"
                checked={filters.country === c}
                onChange={() => onChange({ ...filters, country: filters.country === c ? undefined : c })}
                className="accent-indigo-600 w-3.5 h-3.5"
              />
              <span className={cn(
                'text-sm transition-colors',
                filters.country === c
                  ? 'text-primary-700 dark:text-primary-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
              )}>
                {c}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Degree Level */}
      <FilterAccordion
        label="Degree Level"
        isOpen={sections.find(s => s.key === 'degreeLevel')?.open ?? true}
        onToggle={() => toggleSection('degreeLevel')}
      >
        <div className="space-y-1">
          {DEGREE_LEVELS.map(dl => (
            <label key={dl} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="radio"
                name="degreeLevel"
                checked={filters.degreeLevel === dl}
                onChange={() => onChange({ ...filters, degreeLevel: filters.degreeLevel === dl ? undefined : dl })}
                className="accent-indigo-600 w-3.5 h-3.5"
              />
              <span className={cn(
                'text-sm transition-colors',
                filters.degreeLevel === dl
                  ? 'text-primary-700 dark:text-primary-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
              )}>
                {dl}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Funding Type */}
      <FilterAccordion
        label="Funding Type"
        isOpen={sections.find(s => s.key === 'fundingType')?.open ?? true}
        onToggle={() => toggleSection('fundingType')}
      >
        <div className="space-y-1">
          {FUNDING_TYPES.map(ft => (
            <label key={ft} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="radio"
                name="fundingType"
                checked={filters.fundingType === ft}
                onChange={() => onChange({ ...filters, fundingType: filters.fundingType === ft ? undefined : ft })}
                className="accent-indigo-600 w-3.5 h-3.5"
              />
              <span className={cn(
                'text-sm transition-colors',
                filters.fundingType === ft
                  ? 'text-primary-700 dark:text-primary-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
              )}>
                {ft}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Deadline */}
      <FilterAccordion
        label="Deadline"
        isOpen={sections.find(s => s.key === 'deadline')?.open ?? false}
        onToggle={() => toggleSection('deadline')}
      >
        <div className="space-y-1">
          {DEADLINES.map(dl => (
            <label key={dl.label} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="radio"
                name="deadline"
                checked={filters.deadline === dl.value}
                onChange={() => onChange({ ...filters, deadline: filters.deadline === dl.value ? undefined : dl.value })}
                className="accent-indigo-600 w-3.5 h-3.5"
              />
              <span className={cn(
                'text-sm transition-colors',
                filters.deadline === dl.value
                  ? 'text-primary-700 dark:text-primary-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
              )}>
                {dl.label}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 shadow-sm hover:border-primary-400 transition-all"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
          <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {Object.values(filters).filter(Boolean).length}
          </span>
        )}
      </button>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Filters</h2>
              <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3 font-medium transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden md:block w-64 flex-shrink-0',
        className
      )}>
        <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary-500" />
              Filters
            </h2>
            {hasActiveFilters && (
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {Object.values(filters).filter(Boolean).length} active
              </span>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>
    </>
  );
}

function FilterAccordion({
  label, isOpen, onToggle, children
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-4 mb-4 last:mb-0 last:pb-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
      >
        {label}
        {isOpen ? <ChevronUp className="w-4 h-4 opacity-60" /> : <ChevronDown className="w-4 h-4 opacity-60" />}
      </button>
      {isOpen && (
        <div className="mt-3 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
