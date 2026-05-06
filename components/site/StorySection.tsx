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
    <div id="about">
      {stories.map((story, idx) => {
        const imgLeft = story.reverse;

        return (
          <div key={story.heading} style={{ background: BG[idx % BG.length] }}>
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-16 lg:py-20">

              <div className={[
                "flex flex-col gap-0 overflow-hidden rounded-sm shadow-sm lg:flex-row",
                imgLeft ? "lg:flex-row-reverse" : "",
              ].join(" ")}>

                {/* ── Slika ── */}
                <div className="relative min-h-[280px] w-full overflow-hidden lg:w-1/2 lg:min-h-[460px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.image}
                    alt={story.heading}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* narandžasta naglasna linija — uvijek na strani teksta */}
                  <div className={[
                    "absolute top-0 bottom-0 w-[3px] bg-[#f37021]/50",
                    imgLeft ? "left-0" : "right-0",
                  ].join(" ")} />
                </div>

                {/* ── Tekst ── */}
                <div
                  className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-14 lg:py-16"
                  style={{ background: BG[idx % BG.length] }}
                >
                  <FadeIn>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#f37021]">
                      {story.eyebrow}
                    </p>
                    <h2
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      className="text-[clamp(2rem,3.5vw,3.2rem)] font-normal leading-[1.1] tracking-tight text-zinc-950"
                    >
                      {story.heading}
                    </h2>
                    {/* dekorativna linija ispod naslova */}
                    <div className="my-5 flex items-center gap-3">
                      <span className="h-px w-10 bg-[#f37021]" />
                      <span className="h-px flex-1 bg-zinc-200" />
                    </div>
                    <p className="max-w-sm text-[15px] leading-[1.9] text-zinc-500">
                      {story.body}
                    </p>
                    <a
                      href={story.ctaHref}
                      className="mt-8 inline-flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-950 transition-colors hover:text-[#f37021]"
                    >
                      <span>{story.cta}</span>
                      <span className="h-px w-8 bg-current" />
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
