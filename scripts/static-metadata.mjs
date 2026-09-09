import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

// Keep project metadata sourced from the same content as the rendered pages.
const source = await readFile(new URL('../src/content/portfolio.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { projects } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
const base = 'https://databassey.com.ng';
const routes = [
  ['/', 'Senior Software Engineer', 'Data Bassey builds fintech and enterprise applications with React, TypeScript, Django, and NestJS. Explore frontend architecture, full-stack delivery, and technical leadership.'],
  ['/work', 'Selected work', 'Explore Data Bassey’s fintech engineering work: KYC, wallet and card interfaces, merchant dashboards, transaction operations, and conversational banking.'],
  ['/about', 'About & experience', 'Meet Data Bassey, a Lagos-based senior software engineer with experience across fintech, banking, insurance, enterprise applications, and engineering leadership.'],
  ['/resume', 'Download resume', 'Download Data Bassey’s frontend or full-stack engineering resume, with professional experience, selected projects, skills, and education.'],
  ['/contact', 'Contact', 'Contact Data Bassey for engineering opportunities and project enquiries. Based in Lagos, Nigeria.'],
  ['/blog', 'Blog', 'Writing by Data Bassey on frontend engineering, fintech, and building software. Articles from this portfolio, Medium, and LinkedIn.'],
  ['/studio', 'Blog editor', 'Private writing workspace for Data Bassey.'],
  ...projects.map(project => ['/work/' + project.slug, project.name, project.summary]),
];
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const escape = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
for (const [route, title, description] of routes) {
  const fullTitle = escape(title + ' | Data Bassey');
  const desc = escape(description);
  const url = base + route;
  const metadata = [
    '<title>' + fullTitle + '</title>',
    '<meta name="description" content="' + desc + '" />',
    '<meta property="og:title" content="' + fullTitle + '" />',
    '<meta property="og:description" content="' + desc + '" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:url" content="' + url + '" />',
    '<meta name="twitter:card" content="summary" />',
    '<meta name="twitter:title" content="' + fullTitle + '" />',
    '<meta name="twitter:description" content="' + desc + '" />',
    '<meta name="robots" content="' + (route === '/studio' ? 'noindex' : 'index, follow') + '" />',
    '<link rel="canonical" href="' + url + '" />',
  ].join('\n    ');
  const directory = resolve('dist', '.' + route);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), template.replace('</head>', metadata + '\n  </head>'));
}
await writeFile(resolve('dist/404.html'), template.replace('</head>', '<title>Page not found | Data Bassey</title><meta name="robots" content="noindex" /></head>'));
console.log('Generated static metadata for ' + routes.length + ' routes.');
