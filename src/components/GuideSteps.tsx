'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, CheckCircle } from 'lucide-react';
import { Guide, GuideLesson } from '@/types';
import { cn } from '@/lib/utils';

interface GuideStepsProps {
  guide: Guide;
}

function LessonCard({ lesson, index, isOpen, onToggle }: {
  lesson: GuideLesson;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      'rounded-2xl border transition-all duration-200 overflow-hidden',
      isOpen
        ? 'border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10 shadow-sm'
        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-200 dark:hover:border-primary-800'
    )}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/60 dark:hover:bg-slate-900/60 transition-colors"
      >
        {/* Step number */}
        <div className={cn(
          'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all',
          isOpen
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
        )}>
          {index + 1}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-semibold text-sm leading-snug',
            isOpen
              ? 'text-primary-700 dark:text-primary-400'
              : 'text-slate-800 dark:text-slate-200'
          )}>
            {lesson.title}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400 dark:text-slate-500">{lesson.duration}</span>
          </div>
        </div>

        {/* Toggle icon */}
        <div className={cn(
          'flex-shrink-0 transition-colors',
          isOpen ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'
        )}>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-5 pb-6 animate-fade-in">
          <div className="ml-13 pl-4 border-l-2 border-primary-200 dark:border-primary-800">
            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {lesson.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1 first:mt-0">{line.replace(/\*\*/g, '')}</p>;
                }
                if (line.startsWith('- ')) {
                  return <p key={i} className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1.5 flex-shrink-0">•</span>
                    {line.slice(2)}
                  </p>;
                }
                if (line.match(/^\d+\./)) {
                  return <p key={i} className="flex items-start gap-2">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold flex-shrink-0">{line.split('.')[0]}.</span>
                    {line.slice(line.indexOf('.') + 2)}
                  </p>;
                }
                if (line.trim() === '') return <div key={i} className="h-2" />;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuideSteps({ guide }: GuideStepsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div>
      {/* Guide header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-violet-100 dark:from-primary-900/30 dark:to-violet-900/30 flex items-center justify-center text-2xl shadow-sm">
          {guide.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{guide.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{guide.description}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all"
            style={{ width: openIndex !== null ? `${((openIndex + 1) / guide.lessons.length) * 100}%` : '0%' }}
          />
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 flex-shrink-0">
          <CheckCircle className="w-3.5 h-3.5 text-primary-500" />
          {openIndex !== null ? openIndex + 1 : 0}/{guide.lessons.length} lessons
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        {guide.lessons.map((lesson, i) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}
