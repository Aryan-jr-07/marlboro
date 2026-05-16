import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import landscape from "@/assets/landscape.jpg";

export const Heritage = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.4]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section ref={ref} className="relative h-[120vh] w-full overflow-hidden bg-background">
      <motion.div
        style={{ y: bgY, scale: bgScale, backgroundImage: `url(${landscape})` }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <motion.div style={{ y: textY }} className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-accent mb-6">Cultural footprint</p>
          <h3 className="font-display text-4xl md:text-6xl leading-tight mb-8">
            A pack became <span className="font-italic-display text-primary">a horizon</span>, and a horizon became <span className="font-italic-display text-primary">a myth</span>.
          </h3>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            For decades the brand sold a feeling more than a product — wide skies, solitude, freedom. This page studies that feeling as a piece of design history, not as an invitation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
