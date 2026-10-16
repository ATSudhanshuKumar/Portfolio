# 04 – Design system

Styling is Tailwind CSS v4, configured in CSS (no `tailwind.config.js`). Theme tokens are declared in the `@theme` block of [`src/index.css`](../src/index.css) and become utilities automatically (e.g. `--color-ink` → `text-ink`, `bg-ink`).

## Colour

| Token / value | Where it's used | Notes |
|---|---|---|
| `ink` `#0b1220` | Headings, primary text, "View My Work" button, icons, Experience logo tile | The site's "black". Requests for "black" map to this token. |
| `#289EFD` (logo blue) | Logo, hero glows, image frame shadow, chip hover glow | Sampled from `logo.png`. Used as an arbitrary value (`bg-[#289EFD]`), not a token. |
| `brand-50…700` | Navbar active link + underline, Contact glow, Projects accents | Older brand scale; partly superseded by `ink` and `#289EFD`. |
| `#0a0d14` (graphite) | About dark card | With blue (`#289EFD`) and indigo glows. |
| `slate-*` | Body copy (`slate-600`), meta text (`slate-500`), borders (`slate-200`) | |
| `emerald` | "Ongoing" status pill only | |
| Page background | `bg-gradient-to-b from-blue-100 to-red-100` (in `App.tsx`); `body` falls back to `bg-blue-100` | |

**Colour policy that emerged from review:** keep UI chrome monochrome (ink/white/slate). Colour comes from the technology logos, the logo blue and the status pill. Avoid tinted icon tiles and duotone fills.

## Typography

| Role | Family | Typical classes |
|---|---|---|
| Display (headings, numbers) | Plus Jakarta Sans (`font-display`) | `font-bold`/`font-extrabold`, `tracking-tight` |
| Body / UI | Inter (`font-sans`, default) | `text-[15px]`/`text-base`, `leading-relaxed` |
| Eyebrows / labels | Inter | `text-xs`/`text-sm font-semibold uppercase tracking-widest` |

Fonts are loaded from Google Fonts in `index.html` with `preconnect`.

## Layout grid

Every section shares one container so all left and right edges line up:

```
mx-auto max-w-7xl px-4 sm:px-6 lg:px-10        (content width 75rem at lg)
```

- `Section` applies it automatically. Hero, Contact (`max-w-[75rem]` inside `lg:px-10`) and Footer replicate it by hand. **Change all of them together.**
- Two-column sections (Hero, About) use `lg:grid-cols-2` with `gap-12 xl:gap-16`, so the right columns of Hero and About start at the same x.
- Vertical rhythm: sections `py-20 md:py-28`; hero is `min-h-svh` with `pt-28 pb-16` (clears the fixed navbar and centres the content).

## Surfaces

| Surface | Recipe |
|---|---|
| Light card (all light cards: hero floating cards, About tiles, Skills, Experience, Projects) | `border border-slate-200/70 bg-white shadow-sm shadow-slate-900/5` + `rounded-3xl` (large) / `rounded-2xl`–`rounded-xl` (small). **Always solid white**: translucent cards pick up the blue→pink page gradient and stop matching each other. |
| Inner panel (Experience) | `rounded-2xl bg-slate-50 ring-1 ring-slate-200/70` |
| Dark feature card (About) | `rounded-3xl bg-[#0a0d14] ring-1 ring-white/10` + blurred glows + top sheen line |
| Dark CTA (Contact) | `rounded-3xl bg-ink` + blurred brand glow |
| Chip (Skills, Experience tech) | `rounded-xl` or `rounded-full`, `bg-white ring-1 ring-slate-200`, logo + label |
| Badge (Experience type/mode) | `rounded-md bg-slate-100 ring-1 ring-slate-200 text-xs` |
| Status pill | `rounded-full` + dot; emerald (Ongoing) or slate (Completed) |
| Primary button | `rounded-full bg-ink text-white`, hover `bg-slate-800`, lift on hover |

## Icons

- **UI icons:** Phosphor. Use `weight="bold"` for UI and tiles; avoid `duotone` (its tinted inner fill was rejected in review). Colour icons with `text-ink` unless they sit on a dark surface.
- **Technology logos:** always through `TechLogo` (see [06](06-assets-and-logos.md)) — never import an SVG directly in a section.
- Icon tiles: `h-9`–`h-11` square, `rounded-lg`/`rounded-xl`, `bg-slate-100` or `bg-white` + ring.
