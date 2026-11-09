import { cp, copyFile, mkdir, rm } from 'node:fs/promises';

await rm('site', { recursive: true, force: true });

await mkdir('site/src', { recursive: true });

await copyFile('index.html', 'site/index.html');
await copyFile('src/styles.css', 'site/src/styles.css');
await cp('dist', 'site/dist', { recursive: true });
