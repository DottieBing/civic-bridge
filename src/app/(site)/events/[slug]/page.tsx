import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import RichText from "@/components/RichText";
import { getEvent, getEvents } from "@/lib/content";
import { eventParts, eventWhen, isUpcoming } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEvent(slug);
  if (!e) return { title: "Event not found | Civic Bridge Africa" };
  return {
    title: `${e.title} | Civic Bridge Africa`,
    description: e.summary ?? undefined,
    openGraph: {
      title: e.title,
      description: e.summary ?? undefined,
      images: e.cover_image ? [e.cover_image] : undefined,
    },
  };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const upcoming = isUpcoming(event);
  const p = eventParts(event.starts_at);
  const when = eventWhen(event.starts_at, event.ends_at);

  const more = (await getEvents())
    .filter((e) => e.slug !== slug && isUpcoming(e))
    .slice(0, 3);

  const facts = [
    { label: "Date", value: when.date },
    { label: "Time", value: when.time },
    { label: "Location", value: event.location },
    { label: "Format", value: event.formats.join(" + ") },
  ].filter((f) => f.value);

  return (
    <>
      <section
        className="border-b border-black/50 pb-14 pt-10 lg:pb-[80px] lg:pt-[56px]"
        style={{
          backgroundImage:
            "linear-gradient(-69.74deg, rgba(239,173,89,0.07) 7.08%, rgba(255,255,255,0.08) 47.71%, rgba(26,44,54,0.07) 100.49%)",
        }}
      >
        <Container>
          <Link href="/events" className="inline-flex items-center gap-2 text-[14px] text-navy transition hover:opacity-70">
            <ArrowLeft size={16} />
            All events
          </Link>
          {event.label && (
            <p className="mt-8 text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">
              {event.label}
            </p>
          )}
          <h1 className="mt-4 max-w-[900px] text-[40px] leading-[1.05] tracking-[-0.6px] text-navy md:text-[56px] lg:text-[64px]">
            {event.title}
          </h1>
          {event.summary && (
            <p className="mt-6 max-w-[760px] text-[18px] leading-[31px] tracking-[0.6px] text-black lg:text-[20px]">
              {event.summary}
            </p>
          )}
        </Container>
      </section>

      <section className="py-12 lg:py-[100px]">
        <Container className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-x-[70px]">
          <div className="min-w-0">
            {event.cover_image && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[40px] lg:rounded-[55px]">
                <Image src={event.cover_image} alt="" fill priority sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
              </div>
            )}

            {event.body ? (
              <RichText html={event.body} />
            ) : (
              <p className="text-[18px] text-black/60">
                More details about this event are coming soon.
              </p>
            )}

            {event.speakers.length > 0 && (
              <div className="mt-14">
                <h2 className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">
                  Speakers
                </h2>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                  {event.speakers.map((s, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="relative grid size-[72px] shrink-0 place-items-center overflow-hidden rounded-full bg-navy text-[20px] text-white">
                        {s.photo ? (
                          <Image src={s.photo} alt="" fill sizes="72px" className="object-cover" />
                        ) : (
                          initials(s.name)
                        )}
                      </span>
                      <div>
                        <p className="text-[18px] leading-[26px] text-black">{s.name}</p>
                        {s.role && <p className="text-[14px] leading-[22px] text-black/60">{s.role}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[36px] border border-black/20 bg-white p-8 lg:sticky lg:top-8">
            <div className="flex h-[110px] w-[160px] flex-col items-center justify-center rounded-[22px] bg-navy text-center">
              <span className="text-[15px] uppercase leading-[18px] tracking-[1.5px] text-amber">{p.month}</span>
              <span className="text-[34px] font-medium leading-[40px] text-white">{p.day}</span>
              <span className="text-[13px] leading-[16px] text-white">{p.year}</span>
            </div>

            <dl className="mt-8 space-y-5">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[12px] font-medium uppercase tracking-[1.68px] text-teal-label">{f.label}</dt>
                  <dd className="mt-1 text-[18px] leading-[28px] text-black">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-t border-black/10 pt-8">
              {!upcoming ? (
                <p className="text-[16px] text-black/60">This event has ended.</p>
              ) : event.registration_url ? (
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[54px] items-center gap-2 rounded-full bg-amber px-[32px] text-[16px] font-bold text-navy transition hover:brightness-95"
                >
                  Register for event
                  <ArrowRight size={16} strokeWidth={1.75} />
                </a>
              ) : (
                <p className="text-[16px] text-black/60">Registration opens soon.</p>
              )}
            </div>
          </aside>
        </Container>
      </section>

      {more.length > 0 && (
        <section className="bg-[#eef9f9] py-16 lg:py-[120px]">
          <Container>
            <p className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">Coming up</p>
            <h2 className="mt-[13px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
              More events.
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {more.map((e) => {
                const ep = eventParts(e.starts_at);
                return (
                  <li key={e.id}>
                    <Link href={`/events/${e.slug}`} className="block rounded-[28px] border border-black/20 bg-white p-6 transition hover:border-navy">
                      <p className="text-[12px] font-medium uppercase tracking-[1.5px] text-teal-label">
                        {ep.day} {ep.month} {ep.year}
                      </p>
                      <p className="mt-2 text-[20px] leading-[28px] text-black">{e.title}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}