import { BackLink } from '@/components/detail';

export default function NotFound() {
  return (
    <main id="main-content" className="site-container detail-shell">
      <div className="detail-hero">
        <p className="eyebrow accent">404 / Not found</p>
        <h1>Page not found</h1>
        <p className="detail-description">This page may have moved or doesn’t exist.</p>
        <BackLink />
      </div>
    </main>
  );
}
