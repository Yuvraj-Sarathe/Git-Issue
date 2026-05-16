'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationUrls {
  next?: string;
  prev?: string;
  first?: string;
  last?: string;
}

interface PaginationProps {
  pagination: PaginationUrls;
  loadingMore: boolean;
  onPageChange: (url?: string) => void;
}

export function Pagination({ pagination, loadingMore, onPageChange }: PaginationProps) {
  if (!pagination.next && !pagination.prev) return null;

  return (
    <div className="px-6 py-4 border-t border-white/[0.04] flex items-center justify-between" data-reveal>
      <button
        disabled={!pagination.prev || loadingMore}
        onClick={() => onPageChange(pagination.prev)}
        className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-white/[0.04] border border-white/[0.08] rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.08] hover:border-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Previous
      </button>

      {loadingMore && (
        <span className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          Loading...
        </span>
      )}

      <button
        disabled={!pagination.next || loadingMore}
        onClick={() => onPageChange(pagination.next)}
        className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-white/[0.04] border border-white/[0.08] rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.08] hover:border-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        Next
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
