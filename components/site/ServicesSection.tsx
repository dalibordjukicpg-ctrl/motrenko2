import { FadeIn } from "@/components/site/FadeIn";
import { decodeTitle, slugify, sortMenuOrder, stripHtml, type WPMenuItem } from "@/lib/wordpress";
import { Activity, Baby, FlaskConical, Heart, Scan, Stethoscope } from "lucide-react";
import Link from "next/link";

const ICONS = [
  <Heart size={22} key="heart" />,
  <Baby size={22} key="baby" />,
  <FlaskConical size={22} key="flask" />,
  <Activity size={22} key="activity" />,
  <Scan size={22} key="scan" />,
  <Stethoscope size={22} key="stethoscope" />,
];

type Props = { items: WPMenuItem[] };

export function ServicesSection({ items }: Props) {
  const allItems = items;

  // Top-level kategorije (isključiti O nama i Kontakt)
  const categories = sortMenuOrder(
    allItems.filter(
      (item) =>
        item.parent === 0 &&
        !["kontakt"].includes(item.slug) &&
        !slugify(item.title).startsWith("o-nama")
    )
  );

  return (
    <section id="services" className="py-16 lg:py-24" style={{ background: "linear-gradient(160deg, #fff9f5 0%, #fdf5ee 100%)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* heading */}
        <FadeIn className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#f37021]">
                Naše usluge
              </p>
              <h2
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                className="text-[clamp(2.2rem,4vw,4rem)] font-light leading-[1.05] tracking-tight text-zinc-950"
              >
                Tretmani
                <em className="not-italic text-zinc-400"> i opcije</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400 sm:text-right">
              Sveobuhvatna medicinska zaštita unutar jedne renomirane ustanove.
            </p>
          </div>
          <div className="mt-6 h-px bg-zinc-100" />
        </FadeIn>

        {/* service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
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
                  className="group flex h-full flex-col gap-4 border border-orange-100/60 p-7 transition-all hover:shadow-sm"
                  style={{ background: "linear-gradient(145deg,#ffffff 0%,#fff8f4 100%)" }}
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-100 text-zinc-300 transition-colors group-hover:border-[#f37021]/20 group-hover:text-[#f37021]">
                    {ICONS[i % ICONS.length]}
                  </span>
                  <div>
                    <p
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      className="mb-2 text-[1.3rem] font-light leading-tight tracking-tight text-[#f37021]"
                    >
                      {decodeTitle(cat.title)}
                    </p>
                    {description && (
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {description.length > 120 ? description.slice(0, 120) + "…" : description}
                      </p>
                    )}
                  </div>
                  <span className="mt-auto text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-300 transition-colors group-hover:text-[#f37021]">
                    Saznajte više →
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
