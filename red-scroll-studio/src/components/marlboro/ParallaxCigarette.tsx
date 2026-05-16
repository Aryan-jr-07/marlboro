import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ParallaxCigarette = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  // Timeline mapped to 0-1 (0-100%)
  // 0.00 - 0.20: Pack opens, cigarette emerges
  // 0.20 - 0.40: Lighter moves toward the cigarette
  // 0.40 - 0.60: Lighter ignites, flame grows, tip starts glowing
  // 0.60 - 0.80: Lighter moves away, cigarette is fully lit
  // 0.80 - 1.00: Smoke increases, glow intensifies

  // Pack & Cigarette emerges
  const lidRotate = useTransform(scrollYProgress, [0.05, 0.15], [0, -115]);
  const cigaretteY = useTransform(scrollYProgress, [0.10, 0.25], [120, -155]);
  const cigaretteOpacity = useTransform(scrollYProgress, [0.05, 0.10], [0, 1]);
  
  // Background darkens to make glow stand out
  const bgDarkenOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 0.85]);
  
  // Lighter Movement
  const lighterX = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [300, 22, 22, 300]);
  const lighterY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [100, -145, -145, 100]);
  const lighterRotate = useTransform(scrollYProgress, [0.2, 0.35, 0.4, 0.6, 0.8], [45, 10, -15, -15, 45]);
  const lighterLidRotate = useTransform(scrollYProgress, [0.3, 0.4], [0, 120]);
  
  // Lighter Flame
  const flameScale = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1.2, 1, 0]);
  const flameOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  
  // Cigarette Tip (Gradually turns red/orange/glowing)
  const tipGlowOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const tipDarkenOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  
  // Smoke (Opacity increases with scroll)
  const smokeOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  
  // Optional: keep it centered in view
  const containerScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);

  return (
    <section ref={containerRef} className="relative h-[600vh] w-full bg-background overflow-hidden">
      {/* Dark overlay for making glow effects stand out */}
      <motion.div 
        className="fixed inset-0 bg-black pointer-events-none z-0" 
        style={{ opacity: bgDarkenOpacity }}
      />
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">
        
        <motion.div 
          className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center"
          style={{ scale: containerScale }}
        >
          {/* Decorative text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-display text-[18vw] text-stroke opacity-10 select-none tracking-widest">IGNITE</span>
          </div>

          <div className="relative w-[180px] h-[280px] z-10 flex flex-col items-center mt-32">
            
            {/* The Realistic Cigarette */}
            <motion.div 
              className="absolute top-0 w-[24px] z-0 flex flex-col items-center origin-bottom drop-shadow-xl"
              style={{ 
                y: cigaretteY,
                opacity: cigaretteOpacity
              }}
            >
              {/* Smoke Effects (opacity increases with scroll) */}
              <motion.div 
                className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[120px] h-[200px] pointer-events-none flex justify-center"
                style={{ opacity: smokeOpacity }}
              >
                <div className="w-[3px] h-[30px] bg-white/70 blur-[5px] animate-smoke-wispy-1 absolute bottom-0 origin-bottom" />
                <div className="w-[5px] h-[50px] bg-white/50 blur-[8px] animate-smoke-wispy-2 absolute bottom-[10px] origin-bottom" />
                <div className="w-[10px] h-[70px] bg-white/30 blur-[15px] animate-smoke-wispy-3 absolute bottom-[30px] origin-bottom" />
              </motion.div>

              {/* The Tip (Gradually turns red/orange/glowing) */}
              <div className="w-full h-4 relative">
                 {/* Burnt Ash overlay */}
                 <motion.div 
                   className="absolute inset-0 bg-[#333] rounded-t-[2px]"
                   style={{ opacity: tipDarkenOpacity }}
                 >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-80" />
                 </motion.div>
                 
                 {/* Warm Glow around lit tip */}
                 <motion.div 
                   className="absolute inset-0 mix-blend-screen"
                   style={{ opacity: tipGlowOpacity }}
                 >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ff3300] to-[#ffaa00] rounded-t-[2px] animate-pulse-fast" />
                    {/* Intense cherry core */}
                    <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[140%] h-[12px] bg-[#ff4500] blur-[4px] rounded-full animate-pulse-fast shadow-[0_0_20px_#ff2a00,0_0_40px_#ff0000]" />
                    <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[60%] h-[4px] bg-[#ffffff] blur-[2px] rounded-full" />
                 </motion.div>
              </div>

              {/* White/Cream Cylinder Paper */}
              <div className="w-full h-[140px] bg-[#fdfdfd] relative shadow-[inset_-4px_0_8px_rgba(0,0,0,0.15),inset_2px_0_4px_rgba(255,255,255,0.9)]">
                <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_5px,rgba(0,0,0,1)_5px,rgba(0,0,0,1)_6px)]" />
              </div>

              {/* Brown Filter */}
              <div className="w-full h-[45px] bg-[#d9a05b] relative overflow-hidden shadow-[inset_-4px_0_8px_rgba(0,0,0,0.3),inset_2px_0_4px_rgba(255,255,255,0.4)]">
                <div className="absolute inset-0 mix-blend-multiply opacity-60 bg-[url('https://www.transparenttextures.com/patterns/cork-wallet.png')]" />
                <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-[#b57a35] via-[#e8c07d] to-[#8c571c]" />
              </div>
            </motion.div>

            {/* The Metallic Lighter */}
            <motion.div 
              className="absolute z-20 top-0 left-1/2 w-[55px] h-[75px] origin-bottom-right"
              style={{ x: lighterX, y: lighterY, rotate: lighterRotate }}
            >
              {/* Visible Flame */}
              <motion.div 
                className="absolute top-[-40px] left-[15px] w-[20px] h-[40px] origin-bottom"
                style={{ scale: flameScale, opacity: flameOpacity }}
              >
                <div className="w-full h-full bg-[#ffdd00] rounded-[50%_50%_20%_20%] blur-[1px] relative shadow-[0_0_30px_#ff5500] animate-flame-flicker">
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-6 bg-white rounded-full blur-[2px]" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#ff5500] -z-10 rounded-full blur-[5px]" />
                </div>
              </motion.div>

              {/* Metallic Lighter Body */}
              <div className="absolute bottom-0 w-[55px] h-[55px] bg-gradient-to-br from-[#ffffff] via-[#b0b0b0] to-[#555555] rounded-b-md shadow-2xl border border-[#ffffff]/80 relative">
                 <div className="absolute top-[-14px] left-[5px] w-[45px] h-[14px] bg-[#a0a0a0] flex justify-between items-end px-1 border-t border-[#e0e0e0]">
                    <div className="w-[18px] h-[16px] bg-gradient-to-b from-[#999] to-[#666] rounded-t-sm flex justify-center py-[2px] gap-[2px]">
                       <div className="w-[2px] h-[4px] bg-[#222] rounded-full" />
                       <div className="w-[2px] h-[4px] bg-[#222] rounded-full" />
                    </div>
                    <div className="w-4 h-4 bg-gradient-to-br from-[#777] to-[#222] rounded-full shadow-sm mb-[-2px] ml-1" />
                 </div>
              </div>
              
              {/* Lighter Lid */}
              <motion.div 
                className="absolute top-[-20px] right-0 w-[55px] h-[20px] bg-gradient-to-br from-[#ffffff] via-[#b0b0b0] to-[#555555] origin-bottom-right rounded-t-md shadow-xl border border-[#ffffff]/80"
                style={{ rotate: lighterLidRotate }}
              />
            </motion.div>

            {/* Pack Base */}
            <div className="absolute bottom-0 w-[180px] h-[220px] z-30 shadow-[0_40px_80px_rgba(0,0,0,0.5)] pointer-events-none">
              <div className="absolute inset-0 bg-[#d9d9d9] rounded-sm" />
              <div className="absolute top-[-15px] left-[12px] right-[12px] h-[40px] bg-gradient-to-b from-[#e6e6e6] to-[#999999] rounded-t-sm border-t border-[#fff] overflow-hidden">
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_4px)] opacity-50" />
              </div>
              <div className="absolute inset-0 z-10 flex flex-col drop-shadow-2xl">
                <div className="w-full h-[90px] bg-[#cc0000] relative overflow-hidden rounded-t-sm clip-chevron-down">
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex-1 bg-[#fefefe] relative rounded-b-sm shadow-[inset_-8px_0_20px_rgba(0,0,0,0.15)]">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[#d4af37]" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="w-14 h-20 border-2 border-[#cc0000] rounded-t-full flex items-center justify-center p-1">
                       <div className="w-full h-full bg-[#cc0000]/10 rounded-t-full" />
                    </div>
                    <div className="font-display text-[#cc0000] text-3xl tracking-tighter font-bold mt-2">Marlboro</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pack Lid */}
            <motion.div 
              className="absolute top-[-90px] w-[180px] h-[90px] z-40 origin-bottom pointer-events-none"
              style={{ rotateX: lidRotate, transformPerspective: 800 }}
            >
              <div className="absolute inset-0 bg-[#cc0000] rounded-t-sm shadow-xl clip-chevron-up">
                 <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/40 to-transparent" />
                 <div className="absolute bottom-0 w-full h-[2px] bg-white/30" />
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
      
      <style>{`
        .clip-chevron-down { clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%); }
        .clip-chevron-up { clip-path: polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%); }
        
        @keyframes flame-flicker {
          0%, 100% { transform: scale(1) skewX(0deg); opacity: 1; }
          25% { transform: scale(1.05) skewX(2deg); opacity: 0.9; }
          50% { transform: scale(0.95) skewX(-2deg); opacity: 0.95; }
          75% { transform: scale(1.02) skewX(1deg); opacity: 0.85; }
        }
        .animate-flame-flicker { animation: flame-flicker 0.08s infinite; }

        @keyframes pulse-fast {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.2); }
        }
        .animate-pulse-fast { animation: pulse-fast 0.6s infinite alternate; }

        @keyframes smoke-wispy-1 {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.8; filter: blur(5px); }
          50% { transform: translateY(-50px) scale(2) rotate(-5deg); opacity: 0.5; filter: blur(10px); }
          100% { transform: translateY(-100px) scale(3) rotate(5deg); opacity: 0; filter: blur(15px); }
        }
        @keyframes smoke-wispy-2 {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.6; filter: blur(8px); }
          50% { transform: translateY(-60px) scale(2.5) rotate(8deg); opacity: 0.4; filter: blur(12px); }
          100% { transform: translateY(-120px) scale(4) rotate(-8deg); opacity: 0; filter: blur(20px); }
        }
        @keyframes smoke-wispy-3 {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.4; filter: blur(15px); }
          50% { transform: translateY(-70px) scale(3) rotate(-10deg); opacity: 0.2; filter: blur(20px); }
          100% { transform: translateY(-150px) scale(5) rotate(10deg); opacity: 0; filter: blur(30px); }
        }
        
        .animate-smoke-wispy-1 { animation: smoke-wispy-1 3s infinite ease-out; }
        .animate-smoke-wispy-2 { animation: smoke-wispy-2 4s infinite ease-out 1s; }
        .animate-smoke-wispy-3 { animation: smoke-wispy-3 5s infinite ease-out 2s; }
      `}</style>
    </section>
  );
};
