import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { dotDate, formatDate } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function UpcomingEvent({ event }: { event: EventItem | null }) {
  if (!event) return null;

  const details = [
    { label: "Date", value: formatDate(event.starts_at) },
    { label: "Location", value: event.location },
    { label: "Format", value: event.formats.join(" + ") },
  ].filter((d) => d.value);
  const speakers = event.speakers.slice(0, 4);

  return (
    <section className="bg-teal-light/[0.12] py-16 xl:py-[168px]">
      <Container className="grid gap-12 xl:grid-cols-[1fr_1fr] xl:gap-x-10 2xl:grid-cols-[644px_657px] 2xl:gap-0">
        <div className="xl:pt-[147px]">
          <p className="pl-[5px] text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
            Upcoming event
          </p>
          <h2 className="mt-[15px] max-w-[479px] text-[32px] leading-[1.2] tracking-[-0.4px] text-navy md:text-[40px] md:leading-[48px]">
            {event.title}
          </h2>
          {event.summary && (
            <p className="mt-[34px] max-w-[591px] text-[16px] leading-[30px] tracking-[0.54px] text-black md:text-[18px] md:leading-[37px]">
              {event.summary}
            </p>
          )}

          <dl className="mt-10 flex flex-wrap gap-x-2 gap-y-4 xl:mt-[82px]">
            {details.map((d) => (
              <div key={d.label} className="w-[176px]">
                <dt className="text-[12px] font-medium uppercase leading-[29.8px] tracking-[1.68px] text-teal-label">
                  {d.label}
                </dt>
                <dd className="text-[18px] leading-[37px] tracking-[0.54px] text-black">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-[49px] gap-y-4 xl:mt-[74px]">
            <Link
              href={event.registration_url ? event.registration_url : `/events/${event.slug}`}
              {...(event.registration_url
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-[7px] rounded-pill bg-amber px-[37px] py-[16px] text-[20px] font-bold leading-[30px] text-navy transition hover:brightness-95"
            >
              {event.registration_url ? "Register for event" : "View event"}
              <ArrowRight size={19} strokeWidth={1.75} />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center rounded-pill border border-navy px-[37px] py-[16px] text-[20px] font-bold leading-[30px] text-navy transition hover:bg-navy hover:text-white"
            >
              View all events
            </Link>
          </div>
        </div>

        <div className="relative h-[620px] w-full max-w-[657px] overflow-hidden rounded-[56px] bg-navy sm:h-[897px] sm:rounded-[84px]">
          {event.cover_image && (
            <Image
              src={event.cover_image}
              alt=""
              fill
              sizes="(min-width: 1280px) 657px, 100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-x-0 top-0 h-[276px] bg-gradient-to-b from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[276px] bg-gradient-to-t from-black to-transparent" />

          <div className="absolute inset-x-8 top-10 flex justify-between text-[12px] font-medium uppercase leading-[22px] tracking-[1.8px] text-white sm:inset-x-[72px] sm:top-[77px]">
            <span>{dotDate(event.starts_at)}</span>
            <span>{event.label}</span>
          </div>

          {speakers.length > 0 && (
            <>
              <p className="absolute bottom-[130px] left-8 text-[14px] font-medium uppercase leading-[22px] tracking-[2.8px] text-white sm:bottom-[174px] sm:left-[58px]">
                Speakers
              </p>
              <div
                className="absolute bottom-10 left-8 h-[59.4px] sm:bottom-[88px] sm:left-[58px]"
                style={{ width: 59.4 + (speakers.length - 1) * 47.2 }}
              >
                {speakers.map((s, i) => (
                  <span
                    key={i}
                    title={s.name}
                    className="absolute top-0 grid size-[59.4px] place-items-center overflow-hidden rounded-full border-2 border-navy bg-[#31414a] text-[16px] text-white"
                    style={{ left: i * 47.2 }}
                  >
                    {s.photo ? (
                      <Image src={s.photo} alt={s.name} fill sizes="60px" className="object-cover" />
                    ) : (
                      initials(s.name)
                    )}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}