import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDeadline(deadline: string): string {
  const date = new Date(deadline);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const dead = new Date(deadline);
  return Math.ceil((dead.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getDeadlineUrgency(deadline: string): 'expired' | 'urgent' | 'soon' | 'open' {
  const days = getDaysUntilDeadline(deadline);
  if (days < 0) return 'expired';
  if (days <= 30) return 'urgent';
  if (days <= 90) return 'soon';
  return 'open';
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}
