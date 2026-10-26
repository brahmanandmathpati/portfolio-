# Design brief v2: Brahmanand Mathpati portfolio

**Visitor:** a recruiter with 30 seconds. **Mood:** premium, calm, technical. Dark-first, with motion that rewards attention and never gates content.
**Principles:** 1) Evidence over adjectives. 2) One scan path: intro → hero → projects → skills → journey → contact. 3) Motion confirms and guides, using only transform and opacity.

**Tokens** (dark / light): `bg #07090C / #FAFAFB` · `surface #0F1318 / #FFFFFF` · `border #1E242C / #E4E7EC` · `fg #EEF1F5 / #0B0F14` · `muted #9AA4B2 / #4B5563`
`accent #2DD4BF / #0F766E` (teal, for actions) · `secondary #A78BFA / #6D28D9` (soft violet, for glow and highlights only). All text pairs pass AA.
**Surfaces:** glass cards (surface at 70%, 14px blur, 1px border, soft shadow) over a faded dotted grid. 12-column grid, max width 1200 px, 16 / 24 px gutters.

**Type:** Space Grotesk display 72 / 56 / 40 / 28 / 20, tracking -0.03em · Inter body 18 / 16 / 14, line height 1.6.
**Motion:** intro ≤ 2.5 s, first visit per session only, skippable (button or Esc). Entrances 0.3–0.6 s ease-out, staggered 60 ms. Idle loops 4–12 s. Route changes < 300 ms.
Tilt, magnetic hover and cursor glow run only with a fine pointer. Everything is off under `prefers-reduced-motion`, and every element keeps its final state in the server-rendered HTML.

**Components:** IntroLoader · HeroPortrait (ring draw, float, conic glow, tilt, shine, parallax chips) · RoleRotator · MagneticButton · Reveal / RevealGroup · TiltCard (lift + spotlight) · Marquee · Counter · Timeline · NavLinks (active-section pill) · ThemeToggle (circular reveal) · ScrollProgress · CursorGlow (lazy) · ContactForm (idle / sending / sent).

**Layout:** hero 7 + 5 columns (portrait stacks above on mobile) → stats strip → projects bento (7 + 5, then 4 + 4 + 4) → about → skills bento + marquee → timeline (experience + education) → certifications → contact.
