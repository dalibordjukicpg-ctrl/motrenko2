"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300 | 400 | 500;
  threshold?: number;
};

const DELAY_CLASS: Record<number, string> = {
  0: "",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={["fade-in", DELAY_CLASS[delay], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
