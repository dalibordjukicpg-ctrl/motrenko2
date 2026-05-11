"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string; description: string };

const STATS: Stat[] = [
  { value: 98,    suffix: "%",  label: "Zadovoljnih pacijenata", description: "Godišnja stopa zadovoljnosti" },
  { value: 15,    suffix: "+",  label: "Godina iskustva",        description: "Stručnost koja gradi povjerenje" },
  { value: 12000, suffix: "+",  label: "Tretiranih pacijenata",  description: "Rezultati koji govore sami za sebe" },
  { value: 30,    suffix: "+",  label: "Specijalista",           description: "Multidisciplinarni tim stručnjaka" },
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
    return () => { if (raf.current !== null) cancelAnimationFrame(raf.current); };
  }, [active, target, duration]);
  return count;
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(stat.value, 1800, vis);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center px-6 py-10 text-center transition-all duration-700"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <p
        className="text-[clamp(3rem,5vw,4.5rem)] font-light leading-none tracking-tight text-zinc-950"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {count.toLocaleString()}
        <span className="text-[#f37021]">{stat.suffix}</span>
      </p>
      <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
        {stat.label}
      </p>
      <p className="mt-2 text-xs text-zinc-400">{stat.description}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative z-[1] -mt-px overflow-hidden rounded-t-[1.25rem] shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.12)] sm:rounded-t-[1.5rem]" style={{ background: "linear-gradient(135deg,#fdf8f4 0%,#f8efe6 100%)" }}>
      <div className="mx-auto max-w-7xl border-x border-zinc-100">
        <div className="grid grid-cols-2 divide-x divide-y divide-zinc-100 lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
