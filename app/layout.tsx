import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import { githubProfile, profile } from '@/data/resume';
import './globals.css';

export const metadata: Metadata = {
  ...(process.env.SITE_URL ? { metadataBase: new URL(process.env.SITE_URL) } : {}),
  title: { default: `${profile.name} — ${profile.title}`, template: `%s | ${profile.name}` },
  description: profile.bio,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.bio,
    siteName: 'Ryan Lee Portfolio',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <header className="site-header">
          <div className="site-container header-inner">
            <Link href="/" className="wordmark" aria-label="Ryan Lee home"><span className="logo">RL<span>.</span></span><span>ryanlee<span className="accent">.</span>dev</span></Link>
            <a href={githubProfile} className="header-link"><Github size={16} aria-hidden="true" /><span>GitHub</span><ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
