# Ryan Lee · Portfolio

A Next.js portfolio with project case studies, a résumé, a GitHub activity panel, and an MDX engineering notebook.

See [DEPLOYMENT.md](DEPLOYMENT.md) for Cloudflare Pages setup and deployment.

## Run locally

Use Node.js 22 or newer (CI uses Node.js 24).

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. To check the production build:

```sh
npm run lint
npx tsc --noEmit
npm run build   # static export to out/
npm run start   # serves out/ with wrangler pages dev on :3000
```

In a second shell, install the browser with `npx playwright install chromium` and run `npm run test:smoke`. You can point tests at a different server via `BASE_URL`, use an installed Chromium via `CHROMIUM_PATH`, and capture screenshots with `CAPTURE_SCREENSHOTS=1`.

## Update content

- `data/resume.ts`: profile, links, metrics, tech stack, and experience.
- `data/projects.ts`: case studies, diagrams, and optional external project links. Add a unique slug and populate `links` with repository or demo URLs when available.
- `content/notes/*.mdx`: add a lower-case hyphenated filename and front matter with `title`, `description`, `date` (quoted YYYY-MM-DD), and `tag`. Only commit trusted MDX; it is compiled as code.
- `public/resume-ryan-lee.pdf`: regenerate the public résumé from `data/resume.ts` with `npm run resume:pdf` after installing Chromium as above.

The GitHub panel reads the public profile calendar and ranks languages by primary language among up to 100 recently updated public, non-fork repositories. The data is fetched at build time into `/api/github.json` (refreshed by the daily scheduled deploy). If GitHub rate-limits or is unreachable, the affected part falls back to a profile link and an unavailable message. An optional build-time `GITHUB_TOKEN` raises the REST limit (CI passes the workflow token); keep it out of source control.
