export const SiteFooter = () => {
  return (
    <footer className="relative bg-background border-t border-border">
      {/* Health warning bar */}
      <div className="bg-foreground text-background py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-display text-xl uppercase tracking-wider">Smoking kills.</p>
          <p className="text-xs uppercase tracking-[0.3em] opacity-70">
            Tobacco causes cancer, heart disease and addiction.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <img src="/marlboro-logo.png" alt="Marlboro" className="h-8 w-auto mix-blend-screen opacity-70" />
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-3">A scroll concept</p>
        </div>
        <div className="md:col-span-2 text-sm text-muted-foreground leading-relaxed">
          <p className="mb-3">
            This website is a fictional design homage created as a creative exercise in cinematic scroll storytelling.
            It is not affiliated with, endorsed by, or representative of Philip Morris International or any tobacco
            manufacturer. No product is offered for sale.
          </p>
          <p>
            Created with React, Tailwind & framer-motion. © {new Date().getFullYear()} — Concept project.
          </p>
        </div>
      </div>
    </footer>
  );
};
