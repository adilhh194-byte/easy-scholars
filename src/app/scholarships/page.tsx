'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ScholarshipCard from '@/components/ScholarshipCard';
import FilterSidebar from '@/components/FilterSidebar';
import { getScholarships } from '@/lib/scholarships';
import { Scholarship, ScholarshipFilters } from '@/types';

function ScholarshipsContent() {
  const searchParams = useSearchParams();
  const queryFromURL = searchParams.get('q') || '';

  const [filters, setFilters] = useState<ScholarshipFilters>({
    query: queryFromURL,
  });
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilters(f => ({ ...f, query: queryFromURL }));
  }, [queryFromURL]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getScholarships(filters);
      setScholarships(data);
      setLoading(false);
    };
    load();
  }, [filters]);

  return (
    <div className="page-container py-8 sm:py-10">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Browse Scholarships
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Explore verified international scholarships. Use search and filters to find opportunities.
        </p>
      </div>

      {/* Search bar + mobile filter button row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1">
          <SearchBar size="md" initialValue={queryFromURL} />
        </div>
        {/* Mobile-only filter button — rendered by FilterSidebar internally via md:hidden */}
        <div className="md:hidden">
          <FilterSidebar filters={filters} onChange={setFilters} mobileOnly />
        </div>
      </div>

      {/* Content row: results + sidebar */}
      <div className="flex gap-8">
        {/* Scholarship results — main area */}
        <div className="flex-1 min-w-0">
          {/* Active filter chips */}
          {Object.entries(filters).some(([k, v]) => v && k !== 'query') && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.country && (
                <FilterChip label={`Country: ${filters.country}`} onRemove={() => setFilters(f => ({ ...f, country: undefined }))} />
              )}
              {filters.degreeLevel && (
                <FilterChip label={`Degree: ${filters.degreeLevel}`} onRemove={() => setFilters(f => ({ ...f, degreeLevel: undefined }))} />
              )}
              {filters.fundingType && (
                <FilterChip label={`Funding: ${filters.fundingType}`} onRemove={() => setFilters(f => ({ ...f, fundingType: undefined }))} />
              )}
              {filters.deadline && (
                <FilterChip label="Deadline filter active" onRemove={() => setFilters(f => ({ ...f, deadline: undefined }))} />
              )}
            </div>
          )}

          {/* Results count */}
          <div className="mb-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {loading ? 'Loading…' : `${scholarships.length} scholarship${scholarships.length !== 1 ? 's' : ''} found`}
            </p>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 animate-pulse">
                  <div className="flex justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="w-3/4 h-5 rounded bg-slate-200 dark:bg-slate-800 mb-2" />
                  <div className="w-1/2 h-4 rounded bg-slate-200 dark:bg-slate-800 mb-4" />
                  <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-800 mb-2" />
                  <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          ) : scholarships.length === 0 ? (
            /* Empty state */
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">No scholarships found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={() => setFilters({})}
                className="mt-4 btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Results grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {scholarships.map(s => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          )}
        </div>

        {/* Desktop-only filter sidebar — single instance */}
        <div className="hidden md:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800">
      {label}
      <button onClick={onRemove} className="hover:text-red-500 transition-colors">×</button>
    </span>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={
      <div className="page-container py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-4 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        </div>
      </div>
    }>
      <ScholarshipsContent />
    </Suspense>
  );
}
