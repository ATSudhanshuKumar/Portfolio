# 07 – Build & deploy

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR at `http://localhost:5173` |
| `npm run build` | `tsc -b` (type-check, fails on type errors) then `vite build` → `dist/` |
| `npm run preview` | Serves the built `dist/` locally to check the production build |
| `npm run lint` | ESLint over the repo |

A change is considered done when `npm run build` **and** `npm run lint` both pass.

Current production output (approx.): JS 489 KB (152 KB gzip), CSS 38 KB (7 KB gzip), plus images and logos.

## Repository & git workflow

- Remote: `https://github.com/ATSudhanshuKumar/Portfolio` (branch `main`).
- `.gitignore` excludes `node_modules/` and `dist/`; build output is never committed.
- The local history was merged with GitHub's initial README commit (unrelated histories). The README kept GitHub's version.
- Suggested flow: small focused commits. Run build + lint before committing. Avoid force-pushing `main`.

## Deployment (recommended: Vercel)

1. Sign in at vercel.com with GitHub and **Import** the `Portfolio` repository.
2. Vercel auto-detects Vite. Defaults are correct: build command `npm run build`, output directory `dist`.
3. Deploy. Every push to `main` redeploys automatically; pull requests get preview URLs.

Netlify works the same way (build `npm run build`, publish `dist`). For GitHub Pages under a sub-path, set `base: '/Portfolio/'` in `vite.config.ts`.

No environment variables or secrets are needed.

## Pre-share checklist

- [ ] No `TODO` text visible on the page (`grep -rn TODO src/data`)
- [ ] Stats and dates match LinkedIn
- [ ] All external links open the right destination (GitHub, LinkedIn)
- [ ] Checked at 390px (mobile), ~1366px and ~1536px widths
- [ ] `npm run build` and `npm run lint` pass

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| A saved change doesn't appear in the browser on Windows | The Vite file watcher sometimes misses edits made by tools that replace the file (e.g. `sed -i`). Re-save the file in the editor, or restart `npm run dev`, then hard-refresh (**Ctrl+Shift+R**). |
| Favicon still shows the old icon | Browsers cache favicons aggressively. Bump the `?v=` query in `index.html` and hard-refresh. |
| An image shows as broken after replacing the file | Same cache issue. Hard-refresh. `TechLogo` inlines TypeScript/Keycloak partly for this reason. |
| A logo is missing from a chip | The display name in `profile.ts` doesn't match a key in `TechLogo`. Names are case- and punctuation-sensitive (`React` and `React.js` are both registered). |
