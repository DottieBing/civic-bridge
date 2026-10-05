import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { getTeam } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our team | Civic Bridge Africa",
  description:
    "Meet the researchers, educators, and civic organisers guiding our research, programmes, and partnerships.",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        label="Our team"
        title="The people behind the work."
        description="Meet the researchers, educators, and civic organisers guiding our research, programmes, and partnerships."
      />

      <section className="py-16 lg:py-[120px]">
        <Container>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[14px] text-navy transition hover:opacity-70"
          >
            <ArrowLeft size={16} />
            About us
          </Link>

          {team.length === 0 ? (
            <p className="mt-10 text-[18px] text-black">
              Our team will be introduced here soon.
            </p>
          ) : (
            <ul className="mt-10 grid gap-x-[39px] gap-y-14 sm:grid-cols-2 lg:mt-[60px] lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.id}>
                  <div className="relative grid aspect-square w-full max-w-[407px] place-items-center overflow-hidden rounded-[44px] bg-navy text-[48px] text-white">
                    {m.photo_url ? (
                      <Image
                        src={m.photo_url}
                        alt={m.name}
                        fill
                        sizes="(min-width: 1024px) 407px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      initials(m.name)
                    )}
                  </div>
                  <p className="mt-6 text-[24px] leading-[30px] text-black">
                    {m.name}
                  </p>
                  {m.role && (
                    <p className="mt-1 text-[12px] font-medium uppercase tracking-[1.5px] text-teal-label">
                      {m.role}
                    </p>
                  )}
                  {m.bio && (
                    <p className="mt-4 max-w-[407px] text-[16px] leading-[28px] text-black">
                      {m.bio}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}