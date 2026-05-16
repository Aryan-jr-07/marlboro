import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pack from "@/assets/pack-hero.jpg";
import smoke from "@/assets/smoke.jpg";

export const PackShowcase = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const packY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const packRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const packScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.95]);
  const labelX = useTransform(scrollYProgress, [0.2, 0.8], [-100, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-[200vh] w-full overflow-hidden bg-background">
      <motion.div
        style={{ y: bgY, backgroundImage: `url(${smoke})` }}
        className="absolute inset-0 bg-cover bg-center opacity-30"
      />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Giant background type */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[28vw] text-stroke opacity-30 select-none">RED</span>
        </div>

        {/* The pack */}
        <motion.img
          src={pack}
          alt="Iconic red and white pack design study"
          width={1080}
          height={1920}
          style={{ y: packY, rotate: packRotate, scale: packScale }}
          className="relative z-10 h-[80vh] w-auto object-contain drop-shadow-[0_40px_80px_hsl(358_80%_30%/0.4)]"
        />

        {/* Floating callouts */}
        <motion.div
          style={{ x: labelX, opacity: labelOpacity }}
          className="absolute left-8 md:left-20 top-1/4 max-w-[200px] z-20"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-2">01 — Roof</div>
          <p className="text-sm text-muted-foreground">The chevron silhouette. A geometric signature recognized worldwide.</p>
        </motion.div>

        <motion.div
          style={{ x: useTransform(scrollYProgress, [0.3, 0.9], [100, 0]), opacity: labelOpacity }}
          className="absolute right-8 md:right-20 bottom-1/4 max-w-[220px] z-20 text-right"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-2">02 — Trim</div>
          <p className="text-sm text-muted-foreground">A single line of gold. Restraint as luxury.</p>
        </motion.div>
      </div>
    </section>
  );
};
