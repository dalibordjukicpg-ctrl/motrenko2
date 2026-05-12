import { FadeIn } from "@/components/site/FadeIn";
import { Mail, MapPin, Phone } from "lucide-react";

const NAV = [
  { label: "Usluge",   href: "/#services" },
  { label: "Naš tim",  href: "/#team"     },
  { label: "O nama",   href: "/#about"    },
  { label: "Blog",     href: "/#blog"     },
  { label: "Kontakt",  href: "/kontakt"   },
];

const CONTACT = [
  { icon: <Phone size={14} />, text: "033 402 432",            href: "tel:+38233402432"         },
  { icon: <Phone size={14} />, text: "067 052 052",            href: "tel:+38267052052"         },
  { icon: <Mail  size={14} />, text: "info@humanareprodukcija.com", href: "mailto:info@humanareprodukcija.com" },
  { icon: <MapPin size={14} />, text: "bb XVI Ulica, Budva 85310", href: "https://maps.app.goo.gl/XRLPBsA1YMM4vaX38" },
];

const HOURS = [
  { day: "Ponedjeljak", time: "08:00 – 20:00" },
  { day: "Utorak",      time: "06:30 – 20:00" },
  { day: "Srijeda",     time: "08:00 – 20:00" },
  { day: "Četvrtak",    time: "08:00 – 20:00" },
  { day: "Petak",       time: "08:00 – 20:00" },
  { day: "Subota",      time: "Zatvoreno"      },
  { day: "Nedjelja",    time: "Zatvoreno"      },
];

const SOCIAL = [
  { label: "Facebook",  href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
];

export function ClinicFooter() {
  return (
    <footer id="contact" className="bg-[#1a1208]">

      {/* ── Gornja narandžasta linija ── */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#f37021] to-transparent opacity-40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* ── Glavni grid ── */}
        <FadeIn>
          <div className="grid gap-12 border-b border-white/5 py-16 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-16 lg:py-20">

            {/* Brand */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-t2.png"
                alt="Human Reproduction Center Budva"
                style={{ height: "64px", width: "auto" }}
                className="mb-6 rounded-lg"
              />
              <p className="mb-8 max-w-[280px] text-[14px] leading-[1.85] text-zinc-500">
                Posvećeni vašem zdravlju uz najsavremeniju medicinsku njegu i
                individualizovani pristup od 2004. godine.
              </p>

              {/* Kontakt detalji */}
              <div className="space-y-3">
                {CONTACT.map((item) =>
                  item.href ? (
                    <a
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-3 text-[13px] text-zinc-500 transition-colors hover:text-white"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/8 text-[#f37021]">
                        {item.icon}
                      </span>
                      {item.text}
                    </a>
                  ) : (
                    <p key={item.text} className="flex items-center gap-3 text-[13px] text-zinc-500">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/8 text-[#f37021]">
                        {item.icon}
                      </span>
                      {item.text}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Navigacija */}
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f37021]">
                Navigacija
              </p>
              <ul className="space-y-3">
                {NAV.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group flex items-center gap-2 text-[13px] text-zinc-500 transition-colors hover:text-white"
                    >
                      <span className="h-px w-3 bg-zinc-700 transition-all group-hover:w-5 group-hover:bg-[#f37021]" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Radno vrijeme */}
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f37021]">
                Radno vrijeme
              </p>
              <div className="space-y-3">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex items-center justify-between gap-4 text-[13px]">
                    <span className="text-zinc-600">{h.day}</span>
                    <span className={h.day === "Nedjelja" ? "text-zinc-700" : "text-zinc-400"}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Društvene mreže */}
            <div>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f37021]">
                Pratite nas
              </p>
              <div className="flex flex-col gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="group flex items-center gap-3 text-[13px] text-zinc-500 transition-colors hover:text-white"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/8 transition-colors group-hover:border-[#f37021]/40 group-hover:text-[#f37021]">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        {s.label === "Facebook" && (
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        )}
                        {s.label === "Instagram" && (
                          <>
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" />
                          </>
                        )}
                        {s.label === "LinkedIn" && (
                          <>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                            <circle cx="4" cy="4" r="2" />
                          </>
                        )}
                      </svg>
                    </span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </FadeIn>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-[11px] text-zinc-700 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Human Reproduction Center Budva. Sva prava zadržana.</p>
          <p className="mt-1 text-zinc-500">Crafted by <span className="text-[#f37021] font-medium">Computer Doctor</span> Podgorica</p>
          <div className="flex gap-6">
            <a href="/politika-privatnosti" className="transition-colors hover:text-zinc-400">
              Politika privatnosti
            </a>
            <a href="/uslovi-koriscenja" className="transition-colors hover:text-zinc-400">
              Uslovi korišćenja
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
