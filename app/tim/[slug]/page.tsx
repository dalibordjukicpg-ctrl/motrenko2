import { ClinicFooter } from "@/components/site/ClinicFooter";
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
          <div className="relative mx-auto max-w-5xl px-6 lg:px-16">
            <Link
              href="/#team"
              className="mb-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#f37021] hover:underline"
            >
              ← Naš tim
            </Link>
            <h1
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              {name}
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-[#f37021]" />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
            {img && (
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rewriteImgUrl(img)}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            )}
            <div
              className="wp-content"
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
