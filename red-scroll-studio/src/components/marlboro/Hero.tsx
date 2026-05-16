import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import smoke from "@/assets/smoke.jpg";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const smokeY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-background vignette">
      {/* Smoke layer (slowest) */}
      <motion.div
        style={{ y: smokeY, backgroundImage: `url(${smoke})` }}
        className="absolute inset-0 bg-cover bg-center opacity-70 animate-drift"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Massive wordmark (mid) */}
      <motion.div
        style={{ y: wordY, scale: wordScale, opacity: fade }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="font-display text-[18vw] md:text-[14vw] leading-none text-primary select-none drop-shadow-[0_0_60px_hsl(var(--primary)/0.5)]">
          MARLBORO
        </h1>
      </motion.div>

      {/* Foreground subtitle */}
      <motion.div
        style={{ y: subY, opacity: fade }}
        className="absolute inset-x-0 bottom-32 flex flex-col items-center text-center px-6"
      >
        <p className="text-xs uppercase tracking-[0.6em] text-muted-foreground mb-4">A design homage</p>
        <p className="font-italic-display text-3xl md:text-5xl text-foreground/90">
          Born <span className="text-primary">Bold</span>.
        </p>
      </motion.div>

      {/* Ember glow */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-ember animate-ember-pulse shadow-[0_0_40px_20px_hsl(var(--ember)/0.6)]"
      />

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-scroll-hint"
      >
        Scroll
      </motion.div>

      {/* Top nav */}
      <div className="absolute top-0 inset-x-0 z-10 flex justify-between items-center px-8 py-6">
        <img src="/marlboro-logo.png" alt="Marlboro" className="h-6 w-auto mix-blend-screen opacity-90" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Est. 1924 — Concept</span>
      </div>
    </section>
  );
};
