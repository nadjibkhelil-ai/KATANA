# Model Instructions — KATANA BURGER

## Project Identity
KATANA BURGER is a restaurant in Aïn Taya, Algiers. Fast food meets Japanese aesthetics. Tagline: "La lame qui coupe la faim". Dark mode, red accents, cinematic design.

## Coding Style
- Use TypeScript strictly — no `any` types
- Use functional components with explicit return types
- Prefer server components by default; add `'use client'` only when needed (animations, interactivity)
- Use Tailwind utility classes; avoid inline styles
- Commit after every phase completion
- All prices in Algerian Dinar (DA)

## What to Always Do
- Read `docs/` folder at session start for context
- Check `STEPS.md` for current progress before coding
- Use `framer-motion` for animations (scroll reveals, hover states, staggered entrances)
- Add ARIA labels to interactive elements
- Follow the design system in `docs/design-system.md` strictly
- Test the menu page thoroughly — it's the core feature

## What to Never Do
- Hardcode secrets or API keys
- Skip error handling
- Use placeholder values (`xxx`, `TODO`, `your_key_here`)
- Commit `.env`, `node_modules`, or `.next` folders
- Skip the design system — follow `docs/design-system.md` strictly
- Use flat, single-color backgrounds — always add depth and texture
- Use pure white (#FFFFFF) for text — use off-white (#F5F5F5) instead

## Handling Ambiguity
- If design detail is unclear: default to dark mode with red accent
- If content is missing: use realistic placeholder text (not "Lorem Ipsum")
- If feature scope is unclear: check `docs/blueprint.md` first, then ask user
- If menu data is unclear: reference the blueprint menu structure

## Known Edge Cases
- Mobile-first design — most users will be on phones
- Menu must be fully interactive with real-time price updates
- Build-your-own burgers come WITHOUT default ingredients (salad, tomato, sauces, slices, cornichon)
- Customers can choose exactly 2 FREE sauces
- Friday hours are different (5:30 PM - 1:00 AM vs 11:30 AM - 12:30 AM)
- No online ordering — phone orders only (07 83 78 07 16)