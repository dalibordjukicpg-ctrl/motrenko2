import { ClinicFooter } from "@/components/site/ClinicFooter";
import { ClinicNavbar } from "@/components/site/ClinicNavbar";
import { pageMetadata } from "@/lib/seo";
import { decodeTitle, getMenu, getPageBySlug, slugify, stripHtml } from "@/lib/wordpress";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug).catch(() => null);
  if (!page) return { title: "Stranica nije pronađena" };
  return pageMetadata({
    title: decodeTitle(page.title.rendered),
    description: stripHtml(page.excerpt.rendered).slice(0, 160) || undefined,
    path: `/stranica/${slug}`,
  });
}

export default async function StranicaPage({ params }: Props) {
  const { slug } = await params;

  const [page, allItems] = await Promise.all([
    getPageBySlug(slug).catch(() => null),
    getMenu("primary").catch(() => []),
  ]);

  if (!page) notFound();

  // Pronađi roditeljsku kategoriju iz menija
  const menuItem = allItems.find((i) => i.slug === slug);
  const parentItem = menuItem ? allItems.find((i) => i.id === menuItem.parent) : null;

  // Stranice iste kategorije (sidebar)
  const siblings = parentItem
    ? allItems.filter((i) => i.parent === parentItem.id && i.slug && i.slug !== slug)
    : [];

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
            {parentItem && (
              <Link
                href={`/usluge/${slugify(parentItem.title)}`}
                className="mb-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#f37021] hover:underline"
              >
                ← {decodeTitle(parentItem.title)}
              </Link>
            )}
            <h1
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              {decodeTitle(page.title.rendered)}
            </h1>
            {/* orange accent line */}
            <div className="mt-6 h-0.5 w-16 bg-[#f37021]" />
          </div>
        </div>


        {/* ── Content + sidebar ── */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
          <div className={siblings.length > 0 ? "grid items-start gap-16 lg:grid-cols-[1fr_260px]" : ""}>

            {/* Main content */}
            <div>
              <div
                className="wp-content max-w-3xl"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />

              <div className="mt-16 border-t border-zinc-100 pt-8">
                {parentItem ? (
                  <Link
                    href={`/usluge/${slugify(parentItem.title)}`}
                    className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-zinc-950"
                  >
                    ← {decodeTitle(parentItem.title)}
                  </Link>
                ) : (
                  <Link
                    href="/#services"
                    className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-zinc-950"
                  >
                    ← Nazad na usluge
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar — ostale stranice iz iste kategorije */}
            {siblings.length > 0 && (
              <aside className="hidden lg:block" style={{ alignSelf: "start" }}>
                <div className="sticky top-28">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f37021]">
                    {parentItem ? decodeTitle(parentItem.title) : "Ostale stranice"}
                  </p>
                  <nav className="flex flex-col gap-0.5">
                    {siblings.map((sib) => (
                      <Link
                        key={sib.id}
                        href={`/stranica/${sib.slug}`}
                        className="block break-words border-l-2 border-zinc-100 py-2 pl-3 text-[12px] leading-snug text-zinc-500 transition-all hover:border-[#f37021] hover:text-zinc-950"
                      >
                        {decodeTitle(sib.title)}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
