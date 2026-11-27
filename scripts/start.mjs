import { cpSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const standalone = new URL('.next/standalone/', root);
cpSync(new URL('.next/static/', root), new URL('.next/static/', standalone), { recursive: true });
cpSync(new URL('public/', root), new URL('public/', standalone), { recursive: true });
process.env.HOSTNAME = process.env.HOST || '127.0.0.1';
await import(new URL('server.js', standalone));
