# Tech Stack — KATANA BURGER

## Core Stack
| Technology | Version | Why | Docs |
|---|---|---|---|
| Next.js | 14.x (App Router) | SSR/SSG, fast loading, excellent SEO for local business | https://nextjs.org/docs |
| React | 18.x | Component UI, hooks for state management | https://react.dev |
| TypeScript | 5.x | Type safety, better DX | https://www.typescriptlang.org/docs |
| Tailwind CSS | 3.4.x | Rapid styling, responsive design, dark mode | https://tailwindcss.com/docs |

## Animation & UI
| Technology | Version | Why | Docs |
|---|---|---|---|
| Framer Motion | 10.x | Smooth scroll reveals, hover animations, staggered entrances | https://www.framer.com/motion |

## Deployment
| Platform | Why |
|---|---|
| Vercel | Free tier, edge network, automatic HTTPS, seamless Next.js integration |

## Environment Variables
| Variable | Description | Example |
|---|---|---|
| (None required for current scope) | This is a static restaurant site — no API keys needed | |

## Known Limitations
- No database needed — menu data is hardcoded (easier to maintain, faster to load)
- No authentication needed — public-facing site only
- No payment processing — orders are phone-based
- Images should be optimized with Next.js `Image` component for performance

## File Structure
```
src/
├── app/
│   ├── layout.tsx        # Root layout with fonts, metadata
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles, CSS variables
│   └── menu/
│       └── page.tsx      # Interactive menu page
├── components/
│   ├── Header.tsx        # Site header with navigation
│   └── Footer.tsx        # Site footer
docs/                     # Project documentation
public/                   # Static assets (images, icons)