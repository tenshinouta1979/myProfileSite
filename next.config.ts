import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  agentRules: false,
  experimental: { cpus: 2 },
};

export default config;
