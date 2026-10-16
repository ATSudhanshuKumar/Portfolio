# 08 – Known issues & technical debt

Status as of 2026-10-16. Ranked by impact on the site's purpose (getting recruiters to reach out).

## 🔴 Content blockers (fix before sharing the site)

| # | Issue | Where | Fix |
|---|---|---|---|
| 1 | Placeholder **"TODO: Project name"** card is visible, and "View My Work" scrolls straight to it | `projects` in `profile.ts` | Replace with real projects, or delete the entry |
| 2 | **"3+ Projects shipped"** isn't backed by the page (one real project; GitHub has 0 public repos) | `about.highlights` | Add real projects with public repos, or change the stat |
| 3 | **"1+ Years Experience"** conflicts with LinkedIn (Feb 2026 → present ≈ 9 months) | `about.highlights` **and** hard-coded in `HeroVisual.tsx` | Make it accurate in both places. A version calculated from `experience` start dates was built and later reverted on request; it can be restored. |
| 4 | No email address; Contact offers LinkedIn only | `profile.email` | Add a recruiter-facing email |
| 5 | Site is not deployed (no public URL) | — | See [07 – Build & deploy](07-build-and-deploy.md) |

## 🟠 Should fix

| Issue | Notes |
|---|---|
| Contact copy says "actively looking for new roles" while Experience shows an **Ongoing** role | Decide the intended message; text is in `Contact.tsx`. |
| Projects section uses the older visual style (blue folder icon, mono tech list) | Inconsistent with the redesigned About/Skills/Experience. |
| "See more on GitHub" links to a profile with no public repos | Hide it until repos exist. |
| Trainee role description came from a design mockup, not LinkedIn | Confirm it is accurate. |
| Hero illustration isn't the owner and shows an Apple logo | A real professional photo would be stronger. |
| Hero heading and hero stat card are hard-coded | Move to `profile.ts` so all content has one source (see [02 › Hard-coded content](02-content-model.md#hard-coded-content)). |

## 🟡 Technical debt

| Item | Detail |
|---|---|
| No reduced-motion support | Wrap `<App/>` in `<MotionConfig reducedMotion="user">` so OS "reduce motion" settings are respected. |
| Unused dependency | `lucide-react` (replaced by Phosphor). `npm uninstall lucide-react`. |
| Unused files | `src/assets/Hero.png` (1.7 MB source), `src/assets/react.svg`, `src/assets/vite.svg`, `public/favicon.svg`, `public/icons.svg`, empty `src/App.css`. |
| Root `README.md` | Only contains "# Portfolio". Should describe the project and link here. |
| No social preview image | Add `og:image` (1200×630) and `twitter:card` meta tags in `index.html`. |
| Two accent systems | `brand-*` tokens and the arbitrary `#289EFD` overlap. Consider making `#289EFD` a theme token. |
| Bundle size | JS ~152 KB gzip (+~25 KB gzip since Phosphor was added). Acceptable; could trim by importing icons from per-icon paths. |
| No tests | Acceptable for a static content site. If logic grows (e.g. date-based stats), add unit tests for it. |
| Line endings | Git warns about LF→CRLF on Windows. Add a `.gitattributes` (`* text=auto eol=lf`) to keep diffs clean. |

## Decision log (why things are the way they are)

- **Resume button is static.** The original link opened another person's PDF, so the link was removed. The button stays visible (navbar + Contact) but does nothing until a real resume URL is added.
- **Certifications section removed** because there was no data to show.
- **Dates hidden in Experience**, kept in data to derive the Ongoing/Completed status.
- **Monochrome UI chrome**: icons and accents were moved to `ink` black on request; colour comes from tech logos.
- **Logos vendored, not CDN-loaded**: no third-party runtime dependency; one CDN was unreliable during development.
