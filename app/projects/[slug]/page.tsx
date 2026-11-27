import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Architecture, BackLink } from '@/components/detail';
import { projectIcons } from '@/components/bento/cards';
import { projects } from '@/data/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return { title: project.title, description: project.description, openGraph: { title: project.title, description: project.description } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const Icon = projectIcons[project.icon];

  return (
    <main id="main-content" className={`site-container detail-shell tone-${project.theme}`}>
      <BackLink section="projects" />
      <article>
        <header className="detail-hero">
          <span className="tile-icon"><Icon size={22} aria-hidden="true" /></span>
          <p className="eyebrow tone">Case study / {project.category}</p>
          <h1>{project.title}</h1>
          <p className="detail-description">{project.description}</p>
          <ul className="badges">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        </header>
        <section className="bento-card detail-panel">
          <p className="eyebrow accent">01 / System design</p>
          <h2>Architecture overview</h2>
          <Architecture architecture={project.architecture} />
        </section>
        <section className="detail-body">
          <h2>Context</h2><p>{project.context}</p>
          <h2>Approach</h2><p>{project.approach}</p>
          <h2>Key takeaways</h2><ul>{project.takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
          {project.links.length > 0 && <><h2>Project links</h2><ul>{project.links.map(({ label, href }) => <li key={href}><a className="inline-link" href={href}>{label}<ArrowUpRight size={15} aria-hidden="true" /></a></li>)}</ul></>}
        </section>
      </article>
    </main>
  );
}
