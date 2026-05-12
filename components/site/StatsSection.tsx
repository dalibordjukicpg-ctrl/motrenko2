"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  description: string;
  /** Tematska pozadina */
  bgImage: string;
  bgPosition?: string;
};

/* Besplatne medicinske fotografije (Unsplash) — zamijenite vlastitim URL-ovima ako želite */
const STATS: Stat[] = [
  {
    value: 98,
    suffix: "%",
    label: "Zadovoljnih pacijenata",
    description: "Godišnja stopa zadovoljnosti",
    bgImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=960&q=80",
    bgPosition: "center 25%",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Rođene djece",
    description: "Bebe koje su našoj misiji dale smisao",
    bgImage:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=960&q=80",
    bgPosition: "center 40%",
  },
  {
    value: 12000,
    suffix: "+",
    label: "Tretiranih pacijenata",
    description: "Rezultati koji govore sami za sebe",
    bgImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=960&q=80",
    bgPosition: "center 40%",
  },
  {
    value: 30,
    suffix: "+",
    label: "Specijalista",
    description: "Multidisciplinarni tim stručnjaka",
    /* Konsultacija / stetoskop — stock bez telefona u kadru */
    bgImage:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=960&q=80",
    bgPosition: "center 28%",
  },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [active, target, duration]);
  return count;
}

/** Pozadina kartice: <img> + fallback na lokalnu sliku ako vanjski URL ne učita */
function StatCardBg({ src, position }: { src: string; position?: string }) {
  const [useFallback, setUseFallback] = useState(false);
  const effective = useFallback ? "/clinic-bg.jpg" : src;
  const pos = useFallback ? "center center" : (position ?? "center");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={effective}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: pos }}
      onError={() => setUseFallback(true)}
    />
  );
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.value, 1800, vis);

  return (
    <div ref={ref} className="h-full">
      <div
        className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/75 px-4 py-8 text-center shadow-[0_4px_28px_rgba(24,24,27,0.08)] transition-all duration-500 ease-out sm:rounded-3xl sm:px-6 sm:py-10 hover:-translate-y-1 hover:border-[#f37021]/28 hover:shadow-[0_16px_48px_rgba(24,24,27,0.12)]"
        style={{
          opacity: vis ? 1 : 0,
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* Tematska pozadina — <img> zbog pouzdanog fallbacka */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl" aria-hidden>
          <StatCardBg src={stat.bgImage} position={stat.bgPosition} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#fff9f5]/78 via-white/72 to-[#faf4ee]/76" />
          <div className="absolute inset-0 bg-white/15" />
        </div>

        <div className="absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#f37021]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-col items-center">
          <p
            className="text-[clamp(2.5rem,4.2vw,4rem)] font-light leading-none tracking-tight text-zinc-950 transition-transform duration-300 [text-shadow:0_1px_18px_rgba(255,255,255,0.95),0_0_1px_rgba(255,255,255,0.8)] group-hover:scale-[1.02]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {count.toLocaleString()}
            <span className="text-[#f37021] [text-shadow:0_1px_12px_rgba(255,255,255,0.9)]">{stat.suffix}</span>
          </p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-700 sm:text-[11px]">
            {stat.label}
          </p>
          <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-zinc-600">{stat.description}</p>
        </div>
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      className="relative z-[1] -mt-px overflow-hidden rounded-t-[1.25rem] shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.12)] sm:rounded-t-[1.5rem]"
      style={{ background: "linear-gradient(165deg, #fff9f5 0%, #fdf5ee 48%, #faf4ee 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:px-16 lg:py-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
