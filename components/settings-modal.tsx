'use client';

import { X, Save } from 'lucide-react';

interface SettingsModalProps {
  pat: string;
  onPatChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export function SettingsModal({ pat, onPatChange, onSave, onClose }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-[var(--surface)] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 w-[calc(100%-2rem)] sm:w-96 p-6"
        style={{
          animation: 'modalEnter 250ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        <style>{`
          @keyframes modalEnter {
            from { opacity: 0; transform: scale(0.88); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            Settings
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.08] transition-all"
            aria-label="Close settings"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            GitHub Personal Access Token
          </label>
          <input
            type="password"
            value={pat}
            onChange={(e) => onPatChange(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3.5 py-2.5 text-sm bg-black/40 border border-white/[0.08] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]/40 focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
          />
          <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
            Increases the Search API rate limit from{' '}
            <strong className="text-[var(--text-primary)]">10</strong> to{' '}
            <strong className="text-[var(--text-primary)]">30</strong> requests per
            minute.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onSave}
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 rounded-full hover:bg-[var(--primary)]/20 hover:border-[var(--primary)]/30 transition-all active:scale-[0.98]"
          >
            <Save className="w-4 h-4 transition-transform group-hover:scale-105" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
