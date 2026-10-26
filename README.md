# Brahmanand Mathpati: portfolio

Live: https://brahmanand-mathpati.vercel.app

Next.js (App Router) + TypeScript + Tailwind CSS + Motion, deployed on Vercel. Design decisions are in [DESIGN.md](DESIGN.md); open items are in [TODO.md](TODO.md).

## How to edit content (no code needed)

Everything a recruiter reads lives in `content/`:

| File | What it controls |
|---|---|
| `content/site.json` | Name, role, value line, intro, about text, links, education, site URL, photo path |
| `content/projects.json` | Project cards: title, one-line problem, summary, tech chips, Live / GitHub links. `featured: true` puts a project on the home page (max 6) |
| `content/case-studies/<slug>.mdx` | The case-study page for each project (Problem → Data → Approach → Result → What I learned) |
| `content/skills.json` | Skill groups and chips |
| `content/experience.json` | Experience timeline |
| `content/certifications.json` | Certifications (add a `url` to make the name a link) |

`<Todo>…</Todo>` notes in the MDX files show only while running locally (`npm run dev`) and are hidden on the live site.

### Images and files

- **Profile photo:** replace `public/profile/brahmanand.jpg` (square, at least 800×800). The hero, About section, Open Graph image and favicon all update. Delete it and a "BM" placeholder appears instead.
- **Project screenshots:** drop images into `public/projects/<slug>/`. They're sorted by file name: the first is the card cover, the rest appear under "Screenshots" on the case-study page. Name them `01-cover.png`, `02-dashboard.png`, and so on.
- **Resume PDF:** add `public/resume.pdf`. "Download Resume" then downloads it. Until then it opens the printable `/resume` page.

## Run locally

```bash
npm install
npm run dev
```

Before deploying, run `npm run check` (lint + typecheck + build).

## Deploy

Push to `main`. Vercel builds and deploys automatically:

```bash
git push
```

To deploy manually without pushing:

```bash
vercel deploy --prod
```

On Windows PowerShell, use `vercel.cmd` / `npm.cmd` if script execution is blocked.

## Contact form

The form posts to [Formspree](https://formspree.io). Create a form there, then add its ID in Vercel → Project → Settings → Environment Variables as `NEXT_PUBLIC_FORMSPREE_ID` and redeploy. Without it, the form opens the visitor's email app instead. See `.env.example`.
