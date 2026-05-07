import { ClinicFooter }    from "@/components/site/ClinicFooter";
import { ClinicNavbar }    from "@/components/site/ClinicNavbar";
import { CtaBanner }       from "@/components/site/CtaBanner";
import { HeroSection }     from "@/components/site/HeroSection";
import { NewsSection }     from "@/components/site/NewsSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { StatsSection }    from "@/components/site/StatsSection";
import { StorySection }    from "@/components/site/StorySection";
import { TeamSection }     from "@/components/site/TeamSection";
import { getMenu, getPageWithImage, getPostBySlug, getPostsByCategory, getStaff, stripHtml } from "@/lib/wordpress";

const WP_UPLOADS = process.env.NEXT_PUBLIC_WP_UPLOADS ?? "http://localhost/Motrenko/wp-content/uploads";

export default async function Home() {
  const [menuItems, newsPosts, opstiPodaci, bebPost, staff] = await Promise.all([
    getMenu("primary").catch(() => []),
    getPostsByCategory(1, 4).catch(() => []),
    getPageWithImage("opsti-podaci").catch(() => null),
    getPostBySlug("centar-za-humanu-reprodukciju-proslavio-1-000-rodjenih-beba-za-deset-godina-postojanja").catch(() => null),
    getStaff(8).catch(() => []),
  ]);

  const bebExcerpt = bebPost
    ? stripHtml(bebPost.excerpt.rendered)
    : "Centar za humanu reprodukciju iz Budve proslavio je posebnu svečanost povodom deset godina postojanja tokom kojih je stručni tim pomogao ostvariti san o roditeljstvu hiljadama parova.";

  const stories = [
    {
      eyebrow: "Naša priča",
      heading: opstiPodaci?.title ?? "Naš put",
      body: opstiPodaci?.excerpt ?? "Osnovan od strane tima vodećih specijalista reproduktivne medicine, naš centar je referentna tačka u regionu.",
      cta: "O nama",
      ctaHref: "/stranica/opsti-podaci",
      image: `${WP_UPLOADS}/2025/09/DUS_6996c-scaled.jpg`,
      reverse: false,
    },
    {
      eyebrow: "Prostor koji inspiriše",
      heading: "Naš prostor",
      body: "Centar se nalazi u objektu opremljenom najsavremenijom medicinskom tehnologijom prema EU standardima. Idealno smješten i osmišljen tako da svaka posjeta bude što ugodnija.",
      cta: "Pogledajte prostor",
      ctaHref: "#",
      image: `${WP_UPLOADS}/2025/07/centar-za-humanu-reprodukciju-budva-naslovna-humanreproduction.jpg`,
      reverse: true,
    },
    {
      eyebrow: "Zamrzavanje jajnih ćelija",
      heading: "Krioprezervacija",
      body: "Revolucionarni naučni napredak koji ženama pruža kontrolu nad reproduktivnom budućnošću. Naš laboratorij primjenjuje najnaprednije protokole krioprezervacije dostupne danas.",
      cta: "Saznajte više",
      ctaHref: "/stranica/krioprezervacija-embriona-zamrzavanje-embriona-vitrifikacija-embriona",
      image: `${WP_UPLOADS}/2025/05/DAN-3-3.jpg`,
      reverse: false,
    },
    {
      eyebrow: "1.000 naših beba",
      heading: "Deset godina, hiljadu života",
      body: bebExcerpt,
      cta: "Pročitajte priču",
      ctaHref: "/novosti/centar-za-humanu-reprodukciju-proslavio-1-000-rodjenih-beba-za-deset-godina-postojanja",
      image: `${WP_UPLOADS}/2025/07/centar-za-humanu-reprodukciju-budva-1000-beba-humanreproduction.jpg`,
      reverse: true,
    },
  ];

  return (
    <>
      <ClinicNavbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection items={menuItems} />
        <StorySection stories={stories} />
        <TeamSection staff={staff} />
        <NewsSection posts={newsPosts} />
        <CtaBanner />
      </main>
      <ClinicFooter />
    </>
  );
}
