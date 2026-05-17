'use client';

import { Search, Settings } from 'lucide-react';

interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

interface FloatingHeaderProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onSettingsClick: () => void;
  rateLimit: RateLimit | null;
}

export function FloatingHeader({
  searchInput,
  onSearchChange,
  onSearchSubmit,
  onSettingsClick,
  rateLimit,
}: FloatingHeaderProps) {
  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:min-w-[640px] max-w-4xl">
      <div className="backdrop-blur-2xl bg-black/60 border border-white/[0.08] rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="GitIssue" className="w-5 h-5 object-contain brightness-0 invert" />
            </div>
            <span className="hidden sm:inline font-display text-lg font-semibold text-[var(--text-primary)] tracking-tight">
              GitIssue
            </span>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                placeholder="Search global issues..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white/[0.04] border border-white/[0.06] rounded-full text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]/40 focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
              />
            </div>
            <button
              onClick={onSearchSubmit}
              className="group hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 rounded-full hover:bg-[var(--primary)]/20 hover:border-[var(--primary)]/30 transition-all active:scale-[0.98]"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {rateLimit && (
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    rateLimit.remaining < 5 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-green)]'
                  }`}
                />
                {rateLimit.remaining}/{rateLimit.limit}
              </div>
            )}
            <button
              onClick={onSettingsClick}
              className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.08] hover:border-white/[0.10] transition-all active:scale-90"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
