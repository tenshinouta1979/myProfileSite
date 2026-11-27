import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

const directory = join(process.cwd(), 'content', 'notes');

type Note = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  minutes: number;
  content: string;
};

export async function getNote(slug: string): Promise<Note | undefined> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return;
  let raw: string;
  try {
    raw = await readFile(join(directory, `${slug}.mdx`), 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
    throw error;
  }
  const { data, content } = matter(raw);
  const { title, date, description, tag } = data;
  if (![title, date, description, tag].every((value) => typeof value === 'string' && value.trim()) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date))) {
    throw new Error(`Invalid MDX front matter: ${slug}`);
  }
  return { slug, title, description, date, tag, minutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)), content };
}

export async function getNotes() {
  const files = await readdir(directory);
  const notes = await Promise.all(files.filter((file) => file.endsWith('.mdx')).map((file) => getNote(file.slice(0, -4))));
  return notes.filter((note) => note !== undefined).sort((a, b) => b.date.localeCompare(a.date));
}

export const formatNoteDate = (date: string) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(date));
