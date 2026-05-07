import { ClinicFooter } from "@/components/site/ClinicFooter";
import { ClinicNavbar } from "@/components/site/ClinicNavbar";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Uslovi korišćenja",
  description:
    "Uslovi korišćenja sajta Centra za humanu reprodukciju u Budvi.",
  path: "/uslovi-koriscenja",
});

export default function UsloviPage() {
  return (
    <>
      <ClinicNavbar />
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
              Uslovi korišćenja
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-[#f37021]" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-16">
          <div className="wp-content">
            <p>
              Korišćenjem sajta humanareprodukcija.com prihvatate sljedeće uslove.
              Ako se ne slažete sa nekim od navedenih uslova, molimo da ne koristite
              ovaj sajt.
            </p>

            <h2>1. Sadržaj</h2>
            <p>
              Informacije na sajtu su informativnog karaktera i ne zamjenjuju
              konsultaciju sa ljekarom. Za sve medicinske odluke obavezno se
              obratite stručnom licu.
            </p>

            <h2>2. Intelektualna svojina</h2>
            <p>
              Cjelokupni sadržaj sajta (tekstovi, slike, logo, dizajn) vlasništvo
              je Centra za humanu reprodukciju ili nosioca prava sa kojima Centar
              sarađuje. Bilo kakvo umnožavanje bez pisane saglasnosti je zabranjeno.
            </p>

            <h2>3. Linkovi ka eksternim sajtovima</h2>
            <p>
              Sajt može sadržati linkove ka drugim internet stranicama. Centar nije
              odgovoran za sadržaj ili praksu privatnosti tih sajtova.
            </p>

            <h2>4. Ograničenje odgovornosti</h2>
            <p>
              Centar ne snosi odgovornost za bilo koju štetu nastalu kao posljedica
              korišćenja ili nemogućnosti korišćenja informacija sa ovog sajta.
            </p>

            <h2>5. Izmjene</h2>
            <p>
              Centar zadržava pravo izmjene ovih uslova u bilo kom trenutku.
              Posljednja izmjena: {new Date().toLocaleDateString("sr-Latn-BA")}.
            </p>

            <h2>6. Mjerodavno pravo</h2>
            <p>
              Na ove uslove i njihovu primjenu primjenjuju se zakoni Crne Gore.
            </p>
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
