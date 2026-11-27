import { ImageResponse } from 'next/og';
import { profile } from '@/data/resume';

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 90, width: '100%', height: '100%', background: '#0A0A0B', color: '#F4F4F5' }}>
      <div style={{ color: '#10B981', fontSize: 28, marginBottom: 26 }}>ARCHITECTURE / ENGINEERING</div>
      <div style={{ fontSize: 100, fontWeight: 700 }}>{profile.name}</div>
      <div style={{ fontSize: 40, marginTop: 20 }}>{profile.title}</div>
      <div style={{ color: '#A1A1AA', fontSize: 25, marginTop: 36 }}>{profile.location}</div>
    </div>,
    size,
  );
}
