import { ClinicFooter } from "@/components/site/ClinicFooter";
import { PageHero } from "@/components/site/PageHero";
import { pageMetadata } from "@/lib/seo";
import { decodeTitle, getStaff, rewriteContentHtml, rewriteImgUrl, stripHtml } from "@/lib/wordpress";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const all = await getStaff(50).catch(() => []);
  const member = all.find((m) => m.slug === slug);
  if (!member) return { title: "Profil nije pronađen" };
  const name = decodeTitle(member.title.rendered);
  const description =
    stripHtml(member.excerpt.rendered).slice(0, 160) ||
    `${name} — član tima Centra za humanu reprodukciju u Budvi.`;
  return pageMetadata({
    title: name,
    description,
    path: `/tim/${slug}`,
  });
}

export default async function TimMemberPage({ params }: Props) {
  const { slug } = await params;
  const all = await getStaff(50).catch(() => []);
  const member = all.find((m) => m.slug === slug);
  if (!member) notFound();

  const img = member._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
  const name = decodeTitle(member.title.rendered);

  return (
    <>
      <main
        className="min-h-screen w-full min-w-0 overflow-x-hidden"
        style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)" }}
      >
        <PageHero max="5xl">
          <Link
            href="/#team"
            className="mb-3 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#f37021] hover:underline sm:mb-4"
          >
            ← Naš tim
          </Link>
          <h1
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            className="text-[clamp(1.85rem,6.5vw,4.5rem)] font-light leading-[1.08] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:leading-[1.05]"
          >
            {name}
          </h1>
          <div className="mt-5 h-0.5 w-14 bg-[#f37021] sm:mt-6 sm:w-16" />
        </PageHero>

        {/* ── Content ── */}
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-16">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
            {img && (
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-1 ring-zinc-200/80 shadow-[0_16px_48px_-20px_rgba(24,24,27,0.18)] sm:rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rewriteImgUrl(img)}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            )}
            <div
              className="wp-content wp-content--article min-w-0"
              dangerouslySetInnerHTML={{ __html: rewriteContentHtml(member.content.rendered) }}
            />
          </div>

          <div className="mt-16 border-t border-zinc-100 pt-8">
            <Link
              href="/#team"
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400 hover:text-zinc-950"
            >
              ← Cijeli tim
            </Link>
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
