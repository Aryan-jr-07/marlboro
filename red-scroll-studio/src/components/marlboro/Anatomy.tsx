import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import macro from "@/assets/pack-macro.jpg";

const notes = [
  { n: "I", label: "Geometry", text: "The chevron is built on a 1:1.618 golden proportion — coincidence or design, it reads as inevitable." },
  { n: "II", label: "Typography", text: "A condensed serif, all caps, tightly tracked. Editorial weight in a commercial object." },
  { n: "III", label: "Negative Space", text: "More white than red. The contrast is what carries across a crowded shelf at twenty paces." },
  { n: "IV", label: "Material", text: "Matte cardboard, warm to the touch, deliberately tactile. Packaging as ritual." },
];

export const Anatomy = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section ref={ref} className="relative w-full bg-background py-32 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Sticky image side */}
        <div className="md:sticky md:top-24 h-[60vh] md:h-[80vh] overflow-hidden">
          <motion.img
            src={macro}
            alt="Macro texture study"
            width={1600}
            height={1200}
            loading="lazy"
            style={{ y: imgY, scale: imgScale }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scrolling notes */}
        <div className="space-y-32 md:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent mb-4">Anatomy of an icon</p>
            <h3 className="font-display text-5xl md:text-6xl leading-[0.95]">
              Four details that <span className="font-italic-display text-primary">made it</span> a language.
            </h3>
          </div>

          {notes.map((note, i) => (
            <motion.div
              key={note.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="border-l-2 border-primary pl-6"
            >
              <div className="font-display text-accent text-sm mb-2">{note.n}.</div>
              <h4 className="font-display text-3xl mb-3">{note.label}</h4>
              <p className="text-muted-foreground leading-relaxed">{note.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
