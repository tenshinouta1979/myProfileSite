import { Download, Github, Linkedin, Mail, MapPin, NotebookPen } from 'lucide-react';
import { githubProfile, profile } from '@/data/resume';
import { sections } from '@/data/sections';

export function ProfileSidebar() {
  return (
    <aside className="profile-rail" aria-label="Profile">
      <div className="profile-monogram" aria-hidden="true">RL<span>.</span></div>
      <div className="profile-copy">
        <h1>{profile.name}</h1>
        <div className="profile-title">{profile.title}</div>
        <p className="profile-tagline">{profile.tagline}</p>
        <p className="location"><MapPin size={15} aria-hidden="true" />{profile.location}</p>
      </div>
      <div className="profile-actions">
        <a href={`mailto:${profile.email}`} className="button button-primary"><Mail size={16} aria-hidden="true" /> Email</a>
        <a href={profile.resume} download className="button"><Download size={16} aria-hidden="true" /> Resume PDF</a>
      </div>
      <nav className="profile-nav" aria-label="Portfolio sections">
        <p className="eyebrow">On this page</p>
        {sections.map(({ id, label, number }) => <a key={id} href={`#${id}`}><span>{label}</span><span className="mono">{number}</span></a>)}
      </nav>
      <div className="socials">
        <a href={githubProfile} aria-label="GitHub profile"><Github size={18} aria-hidden="true" /></a>
        <a href={profile.linkedin} aria-label="LinkedIn profile"><Linkedin size={18} aria-hidden="true" /></a>
        <a href={profile.notion} aria-label="Ryan Lee Space (Notion)" title="Ryan Lee Space (Notion)"><NotebookPen size={18} aria-hidden="true" /></a>
      </div>
    </aside>
  );
}
