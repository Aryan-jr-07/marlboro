import { AgeGate } from "@/components/marlboro/AgeGate";
import { Hero } from "@/components/marlboro/Hero";
import { PackShowcase } from "@/components/marlboro/PackShowcase";
import { CigaretteLighterParallax } from "@/components/marlboro/CigaretteLighterParallax";
import { Collection } from "@/components/marlboro/Collection";
import { RedStudy } from "@/components/marlboro/RedStudy";
import { Anatomy } from "@/components/marlboro/Anatomy";
import { Heritage } from "@/components/marlboro/Heritage";
import { SiteFooter } from "@/components/marlboro/SiteFooter";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Marlboro Red — A Cinematic Design Homage";
    const desc = "A creative scroll-driven design study of the Marlboro Red pack. Fictional homage exploring iconic typography, color and packaging.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="grain bg-background text-foreground">
      <AgeGate />
      <Hero />
      <PackShowcase />
      <CigaretteLighterParallax />
      <Collection />
      <RedStudy />
      <Anatomy />
      <Heritage />
      <SiteFooter />
    </main>
  );
};

export default Index;
