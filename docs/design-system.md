# Design System — NK Portfolio

## Color Palette
| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0a0a0a` | Page background |
| `--bg-secondary` | `#111111` | Card surfaces |
| `--bg-elevated` | `#1a1a1a` | Hover states, modals |
| `--text-primary` | `#f5f5f5` | Headings, body text |
| `--text-muted` | `#a0a0a0` | Secondary text, captions |
| `--accent` | `#d4af37` | Primary accent (gold) |
| `--accent-hover` | `#e5c158` | Accent hover state |
| `--border` | `#2a2a2a` | Dividers, card borders |

## Typography
### Font Families
- **Headings:** `Inter`, sans-serif (weights: 700, 800, 900)
- **Body:** `Inter`, sans-serif (weights: 400, 500)
- **Code/Tags:** `JetBrains Mono`, monospace (weights: 400, 500)

### Type Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| H1 | 4rem (64px) | 900 | 1.1 | -0.03em |
| H2 | 2.5rem (40px) | 800 | 1.2 | -0.02em |
| H3 | 1.75rem (28px) | 700 | 1.3 | -0.01em |
| Body LG | 1.125rem (18px) | 400 | 1.7 | 0 |
| Body | 1rem (16px) | 400 | 1.6 | 0 |
| Small | 0.875rem (14px) | 400 | 1.5 | 0 |
| Tag | 0.75rem (12px) | 500 | 1.4 | 0.05em |

## Spacing Scale
| Token | Value |
|---|---|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |
| `4xl` | 96px |

## Components

### Buttons
**Ghost Button (Primary)**
- 1px solid border (`--accent`)
- Transparent background
- On hover: background fills with `--accent` at 10% opacity
- Padding: `12px 24px`
- Border radius: `4px`
- Transition: `300ms ease`

**Solid Button (CTA)**
- Background: `--accent`
- Text: `--bg-primary`
- On hover: background shifts to `--accent-hover`, scale `1.03x`
- Padding: `12px 24px`
- Border radius: `4px`

### Cards
- Background: `--bg-secondary`
- Border: `1px solid --border`
- Border radius: `8px`
- Padding: `24px`
- Hover: `translateY(-4px)`, border color shifts to `--accent`
- Transition: `300ms ease`

### Badges
- Pill shape: `border-radius: 9999px`
- Background: `--bg-elevated`
- Text: `--accent`, `font-size: 12px`, `font-weight: 500`
- Padding: `4px 12px`

### Section Dividers
- `1px solid --border` or gradient fade to transparent
- Vertical spacing between sections: `py-24` to `py-32`

## Animations
### Scroll Reveal
- Trigger: Intersection Observer (20% threshold)
- Animation: `fade-in-up` (opacity 0→1, translateY 20px→0)
- Duration: `600ms`
- Easing: `ease-out`

### Staggered Entrance
- Grid items: `delay: index * 100ms`
- Hero elements: badge (0ms) → title (200ms) → subtitle (400ms) → CTA (600ms)

### Hover States
- Buttons: `300ms` color/border transition
- Cards: `300ms` lift + border color change
- Links: `200ms` color shift to `--accent`

### Looping Animations
- Badges (e.g., "Available"): soft pulse `scale(1) → scale(1.05) → scale(1)`, `2s` infinite

## Responsive Breakpoints
| Breakpoint | Width | Layout Changes |
|---|---|---|
| Mobile | < 640px | Single column, stacked nav |
| Tablet | 640px - 1024px | 2-column grids |
| Desktop | > 1024px | 3-column grids, full nav |

## Accessibility
- Minimum contrast ratio: 4.5:1 (WCAG AA)
- Focus visible: `2px solid --accent` outline with `2px` offset
- Skip to content link on every page
- ARIA labels on all interactive elements
- Keyboard navigation support for all interactive components