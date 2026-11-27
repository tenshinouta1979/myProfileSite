'use client';

import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight } from 'lucide-react';
import { githubProfile, profile } from '@/data/resume';
import type { GithubActivity } from '@/lib/github';

export function GithubPulse() {
  const [activity, setActivity] = useState<GithubActivity | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/api/github', { signal: controller.signal });
        if (!response.ok) throw new Error('Activity unavailable');
        const data: GithubActivity = await response.json();
        if (!controller.signal.aborted) setActivity(data);
      } catch {
        if (!controller.signal.aborted) setActivity({ days: null, languages: null });
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  const activeDays = activity?.days?.filter((day) => day && day.level > 0).length;

  return (
    <section className="bento-card github-card" aria-labelledby="pulse-heading">
      <p className="eyebrow"><Activity size={16} aria-hidden="true" /> Live activity</p>
      <h3 id="pulse-heading">Engineering pulse</h3>
      <a href={githubProfile} className="github-handle mono">@{profile.githubUsername}<ArrowUpRight size={13} aria-hidden="true" /></a>
      <div className="pulse-content" aria-live="polite">
        {activity?.days ? <>
          <div className="calendar" role="img" aria-label={`${activeDays} active days over the last 13 weeks of GitHub contributions`}>
            {activity.days.map((day, i) => <span key={day?.date ?? i} data-level={day?.level ?? 'empty'} title={day ? `${day.date}: ${day.level === 0 ? 'No contributions' : `Activity level ${day.level} of 4`}` : undefined} />)}
          </div>
          <p className="pulse-caption"><span>Last 13 weeks</span><span>{activeDays} active days</span></p>
        </> : <p className="calendar-message">{activity ? 'Contribution calendar unavailable. View activity on GitHub.' : 'Loading contributions…'}</p>}
        <p className="eyebrow languages-heading">Top languages</p>
        {activity?.languages?.length ? <ul className="badges">{activity.languages.map(({ name, repos }) => <li key={name} title={`${repos} public non-fork repos`}>{name}</li>)}</ul>
          : <p className="muted text-xs">{!activity ? 'Loading languages…' : activity.languages ? 'No public languages yet.' : 'Language breakdown unavailable.'}</p>}
      </div>
    </section>
  );
}
