"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    eyebrow: "Human Reproduction Center",
    heading: "Gdje\nživot\npočinje",
    sub: "Napredna reproduktivna medicina za vašu porodicu",
  },
  {
    eyebrow: "Najsavremenija tehnologija",
    heading: "Gdje\nstručnost\nsvijetli",
    sub: "Tim specijalista s višedecenijskim iskustvom",
  },
  {
    eyebrow: "Briga kao prioritet",
    heading: "Gdje\nsvaki\nkorak boli manje",
    sub: "Individualizovani pristup svakom pacijentu",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const bgRef        = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  /* auto-advance */
  useEffect(() => {
    const id = setInterval(() => {
      setLeaving(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setLeaving(false);
      }, 600);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  /* zoom after video ends */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => {
      video.style.transition = "transform 8s ease-out";
      video.style.transform  = "scale(1.08)";
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, []);

  /* parallax — samo na md+ (manje titranja na mobilnom) */
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current || !containerRef.current) return;
      if (window.matchMedia("(max-width: 767px)").matches) {
        bgRef.current.style.setProperty("--py", "0%");
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const ratio = -rect.top / window.innerHeight;
      bgRef.current.style.setProperty("--py", `${ratio * 12}%`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[430px] overflow-hidden bg-black max-md:h-[min(82svh,600px)] md:h-[100svh] md:min-h-[560px] lg:min-h-[640px]"
    >
      {/* ── Video background — na mobilnom uokviren, manji vizuelni «otisak» ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[6%] -bottom-[6%] md:-top-[8%] md:-bottom-[8%]"
        style={{ transform: "translateY(var(--py, 0%))" }}
        aria-hidden
      >
        <div className="absolute inset-0 max-md:inset-x-3.5 max-md:top-[4.75rem] max-md:bottom-[12%] max-md:overflow-hidden max-md:rounded-2xl md:inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            poster="/hero-bg.png"
            className="h-full w-full object-cover object-[center_32%] max-md:scale-[1.06] md:scale-100 md:object-center"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ── Overlays ── */}
      {/* deep gradient left → transparent right */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15"
      />
      {/* bottom vignette */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col justify-center px-5 pb-10 pt-24 max-md:pb-12 sm:px-14 md:px-24 md:pb-0 md:pt-0">
        <div className="max-w-2xl max-md:-translate-y-2 sm:translate-y-0">

          {/* eyebrow */}
          <p
            style={{
              opacity:   leaving ? 0 : 1,
              transform: leaving ? "translateY(-8px)" : "translateY(0)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/55"
          >
            {slide.eyebrow}
          </p>

          {/* headline — Cormorant Garamond, weight 300 */}
          <h1
            style={{
              opacity:    leaving ? 0 : 1,
              transform:  leaving ? "translateY(16px)" : "translateY(0)",
              transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
            className="whitespace-pre-line text-[clamp(2.35rem,10.5vw,7rem)] font-light leading-[1.02] tracking-tight text-white md:text-[clamp(3.5rem,8vw,7rem)] md:leading-[1.0]"
          >
            {slide.heading}
          </h1>

          {/* sub */}
          <p
            style={{
              opacity:    leaving ? 0 : 1,
              transform:  leaving ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
            className="mt-4 max-w-[22rem] text-sm font-light leading-relaxed text-white/60 sm:mt-6 sm:max-w-none sm:text-base"
          >
            {slide.sub}
          </p>

          {/* CTA — mobilno: ista visina, druga kao sekundarni outline */}
          <div
            style={{
              opacity:    leaving ? 0 : 1,
              transition: "opacity 0.5s ease 0.15s",
            }}
            className="mt-7 flex flex-row flex-wrap items-center gap-2.5 sm:mt-10 sm:gap-4"
          >
            <a
              href="#book"
              className="inline-flex h-11 w-fit max-w-full shrink-0 items-center justify-center rounded-sm bg-[#f37021] px-6 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#d9601a] sm:h-12 sm:px-8 sm:text-[11px] sm:tracking-[0.25em]"
            >
              Zakaži pregled
            </a>
            <a
              href="#services"
              className="inline-flex h-11 w-fit items-center justify-center rounded-sm border border-white/45 bg-white/5 px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-[2px] transition-colors hover:border-white/70 hover:bg-white/10 hover:text-white sm:h-12 sm:px-6 sm:text-[11px] sm:tracking-[0.25em]"
            >
              Naše usluge <span className="ml-1.5 inline-block translate-y-px">→</span>
            </a>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-4 left-5 flex items-center gap-3 max-md:left-1/2 max-md:-translate-x-1/2 sm:bottom-10 sm:left-14 sm:translate-x-0 lg:left-24">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setLeaving(true); setTimeout(() => { setCurrent(idx); setLeaving(false); }, 600); }}
              aria-label={`Slide ${idx + 1}`}
              className={[
                "transition-all duration-500",
                idx === current
                  ? "h-px w-10 bg-[#f37021]"
                  : "h-px w-5 bg-white/30 hover:bg-white/60",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 sm:right-14 sm:flex lg:right-24">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/35">scroll</span>
          <div className="h-14 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
