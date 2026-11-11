create extension if not exists pgcrypto;

-- Who may edit content ---------------------------------------------------
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

-- Content tables ---------------------------------------------------------
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  body text,
  category text not null default 'Youth',
  status text not null default 'Active',
  location text,
  reach text,
  cover_image text,
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.research (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  type text not null default 'Policy Brief',
  category text,
  summary text,
  body text,
  cover_image text,
  file_url text,
  file_name text,
  pages int,
  author text,
  published_on date default current_date,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.insights (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null default 'Analysis',
  excerpt text,
  body text,
  cover_image text,
  author text,
  source_label text default 'Editorial',
  read_minutes int,
  published_on date default current_date,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  label text default 'Public forum',
  summary text,
  body text,
  cover_image text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  formats text[] not null default '{"In person"}',
  registration_url text,
  speakers jsonb not null default '[]',
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  cover_image text,
  location text,
  published_on date default current_date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kind text not null default 'public' check (kind in ('public','annual')),
  file_url text not null,
  file_name text,
  file_size_bytes bigint,
  year int,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  bio text,
  photo_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text,
  photo_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.impact_areas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- Inbox (written by server routes only) ------------------------------------
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interest text,
  message text not null,
  status text not null default 'new' check (status in ('new','read','archived')),
  created_at timestamptz not null default now()
);

create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'website',
  created_at timestamptz not null default now()
);

-- Security rules ---------------------------------------------------------
alter table public.admin_users enable row level security;
create policy "read own or as admin" on public.admin_users
  for select using (user_id = auth.uid() or public.is_admin());

do $$
declare t text;
begin
  -- Public can read only published rows; admins can do everything
  foreach t in array array['programs','research','insights','events','case_studies','documents','team_members','testimonials'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public read published" on public.%I for select using (published = true)', t);
    execute format('create policy "admin all" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create trigger touch before update on public.%I for each row execute function public.touch_updated_at()', t);
  end loop;

  -- Public can read these; admins can edit
  foreach t in array array['stats','impact_areas','site_settings'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('create policy "admin all" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;

  -- Admin only
  foreach t in array array['messages','subscribers'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "admin all" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- File storage -----------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
 ('images','images', true, 5242880,
   array['image/jpeg','image/png','image/webp','image/avif']),
 ('files','files', true, 26214400,
   array['application/pdf','application/msword',
         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
         'application/vnd.ms-excel',
         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
on conflict (id) do nothing;

create policy "admin read media" on storage.objects for select
  using (bucket_id in ('images','files') and public.is_admin());
create policy "admin upload media" on storage.objects for insert
  with check (bucket_id in ('images','files') and public.is_admin());
create policy "admin update media" on storage.objects for update
  using (bucket_id in ('images','files') and public.is_admin());
create policy "admin delete media" on storage.objects for delete
  using (bucket_id in ('images','files') and public.is_admin());

-- Starter content (what is hard-coded on the site today) ---------------------
insert into public.stats (label, value, sort_order) values
 ('Citizens reached','5,000+',1), ('Communities engaged','18',2), ('Volunteers mobilised','1,200',3),
 ('Reports published','12',4), ('Policy engagements','45',5), ('Programmes delivered','24',6);

insert into public.impact_areas (title, description, sort_order) values
 ('Knowledge','A short description of how this area is measured and reported across our programmes.',1),
 ('Participation','A short description of how this area is measured and reported across our programmes.',2),
 ('Accountability','A short description of how this area is measured and reported across our programmes.',3),
 ('Policy influence','A short description of how this area is measured and reported across our programmes.',4),
 ('Youth leadership','A short description of how this area is measured and reported across our programmes.',5),
 ('Digital access','A short description of how this area is measured and reported across our programmes.',6);

 insert into public.admin_users (user_id, email, role)
select id, email, 'admin' from auth.users where email = 'civicbridgeafrica@gmail.com';

alter table public.programs
  add column if not exists duration text,
  add column if not exists audience text,
  add column if not exists spotlight_headline text;