import { Metadata } from "next";
import { AboutContent } from "@/sections/about-content";

export const metadata: Metadata = {
  title: "About | Project Move",
  description: "Learn about Project Move, our vision, goals, and philosophy behind MoveOS.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <AboutContent />
    </div>
  );
}
