# Design brief: Brahmanand Mathpati portfolio

**Visitor:** a recruiter with 30 seconds. In that time they should learn: who he is, what roles he wants, 3 proof projects, and how to get the resume.
**Principles:** 1) Evidence over adjectives: every claim links to a repo, a case study or a certificate. 2) One scan path: hero → projects → skills → contact, nothing competing. 3) Quiet by default: one accent, no blobs, motion only to confirm interaction.

**Color tokens** (light / dark), all text pairs WCAG AA or better
`bg #FFFFFF / #0B0D10` · `surface #F5F6F8 / #14171C` · `border #E4E7EC / #262B33`
`text #0F1115 / #ECEEF1` · `muted #4B5563 / #A1A8B3` · `accent #0F766E / #2DD4BF` (teal; the only color)

**Type:** Space Grotesk (display), Inter (body). Scale 14 / 16 / 18 / 20 / 24 / 32 / 44 / 56 px; body 16/1.6, display tracking -0.02em.
**Spacing:** 4-pt base: 4, 8, 12, 16, 24, 32, 48, 64, 96. Gutter 16 px mobile, 24 px desktop; max width 1120 px.

**Components:** Header (nav + theme toggle) · Avatar (photo / "BM" fallback) · Button (primary, ghost; 44 px min) · Chip · ProjectCard · SectionHeading · TimelineItem · CertBadge · ContactForm · Footer · CaseStudyLayout.

**Wireframes**
```
DESKTOP  [BM.  Projects Skills Experience Contact  ◐]
         [ Photo ]  Name / role / value line / [View Projects][Download Resume] / gh in @
         Featured projects: 2 x 3 cards (image, problem, chips, Live·GitHub·Case study)
         Skills (5 groups) | Experience timeline | Certifications | Education | Contact + form
MOBILE   header → photo → intro → buttons (full width) → cards (1 column) → ... → footer
CASE     /projects/[slug]: title, chips, links → Problem → Data → Approach → Result → Learned → Screenshots
```
