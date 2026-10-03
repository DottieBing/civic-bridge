export type Program = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  body: string | null;
  category: string;
  status: string;
  location: string | null;
  reach: string | null;
  cover_image: string | null;
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Research = {
  id: string;
  slug: string;
  title: string;
  type: string;
  category: string | null;
  summary: string | null;
  body: string | null;
  cover_image: string | null;
  file_url: string | null;
  file_name: string | null;
  pages: number | null;
  author: string | null;
  published_on: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  author: string | null;
  source_label: string | null;
  read_minutes: number | null;
  published_on: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Speaker = { name: string; role: string; photo: string };

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  label: string | null;
  summary: string | null;
  body: string | null;
  cover_image: string | null;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  formats: string[];
  registration_url: string | null;
  speakers: Speaker[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  location: string | null;
  published_on: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};