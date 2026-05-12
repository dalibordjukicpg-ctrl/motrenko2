import { FadeIn } from "@/components/site/FadeIn";
import { decodeTitle, slugify, sortMenuOrder, stripHtml, type WPMenuItem } from "@/lib/wordpress";
import { Activity, Baby, FlaskConical, Heart, Scan, Stethoscope } from "lucide-react";
import Link from "next/link";

const ICONS = [
  <Heart size={22} key="heart" strokeWidth={1.5} />,
  <Baby size={22} key="baby" strokeWidth={1.5} />,
  <FlaskConical size={22} key="flask" strokeWidth={1.5} />,
  <Activity size={22} key="activity" strokeWidth={1.5} />,
  <Scan size={22} key="scan" strokeWidth={1.5} />,
  <Stethoscope size={22} key="stethoscope" strokeWidth={1.5} />,
];

type Props = { items: WPMenuItem[] };

export function ServicesSection({ items }: Props) {
  const allItems = items;

  const categories = sortMenuOrder(
    allItems.filter(
      (item) =>
        item.parent === 0 &&
        !["kontakt"].includes(item.slug) &&
        !slugify(item.title).startsWith("o-nama")
    )
  );

  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: "linear-gradient(165deg, #fff9f5 0%, #fdf5ee 48%, #faf4ee 100%)" }}
    >
      <div
        className="pointer-events-none absolute -top-32 right-[12%] h-[28rem] w-[28rem] rounded-full bg-[#f37021]/[0.08] blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[22rem] w-[22rem] rounded-full bg-amber-100/35 blur-[70px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <FadeIn className="mb-12 lg:mb-16">
          <div className="flex max-w-3xl flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="size-2 shrink-0 rounded-full bg-[#f37021]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f37021]">
                Naše usluge
              </p>
            </div>
            <h2
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              className="text-[clamp(2.1rem,3.8vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-zinc-950"
            >
              Tretmani i opcije
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-[1.05rem]">
              Sveobuhvatna medicinska zaštita unutar jedne renomirane ustanove.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-12 shrink-0 bg-[#f37021]" />
            <span className="h-px max-w-xl flex-1 bg-zinc-200/90" />
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const firstChild = allItems.find(
              (item) => item.parent === cat.id && item.excerpt
            );
            const description = firstChild?.excerpt ? stripHtml(firstChild.excerpt) : "";
            const href = `/usluge/${slugify(cat.title)}`;

            return (
              <FadeIn key={cat.id} delay={((i % 3) * 100) as 0 | 100 | 200 | 300 | 400 | 500}>
                <Link
                  href={href}
                  className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-white/80 bg-white/55 p-7 shadow-[0_4px_28px_rgba(24,24,27,0.06)] backdrop-blur-md transition-all duration-300 [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-1 hover:border-[#f37021]/18 hover:bg-white/75 hover:shadow-[0_16px_48px_rgba(24,24,27,0.1)] sm:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f37021]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#f37021]/[0.11] text-[#f37021] transition-transform duration-300 group-hover:scale-[1.06]">
                    {ICONS[i % ICONS.length]}
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <p
                      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                      className="text-[1.2rem] font-medium leading-snug tracking-tight text-zinc-900"
                    >
                      {decodeTitle(cat.title)}
                    </p>
                    {description && (
                      <p className="text-sm leading-relaxed text-zinc-600">
                        {description.length > 120 ? description.slice(0, 120) + "…" : description}
                      </p>
                    )}
                  </div>

                  <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors group-hover:text-[#f37021]">
                    Saznajte više
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
