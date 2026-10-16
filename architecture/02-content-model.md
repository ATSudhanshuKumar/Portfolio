# 02 – Content model

All editable content lives in [`src/data/profile.ts`](../src/data/profile.ts). Components import from it and never hold their own copies of this data. TypeScript types are declared inline on each export, so a malformed entry fails `npm run build`.

## Exports at a glance

| Export | Used by | Purpose |
|---|---|---|
| `profile` | Navbar, Hero, HeroVisual, Contact, Projects, Footer | Name, role, tagline, contact links |
| `about` | About | Paragraphs, strengths tiles, stack chips, stat tiles |
| `skills` | Skills | Skill groups and items |
| `experience` | Experience | Companies → roles |
| `projects` | Projects | Project cards |
| `education` | About | Degree shown on the dark card |

## `profile`

| Field | Type | Notes |
|---|---|---|
| `name` | string | Used in the navbar logo `alt`/aria-label and footer. **Not** used by the hero heading (see below). |
| `role` | string | Typed out by the hero typewriter ("I'm a …") and shown on the hero image card. |
| `tagline` | string | Hero intro. Supports `**bold**` markers. |
| `email` | string | Empty string hides the email + "Copy email" buttons; Contact then shows "Message me on LinkedIn" instead. |
| `phone` | string | Empty string hides the phone channel in Contact. |
| `links.github` | URL | Contact, Footer, Projects ("See more on GitHub"). |
| `links.linkedin` | URL | Contact, Footer. |

> **Resume:** the navbar and Contact show a **static** "Resume" button (a styled `<span>`, no link, no download). There is no `resumeUrl` field. To make it downloadable later, add a `resumeUrl` to `profile` and turn both spans (`Navbar.tsx`, `Contact.tsx`) back into `<a href={profile.resumeUrl} target="_blank">`.

## `about`

| Field | Type | Rendered as |
|---|---|---|
| `paragraphs` | string[] | Left-column paragraphs. Supports `**bold**`. |
| `strengths` | string[] | 2×2 tiles under the paragraphs. Icons are mapped by **exact name** in `About.tsx` (`strengthIcons`): `Clean Code`, `Scalable APIs`, `Secure Auth`, `Responsive UI`. Unknown names fall back to a code icon. |
| `stack` | string[] | "Core stack" logos on the dark card. Names must exist in `TechLogo` (see [06](06-assets-and-logos.md)) or they render without a logo. |
| `highlights` | `{ value, label }[]` | The two glass stat tiles on the dark card. `value` like `"3+"` is animated by `CountUp` (counts the leading number, keeps the suffix). |

## `skills`

```ts
{ group: string; items: string[] }[]
```

`Skills.tsx` flattens all groups into **one list of chips in group order**; group names are not displayed. Keep `group` anyway — it controls ordering and makes the data readable. Every item should have a logo in `TechLogo`.

## `experience`

```ts
{
  company: string;
  type: string;            // badge, e.g. "Full-time"
  mode: string;            // badge, e.g. "On-site"
  roles: {
    title: string;
    start: string;         // "YYYY-MM"
    end?: string;          // "YYYY-MM"; OMIT for a current role
    summary?: string;
    focus?: { title: string; text: string; tech?: string[] }[];
    points: string[];      // responsibilities
  }[];                     // newest first
}[]
```

Rendering rules (`Experience.tsx`):

- Each role becomes its own card, newest first.
- **Status badge is derived from `end`:** no `end` → green **Ongoing**; `end` present → grey **Completed**.
- Dates are stored but **not displayed** (removed by request). They only drive the status.
- A role **with `focus`** gets the full card: company header (initial-letter logo, badges, status), title, summary, focus panels (icon chosen by title — contains "back" → server icon, otherwise monitor icon), tech chips with logos, and a two-column "Key Responsibilities" panel.
- A role **without `focus`** gets the compact card: people icon, title, company, badges, status, summary, optional bullets.

## `projects`

```ts
{ title; description; tech: string[]; github?; live?; featured? }[]
```

`github` / `live` icons only render when the URL is non-empty. `featured: true` adds the amber "Featured" pill.

## `education`

```ts
{ degree; school; period; detail? }[]
```

Shown on the About dark card as "school · period".

## Text conventions

- **`**double asterisks**`** around a phrase renders it bold and dark (`Highlighted.tsx`). Works in `profile.tagline` and `about.paragraphs` only.
- Keep claims factual and consistent with LinkedIn — recruiters cross-check.

## Hard-coded content

These strings live in components, not `profile.ts`. Change them in the file listed:

| Text | File |
|---|---|
| "👋 Welcome to my portfolio" | `Hero.tsx` |
| **"Hey, I'm Sudhanshu."** (hero heading) | `Hero.tsx` |
| "View My Work" button (scrolls to Projects) | `Hero.tsx` |
| Hero image card: "Spring Boot · React" | `HeroVisual.tsx` |
| Hero image card: **"1+" / "Years Experience"** | `HeroVisual.tsx` |
| About section title "Turning ideas into reliable products" | `About.tsx` |
| Section eyebrows / titles / subtitles (Skills, Experience, Projects) | each section component |
| Contact heading and "I'm actively looking for new roles…" | `Contact.tsx` |
| Contact GitHub channel value "ATSudhanshuKumar" | `Contact.tsx` |
| Footer "Built with React & Tailwind CSS." | `Footer.tsx` |
| Page `<title>` and meta description | `index.html` |
