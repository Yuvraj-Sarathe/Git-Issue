'use client';

import { CircleDot, BookOpen, Calendar, MessageSquare, Sprout } from 'lucide-react';
import Image from 'next/image';

interface IssueLabel {
  id: number;
  name: string;
  color: string;
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
  html_url: string;
  created_at: string;
  comments: number;
  labels: IssueLabel[];
  user: UserAvatar;
  assignees: UserAvatar[];
  pull_request?: any;
  repository_url: string;
}

interface IssueCardProps {
  issue: GitHubIssue;
  revealDelay?: number;
}

const getTextColorForBg = (hexColor: string) => {
  const r = parseInt(hexColor.substring(0, 2), 16) || 0;
  const g = parseInt(hexColor.substring(2, 4), 16) || 0;
  const b = parseInt(hexColor.substring(4, 6), 16) || 0;
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(dateString));
};

const extractRepoFromUrl = (repoUrl: string) => {
  return repoUrl.replace('https://api.github.com/repos/', '');
};

export function IssueCard({ issue, revealDelay }: IssueCardProps) {
  const repoName = extractRepoFromUrl(issue.repository_url);

  return (
    <li
      className="group border-b border-white/[0.04] last:border-b-0 transition-colors hover:bg-white/[0.02]"
      data-reveal
      style={revealDelay ? { transitionDelay: `${revealDelay}ms` } : undefined}
    >
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] mb-2 ml-7">
              <BookOpen className="w-3.5 h-3.5" />
              <a
                href={`https://github.com/${repoName}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--primary)] hover:underline transition-colors"
              >
                {repoName}
              </a>
            </div>

            <div className="flex items-start gap-2 mb-1.5">
              <CircleDot className="w-5 h-5 text-[var(--accent-green)] mt-0.5 flex-shrink-0" />
              <a
                href={issue.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-base sm:text-lg font-medium text-[var(--text-primary)] hover:text-[var(--primary)] break-words leading-tight transition-colors"
              >
                {issue.title}
              </a>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2 mb-2 ml-7">
              {issue.labels.map((l) => {
                const isSpecial = l.name.toLowerCase().includes('first issue') || l.name.toLowerCase().includes('help wanted');
                return (
                  <span
                    key={l.id}
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border"
                    style={{
                      backgroundColor: `#${l.color}`,
                      color: getTextColorForBg(l.color),
                      borderColor: 'rgba(0,0,0,0.1)',
                    }}
                  >
                    {isSpecial && <Sprout className="w-2.5 h-2.5" />}
                    {l.name}
                  </span>
                );
              })}
            </div>

            <div className="text-xs text-[var(--text-muted)] ml-7 flex flex-wrap items-center gap-y-1 gap-x-3 mt-3">
              <span className="font-medium text-[var(--text-primary)]/60">
                #{issue.number}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> opened{' '}
                {formatDate(issue.created_at)}
              </span>
              <span className="flex items-center gap-1">
                by{' '}
                <a
                  href={issue.user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--primary)] hover:underline font-medium transition-colors"
                >
                  {issue.user.login}
                </a>
              </span>
            </div>
          </div>

          <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 mt-2 lg:mt-0 flex-shrink-0 pl-7 lg:pl-0 border-t lg:border-t-0 border-white/[0.04] pt-3 lg:pt-0">
            <div className="flex items-center gap-2">
              {issue.assignees && issue.assignees.length > 0 ? (
                <div className="flex -space-x-2">
                  {issue.assignees.map((user) => (
                    <Image
                      key={user.login}
                      src={user.avatar_url}
                      alt={`@${user.login}`}
                      title={`Assigned to ${user.login}`}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border-2 border-[var(--surface)] bg-white/[0.04] object-cover"
                    />
                  ))}
                </div>
              ) : (
                <span className="text-xs px-2 py-1 bg-black/40 text-[var(--text-muted)] rounded-lg font-medium border border-white/[0.06]">
                  Unassigned
                </span>
              )}
            </div>

            {issue.comments > 0 && (
              <div className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                {issue.comments}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
