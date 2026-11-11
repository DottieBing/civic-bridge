alter table public.programs
  add column if not exists duration text,
  add column if not exists audience text,
  add column if not exists spotlight_headline text;