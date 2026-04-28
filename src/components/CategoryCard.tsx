import Link from 'next/link';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/scholarships?category=${encodeURIComponent(category.label)}`}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card hover:shadow-card-hover p-5 flex flex-col items-start gap-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-violet-50/0 group-hover:from-primary-50 group-hover:to-violet-50 dark:group-hover:from-primary-900/10 dark:group-hover:to-violet-900/10 transition-all duration-300 pointer-events-none" />

      {/* Icon */}
      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
        {category.icon}
      </div>

      {/* Text */}
      <div className="relative flex-1">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {category.label}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Bottom row */}
      <div className="relative w-full flex items-center justify-between">
        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 rounded-full">
          {category.count} scholarships
        </span>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
