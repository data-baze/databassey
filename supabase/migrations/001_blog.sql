-- Run once in the SQL editor of your Supabase project.
create table public.blog_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.blog_admins enable row level security;
revoke all on public.blog_admins from anon, authenticated;
grant select on public.blog_admins to authenticated;
create policy "Editors can check their own membership" on public.blog_admins
  for select to authenticated using (user_id = (select auth.uid()));

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 120),
  title text not null check (length(trim(title)) between 1 and 180),
  excerpt text not null default '' check (length(excerpt) <= 360),
  content text not null default '' check (length(content) <= 100000),
  source text not null default 'portfolio' check (source in ('portfolio', 'medium', 'linkedin')),
  external_url text not null default '',
  thumbnail_url text not null default '' check (thumbnail_url = '' or thumbnail_url ~ '^https://'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (source = 'portfolio' and external_url = '') or
    (source = 'medium' and external_url ~ '^https://([a-zA-Z0-9-]+\.)*medium\.com/') or
    (source = 'linkedin' and external_url ~ '^https://(www\.)?linkedin\.com/(posts/|feed/update/|pulse/)')
  ),
  check (status <> 'published' or (length(trim(excerpt)) > 0 and (source <> 'portfolio' or length(trim(content)) > 0)))
);
create index blog_posts_published_date on public.blog_posts (published_at desc) where status = 'published';
alter table public.blog_posts enable row level security;
revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon, authenticated;
grant insert, update on public.blog_posts to authenticated;

create policy "Visitors read published posts" on public.blog_posts
  for select to anon, authenticated using (status = 'published' and published_at <= now());
create policy "Editors read all posts" on public.blog_posts
  for select to authenticated using (exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "Editors create posts" on public.blog_posts
  for insert to authenticated with check (exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "Editors update posts" on public.blog_posts
  for update to authenticated using (exists (select 1 from public.blog_admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.blog_admins where user_id = (select auth.uid())));

create function public.set_blog_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger blog_posts_updated before update on public.blog_posts for each row execute function public.set_blog_updated_at();

-- Thumbnails are public assets; draft article text remains protected by RLS.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-thumbnails', 'blog-thumbnails', true, 5242880, array['image/jpeg','image/png','image/webp']);
create policy "Editors upload blog thumbnails" on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-thumbnails' and exists (select 1 from public.blog_admins where user_id = (select auth.uid())));
create policy "Editors read thumbnail metadata" on storage.objects for select to authenticated
  using (bucket_id = 'blog-thumbnails' and exists (select 1 from public.blog_admins where user_id = (select auth.uid())));

-- After creating your own account in Authentication > Users, run separately:
-- insert into public.blog_admins (user_id) values ('YOUR_AUTH_USER_UUID');
-- No user can grant themselves editor membership from the browser.
