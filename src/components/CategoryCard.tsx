import Link from 'next/link';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/scholarships?category=${encodeURIComponent(category.label)}`}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-slate-950/20 hover:shadow-xl hover:shadow-slate-300/40 p-5 flex flex-col items-start gap-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform duration-300">
        {category.icon}
      </div>

      <div className="relative flex-1">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
          {category.label}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="relative w-full flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          {category.count} scholarships
        </span>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
