import { ClinicFooter } from "@/components/site/ClinicFooter";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd, articleJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";
import { decodeTitle, getPostBySlug, rewriteContentHtml, stripHtml } from "@/lib/wordpress";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sr-Latn-BA", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Novost nije pronađena" };
  const title = decodeTitle(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  return pageMetadata({
    title,
    description,
    path: `/novosti/${slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function NovostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const articleSchema = articleJsonLd({
    headline: decodeTitle(post.title.rendered),
    description: stripHtml(post.excerpt.rendered).slice(0, 200),
    url: `${SITE_URL}/novosti/${slug}`,
    datePublished: post.date,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <main
        className="min-h-screen w-full min-w-0 overflow-x-hidden"
        style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)" }}
      >
        <PageHero max="4xl">
          <time className="mb-3 block max-w-[95vw] text-[10px] font-medium uppercase tracking-[0.35em] text-[#f37021] sm:mb-4">
            {formatDate(post.date)}
          </time>
          <h1
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            className="text-[clamp(1.85rem,6.5vw,4.5rem)] font-light leading-[1.08] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:leading-[1.05]"
          >
            {decodeTitle(post.title.rendered)}
          </h1>
          <div className="mt-5 h-0.5 w-14 bg-[#f37021] sm:mt-6 sm:w-16" />
        </PageHero>

        {/* ── Content ── */}
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-16">
          <article
            className="wp-content wp-content--article"
            dangerouslySetInnerHTML={{ __html: rewriteContentHtml(post.content.rendered) }}
          />

          <div className="mt-16 border-t border-zinc-100 pt-8">
            <Link
              href="/#blog"
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400 hover:text-zinc-950"
            >
              ← Nazad na novosti
            </Link>
          </div>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
