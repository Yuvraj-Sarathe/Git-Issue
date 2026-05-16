'use client';

import { X, User, Tag, Code } from 'lucide-react';

interface ActiveFiltersProps {
  unassignedFilter: boolean;
  onClearUnassigned: () => void;
  activeLabels: string[];
  onRemoveLabel: (name: string) => void;
  activeLanguages: string[];
  onRemoveLanguage: (name: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  unassignedFilter,
  onClearUnassigned,
  activeLabels,
  onRemoveLabel,
  activeLanguages,
  onRemoveLanguage,
  onClearAll,
}: ActiveFiltersProps) {
  const hasAny = unassignedFilter || activeLabels.length > 0 || activeLanguages.length > 0;
  if (!hasAny) return null;

  return (
    <div className="bg-white/[0.04] border border-white/[0.10] p-1.5 rounded-[2rem] mb-6" data-reveal>
      <div className="bg-[var(--surface)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[var(--text-muted)] font-medium mr-1">
            Active filters:
          </span>

          {unassignedFilter && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20">
              <User className="w-3 h-3" /> Unassigned
              <button
                onClick={onClearUnassigned}
                className="ml-0.5 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {activeLabels.map((label) => (
            <span
              key={`lbl-${label}`}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
            >
              <Tag className="w-3 h-3" /> {label}
              <button
                onClick={() => onRemoveLabel(label)}
                className="ml-0.5 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {activeLanguages.map((lang) => (
            <span
              key={`lng-${lang}`}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-white/[0.04] text-[var(--text-muted)] border border-white/[0.06]"
            >
              <Code className="w-3 h-3" /> {lang}
              <button
                onClick={() => onRemoveLanguage(lang)}
                className="ml-0.5 hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={onClearAll}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium ml-auto transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
