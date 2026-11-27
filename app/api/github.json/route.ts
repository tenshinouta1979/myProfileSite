import { profile } from '@/data/resume';
import type { GithubActivity } from '@/lib/github';

const username = encodeURIComponent(profile.githubUsername);
const cache = { revalidate: 3600 };
const weeks = 13;

export const dynamic = 'force-static';

async function calendar(): Promise<NonNullable<GithubActivity['days']>> {
  const response = await fetch(`https://github.com/users/${username}/contributions`, { next: cache, signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error('GitHub contribution calendar unavailable');
  const html = await response.text();
  const levels = new Map<string, number>();
  for (const tag of html.matchAll(/<td\b[^>]*data-level="[^"]+"[^>]*>/g)) {
    const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(tag[0])?.[1];
    const level = /data-level="([0-4])"/.exec(tag[0])?.[1];
    if (date && level) levels.set(date, Number(level));
  }
  const last = [...levels.keys()].sort().at(-1);
  if (!last) throw new Error('GitHub contribution calendar format changed');
  const sunday = new Date(`${last}T00:00:00Z`);
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay() - (weeks - 1) * 7);
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const day = new Date(sunday);
    day.setUTCDate(day.getUTCDate() + i);
    const date = day.toISOString().slice(0, 10);
    const level = levels.get(date);
    return level === undefined ? null : { date, level };
  });
}

async function languages(): Promise<NonNullable<GithubActivity['languages']>> {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    next: cache,
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error('GitHub repository languages unavailable');
  const repos: { language: string | null; fork: boolean }[] = await response.json();
  const counts = new Map<string, number>();
  for (const { language, fork } of repos) {
    if (language && !fork) counts.set(language, (counts.get(language) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 4).map(([name, repos]) => ({ name, repos }));
}

export async function GET() {
  const [days, topLanguages] = await Promise.allSettled([calendar(), languages()]);
  const activity: GithubActivity = {
    days: days.status === 'fulfilled' ? days.value : null,
    languages: topLanguages.status === 'fulfilled' ? topLanguages.value : null,
  };
  return Response.json(activity, {
    headers: { 'Cache-Control': activity.days && activity.languages ? 'public, max-age=300' : 'no-store' },
  });
}
