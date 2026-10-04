import Image from "next/image";
import Container from "@/components/ui/Container";
import type { TeamMember } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Leadership({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;

  return (
    <section id="leadership" className="scroll-mt-8 py-16 lg:py-[140px]">
      <Container>
        <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
          Leadership
        </p>
        <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
          The people behind the work.
        </h2>

        <ul className="mt-10 grid gap-x-[39px] gap-y-12 md:grid-cols-2 lg:mt-[75px] lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.id}>
              <div className="relative grid aspect-square max-w-[407px] place-items-center overflow-hidden rounded-[44px] bg-navy text-[48px] text-white">
                {m.photo_url ? (
                  <Image src={m.photo_url} alt={m.name} fill sizes="(min-width: 1024px) 407px, 100vw" className="object-cover" />
                ) : (
                  initials(m.name)
                )}
              </div>
              <p className="mt-6 text-[24px] leading-[30px] text-black">{m.name}</p>
              {m.role && (
                <p className="mt-1 text-[12px] font-medium uppercase tracking-[1.5px] text-teal-label">{m.role}</p>
              )}
              {m.bio && (
                <p className="mt-4 max-w-[407px] text-[16px] leading-[28px] text-black">{m.bio}</p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}