# Design System — KATANA BURGER (Luxury Edition)

## Color Palette
| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#050505` | True black, page background |
| `--bg-secondary` | `#0a0a0a` | Card surfaces, elevated elements |
| `--bg-elevated` | `#111111` | Hover states, modals, overlays |
| `--text-primary` | `#f5f5f5` | Off-white, headings, body text |
| `--text-muted` | `#a0a0a0` | Secondary text, descriptions |
| `--accent` | `#dc2626` | Katana Red — primary accent |
| `--accent-hover` | `#ef4444` | Red hover state |
| `--border` | `#1a1a1a` | Dividers, card borders |
| `--gold` | `#d4af37` | Premium accent (use sparingly) |

## Typography
### Font Families
- **Headings:** `Playfair Display`, serif (weights: 400, 500, 600, 700)
- **Body:** `Inter`, sans-serif (weights: 300, 400, 500)
- **Prices:** `Inter`, sans-serif (weight: 500, gold accent)

### Type Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| H1 | 3.5rem (56px) | 700 | 1.1 | 0.02em |
| H2 | 2.5rem (40px) | 600 | 1.2 | 0.01em |
| H3 | 1.5rem (24px) | 500 | 1.3 | 0 |
| Body LG | 1.125rem (18px) | 300 | 1.7 | 0 |
| Body | 1rem (16px) | 300 | 1.6 | 0 |
| Small | 0.875rem (14px) | 400 | 1.5 | 0 |
| Price | 1.25rem (20px) | 500 | 1.3 | 0 |
| Tag | 0.75rem (12px) | 500 | 1.4 | 0.1em |

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
**Primary Button (Solid Red)**
- Background: `--accent` (#dc2626)
- Text: white
- On hover: background shifts to `--accent-hover`, scale `1.02x`
- Padding: `14px 32px`
- Border radius: `2px` (sharp, luxury feel)
- Transition: `400ms ease`
- Letter spacing: `0.1em`
- Text transform: uppercase

**Ghost Button (Secondary)**
- 1px solid border (`--accent`)
- Transparent background
- On hover: background fills with white at 5% opacity
- Padding: `14px 32px`
- Border radius: `2px`
- Transition: `400ms ease`

### Cards
- Background: `--bg-secondary`
- Border: `1px solid --border`
- Border radius: `4px`
- Padding: `24px`
- Hover: subtle lift, border color shifts to `--accent/30`
- Transition: `400ms ease`

### Menu Cards
- Background: `--bg-secondary`
- Border: `1px solid --border`
- Border radius: `4px`
- Padding: `24px`
- Hover: subtle lift, border color shifts to `--gold/30`

### Badges
- Rectangle shape: `border-radius: 2px`
- Red badge: background `--accent`, text white
- Gold badge: background `--gold`, text black
- Muted badge: background `--bg-elevated`, text `--text-muted`
- Padding: `6px 16px`
- Font: `11px`, `font-weight: 500`, `letter-spacing: 0.15em`
- Text transform: uppercase

### Section Dividers
- `1px solid --border` or gradient fade to transparent
- Vertical spacing between sections: `py-24` to `py-32`

## Icons
- Use elegant SVG line icons instead of emojis
- Stroke width: `1.5px`
- Color: `--text-muted` with hover to `--accent`

## Animations

### Scroll Reveal
- Trigger: Intersection Observer (20% threshold)
- Animation: `fade-in-up` (opacity 0→1, translateY 20px→0)
- Duration: `800ms`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Staggered Entrance
- Grid items: `delay: index * 80ms`
- Hero elements: badge (0ms) → title (200ms) → subtitle (400ms) → CTA (600ms)

### Hover States
- Buttons: `400ms` color/border transition
- Cards: `400ms` lift + border color change
- Links: `300ms` color shift to `--accent`

### Looping Animations
- Badges: subtle opacity pulse, `3s` infinite

## Responsive Breakpoints
| Breakpoint | Width | Layout Changes |
|---|---|---|
| Mobile | < 640px | Single column, stacked nav |
| Tablet | 640px - 1024px | 2-column grids |
| Desktop | > 1024px | Full nav, wider content |

## Accessibility
- Minimum contrast ratio: 4.5:1 (WCAG AA)
- Focus visible: `2px solid --accent` outline with `2px` offset
- Skip to content link on every page
- ARIA labels on all interactive elements
- Keyboard navigation support for all interactive components