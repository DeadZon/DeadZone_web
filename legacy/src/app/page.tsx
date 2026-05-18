import { Metadata } from "next";
import { HeroSection } from "@/sections/hero-section";
import { IntroSection } from "@/sections/intro-section";
import { PreviewSection } from "@/sections/preview-section";
import { CTASection } from "@/sections/cta-section";
import { StatsSection } from "@/sections/stats-section";

export const metadata: Metadata = {
  title: "Project Move | MoveOS - Performance Beyond Limits",
  description: "Custom Android ROM for MediaTek Xiaomi/Redmi/Poco devices. Experience performance beyond limits with MoveOS.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <IntroSection />
      <PreviewSection />
      <CTASection />
    </>
  );
}
