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
      className="relative h-[100svh] min-h-[480px] overflow-hidden bg-black sm:min-h-[560px] md:min-h-[640px]"
    >
      {/* ── Video background ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 max-md:top-0 max-md:bottom-0 -top-[6%] -bottom-[6%] md:-top-[8%] md:-bottom-[8%]"
        style={{ transform: "translateY(var(--py, 0%))" }}
        aria-hidden
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          poster="/hero-bg.png"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
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
      <div className="relative z-10 flex h-full flex-col justify-center px-5 pb-8 pt-24 sm:px-14 sm:pb-0 sm:pt-0 md:px-24 md:pt-0">
        <div className="max-w-2xl">

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

          {/* CTA */}
          <div
            style={{
              opacity:    leaving ? 0 : 1,
              transition: "opacity 0.5s ease 0.15s",
            }}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5"
          >
            <a
              href="#book"
              className="inline-flex h-12 items-center bg-[#f37021] px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#d9601a]"
            >
              Zakaži pregled
            </a>
            <a
              href="#services"
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/55 transition-colors hover:text-white"
            >
              Naše usluge →
            </a>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-5 flex items-center gap-3 sm:bottom-10 sm:left-14 lg:left-24">
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
