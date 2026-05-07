'use client';

import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  initialValue?: string;
}

export default function SearchBar({
  placeholder = 'Search scholarships by country, university, or keyword...',
  className,
  size = 'md',
  initialValue = '',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/scholarships?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/scholarships');
    }
  };

  const sizeClasses = {
    sm: 'h-10 text-sm pl-10 pr-24',
    md: 'h-12 text-sm pl-12 pr-28',
    lg: 'h-14 text-sm pl-12 pr-28 sm:h-16 sm:text-base sm:pl-14 sm:pr-32',
  };

  const iconSizes = {
    sm: 'w-4 h-4 left-3',
    md: 'w-5 h-5 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative w-full', className)}>
      <Search className={cn('absolute top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none', iconSizes[size])} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-[1.35rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all shadow-sm',
          'focus:border-slate-400 dark:focus:border-slate-500 focus:ring-4 focus:ring-slate-200/70 dark:focus:ring-slate-800/60',
          sizeClasses[size]
        )}
      />
      {query && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setQuery('')}
          className="absolute right-24 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-2xl font-medium transition-all shadow-sm hover:shadow-md',
          size === 'lg' ? 'px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm' : 'px-4 py-1.5 text-xs'
        )}
      >
        Search
      </button>
    </form>
  );
}
