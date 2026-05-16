# Marlboro Red — Cinematic Parallax Homage

A dark, cinematic single-page creative concept site celebrating the iconic visual identity of Marlboro Red as a fictional brand homage / design exercise. Built around layered parallax scrolling and a dramatic product showcase.

> Disclaimer & responsibility: This is a creative/fictional design concept, not a real promotion. The site will open with an age-gate (18+) and display a prominent health warning in the footer and on the product section. No purchase, signup, or call-to-action to consume tobacco.

## Visual direction

- **Mood:** Dark cinematic — near-black backgrounds, deep crimson reds, smoky greys, warm ember highlights.
- **Typography:** Bold condensed serif for display headlines (cinematic, editorial), clean sans for body.
- **Texture:** Subtle film grain overlay, soft volumetric smoke, vignette edges.
- **Motion:** Slow, deliberate parallax. Nothing bouncy. Everything drifts.

## Page structure (top to bottom)

1. **Age gate (modal on first visit)**
   - Full-screen black overlay, centered question "Are you 18 or older?"
   - Yes → fade reveals site. No → friendly redirect message.
   - Choice remembered for the session.

2. **Hero — "Born Bold"**
   - Three parallax layers: smoke backdrop (slowest), oversized red "MARLBORO" wordmark (mid), foreground ember/cigarette silhouette (fastest).
   - Subtitle fades in, scroll-down indicator pulses softly.

3. **Iconic Pack Showcase (the centerpiece)**
   - Large 3D-feeling pack image pinned center as background layers drift.
   - Scroll triggers: pack rotates slightly, red roof-top design highlights, callouts fade in pointing to design elements (chevron roof, wordmark, gold trim).
   - Followed by a close-up parallax zoom into the pack texture.

4. **The Red — color study**
   - Full-bleed crimson section. The iconic red fills the screen as you scroll past, with a single line of large type: "One color. Instantly known."
   - Smoke layer drifts across at a different speed.

5. **Design anatomy**
   - Split layout: pack on one side stays pinned, descriptive notes on the other side scroll past (chevron geometry, typography, proportions).

6. **Heritage moment**
   - Single quiet section: a line about the brand's cultural footprint over a slow-drifting dark landscape image. Restrained, no glamorization.

7. **Footer**
   - Prominent health warning ("Smoking kills" style notice).
   - "Fictional design concept — not affiliated with Philip Morris" disclaimer.
   - Credits, year.

## Parallax & scroll mechanics

- Multiple background, midground, foreground layers per section moving at different speeds tied to scroll position.
- Pinned sections where the pack stays centered while content scrolls around it.
- Smooth scroll easing for the cinematic feel.
- Subtle fade-in on text as it enters the viewport.
- Reduced-motion support: respects `prefers-reduced-motion` and disables parallax for accessibility.

## Responsive

- Desktop: full layered parallax experience.
- Mobile: simplified parallax (fewer layers, lighter transforms) so it stays smooth; pinned sections convert to stacked reveals.

## Technical notes

- React + Tailwind, single `Index.tsx` route composed of section components (`Hero`, `PackShowcase`, `RedStudy`, `Anatomy`, `Heritage`, `Footer`, `AgeGate`).
- Scroll/parallax via `framer-motion` (`useScroll`, `useTransform`) — already plays well with the stack and handles reduced-motion.
- Dark cinematic palette added as HSL tokens in `index.css` (background near-black, primary crimson, ember accent, smoke grey) and wired through `tailwind.config.ts`.
- Film grain via a tiled SVG overlay, smoke via layered blurred radial gradients (no heavy video assets).
- Pack and landscape imagery generated as cinematic AI images and stored in `src/assets/` so they're bundled.
- Age-gate state stored in `sessionStorage`.
