# Architecture & Implementation Docs

Technical documentation for the portfolio site in this repository: how it is built, how the pieces fit together, and how to change it safely.

| Doc | What it covers |
|---|---|
| [01 – Overview](01-overview.md) | Purpose, tech stack, folder structure, how the page is assembled |
| [02 – Content model](02-content-model.md) | `src/data/profile.ts`: every field, which section uses it, editing rules |
| [03 – Components](03-components.md) | Every component: responsibility, data it reads, notable behaviour |
| [04 – Design system](04-design-system.md) | Colours, fonts, layout grid, card and chip styles, icon rules |
| [05 – Animations](05-animations.md) | Framer Motion patterns used and where |
| [06 – Assets & logos](06-assets-and-logos.md) | Tech logos, icon libraries, images, favicon, and how to add new ones |
| [07 – Build & deploy](07-build-and-deploy.md) | Scripts, git workflow, deployment, troubleshooting |
| [08 – Known issues](08-known-issues.md) | Open items and technical debt, ranked |

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run lint
```

## The one rule to remember

**Almost all content lives in [`src/data/profile.ts`](../src/data/profile.ts).** To change text, skills, experience or projects, edit that file — not the components. The few exceptions (text hard-coded in components) are listed in [02 – Content model › Hard-coded content](02-content-model.md#hard-coded-content).
