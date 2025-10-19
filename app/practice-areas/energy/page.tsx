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
  title: "الطاقة | تحكيم ووساطة في النفط والغاز والطاقة المتجددة",
  description: "خدمات قانونية متخصصة لقطاع الطاقة تشمل النفط والغاز (upstream/downstream) والطاقة المتجددة، صياغة وتفاوض عقود FIDIC وPPAs، الحوكمة والامتثال (ESG، Compliance Framework)، وتسوية النزاعات عبر الحدود (بما فيها ICSID).",
  keywords: "طاقة, نفط, غاز, طاقة متجددة, Upstream, Downstream, PPAs, FIDIC, ICSID, ESG, Due Diligence, Compliance, تحكيم, وساطة, الجزائر, سوناطراك",
  openGraph: {
    title: "الطاقة | تحكيم ووساطة في النفط والغاز والطاقة المتجددة",
    description: "حلول قانونية مؤسسية لقطاع الطاقة: عقود FIDIC وPPAs، امتثال ESG، تسوية نزاعات عبر الحدود (ICSID).",
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
