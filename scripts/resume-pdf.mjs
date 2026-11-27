import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { earlierRoles, experience, githubProfile, profile } from '../data/resume.ts';

function escape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function roleHeading({ title, organization, location, dates }) {
  return `<h3>${escape(title)} <span>· ${escape(organization)}${location ? ` · ${escape(location)}` : ''}</span></h3>
    <div class="dates">${escape(dates)}</div>`;
}

const links = [
  [profile.email, `mailto:${profile.email}`],
  ['LinkedIn', profile.linkedin],
  ['GitHub', githubProfile],
  ['ryanleetech.com', profile.website],
];

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escape(profile.name)} — Résumé</title>
  <style>
    @page { size: Letter; margin: 0.45in 0.65in; }
    body { color: #172420; font: 9.5pt/1.2 Arial, sans-serif; margin: 0; }
    h1 { font-size: 25pt; margin: 0 0 3pt; }
    h2 { color: #176047; border-bottom: 1px solid #c5d5cd; font-size: 11pt; margin: 9pt 0 4pt; }
    h3 { font-size: 10pt; margin: 0 0 1pt; }
    h3 span { font-weight: 400; }
    p { margin: 0; }
    section { break-inside: avoid; margin-bottom: 4pt; }
    .title { font-weight: bold; font-size: 13pt; }
    .contact, .dates { color: #435950; font-size: 9pt; }
    .contact { margin-top: 4pt; }
    .dates { margin-bottom: 2pt; }
    a { color: #176047; }
    ul { padding-left: 13pt; margin: 1pt 0 0; }
  </style>
</head>
<body>
  <h1>${escape(profile.name)}</h1>
  <p class="title">${escape(profile.title)}</p>
  <p class="contact">${escape(profile.location)} · ${links.map(([label, href]) => `<a href="${escape(href)}">${escape(label)}</a>`).join(' · ')}</p>
  <h2>Profile</h2>
  <p>${escape(profile.bio)}</p>
  <h2>Experience</h2>
  ${experience.map((role) => `<section>${roleHeading(role)}<ul>${role.details.map((detail) => `<li>${escape(detail)}</li>`).join('')}</ul></section>`).join('')}
  <h2>Earlier roles</h2>
  ${earlierRoles.map((role) => `<section>${roleHeading(role)}<p>${escape(role.summary)}</p></section>`).join('')}
  <h2>Education &amp; certifications</h2>
  <p>${escape(profile.education)}</p>
  <p>${escape(profile.certifications.join(' · '))}</p>
</body>
</html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
try {
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: fileURLToPath(new URL(`../public${profile.resume}`, import.meta.url)), preferCSSPageSize: true });
} finally {
  await browser.close();
}
