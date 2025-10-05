import { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import HeroSection from "@/components/energy/HeroSection";
import StatsSection from "@/components/energy/StatsSection";
import ServicesSection from "@/components/energy/ServicesSection";
import AboutSection from "@/components/energy/AboutSection";
import AdvantagesSection from "@/components/energy/AdvantagesSection";
import CtaSection from "@/components/energy/CtaSection";
import { EnergyService, EnergyStat } from "@/lib/energy-types";

// Import JSON data
import energyServices from "@/data/energy-services.json";
import energyStats from "@/data/energy-stats.json";

export const metadata: Metadata = {
  title: "مجال الطاقة | سوناطراك والخدمات القانونية المتخصصة",
  description: "خدمات قانونية متخصصة في قطاع الطاقة، بما في ذلك النفط والغاز والطاقة المتجددة، مع خبرة في التعامل مع سوناطراك وشركات الطاقة الكبرى.",
  keywords: "سوناطراك, طاقة, نفط, غاز, طاقة متجددة, استشارات قانونية, الجزائر",
  openGraph: {
    title: "مجال الطاقة | سوناطراك والخدمات القانونية المتخصصة",
    description: "خدمات قانونية متخصصة في قطاع الطاقة، بما في ذلك النفط والغاز والطاقة المتجددة.",
    images: [
      {
        url: "/sonatrach.jfif",
        width: 1200,
        height: 630,
        alt: "سوناطراك - قطاع الطاقة الجزائري"
      }
    ]
  }
};

export default function Energy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <HeroSection stats={energyStats as EnergyStat[]} />

      {/* Stats Section */}
      <StatsSection stats={energyStats as EnergyStat[]} />

      {/* About Sonatrach */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection services={energyServices as EnergyService[]} />

      {/* Why Choose Us */}
      <AdvantagesSection />

      {/* CTA */}
      <CtaSection />

      <Footer />
    </main>
  );
}
