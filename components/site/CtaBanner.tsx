import { FadeIn } from "@/components/site/FadeIn";

export function CtaBanner() {
  return (
    <section id="book" className="bg-zinc-950 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <FadeIn className="flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#f37021]">
              Vaš put počinje ovdje
            </p>
            <h2
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-[clamp(2.8rem,5vw,5.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              Zakažite konsultaciju
              <br />
              <em className="not-italic text-white/40">s našim stručnjacima</em>
            </h2>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <a
              href="tel:+38200000000"
              className="inline-flex h-12 items-center bg-[#f37021] px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#d9601a]"
            >
              Zakaži pregled
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center border border-white/15 px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              Kontakt forma
            </a>
          </div>
        </FadeIn>

        {/* thin divider */}
        <div className="mt-10 h-px bg-white/8" />

        {/* info row */}
        <FadeIn delay={200} className="mt-6 flex flex-wrap gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
          <span>Pon – Pet &nbsp;07:00 – 20:00</span>
          <span>Subota &nbsp;08:00 – 14:00</span>
          <span>+387 00 000 000</span>
        </FadeIn>
      </div>
    </section>
  );
}
