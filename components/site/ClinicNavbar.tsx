"use client";

import { decodeTitle, slugify, sortMenuOrder, type WPMenuItem } from "@/lib/wordpress";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = { initialMenuItems?: WPMenuItem[] };

export function ClinicNavbar({ initialMenuItems = [] }: Props) {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [uslugeOpen,     setUslugeOpen]     = useState(false);
  const [uslugeExpanded, setUslugeExpanded] = useState(false);
  const [expandedCat,    setExpandedCat]    = useState<number | null>(null);
  const menuItems = initialMenuItems;

  // Hover intent — small delay so dropdown stays open when moving mouse into it
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setUslugeOpen(true); };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setUslugeOpen(false), 120); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serviceCategories = sortMenuOrder(
    menuItems.filter(
      (item) =>
        item.parent === 0 &&
        !["kontakt"].includes(item.slug) &&
        !slugify(item.title).startsWith("o-nama")
    )
  );
  const oNama = menuItems.find((i) => i.parent === 0 && slugify(i.title).startsWith("o-nama"));
  const getChildren = (parentId: number) =>
    sortMenuOrder(menuItems.filter((i) => i.parent === parentId && i.slug));

  const linkCls = [
    "text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
    scrolled
      ? "text-zinc-600 hover:text-zinc-950"
      : "text-white/80 hover:text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]",
  ].join(" ");

  return (
    <header className={[
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "bg-white/95 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-sm" : "bg-transparent",
    ].join(" ")}>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-t2.png"
            alt="Human Reproduction Center Budva"
            style={{ height: "60px", width: "auto" }}
            className="rounded-md"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">

          {/* Usluge — hover trigger */}
          <div
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            className="relative"
          >
            <button
              className={`${linkCls} flex items-center gap-1.5`}
              aria-expanded={uslugeOpen}
            >
              Usluge
              <svg
                className={`size-3 transition-transform duration-300 ${uslugeOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>
          </div>

          {oNama ? (
            <Link href={`/usluge/${slugify(oNama.title)}`} className={linkCls}>O nama</Link>
          ) : (
            <a href="#about" className={linkCls}>O nama</a>
          )}
          <Link href="/#team" className={linkCls}>Naš tim</Link>
          <a href="#blog"    className={linkCls}>Blog</a>
          <Link href="/kontakt" className={linkCls}>Kontakt</Link>
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-5">
          <a href="#book" className={[
            "hidden h-9 items-center px-6 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 md:inline-flex",
            scrolled
              ? "bg-[#f37021] text-white hover:bg-[#d9601a]"
              : "border border-white/50 text-white hover:bg-white/10 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]",
          ].join(" ")}>
            Zakaži pregled
          </a>

          <button onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu"
            className="flex flex-col items-center justify-center gap-[5px] p-1.5 md:hidden">
            {[0, 1, 2].map((i) => (
              <span key={i} className={[
                "block h-[1.5px] w-6 transition-all duration-300",
                scrolled ? "bg-zinc-900" : "bg-white drop-shadow-md",
                i === 0 && mobileOpen ? "translate-y-[6px] rotate-45" : "",
                i === 1 && mobileOpen ? "opacity-0 scale-x-0" : "",
                i === 2 && mobileOpen ? "-translate-y-[6px] -rotate-45" : "",
              ].join(" ")} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mega dropdown — centriran, ograničene širine ── */}
      <div
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        className={[
          "absolute left-1/2 top-full z-50 -translate-x-1/2 origin-top",
          "w-[min(860px,90vw)]",
          "border border-zinc-100 border-t-2 border-t-[#f37021] bg-white shadow-2xl",
          "hidden md:block",
          "transition-all duration-200",
          uslugeOpen ? "scale-y-100 opacity-100 pointer-events-auto" : "scale-y-95 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="px-8 py-8">
          <div style={{ columns: "4", columnGap: "1.5rem" }}>
            {serviceCategories.map((cat) => {
              const kids = getChildren(cat.id);
              return (
                <div key={cat.id} className="mb-7 break-inside-avoid">
                  <Link
                    href={`/usluge/${slugify(cat.title)}`}
                    onClick={() => setUslugeOpen(false)}
                    className="mb-2 block text-[9px] font-bold uppercase tracking-[0.3em] text-[#f37021] hover:underline"
                  >
                    {decodeTitle(cat.title)}
                  </Link>
                  <ul className="border-l border-zinc-100 pl-3">
                    {kids.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={`/stranica/${child.slug}`}
                          onClick={() => setUslugeOpen(false)}
                          className="block py-[4px] text-[12px] text-zinc-500 transition-colors hover:text-[#f37021]"
                          title={decodeTitle(child.title)}
                        >
                          {decodeTitle(child.title)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={[
        "bg-white transition-[max-height] duration-500 ease-out md:hidden",
        mobileOpen ? "max-h-[min(85vh,32rem)] overflow-y-auto overscroll-contain border-t border-zinc-100 shadow-lg" : "max-h-0 overflow-hidden",
      ].join(" ")}>
        <div className="divide-y divide-zinc-100 pb-4">

          {/* Usluge */}
          <div>
            <button
              onClick={() => { setUslugeExpanded((o) => !o); setExpandedCat(null); }}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700 min-[400px]:px-6"
            >
              Usluge
              <svg className={`size-3 transition-transform ${uslugeExpanded ? "rotate-180" : ""}`}
                viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${uslugeExpanded ? "max-h-[3000px]" : "max-h-0"}`}>
              {serviceCategories.map((cat) => {
                const kids = getChildren(cat.id);
                const isOpen = expandedCat === cat.id;
                return (
                  <div key={cat.id} className="border-t border-zinc-100 bg-zinc-50/60">
                    <button
                      onClick={() => setExpandedCat(isOpen ? null : cat.id)}
                      className="flex w-full items-center justify-between px-7 py-2.5 text-left"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-800">
                        {decodeTitle(cat.title)}
                      </span>
                      <svg className={`size-2.5 shrink-0 text-[#f37021] transition-transform ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </button>

                    <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[600px]" : "max-h-0"}`}>
                      <div className="pb-2 pl-9 pr-6 pt-1">
                        {kids.map((child) => (
                          <Link key={child.id} href={`/stranica/${child.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-[11px] text-zinc-500 hover:text-[#f37021]">
                            {decodeTitle(child.title)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* O nama */}
          {oNama ? (
            <Link href={`/usluge/${slugify(oNama.title)}`} onClick={() => setMobileOpen(false)}
              className="block px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700 hover:text-[#f37021] min-[400px]:px-6">
              O nama
            </Link>
          ) : (
            <a href="#about" onClick={() => setMobileOpen(false)}
              className="block px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700 hover:text-[#f37021] min-[400px]:px-6">
              O nama
            </a>
          )}

          <Link href="/#team" onClick={() => setMobileOpen(false)}
            className="block px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700 hover:text-[#f37021] min-[400px]:px-6">
            Naš tim
          </Link>
          <a href="#blog" onClick={() => setMobileOpen(false)}
            className="block px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700 hover:text-[#f37021] min-[400px]:px-6">
            Blog
          </a>
          <Link href="/kontakt" onClick={() => setMobileOpen(false)}
            className="block px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700 hover:text-[#f37021] min-[400px]:px-6">
            Kontakt
          </Link>

          <div className="px-6 pt-3">
            <a href="#book" onClick={() => setMobileOpen(false)}
              className="flex h-10 items-center justify-center bg-[#f37021] text-[11px] font-medium uppercase tracking-[0.2em] text-white">
              Zakaži pregled
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
