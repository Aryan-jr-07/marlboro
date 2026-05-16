import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import packRed from "@/assets/pack-red.jpg";
import packGold from "@/assets/pack-gold.jpg";
import packSilver from "@/assets/pack-silver.jpg";
import packBlack from "@/assets/pack-black.jpg";
import packIce from "@/assets/pack-ice.jpg";

type Variant = {
  name: string;
  tag: string;
  note: string;
  img: string;
  accent: string;
};

const variants: Variant[] = [
  { name: "Red", tag: "Original", note: "The icon. Crimson chevron, gold trim.", img: packRed, accent: "hsl(358 78% 46%)" },
  { name: "Gold", tag: "Fine Cut", note: "Navy & gold. A quieter confidence.", img: packGold, accent: "hsl(38 75% 55%)" },
  { name: "Silver", tag: "Lights", note: "Brushed metal restraint.", img: packSilver, accent: "hsl(0 0% 75%)" },
  { name: "Black", tag: "Edition", note: "Matte black. Crimson signature roof.", img: packBlack, accent: "hsl(358 78% 46%)" },
  { name: "Ice", tag: "Menthol", note: "Ice blue, frosted geometry.", img: packIce, accent: "hsl(200 80% 55%)" },
];

const PackCard = ({ v, index, onClick }: { v: Variant; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 20, y: px * 25 });
    setMousePos({ x: (px + 0.5) * 100, y: (py + 0.5) * 100 });
  };
  const onLeave = () => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      className="relative shrink-0 w-[65vw] md:w-[38vw] lg:w-[28vw] aspect-[3/4.2] cursor-pointer group"
      style={{ perspective: 1500 }}
    >
      {/* Dynamic Glow */}
      <div
        className="absolute inset-0 rounded-2xl blur-[100px] transition-all duration-1000 -z-10 pointer-events-none"
        style={{ 
          background: v.accent, 
          opacity: hover ? 0.4 : 0,
          transform: hover ? "scale(1.1)" : "scale(0.8)" 
        }}
      />

      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hover ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full h-full rounded-2xl border border-white/10 bg-black shadow-2xl overflow-visible pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Deeper 3D Cigarettes (Hover preview) */}
        <motion.div
          initial={false}
          animate={{ 
            y: hover ? "-25%" : "15%", 
            opacity: hover ? 1 : 0,
            z: hover ? -40 : -100
          }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="absolute top-0 left-0 w-full flex justify-center gap-[4px] px-10 pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-[12%] aspect-[1/7] flex flex-col relative" 
              style={{ 
                transform: `translateY(${Math.abs(i - 2) * 6}px) rotate(${(i - 2) * 2}deg) translateZ(-50px)`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
            >
               <div className="h-[40%] w-full bg-[#d9a05b] relative rounded-t-[3px] overflow-hidden">
                 <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />
                 <div className="absolute bottom-0 w-full h-[3px] bg-[#8a5d2e] opacity-60" />
               </div>
               <div className="flex-1 w-full bg-[#f8f8f8] relative">
                 <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,black_4px,black_5px)]" />
               </div>
            </div>
          ))}
        </motion.div>

        {/* Main Card Face */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden z-10 bg-[#0a0a0a] border border-white/5 pointer-events-auto">
          <motion.img
            src={v.img}
            alt={v.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none"
            animate={{ 
              scale: hover ? 1.15 : 1,
              x: hover ? tilt.y * 0.5 : 0,
              y: hover ? -tilt.x * 0.5 : 0
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `linear-gradient(${mousePos.x + mousePos.y}deg, transparent 0%, ${v.accent} 20%, rgba(255,255,255,0.4) 50%, ${v.accent} 80%, transparent 100%)`,
              backgroundSize: "200% 200%",
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hover ? 1 : 0,
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />

          <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none">
            <motion.div
              animate={{ z: hover ? 60 : 0, y: hover ? -10 : 0 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="text-[12px] font-bold uppercase tracking-[0.5em] mb-3 transition-all duration-500"
                style={{ color: hover ? v.accent : "rgba(255,255,255,0.4)", textShadow: hover ? `0 0 20px ${v.accent}` : "none" }}
              >
                {v.tag}
              </div>
              <h3 className="font-display text-6xl md:text-7xl leading-none mb-4 text-white drop-shadow-2xl">{v.name}</h3>
              <p className="text-sm text-white/50 max-w-[22ch] leading-relaxed italic">"{v.note}"</p>
            </motion.div>
          </div>

          <div className="absolute top-6 left-8 text-xs font-mono tracking-[0.4em] text-white/20 pointer-events-none">
            SEC. {String(index + 1).padStart(2, "0")}
          </div>

          <motion.div
            initial={false}
            animate={{ scaleX: hover ? 1 : 0.4, opacity: hover ? 1 : 0.2 }}
            className="absolute bottom-0 left-0 h-[4px] w-full origin-left pointer-events-none"
            style={{ background: v.accent, boxShadow: hover ? `0 0 30px ${v.accent}` : "none" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   Individual Cigarette — scroll-driven emergence
   Each cigarette has its own staggered timing window within the
   overall scrollYProgress (0→1). It rises up, then fans left/right.
   ────────────────────────────────────────────────────────────────── */
const Cigarette = ({
  index,
  scrollYProgress,
  total,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) => {
  // Stagger each cigarette so they emerge one-by-one.
  // Phase 0-0.12 = lid opening. Cigarettes use 0.12-0.95.
  const staggerRange = 0.83; // total scroll range for all cigarettes
  const perCig = staggerRange / total;
  const start = 0.12 + index * perCig;
  const end = Math.min(start + perCig * 2.5, 0.95); // overlap for smoothness

  // How far this cigarette has risen (0 = inside pack, 1 = fully out)
  const emergence = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });

  // Rise from inside the pack — taller travel for realistic proportions
  const y = useTransform(emergence, [0, 1], [0, -320]);

  // Fan direction: first 5 go left (negative), last 5 go right (positive)
  const isLeft = index < 5;
  const posInGroup = isLeft ? index : index - 5; // 0-4 within each group
  const fanMultiplier = isLeft ? -(5 - posInGroup) : (posInGroup + 1);

  const rotate = useTransform(emergence, [0, 0.3, 1], [0, 0, fanMultiplier * 10]);
  const xOffset = useTransform(emergence, [0, 0.3, 1], [0, 0, fanMultiplier * 28]);
  const opacity = useTransform(emergence, [0, 0.05], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        x: xOffset,
        rotate,
        opacity,
        position: "absolute",
        left: "50%",
        bottom: "18%",
        marginLeft: `${(index - 4.5) * 10}px`,
        width: "14px",
        zIndex: 10 - Math.abs(index - 4),
        transformOrigin: "bottom center",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          width: "14px",
          height: "180px",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.7))",
        }}
      >
        {/* Filter tip */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "30%",
            width: "100%",
            background: "linear-gradient(180deg, #c4883d 0%, #d9a05b 40%, #c89244 100%)",
            borderRadius: "2px 2px 0 0",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)",
            }}
          />
          <div
            className="absolute bottom-0 w-full"
            style={{ height: "1px", background: "#8a5d2e", opacity: 0.6 }}
          />
          {/* Gold band */}
          <div
            className="absolute w-full"
            style={{
              bottom: "1px",
              height: "2px",
              background: "linear-gradient(90deg, #b8860b, #daa520, #b8860b)",
              opacity: 0.5,
            }}
          />
        </div>
        {/* White paper body */}
        <div
          className="relative flex-1"
          style={{
            background: "linear-gradient(90deg, #e8e8e8 0%, #f8f8f8 30%, #ffffff 60%, #f0f0f0 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 4px, #000 4px, #000 5px)",
            }}
          />
          {/* Side shadow for roundness */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow: "inset -3px 0 6px rgba(0,0,0,0.12), inset 3px 0 6px rgba(0,0,0,0.06)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   SelectedPackView — full-screen scroll-driven pack opening
   Phase 1 (scroll 0→0.12):  Lid hinges open with 3D rotation
   Phase 2 (scroll 0.12→0.95): Cigarettes emerge one-by-one
   ────────────────────────────────────────────────────────────────── */
const SelectedPackView = ({ v, onClose }: { v: Variant; onClose: () => void }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Parallax exit drag tracking
  const rawExitY = useMotionValue(0);
  const exitY = useSpring(rawExitY, { stiffness: 200, damping: 30 });
  const exitOpacity = useSpring(useMotionValue(1), { stiffness: 200, damping: 30 });
  const DISMISS_THRESHOLD = 160;

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Lid rotation: 0° (closed) → -110° (fully open, hinged backward)
  const lidRotate = useTransform(scrollYProgress, [0, 0.12], [0, -110], { clamp: true });
  const lidShadow = useTransform(scrollYProgress, [0, 0.12], [0, 30]);

  // Label that tells user what's happening
  const instructionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.08, 0.12], [1, 1, 0.5, 0]);
  const cigaretteLabel = useTransform(scrollYProgress, [0.12, 0.18], [0, 1]);
  const backHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // Overall pack subtle lift
  const packScale = useTransform(scrollYProgress, [0, 0.12], [1, 1.02]);

  // Warning text — fades in after all 10 cigarettes have fully emerged
  const warningOpacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1], { clamp: true });
  const warningSlideLeft = useTransform(scrollYProgress, [0.88, 0.95], [-40, 0]);
  const warningSlideRight = useTransform(scrollYProgress, [0.88, 0.95], [40, 0]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  // Scroll-up-to-close: wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let accumulated = 0;

    const handleWheel = (e: WheelEvent) => {
      if (container.scrollTop <= 0 && e.deltaY < 0) {
        accumulated = Math.min(accumulated + Math.abs(e.deltaY), DISMISS_THRESHOLD);
        rawExitY.set(accumulated * 0.6);
        exitOpacity.set(1 - accumulated / DISMISS_THRESHOLD * 0.5);
        if (accumulated >= DISMISS_THRESHOLD) onClose();
      } else {
        accumulated = Math.max(0, accumulated - Math.abs(e.deltaY) * 0.3);
        rawExitY.set(accumulated * 0.6);
        exitOpacity.set(1 - accumulated / DISMISS_THRESHOLD * 0.5);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [onClose, rawExitY, exitOpacity]);

  // Scroll-up-to-close: touch
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let startY = 0;
    let accumulated = 0;

    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const dy = e.touches[0].clientY - startY;
      if (container.scrollTop <= 0 && dy > 0) {
        accumulated = Math.min(dy, DISMISS_THRESHOLD);
        rawExitY.set(accumulated * 0.6);
        exitOpacity.set(1 - accumulated / DISMISS_THRESHOLD * 0.5);
        if (accumulated >= DISMISS_THRESHOLD) onClose();
      }
    };
    const handleTouchEnd = () => {
      accumulated = 0;
      rawExitY.set(0);
      exitOpacity.set(1);
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onClose, rawExitY, exitOpacity]);

  return (
    <motion.div
      ref={scrollContainerRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80, transition: { duration: 0.4 } }}
      transition={{ duration: 0.5 }}
      style={{ y: exitY, opacity: exitOpacity }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl overflow-y-auto"
    >
      {/* Scrollable height drives the animation */}
      <div ref={targetRef} className="h-[600vh] w-full relative">
        {/* Scroll-up hint */}
        <motion.div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[210] flex flex-col items-center gap-1 pointer-events-none"
          style={{ opacity: backHintOpacity }}
        >
          <div className="w-[1px] h-6 bg-gradient-to-t from-white/30 to-transparent" />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/30">↑ scroll up to go back</div>
        </motion.div>

        {/* Sticky visual scene — stays in view while scrolling */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Ambient glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] pointer-events-none"
            style={{
              backgroundColor: v.accent,
              width: "55vw",
              height: "55vw",
              opacity: useTransform(scrollYProgress, [0, 0.12, 0.5], [0.1, 0.25, 0.35]),
            }}
          />

          {/* Pack + Cigarettes Container */}
          <motion.div
            className="relative"
            style={{
              width: "min(70vw, 320px)",
              perspective: "1200px",
              scale: packScale,
            }}
          >
            {/* ── CIGARETTES (behind the pack body) ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 5 }}
            >
              {[...Array(10)].map((_, i) => (
                <Cigarette
                  key={i}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  total={10}
                />
              ))}
            </div>

            {/* ── PACK BODY ── */}
            <div
              className="relative rounded-xl overflow-hidden border border-white/10"
              style={{
                aspectRatio: "3 / 4.2",
                zIndex: 15,
                boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <img
                src={v.img}
                alt={v.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              {/* Pack label */}
              <div className="absolute bottom-6 left-6 text-white z-10">
                <div
                  className="text-[10px] uppercase tracking-[0.4em] mb-1"
                  style={{ color: v.accent, opacity: 0.8 }}
                >
                  {v.tag}
                </div>
                <div className="font-display text-4xl md:text-5xl">{v.name}</div>
              </div>
            </div>

            {/* ── LID (hinged flap) ── */}
            <motion.div
              className="absolute left-0 right-0 overflow-hidden border border-white/10"
              style={{
                top: 0,
                height: "26%",
                zIndex: 20,
                transformOrigin: "top center",
                rotateX: lidRotate,
                borderRadius: "12px 12px 0 0",
                boxShadow: useTransform(lidShadow, s => `0 ${s}px ${s * 2}px rgba(0,0,0,0.5)`),
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Front face of lid */}
              <div className="w-full h-full relative">
                <img
                  src={v.img}
                  alt=""
                  className="w-full object-cover"
                  style={{
                    height: "430%",
                    objectPosition: "top",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
              </div>
            </motion.div>

            {/* ── LID inner face (visible when lid opens) ── */}
            <motion.div
              className="absolute left-0 right-0"
              style={{
                top: 0,
                height: "26%",
                zIndex: 19,
                background: "linear-gradient(180deg, #2a1a0a 0%, #1a0f05 100%)",
                borderRadius: "12px 12px 0 0",
                opacity: useTransform(scrollYProgress, [0, 0.06], [0, 1]),
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Inner foil detail */}
              <div
                className="absolute inset-2 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #c4a060 0%, #8a6d3b 30%, #c4a060 60%, #8a6d3b 100%)",
                  opacity: 0.3,
                }}
              />
              <div
                className="absolute inset-3 rounded-md flex items-center justify-center"
                style={{
                  border: "1px solid rgba(196,160,96,0.2)",
                }}
              >
                <span
                  className="text-[8px] uppercase tracking-[0.3em] text-center"
                  style={{ color: "rgba(196,160,96,0.4)" }}
                >
                  Pull tab
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── UI labels ── */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            style={{ opacity: instructionOpacity }}
          >
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-3">
              Scroll to open the pack
            </div>
            <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            style={{ opacity: cigaretteLabel }}
          >
            <div className="text-[11px] uppercase tracking-[0.4em] text-white/50 mb-3">
              Keep scrolling — cigarettes emerging
            </div>
            <motion.div
              className="w-[1px] h-10 mx-auto"
              style={{
                background: `linear-gradient(to bottom, ${v.accent}80, transparent)`,
              }}
            />
          </motion.div>

          {/* ── WARNING TEXT — appears after all 10 cigarettes emerge ── */}
          {/* Left warning */}
          <motion.div
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              opacity: warningOpacity,
              x: warningSlideLeft,
            }}
          >
            <div
              className="flex flex-col items-center gap-4"
              style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
            >
              <div
                className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.5em] leading-relaxed"
                style={{
                  color: "#dc2626",
                  textShadow: "0 0 30px rgba(220,38,38,0.5), 0 0 60px rgba(220,38,38,0.2)",
                }}
              >
                Tobacco Causes Painful Death
              </div>
            </div>
          </motion.div>

          {/* Right warning */}
          <motion.div
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              opacity: warningOpacity,
              x: warningSlideRight,
            }}
          >
            <div
              className="flex flex-col items-center gap-4"
              style={{ writingMode: "vertical-lr" }}
            >
              <div
                className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.5em] leading-relaxed"
                style={{
                  color: "#dc2626",
                  textShadow: "0 0 30px rgba(220,38,38,0.5), 0 0 60px rgba(220,38,38,0.2)",
                }}
              >
                Tobacco Causes Painful Death
              </div>
            </div>
          </motion.div>

          {/* Variant name watermark */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              fontSize: "min(25vw, 200px)",
              fontFamily: "var(--font-display)",
              color: v.accent,
              opacity: 0.03,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {v.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Collection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-78%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <>
      <section ref={ref} className="relative h-[420vh] bg-background">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1/3 left-1/4 w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-20 bg-primary" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-10 bg-accent" />
          </div>

          <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative px-8 md:px-20 mb-10 md:mb-14">
            <div className="text-xs uppercase tracking-[0.4em] text-accent mb-3">The Collection</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
              One silhouette.<br />
              <span className="font-italic-display text-primary">Many moods.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md text-sm">
              Scroll to drift through the family. Click any pack to open it.
            </p>
          </motion.div>

          <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-8 md:px-20 will-change-transform">
            {variants.map((v, i) => (
              <PackCard key={v.name} v={v} index={i} onClick={() => setSelectedVariant(v)} />
            ))}
            <div className="shrink-0 w-[20vw] flex items-center">
              <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">End of line —</div>
            </div>
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            ← scroll →
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedVariant && (
          <SelectedPackView v={selectedVariant} onClose={() => setSelectedVariant(null)} />
        )}
      </AnimatePresence>
    </>
  );
};
