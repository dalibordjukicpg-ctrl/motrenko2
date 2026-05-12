import { FadeIn } from "@/components/site/FadeIn";
import { decodeTitle, rewriteImgUrl, type WPPost } from "@/lib/wordpress";
import Link from "next/link";

type StaffPost = WPPost & {
  content: { rendered: string };
  _embedded?: { "wp:featuredmedia"?: { source_url: string }[] };
};

type Props = { staff: StaffPost[] };

function getImage(s: StaffPost): string | null {
  const raw = s._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return raw ? rewriteImgUrl(raw) : null;
}

export function TeamSection({ staff }: Props) {
  if (!staff.length) return null;

  return (
    <section
      id="team"
      className="py-16 lg:py-24"
      style={{ background: "linear-gradient(160deg,#fdf6f0 0%,#f9efe6 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <FadeIn className="mb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#f37021]">
                Naš tim
              </p>
              <h2
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                className="text-[clamp(2.2rem,4vw,4rem)] font-normal leading-[1.12] tracking-tight text-zinc-950"
              >
                Stručnjaci i osoblje
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-600 sm:text-right">
              Tim posvećenih ljekara i medicinskog osoblja koji vodi vaš put ka
              roditeljstvu.
            </p>
          </div>
          <div className="mt-6 h-px bg-zinc-200" />
        </FadeIn>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {staff.map((member, i) => {
            const img = getImage(member);
            const name = decodeTitle(member.title.rendered);
            return (
              <FadeIn
                key={member.id}
                delay={((i % 4) * 100) as 0 | 100 | 200 | 300 | 400 | 500}
              >
                <Link
                  href={`/tim/${member.slug}`}
                  className="group block"
                >
                  <div
                    className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200/80 shadow-[0_14px_40px_-16px_rgba(24,24,27,0.16)] transition-shadow duration-300 group-hover:shadow-[0_20px_48px_-18px_rgba(24,24,27,0.2)] sm:rounded-3xl"
                    style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf2e9 100%)" }}
                  >
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={name}
                        className="absolute inset-0 h-full w-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300">
                        Bez slike
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <p
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    className="mt-4 text-[1.05rem] font-normal leading-tight tracking-tight text-zinc-950 transition-colors group-hover:text-[#f37021]"
                  >
                    {name}
                  </p>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
