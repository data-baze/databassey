# Data Bassey — Portfolio

React 19, TypeScript, Vite, and React Router. The portfolio covers frontend architecture, full-stack delivery, and technical leadership.

## Development

Use Node.js 22 or newer and npm.

- `npm install` installs the declared dependencies.
- `npm run dev` starts the local preview.
- `npm run build` type-checks, builds, and generates per-route HTML metadata.
- `npm run preview` serves the production build.
- `npm test` runs isolated contact-service tests without sending a message.
- `npm run lint` runs the existing ESLint checks.

## Content

`src/content/portfolio.ts` owns case studies, capabilities, career history, and contact links. Information is based on the supplied CVs, prioritized over the previous website.

- The full-stack CV supplies the general engineering profile and MSORG role.
- The frontend CV also supplies Trade Intelligence Portal and Dancity project summaries.
- Education uses the CV dates: BSc 2022; OND 2019.
- Concurrent MSORG and Payvessel roles are explicitly explained.
- Supplied PDF files are copied unchanged into `public/cv/`.
- Project diagrams summarize CV-described workflows. They are not product screenshots.
- No unsupported portfolio-only impact percentages, invented delivery dates, client endorsements, or demo links are published.

Routes: `/`, `/work`, `/work/:slug`, `/about`, `/resume`, `/contact`. The former `/services` route redirects to Contact; `/cv` redirects to `/resume`. Existing PDF asset paths remain compatible. Unknown routes show a useful 404 screen.

Payvessel and Dancity lead the selected-work cards, with CV-backed KYC, transfer, wallet, card-management, and merchant-operations features. The enterprise innovation, conversational banking, and trade intelligence project names are anonymized in the website, URLs, and metadata. Downloadable resumes remain the supplied, unedited PDFs.

## Contact delivery

Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY`. Vite embeds this public form access key into the client build; never put a private server credential in a VITE variable. The existing key is preserved locally.

If no key is configured, Contact offers direct email instead of an unusable form. The form uses a 15-second timeout, a honeypot, field allowlisting, explicit HTTP and service success checks, and an in-flight guard. Failed submissions preserve the visitor’s message. An accessible status area announces the result.

Automated tests mock the service. Real inbox delivery still needs a controlled submission with the configured account; automated checks do not send mail.

## Deployment

Deploy this repository to Vercel. `vercel.json` sets the build/output directory and serves files and API functions before the SPA fallback. `api/medium.js` requires Vercel's Node runtime. `public/_redirects` is retained for older static hosting setups; those hosts need an equivalent Medium backend.

The blog is at `/blog`, original articles at `/blog/:slug`, and the private writing editor at `/studio`. See [the blog setup guide](docs/blog-setup.md) for the one-time Supabase connection, Vercel variables, editor account, and publishing workflow. Medium uses automatic RSS; LinkedIn posts are curated through the editor. No Supabase credentials are committed or preconfigured.

The build creates HTML metadata for each route so link previews do not rely on JavaScript execution. Page bodies remain a client-rendered SPA. The canonical domain is `https://databassey.com.ng`; update `src/components/Seo.tsx`, `scripts/static-metadata.mjs`, `public/robots.txt`, and `public/sitemap.xml` together if the domain changes.

## Adding project evidence

Add permitted product screenshots when available, with descriptive alt text, reserved dimensions, and captions identifying the workflow and personal contribution. Replace or supplement the existing workflow diagrams. Do not present reconstructed interfaces as actual project screenshots.
