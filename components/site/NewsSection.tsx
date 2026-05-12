import { FadeIn } from "@/components/site/FadeIn";
import { decodeTitle, stripHtml, type WPPost } from "@/lib/wordpress";
import Link from "next/link";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sr-Latn-BA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = { posts: WPPost[] };

export function NewsSection({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section id="blog" className="py-16 lg:py-24" style={{ background: "linear-gradient(160deg,#fff9f5 0%,#fdf3eb 100%)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        <FadeIn className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#f37021]">
                Novosti
              </p>
              <h2
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                className="text-[clamp(2.2rem,4vw,4rem)] font-normal leading-[1.12] tracking-tight text-zinc-950"
              >
                Iz centra i nauke
              </h2>
            </div>
          </div>
          <div className="mt-6 h-px bg-zinc-200" />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post, i) => (
            <FadeIn key={post.id} delay={((i % 2) * 100) as 0 | 100 | 200 | 300 | 400 | 500}>
              <Link
                href={`/novosti/${post.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-zinc-200/70 bg-white p-7 shadow-[0_1px_3px_rgba(24,24,27,0.06)] transition-all hover:border-zinc-300/90 hover:shadow-md"
              >
                <time className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#f37021]">
                  {formatDate(post.date)}
                </time>
                <h3
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  className="text-[clamp(1.4rem,2.5vw,2rem)] font-light leading-[1.15] tracking-tight text-zinc-950"
                >
                  {decodeTitle(post.title.rendered)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {stripHtml(post.excerpt.rendered).slice(0, 160).trim()}
                  {stripHtml(post.excerpt.rendered).length > 160 ? "…" : ""}
                </p>
                <span className="mt-auto text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-[#f37021]">
                  Pročitaj više →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
