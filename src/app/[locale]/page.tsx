import { HeroSection } from "@/components/hero/HeroSection";
import { CooperationRoadmap } from "@/components/roadmap/CooperationRoadmap";
import { StatsBanner } from "@/components/stats/StatsBanner";
import { ServicesSection } from "@/components/services/ServicesSection";
import { RealizacjeTeaserSection } from "@/components/case-studies/RealizacjeTeaserSection";
import { AboutGridSection } from "@/components/about/AboutGridSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CooperationRoadmap />
      <StatsBanner />
      <ServicesSection />
      <RealizacjeTeaserSection />
      <AboutGridSection />
    </>
  );
}
