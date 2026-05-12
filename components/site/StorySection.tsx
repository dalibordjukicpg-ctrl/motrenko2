import { FadeIn } from "@/components/site/FadeIn";

export type StoryItem = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  ctaHref: string;
  image: string;
  reverse: boolean;
};

type Props = { stories: StoryItem[] };

const BG = [
  "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)",
  "linear-gradient(160deg,#fdf6f0 0%,#f9efe6 100%)",
  "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)",
  "linear-gradient(160deg,#fdf6f0 0%,#f9efe6 100%)",
];

export function StorySection({ stories }: Props) {
  return (
    <div id="about" className="border-t border-zinc-900/[0.04]">
      {stories.map((story, idx) => {
        const imgLeft = story.reverse;

        return (
          <div
            key={story.heading}
            className={idx > 0 ? "border-t border-zinc-900/[0.05]" : ""}
            style={{ background: BG[idx % BG.length] }}
          >
            <div className="mx-auto max-w-7xl px-6 py-10 md:py-14 lg:px-16 lg:py-[4.25rem]">

              <div
                className={[
                  "group/card flex flex-col gap-0 overflow-hidden rounded-2xl ring-1 ring-zinc-900/[0.06] shadow-[0_22px_50px_-18px_rgba(24,24,27,0.12)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-20px_rgba(24,24,27,0.16)] lg:flex-row lg:rounded-[1.75rem]",
                  imgLeft ? "lg:flex-row-reverse" : "",
                ].join(" ")}
              >

                {/* ── Slika — puni okvir (object-cover), blago pomaknut fokus da manje iječe portrete ── */}
                <div className="relative min-h-[280px] w-full overflow-hidden lg:w-1/2 lg:min-h-[460px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.image}
                    alt={story.heading}
                    className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/[0.12] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-zinc-950/[0.06]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]"
                    aria-hidden
                  />
                  {/* narandžasta naglasna linija — uvijek na strani teksta */}
                  <div
                    className={[
                      "absolute top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-[#f37021]/65 to-transparent",
                      imgLeft ? "left-0" : "right-0",
                    ].join(" ")}
                  />
                </div>

                {/* ── Tekst ── */}
                <div
                  className="relative flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-14 lg:py-16"
                  style={{ background: BG[idx % BG.length] }}
                >
                  <FadeIn>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f37021]">
                      {story.eyebrow}
                    </p>
                    <h2
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      className="text-[clamp(2rem,3.5vw,3.2rem)] font-normal leading-[1.1] tracking-tight text-zinc-950"
                    >
                      {story.heading}
                    </h2>
                    <div className="my-5 flex items-center gap-3">
                      <span className="h-px w-12 bg-[#f37021]" />
                      <span className="h-px flex-1 bg-zinc-300/80" />
                    </div>
                    <p className="max-w-md text-[15px] leading-[1.9] text-zinc-600">
                      {story.body}
                    </p>
                    <a
                      href={story.ctaHref}
                      className="mt-9 inline-flex w-fit items-center gap-2 border-b-2 border-[#f37021]/35 pb-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-950 transition-colors hover:border-[#f37021] hover:text-[#f37021]"
                    >
                      <span>{story.cta}</span>
                      <span
                        aria-hidden
                        className="text-[#f37021] transition-transform group-hover/card:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  </FadeIn>
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
