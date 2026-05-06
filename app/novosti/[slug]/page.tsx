import { ClinicFooter } from "@/components/site/ClinicFooter";
import { ClinicNavbar } from "@/components/site/ClinicNavbar";
import { decodeTitle, getPostBySlug } from "@/lib/wordpress";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sr-Latn-BA", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function NovostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <>
      <ClinicNavbar />
      <main className="min-h-screen" style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf4ed 100%)" }}>

        {/* ── Hero header ── */}
        <div className="bg-zinc-950 pb-16 pt-36">
          <div className="mx-auto max-w-4xl px-6 lg:px-16">
            <time className="mb-4 block text-[10px] font-medium uppercase tracking-[0.35em] text-[#f37021]">
              {formatDate(post.date)}
            </time>
            <h1
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              {decodeTitle(post.title.rendered)}
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-[#f37021]" />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-16">
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
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
