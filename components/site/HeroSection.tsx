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
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      // Na mobitelu već koristimo scale>1 za pun kadar; nastavak zumiranja od te baze
      video.style.transform = mobile ? "translateZ(0) scale(1.22)" : "scale(1.08)";
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
      className="relative min-h-[380px] overflow-hidden bg-zinc-950 max-md:h-[min(68svh,520px)] max-md:min-h-[380px] md:h-[100svh] md:min-h-[560px] lg:min-h-[640px]"
    >
      {/* ── Video — na mob: poster ispod + blagi scale da nema crnog «okvira» oko kadra ── */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 top-0 bottom-0 md:-top-[6%] md:-bottom-[6%]"
        style={{ transform: "translateY(var(--py, 0%))" }}
        aria-hidden
      >
        {/* Isti kao video poster — popunjava prostor prije učitavanja ili uz subpiksel rupe */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            poster="/hero-bg.png"
            className="h-full w-full object-cover object-[center_30%] will-change-transform [transform:translateZ(0)] max-md:min-h-[105%] max-md:min-w-[105%] max-md:scale-110 max-md:object-cover md:min-h-0 md:min-w-0 md:scale-100 md:object-center"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ── Overlays — jači tamni sloj na mob da tekst «sije» ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15 max-md:from-black/88 max-md:via-black/65 max-md:to-black/35"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent max-md:h-44"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))] max-md:justify-end max-md:pb-16 sm:px-14 md:justify-center md:px-24 md:pb-0 md:pt-0">
        <div className="max-w-2xl sm:translate-y-0">

          {/* eyebrow */}
          <p
            style={{
              opacity:   leaving ? 0 : 1,
              transform: leaving ? "translateY(-8px)" : "translateY(0)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/70 max-md:mb-3 sm:mb-5 sm:text-[11px] sm:tracking-[0.3em]"
          >
            {slide.eyebrow}
          </p>

          {/* headline — na mob jedna–dvije linije umjesto tri (manje visine) */}
          <h1
            style={{
              opacity:    leaving ? 0 : 1,
              transform:  leaving ? "translateY(16px)" : "translateY(0)",
              transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
            className="text-[clamp(1.9rem,7vw,7rem)] font-light leading-[1.12] tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)] md:whitespace-pre-line md:text-[clamp(3.5rem,8vw,7rem)] md:leading-[1.0] md:[text-shadow:none]"
          >
            <span className="md:hidden">{slide.heading.replace(/\n/g, " ")}</span>
            <span className="hidden md:inline whitespace-pre-line">{slide.heading}</span>
          </h1>

          {/* sub — lagana «ploča» na mob za kontrast */}
          <p
            style={{
              opacity:    leaving ? 0 : 1,
              transform:  leaving ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
            className="mt-3 max-w-[22rem] text-[0.8125rem] font-normal leading-snug text-white/85 max-md:mt-3 max-md:max-w-none max-md:rounded-md max-md:bg-black/40 max-md:px-3 max-md:py-2.5 max-md:leading-relaxed max-md:backdrop-blur-sm sm:mt-6 sm:max-w-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-base sm:font-light sm:text-white/70 sm:backdrop-blur-none"
          >
            {slide.sub}
          </p>

          {/* CTA — mobilno: dve jednake kolone, ista visina, isti font-scale */}
          <div
            style={{
              opacity:    leaving ? 0 : 1,
              transition: "opacity 0.5s ease 0.15s",
            }}
            className="mt-5 grid w-full grid-cols-2 gap-2 sm:mt-10 sm:flex sm:w-auto sm:max-w-none sm:gap-4"
          >
            <a
              href="#book"
              className="flex h-12 min-h-[48px] items-center justify-center rounded-sm bg-[#f37021] px-2 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-white transition-colors hover:bg-[#d9601a] sm:inline-flex sm:h-12 sm:min-h-0 sm:px-8 sm:text-[11px] sm:font-medium sm:tracking-[0.25em]"
            >
              Zakaži pregled
            </a>
            <a
              href="#services"
              className="flex h-12 min-h-[48px] items-center justify-center rounded-sm border border-white/55 bg-white/10 px-2 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:border-white/80 hover:bg-white/15 sm:inline-flex sm:h-12 sm:min-h-0 sm:px-6 sm:text-[11px] sm:font-medium sm:tracking-[0.22em]"
            >
              Naše usluge <span className="ml-0.5">→</span>
            </a>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-3 flex items-center gap-3 pb-[env(safe-area-inset-bottom)] max-md:left-1/2 max-md:-translate-x-1/2 sm:bottom-10 sm:left-14 sm:translate-x-0 lg:left-24">
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
