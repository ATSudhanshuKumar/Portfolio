# 05 – Animations

All motion uses **Framer Motion** (`framer-motion` ^14). There is no CSS keyframe animation except Tailwind's `animate-ping`, which is unused at present.

## Patterns

| Pattern | API | Where |
|---|---|---|
| Fade-up on load | `initial` → `animate` with staggered `delay` (`fadeUp(delay)` helper) | Hero text block |
| Fade-up on scroll (once) | `whileInView` + `viewport={{ once: true, margin: '-60px…-80px' }}` | `Section`, About card and tiles, Experience cards, Skills chips |
| Staggered children | `variants` with `staggerChildren` / per-item `delay: i * n` | Navbar links, Skills chips, About stack logos |
| Shared-layout indicator | `layoutId` (`"nav-pill"`) | Navbar active/hover underline |
| Mount/unmount | `AnimatePresence` | Mobile menu, menu-icon swap (☰ ↔ ✕) |
| Infinite ambient loops | keyframe arrays + `repeat: Infinity`, per-property `transition` | Hero image float + slow zoom, floating cards, About glows, typewriter caret |
| Motion-value driven text | `useMotionValue` + `useTransform` + `animate()` | Hero typewriter, About `CountUp` |
| Micro-interactions | `whileHover` / `whileTap` | Buttons, logo, strength tiles, stack logos |

## Per-property transitions

Loops are combined with one-off entrances by giving each property its own transition:

```tsx
animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
transition={{
  opacity: { delay: 0.9, duration: 0.5 },
  x:       { delay: 0.9, duration: 0.5, ease: 'easeOut' },
  y:       { delay: 1.4, duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
}}
```

The element enters once and then floats forever without the entrance repeating.

## Typewriter (Hero)

```tsx
const count = useMotionValue(0);
const typed = useTransform(count, (v) => profile.role.slice(0, Math.round(v)));
useEffect(() => {
  const controls = animate(count, profile.role.length, {
    delay: TYPE_START, duration: role.length * TYPE_SPEED,
    ease: 'linear', repeat: Infinity, repeatType: 'loop', repeatDelay: TYPE_PAUSE,
  });
  return () => controls.stop();
}, [...]);
```

`repeatType: 'loop'` restarts from empty (types forward only). `'reverse'` would delete letter by letter; that variant was rejected in review.

## Count-up (About)

`useInView(ref, { once: true })` gates an `animate(count, target)`; the rendered value is `` `${Math.round(v)}${suffix}` ``.

## Performance & accessibility

- Animated properties are `opacity`, `transform` (x, y, scale, rotate) and blur-layer opacity, all compositor-friendly.
- `whileInView` uses `once: true`, so content doesn't re-animate on scroll back.
- **Gap:** `prefers-reduced-motion` is not respected. A low-cost fix is wrapping the app in `<MotionConfig reducedMotion="user">` (see [08](08-known-issues.md)).
- Headless screenshots taken right after load can catch elements mid-fade or before `whileInView` triggers. This is expected and not a bug.
