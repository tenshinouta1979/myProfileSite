import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BackLink } from '@/components/detail';
import { formatNoteDate, getNote, getNotes } from '@/lib/notes';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getNotes()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();
  return { title: note.title, description: note.description, openGraph: { type: 'article', title: note.title, description: note.description, publishedTime: note.date } };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();
  return (
    <main id="main-content" className="site-container detail-shell reader-shell">
      <BackLink section="notes" />
      <article>
        <header className="detail-hero reader-hero">
          <p className="eyebrow accent"><BookOpen size={16} aria-hidden="true" /> Engineering notes / {note.tag}</p>
          <h1>{note.title}</h1>
          <p className="detail-description">{note.description}</p>
          <p className="eyebrow"><time dateTime={note.date}>{formatNoteDate(note.date)}</time><span>·</span><span>{note.minutes} min read</span></p>
        </header>
        <div className="detail-body mdx"><MDXRemote source={note.content} /></div>
      </article>
    </main>
  );
}
