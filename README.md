# Ryan Lee · Portfolio

A Next.js portfolio with project case studies, a résumé, a GitHub activity panel, and an MDX engineering notebook.

## Run locally

Use Node.js 22 or newer (the container uses Node.js 24).

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. To check the production build:

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

In a second shell, install the browser with `npx playwright install chromium` and run `npm run test:smoke`. You can point tests at a different server via `BASE_URL`, use an installed Chromium via `CHROMIUM_PATH`, and capture screenshots with `CAPTURE_SCREENSHOTS=1`.

## Update content

- `data/resume.ts`: profile, links, metrics, tech stack, and experience.
- `data/projects.ts`: case studies, diagrams, and optional external project links. Add a unique slug and populate `links` with repository or demo URLs when available.
- `content/notes/*.mdx`: add a lower-case hyphenated filename and front matter with `title`, `description`, `date` (quoted YYYY-MM-DD), and `tag`. Only commit trusted MDX; it is compiled as code.
- `public/resume-ryan-lee.pdf`: regenerate the public résumé from `data/resume.ts` with `npm run resume:pdf` after installing Chromium as above.

The GitHub panel reads the public profile calendar and ranks languages by primary language among up to 100 recently updated public, non-fork repositories. If GitHub rate-limits or is unreachable, the affected part falls back to a profile link and an unavailable message. An optional server-side `GITHUB_TOKEN` raises the REST limit; keep it out of source control.

## Deploy on Hetzner with Coolify and Cloudflare

1. When ready, push the repository to GitHub and connect it to Coolify on the Hetzner VPS. Choose **Dockerfile**, use the repository root as the build context, and set the application port to **3000**.
2. Create a DNS-only Cloudflare A record for the portfolio hostname pointing to the VPS (or use an existing wildcard record). Set the same HTTPS hostname as the Coolify application domain. Coolify provisions TLS; the app container itself serves HTTP on its private port.
3. Set `SITE_URL` (for example, `https://portfolio.example.com`) as a **build-time** variable for absolute social-preview URLs. Set `GITHUB_TOKEN` only as an optional **runtime** variable. The portfolio needs neither a database nor R2.
4. Deploy and check the home page, a case study, a note, the résumé download, and a missing URL. Build one service at a time on a shared 4 GB VPS.

To rehearse the same image locally:

```sh
docker build --build-arg SITE_URL=http://localhost:3000 -t ryan-lee-portfolio .
docker run --rm -p 127.0.0.1:3000:3000 ryan-lee-portfolio
```
