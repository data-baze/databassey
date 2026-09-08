import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { createServer } from 'vite';

test('every portfolio page renders and its internal links and assets resolve', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
  try {
    const pages = [
      ['/', '/src/screens/home/Home.tsx', 'Frontend architecture.'],
      ['/work', '/src/screens/work/Work.tsx', 'Selected projects'],
      ['/about', '/src/screens/about/About.tsx', 'University of Abuja'],
      ['/resume', '/src/screens/cv/Cv.tsx', 'Download frontend resume'],
      ['/contact', '/src/screens/contact/Contact.tsx', 'basseydata@gmail.com'],
      ['/work/payvessel', '/src/screens/work/Project.tsx', 'Payvessel'],
      ['/work/dancity', '/src/screens/work/Project.tsx', 'Dancity v2'],
      ['/work/enterprise-innovation', '/src/screens/work/Project.tsx', 'Enterprise Innovation Platform'],
      ['/work/intrust', '/src/screens/work/Project.tsx', 'InTrust'],
      ['/work/marketplace-backend', '/src/screens/work/Project.tsx', 'Marketplace backend'],
      ['/work/conversational-banking', '/src/screens/work/Project.tsx', 'Conversational Banking Platform'],
    ];
    const routes = new Set(pages.map(([path]) => path));
    const { default: Header } = await server.ssrLoadModule('/src/components/layouts/Header.tsx');
    const { default: Footer } = await server.ssrLoadModule('/src/components/layouts/Footer.tsx');
    for (const [path, modulePath, expected] of pages) {
      const { default: Page } = await server.ssrLoadModule(modulePath);
      const html = renderToString(React.createElement(MemoryRouter, { initialEntries: [path] },
        React.createElement(Header),
        React.createElement(Routes, null, React.createElement(Route, {
          path: path.startsWith('/work/') ? '/work/:slug' : path,
          element: React.createElement(Page),
        })),
        React.createElement(Footer)));
      assert.ok(html.replace(/<!--.*?-->/g, "").includes(expected), path + ' content is missing');
      assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path + ' must have one primary heading');
      assert.ok(!html.includes('href="#"'), path + ' has a placeholder link');
      for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
        if (!href.startsWith('/')) continue;
        assert.ok(routes.has(href) || existsSync(resolve('public', '.' + href)), path + ' links to missing ' + href);
      }
      for (const [, src] of html.matchAll(/src="([^"]+)"/g)) {
        if (src.startsWith('/')) assert.ok(existsSync(resolve('public', '.' + src)), 'Missing asset: ' + src);
      }
      if (path === '/about') {
        assert.ok(html.includes('2022') && html.includes('Criset') && html.includes('Concurrent with'));
      }
      if (path === '/contact' && html.includes('<form')) {
        for (const id of ['contact-name', 'contact-email', 'contact-type', 'contact-message']) {
          assert.ok(html.includes('for="' + id + '"') && html.includes('id="' + id + '"'), 'Unlabelled field ' + id);
        }
      }
    }
    const { default: Project } = await server.ssrLoadModule('/src/screens/work/Project.tsx');
    const missing = renderToString(React.createElement(MemoryRouter, { initialEntries: ['/work/unknown'] },
      React.createElement(Routes, null, React.createElement(Route, { path: '/work/:slug', element: React.createElement(Project) }))));
    assert.ok(missing.includes('Page not found'));
  } finally {
    await server.close();
  }
});
