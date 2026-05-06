import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import { ScrollToTop } from "@/components/site/ScrollToTop";
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
  title: "Human Reproduction Center | Budva",
  description:
    "Posvećeni vašem zdravlju uz najsavremeniju medicinsku njegu i individualizovani pristup.",
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
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
