export type Project = {
  slug: string;
  title: string;
  category: string;
  theme: 'green' | 'blue' | 'amber';
  icon: 'workflow' | 'chart' | 'founder';
  description: string;
  stack: string[];
  context: string;
  approach: string;
  takeaways: string[];
  architecture: { nodes: [string, string, string]; description: string };
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'event-driven-ai-rag',
    title: 'Event-Driven AI & RAG Automation Pipeline',
    category: 'AI Infrastructure',
    theme: 'green',
    icon: 'workflow',
    description: 'Self-hosted workflow orchestration and retrieval-augmented generation, designed for secure automation and cost-efficient scaling.',
    stack: ['n8n', 'Supabase', 'GCP', 'LLMs'],
    context: 'Bring ingestion, retrieval, and generation into a single event-driven workflow while keeping infrastructure and model costs predictable.',
    approach: 'Self-hosted n8n orchestrates events and ingestion. Supabase stores the documents and vector index, while model calls are handled by a downstream generation step. GCP hosts the workflow services.',
    takeaways: ['Keep ingestion and generation independently retryable.', 'Give each workflow only the credentials it needs.', 'Track latency, model usage, and cost per workflow run.'],
    architecture: {
      nodes: ['Event / webhook', 'n8n + Supabase', 'LLM response'],
      description: 'Illustrative flow: an event starts an n8n workflow, which retrieves context from Supabase and sends it to a language model.',
    },
    links: [],
  },
  {
    slug: 'ai-trading-market-analysis',
    title: 'AI Trading & Market Analysis Agent',
    category: 'Market Intelligence',
    theme: 'blue',
    icon: 'chart',
    description: 'A full-stack autonomous research workflow using Python, APIs, and real-time market data processing.',
    stack: ['Python', 'APIs', 'Real-time Data'],
    context: 'Experiment with turning noisy market feeds into a repeatable research workflow. The focus is analysis, not live order execution.',
    approach: 'A Python pipeline fetches and normalizes real-time API data, computes signals, and generates time-stamped summaries. An analysis view keeps the source observations visible next to each interpretation.',
    takeaways: ['Keep input provenance and data freshness visible.', 'Separate deterministic signal computation from generated commentary.', 'Evaluate the workflow in replay before relying on live inputs.'],
    architecture: {
      nodes: ['Market APIs', 'Python pipeline', 'Analysis view'],
      description: 'Market API data is normalized and analyzed in Python before insights are presented in a research view.',
    },
    links: [],
  },
  {
    slug: 'degreecenter',
    title: 'Founder Milestone — DegreeCenter (2007–2010)',
    category: 'Entrepreneurship',
    theme: 'amber',
    icon: 'founder',
    description: 'Built an academic credential verification platform for Korean police and military recruiting. Sold the business to a competitor.',
    stack: ['Credential Verification', 'Acquired'],
    context: 'Founded DegreeCenter to make academic credential verification easier for institutions that needed reliable confirmation.',
    approach: 'Built a dedicated platform for submitting credential checks and reviewing verification results, designed around the needs of Korean police and military recruiters.',
    takeaways: ['Design around the institution’s verification process.', 'Treat clarity and trust as product requirements.', 'Sold the business to a competitor.'],
    architecture: {
      nodes: ['Institution', 'DegreeCenter', 'Verification result'],
      description: 'Conceptual diagram: an institution submits a credential check and receives a verification result from DegreeCenter.',
    },
    links: [],
  },
];
