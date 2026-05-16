'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { FloatingHeader } from '@/components/floating-header';
import { SidebarFilters } from '@/components/sidebar-filters';
import { ActiveFilters } from '@/components/active-filters';
import { IssueCard } from '@/components/issue-card';
import { Pagination } from '@/components/pagination';
import { SettingsModal } from '@/components/settings-modal';

interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

interface IssueLabel {
  id: number;
  name: string;
  color: string;
  description?: string;
}

interface UserAvatar {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  comments: number;
  labels: IssueLabel[];
  user: UserAvatar;
  assignees: UserAvatar[];
  pull_request?: any;
  repository_url: string;
}

interface PaginationUrls {
  next?: string;
  prev?: string;
  first?: string;
  last?: string;
}

const parseLinkHeader = (header: string | null): PaginationUrls => {
  if (!header) return {};
  const links = header.split(',');
  const result: any = {};
  links.forEach((link) => {
    const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) result[match[2]] = match[1];
  });
  return result;
};

export default function GlobalGitHubIssueExplorer() {
  const [searchInput, setSearchInput] = useState('');
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [pat, setPat] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [pagination, setPagination] = useState<PaginationUrls>({});
  const [sortParam, setSortParam] = useState('created-desc');
  const [unassignedFilter, setUnassignedFilter] = useState(false);
  const [activeLabels, setActiveLabels] = useState<string[]>([]);
  const [activeLanguages, setActiveLanguages] = useState<string[]>([]);
  const [customLabelInput, setCustomLabelInput] = useState('');

  useEffect(() => {
    const savedPat = localStorage.getItem('githubPat');
    if (savedPat) setPat(savedPat);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [issues, loading]);

  const getHeaders = useCallback(() => {
    const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
    if (pat) headers['Authorization'] = `token ${pat}`;
    return headers;
  }, [pat]);

  const updateRateLimit = (res: Response) => {
    const limit = res.headers.get('x-ratelimit-limit');
    const remaining = res.headers.get('x-ratelimit-remaining');
    const reset = res.headers.get('x-ratelimit-reset');
    if (limit && remaining && reset) {
      setRateLimit({
        limit: parseInt(limit, 10),
        remaining: parseInt(remaining, 10),
        reset: parseInt(reset, 10),
      });
    }
  };

  const handleApiError = async (res: Response) => {
    let message = `API Error: ${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      if (data.message) message = data.message;
    } catch (_) {}
    if (res.status === 403 || res.status === 429) {
      message =
        'API Rate limit exceeded (10/min unauthenticated, 30/min with token).';
    }
    setError(message);
    throw new Error(message);
  };

  const API_BASE = 'https://api.github.com';

  const buildSearchQuery = useCallback(() => {
    const parts = ['type:issue', 'state:open'];
    if (searchInput) parts.push(searchInput);
    if (unassignedFilter) parts.push('no:assignee');
    activeLabels.forEach((label) => parts.push(`label:"${label}"`));
    activeLanguages.forEach((lang) => parts.push(`language:${lang}`));
    return parts.join(' ');
  }, [searchInput, unassignedFilter, activeLabels, activeLanguages]);

  const fetchIssuesList = useCallback(
    async (pageUrl?: string) => {
      const isFirstPage = !pageUrl;
      if (isFirstPage) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      try {
        let fetchUrl = pageUrl;
        if (!fetchUrl) {
          const [sort, direction] = sortParam.split('-');
          const query = buildSearchQuery();
          const queryParams = new URLSearchParams({ q: query, per_page: '30' });
          if (sort !== 'best-match') {
            queryParams.append('sort', sort);
            queryParams.append('order', direction);
          }
          fetchUrl = `${API_BASE}/search/issues?${queryParams.toString()}`;
        }

        const res = await fetch(fetchUrl, { headers: getHeaders() });
        updateRateLimit(res);
        if (!res.ok) await handleApiError(res);

        const data = await res.json();
        setPagination(parseLinkHeader(res.headers.get('link')));
        setTotalCount(data.total_count);
        const onlyIssues = data.items.filter(
          (item: GitHubIssue) => !item.pull_request,
        );

        if (isFirstPage) setIssues(onlyIssues);
        else setIssues((prev) => [...prev, ...onlyIssues]);
      } catch (err: any) {
        console.error(err);
      } finally {
        if (isFirstPage) setLoading(false);
        setLoadingMore(false);
      }
    },
    [sortParam, getHeaders, buildSearchQuery],
  );

  const handleSearchSubmit = () => {
    fetchIssuesList();
  };

  const saveSettings = () => {
    localStorage.setItem('githubPat', pat);
    setShowSettings(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchIssuesList(), 500);
    return () => clearTimeout(timeoutId);
  }, [sortParam, activeLabels, activeLanguages, unassignedFilter, fetchIssuesList]);

  const toggleLabel = (labelName: string) => {
    setActiveLabels((prev) =>
      prev.includes(labelName)
        ? prev.filter((l) => l !== labelName)
        : [...prev, labelName],
    );
  };

  const toggleLanguage = (langName: string) => {
    setActiveLanguages((prev) =>
      prev.includes(langName)
        ? prev.filter((l) => l !== langName)
        : [...prev, langName],
    );
  };

  const handleCustomLabelAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter' && customLabelInput.trim()) {
      const tags = customLabelInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const newActive = [...activeLabels];
      tags.forEach((t) => {
        if (!newActive.includes(t)) newActive.push(t);
      });
      setActiveLabels(newActive);
      setCustomLabelInput('');
    }
  };

  const clearAllFilters = () => {
    setActiveLabels([]);
    setActiveLanguages([]);
    setUnassignedFilter(false);
  };

  const hasActiveFilters =
    activeLabels.length > 0 || activeLanguages.length > 0 || unassignedFilter;

  return (
    <div className="min-h-screen bg-[var(--ground)]">
      <FloatingHeader
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onSettingsClick={() => setShowSettings(true)}
        rateLimit={rateLimit}
      />

      {showSettings && (
        <SettingsModal
          pat={pat}
          onPatChange={setPat}
          onSave={saveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
        {error && (
          <div
            className="mb-6 bg-[var(--accent-red)]/5 border border-[var(--accent-red)]/20 rounded-2xl p-4 flex items-start gap-3"
            data-reveal
          >
            <AlertCircle className="w-5 h-5 text-[var(--accent-red)] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--accent-red)]">{error}</p>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-8">
          <SidebarFilters
            unassignedFilter={unassignedFilter}
            onUnassignedChange={setUnassignedFilter}
            activeLabels={activeLabels}
            onToggleLabel={toggleLabel}
            activeLanguages={activeLanguages}
            onToggleLanguage={toggleLanguage}
            customLabelInput={customLabelInput}
            onCustomLabelChange={setCustomLabelInput}
            onCustomLabelKeyDown={handleCustomLabelAdd}
          />

          <div className="flex-1 min-w-0">
            <div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
              data-reveal
            >
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] flex items-center gap-3">
                Discovered Issues
                {!loading && totalCount > 0 && (
                  <span className="text-xs py-0.5 px-2.5 rounded-full font-medium bg-white/[0.04] border border-white/[0.08] text-[var(--text-muted)]">
                    {totalCount.toLocaleString()}
                  </span>
                )}
              </h2>

              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-1.5">
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  Sort:
                </span>
                <select
                  value={sortParam}
                  onChange={(e) => setSortParam(e.target.value)}
                  className="text-sm border-none bg-transparent focus:outline-none text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  <option value="created-desc">Newest</option>
                  <option value="created-asc">Oldest</option>
                  <option value="comments-desc">Most commented</option>
                  <option value="updated-desc">Recently updated</option>
                  <option value="best-match">Best match</option>
                </select>
              </div>
            </div>

            <ActiveFilters
              unassignedFilter={unassignedFilter}
              onClearUnassigned={() => setUnassignedFilter(false)}
              activeLabels={activeLabels}
              onRemoveLabel={toggleLabel}
              activeLanguages={activeLanguages}
              onRemoveLanguage={toggleLanguage}
              onClearAll={clearAllFilters}
            />

            <div
              className="bg-white/[0.04] border border-white/[0.10] p-1.5 rounded-[2rem]"
              data-reveal
            >
              <div className="bg-[var(--surface)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)] overflow-hidden">
                {loading && (
                  <div className="flex items-center justify-center py-24">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)]/30 border-t-[var(--primary)] animate-spin" />
                      <span className="text-sm text-[var(--text-muted)] font-medium">
                        Searching global issues...
                      </span>
                    </div>
                  </div>
                )}

                {!loading && issues.length === 0 && !error && (
                  <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-[var(--text-muted)]/50" />
                    </div>
                    <p className="font-display text-xl text-[var(--text-primary)] mb-2">
                      No issues found
                    </p>
                    <p className="text-sm max-w-md text-center">
                      Try removing some filters or making your search broader.
                    </p>
                  </div>
                )}

                {!loading && issues.length > 0 && (
                  <ul className="divide-y divide-white/[0.04]">
                    {issues.map((issue, idx) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        revealDelay={Math.min(idx * 30, 300)}
                      />
                    ))}
                  </ul>
                )}

                <Pagination
                  pagination={pagination}
                  loadingMore={loadingMore}
                  onPageChange={fetchIssuesList}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
