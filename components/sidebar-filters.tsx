'use client';

import { Filter, Tag, Code, Check, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarFiltersProps {
  unassignedFilter: boolean;
  onUnassignedChange: (value: boolean) => void;
  activeLabels: string[];
  onToggleLabel: (name: string) => void;
  activeLanguages: string[];
  onToggleLanguage: (name: string) => void;
  customLabelInput: string;
  onCustomLabelChange: (value: string) => void;
  onCustomLabelKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const LABELS = [
  { name: "good first issue", color: "7057ff", description: "Good for newcomers" },
  { name: "help wanted", color: "008672", description: "Extra attention" },
  { name: "priority: critical", color: "b60205", description: "" },
  { name: "priority: high", color: "d93f0b", description: "" },
  { name: "priority: low", color: "0e8a16", description: "" },
  { name: "priority: medium", color: "fbca04", description: "" },
  { name: "status: can't reproduce", color: "fec1c1", description: "" },
  { name: "status: confirmed", color: "215cea", description: "" },
  { name: "status: duplicate", color: "cfd3d7", description: "" },
  { name: "status: needs information", color: "fef2c0", description: "" },
  { name: "status: wont do/fix", color: "eeeeee", description: "" },
  { name: "type: bug", color: "d73a4a", description: "Something isn't working" },
  { name: "type: discussion", color: "d4c5f9", description: "" },
  { name: "type: documentation", color: "006b75", description: "" },
  { name: "type: enhancement", color: "84b6eb", description: "" },
  { name: "type: epic", color: "3E4B9E", description: "" },
  { name: "type: feature request", color: "fbca04", description: "" },
  { name: "type: question", color: "d876e3", description: "" },
  { name: "frontend", color: "bfdbfe", description: "" },
  { name: "backend", color: "bbf7d0", description: "" },
  { name: "database", color: "fde047", description: "" },
  { name: "management", color: "cbd5e1", description: "" },
];

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Python', 'Java', 'Go', 'Rust', 'C++', 'Ruby', 'PHP', 'Swift',
];

const getTextColorForBg = (hexColor: string) => {
  const r = parseInt(hexColor.substring(0, 2), 16) || 0;
  const g = parseInt(hexColor.substring(2, 4), 16) || 0;
  const b = parseInt(hexColor.substring(4, 6), 16) || 0;
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
};

export function SidebarFilters(props: SidebarFiltersProps) {
  const {
    unassignedFilter,
    onUnassignedChange,
    activeLabels,
    onToggleLabel,
    activeLanguages,
    onToggleLanguage,
    customLabelInput,
    onCustomLabelChange,
    onCustomLabelKeyDown,
  } = props;

  return (
    <aside className="w-full xl:w-72 flex-shrink-0 space-y-6" data-reveal>
      {/* Quick Filters */}
      <div className="bg-white/[0.04] border border-white/[0.10] p-1.5 rounded-[2rem]">
        <div className="bg-[var(--surface)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-5">
          <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Issue Status
          </h3>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                className="sr-only"
                checked={unassignedFilter}
                onChange={(e) => onUnassignedChange(e.target.checked)}
              />
              <div
                className={cn(
                  "w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200",
                  unassignedFilter
                    ? "bg-[var(--primary)]/20 border-[var(--primary)]/50"
                    : "bg-black/40 border-white/[0.08] group-hover:border-white/[0.15]"
                )}
              >
                {unassignedFilter && <Check className="w-3 h-3 text-[var(--primary)]" />}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-[var(--text-primary)]">Unassigned Only</span>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Issues seeking an owner</p>
            </div>
          </label>
        </div>
      </div>

      {/* Labels */}
      <div className="bg-white/[0.04] border border-white/[0.10] p-1.5 rounded-[2rem]">
        <div className="bg-[var(--surface)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-5">
          <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5" /> Filter by Labels
          </h3>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {LABELS.map((lbl) => {
              const isActive = activeLabels.includes(lbl.name);
              const bgColor = `#${lbl.color}`;
              return (
                <button
                  key={lbl.name}
                  onClick={() => onToggleLabel(lbl.name)}
                  title={lbl.description || lbl.name}
                  className={cn(
                    "text-[11px] px-2.5 py-1.5 rounded-full font-medium transition-all border flex items-center gap-1",
                    isActive
                      ? "ring-2 ring-[var(--primary)]/40 ring-offset-1 ring-offset-[var(--surface)] scale-105"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  )}
                  style={{
                    backgroundColor: bgColor,
                    color: getTextColorForBg(lbl.color),
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  {(lbl.name.toLowerCase().includes('first issue') || lbl.name.toLowerCase().includes('help wanted')) && (
                    <Sprout className="w-2.5 h-2.5" />
                  )}
                  {lbl.name}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
              Custom Label Search
            </label>
            <input
              type="text"
              placeholder="e.g. hacktoberfest..."
              value={customLabelInput}
              onChange={(e) => onCustomLabelChange(e.target.value)}
              onKeyDown={onCustomLabelKeyDown}
              className="w-full text-sm px-3.5 py-2 bg-black/40 border border-white/[0.08] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]/40 focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
            />
            <p className="text-[10px] text-[var(--text-muted)] mt-1">Press Enter to add.</p>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white/[0.04] border border-white/[0.10] p-1.5 rounded-[2rem]">
        <div className="bg-[var(--surface)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] p-5">
          <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
            <Code className="w-3.5 h-3.5" /> Languages
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((lang) => {
              const isActive = activeLanguages.includes(lang);
              return (
                <button
                  key={lang}
                  onClick={() => onToggleLanguage(lang)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full font-medium transition-all border",
                    isActive
                      ? "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30"
                      : "bg-black/40 text-[var(--text-muted)] border-white/[0.06] hover:border-white/[0.15] hover:text-[var(--text-primary)]"
                  )}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
