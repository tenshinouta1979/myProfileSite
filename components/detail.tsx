import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';

export function BackLink({ section }: { section?: string }) {
  return <Link className="back-link" href={section ? `/#${section}` : '/'}><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio</Link>;
}

export function Architecture({ architecture }: { architecture: Project['architecture'] }) {
  return (
    <figure className="architecture">
      <FlowDiagram architecture={architecture} orientation="horizontal" />
      <FlowDiagram architecture={architecture} orientation="vertical" />
      <figcaption>{architecture.description}</figcaption>
    </figure>
  );
}

function FlowDiagram({ architecture, orientation }: { architecture: Project['architecture']; orientation: 'horizontal' | 'vertical' }) {
  const vertical = orientation === 'vertical';
  const [width, height] = vertical ? [320, 284] : [690, 188];
  const nodeWidth = vertical ? 190 : 168;
  const nodeHeight = vertical ? 62 : 84;
  const grid = `architecture-grid-${orientation}`;
  const arrow = `flow-arrow-${orientation}`;

  return (
    <svg className={`flow-${orientation}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="System architecture flow">
      <desc>{architecture.description}</desc>
      <defs>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#23312d" strokeWidth=".7" /></pattern>
        <marker id={arrow} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="m1 1 7 4-7 4" fill="none" stroke="#10B981" strokeWidth="1.5" /></marker>
      </defs>
      <rect width={width} height={height} fill={`url(#${grid})`} />
      {architecture.nodes.map((node, i) => {
        const x = vertical ? (width - nodeWidth) / 2 : 43 + i * 218;
        const y = vertical ? 17 + i * 94 : 52;
        const centerX = x + nodeWidth / 2;
        const centerY = y + nodeHeight / 2;
        const connector = vertical ? `M${centerX} ${y + nodeHeight + 4}v24` : `M${x + nodeWidth + 4} ${centerY}h42`;
        return (
          <g key={node}>
            <rect x={x} y={y} width={nodeWidth} height={nodeHeight} rx="10" fill="#131917" stroke="#396354" />
            <text x={centerX} y={centerY - 8} textAnchor="middle" fill="#51dcb0" fontSize="12">0{i + 1}</text>
            <text x={centerX} y={centerY + 15} textAnchor="middle" fill="#e0e7e4" fontSize="14">{node}</text>
            {i < architecture.nodes.length - 1 && <path d={connector} stroke="#10B981" strokeWidth="2" markerEnd={`url(#${arrow})`} />}
          </g>
        );
      })}
    </svg>
  );
}
