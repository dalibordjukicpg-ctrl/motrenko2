import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { NavbarServer } from "@/components/site/NavbarServer";
import { BookConsultProvider } from "@/components/site/BookConsultProvider";
import { JsonLd, SITE_NAME, SITE_URL, clinicJsonLd } from "@/lib/seo";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Centar za humanu reprodukciju`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Vodeći centar za humanu reprodukciju u Crnoj Gori. Najsavremenija reproduktivna medicina, IVF, krioprezervacija i individualizovan pristup svakom paru.",
  keywords: [
    "humana reprodukcija",
    "IVF",
    "vantjelesna oplodnja",
    "Budva",
    "Crna Gora",
    "ginekologija",
    "reproduktivna medicina",
    "Motrenko",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "sr_Latn",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo-t2.png", apple: "/logo-t2.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${lora.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-zinc-900">
        <BookConsultProvider>
          <NavbarServer />
          {children}
          <ScrollToTop />
        </BookConsultProvider>
        <JsonLd data={clinicJsonLd} />
      </body>
    </html>
  );
}
