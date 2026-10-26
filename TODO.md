# TODO for Brahmanand

## Content
- [x] Profile photo (`public/profile/brahmanand.jpg`)
- [ ] Screenshots for each project → `public/projects/<slug>/01-cover.png` (+ more). Highest impact: cards currently show the title on a plain tile.
- [ ] Resume PDF → `public/resume.pdf`
- [ ] Metrics and "What I learned" in each `content/case-studies/*.mdx` (look for `<Todo>`; run `npm run dev` to see them)
  - Self-Learning AI Agent: trained vs random return, p-value / CI, ablation table
  - QuickBite: model metric, % rows quarantined, one example assistant question
  - System Capacity: backtest error per model and the chosen model
  - EduPro: 2–3 findings
- [ ] Review `content/skills.json`: delete anything you can't defend in an interview
- [ ] Certificate links (`url` in `content/certifications.json`)

## Facts to confirm
- [ ] Unified Mentor dates: the spec says May–Aug 2026, LinkedIn says Jun–Aug 2026
- [ ] Add the Codec Technologies Data Science internship (Oct 2026 – present, on LinkedIn) to `content/experience.json`?
- [ ] AWS Cloud Club Technical Head dates
- [ ] Fraud Detection / Agentic Fraud Investigation Copilot: no public repo found. Share the link to add it.
- [ ] LogisChain, HealthRisk, MatRisk, InfraRisk AI: no public repos found

## Setup that needs your accounts
- [ ] GitHub repo `portfolio`: create it, then push (see README)
- [ ] Vercel ↔ GitHub: add a GitHub Login Connection in Vercel, then `vercel git connect` for auto-deploy on push to `main`
- [ ] Contact form: create a Formspree form, set `NEXT_PUBLIC_FORMSPREE_ID` in Vercel
- [ ] Vercel Analytics: Project → Analytics → Enable
- [ ] Custom domain `brahmanand.mathpati.dev`: buy `mathpati.dev` first (see below)
- [ ] Fix resume links: GitHub is `github.com/brahmanandmathpati` (no hyphen); LinkedIn is `linkedin.com/in/brahmanand-mathpati-b7a0a6334`

## Custom domain (after you own mathpati.dev)
1. `vercel.cmd domains add brahmanand.mathpati.dev`
2. At your registrar, add a **CNAME** record: name `brahmanand`, value `cname.vercel-dns.com`.
3. Change `url` in `content/site.json` to `https://brahmanand.mathpati.dev` and redeploy.
