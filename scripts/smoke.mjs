import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const screenshots = process.env.CAPTURE_SCREENSHOTS === '1';
const output = 'screenshots-local';
const routes = [
  ['home', '/', 'Ryan Lee'],
  ['project', '/projects/event-driven-ai-rag', 'Event-Driven AI & RAG Automation Pipeline'],
  ['note', '/notes/zero-trust-cross-domain-sso', 'Designing Zero-Trust Cross-Domain SSO for Public Sector Platforms'],
];
if (screenshots) await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox'] });
try {
  for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ baseURL, viewport: { width, height }, isMobile: device === 'mobile', hasTouch: device === 'mobile' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    for (const [name, path, heading] of routes) {
      const response = await page.goto(path);
      assert.equal(response.status(), 200, path);
      await page.getByRole('heading', { level: 1, name: heading, exact: true }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      if (name === 'home') {
        await page.locator('.pulse-content').getByText('Loading contributions…').waitFor({ state: 'hidden' });
        assert.equal(await page.getByRole('link', { name: 'Resume PDF' }).getAttribute('download'), '');
        await page.getByText('Solution Architect | Cloud, Identity & Platform Engineering', { exact: true }).waitFor();
        await page.getByRole('heading', { name: 'Speaking & Mentoring', exact: true }).waitFor();
        assert.equal(await page.getByRole('link', { name: 'Email Ryan' }).getAttribute('href'), 'mailto:ryan_lee@live.com');
        assert.match(await page.getByRole('link', { name: 'Ryan Lee Space (Notion)' }).getAttribute('href'), /^https:\/\/[^/]+\.notion\.site\//);
      } else if (name === 'project') {
        await page.getByRole('img', { name: 'System architecture flow' }).waitFor();
      } else {
        await page.getByRole('heading', { name: 'Write the identity contract first' }).waitFor();
      }
      const dimensions = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
      assert.equal(dimensions.viewport, width, `${device} ${path} viewport width`);
      assert.ok(dimensions.content <= dimensions.viewport, `${device} ${path} overflows horizontally`);
      assert.deepEqual(errors, [], `${device} ${path} browser errors`);
      if (screenshots) await page.screenshot({ path: `${output}/${name}-${device}.png`, fullPage: true });
      if (name === 'home') {
        await page.getByText('Lead System Integrator', { exact: true }).click();
        await page.getByText(/Shaped a multi-year GIS modernization roadmap/).waitFor();
        await page.getByText('Lead System Integrator', { exact: true }).click();
        await page.getByText(/Shaped a multi-year GIS modernization roadmap/).waitFor({ state: 'hidden' });
        await page.getByText('Earlier roles', { exact: true }).click();
        await page.getByText('Jun 2007 – Jun 2010', { exact: false }).waitFor();
      }
      console.log(`PASS ${device} ${path}: 200, content visible, no overflow or console errors`);
    }
    await page.close();
  }

  const page = await browser.newPage({ baseURL });
  await page.route('**/api/github.json', (route) => route.fulfill({ status: 503 }));
  await page.goto('/');
  await page.getByText('Contribution calendar unavailable. View activity on GitHub.').waitFor();
  await page.getByText('Language breakdown unavailable.').waitFor();
  assert.match(await page.getByRole('link', { name: /^@/ }).getAttribute('href'), /^https:\/\/github\.com\//);
  console.log('PASS GitHub unavailable: both fallbacks and profile link visible');
  await page.unroute('**/api/github.json');
  await page.route('**/api/github.json', (route) => route.fulfill({ json: { days: [{ date: '2026-10-15', level: 2 }], languages: [{ name: 'TypeScript', repos: 2 }] } }));
  await page.reload();
  await page.getByRole('img', { name: /1 active days/ }).waitFor();
  await page.getByText('TypeScript', { exact: true }).waitFor();
  console.log('PASS GitHub available: calendar and language badge render');
  await page.close();
} finally {
  await browser.close();
}
