import { ClinicFooter } from "@/components/site/ClinicFooter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politika privatnosti",
  description:
    "Politika privatnosti Centra za humanu reprodukciju u Budvi — kako prikupljamo, koristimo i štitimo vaše lične podatke.",
  path: "/politika-privatnosti",
});

export default function PolitikaPage() {
  return (
    <>
      <main
        className="min-h-screen"
        style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)" }}
      >
        <div
          className="relative pb-16 pt-36"
          style={{
            backgroundImage: "url('/clinic-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-zinc-950/75" />
          <div className="relative mx-auto max-w-4xl px-6 lg:px-16">
            <h1
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              Politika privatnosti
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-[#f37021]" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-16">
          <div className="wp-content">
            <p>
              Centar za humanu reprodukciju (u daljem tekstu „Centar") posvećen je
              zaštiti privatnosti svih posjetilaca i pacijenata. Ova politika
              opisuje kako prikupljamo, koristimo i štitimo vaše lične podatke.
            </p>

            <h2>1. Podaci koje prikupljamo</h2>
            <ul>
              <li>Podaci koje sami unesete kroz kontakt formu (ime, email, telefon, poruka).</li>
              <li>Tehnički podaci (IP adresa, tip uređaja, vrijeme posjete) za potrebe analitike i sigurnosti.</li>
              <li>Medicinska dokumentacija — isključivo u okviru pružanja zdravstvenih usluga.</li>
            </ul>

            <h2>2. Svrha obrade</h2>
            <p>Vaše podatke koristimo isključivo za:</p>
            <ul>
              <li>odgovaranje na vaše upite i komunikaciju vezano za usluge,</li>
              <li>zakazivanje i pružanje medicinskih usluga,</li>
              <li>ispunjavanje zakonskih obaveza,</li>
              <li>poboljšanje funkcionalnosti našeg sajta.</li>
            </ul>

            <h2>3. Pravni osnov</h2>
            <p>
              Obrada podataka se vrši na osnovu vašeg pristanka, izvršenja ugovora
              o pružanju zdravstvenih usluga ili zakonskih obaveza Centra.
            </p>

            <h2>4. Čuvanje i sigurnost</h2>
            <p>
              Podaci se čuvaju onoliko dugo koliko je potrebno za ostvarenje svrhe
              obrade ili koliko propisuju zakoni Crne Gore. Primjenjujemo tehničke
              i organizacione mjere zaštite od neovlašćenog pristupa.
            </p>

            <h2>5. Vaša prava</h2>
            <ul>
              <li>uvid u vlastite podatke,</li>
              <li>ispravka netačnih podataka,</li>
              <li>brisanje podataka („pravo na zaborav"),</li>
              <li>opoziv pristanka u svakom trenutku,</li>
              <li>prigovor na obradu.</li>
            </ul>
            <p>
              Ova prava možete ostvariti slanjem zahtjeva na{" "}
              <a href="mailto:info@humanareprodukcija.com">info@humanareprodukcija.com</a>.
            </p>

            <h2>6. Kolačići (cookies)</h2>
            <p>
              Sajt koristi minimalne tehničke kolačiće neophodne za rad. Ne dijelimo
              podatke sa trećim stranama u marketinške svrhe.
            </p>

            <h2>7. Izmjene politike</h2>
            <p>
              Politika se može periodično ažurirati. Datum posljednje izmjene je
              vidljiv na dnu stranice. Posljednja izmjena: {new Date().toLocaleDateString("sr-Latn-BA")}.
            </p>

            <h2>8. Kontakt</h2>
            <p>
              Za sva pitanja u vezi privatnosti, obratite nam se na:
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:info@humanareprodukcija.com">info@humanareprodukcija.com</a>
              <br />
              <strong>Telefon:</strong> <a href="tel:+38233402432">033 402 432</a>
            </p>
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
