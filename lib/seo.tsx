import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Human Reproduction Center Budva";
export const SITE_TAGLINE = "Centar za humanu reprodukciju";

const OG_DEFAULT = `${SITE_URL}/clinic-bg.jpg`;

type PageMetaArgs = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/** Build a Next.js Metadata object with OG / Twitter / canonical. */
export function pageMetadata({
  title,
  description = "Posvećeni vašem zdravlju uz najsavremeniju medicinsku njegu i individualizovani pristup.",
  path = "",
  image = OG_DEFAULT,
  type = "website",
  publishedTime,
}: PageMetaArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "sr_Latn",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

/** Schema.org JSON-LD for the medical clinic. */
export const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: SITE_NAME,
  alternateName: "HRC Budva",
  description: SITE_TAGLINE,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-t2.png`,
  image: OG_DEFAULT,
  telephone: ["+382 33 402 432", "+382 67 052 052"],
  email: "info@humanareprodukcija.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "bb XVI Ulica",
    addressLocality: "Budva",
    postalCode: "85310",
    addressCountry: "ME",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.2911,
    longitude: 18.8403,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "06:30",
      closes: "20:00",
    },
  ],
  medicalSpecialty: "Reproductive Medicine",
  hasMap: "https://maps.app.goo.gl/XRLPBsA1YMM4vaX38",
  sameAs: [],
};

/** JSON-LD for an article (news post). */
export function articleJsonLd(args: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: args.headline,
    description: args.description,
    datePublished: args.datePublished,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-t2.png` },
    },
    image: args.image ? [args.image] : [OG_DEFAULT],
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
  };
}

/** Render JSON-LD as a script element. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
