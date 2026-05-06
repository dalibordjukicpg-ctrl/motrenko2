import { ClinicFooter } from "@/components/site/ClinicFooter";
import { ClinicNavbar } from "@/components/site/ClinicNavbar";
import { FadeIn } from "@/components/site/FadeIn";
import { decodeTitle, getMenu, slugify, stripHtml } from "@/lib/wordpress";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function UslugePage({ params }: Props) {
  const { slug } = await params;
  const allItems = await getMenu("primary").catch(() => []);

  const category = allItems.find(
    (item) => item.parent === 0 && slugify(item.title) === slug
  );
  if (!category) notFound();

  const children = allItems.filter((item) => item.parent === category.id && item.slug);

  return (
    <>
      <ClinicNavbar />
      <main className="min-h-screen" style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)" }}>

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
            <Link
              href="/#services"
              className="mb-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#f37021] hover:underline"
            >
              ← Naše usluge
            </Link>
            <h1
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              {decodeTitle(category.title)}
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-[#f37021]" />
          </div>
        </div>


        {/* ── Children grid ── */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
          {children.length === 0 ? (
            <p className="text-zinc-400">Nema dostupnih podstranica.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child, i) => {
                const excerpt = child.excerpt ? stripHtml(child.excerpt) : "";
                return (
                  <FadeIn key={child.id} delay={((i % 3) * 100) as 0 | 100 | 200 | 300 | 400 | 500}>
                    <Link
                      href={`/stranica/${child.slug}`}
                      className="group flex h-full flex-col gap-3 border border-orange-100/60 p-8 transition-all hover:shadow-sm"
                      style={{ background: "linear-gradient(145deg,#ffffff 0%,#fff8f4 100%)" }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f37021]">
                        {decodeTitle(category.title)}
                      </p>
                      <h2
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                        className="text-[1.6rem] font-light leading-tight tracking-tight text-[#f37021]"
                      >
                        {decodeTitle(child.title)}
                      </h2>
                      {excerpt && (
                        <p className="text-sm leading-relaxed text-zinc-400">
                          {excerpt.length > 130 ? excerpt.slice(0, 130) + "…" : excerpt}
                        </p>
                      )}
                      <span className="mt-auto pt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-300 transition-colors group-hover:text-[#f37021]">
                        Pročitajte više →
                      </span>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}

          <div className="mt-12 border-t border-zinc-100 pt-8">
            <Link
              href="/#services"
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400 hover:text-zinc-950"
            >
              ← Sve usluge
            </Link>
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
