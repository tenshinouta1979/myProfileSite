import { AvailabilityCard, ExperienceCard, NotesCard, Overview, ProjectCard, SectionHeading, SpeakingCard, StackCard } from '@/components/bento/cards';
import { GithubPulse } from '@/components/bento/github-pulse';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { projects } from '@/data/projects';
import { profile } from '@/data/resume';

export default function Home() {
  return (
    <div className="site-container portfolio-layout">
      <ProfileSidebar />
      <main className="bento-grid" id="main-content">
        <Overview />
        <SectionHeading id="projects" number="02" title="Selected projects" detail="Case studies" />
        {projects.map((project, index) => (
          <div className="project-row" key={project.slug}>
            <ProjectCard project={project} />
            {project.slug === 'degreecenter' ? <AvailabilityCard /> : index === 0 ? <GithubPulse /> : index === 1 ? <StackCard /> : null}
          </div>
        ))}
        <SectionHeading id="experience" number="03" title="Experience" detail="Work history" />
        <ExperienceCard />
        <SectionHeading id="notes" number="04" title="Engineering notes" detail="Ideas in practice" />
        <NotesCard />
        <SpeakingCard />
        <footer className="portfolio-footer span-3"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#overview">Back to top ↑</a></footer>
      </main>
    </div>
  );
}
