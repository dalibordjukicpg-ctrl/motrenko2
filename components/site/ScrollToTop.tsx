"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Vrati se gore"
      className={[
        "fixed bottom-8 right-6 z-50",
        "flex h-11 w-11 flex-col items-center justify-center gap-0.5",
        "bg-[#f37021] text-white shadow-xl",
        "transition-all duration-300 hover:bg-[#d9601a] active:scale-95",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
      <span className="text-[7px] font-bold uppercase tracking-[0.15em] leading-none">
        gore
      </span>
    </button>
  );
}
