export const profile = {
  name: 'Ryan Lee',
  title: 'Solution Architect | Cloud, Identity & Platform Engineering',
  tagline: 'I design resilient cloud platforms, simplify secure access, and help engineering teams deliver and operate them.',
  location: 'Toronto, ON, Canada',
  email: 'ryan_lee@live.com',
  githubUsername: 'tenshinouta1979',
  linkedin: 'https://linkedin.com/in/tenshinouta',
  notion: 'https://lovely-pike-409.notion.site/Ryan-Lee-Space-3fb2da87c50d40aebf5007d73ac8ceb8',
  website: 'https://ryanleetech.com',
  resume: '/resume-ryan-lee.pdf',
  bio: 'I bring 20+ years in technology, including 15+ years in architecture and platform engineering. I help government and enterprise teams modernize Azure and AWS platforms, secure identity across systems, and improve how they deliver software. My hands-on background spans frontend and backend development, database administration, and data engineering.',
  strengths: ['Platform & Cloud Strategy', 'Enterprise Modernization', 'Zero-Trust & IAM', 'Kubernetes & IaC', 'Engineering Leadership'],
  education: 'BSc Computer Science · University of Toronto Scarborough',
  certifications: ['AZ-900', 'AI-900', 'DP-900', 'AWS Cloud Practitioner Essentials'],
  signals: [
    { metric: '15+', label: 'Years in architecture & platforms' },
    { metric: '06+', label: 'Systems federated' },
    { metric: '01', label: 'Company sold' },
  ],
};

export const githubProfile = `https://github.com/${profile.githubUsername}`;

export const availability = {
  title: 'Availability',
  summary: 'Open to Solution Architect and platform engineering roles, as well as consulting engagements.',
  location: 'Toronto · Open to relocation',
  links: [
    { label: 'Email Ryan', href: `mailto:${profile.email}` },
    { label: 'Connect on LinkedIn', href: profile.linkedin },
  ],
};

export const speaking = {
  title: 'Speaking & Mentoring',
  highlights: [
    'Spoke at the 2008 Singapore Summit while at Microsoft.',
    'Trained new Microsoft engineers in Bangalore, India.',
    'Built and mentored DevOps teams at Bell Canada (Environics Analytics).',
  ],
};

export const stack = [
  { name: 'Cloud & Orchestration', skills: ['Azure', 'AWS', 'Kubernetes', 'Docker', 'Terraform/IaC', 'Linux', 'Jenkins', 'CI/CD'] },
  { name: 'Identity & Security', skills: ['IAM', 'OAuth', 'SAML', 'Entra ID', 'SecOps'] },
  { name: 'Languages & Data', skills: ['Python', 'Node.js', 'JavaScript', 'React Native', 'C#/.NET', 'SQL', 'MySQL', 'MS SQL Server', 'Supabase'] },
  { name: 'AI & Automation', skills: ['n8n', 'RAG Pipelines', 'MCP', 'LLM Integration'] },
];

export const experience = [
  {
    title: 'Lead System Integrator',
    organization: 'Government of Ontario',
    dates: 'Mar 2025 – Present',
    summary: 'Cross-ministry identity and GIS modernization.',
    details: [
      'Shaped a multi-year GIS modernization roadmap, balancing platform risk with iterative delivery.',
      'Designed cross-domain, multi-application SSO for 6+ government systems using identity providers, secure token exchange, and iframe integration.',
      'Developed proof-of-concept code, automated infrastructure provisioning with IaC, and documented API contracts and architecture decisions.',
      'Supported delivery continuity through 3+ contract extensions.',
    ],
  },
  {
    title: 'Senior Software Developer, Cloud',
    organization: 'STERLING (NASDAQ: STER)',
    location: 'Remote',
    dates: 'Jun 2022 – Mar 2024',
    summary: 'Cloud modernization, cost optimization, and Zero Trust.',
    details: [
      'Mitigated an approximately $200K cloud migration blocker and cleaned up obsolete AWS resources across EC2 Image Builder, Lambda, S3, and EBS.',
      'Restored a legacy license server on EC2, avoiding downtime and repurchase costs.',
      'Achieved 100% SecOps audit compliance through patching, software updates, and OS hardening.',
      'Prototyped identity-based access to Azure VMs without exposing standard ports.',
    ],
  },
  {
    title: 'Technical Lead',
    organization: 'Bell Canada (Environics Analytics)',
    dates: 'Jul 2012 – Jun 2022',
    summary: 'DevOps foundations and cloud platform modernization.',
    details: [
      'Built DevOps and cloud platform practices from scratch by hiring, training, and leading senior DevOps and infrastructure engineers.',
      'Led cloud migrations and Kubernetes adoption. Compared cloud and on-premises costs, including networking and disaster recovery.',
      'Implemented hybrid SSO from on-premises Active Directory through Entra ID to AWS IAM.',
      'Automated CI/CD approvals and releases to meet uptime SLAs. Improved availability with backup and disaster recovery while reducing the data-centre footprint.',
    ],
  },
];

export const earlierRoles = [
  { title: 'Software Developer', organization: 'University of Toronto', location: 'Toronto', dates: 'Oct 2011 – Oct 2012', summary: 'Developed features for a media broadcasting application and maintained legacy software.' },
  { title: 'Development Lead', organization: 'Good Fellas', location: 'Seoul', dates: 'Mar 2009 – Jun 2010', summary: 'Led development of a native iOS game and set up and maintained its packet exchange server.' },
  { title: 'Founder', organization: 'DegreeCenter', location: 'Seoul', dates: 'Jun 2007 – Jun 2010', summary: 'Built an academic credential verification platform and sold the business to a competitor.' },
  { title: 'Software Testing Engineer', organization: 'Microsoft', location: 'Seoul', dates: 'Sep 2007 – Sep 2008', summary: 'Built Visual C++ test automation for Windows Live, spoke at the 2008 Singapore Summit, and trained new hires in Bangalore.' },
];
