import { ClinicFooter } from "@/components/site/ClinicFooter";
import { ClinicNavbar } from "@/components/site/ClinicNavbar";
import { ContactForm } from "@/components/site/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontaktirajte Centar za humanu reprodukciju u Budvi. Telefon, email, adresa i kontakt forma.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <ClinicNavbar />
      <main
        className="min-h-screen"
        style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)" }}
      >
        {/* ── Hero header ── */}
        <div
          className="relative pb-16 pt-36"
          style={{
            backgroundImage: "url('/clinic-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-zinc-950/75" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-[#f37021]">
              Kontakt
            </p>
            <h1
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              Tu smo za vas
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-[#f37021]" />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            {/* Info */}
            <div>
              <p
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                className="mb-6 text-3xl font-normal leading-tight text-[#f37021]"
              >
                Kontakt podaci
              </p>
              <p className="mb-10 text-[15px] leading-[1.85] text-zinc-500">
                Možete nas kontaktirati telefonom, emailom ili putem forme.
                Odgovaramo u najkraćem mogućem roku.
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-200 text-[#f37021]">
                    <Phone size={16} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                      Telefon
                    </p>
                    <a href="tel:+38233402432" className="block text-zinc-900 hover:text-[#f37021]">
                      033 402 432
                    </a>
                    <a href="tel:+38267052052" className="block text-zinc-900 hover:text-[#f37021]">
                      067 052 052
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-200 text-[#f37021]">
                    <Mail size={16} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                      Email
                    </p>
                    <a
                      href="mailto:info@humanareprodukcija.com"
                      className="text-zinc-900 hover:text-[#f37021]"
                    >
                      info@humanareprodukcija.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-200 text-[#f37021]">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                      Adresa
                    </p>
                    <a
                      href="https://maps.app.goo.gl/XRLPBsA1YMM4vaX38"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-900 hover:text-[#f37021]"
                    >
                      bb XVI Ulica, Budva 85310
                    </a>
                  </div>
                </li>
              </ul>

              {/* Map embed */}
              <div className="mt-10 overflow-hidden rounded-sm border border-zinc-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.5!2d18.8403!3d42.2911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDE3JzI4LjAiTiAxOMKwNTAnMjUuMSJF!5e0!3m2!1ssr!2s!4v1700000000000"
                  width="100%"
                  height="280"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                  title="Lokacija klinike"
                />
              </div>
            </div>

            {/* Form */}
            <div
              className="border border-orange-100/60 px-8 py-10 lg:px-12"
              style={{ background: "linear-gradient(145deg,#ffffff 0%,#fff8f4 100%)" }}
            >
              <p
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                className="mb-2 text-3xl font-normal leading-tight text-[#f37021]"
              >
                Pošaljite poruku
              </p>
              <p className="mb-8 text-[14px] leading-relaxed text-zinc-500">
                Popunite formu i naš tim će vam se javiti u najkraćem roku.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
