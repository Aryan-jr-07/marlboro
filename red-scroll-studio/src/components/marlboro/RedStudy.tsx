import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import smoke from "@/assets/smoke.jpg";

export const RedStudy = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const smokeX = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const hexY = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);

  return (
    <section ref={ref} className="relative h-[140vh] w-full overflow-hidden bg-primary">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ x: smokeX, backgroundImage: `url(${smoke})` }}
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-[hsl(358_80%_28%)]" />

        <motion.h2
          style={{ y: textY }}
          className="relative z-10 font-display text-[12vw] md:text-[8vw] leading-[0.85] text-primary-foreground text-center px-6"
        >
          One color.<br />
          <span className="font-italic-display">Instantly</span> known.
        </motion.h2>

        <motion.div
          style={{ y: hexY }}
          className="absolute right-8 md:right-16 bottom-16 text-primary-foreground/70 text-right"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] mb-1">Pantone</div>
          <div className="font-display text-3xl">186 C</div>
          <div className="text-xs mt-2 font-mono">#C8102E</div>
        </motion.div>
      </div>
    </section>
  );
};
