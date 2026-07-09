# Design Tokens & Theme Configuration

## Dark Obsidian Theme

The dashboard uses a dark slate theme with indigo accents, inspired by premium developer tools like Linear and Vercel.

### Color Palette

| Token | OKLCH Value | Usage |
|-------|------------|-------|
| `--background` | `oklch(0.141 0.005 285.823)` | Page background (dark slate) |
| `--foreground` | `oklch(0.85 0.005 65)` | Primary text (light) |
| `--card` | `oklch(0.21 0.006 285.885)` | Card backgrounds (slightly lighter) |
| `--card-foreground` | `oklch(0.85 0.005 65)` | Card text |
| `--primary` | `oklch(0.623 0.214 259.815)` | Buttons, links, accents (indigo) |
| `--primary-foreground` | `oklch(0.985 0 0)` | Text on primary buttons |
| `--muted` | `oklch(0.274 0.006 286.033)` | Disabled states, secondary text |
| `--muted-foreground` | `oklch(0.705 0.015 286.067)` | Muted text |
| `--border` | `oklch(1 0 0 / 10%)` | Borders (subtle white with opacity) |
| `--input` | `oklch(1 0 0 / 15%)` | Input backgrounds |
| `--destructive` | `oklch(0.704 0.191 22.216)` | Delete/error actions (red) |

### Tailwind Configuration

Add to `client/src/index.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-destructive: var(--destructive);
}

:root {
  --primary: oklch(0.623 0.214 259.815);
  --primary-foreground: oklch(0.985 0 0);
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.85 0.005 65);
  --card: oklch(0.21 0.006 285.885);
  --card-foreground: oklch(0.85 0.005 65);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --destructive: oklch(0.704 0.191 22.216);
  --radius: 0.65rem;
}

.dark {
  /* Same values as :root for dark mode */
}
```

### Typography

**Font Stack:** Geist (sans-serif) + fallbacks

Add to `client/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Hierarchy:**
- **Display (h1):** 28px, weight 700, tracking -0.5px
- **Heading (h2):** 20px, weight 600, tracking -0.25px
- **Subheading (h3):** 16px, weight 600
- **Body:** 14px, weight 400, line-height 1.5
- **Small:** 12px, weight 500, text-muted-foreground
- **Code:** 12px, font-mono, bg-muted/30

### Spacing System

Use Tailwind's default spacing (4px base unit):
- `p-4` = 16px padding
- `gap-3` = 12px gap
- `mb-2` = 8px margin-bottom

### Shadows & Depth

```css
/* Subtle shadow for cards */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Hover state */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

/* Modal backdrop */
background: rgba(0, 0, 0, 0.5);
```

### Border Radius

- `rounded-lg` = 0.65rem (default for cards)
- `rounded-md` = 0.375rem (buttons, inputs)
- `rounded-full` = 9999px (avatars, badges)

### Animation Tokens

**Framer Motion stagger pattern:**

```typescript
const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } },
};
```

**Transition durations:**
- Fast: 150ms (hover states)
- Normal: 200ms (page transitions)
- Slow: 300ms (modal opens)

### Status Colors

| Status | Color | Usage |
|--------|-------|-------|
| Running | `oklch(0.585 0.22 264)` (indigo) | Active tasks |
| Stopped | `oklch(0.552 0.016 285.938)` (gray) | Completed tasks |
| Success | `oklch(0.72 0.15 142)` (green) | Successful operations |
| Error | `oklch(0.704 0.191 22.216)` (red) | Errors/failures |
| Warning | `oklch(0.74 0.16 70)` (amber) | Warnings |

### Component Styling

**Buttons:**
- Primary: `bg-primary text-primary-foreground`
- Outline: `border border-border text-foreground hover:bg-muted/30`
- Ghost: `text-foreground hover:bg-muted/20`
- Destructive: `bg-destructive text-destructive-foreground`

**Cards:**
- Base: `border border-border bg-card`
- Hover: `hover:border-primary/20 transition-all`

**Inputs:**
- Base: `bg-input/50 border border-input rounded-md px-3 py-2`
- Focus: `focus-visible:ring-1 focus-visible:ring-primary`

**Badges:**
- Primary: `bg-primary/15 text-primary border-primary/30`
- Secondary: `bg-muted/30 text-muted-foreground border-border`
- Destructive: `bg-destructive/15 text-destructive border-destructive/30`

### Glass-Morphism Effect

For premium feel, use subtle blur on overlays:

```css
backdrop-filter: blur(10px);
background: rgba(20, 20, 40, 0.7);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Responsive Breakpoints

Use Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Sidebar:** Fixed on desktop, collapsible on mobile (optional enhancement)

### Accessibility

- **Focus rings:** Always visible (ring-1 ring-primary)
- **Contrast:** All text meets WCAG AA (4.5:1 for body text)
- **Icons:** 16-24px for interactive elements
- **Touch targets:** Minimum 44px for mobile
