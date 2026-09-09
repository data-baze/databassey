# Blog setup on Vercel

The code includes `/blog`, original articles at `/blog/:slug`, and a private editor at `/studio`. The home page shows the latest two posts (one on mobile). Medium updates come through a Vercel function; original articles and manually added external posts persist in Supabase. No example articles are published.

## Connect the private editor once

1. Create or select your Supabase project. In its SQL editor, run `supabase/migrations/001_blog.sql` once. This creates the post tables, access policies, and image bucket.
2. In Authentication → Users, create your editor user with your email and password and confirm that user. Copy the user's UUID. This is an account ID, not an API key.
3. Run this separate statement in the SQL editor, replacing the placeholder:

   ```sql
   insert into public.blog_admins (user_id) values ('YOUR_AUTH_USER_UUID');
   ```

4. Disable public sign-ups in your Supabase Auth settings. There is no sign-up page on this site. An authenticated account still cannot edit anything unless it is explicitly in `blog_admins`.
5. From Supabase's Connect dialog, copy your project URL and **publishable** key. Add these in your Vercel project's environment variables:

   ```dotenv
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
   MEDIUM_USERNAME=_databaze
   ```

   Keep your existing `VITE_WEB3FORMS_KEY` too. Never use a Supabase secret or service-role key in a `VITE_` variable. This implementation needs neither.

6. Deploy the repository to Vercel using the Vite preset, `npm run build`, and output directory `dist`. The included `vercel.json` serves existing files/functions first and preserves SPA deep links. Redeploy after changing any `VITE_` variable because Vite embeds those values during the build.
7. Open `/studio` on your site and sign in. Create a draft, preview it, then publish when ready. A refresh or another device loads your saved posts from Supabase.

For local development, merge the variables above into your existing `.env` without replacing other values, then restart `npm run dev`. `npm run preview` also serves the local Medium endpoint.

## Publishing flow

- **Original article:** select “On this portfolio,” add a title, short excerpt, cover, and Markdown article. Preview, save a draft, or publish. Your article gets a `/blog/your-slug` URL. Keep the slug stable after sharing it; changing it does not create a redirect.
- **LinkedIn:** choose LinkedIn and paste the full post/article URL, title, excerpt, and optional cover. Readers open the original post. LinkedIn profiles and shortened links are not post URLs.
- **Medium:** posts appear from the RSS feed without saving them in the editor. You can also add a Medium URL manually to curate its title, excerpt, or cover; a matching URL takes precedence over the RSS card.
- **Images:** upload JPG, PNG, or WebP up to 5 MB, or use a direct HTTPS image URL. Missing or broken images get a designed fallback. Uploaded thumbnails are public assets, including thumbnails uploaded for drafts; unpublished article text remains private.
- **Drafts and scheduling:** drafts are visible only to approved editors. Future-dated published posts appear from midnight UTC on that date. Unpublish returns a saved post to draft. Unsaved edits prompt before leaving. Deleting posts and image cleanup are managed in the Supabase dashboard.

## How the automatic feed works

`api/medium.js` fetches `https://medium.com/feed/@_databaze` on the server, extracts up to 20 recent RSS items and their first image, and caches successful responses on Vercel for 30 minutes. The number and history of posts depend on Medium's feed. Refreshes are request-driven, and stale results may be served while revalidating or during a feed outage. Change `MEDIUM_USERNAME` to select a different profile; the profile link in `src/lib/blog.ts` should match.

There is no automatic LinkedIn scraping or API social feed. LinkedIn's Community Management API restrictions prohibit displaying a website social feed. Use the editor's link cards for LinkedIn posts.

The feed fails gracefully if Medium is unavailable. Supabase articles remain visible when the Medium request fails, and the blog always links to the original profiles.

## Verify after connection

The repository's automated checks cover RSS parsing, safe links/Markdown, validation, deduplication, and page rendering. They do not connect to your Supabase project or prove a deployed Vercel setup.

After the one-time setup, verify: sign in as the approved editor; save and reload a draft; upload a cover; preview and publish; open the article in an incognito window; unpublish and confirm the same incognito URL no longer shows the article. Also confirm a non-editor account cannot read drafts or save posts through the Supabase API. Check `/api/medium` on Vercel returns JSON and `/blog` and `/studio` survive a direct refresh.

The database policies enforce access even when someone calls the API outside this UI. `/studio` is marked `noindex`; that is search metadata, not its access control. Original article pages currently load their content and metadata in the browser; social crawlers that do not execute JavaScript will see the generic site preview for newly published article URLs.

References: [Medium RSS](https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-publications-and-topics), [LinkedIn restrictions](https://learn.microsoft.com/en-us/linkedin/marketing/restricted-use-cases), [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).
