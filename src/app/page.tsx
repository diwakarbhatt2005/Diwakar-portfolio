import { ContactSection } from "@/components/contact/ContactSection";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { Skillset } from "@/components/skills/Skillset";
import { SelectedWork } from "@/components/work/SelectedWork";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <ClientsSection />
      <SelectedWork />
      <Skillset />
      <Experience />
      <ContactSection />
    </main>
  );
}
