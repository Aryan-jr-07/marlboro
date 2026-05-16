import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "mr_age_ok";

export const AgeGate = () => {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY) !== "1") setOpen(true);
  }, []);

  const accept = () => {
    sessionStorage.setItem(KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/98 backdrop-blur-md"
        >
          <div className="max-w-md px-6 text-center">
            <div className="mb-8 flex justify-center">
              <img src="/marlboro-logo.png" alt="Marlboro" className="h-12 w-auto mix-blend-screen opacity-80" />
            </div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">A creative concept</p>
            <h2 className="font-display text-5xl md:text-6xl mb-6 leading-none">
              Are you <span className="italic text-primary">21</span> or older?
            </h2>
            <p className="mb-10 text-sm text-muted-foreground leading-relaxed">
              This is a fictional design homage exploring iconic brand identity. It is not affiliated with any tobacco company and does not promote tobacco use.
            </p>
            {!denied ? (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={accept}
                  className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary-glow transition-colors"
                >
                  Yes, enter
                </button>
                <button
                  onClick={() => setDenied(true)}
                  className="px-8 py-3 border border-border text-sm uppercase tracking-widest hover:border-foreground transition-colors"
                >
                  No
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground border border-border px-6 py-4">
                Come back when you're 21+. Take care.
              </p>
            )}
            <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-destructive/80">
              Smoking seriously harms you and others around you
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
