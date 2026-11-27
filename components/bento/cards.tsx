import Link from 'next/link';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, ChevronDown, GraduationCap, Layers3, MapPin, Medal, Mic, Network, Radio, TrendingUp, Trophy, Workflow } from 'lucide-react';
import { availability, earlierRoles, experience, profile, speaking, stack } from '@/data/resume';
import type { Project } from '@/data/projects';
import { formatNoteDate, getNotes } from '@/lib/notes';

export const projectIcons = { workflow: Workflow, chart: TrendingUp, founder: Trophy };

function Badges({ values }: { values: string[] }) {
  return <ul className="badges">{values.map((value) => <li key={value}>{value}</li>)}</ul>;
}

function SignalArt() {
  return (
    <svg className="signal-art" viewBox="0 0 300 280" fill="none" aria-hidden="true">
      <defs>
        <pattern id="signal-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" stroke="#263633" strokeWidth=".6" /></pattern>
        <radialGradient id="signal-fade"><stop offset=".3" stopColor="white" /><stop offset="1" stopColor="black" /></radialGradient>
        <mask id="signal-mask"><rect width="300" height="280" fill="url(#signal-fade)" /></mask>
      </defs>
      <rect width="300" height="280" fill="url(#signal-grid)" mask="url(#signal-mask)" />
      <g stroke="#3a6355">
        <circle cx="150" cy="140" r="87" strokeDasharray="3 5" /><circle cx="150" cy="140" r="66" />
        <circle cx="150" cy="140" r="44" strokeDasharray="2 6" /><path d="M150 36v208M46 140h208" opacity=".55" />
      </g>
      <path d="M150 53v87l82-30A87 87 0 0 0 150 53Z" fill="#10B981" fillOpacity=".15" />
      <path d="m150 140 82-30" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="150" cy="140" r="11" fill="#10B981" fillOpacity=".14" /><circle cx="150" cy="140" r="4" fill="#44e2aa" />
      <circle cx="232" cy="110" r="3" fill="#44e2aa" /><circle cx="104" cy="188" r="3" fill="#10B981" />
      <path d="M52 71h15m-7.5-7.5v15M235 204h15m-7.5-7.5v15" stroke="#637670" />
    </svg>
  );
}

export function Overview() {
  return (
    <section id="overview" className="bento-card overview span-3" aria-labelledby="overview-heading">
      <SignalArt />
      <div className="overview-content">
        <p className="eyebrow accent"><Radio size={15} aria-hidden="true" /> Executive overview</p>
        <h2 id="overview-heading">Modernizing platforms.<br /><span>Making identity secure.</span></h2>
        <p className="section-copy">{profile.bio}</p>
        <Badges values={profile.strengths} />
      </div>
      <dl className="signals">
        {profile.signals.map(({ metric, label }) => <div key={label}><dt>{label}</dt><dd>{metric}</dd></div>)}
      </dl>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const Icon = projectIcons[project.icon];
  return (
    <Link href={`/projects/${project.slug}`} className={`bento-card project-card span-2 tone-${project.theme}`}>
      <div className="card-topline"><span className="tile-icon"><Icon size={20} aria-hidden="true" /></span><ArrowUpRight className="out-arrow" size={20} aria-hidden="true" /></div>
      <p className="eyebrow tone">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="section-copy">{project.description}</p>
      <Badges values={project.stack} />
    </Link>
  );
}

export function StackCard() {
  return (
    <section className="bento-card stack-card" aria-labelledby="stack-heading">
      <p className="eyebrow"><Layers3 size={16} aria-hidden="true" /> Technical toolkit</p>
      <h3 id="stack-heading">Tech stack matrix</h3>
      {stack.map(({ name, skills }) => <div className="stack-group" key={name}><h4>{name}</h4><Badges values={skills} /></div>)}
    </section>
  );
}

export function AvailabilityCard() {
  return (
    <section className="bento-card profile-extra" aria-labelledby="availability-heading">
      <p className="eyebrow accent"><BriefcaseBusiness size={16} aria-hidden="true" /> Work with me</p>
      <h3 id="availability-heading">{availability.title}</h3>
      <p className="section-copy">{availability.summary}</p>
      <p className="location"><MapPin size={14} aria-hidden="true" />{availability.location}</p>
      <div className="contact-links">{availability.links.map(({ href, label }) => (
        <a key={href} href={href}>{label}<ArrowUpRight size={14} aria-hidden="true" /></a>
      ))}</div>
    </section>
  );
}

export function SpeakingCard() {
  return (
    <section className="bento-card profile-extra" aria-labelledby="speaking-heading">
      <p className="eyebrow accent"><Mic size={16} aria-hidden="true" /> Knowledge sharing</p>
      <h3 id="speaking-heading">{speaking.title}</h3>
      <ul className="speaking-list section-copy">{speaking.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
    </section>
  );
}

export function ExperienceCard() {
  return (
    <section className="bento-card experience-card span-3" aria-labelledby="timeline-heading">
      <p className="eyebrow accent"><Network size={16} aria-hidden="true" /> Career timeline</p>
      <h3 id="timeline-heading">Platforms and teams I’ve led</h3>
      <div className="timeline">
        {experience.map((role) => (
          <details key={role.organization}>
            <summary>
              <span className="timeline-role"><strong>{role.title}</strong><span>{role.organization}{role.location ? ` · ${role.location}` : ''}</span></span>
              <span className="mono">{role.dates}</span><ChevronDown size={17} aria-hidden="true" />
            </summary>
            <div className="timeline-body"><p>{role.summary}</p><ul>{role.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
          </details>
        ))}
        <details>
          <summary><span className="timeline-role"><strong>Earlier roles</strong><span>Software, product & quality engineering</span></span><span className="mono">2007 – 2012</span><ChevronDown size={17} aria-hidden="true" /></summary>
          <div className="timeline-body">
            <ul className="earlier-roles">{earlierRoles.map((role) => (
              <li key={role.organization}>
                <strong>{role.title} · {role.organization}</strong>
                <span className="earlier-meta mono">{role.location} · {role.dates}</span>
                <p>{role.summary}</p>
              </li>
            ))}</ul>
          </div>
        </details>
      </div>
      <div className="credentials">
        <div><p className="eyebrow"><Medal size={16} aria-hidden="true" /> Certifications</p><Badges values={profile.certifications} /></div>
        <div><p className="eyebrow"><GraduationCap size={17} aria-hidden="true" /> Education</p><p className="education">{profile.education}</p></div>
      </div>
    </section>
  );
}

export async function NotesCard() {
  const notes = await getNotes();
  return (
    <section className="bento-card notes-card span-2" aria-labelledby="notes-heading">
      <p className="eyebrow accent"><BookOpen size={16} aria-hidden="true" /> Digital garden</p>
      <h3 id="notes-heading">Field notes</h3>
      <div className="note-list">
        {notes.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`} className="note-preview">
            <div><div className="eyebrow note-meta"><time dateTime={note.date}>{formatNoteDate(note.date)}</time><span>{note.minutes} min read</span></div><h4>{note.title}</h4><p>{note.description}</p></div>
            <ArrowRight size={19} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ id, number, title, detail }: { id: string; number: string; title: string; detail: string }) {
  return (
    <div className="section-heading span-3" id={id}>
      <h2><span className="mono">{number} /</span> {title}</h2><span className="heading-detail mono">{detail}<ArrowDownRight size={15} aria-hidden="true" /></span>
    </div>
  );
}
