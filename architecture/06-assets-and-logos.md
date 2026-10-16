# 06 – Assets & logos

## Technology logos (`TechLogo`)

[`src/components/TechLogo.tsx`](../src/components/TechLogo.tsx) is the **only** place that maps a technology name to a logo. About, Skills and Experience all render logos through it, so a name works everywhere once it is registered.

```tsx
<TechLogo name="PostgreSQL" className="h-5 w-5" />   // → <img> or inline <svg>, or null if unknown
```

Three kinds of logo:

| Kind | Names | Why |
|---|---|---|
| SVG file in `src/assets/tech/` (imported → hashed URL by Vite) | Java, Spring Boot, React / React.js, PostgreSQL, MongoDB, Redis, Vite, Next.js, JavaScript, HTML, CSS, Tailwind CSS, Framer Motion, Git, GitHub, Postman, VS Code | Full-colour official artwork |
| Inline SVG in the component | TypeScript, Keycloak | TypeScript: redrawn with "TS" **centred** (the official mark sits it bottom-right, which looked unbalanced). Keycloak: not in devicon; single-colour Simple Icons glyph filled cyan `#00B8E3`. Inline also avoids a browser-cache issue seen during development. |
| Phosphor icon | REST APIs | No brand logo exists |

### Sources and versions

| Source | Version | Used for |
|---|---|---|
| [devicon](https://devicon.dev) (`*-original.svg`) | 2.17.0 (latest at time of writing) | All SVG files above |
| [Simple Icons](https://simpleicons.org) | 16.35.0 | Keycloak and TypeScript glyph paths |
| [Phosphor Icons](https://phosphoricons.com) | 2.1.10 | UI icons, REST APIs |

Logos are **vendored** (copied into the repo) rather than loaded from a CDN, so the site has no runtime dependency on third-party hosts. Every SVG was checked for scripts and event handlers before being added.

### Adding a technology

1. Get `<name>-original.svg` from devicon (npm package `devicon` → `icons/<name>/`), or a Simple Icons path if devicon lacks it.
2. Put it in `src/assets/tech/<name>.svg`, then import it and add `'Display Name': logo` to the `files` map in `TechLogo.tsx`. For a monochrome glyph, add an inline `<svg>` branch with an explicit `fill` (a black glyph is invisible on the About dark card).
3. Use the exact same display name in `profile.ts`.
4. Check it on both the light chips and the dark About card.

## Images

| File | Size | Used | Notes |
|---|---|---|---|
| `src/assets/hero.webp` | 63 KB, 1200×800 | `HeroVisual` | Generated from `Hero.png` with sharp (`resize 1200`, `webp quality 82`). |
| `src/assets/Hero.png` | 1.7 MB | not imported | Source illustration. Not bundled because nothing imports it. |
| `src/assets/logo.png` | 7 KB | Navbar | The "S" logo. Its blue `#289EFD` is the site's accent colour. |
| `public/favicon.png` | 256×256 | `index.html` | Circular crop of `logo.png` with transparent corners. Linked as `/favicon.png?v=2` to bust browser caches; bump `v` when you change it. Also used as `apple-touch-icon`. |

**Replacing the hero image:** keep a ~3:2 landscape ratio, export WebP at ≤ 1200px wide (aim for < 150 KB), and update the `alt` text in `HeroVisual.tsx`.

## Leftover template files

`src/assets/react.svg`, `src/assets/vite.svg`, `public/favicon.svg`, `public/icons.svg` and `src/App.css` come from the Vite template and are unused. See [08](08-known-issues.md).
