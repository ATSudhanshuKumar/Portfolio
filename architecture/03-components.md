# 03 – Components

All components are function components with no external state management. Local state uses `useState`; nothing is persisted. Section components are re-exported from `src/components/index.ts`.

## Shared building blocks

### `Section`
Wrapper used by About, Skills, Experience and Projects.

| Prop | Type | Notes |
|---|---|---|
| `id` | string | Anchor id used by the navbar. |
| `eyebrow` | string | Small uppercase label above the title. |
| `title` | string | `h2`. |
| `subtitle?` | string | Optional lead paragraph under the title. |
| `className?` | string | Extra classes on `<section>`. |

Provides the standard container (`max-w-7xl`, `px-4 sm:px-6 lg:px-10`), vertical rhythm (`py-20 md:py-28`) and a fade-up on scroll for the whole block. Using it keeps every section's left edge aligned with the hero.

### `Highlighted`
`<Highlighted text="I build **secure** apps" />` → splits on `**…**` and renders those parts as `font-semibold text-ink`. No HTML is parsed, so it is safe for any string.

### `TechLogo`
`<TechLogo name="Spring Boot" className="h-5 w-5" />` → returns the logo for a technology name, or `null` if unknown. Details in [06 – Assets & logos](06-assets-and-logos.md).

## Sections

### `Navbar`
- Fixed, centred floating pill (`backdrop-blur`, translucent white). Pops in with a spring scale animation.
- `Links` array defines the menu (id + label). Desktop (`lg+`) shows inline links; smaller screens show a hamburger that expands an animated list.
- **Active-section tracking:** an `IntersectionObserver` with `rootMargin: '-45% 0px -50% 0px'` marks the section crossing the middle of the viewport as active. Hover temporarily overrides it.
- The active/hovered link gets a sliding underline via a shared `layoutId="nav-pill"`.
- Logo click scrolls to `#hero`.

### `Hero`
- Two-column grid on `lg` (text left, `HeroVisual` right; the visual is hidden below `lg`).
- **Typewriter:** a `useMotionValue` count is animated from 0 to `role.length` on an infinite `loop` (type → pause `TYPE_PAUSE` → restart; it never deletes). `useTransform` slices `profile.role` by the count. "I'm a " stays static. A blinking caret is a separate looping opacity animation. The `<p>` has an `aria-label` with the full line so screen readers don't hear partial text.
- Tunables at the top of the file: `TYPE_START`, `TYPE_SPEED`, `TYPE_PAUSE`.
- The heading uses `whitespace-nowrap` with responsive sizes chosen so it never collides with the image column; re-check at 1100px and 1536px if you change it.
- Decorative background: masked grid lines plus a blurred blue glow.

### `HeroVisual`
- `hero.webp` inside a rounded white-bordered frame. Enters with fade/scale, then floats on a 6s loop; the image itself slow-zooms on a 16s loop (clipped by the frame).
- Two floating cards: role card (bottom-left) and experience card (top-right), each with its own float loop.
- Fills its grid column on `lg+` so its edges line up with the About card below.

### `About`
- Two equal columns on `lg`, **stretched to the same height** (grid default `align-items: stretch`). The dark card is a flex column with `justify-between`, so its content spreads to match the left column exactly.
- Left: highlighted paragraphs + 2×2 strength tiles (icons from the `strengthIcons` map).
- Right: graphite card (`#0a0d14`) with two animated glows, a top sheen line, glass stat tiles (`CountUp`), education, and the core-stack logos.
- **`CountUp`**: `useInView` (once) triggers `animate()` on a motion value from 0 to the parsed number; the suffix (e.g. `+`) is re-appended.
- Gaps are tuned (`gap-4 xl:gap-5`) so the card doesn't outgrow the left column at ~1100px. If you add content to the card, re-check alignment.

### `Skills`
- Flattens `skills` into one wrapped list of chips (logo + name) inside a single card. Chips stagger in on scroll and lift on hover.

### `Experience`
- `entries` = flattened `{ job, role }` list. Each entry renders a full card (role with `focus`) or a compact card (role without). See [02 – Content model › experience](02-content-model.md#experience) for the rules.
- Local helpers: `Badges` (type/mode tags), `Status` (Ongoing/Completed pill).

### `Projects`
- Responsive card grid (1 → 2 → 3 columns). Optional GitHub / live-demo icon links per card, "Featured" pill, mono-font tech list. Footer link "See more on GitHub".
- Still uses the earlier visual style (blue folder icon); see [08 – Known issues](08-known-issues.md).

### `Contact`
- Dark rounded panel with a glow. Primary action is the email (with copy-to-clipboard, falling back to `mailto:` if the clipboard API fails) or, when `profile.email` is empty, "Message me on LinkedIn".
- Channel cards for LinkedIn, GitHub and (if set) phone.

### `Footer`
- Copyright with the current year (computed at runtime) and GitHub/LinkedIn icon links.

## Utilities

- `scroll(id)` — `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`.

## Accessibility notes

- Decorative layers use `aria-hidden="true"`; logos inside labelled chips use `alt=""`.
- Icon-only buttons and links have `aria-label`s (menu toggle, logo, social links, project links).
- The mobile menu toggle exposes `aria-expanded`.
- Gap: animations do not respect `prefers-reduced-motion` yet (see [08](08-known-issues.md)).
