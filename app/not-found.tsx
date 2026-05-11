import { ClinicFooter } from "@/components/site/ClinicFooter";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main
        className="flex min-h-screen items-center justify-center"
        style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)" }}
      >
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-[#f37021]">
            Greška 404
          </p>
          <h1
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[1] tracking-tight text-zinc-950"
          >
            Stranica nije pronađena
          </h1>
          <div className="mx-auto mt-8 h-0.5 w-16 bg-[#f37021]" />
          <p className="mx-auto mt-8 max-w-md text-[15px] leading-[1.85] text-zinc-500">
            Stranica koju tražite je premještena ili više ne postoji.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center bg-[#f37021] px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#d9601a]"
            >
              Početna
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-12 items-center border border-zinc-300 px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
