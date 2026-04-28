'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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
  placeholder = 'Search scholarships by country, university, or keyword…',
  className,
  size = 'md',
  initialValue = '',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  useEffect(() => { setQuery(initialValue); }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/scholarships?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/scholarships');
    }
  };

  const sizeClasses = {
    sm: 'h-10 text-sm pl-10 pr-4',
    md: 'h-12 text-sm pl-12 pr-4',
    lg: 'h-14 text-base pl-14 pr-6',
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
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all shadow-sm',
          'focus:border-primary-400 dark:focus:border-primary-500 focus:ring-3 focus:ring-primary-100 dark:focus:ring-primary-900/30',
          sizeClasses[size]
        )}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md',
          size === 'lg' ? 'px-5 py-2 text-sm' : 'px-4 py-1.5 text-xs'
        )}
      >
        Search
      </button>
    </form>
  );
}
